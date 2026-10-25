// Contenuti del questionario (ticket 03 Set di domande definitivo, 09 Scaletta e durata).
// Il DB conosce solo gli id 1-12. I valori dei Quiz sono SEGNAPOSTO finché la
// "Raccolta dei dati reali per le risposte del Quiz" (ticket 04) è aperta: li sostituisce il ticket 15.

export type TipoDomanda = 'quiz' | 'polso'

export interface Opzione {
  etichetta: string
  /** Solo Quiz: valore in euro dell'opzione, per l'asse e la media pesata della sala. */
  valore?: number
}

export interface VoceScomposizione {
  voce: string
  valore: number
}

export interface Domanda {
  id: number
  tipo: TipoDomanda
  blocco: 'Apertura' | 'Quiz' | 'Polso' | 'Chiusura'
  testo: string
  /** Testo d'aiuto sotto la domanda (es. legenda della scala 1-5). */
  nota?: string
  opzioni: Opzione[]
  /** Numero massimo di scelte: 2 solo sulla domanda 11. */
  maxScelte: 1 | 2
  /** Durata del voto in secondi (09): 30 Quiz, 20 Polso, 30 la domanda 11. */
  durata: number
  /** Solo Quiz: valore reale in euro. */
  reale?: number
  /** Solo Quiz 4 e 7: "L'AD indovina la sala" prima della stima. */
  indovina?: boolean
  /** Solo Quiz 3: voci della scomposizione del costo, dal basso verso il valore reale. */
  scomposizione?: VoceScomposizione[]
  /** true finché i valori non sono quelli reali del ticket 04. */
  segnaposto?: boolean
}

const scala = (min: string, max: string): Pick<Domanda, 'opzioni' | 'nota'> => ({
  opzioni: ['1', '2', '3', '4', '5'].map((etichetta) => ({ etichetta })),
  nota: `1 = ${min}, 5 = ${max}`,
})

const euro = (...valori: number[]): Opzione[] =>
  valori.map((valore) => ({ etichetta: `${valore.toLocaleString('it-IT')} €`, valore }))

export const DOMANDE: Domanda[] = [
  {
    id: 1, tipo: 'polso', blocco: 'Apertura', maxScelte: 1, durata: 20,
    testo: 'Con quale parola descriveresti la nostra azienda?',
    opzioni: ['Solida', 'Familiare', 'Dinamica', 'Accogliente', 'In crescita', 'Esigente'].map((etichetta) => ({ etichetta })),
  },
  {
    id: 2, tipo: 'polso', blocco: 'Apertura', maxScelte: 1, durata: 20,
    testo: "Quanto pensi di conoscere i benefit che l'azienda ti offre?",
    ...scala('quasi niente', 'tutti'),
  },
  {
    id: 3, tipo: 'quiz', blocco: 'Quiz', maxScelte: 1, durata: 30, segnaposto: true,
    testo: "Per ogni 100 € netti che ricevi in busta paga, quanto spende in tutto l'azienda?",
    opzioni: euro(125, 145, 170, 195),
    reale: 170,
    scomposizione: [
      { voce: 'Netto in busta paga', valore: 100 },
      { voce: 'Tasse e contributi a tuo carico', valore: 35 },
      { voce: "Contributi a carico dell'azienda", valore: 28 },
      { voce: 'TFR', valore: 7 },
    ],
  },
  {
    id: 4, tipo: 'quiz', blocco: 'Quiz', maxScelte: 1, durata: 30, segnaposto: true, indovina: true,
    testo: 'Quanto valgono in un anno i buoni pasto di ciascuno di noi?',
    opzioni: euro(800, 1200, 1600, 2000),
    reale: 1600,
  },
  {
    id: 5, tipo: 'quiz', blocco: 'Quiz', maxScelte: 1, durata: 30, segnaposto: true,
    testo: "Quanto investe ogni anno l'azienda in welfare per ciascuno di noi?",
    opzioni: euro(200, 400, 600, 900),
    reale: 600,
  },
  {
    id: 6, tipo: 'quiz', blocco: 'Quiz', maxScelte: 1, durata: 30, segnaposto: true,
    testo: "Quanto costa ogni anno all'azienda l'assicurazione sanitaria integrativa di ciascuno di noi?",
    opzioni: euro(150, 300, 450, 700),
    reale: 450,
  },
  {
    id: 7, tipo: 'quiz', blocco: 'Quiz', maxScelte: 1, durata: 30, segnaposto: true, indovina: true,
    testo: "Quanto vale il premio di produzione, introdotto quest'anno, che riceverai?",
    opzioni: euro(300, 600, 900, 1500),
    reale: 900,
  },
  {
    id: 8, tipo: 'polso', blocco: 'Polso', maxScelte: 1, durata: 20,
    testo: 'Tra questi, quale benefit apprezzi di più?',
    opzioni: ['Buoni pasto', 'Welfare', 'Assicurazione sanitaria', 'Premio di produzione'].map((etichetta) => ({ etichetta })),
  },
  {
    id: 9, tipo: 'polso', blocco: 'Polso', maxScelte: 1, durata: 20,
    testo: 'Come stai, in generale, nel tuo lavoro qui?',
    ...scala('male', 'molto bene'),
  },
  {
    id: 10, tipo: 'polso', blocco: 'Polso', maxScelte: 1, durata: 20,
    testo: 'Quanto ti senti al corrente di quello che succede in azienda?',
    ...scala('per niente', 'del tutto'),
  },
  {
    id: 11, tipo: 'polso', blocco: 'Polso', maxScelte: 2, durata: 30,
    testo: 'Su cosa possiamo fare meglio?',
    nota: 'Massimo 2 scelte',
    opzioni: [
      'Organizzazione del lavoro', 'Strumenti e spazi', 'Formazione e crescita',
      'Comunicazione interna', 'Equilibrio vita-lavoro', 'Riconoscimento',
    ].map((etichetta) => ({ etichetta })),
  },
  {
    id: 12, tipo: 'polso', blocco: 'Chiusura', maxScelte: 1, durata: 20,
    testo: 'Conoscevi già questi benefit?',
    opzioni: ['Sì, tutti', 'Alcuni', 'Quasi nessuno'].map((etichetta) => ({ etichetta })),
  },
]

/** Soglia della barra di partecipazione che sblocca il premio della sala (06). */
export const SOGLIA_PREMIO = 0.8

/** URL del Messaggio all'AD (Tally dell'AD, ticket 14). SEGNAPOSTO, senza parametri. */
export const URL_MESSAGGIO_AD = 'https://tally.so/r/SEGNAPOSTO'

export const domanda = (id: number | null | undefined): Domanda | undefined =>
  DOMANDE.find((d) => d.id === id)
