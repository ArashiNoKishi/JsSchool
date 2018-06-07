(function (){
  window.onload = function (){

    var keys = document.getElementsByClassName("help");
    var labels = document.getElementsByClassName("label");
    document.getElementById("keyboard").addEventListener("click", function (){
      for (var ky in keys) {
        if (keys[ky].style.display !== "inline") {
            keys[ky].style.display = "inline";
            labels[ky].style.display = "inline";
        } else {
            keys[ky].style.display = "none";
            labels[ky].style.display = "none";
        }
      }
    });

    function playSound (id){
      var sound = document.getElementById(id);
      sound.currentTime = 0;
      sound.play();
    }
    //onclick set
    document.getElementById("c").addEventListener("mousedown", function (){
      playSound("audioc");
    });
    document.getElementById("cs").addEventListener("mousedown", function (){
      playSound("audiocs");
    });
    document.getElementById("d").addEventListener("mousedown", function (){
      playSound("audiod");
    });
    document.getElementById("ds").addEventListener("mousedown", function (){
      playSound("audiods");
    });
    document.getElementById("e").addEventListener("mousedown", function (){
      playSound("audioe");
    });
    document.getElementById("f").addEventListener("mousedown", function (){
      playSound("audiof");
    });
    document.getElementById("fs").addEventListener("mousedown", function (){
      playSound("audiofs");
    });
    document.getElementById("g").addEventListener("mousedown", function (){
      playSound("audiog");
    });
    document.getElementById("gs").addEventListener("mousedown", function (){
      playSound("audiogs");
    });
    document.getElementById("a").addEventListener("mousedown", function (){
      playSound("audioa");
    });
    document.getElementById("as").addEventListener("mousedown", function (){
      playSound("audioas");
    });
    document.getElementById("b").addEventListener("mousedown", function (){
      playSound("audiob");
    });
    //keypress set
    var once = [false,false,false,false,false,false,false,false,false,false,false,false];
    var hover = document.getElementsByClassName("help");
    var flats = document.getElementsByClassName("flat");
    var sharps = document.getElementsByClassName("sharp");

    document.addEventListener("keydown", function(event) {
      event.preventDefault();
      if (event.keyCode === 65) {
        if(!once[0]) {
          once[0] = true;
          hover[1].classList.add("active");
          flats[0].classList.add("factive");
          playSound("audioc");
        }
      }
      if (event.keyCode === 87) {
        if(!once[1]) {
          once[1] = true;
          hover[0].classList.add("active");
          sharps[0].classList.add("sactive");
          playSound("audiocs");
        }
      }
      if (event.keyCode === 83) {
        if(!once[2]) {
          once[2] = true;
          hover[3].classList.add("active");
          flats[1].classList.add("factive");
          playSound("audiod");
        }
      }
      if (event.keyCode === 69) {
        if(!once[3]) {
          once[3] = true;
          hover[2].classList.add("active");
          sharps[1].classList.add("sactive");
          playSound("audiods");
        }
      }
      if (event.keyCode === 68) {
        if(!once[4]) {
          once[4] = true;
          hover[4].classList.add("active");
          flats[2].classList.add("factive");
          playSound("audioe");
        }
      }
      if (event.keyCode === 70) {
        if(!once[5]) {
          once[5] = true;
          hover[6].classList.add("active");
          flats[3].classList.add("factive");
          playSound("audiof");
        }
      }
      if (event.keyCode === 84) {
        if(!once[6]) {
          once[6] = true;
          hover[5].classList.add("active");
          sharps[2].classList.add("sactive");
          playSound("audiofs");
        }
      }
      if (event.keyCode === 71) {
        if(!once[7]) {
          once[7] = true;
          hover[8].classList.add("active");
          flats[4].classList.add("factive");
          playSound("audiog");
        }
      }
      if (event.keyCode === 89) {
        if(!once[8]) {
          once[8] = true;
          hover[7].classList.add("active");
          sharps[3].classList.add("sactive");
          playSound("audiogs");
        }
      }
      if (event.keyCode === 72) {
        if(!once[9]) {
          once[9] = true;
          hover[10].classList.add("active");
          flats[5].classList.add("factive");
          playSound("audioa");
        }
      }
      if (event.keyCode === 85) {
        if(!once[10]) {
          once[10] = true;
          hover[9].classList.add("active");
          sharps[4].classList.add("sactive");
          playSound("audioas");
        }
      }
      if (event.keyCode === 74) {
        if(!once[11]) {
          once[11] = true;
          hover[11].classList.add("active");
          flats[6].classList.add("factive");
          playSound("audiob");
        }
      }
    });
    document.addEventListener("keyup", function (){

      if (event.keyCode === 65) {
          once[0] = false;
          hover[1].classList.remove("active");
          flats[0].classList.remove("factive");
      }
      if (event.keyCode === 87) {
          once[1] = false;
          hover[0].classList.remove("active");
          sharps[0].classList.remove("sactive");
      }
      if (event.keyCode === 83) {
          once[2] = false;
          hover[3].classList.remove("active");
          flats[1].classList.remove("factive");
      }
      if (event.keyCode === 69) {
          once[3] = false;
          hover[2].classList.remove("active");
          sharps[1].classList.remove("sactive");
      }
      if (event.keyCode === 68) {
          once[4] = false;
          hover[4].classList.remove("active");
          flats[2].classList.remove("factive");
      }
      if (event.keyCode === 70) {
          once[5] = false;
          hover[6].classList.remove("active");
          flats[3].classList.remove("factive");
      }
      if (event.keyCode === 84) {
          once[6] = false;
          hover[5].classList.remove("active");
          sharps[2].classList.remove("sactive");
      }
      if (event.keyCode === 71) {
          once[7] = false;
          hover[8].classList.remove("active");
          flats[4].classList.remove("factive");
      }
      if (event.keyCode === 89) {
          once[8] = false;
          hover[7].classList.remove("active");
          sharps[3].classList.remove("sactive");
      }
      if (event.keyCode === 72) {
          once[9] = false;
          hover[10].classList.remove("active");
          flats[5].classList.remove("factive");
      }
      if (event.keyCode === 85) {
          once[10] = false;
          hover[9].classList.remove("active");
          sharps[4].classList.remove("sactive");
      }
      if (event.keyCode === 74) {
          once[11] = false;
          hover[11].classList.remove("active");
          flats[6].classList.remove("factive");
      }
    });
  }
}());
