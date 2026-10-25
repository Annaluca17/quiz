// Export per l'AD: solo aggregati (nessun token, nessun voto singolo). Separatore ";" per Excel in italiano.
import { DOMANDE } from '../contenuti/domande.ts'
import { distribuzione, stimaSala, votanti } from '../dati/calcoli.ts'
import type { Conteggi, Serata } from '../dati/tipi.ts'

const campo = (v: string | number | null | undefined) => {
  const s = v == null ? '' : typeof v === 'number' ? v.toLocaleString('it-IT', { useGrouping: false }) : v
  return /[;"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export function csvAggregati(serata: Serata, c: Conteggi): string {
  const righe: (string | number | null | undefined)[][] = [
    ['serata', serata.nome],
    ['collegati', c.collegati],
    [],
    ['domanda', 'tipo', 'testo', 'opzione', 'voti', 'votanti', 'stima_sala', 'valore_reale'],
  ]
  for (const d of DOMANDE) {
    const voti = distribuzione(d, c)
    const stima = stimaSala(d, c)
    d.opzioni.forEach((o, i) => {
      righe.push([
        d.id, d.tipo, d.testo, o.etichetta, voti[i], votanti(d.id, c),
        stima == null ? null : Math.round(stima), d.reale,
      ])
    })
  }
  return '﻿' + righe.map((r) => r.map(campo).join(';')).join('\r\n') + '\r\n'
}

export function scarica(nomeFile: string, testo: string) {
  const url = URL.createObjectURL(new Blob([testo], { type: 'text/csv;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = nomeFile
  a.click()
  URL.revokeObjectURL(url)
}
