// Vista telefono, schermate grezze (la UI definitiva è il ticket 12).
// Mai risultati sul telefono: fuori dal voto solo "Guarda lo schermo". La Regia non è mai nominata.
import { useCallback, useEffect, useState } from 'react'
import { URL_MESSAGGIO_AD, domanda as trovaDomanda } from '../contenuti/domande.ts'
import { useSecondiRimasti } from '../dati/ora.ts'
import { collega, vota } from '../dati/rpc.ts'
import { tokenTelefono } from '../dati/token.ts'
import { useStato } from '../dati/useStato.ts'
import './telefono.css'

export function Telefono() {
  const { caricato, serata, stato } = useStato()
  const [token] = useState(tokenTelefono)
  const [votate, setVotate] = useState<Set<number>>(new Set())
  const [scelte, setScelte] = useState<number[]>([])
  const [invio, setInvio] = useState(false)
  const [errore, setErrore] = useState<string | null>(null)
  const secondi = useSecondiRimasti(stato?.fase === 'voto' ? stato.scade_alle : null)

  // Collegato all'apertura e a ogni cambio di serata o di stato (riconnessione): idempotente.
  const registra = useCallback(async () => {
    try {
      const r = await collega(token)
      setVotate(new Set(r.votate))
    } catch {
      // si riprova al prossimo cambio di stato
    }
  }, [token])
  useEffect(() => {
    void registra()
  }, [registra, serata?.id, stato?.aggiornato_il])

  // Nuova domanda: si azzerano le scelte.
  useEffect(() => {
    setScelte([])
    setErrore(null)
  }, [stato?.domanda, stato?.fase])

  const d = trovaDomanda(stato?.domanda)
  const votoAperto = stato?.fase === 'voto' && secondi !== null && secondi > 0

  const invia = async (opzioni: number[]) => {
    if (!d || invio) return
    setInvio(true)
    setErrore(null)
    try {
      const esito = await vota(token, d.id, opzioni)
      if (esito === 'ok' || esito === 'gia_votato') {
        setVotate((v) => new Set(v).add(d.id))
      } else if (esito === 'chiuso') {
        setErrore('Il voto si è appena chiuso.')
      } else {
        setErrore('Scelta non valida, riprova.')
      }
    } catch {
      setErrore('Connessione assente, riprova.')
    } finally {
      setInvio(false)
    }
  }

  const tocca = (i: number) => {
    if (!d) return
    if (d.maxScelte === 1) return void invia([i])
    setScelte((s) => (s.includes(i) ? s.filter((x) => x !== i) : s.length < d.maxScelte ? [...s, i] : s))
  }

  let contenuto
  if (!caricato) {
    contenuto = <p className="muted">Un attimo…</p>
  } else if (!serata || !stato) {
    contenuto = <h1>Il questionario non è ancora iniziato</h1>
  } else if (stato.fase === 'accoglienza') {
    contenuto = (
      <>
        <h1>Sei collegato</h1>
        <p className="muted">Tra poco si comincia. Tieni il telefono a portata di mano.</p>
      </>
    )
  } else if (stato.fase === 'fine') {
    contenuto = (
      <>
        <h1>Grazie!</h1>
        <p>C'è qualcosa che vuoi dirmi?</p>
        <a className="bottone-link" href={URL_MESSAGGIO_AD} target="_blank" rel="noopener noreferrer">
          Scrivimi
        </a>
      </>
    )
  } else if (d && votoAperto && !votate.has(d.id)) {
    contenuto = (
      <>
        <p className="muted conto">{secondi} s</p>
        <h1>{d.testo}</h1>
        {d.nota && <p className="muted">{d.nota}</p>}
        <div className="opzioni">
          {d.opzioni.map((o, i) => (
            <button key={i} className={scelte.includes(i) ? 'scelto' : ''} disabled={invio} onClick={() => tocca(i)}>
              {o.etichetta}
            </button>
          ))}
        </div>
        {d.maxScelte > 1 && (
          <button className="primario" disabled={invio || scelte.length === 0} onClick={() => invia(scelte)}>
            Conferma
          </button>
        )}
        {errore && <p className="errore">{errore}</p>}
      </>
    )
  } else if (d && stato.fase === 'voto' && votate.has(d.id)) {
    contenuto = <h1>Voto registrato</h1>
  } else {
    contenuto = <h1>Guarda lo schermo</h1>
  }

  return <main className="telefono">{contenuto}</main>
}
