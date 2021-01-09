window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
 
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
 
if (!window.indexedDB) {
   window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

let swrpgdb;
let swrpgdbReq = indexedDB.open('myDatabase', 2);

swrpgdbReq.onupgradeneeded = function(event) { 
   swrpgdb = event.target.result;
 
   
   let CharacterStore;
   DAL.SetUp.NewObjestStore("Characters", CharacterStore, true); 
   
   DAL.SetUp.Index(CharacterStore, "Name", false);

   let TalentStore;
   DAL.SetUp.NewObjectStore("Talents", TalentStore, true);

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
  DAL.SetUp.NewObjectStore("Ordnances", OrdnanceStore, true);
  DAL.SetUp.Index(OrdnanceStore, "Name", true);
  DAL.SetUp.Index(OrdnanceStore, "BaseDamage", false);
  DAL.SetUp.Index(OrdnanceStore, "AdditionalDamage", false);
  DAL.SetUp.Index(OrdnanceStore, "Encumbrance", false);
  DAL.SetUp.Index(OrdnanceStore, "Restricted", false);
  DAL.SetUp.Index(OrdnanceStore, "Price", false);
  DAL.SetUp.Index(OrdnanceStore, "Rarity", false);
  DAL.SetUp.Index(OrdnanceStore, "BlastRadius", false);
  DAL.SetUp.Index(OrdnanceStore, "AbilityNotes", false);
  DAL.SetUp.Index(OrdnanceStore, "BookSet", false);
  DAL.SetUp.Index(OrdnanceStore, "Source", false);
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
  SetUp: {
    NewObjectStore: function(storeName, storeVariable, autoIncrement) {
      if (!swrpgdb.objectStoreNames.contains(storeName)){
        storeVariable = swrpgdb.createObjectStore(storeName, {autoIncrement: autoIncrement});
      } else {
        storeVariable = swrpgdbReq.transaction.objectStore(storeName);
      }
    },
    Transaction: function(storeName, action){
      var transaction = swrpg.transaction([storeName], action);
      transaction.oncomplete = function(event) {
        alert("Finished transaction for " + storeName);
      }

      transaction.onerror = function (event) {
        alert("Transaction for " + storeName + " recieved an error.");
      }

      return transaction;
      
    },
    Index: function(store, indexName, unique){
      if(!store.indexNames.contains(indexName)){
        store.createIndex(indexName, indexName, {unique:unique});
      }
    },
  },
  Ordnance: {
    Insert: function (ordnance){
      var transaction = swrpgdb.transaction(["Ordnances"], "readwrite");
      transaction.oncomplete = function(event) {
        alert("Added Ordnance to database");
      };
    
      transaction.onerror = function(event) {
        alert('<li>Transaction not opened due to error. Duplicate items not allowed.');
      };
    
      // create an object store on the transaction
      var objectStore = transaction.objectStore("Ordnances");
      console.log(objectStore.keyPath);
    
      // Make a request to add our newItem object to the object store
      var objectStoreRequest = objectStore.add(ordnance);
    
      objectStoreRequest.onsuccess = function(event) {
        // report the success of our request
        alert("request successful");
      };
    },
    BatchInsert: function(ordnanceList) {
      ordnanceList.array.forEach(element => {
        DAL.Ordnance.Insert(element);
      });
    },
    Get: function(filters={}){
      var transaction = swrpg.transaction(["Ordnances"], "read");
      transaction.oncomplete = function(event) {
        alert("Done got dem ordnances");
      };

      transaction.onerror = function(event) {
        alert("<li>Transaction not fetched due to error.");
      }

      var store = transaction.objectStore("Ordnances");
      console.log(object)
      
    }
  }
}