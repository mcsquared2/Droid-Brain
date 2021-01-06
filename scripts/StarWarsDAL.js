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
   
   DAL.SetUpIndex(CharacterStore, "Name", false);

   let TalentStore;
   DAL.SetUpObjectStore("Talents", TalentStore, true);

  // #region WeaponStore Setup
   let WeaponStore;
   DAL.SetUpObjectStore("Weapons", WeaponStore, true);
   WeaponStore.createIndex("Name", {unique: true});
   WeaponStore.createIndex("Skill", {unique: false});
   WeaponStore.createIndex("Damage", {unique: false});
   WeaponStore.createIndex("Crit", {unique: false});
   WeaponStore.createIndex("Range", {unique: false});
   WeaponStore.createIndex("Encumbrance", {unique: false});
   WeaponStore.createIndex("HardPoints", {unique: false});
   WeaponStore.createIndex("Mods", {unique: false});
   WeaponStore.createIndex("Price", {unique: false});
   WeaponStore.createIndex("Restricted", {unique: false});
   WeaponStore.createIndex("Rarity", {unique: false});
   WeaponStore.createIndex("Qualities", {unique: false});
   WeaponStore.createIndex("Abilities", {unique: false});
   WeaponStore.createIndex("BookSet", {unique: false});
   WeaponStore.createIndex("Source", {unique: false});
   // #endregion
   
  // #region OrdnanceStore Setup
  let OrdnanceStore;
  DAL.SetUpObjectStore("Ordnance", OrdnanceStore, true);
  DAL.SetUpIndex(OrdnanceStore, "Name", true);
  DAL.SetUpIndex(OrdnanceStore, "BaseDamage", false);
  DAL.SetUpIndex(OrdnanceStore, "AdditionalDamage", false);
  DAL.SetUpIndex(OrdnanceStore, "Encumbrance", false);
  DAL.SetUpIndex(OrdnanceStore, "Restricted", false);
  DAL.SetUpIndex(OrdnanceStore, "Price", false);
  DAL.SetUpIndex(OrdnanceStore, "Rarity", false);
  DAL.SetUpIndex(OrdnanceStore, "BlastRadius", false);
  DAL.SetUpIndex(OrdnanceStore, "AbilityNotes", false);
  DAL.SetUpIndex(OrdnanceStore, "BookSet", false);
  DAL.SetUpIndex(OrdnanceStore, "Source", false);
  console.log("Made it to the first insert.");
  DAL.Ordnance.Insert(new Ordnance("Boom Boom Stick", 5, 7, 1, false, 125, 5, "short", [], "homebrew", "mcsquared"));
  //#endregion

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
  SetUpIndex: function(store, indexName, unique){
    if(!store.indexNames.contains(indexName)){
      store.createIndex(indexName, indexName, {unique:unique});
    }
  },
  Ordnance: {
    Insert: function (ordnance){
      var transaction = swrpgdb.transaction(["Ordnance"], "readwrite");
      transaction.oncomplete = function(event) {
        alert("Added Ordnance to database");
      };
    
      transaction.onerror = function(event) {
        alert('<li>Transaction not opened due to error. Duplicate items not allowed.');
      };
    
      // create an object store on the transaction
      var objectStore = transaction.objectStore("toDoList");
      console.log(objectStore.keyPath);
    
      // Make a request to add our newItem object to the object store
      var objectStoreRequest = objectStore.add(ordnance);
    
      objectStoreRequest.onsuccess = function(event) {
        // report the success of our request
        alert("request successful");
      };
    }
  }
}