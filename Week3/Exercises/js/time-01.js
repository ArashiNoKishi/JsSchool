(function () {
  var target = new Date(2018,10,19,0,0,0,0).getTime();

  var update = setInterval( function(){
    var now = new Date().getTime();

    var difference = target - now;

    var days = Math.floor((difference / (1000*60*60*24)));
    var hours = Math.floor((difference % (1000*60*60*24))/(1000*60*60));
    var minutes = Math.floor((difference % (1000*60*60))/(1000*60));
    var seconds = Math.floor((difference % (1000*60))/1000);

    document.getElementById('countdown').innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s";

    if (difference<0){
      clearInterval(update);
      document.getElementById('countdown').innerHTML = "done";
    }
  },1000);
})();
