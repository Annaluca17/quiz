// Macchina a fasi della serata (ticket 10): la scaletta dei passi che la Regia percorre col telecomando.
import { DOMANDE, type Domanda } from '../contenuti/domande.ts'
import type { Fase } from '../dati/tipi.ts'

export interface Passo {
  domanda: number | null
  fase: Fase
}

/** Fasi di una domanda: Polso voto → distribuzione; Quiz voto → indovina (4, 7) → stima → realta → scomposizione (3). */
export function fasiDomanda(d: Domanda): Fase[] {
  if (d.tipo === 'polso') return ['voto', 'distribuzione']
  return [
    'voto',
    ...(d.indovina ? (['indovina'] as const) : []),
    'stima',
    'realta',
    ...(d.scomposizione?.length ? (['scomposizione'] as const) : []),
  ]
}

export function scaletta(domande: Domanda[] = DOMANDE): Passo[] {
  return [
    { domanda: null, fase: 'accoglienza' },
    ...domande.flatMap((d) => fasiDomanda(d).map((fase) => ({ domanda: d.id, fase }))),
    { domanda: null, fase: 'premio' },
    { domanda: null, fase: 'fine' },
  ]
}

export const SCALETTA = scaletta()

export function indicePasso(domanda: number | null, fase: Fase, passi: Passo[] = SCALETTA): number {
  return passi.findIndex((p) => p.fase === fase && (p.domanda ?? null) === (domanda ?? null))
}

/** Passo successivo (o precedente con delta -1), fermo agli estremi. */
export function passoVicino(domanda: number | null, fase: Fase, delta: 1 | -1, passi: Passo[] = SCALETTA): Passo {
  const i = indicePasso(domanda, fase, passi)
  const j = i < 0 ? 0 : Math.min(passi.length - 1, Math.max(0, i + delta))
  return passi[j]
}

export const ETICHETTE_FASE: Record<Fase, string> = {
  accoglienza: 'Accoglienza',
  voto: 'Voto',
  distribuzione: 'Distribuzione',
  indovina: "L'AD indovina",
  stima: 'La sala ha stimato',
  realta: 'La realtà è',
  scomposizione: 'Da dove vengono',
  premio: 'Premio',
  fine: 'Fine',
}

export const etichettaPasso = (p: Passo) =>
  p.domanda == null ? ETICHETTE_FASE[p.fase] : `D${p.domanda} · ${ETICHETTE_FASE[p.fase]}`
