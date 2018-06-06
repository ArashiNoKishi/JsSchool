(function () {
  window.onload = function (){

    var list = document.getElementById("notes");

    var noteList = (JSON.parse(localStorage.getItem("noteList")) ? JSON.parse(localStorage.getItem("noteList")) : [] );

    fillList();

    function fillList (){
      for (var nt in noteList) {
        var listItem = document.createElement("li");
        listItem.appendChild(document.createTextNode(noteList[nt]));
        list.appendChild(listItem);
      }
    }

    var addNote = function (){
      var note = document.getElementById("noteText");
      var listItem = document.createElement("li");
      listItem.appendChild(document.createTextNode(note.value));
      list.appendChild(listItem);
      noteList.push(note.value);
      document.getElementById("noteText").value = "";
      localStorage.setItem("noteList",JSON.stringify(noteList));
    }

    document.getElementById("noteText")
    .addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
          document.getElementById("boton").click();
      }
    });
    var node = document.getElementById("boton");
    node.addEventListener('click',addNote,false);

  }
})();
