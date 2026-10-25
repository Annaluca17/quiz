---
title: Rivelazioni e animazioni video delle risposte
labels: [wayfinder:prototype]
status: open
assignee: Luca
blocked_by: [03-set-domande, 05-scelta-piattaforme]
---

## Question

Come devono apparire e comportarsi le Rivelazioni (animazioni, brevi video, contatori del costo) perché il messaggio "ti costo tanto, ma ti voglio bene" arrivi con leggerezza? Si fa un prototipo grezzo su 1–2 domande di Quiz.

## Prototipo

Asset: [prototypes/07-rivelazioni-prototype.html](../prototypes/07-rivelazioni-prototype.html) (si apre con doppio clic; anteprima privata: https://claude.ai/artifact/SJFW84nGkve7NUiycuBkZ7). Usa e getta: alla chiusura del ticket passa su un branch `prototype/07-rivelazioni` e su main resta solo la decisione.

Quiz 3 e Quiz 7, valori e voti segnaposto in attesa della [Raccolta dei dati reali](04-dati-reali-quiz.md). Sequenza di regia comune: Domanda → L'AD indovina (facoltativo) → La sala ha stimato → La realtà è → Commento dell'AD. Avanza con Spazio/PagGiù, quindi anche con un telecomando per slide.

| Variante | Struttura | Come arriva il messaggio |
|---|---|---|
| A · Asse dei voti | Asse in euro, un pallino per voto sopra ogni opzione; la bandiera della realtà cade sull'asse con lo scarto "+X € di quanto stimato" | La sala si vede come insieme e vede la distanza |
| B · Contatore | Un solo numero a tutto schermo: parte dalla media della sala e corre fino al valore reale | Effetto sorpresa, minima lettura |
| C · Colonna | Colonna che si riempie a strati oltre la linea tratteggiata della stima; sul Quiz 3 gli strati scompongono il costo | Spiega perché il valore è alto, non solo quanto |

Da decidere con Luca:
- quale variante, o quale combinazione (es. pallini di A + scomposizione di C);
- stima della sala come media pesata (come nel prototipo) o come opzione più votata;
- scomposizione del costo sul Quiz 3: sì/no, e con quali voci (dipende dal ticket 04);
- commento dell'AD proiettato in prima persona o solo detto a voce;
- "brevi video" del Question: servono ancora o bastano le animazioni.

Iterazione 2 (scelta di Luca): variante A (asse con un pallino per voto) più la scomposizione della variante C, con i colori aziendali Immedia (cyan per la sala, gold per la realtà, navy per il testo; Nunito e Inter; logo nel piede). Sequenza: Domanda → L'AD indovina → La sala ha stimato → La realtà è → Da dove vengono (solo se il Quiz ha una scomposizione, ora il 3) → Commento dell'AD. Le varianti B e C non sono più nel file.
