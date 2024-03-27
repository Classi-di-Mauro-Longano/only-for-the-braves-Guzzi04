document.addEventListener('DOMContentLoaded', function () {
    const elencoLezioni = document.getElementById('elenco-lezioni');
    const moduloLezione = document.getElementById('modulo-lezione');
    const titoloInput = document.getElementById('titolo');
    const descrizioneInput = document.getElementById('descrizione-lezione');
    const dataOraInput = document.getElementById('data-ora-lezione');
    const eliminaTutteButton = document.getElementById('elimina-tutte');
    
// Aggiungi lezione
moduloLezione.addEventListener('submit', function (e) {
    e.preventDefault();                                   //quando invio i dati in un form non carica la pagina
    const titolo = titoloInput.value;
    const descrizione = descrizioneInput.value;
    const dataOra = dataOraInput.value;
  
    if (titolo && descrizione && dataOra) {
      aggiungiLezione(titolo, descrizione, dataOra);
        titoloInput.value = '';
        descrizioneInput.value = '';
        dataOraInput.value = '';
    }
});

// Elimina lezione
elencoLezioni.addEventListener('click', function (e) {
    if (e.target.classList.contains('elimina')) {
      eliminaLezione(e.target.parentElement);
    }
});

// Elimina tutte le lezioni
eliminaTutteButton.addEventListener('click', function () {
    eliminaTutteLezioni();
});
    
// Carica le lezioni salvate al caricamento della pagina
caricaLezioniSalvate();

// Aggiungere una nuova lezione
function aggiungiLezione(titolo, descrizione, dataOra) {
    const lezione = document.createElement('div');
    lezione.classList.add('lezione');
    lezione.innerHTML = `
      <p>
        ${titolo}<br>
        ${descrizione}<br>
        ${formattaData(dataOra)}
      </p>
      <button class="elimina">Elimina</button>
      `;
    elencoLezioni.appendChild(lezione);
    salvaLezione(descrizione, dataOra);
}

// Eliminare una lezione
function eliminaLezione(lezione) {
    const descrizione = lezione.querySelector('p ').textContent;
    lezione.remove();
    rimuoviLezione(descrizione);
}

// Rimuovere una lezione dal localStorage
function rimuoviLezione(descrizione) {
    let lezioni = JSON.parse(localStorage.getItem('lezioni')) || [];
    lezioni = lezioni.filter(lezione => lezione.descrizione !== descrizione);
    localStorage.setItem('lezioni', JSON.stringify(lezioni));
}

// Salvo una lezione nel localStorage
function salvaLezione(descrizione, dataOra) {
    let lezioni = JSON.parse(localStorage.getItem('lezioni')) || [];
    lezioni.push({ descrizione, dataOra });
    localStorage.setItem('lezioni', JSON.stringify(lezioni));
}

// Carico le lezioni salvate al caricamento della pagina
function caricaLezioniSalvate() {
    let lezioni = JSON.parse(localStorage.getItem('lezioni')) || [];
    lezioni.forEach(lezione => {
      aggiungiLezione(lezione.descrizione, lezione.dataOra);
    });
}
    
// Elimino tutte le lezioni
    function eliminaTutteLezioni() {
    elencoLezioni.innerHTML = '';
    localStorage.removeItem('lezioni');
}

// Funzione per formattare la data
function formattaData(dataOra) {
    const data = new Date(dataOra);
    const opzioni = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    };
    return data.toLocaleString('it-IT', opzioni);
  }

});