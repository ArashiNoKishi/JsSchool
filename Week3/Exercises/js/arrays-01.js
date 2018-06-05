(function(){
  var unsorted = [2,6,8,7,4,3];
  console.log(unsorted);
  unsorted.sort(function(a,b){
    return a-b;
  });
  console.log(unsorted);
}());
