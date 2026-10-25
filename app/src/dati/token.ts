// Token anonimo del telefono: UUID casuale in localStorage, mai collegato a una persona (06).
const CHIAVE = 'questionario-token'
let inMemoria: string | null = null

/** UUID v4. crypto.randomUUID esiste solo in contesti sicuri (https o localhost): in LAN su http serve il ripiego. */
function uuid(): string {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  const b = crypto.getRandomValues(new Uint8Array(16))
  b[6] = (b[6] & 0x0f) | 0x40
  b[8] = (b[8] & 0x3f) | 0x80
  const h = [...b].map((x) => x.toString(16).padStart(2, '0')).join('')
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`
}

export function tokenTelefono(): string {
  try {
    const salvato = localStorage.getItem(CHIAVE)
    if (salvato) return salvato
    const nuovo = uuid()
    localStorage.setItem(CHIAVE, nuovo)
    return nuovo
  } catch {
    // Navigazione privata o storage bloccato: il token vale per questa pagina.
    inMemoria ??= uuid()
    return inMemoria
  }
}
