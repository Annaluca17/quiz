# Research 02 – Strumento per il Messaggio all'AD (anonimo, 48 ore)

Ticket: [../tickets/02-strumento-messaggio-ad.md](../tickets/02-strumento-messaggio-ad.md) · Data verifica: **2026-10-25**

> **Metodo e limite.** Fonti solo first-party (domini ufficiali dei fornitori). Il proxy di questa sessione bloccava l'apertura diretta delle pagine: ogni affermazione è presa dagli estratti indicizzati delle pagine ufficiali (ricerca limitata ai domini del fornitore), verificati il 2026-10-25. Quello che non risulta esplicito è marcato **da verificare**. Prima della decisione finale conviene un controllo a mano di 10 minuti nelle impostazioni reali.

## Requisiti (dal ticket e dalla mappa)

Testo libero · nessun login/email/IP visibile al gestore · chiusura automatica a 48 h · link/QR sull'ultima schermata · export solo all'AD · gratis, fuori dalla suite aziendale, web senza installazione.

## Confronto

| | **Tally** | **Google Forms (account personale)** | **Framaforms** | **Open-ended della piattaforma live** | **Form nella SPA su misura** |
|---|---|---|---|---|---|
| Piano gratuito | Sì: form e risposte illimitati, "99% delle funzioni" gratis [T1][T2] | Sì, account Google personale [G2] | Sì (servizio associativo) [F1] | Mentimeter free: **50 partecipanti/mese** [M1]; Slido Basic: anonimato sì, **export solo a pagamento** [S1][S2] | Vercel Hobby + Supabase Free [V1][SB1] |
| Login richiesto al rispondente | No | No se: email "Do not collect", **"Limit to 1 response" spento**, niente upload né quiz; altrimenti serve login Google [G2][G3][G4] | No | No (codice/QR) [M2] | No (dipende da come la costruiamo) |
| Identità/email visibile al gestore | No per default; da evitare campi nome, hidden fields, "Prevent duplicate submissions" [T3][T4] | Email non raccolta per default [G2]; con login attivo nomi non registrati se l'email è spenta [G3] | Solo se il form ha campi nome/cognome [F2] | Mentimeter: anonimo per default [M2]; Slido: anonimo per default dal 2026, ma gli open text possono mostrare nomi se attivati [S1][S3] | Nessuna se non la salviamo |
| IP visibile al gestore | FAQ ufficiale: "Tally does not currently collect IP addresses upon form submission". L'IP è usato solo se si aggiunge il blocco "paese" o l'anti-duplicati per IP (da non usare) [T3][T4] | Non esposto nelle risposte: **da verificare** (nessuna fonte esplicita trovata) | "Normalmente impossibile" per il creatore recuperare gli IP [F2] | **da verificare** | Vercel Hobby: log runtime tenuti 1 h [V1]; Supabase Free: log API 1 giorno [SB1]. Se negli header compare l'IP è **da verificare**; si può evitare di salvarlo |
| Chiusura automatica a data **e ora** | Sì, gratis: "Close forms on limit or date" [T1][T2]; l'API ha `closeDate`, `closeTime`, `closeTimezone` (es. Europe/Rome) [T5] | Sì, nativa da gen. 2026, anche per account personali: chiude a data/ora o a numero di risposte [G1] | Solo **data** di scadenza (form "désactivé") o chiusura manuale; nessuna ora documentata [F1][F3] | Mentimeter/Slido: chiusura a orario **da verificare** (non trovata) | Sì, è un controllo nel nostro codice (`now > chiusura`) |
| Link / QR | Link; QR citato tra le opzioni di condivisione [T6] (passi esatti **da verificare**) | Link + "Shorten URL" [G5]; QR nativo **non documentato** → QR generato a parte dal link | Link; QR **da verificare** | QR/codice della sessione [M2] | Link nostro; QR generato a parte |
| Export | CSV dalla tab Submissions, gratis [T6]; parziali solo Pro (meglio, non servono) [T7] | CSV o Google Sheets [G5][G6] | CSV dalla tab Risultati [F4] | Slido: export a pagamento [S2]; Mentimeter: **da verificare** | Quello che costruiamo (es. CSV dalla dashboard Supabase) |
| Dati / GDPR | Dati in UE (Google Cloud Belgio), Tally è il responsabile del trattamento, DPA disponibile [T8] | Google (account personale) | Framasoft (FR) | Fornitori UE/US: **da verificare** | Regione scelta da noi |
| Rischi noti | Account e dati a nome di chi crea il form | Facile riattivare per errore un'opzione che chiede il login | Interruzioni nel 2026: server giù per ~6 h il 23/09 e offline il 21/10 per una falla PHP [F5]; scadenze e menu da documentazione vecchia | Mentimeter free non regge 70 persone; il Messaggio sarebbe legato alla sessione proiettata (il glossario lo vuole "scollegato") | Tempo di sviluppo e test; progetto Supabase Free in pausa dopo 1 settimana di inattività [SB1] |

