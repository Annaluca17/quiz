# Questionario festa – SPA

Vite + React + TypeScript, stato e voti su Supabase (`questionario-festa`, eu-central-1).
Decisioni: [Architettura della SPA](../wayfinder/questionario-festa/tickets/10-architettura-spa.md).

| Vista | Percorso | Chi |
|---|---|---|
| Telefono | `/` | i Collegati, dal QR |
| Proiettore | `/schermo` | schermo esteso, solo visualizzazione |
| Regia | `/regia` | Luca, con login Supabase Auth |

## Avvio in locale

```bash
npm install
cp .env.example .env.local   # URL e chiave publishable del progetto (Supabase > Project Settings > API Keys)
npm run dev                   # http://localhost:5173, anche in LAN (vite --host)
npm test                      # macchina a fasi e calcoli
```

Per provare con i telefoni nella stessa Wi-Fi apri `/schermo` e `/regia` con l'IP del PC
(es. `http://192.168.1.9:5173/schermo`): il QR dell'accoglienza punta all'origine dello schermo.

## Database

`supabase/migrations/` è lo schema applicato al progetto (tabelle `regia`, `serate`, `stato`,
`collegati`, `voti`; RPC `collega`, `vota`, `conteggi`, `ora_server` per tutti, `nuova_serata`,
`attiva_serata`, `imposta_stato`, `sposta_scadenza` solo per la Regia). `collegati` e `voti` non si
leggono mai direttamente: solo via RPC.

### Abilitare l'utente Regia (una volta)

1. Supabase > Authentication > Users > *Add user*: email e password di Luca, *Auto confirm*.
2. SQL Editor:
   ```sql
   insert into public.regia (user_id)
   select id from auth.users where email = '<email di Luca>';
   ```
3. Consigliato: Authentication > Sign In / Providers > disattivare *Allow new users to sign up*.

## Regia

Spazio, PagGiù o → avanti; PagSu o ← indietro (vale anche il telecomando per slide). Avanti su un
voto lo apre con la durata della domanda (30 s Quiz e domanda 11, 20 s Polso); indietro non lo
riapre mai. Il voto si chiude a zero o appena hanno votato tutti i Collegati; "+10 s" proroga (e
riapre un voto appena chiuso). "Nuova serata di prova" crea una serata separata e la rende attiva;
"Esporta CSV aggregati" scarica solo conteggi per domanda e opzione.
