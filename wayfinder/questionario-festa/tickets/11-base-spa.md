---
title: Base della SPA
labels: [wayfinder:task]
status: open
assignee:
blocked_by: [10-architettura-spa]
---

## Question

AFK. Realizzare la base descritta nell'[Architettura della SPA](10-architettura-spa.md): progetto Supabase `questionario-festa` (eu-central-1, account Luca), migrazioni di `serate`, `stato`, `collegati`, `voti` con RLS e RPC `collega`, `vota`, `conteggi`; utente Regia in Supabase Auth; scaffold Vite + React + TS in `app/` con le tre viste, `src/contenuti/domande.ts` con valori segnaposto, hook `useStato` e `useConteggi`; `/regia` con login, macchina a fasi, tasti Spazio/PagGiù, countdown con chiusura automatica, "+10 s", creazione di una serata di prova, export CSV degli aggregati. Fatto quando una serata di prova si percorre dall'accoglienza alla fine da `/regia` con 2 telefoni reali che votano su schermate grezze. Il risultato registra URL del progetto e dove sono conservate le chiavi (mai in chiaro nel repo).
