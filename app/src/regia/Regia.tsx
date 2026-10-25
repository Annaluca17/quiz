// Vista /regia sul portatile: login, macchina a fasi, tasti e telecomando, countdown, "+10 s", export CSV.
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { domanda as trovaDomanda } from '../contenuti/domande.ts'
import { votanti } from '../dati/calcoli.ts'
import { useSecondiRimasti } from '../dati/ora.ts'
import { attivaSerata, eRegia, elencoSerate, impostaStato, nuovaSerata, spostaScadenza } from '../dati/rpc.ts'
import { supabase } from '../dati/supabase.ts'
import type { Serata } from '../dati/tipi.ts'
import { useConteggi } from '../dati/useConteggi.ts'
import { useStato } from '../dati/useStato.ts'
import { Accesso } from './Accesso.tsx'
import { csvAggregati, scarica } from './csv.ts'
import { SCALETTA, etichettaPasso, indicePasso, passoVicino, type Passo } from './fasi.ts'
import './regia.css'

export function Regia() {
  const [sessione, setSessione] = useState<Session | null | undefined>(undefined)
  const [abilitato, setAbilitato] = useState<boolean | null>(null)

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => setSessione(data.session))
    const { data } = supabase.auth.onAuthStateChange((_evento, s) => setSessione(s))
    return () => data.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    setAbilitato(null)
    if (sessione) void eRegia().then(setAbilitato, () => setAbilitato(false))
  }, [sessione])

  if (sessione === undefined) return null
  if (!sessione) return <Accesso />
  if (abilitato === null) return <p className="regia">Verifica accesso…</p>
  if (!abilitato) {
    return (
      <main className="regia">
        <p className="errore">Utente non abilitato alla Regia.</p>
        <button onClick={() => supabase.auth.signOut()}>Esci</button>
      </main>
    )
  }
  return <Pannello />
}

