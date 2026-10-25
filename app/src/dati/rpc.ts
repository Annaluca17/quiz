import { supabase } from './supabase.ts'
import type { Conteggi, EsitoVoto, Fase, Serata, Stato } from './tipi.ts'

async function chiama<T>(nome: string, argomenti?: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.rpc(nome, argomenti)
  if (error) throw error
  return data as T
}

// Telefono

export const collega = (token: string) =>
  chiama<{ serata_id: string | null; votate: number[] }>('collega', { p_token: token })

export const vota = (token: string, domanda: number, opzioni: number[]) =>
  chiama<EsitoVoto>('vota', { p_token: token, p_domanda: domanda, p_opzioni: opzioni })

// Schermo e Regia

export const conteggi = () => chiama<Conteggi>('conteggi')

export const oraServer = () => chiama<string>('ora_server')

// Regia (le RPC rifiutano chi non è in public.regia)

export const eRegia = () => chiama<boolean>('e_regia')

export const nuovaSerata = (nome: string, reale = false) =>
  chiama<string>('nuova_serata', { p_nome: nome, p_reale: reale })

export const attivaSerata = (serata: string) => chiama<void>('attiva_serata', { p_serata: serata })

export const impostaStato = (domanda: number | null, fase: Fase, durata?: number) =>
  chiama<Stato>('imposta_stato', { p_domanda: domanda, p_fase: fase, p_durata: durata ?? null })

/** secondi > 0 proroga ("+10 s"); null chiude subito il voto. */
export const spostaScadenza = (secondi: number | null) =>
  chiama<Stato>('sposta_scadenza', { p_secondi: secondi })

export async function elencoSerate(): Promise<Serata[]> {
  const { data, error } = await supabase.from('serate').select('*').order('creata_il', { ascending: false })
  if (error) throw error
  return data as Serata[]
}
