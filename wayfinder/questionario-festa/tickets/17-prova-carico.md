---
title: Prova di carico con 70 client
labels: [wayfinder:task]
status: open
assignee:
blocked_by: [16-deploy-vercel]
---

## Question

AFK, con Luca che osserva `/schermo` e `/regia`. Scrivere `app/scripts/carico/` e simulare su una serata di prova, contro la produzione, 70 Collegati che votano tutte le 12 domande nei tempi della [Scaletta e durata del momento questionario](09-scaletta-durata.md), più riconnessioni a metà voto. Misurare connessioni realtime, errori di `vota`, ritardo dei conteggi e limiti Supabase Free (200 connessioni, 100 messaggi/s). Va fatta prima della prova generale. Il risultato registra le misure e gli eventuali correttivi.
