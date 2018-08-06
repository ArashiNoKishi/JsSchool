export default function () {
  let listLength = JSON.parse(localStorage.getItem('clipList'))?JSON.parse(localStorage.getItem('clipList')).list.length:0;
  
  return listLength;
}