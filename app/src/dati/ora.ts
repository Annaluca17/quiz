import { useEffect, useState } from 'react'
import { oraServer } from './rpc.ts'

// Scarto tra orologio del server e del dispositivo: i countdown usano scade_alle, che è ora del server.
let scarto = 0
let misurato: Promise<void> | null = null

export function misuraScarto(): Promise<void> {
  misurato ??= (async () => {
    try {
      const prima = Date.now()
      const server = Date.parse(await oraServer())
      const dopo = Date.now()
      scarto = server - (prima + dopo) / 2
    } catch {
      misurato = null
    }
  })()
  return misurato
}

export const adessoServer = () => Date.now() + scarto

/** Secondi rimasti fino a scade_alle (0 se scaduto, null se non c'è scadenza). Si aggiorna 4 volte al secondo. */
export function useSecondiRimasti(scadeAlle: string | null | undefined): number | null {
  const [, setTic] = useState(0)
  useEffect(() => {
    void misuraScarto()
    if (!scadeAlle) return
    const id = setInterval(() => setTic((t) => t + 1), 250)
    return () => clearInterval(id)
  }, [scadeAlle])
  if (!scadeAlle) return null
  return Math.max(0, Math.ceil((Date.parse(scadeAlle) - adessoServer()) / 1000))
}
