---
title: Rivelazioni e animazioni video delle risposte
labels: [wayfinder:prototype]
status: closed
assignee: Luca
blocked_by: [03-set-domande, 05-scelta-piattaforme]
---

## Question

Come devono apparire e comportarsi le Rivelazioni (animazioni, brevi video, contatori del costo) perché il messaggio "ti costo tanto, ma ti voglio bene" arrivi con leggerezza? Si fa un prototipo grezzo su 1–2 domande di Quiz.

## Resolution

Le Rivelazioni usano un asse in euro con un pallino per ogni voto: la sala si vede come un insieme, mai come singoli. Dopo il voto la bandierina gold del valore reale cade sull'asse e mostra lo scarto "+X € di quanto stimato". Sul Quiz 3 segue una barra che scompone il costo. Si usano i colori aziendali Immedia. I brevi video non servono: bastano le animazioni.

| Passaggio | Sullo schermo | Note |
|---|---|---|
| Domanda | Domanda, 4 opzioni, contatore "Hanno risposto X su 70" | Durata del voto da fissare in scaletta |
| L'AD indovina | "?" a tutto schermo | Solo sui 2 Quiz scelti in scaletta |
| La sala ha stimato | Asse con un pallino cyan per voto, "in media X €" | La stima della sala è la media pesata dei voti |
| La realtà è | Bandierina gold sul valore reale e scarto tratteggiato "+X € di quanto stimato" | Mai la percentuale di chi ha sbagliato |
| Da dove vengono | Barra orizzontale a strati da 0 al valore reale, linea della stima della sala, legenda | Solo sul Quiz 3. Le voci si definiscono con i dati del ticket 04 |
| Commento | Lo schermo resta sulla Rivelazione | L'AD commenta solo a voce, compresa la puntualità degli stipendi sul Quiz 3 |

Regole:
- **Colori e font:** cyan aziendale per la sala, gold per la realtà, navy per il testo, fondo chiaro. Nunito per titoli e numeri, Inter per il testo. Logo Immedia nel piede, accanto alla barra di partecipazione.
- **Sempre visibile:** la barra di partecipazione con la soglia del premio della sala (ticket 06).
- **Regia:** si avanza con Spazio o PagGiù, quindi anche con un telecomando per slide. La regia non compare mai sullo schermo.
- **Animazioni:** i pallini cadono, la bandierina scende, gli strati crescono. Con "riduci movimento" attivo appaiono senza animazione.
- **Nessun video:** non c'è materiale da produrre fuori dalla SPA.
- **Valori:** nel prototipo i valori sono segnaposto. Le opzioni e le voci della scomposizione arrivano dal ticket 04, che vincola le opzioni a stare per lo più sotto il valore reale.

## Prototipo

Asset: `wayfinder/questionario-festa/prototypes/07-rivelazioni-prototype.html` sul branch [`prototype/07-rivelazioni`](https://github.com/Annaluca17/quiz/tree/prototype/07-rivelazioni/wayfinder/questionario-festa/prototypes) (si apre con doppio clic; anteprima privata: https://claude.ai/artifact/SJFW84nGkve7NUiycuBkZ7). Codice usa e getta: su main resta solo la decisione.

Quiz 3 e Quiz 7, valori e voti segnaposto in attesa della [Raccolta dei dati reali](04-dati-reali-quiz.md). Sequenza di regia comune: Domanda → L'AD indovina (facoltativo) → La sala ha stimato → La realtà è → Commento dell'AD. Avanza con Spazio/PagGiù, quindi anche con un telecomando per slide.

| Variante | Struttura | Come arriva il messaggio |
|---|---|---|
| A · Asse dei voti | Asse in euro, un pallino per voto sopra ogni opzione; la bandiera della realtà cade sull'asse con lo scarto "+X € di quanto stimato" | La sala si vede come insieme e vede la distanza |
| B · Contatore | Un solo numero a tutto schermo: parte dalla media della sala e corre fino al valore reale | Effetto sorpresa, minima lettura |
| C · Colonna | Colonna che si riempie a strati oltre la linea tratteggiata della stima; sul Quiz 3 gli strati scompongono il costo | Spiega perché il valore è alto, non solo quanto |

Domande poste a Luca (risposte nella Resolution):
- quale variante, o quale combinazione (es. pallini di A + scomposizione di C);
- stima della sala come media pesata (come nel prototipo) o come opzione più votata;
- scomposizione del costo sul Quiz 3: sì/no, e con quali voci (dipende dal ticket 04);
- commento dell'AD proiettato in prima persona o solo detto a voce;
- "brevi video" del Question: servono ancora o bastano le animazioni.

Iterazione 2 (scelta di Luca): variante A (asse con un pallino per voto) più la scomposizione della variante C, con i colori aziendali Immedia (cyan per la sala, gold per la realtà, navy per il testo; Nunito e Inter; logo nel piede). Sequenza: Domanda → L'AD indovina → La sala ha stimato → La realtà è → Da dove vengono (solo se il Quiz ha una scomposizione, ora il 3) → Commento dell'AD. Le varianti B e C restano solo nella cronologia del branch del prototipo.
