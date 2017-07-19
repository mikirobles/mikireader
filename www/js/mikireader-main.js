var Book;

function handleFileSelect(evt) {
    document.querySelectorAll("#area div").forEach(div => {
        div.remove();
    })
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer.files;
    var path = (window.URL || window.webkitURL).createObjectURL(files[0]);
    XMLRequest(path, readBook);
}

function XMLRequest(path, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function (e) {
        if (this.status == 200) {
            cb(this.response);
        }
    };
    xhr.send();
}

function readBook(blob) {
    Book = ePub(blob);
    Book.renderTo("area");
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);