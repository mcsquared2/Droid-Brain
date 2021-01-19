const fileSelect = $("#fileSelect"),
  fileElem = $("#fileElem");

fileSelect.on("click", function (e) {
  if (fileElem) {
    fileElem.click();
  }
});

function onReaderLoad(event){
  var obj = JSON.parse(event.target.result);
  console.log(obj.ordnances);
  if (obj.ordnances.length){
    console.log("updating ordnances");
    DAL.Base.BatchInsert("Ordnances", obj.ordnances, (event) => {
      console.log(event);
      alert("Insert has finished successfully");
    });
  }
  

  alert_data();
}

function alert_data(){
  alert('We have uploaded');
}

var fileListG;
fileElem.on('change', (event) => {
    // const fileList = event.target.files;
    readFiles(event.target.files);
});

const dropArea = $("#drop-area");

dropArea.on('dragover', (event) => {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer = event.originalEvent.dataTransfer;
  event.dataTransfer.dropEffect = 'copy';
  console.log("dragging")
});

dropArea.on('drop', (event) => {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer = event.originalEvent.dataTransfer;
  readFiles(event.dataTransfer.files);
});

function readFiles(fileList){
  var reader = new FileReader();
  reader.onload = onReaderLoad;
  for (let i = 0, numFiles = fileList.length; i < numFiles; i++) {
    console.log("reading file " + i + " of " + numFiles)
    reader.readAsText(fileList[i]);
  }
}