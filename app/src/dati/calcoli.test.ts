import { test } from 'node:test'
import assert from 'node:assert/strict'
import { domanda } from '../contenuti/domande.ts'
import { distribuzione, domandeChiuse, partecipazione, stimaSala } from './calcoli.ts'
import type { Conteggi, Stato } from './tipi.ts'

const c: Conteggi = {
  serata_id: 's',
  collegati: 10,
  domande: {
    1: { votanti: 10, distribuzione: { 0: 6, 5: 4 } },
    2: { votanti: 5, distribuzione: { 2: 5 } },
    // Quiz 4, opzioni segnaposto 800 / 1200 / 1600 / 2000
    4: { votanti: 4, distribuzione: { 0: 2, 2: 2 } },
  },
}

const stato = (s: Partial<Stato>): Stato => ({
  serata_id: 's', domanda: null, fase: 'accoglienza', scade_alle: null, aggiornato_il: '', ...s,
})

test('stima della sala = media pesata dei valori votati', () => {
  assert.equal(stimaSala(domanda(4)!, c), (800 * 2 + 1600 * 2) / 4)
  assert.equal(stimaSala(domanda(5)!, c), null)
})

test('distribuzione nell\'ordine delle opzioni, zeri compresi', () => {
  assert.deepEqual(distribuzione(domanda(1)!, c), [6, 0, 0, 0, 0, 4])
})

test('partecipazione = media di votanti/Collegati sulle domande chiuse', () => {
  assert.equal(partecipazione([1, 2], c), (1 + 0.5) / 2)
  assert.equal(partecipazione([], c), 0)
})

test('la domanda corrente conta tra le chiuse solo a voto chiuso', () => {
  assert.deepEqual(domandeChiuse(stato({ domanda: 3, fase: 'voto' }), true), [1, 2])
  assert.deepEqual(domandeChiuse(stato({ domanda: 3, fase: 'voto' }), false), [1, 2, 3])
  assert.deepEqual(domandeChiuse(stato({ domanda: 3, fase: 'stima' }), false), [1, 2, 3])
  assert.equal(domandeChiuse(stato({ fase: 'premio' }), false).length, 12)
  assert.deepEqual(domandeChiuse(stato({ fase: 'accoglienza' }), false), [])
})
