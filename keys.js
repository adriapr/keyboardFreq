//var inputElement
var keyPresses = [];
var pairedKeys = [];
var KPD = [];

window.onload = function() {
  inputElement = document.getElementById('hola-input')
}

function updateKeyDuration() {
  for (ii = keyPresses.length-2; ii >= 0; ii--) {
    if (keyPresses[ii][0] == 0 && keyPresses[keyPresses.length - 1][1] == keyPresses[ii][1]) {
      pairedKeys.push( [keyPresses[ii][1], keyPresses[ii][2], keyPresses[keyPresses.length-1][2]] )
      KPD.push( keyPresses[keyPresses.length-1][2] - keyPresses[ii][2])
      break;
    }
  }
  console.log(pairedKeys)
  console.log(KPD)
  output.innerHTML += KPD[KPD.length-1] + '<br>'
}

inputElement.addEventListener('keydown', function(event) {
  keyPresses.push([0, event.keyCode, event.timeStamp])
  //output.innerHTML += keyPresses.length + ': [' + keyPresses[keyPresses.length - 1] + '] <br>'
})

inputElement.addEventListener('keyup', function(event) {
  keyPresses.push([1, event.keyCode, event.timeStamp])
  //output.innerHTML += keyPresses.length + ': [' + keyPresses[keyPresses.length - 1] + '] <br>'
  updateKeyDuration()
})