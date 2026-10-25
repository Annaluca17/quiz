export type Fase =
  | 'accoglienza'
  | 'voto'
  | 'distribuzione'
  | 'indovina'
  | 'stima'
  | 'realta'
  | 'scomposizione'
  | 'premio'
  | 'fine'

export interface Serata {
  id: string
  nome: string
  reale: boolean
  attiva: boolean
  creata_il: string
}

export interface Stato {
  serata_id: string
  domanda: number | null
  fase: Fase
  scade_alle: string | null
  aggiornato_il: string
}

export interface ConteggioDomanda {
  votanti: number
  /** indice opzione -> voti */
  distribuzione: Record<string, number>
}

export interface Conteggi {
  serata_id: string | null
  collegati: number
  domande: Record<string, ConteggioDomanda>
}

export type EsitoVoto = 'ok' | 'gia_votato' | 'chiuso' | 'non_valido'
