window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
 
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
 
if (!window.indexedDB) {
   window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

let DB;
let DBReq = indexedDB.open('myDatabase', 5);

DBReq.onsuccess = function (event){
  DB = event.target.result;
}

DBReq.onerror = function(event) {
  alert('error opening database ' + event.target.errorCode);
}

DBReq.onupgradeneeded = function(event) { 
   DB = event.target.result;
 
   
   let CharacterStore;
   CharacterStore = DAL.SetUp.NewObjectStore("Characters", true); 
   
   DAL.SetUp.Index(CharacterStore, "Name", false);

   let TalentStore;
   TalentStore = DAL.SetUp.NewObjectStore("Talents", true);

  // #region WeaponStore Setup
   let WeaponStore;
   WeaponStore = DAL.SetUp.NewObjectStore("Weapons", true);
   WeaponStore.createIndex("Name", true);
   // #endregion
   
  // #region OrdnanceStore Setup
  let OrdnanceStore;
  OrdnanceStore = DAL.SetUp.NewObjectStore("Ordnances", true);
  DAL.SetUp.Index(OrdnanceStore, "Name", true);
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
    NewObjectStore: function(storeName, autoIncrement) {
      if (!DB.objectStoreNames.contains(storeName)){
        return DB.createObjectStore(storeName, {autoIncrement: autoIncrement});
      } else {
        return DBReq.transaction.objectStore(storeName);
      }
    },
    Transaction: function(storeName, action){
      var transaction = DB.transaction([storeName], action);
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
  Base: {
    Insert: function (storeName, data, success) {
      var transaction = DAL.SetUp.Transaction(storeName, "readwrite");

      var request = transaction.objectStore(storeName).add(data);
      request.onsuccess = function(event) {
        alert("Request successful");
        success();
      }
    },
    BatchInsert: function(storeName, dataList, success){
      dataList.array.forEach(data => {
        DAL.Base.Insert(storeName, data, success);
      })
    },
    GetAll: function(storeName, success) {
      var transaction = DAL.SetUp.Transaction(storeName, "readwrite");

      var store = transaction.objectStore(storeName);
      var request = store.getAll();

      request.onsuccess = function(event){
        success(event);
        console.log(event.target.result);
      }

    }
  },
  Ordnance: {
    Ordnances: [],
    GetAll: function(filters={}){
      // There isn't a way currently to do multiple filters with IndexedDB, so my thoughts are to due them in memory. Obviously, this won't
      // work for large sets of data, but I don't think there would be a table that big, unless someone is really into creating character...
      if (DAL.Ordnance.Ordnances.length == 0)  {
        DAL.Base.GetAll("Ordnances", function(event) {
          console.log("Success!!!!! We done got dem ordnances!");
          DAL.Ordnance.Ordnances = event.result;
          console.log(event.result);
        })
      }
      return DAL.Ordnance.Ordnances;
    }
  }
}