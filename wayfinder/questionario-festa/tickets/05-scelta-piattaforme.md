---
title: Scelta delle piattaforme
labels: [wayfinder:grilling]
status: closed
assignee: Luca
blocked_by: [01-piattaforme-live, 02-strumento-messaggio-ad]
---

## Question

Alla luce delle ricerche, quale piattaforma live e quale strumento per il Messaggio all'AD si adottano: uno strumento pronto o la web app su misura? Con quale piano e quali compromessi?

Da decidere anche: chi possiede l'account dello strumento per il Messaggio all'AD (Luca, che passa il CSV all'AD e cancella le risposte, oppure un account con l'email dell'AD), visto che chi lo possiede vede le risposte.

Nota dal [Set di domande definitivo](03-set-domande.md): il Messaggio all'AD è formulato in prima persona dall'AD ("C'è qualcosa che vuoi dirmi?"), quindi chi scrive si aspetta che legga solo l'AD. Se l'account è di Luca, va valutato se questo è coerente con la promessa.

## Resolution

Per il Quiz e il Polso si usa una web app su misura (SPA) costruita da Luca: front-end su Vercel, voti e stato della serata su Supabase Realtime, entrambi sul piano gratuito e con account a nome di Luca. Per il Messaggio all'AD si usa Tally, con un account creato con l'email personale dell'AD. Come riserva c'è un Google Form personale dell'AD.

| Scelta | Strumento | Piano | Account |
|---|---|---|---|
| Quiz e Polso proiettati | SPA su misura (Vercel + Supabase Realtime) | Free (Vercel Hobby, Supabase Free) | Luca |
| Messaggio all'AD | Tally | Free | Email personale dell'AD |
| Riserva Messaggio all'AD | Google Form | Account Google personale dell'AD | AD |

Motivazioni:
- **SPA invece di uno strumento pronto:** nessun piano gratuito regge insieme 70 persone e 12 domande (ricerca 01). La SPA non costa niente, non mostra il marchio di altri fornitori e lascia libere le Rivelazioni animate e la voce dell'AD. L'anonimato c'è per costruzione: niente account e niente dati nominativi. Inoltre non resta in giro nessun account di terzi che l'azienda possa vedere.
- **Tally separato dalla SPA:** il Messaggio all'AD resta scollegato dalle risposte in sala, come vuole il glossario. Tally è gratis, non chiede il login, dichiara di non raccogliere l'IP, chiude da solo a data, ora e fuso impostati, ed esporta in CSV.
- **Account Tally dell'AD:** la domanda "C'è qualcosa che vuoi dirmi?" promette che legga solo l'AD. Luca configura il form insieme all'AD. Poi l'AD cambia la password e Luca non entra più. L'AD scarica il CSV da solo, quindi va istruito con una guida di una pagina.

Compromessi accettati e vincoli:
- **Vercel Hobby:** il piano è riservato all'uso personale non commerciale, e un evento aziendale preparato da un dipendente è in zona grigia (da verificare). Luca sceglie comunque Vercel. Per ridurre il rischio, prima della serata conviene chiedere al supporto Vercel se l'uso è ammesso. In alternativa si attiva per un mese il piano Pro (prezzo da verificare) oppure si sposta il build statico su un altro hosting senza cambiare codice.
- **Supabase Free:** i voti vanno solo al canale della regia o al DB, mai in broadcast a tutti i telefoni (70×70 messaggi supererebbero il limite di 100 al secondo). Niente Presence per contare i presenti. Gli accessi dal QR riprovano da soli. Il progetto va "svegliato" nei giorni prima e la mattina stessa, perché va in pausa dopo circa una settimana di inattività.
- **Prova di carico obbligatoria** con circa 70 client simulati, prima della prova generale.
- **Lavoro e rischio tecnico a carico di Luca:** il fornitore non dà supporto. Il Piano B (slide statiche e alzata di mano) resta necessario.
- **Configurazione Tally:** una sola domanda, nessun campo nome o email, nessun hidden field né parametro nel link del QR. Vanno lasciati spenti "Prevent duplicate submissions", il blocco paese e le notifiche email con il contenuto. La chiusura è a 48 ore dalla serata, con fuso Europe/Rome. Il QR e la chiusura all'ora giusta vanno provati a mano.
- **Riservatezza:** entrambi gli account sono personali e fuori dalla suite aziendale. Board e direzione non vedono niente.
