import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './stile/font.ts'
import { Telefono } from './telefono/Telefono.tsx'
import { Schermo } from './schermo/Schermo.tsx'
import { Regia } from './regia/Regia.tsx'

// Tre viste sullo stesso index.html (vercel.json fa il rewrite di /schermo e /regia).
const percorso = window.location.pathname.replace(/\/+$/, '')
const Vista = percorso === '/schermo' ? Schermo : percorso === '/regia' ? Regia : Telefono

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Vista />
  </StrictMode>,
)