function Pannello() {
  const { serata, stato, rileggi } = useStato()
  const c = useConteggi()
  const [serate, setSerate] = useState<Serata[]>([])
  const [errore, setErrore] = useState<string | null>(null)
  const occupato = useRef(false)
  const chiusuraInviata = useRef<string | null>(null)

  const secondi = useSecondiRimasti(stato?.fase === 'voto' ? stato.scade_alle : null)
  const votoAperto = stato?.fase === 'voto' && secondi !== null && secondi > 0
  const d = trovaDomanda(stato?.domanda)
  const collegati = c?.collegati ?? 0
  const nVotanti = d ? votanti(d.id, c) : 0

  const aggiornaSerate = useCallback(() => elencoSerate().then(setSerate, () => undefined), [])
  useEffect(() => {
    void aggiornaSerate()
  }, [aggiornaSerate, serata?.id])

  const esegui = useCallback(
    async (azione: () => Promise<unknown>) => {
      if (occupato.current) return
      occupato.current = true
      setErrore(null)
      try {
        await azione()
        await rileggi()
      } catch (e) {
        // supabase-js restituisce PostgrestError, che non è un'istanza di Error.
        const messaggio = (e as { message?: string } | null)?.message
        setErrore(messaggio ?? String(e))
      } finally {
        occupato.current = false
      }
    },
    [rileggi],
  )

  /** Avanti apre il voto con la durata della domanda; indietro non riapre mai un voto. */
  const vaiA = useCallback(
    (p: Passo, apriVoto: boolean) =>
      esegui(() => impostaStato(p.domanda, p.fase, apriVoto && p.fase === 'voto' ? trovaDomanda(p.domanda)?.durata : undefined)),
    [esegui],
  )

  const muovi = useCallback(
    (delta: 1 | -1) => {
      if (!stato) return
      void vaiA(passoVicino(stato.domanda, stato.fase, delta), delta === 1)
    },
    [stato, vaiA],
  )

  // Spazio / PagGiù / freccia destra avanti, PagSu / freccia sinistra indietro (anche col telecomando).
  useEffect(() => {
    const tasto = (e: KeyboardEvent) => {
      if (e.target instanceof Element && e.target.closest('input, textarea, select')) return
      if (e.key === ' ' || e.key === 'PageDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        muovi(1)
      } else if (e.key === 'PageUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        muovi(-1)
      }
    }
    window.addEventListener('keydown', tasto)
    return () => window.removeEventListener('keydown', tasto)
  }, [muovi])

  // Chiusura anticipata quando hanno votato tutti i Collegati (a zero il voto si chiude da solo).
  useEffect(() => {
    if (!stato || !d || !votoAperto || collegati === 0 || nVotanti < collegati) return
    const chiave = `${stato.serata_id}:${d.id}:${stato.scade_alle}`
    if (chiusuraInviata.current === chiave) return
    chiusuraInviata.current = chiave
    void esegui(() => spostaScadenza(null))
  }, [stato, d, votoAperto, collegati, nVotanti, esegui])

  const indice = stato ? indicePasso(stato.domanda, stato.fase) : -1
  const prossimo = stato ? passoVicino(stato.domanda, stato.fase, 1) : null

  return (
    <main className="regia">
      <header>
        <h1>Regia</h1>
        <span className="muted">{serata ? `${serata.nome}${serata.reale ? ' · REALE' : ' · prova'}` : 'Nessuna serata attiva'}</span>
        <button onClick={() => supabase.auth.signOut()}>Esci</button>
      </header>

      {stato && (
        <section className="corrente">
          <p className="muted">Passo {indice + 1} di {SCALETTA.length}</p>
          <h2>{etichettaPasso(stato)}</h2>
          {d && <p>{d.testo}</p>}
          <div className="numeri">
            <div><b>{collegati}</b><span>Collegati</span></div>
            {d && <div><b>{nVotanti}</b><span>Votanti</span></div>}
            {stato.fase === 'voto' && <div><b>{votoAperto ? `${secondi} s` : 'chiuso'}</b><span>Voto</span></div>}
          </div>
          <div className="comandi">
            <button onClick={() => muovi(-1)}>◀ Indietro</button>
            <button className="primario" onClick={() => muovi(1)}>Avanti ▶ {prossimo && `(${etichettaPasso(prossimo)})`}</button>
            {stato.fase === 'voto' && (
              <>
                <button onClick={() => esegui(() => spostaScadenza(10))}>+10 s</button>
                <button disabled={!votoAperto} onClick={() => esegui(() => spostaScadenza(null))}>Chiudi voto</button>
              </>
            )}
          </div>
          <label className="salta">
            Vai a
            <select
              value={indice}
              onChange={(e) => {
                const p = SCALETTA[Number(e.target.value)]
                if (p) void vaiA(p, true)
                e.currentTarget.blur()
              }}
            >
              {SCALETTA.map((p, i) => (
                <option key={i} value={i}>{i + 1}. {etichettaPasso(p)}</option>
              ))}
            </select>
          </label>
        </section>
      )}

      <section className="serate">
        <h2>Serate</h2>
        <div className="comandi">
          <button onClick={() => esegui(() => nuovaSerata(`Prova ${new Date().toLocaleString('it-IT')}`))}>
            Nuova serata di prova
          </button>
          <button
            onClick={() => {
              if (window.confirm('Creare la serata REALE? Diventa la serata attiva.')) void esegui(() => nuovaSerata('Serata reale', true))
            }}
          >
            Nuova serata reale
          </button>
          <button
            disabled={!serata || !c}
            onClick={() => serata && c && scarica(`questionario-${serata.nome.replace(/\W+/g, '-')}.csv`, csvAggregati(serata, c))}
          >
            Esporta CSV aggregati
          </button>
        </div>
        <ul>
          {serate.map((s) => (
            <li key={s.id}>
              {s.nome} {s.reale && <b>· reale</b>} {s.attiva ? <b>· attiva</b> : (
                <button onClick={() => esegui(() => attivaSerata(s.id))}>Attiva</button>
              )}
            </li>
          ))}
        </ul>
      </section>

      {errore && <p className="errore">{errore}</p>}
      <p className="muted aiuto">Spazio / PagGiù / → avanti · PagSu / ← indietro. Indietro non riapre il voto.</p>
    </main>
  )
}
