// const fileSelector = $("#file-selector");
const fileSelect = $("#fileSelect"),
  fileElem = $("#fileElem");

fileSelect.on("click", function (e) {
  if (fileElem) {
    fileElem.click();
  }
});

function onReaderLoad(event){
  // console.log("event result" + event.target.result);
  var obj = JSON.parse(event.target.result);
  console.log(obj);
  alert_data();
}

function alert_data(){
  alert('We have uploaded');
}

var fileListG;
fileElem.on('change', (event) => {
    const fileList = event.target.files;
    fileListG = event.target.files;
    console.log(fileList);
    console.log(fileList.length);
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    // fileList.forEach(element => {
    //   reader.readAsText(element);  
    // });
    for (let i = 0, numFiles = fileList.length; i < numFiles; i++) {
      console.log("reading file " + i + " of " + numFiles)
      reader.readAsText(fileList[i]);
    }
    
});

const dropArea = $("#drop-area");

dropArea.on('dragover', (event) => {
    event.stopPropagation();
    event.preventDefault();
    // Style the drag-and-drop as a "copy file" operation.
    event.dataTransfer = event.originalEvent.dataTransfer;
    event.dataTransfer.dropEffect = 'copy';
    console.log("dragging")
  });
  
  dropArea.on('drop', (event) => {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer = event.originalEvent.dataTransfer;
    const fileList = event.dataTransfer.files;
    console.log(fileList);
  });