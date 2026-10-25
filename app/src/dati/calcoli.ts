import { DOMANDE, type Domanda } from '../contenuti/domande.ts'
import type { Conteggi, Stato } from './tipi.ts'

/** Stima della sala su un Quiz: media pesata dei valori delle opzioni votate (07). */
export function stimaSala(d: Domanda, c: Conteggi | null): number | null {
  const dist = c?.domande[d.id]?.distribuzione
  if (!dist) return null
  let somma = 0
  let voti = 0
  for (const [indice, n] of Object.entries(dist)) {
    const valore = d.opzioni[Number(indice)]?.valore
    if (valore == null) continue
    somma += valore * n
    voti += n
  }
  return voti ? somma / voti : null
}

/** Voti per opzione, nell'ordine delle opzioni. */
export function distribuzione(d: Domanda, c: Conteggi | null): number[] {
  const dist = c?.domande[d.id]?.distribuzione ?? {}
  return d.opzioni.map((_, i) => dist[i] ?? 0)
}

export const votanti = (domanda: number, c: Conteggi | null) => c?.domande[domanda]?.votanti ?? 0

/** Domande il cui voto è chiuso, dato lo stato corrente. */
export function domandeChiuse(st: Stato | null, votoAperto: boolean): number[] {
  if (!st) return []
  if (st.fase === 'premio' || st.fase === 'fine') return DOMANDE.map((d) => d.id)
  if (st.domanda == null) return []
  const corrente = st.domanda
  return DOMANDE.filter((d) => d.id < corrente || (d.id === corrente && !(st.fase === 'voto' && votoAperto))).map(
    (d) => d.id,
  )
}

/**
 * Barra di partecipazione: media cumulativa di votanti/Collegati sulle domande chiuse (06, 09).
 * Il denominatore è il numero di Collegati, che non scende mai.
 */
export function partecipazione(chiuse: number[], c: Conteggi | null): number {
  if (!c || !c.collegati || chiuse.length === 0) return 0
  const somma = chiuse.reduce((s, id) => s + Math.min(1, votanti(id, c) / c.collegati), 0)
  return somma / chiuse.length
}
