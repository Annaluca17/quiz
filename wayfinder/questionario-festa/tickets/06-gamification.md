---
title: Meccanica di gamification anonima
labels: [wayfinder:grilling]
status: closed
assignee: Luca
blocked_by: [01-piattaforme-live]
---

## Question

Quale meccanica di gioco rende la serata divertente e mantiene il tono conciliante senza intaccare l'anonimato? Alcune opzioni: punteggio collettivo della sala, sfida "la sala contro l'AD", squadre per tavolo o reparto, nickname casuali, premio collettivo.

## Resolution

C'è una sola squadra: la sala. Il gioco è collettivo e non misura mai chi ha ragione: misura quanto la sala si è sottovalutata e quanto ha partecipato. Non ci sono punteggi individuali, nickname, squadre o classifiche di alcun tipo. La meccanica funziona allo stesso modo su uno strumento pronto e sulla web app su misura, quindi non dipende dalla [Scelta delle piattaforme](05-scelta-piattaforme.md).

| Elemento | Come funziona | Dove agisce |
|---|---|---|
| **"La sala ha stimato / La realtà è"** | Ogni Rivelazione mostra prima la distribuzione dei voti, poi il valore reale. Non si mostra mai la percentuale di chi ha sbagliato. Se la maggioranza è sotto il valore reale, l'AD lo commenta in positivo ("ci siamo tenuti bassi: valete di più di quanto pensate"). | Quiz 3–7 |
| **Obiettivo di partecipazione** | Una barra collettiva cresce a ogni domanda con la quota di voti sui presenti. Se a fine questionario supera la soglia, si sblocca il premio collettivo. Conta solo quanti votano, mai cosa votano. | Tutte le 12 domande |
| **Premio collettivo** | L'AD lo annuncia all'inizio e lo "consegna" alla sala in chiusura, prima dell'annuncio dello slot a porta aperta. | Chiusura |
| **"L'AD indovina la sala"** | Su 2 Quiz, prima di mostrare la distribuzione, l'AD prova a indovinare l'opzione più votata. Se sbaglia, è un momento di autoironia. Serve solo la voce, nessuna tecnologia. | 2 Quiz a scelta della scaletta |

Regole:
- **Nessuna competizione sul tempo:** niente punti per la velocità né timer stretti. La durata del voto si fissa nella scaletta.
- **Polso fuori dal gioco:** le domande Polso contano solo per la barra di partecipazione. Il loro contenuto non entra mai in punteggi o sfide.
- **Soglia raggiungibile:** la soglia del premio va tarata per essere raggiunta. Un premio mancato davanti all'AD rovinerebbe il tono. Il valore si fissa dopo la prova generale (proposta: 80% medio).
- **Premio:** da decidere con l'AD, a budget zero o simbolico (per esempio un brindisi offerto dall'AD). Non deve essere un nuovo benefit, per non mescolarsi con i Quiz sui costi.
- **Anonimato sugli strumenti pronti:** la classifica del quiz va disattivata o nascosta. Se lo strumento chiede un nome per giocare al quiz (Slido, secondo la [ricerca 01](../research/01-piattaforme-live.md)), i Quiz si impostano come sondaggi e la risposta corretta si mostra con la Rivelazione. Che la classifica si possa nascondere è da verificare sullo strumento scelto.
- **Anonimato sulla web app:** un token casuale nel browser serve solo a evitare i voti doppi e non è mai collegato a una persona. La barra di partecipazione legge solo i totali.

Opzioni scartate:
- **La sala contro l'AD:** mette l'AD e i dipendenti su fronti opposti, cioè proprio lo scontro da evitare. Sopravvive solo come gioco di autoironia ("L'AD indovina la sala").
- **Squadre per reparto:** confrontano i reparti tra loro, e nei reparti piccoli si può risalire a chi ha risposto.
- **Squadre per tavolo:** gruppi di circa 8 persone rendono più facile risalire alle risposte, e la scelta del tavolo aggiunge un passaggio all'accesso via QR. Il guadagno in divertimento non giustifica il rischio.
- **Nickname casuali:** implicano una classifica individuale. Le opzioni dei Quiz sono pensate perché quasi tutti sbaglino per difetto, quindi chi sta in fondo si sentirebbe esposto anche con uno pseudonimo.

Effetti sugli altri ticket:
- **Rivelazioni animate:** il formato "La sala ha stimato / La realtà è" e la barra di partecipazione sono gli elementi grafici di base.
- **Scaletta:** va previsto l'annuncio del premio all'inizio, i 2 Quiz di "L'AD indovina la sala" e la consegna del premio prima dell'annuncio finale.
- **Scelta delle piattaforme:** classifica nascondibile, quiz senza nome e numero dei presenti visibile alla regia diventano criteri di scelta.
