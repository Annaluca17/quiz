import { useState, type FormEvent } from 'react'
import { supabase } from '../dati/supabase.ts'

export function Accesso() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errore, setErrore] = useState<string | null>(null)
  const [invio, setInvio] = useState(false)

  const entra = async (e: FormEvent) => {
    e.preventDefault()
    setInvio(true)
    setErrore(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setErrore('Accesso non riuscito.')
    setInvio(false)
  }

  return (
    <form className="accesso" onSubmit={entra}>
      <h1>Regia</h1>
      <label>
        Email
        <input type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Password
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button className="primario" disabled={invio}>Entra</button>
      {errore && <p className="errore">{errore}</p>}
    </form>
  )
}
