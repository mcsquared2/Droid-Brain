window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
 
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
 
if (!window.indexedDB) {
   window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

let db;
let dbReq = indexedDB.open('myDatabase', 2);

let reverseOrder = false;

dbReq.onupgradeneeded = function(event) {
  // Set the db variable to our database so we can use it!  
  db = event.target.result;

  // Create an object store named notes. Object stores
  // in databases are where data are stored.
  let notes;
  if (!db.objectStoreNames.contains('notes')) {
    notes = db.createObjectStore('notes', {autoIncrement: true});
  } else {
    notes = dbReq.transaction.objectStore('notes');
  }  // If there isn't already a timestamp index, make one so we
  // can query notes by their timestamps
  if (!notes.indexNames.contains('timestamp')) {
    notes.createIndex('timestamp', 'timestamp');
  }
};

dbReq.onsuccess = function(event) {
  db = event.target.result;
  getAndDisplayNotes(db);
};

dbReq.onerror = function(event) {
  alert('error opening database ' + event.target.errorCode);
}

function addStickyNote(db, message) {
  // Start a database transaction and get the notes object store
  let tx = db.transaction(['notes'], 'readwrite');
  let store = tx.objectStore('notes');  // Put the sticky note into the object store
  let note = {text: message, timestamp: Date.now()};
  store.add(note);  // Wait for the database transaction to complete
  tx.oncomplete = function() { getAndDisplayNotes(db) }
  tx.onerror = function(event) {
    alert('error storing note ' + event.target.errorCode);
  }
}

function submitNote() {
  let message = document.getElementById('newmessage');
  addStickyNote(db, message.value);
  message.value = '';
}

function addManyNotes(db, messages) {
  let tx = db.transaction(['notes'], 'readwrite');
  let store = tx.objectStore('notes');  for (let i = 0; i < messages.length; i++) {    // All of the requests made from store.add are part of
    // the same transaction
    store.add({text: messages[i], timestamp: Date.now()});  }  tx.oncomplete = function() {console.log('transaction complete')};
}

function getAndDisplayNotes(db) {
  let tx = db.transaction(['notes'], 'readonly');
  let store = tx.objectStore('notes');  // Create a cursor request to get all items in the store, which 

  let index = store.index('timestamp');

  // we collect in the allNotes array
  let req = store.openCursor(null, reverseOrder ? 'prev' : 'next');
  let allNotes = [];

  req.onsuccess = function(event) {
    // The result of req.onsuccess is an IDBCursor
    let cursor = event.target.result;    if (cursor != null) {      // If the cursor isn't null, we got an IndexedDB item.
      // Add it to the note array and have the cursor continue!
      allNotes.push(cursor.value);
      cursor.continue();    } else {      // If we have a null cursor, it means we've gotten
      // all the items in the store, so display the notes we got
      displayNotes(allNotes);    }
  };  
  req.onerror = function(event) {
    alert('error in cursor request ' + event.target.errorCode);
  }
}

function displayNotes(notes) {
  let listHTML = '<ul>';
  for (let i = 0; i < notes.length; i++) {
    let note = notes[i];
    listHTML += '<li>' + note.text + ' ' + 
      new Date(note.timestamp).toString() + '</li>';
  }
  document.getElementById('notes').innerHTML = listHTML;
}



function flipNoteOrder(notes) {
  reverseOrder = !reverseOrder;
  getAndDisplayNotes(db);
}