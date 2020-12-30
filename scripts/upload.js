const fileSelector = $("#file-selector");

fileSelector.on('change', (event) => {
    const fileList = event.target.files;
    console.log(fileList);
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