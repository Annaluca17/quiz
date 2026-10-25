// Vista /schermo per il proiettore, schermate grezze (Rivelazioni e grafica definitiva: ticket 13 e 14).
// Solo visualizzazione: nessun controllo, la Regia non compare mai.
import { DOMANDE, SOGLIA_PREMIO, URL_MESSAGGIO_AD, domanda as trovaDomanda } from '../contenuti/domande.ts'
import { distribuzione, domandeChiuse, partecipazione, stimaSala, votanti } from '../dati/calcoli.ts'
import { useSecondiRimasti } from '../dati/ora.ts'
import { useConteggi } from '../dati/useConteggi.ts'
import { useStato } from '../dati/useStato.ts'
import { Qr } from './Qr.tsx'
import './schermo.css'

const euro = (n: number) => `${Math.round(n).toLocaleString('it-IT')} €`

export function Schermo() {
  const { caricato, serata, stato } = useStato()
  const c = useConteggi()
  const secondi = useSecondiRimasti(stato?.fase === 'voto' ? stato.scade_alle : null)
  const votoAperto = stato?.fase === 'voto' && secondi !== null && secondi > 0
  const d = trovaDomanda(stato?.domanda)
  const collegati = c?.collegati ?? 0
  const quota = partecipazione(domandeChiuse(stato, votoAperto), c)

  let contenuto
  if (!caricato) {
    contenuto = null
  } else if (!serata || !stato) {
    contenuto = <h1>In attesa…</h1>
  } else if (stato.fase === 'accoglienza') {
    contenuto = (
      <div className="accoglienza">
        <Qr testo={`${window.location.origin}/`} lato={360} />
        <div>
          <h1>Inquadra il QR col telefono</h1>
          <p className="numero">{collegati}</p>
          <p className="muted">telefoni collegati</p>
        </div>
      </div>
    )
  } else if (stato.fase === 'premio') {
    contenuto = (
      <>
        <h1>{quota >= SOGLIA_PREMIO ? 'Premio sbloccato!' : 'Partecipazione della sala'}</h1>
        <p className="numero">{Math.round(quota * 100)}%</p>
      </>
    )
  } else if (stato.fase === 'fine') {
    contenuto = (
      <div className="accoglienza">
        <Qr testo={URL_MESSAGGIO_AD} lato={360} />
        <h1>C'è qualcosa che vuoi dirmi?</h1>
      </div>
    )
  } else if (d) {
    const n = votanti(d.id, c)
    const voti = distribuzione(d, c)
    const stima = stimaSala(d, c)
    contenuto = (
      <>
        <p className="muted">Domanda {d.id} di {DOMANDE.length}</p>
        <h1>{d.testo}</h1>
        {stato.fase === 'voto' && (
          <>
            <ol className="opzioni">
              {d.opzioni.map((o, i) => (
                <li key={i}>{o.etichetta}</li>
              ))}
            </ol>
            <p className="numero">{votoAperto ? `${secondi} s` : 'Voto chiuso'}</p>
            <p>Hanno risposto {n} su {collegati}</p>
          </>
        )}
        {stato.fase === 'distribuzione' && (
          <ul className="barre">
            {d.opzioni.map((o, i) => (
              <li key={i}>
                <span>{o.etichetta}</span>
                <span className="barra" style={{ width: `${n ? (voti[i] / n) * 100 : 0}%` }} />
                <b>{voti[i]}</b>
              </li>
            ))}
          </ul>
        )}
        {stato.fase === 'indovina' && <p className="numero">?</p>}
        {stato.fase === 'stima' && (
          <p>
            La sala ha stimato: <b className="numero sala">{stima == null ? '—' : euro(stima)}</b>
          </p>
        )}
        {stato.fase === 'realta' && d.reale != null && (
          <p>
            La realtà è: <b className="numero realta">{euro(d.reale)}</b>
            {stima != null && <> · {d.reale >= stima ? '+' : '−'}{euro(Math.abs(d.reale - stima))} di quanto stimato</>}
          </p>
        )}
        {stato.fase === 'scomposizione' && (
          <ul className="barre">
            {d.scomposizione?.map((v) => (
              <li key={v.voce}>
                <span>{v.voce}</span>
                <b>{euro(v.valore)}</b>
              </li>
            ))}
          </ul>
        )}
        {d.segnaposto && <p className="segnaposto">valori segnaposto</p>}
      </>
    )
  }

  return (
    <main className="schermo">
      <section className="palco">{contenuto}</section>
      {serata && stato && stato.fase !== 'accoglienza' && (
        <footer className="partecipazione">
          <span>Partecipazione</span>
          <div className="traccia">
            <div className="riempimento" style={{ width: `${quota * 100}%` }} />
            <div className="soglia" style={{ left: `${SOGLIA_PREMIO * 100}%` }} />
          </div>
          <span>{Math.round(quota * 100)}%</span>
        </footer>
      )}
    </main>
  )
}
