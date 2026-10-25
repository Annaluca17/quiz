---
title: Architettura della SPA
labels: [wayfinder:grilling]
status: closed
assignee: Luca
blocked_by: []
---

## Question

Con quale architettura si realizza la SPA per Quiz e Polso decisa nella [Scelta delle piattaforme](05-scelta-piattaforme.md): stack, struttura del codice, modello dati Supabase (stato della serata, Collegati, voti), schermate di Regia, proiettore e telefono, conteggio dei Collegati? I valori dei Quiz restano segnaposto finché la [Raccolta dei dati reali per le risposte del Quiz](04-dati-reali-quiz.md) è aperta.

Vincoli: [Set di domande definitivo](03-set-domande.md), [Scelta delle piattaforme](05-scelta-piattaforme.md), [Meccanica di gamification anonima](06-gamification.md), [Rivelazioni e animazioni video delle risposte](07-rivelazioni-animate.md), [Scaletta e durata del momento questionario](09-scaletta-durata.md).

## Resolution

SPA in Vite + React + TypeScript, cartella `app/` di questo repo (reso privato da Luca prima di scrivere i valori reali). Front-end su Vercel, stato e voti su un nuovo progetto Supabase dedicato `questionario-festa` (eu-central-1, account Luca). Tre viste: telefono, `/schermo` sul proiettore, `/regia` sul portatile. Lo stato della serata vive in Supabase: tutte le viste lo leggono, solo la Regia lo scrive.

| Area | Decisione |
|---|---|
| Stack | Vite + React + TS, supabase-js, CSS con variabili colore Immedia, Nunito e Inter in self-hosting, libreria `qrcode` |
| Viste | `/` telefono, `/schermo` solo visualizzazione (proiettore, schermo esteso), `/regia` con fuoco, tasti e telecomando (Spazio/PagGiù), "+10 s", Collegati, stato |
| Accesso Regia | Supabase Auth, email e password di Luca; scritture su `serate` e `stato` solo per quell'utente (RLS) |
| Contenuti | `app/src/contenuti/domande.ts`: 12 domande, opzioni, valori numerici delle opzioni dei Quiz, valore reale, scomposizione del Quiz 3, soglia del premio (80%), URL del Messaggio all'AD; flag `segnaposto` finché 04 è aperto. Il DB conosce solo gli id delle domande |
| Flusso | Telefoni e `/schermo` ascoltano la riga `stato` (Postgres Changes) e la rileggono a ogni riconnessione. Voto via RPC `vota`. Conteggi letti solo da `/schermo` e `/regia`, polling di 1 s su RPC aggregate. Nessun broadcast dei voti, niente Presence |
| Prove | Ogni prova (carico, generale) è una serata nuova in `serate`; una sola è attiva, una sola è marcata reale |
| Export | Dopo la serata la Regia scarica un CSV di soli aggregati per l'AD; voti grezzi e token cancellati entro 7 giorni; progetto in pausa |

Modello dati (Postgres):

| Tabella / RPC | Contenuto | Accesso anonimo |
|---|---|---|
| `serate` | `id`, `nome`, `reale`, `attiva`, `creata_il` | lettura della serata attiva |
| `stato` | `serata_id` (pk), `domanda`, `fase`, `scade_alle`, `aggiornato_il` | lettura |
| `collegati` | `serata_id`, `token`, `creato_il`; pk (`serata_id`, `token`) | nessuno, solo via RPC |
| `voti` | `serata_id`, `domanda`, `token`, `opzioni` (1–2 indici), `creato_il`; pk (`serata_id`, `domanda`, `token`) | nessuno, solo via RPC |
| `collega(token)` | registra il Collegato, idempotente | esecuzione |
| `vota(token, domanda, opzioni)` | accetta solo sulla domanda corrente, in fase di voto, entro `scade_alle` + 1 s; max 2 opzioni solo sulla domanda 11 | esecuzione |
| `conteggi()` | Collegati, votanti e distribuzione per domanda della serata attiva | esecuzione (sono gli stessi dati proiettati) |

Nessuna tabella contiene IP, user agent o dati nominativi. Il token è un UUID casuale in localStorage, mai collegato a una persona (06).

Fasi (`stato.fase`), avanzate dalla Regia col telecomando:

| Momento | Fasi | `/schermo` | Telefono |
|---|---|---|---|
| Accoglienza | `accoglienza` | QR e contatore dei Collegati | "Sei collegato" |
| Polso 1–2, 8–12 | `voto` → `distribuzione` | domanda, countdown, "Hanno risposto X su N" → distribuzione | opzioni → "Voto registrato" → "Guarda lo schermo" |
| Quiz 3–7 | `voto` → `indovina` (solo 4 e 7) → `stima` → `realta` → `scomposizione` (solo 3) | sequenza delle [Rivelazioni](07-rivelazioni-animate.md) | come Polso |
| Premio | `premio` | barra di partecipazione finale, premio sbloccato | "Guarda lo schermo" |
| Fine | `fine` | QR del Messaggio all'AD | pulsante al Messaggio all'AD, stesso URL del QR, senza parametri |

Regole:
- **Countdown:** `scade_alle` è l'ora del server; 30 s Quiz, 20 s Polso, 30 s domanda 11 (09). `/regia` chiude il voto a zero o quando i votanti sono pari ai Collegati; "+10 s" sposta `scade_alle`. Dopo la chiusura si avanza solo a mano.
- **Collegati:** `collega` all'apertura del telefono; conteggio cumulativo, non scende mai. Ricaricare non conta doppio; un secondo browser sullo stesso telefono sì (accettato). È il denominatore del contatore e della barra (09).
- **Riconnessione e ritardatari:** il telefono rilegge lo stato; se il voto è aperto e non ha votato, rivede la domanda, altrimenti "Voto registrato". Chi apre il QR dopo l'avvio entra ed è contato.
- **Barra di partecipazione:** media cumulativa di votanti/Collegati sulle domande chiuse, sempre visibile su `/schermo` con la soglia (06).
- **Stima della sala:** media pesata dei valori delle opzioni votate, calcolata nel client (07).
- **Telefono fuori dal voto:** mai risultati, solo "Guarda lo schermo".

Struttura del codice:

```
app/
  src/contenuti/domande.ts   contenuti e valori (segnaposto finché 04 è aperto)
  src/dati/                  client Supabase, RPC, hook useStato e useConteggi
  src/telefono/              viste del telefono
  src/schermo/               viste del proiettore e Rivelazioni
  src/regia/                 login, macchina a fasi, tastiera, export CSV
  src/stile/                 token Immedia, font
  supabase/migrations/       schema, RLS, RPC
  scripts/carico/            simulatore di Collegati e voti
  vercel.json                rewrite delle tre viste su index.html
```

Ticket di realizzazione: [Base della SPA](11-base-spa.md), [UI di voto sul telefono](12-ui-voto-telefono.md), [Proiettore e Rivelazioni](13-proiettore-rivelazioni.md), [Premio e schermata finale con QR di Tally](14-schermata-finale-tally.md), [Inserimento dei valori reali nella SPA](15-valori-reali-spa.md), [Deploy su Vercel](16-deploy-vercel.md), [Prova di carico con 70 client](17-prova-carico.md).
