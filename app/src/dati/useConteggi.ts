import { useEffect, useState } from 'react'
import { conteggi } from './rpc.ts'
import type { Conteggi } from './tipi.ts'

/** Conteggi aggregati della serata attiva, con polling di 1 s. Solo per /schermo e /regia. */
export function useConteggi(intervallo = 1000): Conteggi | null {
  const [dati, setDati] = useState<Conteggi | null>(null)
  useEffect(() => {
    let vivo = true
    let inCorso = false
    const leggi = async () => {
      if (inCorso) return
      inCorso = true
      try {
        const c = await conteggi()
        if (vivo) setDati(c)
      } catch {
        // si riprova al giro successivo
      } finally {
        inCorso = false
      }
    }
    void leggi()
    const id = setInterval(leggi, intervallo)
    return () => {
      vivo = false
      clearInterval(id)
    }
  }, [intervallo])
  return dati
}
