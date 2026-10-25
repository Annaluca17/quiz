import { test } from 'node:test'
import assert from 'node:assert/strict'
import { SCALETTA, passoVicino, etichettaPasso } from './fasi.ts'

test('la scaletta va da accoglienza a fine passando per tutte le 12 domande', () => {
  assert.deepEqual(SCALETTA[0], { domanda: null, fase: 'accoglienza' })
  assert.deepEqual(SCALETTA.at(-1), { domanda: null, fase: 'fine' })
  const domande = new Set(SCALETTA.map((p) => p.domanda).filter((d) => d != null))
  assert.equal(domande.size, 12)
})

test('Quiz 3 ha la scomposizione, Quiz 4 e 7 L\'AD indovina, i Polso solo voto e distribuzione', () => {
  const fasi = (d: number) => SCALETTA.filter((p) => p.domanda === d).map((p) => p.fase)
  assert.deepEqual(fasi(3), ['voto', 'stima', 'realta', 'scomposizione'])
  assert.deepEqual(fasi(4), ['voto', 'indovina', 'stima', 'realta'])
  assert.deepEqual(fasi(5), ['voto', 'stima', 'realta'])
  assert.deepEqual(fasi(7), ['voto', 'indovina', 'stima', 'realta'])
  assert.deepEqual(fasi(1), ['voto', 'distribuzione'])
  assert.deepEqual(fasi(11), ['voto', 'distribuzione'])
})

test('avanti e indietro si fermano agli estremi', () => {
  assert.deepEqual(passoVicino(null, 'accoglienza', -1), { domanda: null, fase: 'accoglienza' })
  assert.deepEqual(passoVicino(null, 'accoglienza', 1), { domanda: 1, fase: 'voto' })
  assert.deepEqual(passoVicino(2, 'distribuzione', 1), { domanda: 3, fase: 'voto' })
  assert.deepEqual(passoVicino(12, 'distribuzione', 1), { domanda: null, fase: 'premio' })
  assert.deepEqual(passoVicino(null, 'fine', 1), { domanda: null, fase: 'fine' })
})

test('le etichette nominano la domanda', () => {
  assert.equal(etichettaPasso({ domanda: 4, fase: 'indovina' }), "D4 · L'AD indovina")
})
