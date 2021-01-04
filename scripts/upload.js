// const fileSelector = $("#file-selector");
const fileSelect = document.getElementById("fileSelect"),
  fileElem = $("#fileElem");

fileSelect.addEventListener("click", function (e) {
  if (fileElem) {
    fileElem.click();
  }
}, false);

function onReaderLoad(event){
  console.log("event result" + event.target.result);
  var obj = JSON.parse(event.target.result);
  alert_data();
}

function alert_data(){
  alert('We have uploaded');
}


fileElem.on('change', (event) => {
    const fileList = event.target.files;
    // console.log(fileList);
    var reader = new FileReader();
    reader.onLoad = onReaderLoad;
    // fileList.forEach(element => {
    //   reader.readAsText(element);  
    // });
    for (let i = 0, numFiles = fileList.length; i < numFiles; i++) {
      console.log("reading file " + i)
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