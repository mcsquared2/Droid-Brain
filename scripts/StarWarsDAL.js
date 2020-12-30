window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
 
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
 
if (!window.indexedDB) {
   window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

let swrpgdb;
let swrpgdbReq = indexedDB.open('myDatabase', 2);

dbReq.onupgradeneeded = function(event) { 
   swrpgdb = event.target.result;
 
   
   let CharacterStore;
   if (!swrpgdb.objectStoreNames.contains('Characters')) {
     CharacterStore = swrpgdb.createObjectStore('Characters', {autoIncrement: true});
   } else {
     CharacterStore = swrpgdbReq.transaction.objectStore('Characters');
   }  
   
   if (!CharacterStore.indexNames.contains('name')) {
     CharacterStore.createIndex('name', 'name');
   }

   let TalentStore;
   if (!swrpgdb.objectStoreNames.contains('Talents')){
     TalentStore = swrpgdb.createOnjectStore('Talents', {autoIncrement: true});
   } else {
     TalentStore = swrpgdbReq.transaction.objectStore('Talents');
   }

   let WeaponStore;
   let ArmorStore;
   let StarshipStore;
   let GearStore;
   let GearModStore;
   let StarshipModStore;
   let ConditionStore;
   let DemolitionStore;
   let SpecieStore;
   let ForcePowerStore;
 };

 let DAL ={
   SetUpObjectStore: function(storeName, storeVariable, autoIncrement) {
      if (!swrpgdb.objectStoreNames.contains(storeName)){
        storeVariable = swrpgdb.createObjectStore(storeName, {autoIncrement: autoIncrement});
      } else {
        storeVariable = swrpgdbReq.transaction.objectStore(storeName);
      }
   },
 }