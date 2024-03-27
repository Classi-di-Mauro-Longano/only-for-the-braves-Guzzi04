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

