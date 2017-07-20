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
    $("#drop_zone").css("display", "none");
    $("#area").addClass("margin-top-auto");
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    $("#drop_zone").css("box-shadow", "0px 0px #477890");
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);
//# sourceMappingURL=all.js.map