## Note per l'anonimato (per ogni strumento)

- Una sola domanda a testo libero, nessun campo nome/email, nessun hidden field, nessun parametro nell'URL del QR.
- Tally: lasciare spenti "Prevent duplicate submissions", il blocco "Respondent's country", le notifiche email con il contenuto (passano da SendGrid, USA, solo se attivate [T8]).
- Google Forms: "Collect email addresses = Do not collect", "Limit to 1 response" **spento**, accesso "chiunque abbia il link".
- "Export riservato all'AD": su tutti gli strumenti chi possiede l'account vede le risposte. Opzioni: (a) account creato con l'email personale dell'AD e Luca che lo configura; (b) Luca scarica il CSV, lo consegna all'AD e cancella le risposte. Inviti a collaboratori/permessi di sola lettura: **da verificare** per ogni strumento.

## Raccomandazione

**Tally**, con **Google Forms (personale)** come piano B.

- **Perché Tally:** gratis senza limiti utili, nessun login, IP non raccolto (dichiarato dal fornitore), chiusura automatica a data, ora e fuso orario impostati, link + QR, CSV, dati in UE. È quello che copre tutti i requisiti senza pagare.
- **Trade-off di Tally:** l'anonimato dipende da quello che il fornitore dichiara e dalla nostra configurazione: niente audit indipendente. La procedura QR e la chiusura con ora vanno provate a mano. I contenuti si vedono da chiunque abbia accesso all'account.
- **Google Forms:** stesse funzioni chiave (chiusura data/ora nativa dal 2026), molto familiare. Contro: è più facile far chiedere il login per errore, il QR va generato a parte, e la policy sugli IP non è documentata in modo esplicito.
- **Da scartare:** Framaforms (niente chiusura a orario, instabile nel 2026). L'open-ended della piattaforma live (free troppo limitato, chiusura a orario non confermata, lega il Messaggio alla sala). SPA su misura solo se il ticket 01/05 sceglie già una SPA: è l'anonimato più controllabile, ma costa sviluppo.

## Fonti (estratti verificati il 2026-10-25)

- [T1] https://tally.so/features · [T2] https://tally.so/pricing · [T3] https://tally.so/help/prevent-duplicate-submissions · [T4] https://tally.so/help/respondents-country · [T5] https://developers.tally.so/documentation/creating-a-form-with-settings · [T6] https://tally.so/help/faq · [T7] https://tally.so/help/partial-submissions · [T8] https://tally.so/help/gdpr
- [G1] https://workspaceupdates.googleblog.com/2026/01/forms-stop-collecting-responses.html · [G2] https://support.google.com/appsheet/answer/14915518 · [G3] https://support.google.com/docs/answer/2839588 · [G4] https://support.google.com/docs/community-guide/395355672 (guida della community, non ufficiale) · [G5] https://support.google.com/a/users/answer/9303072 · [G6] https://support.google.com/docs/answer/139706
- [F1] https://framaforms.org/limitations · [F2] https://contact.framasoft.org/en/faq/ · [F3] https://docs.framasoft.org/fr/framaforms/fonctionnalites.html · [F4] https://docs.framasoft.org/fr/framaforms/deframasoftiser.html · [F5] https://status.framasoft.org/incidents/1100 , https://status.framasoft.org/incidents/1103
- [M1] https://help.mentimeter.com/en/articles/1258367-what-is-included-in-the-free-account · [M2] https://www.mentimeter.com/features/surveys
- [S1] https://community.slido.com/security-privacy-essentials-224/participant-privacy-choose-anonymous-or-named-participation-1609 · [S2] https://community.slido.com/pricing-plan-options-235/all-about-one-time-plans-611 (export a pagamento: risposta della community, **da verificare** sul listino) · [S3] https://community.slido.com/product-news-announcements-108/what-s-new-in-slido-march-2026-7714
- [V1] https://vercel.com/docs/logs/runtime · [SB1] https://supabase.com/pricing
