---
title: Base della SPA
labels: [wayfinder:task]
status: open
assignee: Luca
blocked_by: [10-architettura-spa]
---

## Question

AFK. Realizzare la base descritta nell'[Architettura della SPA](10-architettura-spa.md): progetto Supabase `questionario-festa` (eu-central-1, account Luca), migrazioni di `serate`, `stato`, `collegati`, `voti` con RLS e RPC `collega`, `vota`, `conteggi`; utente Regia in Supabase Auth; scaffold Vite + React + TS in `app/` con le tre viste, `src/contenuti/domande.ts` con valori segnaposto, hook `useStato` e `useConteggi`; `/regia` con login, macchina a fasi, tasti Spazio/PagGiù, countdown con chiusura automatica, "+10 s", creazione di una serata di prova, export CSV degli aggregati. Fatto quando una serata di prova si percorre dall'accoglienza alla fine da `/regia` con 2 telefoni reali che votano su schermate grezze. Il risultato registra URL del progetto e dove sono conservate le chiavi (mai in chiaro nel repo).

## Avanzamento

Realizzata il 2026-10-25, **in attesa della verifica di Luca** (ultimo punto del "Fatto quando"): il ticket si chiude dopo la checklist qui sotto.

| Cosa | Dove / esito |
|---|---|
| Progetto Supabase | `questionario-festa`, ref `kcoryzlckxtfwcnophai`, eu-central-1, organizzazione "Studio CDL Paolo Messina" (unica dell'account, piano free, 0 $/mese, scelta di Luca). URL: https://kcoryzlckxtfwcnophai.supabase.co |
| Chiavi | Solo la chiave *publishable* serve alla SPA: in `app/.env.local` sul PC di Luca (non versionato, vedi `app/.env.example`) e in Supabase > Project Settings > API Keys. Nessuna chiave nel repo. Password Regia: solo nel password manager di Luca |
| Schema | [`app/supabase/migrations/`](../../../app/supabase/migrations/): `regia`, `serate`, `stato`, `collegati`, `voti` con RLS; RPC `collega`, `vota`, `conteggi`, `ora_server` (anonime) e `nuova_serata`, `attiva_serata`, `imposta_stato`, `sposta_scadenza` (solo utenti in `regia`) |
| Codice | `app/`: viste `/`, `/schermo`, `/regia` grezze; `src/contenuti/domande.ts` con valori segnaposto; hook `useStato` (Postgres Changes + rilettura a riconnessione, ritorno in primo piano e ogni 15 s) e `useConteggi` (polling 1 s); macchina a fasi `src/regia/fasi.ts` (35 passi); export CSV di soli aggregati; font in self-hosting; `vercel.json` |

Scelte di dettaglio rispetto all'[Architettura della SPA](10-architettura-spa.md), che restano dentro la sua Resolution:
- **Chiusura del voto:** la fase resta `voto`; il voto è chiuso quando l'ora del server supera `scade_alle` (+1 s di tolleranza in `vota`). La chiusura anticipata, quando votano tutti i Collegati, porta `scade_alle` all'ora attuale. Si avanza solo a mano.
- **Scritture della Regia via RPC** (non update diretti), così `scade_alle` è calcolato sull'ora del server.
- **Utente Regia** = riga in `public.regia` (non basta essere autenticati), quindi un'iscrizione estranea non dà accesso.
- **Indietro** non riapre mai un voto; "+10 s" sì.
- **Telefono:** `collega` restituisce le domande già votate, così dopo ricarica o riconnessione mostra "Voto registrato".

Verifiche fatte (2026-10-25): build e `npm test` (8 test) verdi; via SQL con ruoli simulati, voto singolo e doppio solo sulla 11, rifiuto di 3 scelte, di voti doppi, di domanda non corrente e dopo la scadenza (anche fuori transazione), utente estraneo non Regia; via REST con la chiave anonima `voti`, `collegati`, scritture su `stato` e `serate` e `imposta_stato` rifiutati (401); nel browser telefono e `/schermo` seguono in tempo reale accoglienza → voto → distribuzione → stima → realtà → fine, ricarica del telefono con "Voto registrato", Collegati non doppi, stima = media pesata, `/regia` con tasti e pannello (senza login, scritture rifiutate). Dati di prova cancellati.

### Checklist per Luca (HITL)

1. Creare l'utente Regia e abilitarlo: passi in [`app/README.md`](../../../app/README.md#abilitare-lutente-regia-una-volta).
2. Sul PC: `cd app`, `npm install`, `npm run dev`; aprire `http://<IP del PC>:5173/regia` e `http://<IP del PC>:5173/schermo` (non `localhost`, altrimenti il QR non funziona dai telefoni).
3. In `/regia`: login, "Nuova serata di prova".
4. Con 2 telefoni sulla stessa Wi-Fi inquadrare il QR, poi percorrere tutta la serata con Spazio/PagGiù fino a "Fine", votando dai telefoni (domanda 11 con 2 scelte), provando "+10 s", la chiusura anticipata e un blocco/sblocco del telefono.
5. "Esporta CSV aggregati" e controllare il file.
6. Esito ok → il ticket si chiude (sezione Resolution e riga nella mappa).
