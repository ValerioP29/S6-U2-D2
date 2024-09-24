const saveButton = document.getElementById("save");
const deleteButton = document.getElementById("delete");
const textArea = document.querySelector("input");
const localStorageKey = "Names";
const form = document.getElementById("myForm");

// Funzione per salvare i nomi nel localStorage
const save = function (event) {
  event.preventDefault();

  const textAreaContent = textArea.value.trim(); // Rimuovi spazi vuoti
  if (textAreaContent === "") return; // Non fare nulla se il campo è vuoto

  let nameInLocalStorage = localStorage.getItem(localStorageKey);
  if (!nameInLocalStorage) {
    nameInLocalStorage = []; // Se non c'è nulla, inizializza come array vuoto
  } else {
    nameInLocalStorage = JSON.parse(nameInLocalStorage); // Parsalo in array
  }

  nameInLocalStorage.push(textAreaContent); // Aggiungi il nuovo nome
  localStorage.setItem(localStorageKey, JSON.stringify(nameInLocalStorage)); // Aggiorna localStorage

  textArea.value = ""; // Resetta il campo input
  generateListFromLocalStorage(); // Aggiorna la lista
};

// Funzione per cancellare il contenuto dal localStorage e dall'input
const reset = function () {
  textArea.value = ""; // Resetta il campo input
  localStorage.removeItem(localStorageKey); // Rimuove tutto dal localStorage
  generateListFromLocalStorage(); // Aggiorna la lista
};

// Funzione per generare la lista dal localStorage
const generateListFromLocalStorage = function () {
  const nameMemory = localStorage.getItem(localStorageKey);
  const ul = document.querySelector("ul");
  ul.innerHTML = ""; // Pulisci la lista esistente
  if (nameMemory) {
    const arrayOfName = JSON.parse(nameMemory);
    arrayOfName.forEach((name) => {
      const newLi = document.createElement("li");
      newLi.classList.add("list-group-item");
      newLi.innerText = name; // Aggiungi il nome all'elemento <li>
      ul.appendChild(newLi);
    });
  }
};

// Carica la lista al caricamento della pagina
window.addEventListener("load", generateListFromLocalStorage);

// Aggiungi eventi ai pulsanti
form.addEventListener("submit", save);
deleteButton.addEventListener("click", reset);

//ESERCIZIO 2
const sessionStorageKey = "counter";
const counterDisplay = document.getElementById("counterValue");
const resetButton = document.getElementById("reset");
let counter = sessionStorage.getItem(sessionStorageKey);

// Funzione per aggiornare il display del contatore
const updateCounterDisplay = function () {
  counterDisplay.innerText = counter;
};

// Funzione per incrementare il contatore
const incrementCounter = function () {
  counter++;
  sessionStorage.setItem(sessionStorageKey, counter); // Salva il valore nel Session Storage
  updateCounterDisplay();
};

// Avvia il contatore automatico
setInterval(incrementCounter, 1000); // Incrementa ogni secondo

// Funzione per resettare il contatore
const resetCounter = function () {
  counter = 0;
  sessionStorage.setItem(sessionStorageKey, counter); // Resetta il valore nel Session Storage
  updateCounterDisplay();
};

// Aggiorna il contatore al caricamento della pagina
updateCounterDisplay();

// Aggiungi event listener al pulsante di reset
resetButton.addEventListener("click", resetCounter);
