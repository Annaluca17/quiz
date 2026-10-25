# Ricerca 01 – Piattaforme live gratuite per 70 partecipanti anonimi

Ticket: [../tickets/01-piattaforme-live.md](../tickets/01-piattaforme-live.md) · Verificato il **2026-10-25**

## Metodo e affidabilità

- Da questa sessione **non è stato possibile aprire direttamente** le pagine prezzi (il proxy di rete rifiuta i domini dei vendor). I dati vengono dal motore di ricerca, filtrato **solo sui domini ufficiali** (sito, help center, community del vendor), data controllo 2026-10-25.
- Livelli di fonte: **[H]** help center/docs ufficiali · **[P]** pagina prezzi ufficiale · **[C]** risposta staff nella community ufficiale · **[B]** blog del vendor (spesso marketing su concorrenti).
- Tutto ciò che non è confermato da [H]/[P] è marcato **da verificare**. Prima della scelta: aprire a mano la pagina prezzi del vendor scelto e fare uno screenshot datato.

## Requisiti (dal ticket e dalla map)

70 persone in contemporanea · QR → browser, niente app né login · Quiz con rivelazione risposta · Polso (scala 1–5, nuvola di parole, scelta multipla) in diretta · gamification anonima (squadre/nickname) · media/video · anonimato reale · export (solo all'AD) · costo zero o una tantum minima · account a nome di Luca, niente suite aziendale.

## Limiti dei piani gratuiti

| Piattaforma | Partecipanti (free) | Domande/slide (free) | Quiz | Anonimato | Export (free) | Media/video | Fonti |
|---|---|---|---|---|---|---|---|
| **Mentimeter** | **50 al mese** per account [H] (reset e "una presentazione illimitata": da verificare) | Slide domanda/quiz/contenuto illimitate, max 200 per presentazione [H] | Sì, quiz con classifica | Partecipazione anonima di default: da verificare | **No**: export Excel solo da Basic in su [H] | da verificare (import PPT/PDF non disponibile sul free [H]) | [1] [2] [3] |
| **Slido** | **100 per evento** [C] | **3 sondaggi + 1 quiz** per evento (5 in alcune regioni) [C]; quiz fino a ~30 domande consigliate [C] | Sì, ma nel quiz il nome è richiesto per la classifica (si può usare qualsiasi nickname) [C] | Anonimo o nominativo su tutti i piani [C] | da verificare | da verificare | [4] [5] [6] |
| **AhaSlides** | **50 live** [P]; oltre il limite nuovi accessi bloccati [P] | **5 domande quiz + 3 sondaggi** per presentazione [P] | Sì (anche a squadre: da verificare sul free) | da verificare | da verificare | da verificare | [7] [8] |
| **Wooclap** | **1.000 per evento** [B] (da verificare su pagina prezzi) | **5 domande per evento** [B]; altre pagine dicono 2/evento o 5/mese → **da verificare** | Sì (modalità competizione: da verificare sul free) | da verificare | "export base" [B]; Excel/PDF da Basic [B] → **da verificare** | da verificare | [9] |
| **Kahoot!** | **10 giocatori** per partita (piano Go/Basic) [H][P]; 40 per account scuola (doc datata) | da verificare | Sì, cuore del prodotto | Nickname libero; generatore nickname: da verificare | da verificare | da verificare | [10] |
| **Wayground (ex Quizizz)** | **100 per sessione** piano Starter/Basic (scuola) [H]; prodotto Business: trial 14 gg, 30 partecipanti [H] | da verificare | Sì | da verificare | da verificare | da verificare | [11] [12] |
| **Particify** (ex ARSnova, open source) | **Nessun limite pubblicato trovato** → da verificare | Stanze illimitate [H] | Quiz con competizione [H] | da verificare (nato per l'università, accesso via codice stanza) | da verificare | da verificare | [13] [14] |

### Opzioni a pagamento una tantum (solo indicative)

- **Slido one-time**: piani evento singolo con tetto 200 / 1.000 / 5.000 partecipanti [C]; prezzi solo da post utente (~60 $ Engage, ~240 $ Professional) → **da verificare** [15].
- **AhaSlides**: piani one-time **dismessi** [B]; esistevano pacchetti "Festive" una tantum (19,90 / 36,90 USD) oggi indicati come **scaduti** → da verificare [16] [17]. Rimborso pieno entro 14 gg se non usato in un evento live [B].
- **Mentimeter / Wooclap / Kahoot / Wayground**: solo abbonamenti mensili/annuali nelle fonti trovate; nessuna una tantum confermata.

## SPA su misura (Vercel + Supabase Realtime, piani free)

| Voce | Limite free | Impatto per 70 client | Fonte |
|---|---|---|---|
| Supabase connessioni realtime concorrenti | **200** per progetto | 70 telefoni + regia + proiettore ≈ 72 → ok, margine ~2,7× | [18] |
| Supabase messaggi/secondo | **100** (media mobile sull'ultimo minuto); ogni consegna a ciascun iscritto conta 1 | 1 broadcast della regia a 70 client = 70 messaggi → ok. **Voti rilanciati a tutti = 70×70 = 4.900 → sfora.** I voti vanno solo al canale della regia/DB, mai in broadcast a tutti | [18] |
| Supabase join canale/s | 100 | 70 accessi quasi simultanei dal QR → al limite; serve retry automatico (supabase-js si riconnette) | [18] |
| Presence | 20 msg/s | evitare Presence per il conteggio presenti, oppure campionarlo | [18] |
| Quota mensile | 2 M messaggi, 200 picchi di connessione, nessun addebito extra | ampiamente sufficiente | [18] |
| Superamento | canali chiusi + rejoin; REST 429; sospensione se si sfora "di molto" | rischio reale solo con fan-out sbagliato | [18] [19] |
| Pausa progetto free | pausa dopo ~1 settimana di bassa attività (avviso email) | ripristinare/"svegliare" il progetto giorni prima della serata e la mattina stessa | [20] |
| **Vercel Hobby** | **solo uso personale non commerciale**; commerciale = beneficio economico per chiunque, compreso un dipendente che scrive il codice | un evento aziendale preparato da un dipendente è **zona grigia** (thread community senza risposta ufficiale) → **da verificare** con Vercel Support, oppure usare altro hosting statico (es. Cloudflare Pages/Netlify: condizioni da verificare) | [21] [22] |

Pro: costo zero, anonimato totale per costruzione (nessun account, nessun log nominativo se non lo si scrive), rivelazioni animate e tono su misura, export solo all'AD, nessun account terzo visibile all'azienda.
Contro: sviluppo e test a carico di Luca (≈ giorni di lavoro), nessun supporto, rischio tecnico la sera stessa, video da ospitare (Supabase Storage/YouTube incorporato: da verificare), serve prova di carico con ~70 client.

## Sintesi del confronto rispetto ai requisiti

| Piattaforma | 70 live gratis? | Quiz + Polso completi gratis? | Export gratis? | Giudizio |
|---|---|---|---|---|
| Mentimeter | **No** (50/mese) | Sì, slide illimitate | No | Escluso sul free; ottimo con Basic a pagamento |
| Slido | Sì (100) | **No**: 3 sondaggi + 1 quiz | da verificare | Free troppo stretto; one-time a pagamento plausibile |
| AhaSlides | **No** (50) | No (5 quiz + 3 poll) | da verificare | Escluso sul free |
| Wooclap | Sì (1.000, da verificare) | **No**: ~5 domande | da verificare | Escluso salvo Polso minimo |
| Kahoot! | **No** (10) | — | — | Escluso |
| Wayground | Sì (100, piano scuola) | da verificare | da verificare | Piano free pensato per docenti: uso aziendale da verificare nei termini |
| Particify | da verificare | probabilmente sì | da verificare | Unico candidato free "pieno", ma tutto da verificare |
| SPA su misura | Sì (200 conn.) | Sì (lo si costruisce) | Sì | Unica opzione certa a costo zero, ma costa tempo |

## Raccomandazione

1. **A costo zero nessuno strumento pronto soddisfa tutti i requisiti** con limiti confermati: chi regge 70 persone (Slido, Wooclap) taglia il numero di domande; chi non le taglia (Mentimeter) non regge 70 persone.
2. **Opzione A – SPA su misura (Supabase free + hosting statico)**: preferita se Luca ha tempo per sviluppo + prova di carico. Vincoli: voti solo verso la regia (niente fan-out), progetto "sveglio" prima della serata, hosting non-Hobby o conferma scritta da Vercel. Massimo controllo su anonimato, tono e rivelazioni.
3. **Opzione B – una tantum a pagamento**: Slido one-time Engage (tetto 200) o un mese di Mentimeter Basic, se l'AD accetta una piccola spesa; prezzi **da verificare** sulle pagine ufficiali. Minimo rischio tecnico, ma account esterno e anonimato dipendente dalle impostazioni del vendor.
4. **Da testare subito (gratis)**: Particify (limiti e anonimato) – se regge 70 partecipanti senza tetti sulle domande, diventa l'alternativa zero-sviluppo.
5. Piano B in ogni caso: domande in slide statiche + alzata di mano/cartellini (vedi ticket Piano B).

## Fonti (controllate il 2026-10-25, tramite indice di ricerca sui domini ufficiali)

1. Mentimeter Help – How many people can participate in a Menti? https://help.mentimeter.com/en/articles/465589-how-many-people-can-participate-in-a-menti
2. Mentimeter Help – What is included in the free account? https://help.mentimeter.com/en/articles/1258367-what-is-included-in-the-free-account
3. Mentimeter Help – Export results to Excel https://help.mentimeter.com/en/articles/410566-export-results-to-excel · Pricing https://www.mentimeter.com/plans
4. Slido Community – How many polls can I use in the free plan? https://community.slido.com/community-q-a-7/how-many-polls-can-i-use-in-the-free-plan-6781
5. Slido Community – How many participants for a free Plan User? https://community.slido.com/community-q-a-7/how-many-participants-for-a-free-plan-user-7842
6. Slido Community – Participant Privacy https://community.slido.com/security-privacy-essentials-224/participant-privacy-choose-anonymous-or-named-participation-1609 · Can I be anonymous in a quiz? https://community.slido.com/community-q-a-7/can-i-be-anonymous-in-a-quiz-7126
7. AhaSlides – Pricing https://ahaslides.com/pricing/
8. AhaSlides Docs – What is included in the free account? https://help.ahaslides.com/portal/en/kb/articles/what-is-included-in-the-free-account
9. Wooclap Blog (vendor) – Mentimeter vs Wooclap 2026 https://www.wooclap.com/en/blog/mentimeter-vs-wooclap/ · Kahoot vs Wooclap https://www.wooclap.com/en/blog/kahoot-vs-wooclap/ (pagina prezzi ufficiale non raggiunta)
10. Kahoot! Support – How many participants can play a kahoot? https://support.kahoot.com/hc/en-us/articles/115003072287-How-many-participants-can-play-a-kahoot
11. Wayground Help – Understanding Wayground Plans https://help.wayground.com/support/solutions/articles/158000403874-understanding-wayground-plans · Plans https://wayground.com/home/plans
12. Wayground for Business – Free trial https://forbusiness-help.wayground.com/support/solutions/articles/158000411056-what-s-available-on-the-wayground-for-business-free-trial-
13. Particify – Help/FAQ https://www.particify.de/en/help/ · Features https://www.particify.de/en/features/
14. Particify – Termini piano free https://www.particify.de/en/terms/free/
15. Slido Community – All about one-time plans https://community.slido.com/pricing-plan-options-235/all-about-one-time-plans-611
16. AhaSlides Blog – Removal of the One-time Plans https://ahaslides.com/blog/removal-of-one-time-plan/
17. AhaSlides Blog – Promo codes (checked October 2026) https://ahaslides.com/blog/ahaslides-promo-codes-vouchers-and-coupons-the-most-up-to-date-list/
18. Supabase Docs – Realtime Limits https://supabase.com/docs/guides/realtime/limits · Realtime Pricing https://supabase.com/docs/guides/realtime/pricing
19. Supabase KB – Realtime project suspended for exceeding quotas https://supabase.com/kb/troubleshooting/realtime-project-suspended-for-exceeding-quotas
20. Supabase Docs – Project Pausing https://supabase.com/docs/guides/platform/free-project-pausing
21. Vercel Docs – Fair Use Guidelines https://vercel.com/docs/limits/fair-use-guidelines · Hobby plan https://vercel.com/docs/plans/hobby · Terms https://vercel.com/legal/terms
22. Vercel Community – Internal-only tool on Hobby? https://community.vercel.com/t/is-an-internal-only-tool-for-a-small-company-allowed-on-the-hobby-plan/49097
