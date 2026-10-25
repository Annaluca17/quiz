---
title: Questionario a sorpresa – festa aziendale
labels: [wayfinder:map]
status: open
---

## Destination

Specifica pronta da eseguire per il questionario live della festa aziendale (~70 persone, tra ~2 mesi): domande definitive con risposte corrette, piattaforma live + strumento per il Messaggio all'AD scelti, gamification anonima, rivelazioni animate, scaletta della serata, piano B.

## Notes

- Dominio: evento aziendale, comunicazione interna/HR. Glossario: [CONTEXT.md](CONTEXT.md).
- Skill da consultare: grilling + domain-modeling (default), research per i ticket research, prototype per le rivelazioni.
- Vincoli fermi:
  - segretezza totale: lo sanno solo l'AD e Luca; board e direzione all'oscuro; niente suite aziendale.
  - budget una tantum, possibilmente zero; servizi esterni ammessi; GDPR e DPO ok.
  - accesso via smartphone con QR → **web app via link, nessuna installazione** (iOS + Android).
  - anonimato totale; nessuna classifica nominativa.
  - tutto il Quiz e il Polso proiettati in diretta.
  - Luca in regia (account a nome di Luca), l'AD conduce (poco pratico di tecnologia).
- **Tono (vincolante su ogni ticket)**: l'AD è "sul piede di guerra" sui benefit dati per scontati; Luca fa da paciere. Il messaggio è "ti costo tanto, ricordalo, ma ti voglio bene": valorizzare, non rinfacciare; niente scontro con i dipendenti.
- Finalità del Quiz: rendere visibile il costo dei benefit ormai dati per scontati.
- A fine di ogni ticket: indicare a Luca prompt, skill e modello del passo successivo.
- Dopo la serata: export solo all'AD; sintesi ai dipendenti entro 2–3 settimane (esecuzione fuori perimetro).

## Decisions so far

<!-- una riga per ticket chiuso -->

- [Piattaforme live gratuite per 70 partecipanti anonimi](tickets/01-piattaforme-live.md): nessun free tier pronto è sufficiente; web app su misura (Supabase realtime) fattibile, in alternativa piano a pagamento una tantum (Slido/Mentimeter).
- [Strumenti gratuiti per il Messaggio all'AD anonimo di 48 ore](tickets/02-strumento-messaggio-ad.md): Tally come candidato principale, Google Form personale come riserva.
- [Set di domande definitivo](tickets/03-set-domande.md): 12 domande a scelta chiusa con la voce dell'AD (2 di apertura, 5 Quiz su costo ogni 100 € netti, buoni pasto, welfare, assicurazione sanitaria e premio di produzione, 4 Polso con spazio alle critiche, 1 di chiusura) più il Messaggio all'AD "C'è qualcosa che vuoi dirmi?".
- [Meccanica di gamification anonima](tickets/06-gamification.md): un'unica squadra, la sala. Le Rivelazioni mostrano "La sala ha stimato / La realtà è", una barra di partecipazione sblocca un premio collettivo a soglia raggiungibile e su 2 Quiz l'AD prova a indovinare il voto della sala. Niente punteggi individuali, nickname, squadre o classifiche.
- [Scelta delle piattaforme](tickets/05-scelta-piattaforme.md): SPA su misura (Vercel Hobby + Supabase Realtime free, account Luca) per Quiz e Polso; Tally con email personale dell'AD per il Messaggio all'AD (riserva: Google Form dell'AD); da verificare l'uso di Vercel Hobby per un evento aziendale.
- [Rivelazioni e animazioni video delle risposte](tickets/07-rivelazioni-animate.md): asse in euro con un pallino per voto, bandierina della realtà con lo scarto "+X € di quanto stimato" (stima = media pesata), scomposizione del costo solo sul Quiz 3, colori Immedia, commento dell'AD solo a voce, niente video.

## Not yet specified

- Battute a voce dell'AD per ogni Rivelazione (compresa la puntualità degli stipendi sul Quiz 3), da scrivere dopo i dati reali.
- Testo dell'annuncio finale dell'AD (slot a porta aperta, invito esplicito a scrivere anche le critiche nel Messaggio all'AD) + ultima schermata con link/QR al Messaggio all'AD.
- Prova generale (quando, con chi, senza rompere il segreto).
- Piano B: rete o piattaforma che cadono durante la serata.
- Gestione del segreto verso board e direzione fino alla serata (materiali, account, dati richiesti).

## Out of scope

- Esecuzione della restituzione dei risultati ai dipendenti (decisa nei principi, eseguita dopo l'evento).
