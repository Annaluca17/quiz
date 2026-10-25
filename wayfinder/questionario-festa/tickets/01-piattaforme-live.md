---
title: Piattaforme live gratuite per 70 partecipanti anonimi
labels: [wayfinder:research]
status: closed
assignee:
blocked_by: []
---

## Question

Quali piattaforme, a costo zero o con spesa una tantum minima, reggono 70 partecipanti in contemporanea da browser (via QR, senza app né login), con:
- Quiz con rivelazione della risposta corretta,
- Polso (scala 1–5, nuvola di parole, scelta multipla) mostrato in diretta,
- gamification anonima (punteggio collettivo o di squadra, nickname casuali),
- media e video nelle slide,
- anonimato reale (nessun nome, email o tracciamento visibile al gestore),
- export dei risultati?

Confrontare gli strumenti pronti (es. Mentimeter, Slido, AhaSlides, Wooclap, Kahoot, Quizizz/Wayground, Particify) con l'alternativa di una SPA su misura ospitata gratis (es. Vercel + Supabase realtime). Per i limiti dei piani free servono fonti datate all'anno corrente.

## Research

Risultati: [../research/01-piattaforme-live.md](../research/01-piattaforme-live.md) (verificati il 2026-10-25).

## Resolution

Nessuno strumento pronto soddisfa tutti i requisiti nel piano free (limiti su partecipanti, numero di domande o export). Una web app su misura con Supabase free è fattibile per 70 client (200 connessioni concorrenti, 100 messaggi/s), a condizione di inviare i voti solo allo schermo di regia e di riattivare il progetto prima dell'evento. Vercel Hobby è riservato all'uso non commerciale: area grigia, da verificare o da sostituire con un altro hosting. Alternative: spesa una tantum per Slido single-event o Mentimeter Basic (prezzi da verificare); Particify da testare. Dettaglio: [research/01-piattaforme-live.md](../research/01-piattaforme-live.md).
