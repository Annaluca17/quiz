import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from './supabase.ts'
import type { Serata, Stato } from './tipi.ts'

export interface StatoSerata {
  caricato: boolean
  serata: Serata | null
  stato: Stato | null
  /** Rilegge serata e stato (es. dopo una scrittura della Regia). */
  rileggi: () => Promise<void>
}

/**
 * Serata attiva e sua riga `stato`. Ascolta Postgres Changes su `stato` e rilegge tutto
 * a ogni evento, a ogni (ri)connessione del canale e quando la pagina torna visibile o online.
 */
export function useStato(): StatoSerata {
  const [serata, setSerata] = useState<Serata | null>(null)
  const [stato, setStato] = useState<Stato | null>(null)
  const [caricato, setCaricato] = useState(false)
  const turno = useRef(0)

  const rileggi = useCallback(async () => {
    const mio = ++turno.current
    const { data: s, error } = await supabase.from('serate').select('*').eq('attiva', true).maybeSingle()
    if (error) return
    let st: Stato | null = null
    if (s) {
      const { data, error: e2 } = await supabase.from('stato').select('*').eq('serata_id', s.id).maybeSingle()
      if (e2) return
      st = data as Stato | null
    }
    if (mio !== turno.current) return // una lettura più recente è già partita
    setSerata(s as Serata | null)
    setStato(st)
    setCaricato(true)
  }, [])

  useEffect(() => {
    void rileggi()
    const canale = supabase
      .channel('stato')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'stato' }, () => void rileggi())
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') void rileggi()
      })
    const alRitorno = () => {
      if (document.visibilityState === 'visible') void rileggi()
    }
    document.addEventListener('visibilitychange', alRitorno)
    window.addEventListener('online', alRitorno)
    // Rete di sicurezza se un evento realtime va perso.
    const id = setInterval(() => void rileggi(), 15000)
    return () => {
      void supabase.removeChannel(canale)
      document.removeEventListener('visibilitychange', alRitorno)
      window.removeEventListener('online', alRitorno)
      clearInterval(id)
    }
  }, [rileggi])

  return { caricato, serata, stato, rileggi }
}
