---
title: Verifica della connettività della location
labels: [wayfinder:task]
status: open
assignee: Luca
blocked_by: []
---

## Question

HITL. Verificare con la location, senza rivelare lo scopo, che il Wi‑Fi o la copertura 4G/5G reggano 70 smartphone in contemporanea, e che ci siano proiettore e ingresso video compatibili con il PC di regia. Il risultato registra rete, credenziali (dove sono conservate), copertura misurata e collegamento al proiettore.

## Preparazione

Stato: richiesta e checklist pronte; risultati da registrare dopo il contatto con la location.

### Vincolo di segretezza

- Lo scopo non compare né nella richiesta né in loco. Formula neutra: serata aziendale, ~70 persone, smartphone in uso libero, proiezione di contenuti dal PC.
- Evitare: "quiz", "voto", "QR", "domande", "AD", "sorpresa", "web app". Evitare anche "test di carico" o prove con molte persone.
- Canale: contatto diretto con la location a nome di Luca. Da verificare chi ha prenotato: se il referente è collegato a board o direzione, la richiesta può rimbalzare. In tal caso, chiedere tramite il referente già in possesso del segreto o telefonare direttamente al gestore tecnico.
- Il sopralluogo ha come pretesto la logistica generale (posizionamento schermo, tavoli), non una prova.

### Testo della richiesta

Oggetto: Serata del [data] – informazioni tecniche su rete e proiezione

> Buongiorno,
> in vista della serata del [data] presso di voi (circa 70 persone), vorrei qualche informazione tecnica per organizzare la parte audiovisiva.
>
> 1. Connettività: è disponibile una rete Wi‑Fi per gli ospiti? Quanti dispositivi contemporanei supporta, e con quale banda (in download e upload)? Richiede una password o una pagina di accesso? Se sì, è possibile averla in anticipo?
> 2. Copertura mobile: nella sala il segnale 4G/5G è buono con i principali operatori?
> 3. Proiezione: avete proiettore o schermo? Quale ingresso video (HDMI, VGA, altro), e a che distanza dal punto di collegamento si trova il PC? Servono adattatori?
> 4. Audio e corrente: è disponibile un impianto audio collegabile al PC? Ci sono prese vicino alla postazione?
> 5. Accesso anticipato: sarebbe possibile un sopralluogo o un accesso breve prima dell'evento per verificare i collegamenti?
> 6. Servizio: è previsto un breve intervento di apertura appena gli ospiti sono seduti. Sarebbe possibile iniziare a servire circa 30 minuti dopo?
>
> Resto a disposizione per un contatto telefonico.
> Grazie e cordiali saluti
> Luca Martino

### Checklist (da compilare)

Rete Wi‑Fi
- [ ] Rete ospiti esistente? Nome (SSID): 
- [ ] Credenziali: dove sono conservate (da non annotare qui in chiaro): 
- [ ] Pagina di accesso (captive portal) o password semplice? Il captive portal può bloccare le web app: preferire password semplice o rete senza portale.
- [ ] Limite di dispositivi per access point / per rete: 
- [ ] Banda dichiarata in download/upload: 
- [ ] Numero di access point nella sala: 
- [ ] Client isolation attiva? Non blocca l'accesso a Internet, ma va annotata.
- [ ] Filtri o firewall su domini/WebSocket? I siti dei servizi esterni devono essere raggiungibili.
- [ ] Referente tecnico raggiungibile la sera (nome e telefono): 

Copertura mobile
- [ ] Misura in sala con almeno 2 operatori diversi (4G/5G, barre, velocità): 
- [ ] Misura nei punti peggiori (fondo sala, tavoli distanti): 
- [ ] Hotspot di riserva di Luca testato: sì/no

Proiezione
- [ ] Proiettore/schermo disponibile (modello, risoluzione): 
- [ ] Ingresso video (HDMI/VGA/USB‑C) e lunghezza cavo: 
- [ ] Adattatori da portare: 
- [ ] Audio via HDMI o jack: 
- [ ] Luminosità in sala a luci soffuse: 
- [ ] Prese e prolunghe vicino alla regia: 

Logistica
- [ ] Data/ora del sopralluogo o accesso anticipato: 
- [ ] Orario di allestimento la sera dell'evento: 
- [ ] Servizio rinviato di circa 30 minuti dopo che gli ospiti si sono seduti: confermato sì/no

### Test minimi in loco (senza rivelare lo scopo)

- Velocità e latenza dal PC di regia sulla rete ospiti (speedtest generico).
- Apertura di un sito qualunque su 2 smartphone (iOS e Android) con la rete ospiti.
- Collegamento PC al proiettore: risoluzione, rapporto, audio.

Il carico a 70 dispositivi non è verificabile in loco senza rivelare lo scopo: si valuta dalle specifiche dichiarate; la copertura mobile è la rete di riserva per chi non si collega al Wi‑Fi.
