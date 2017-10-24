//var inputElement
var keyPresses = [];
var pairedKeys = [];
var KPD = []; 

function plotHistogram() {

  var formatCount = d3.format(",.0f");

  var svg = d3.select("svg"),
      margin = {top: 10, right: 30, bottom: 30, left: 30},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleLinear()
      .domain([0, 250])
      // .domain(d3.extent(KPD))
      .rangeRound([0, width]);

  var bins = d3.histogram()
      .domain(x.domain())
      .thresholds(x.ticks(d3.max(KPD)))
      (KPD);

  var y = d3.scaleLinear()
      .domain([0, d3.max(bins, function(d) { return d.length; })])
      .range([height, 0]);

  var bar = g.selectAll(".bar")
    .data(bins)
    .enter().append("g")
      .attr("class", "bar")
      .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });

  bar.append("rect")
      .attr("x", 1)
      .attr("width", x(bins[0].x1) - x(bins[0].x0) - 1)
      .attr("height", function(d) { return height - y(d.length); });

  // bar.append("text")
  //     .attr("dy", ".75em")
  //     .attr("y", 6)
  //     .attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2)
  //     .attr("text-anchor", "middle")
  //     .text(function(d) { return formatCount(d.length); });

  g.append("g")
      .attr("class", "axis axis--y")
      .attr("transform", "translate("+padding+",0)")
      .call(d3.axisLeft(y));

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));  
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

window.onload = function() {

  inputElement = document.getElementById('input-text')
  console.log(inputElement)

  inputElement.addEventListener('keydown', function(event) {
    keyPresses.push([0, event.keyCode, event.timeStamp])
    //output.innerHTML += keyPresses.length + ': [' + keyPresses[keyPresses.length - 1] + '] <br>'
  })

  inputElement.addEventListener('keyup', function(event) {
    keyPresses.push([1, event.keyCode, event.timeStamp])
    //output.innerHTML += keyPresses.length + ': [' + keyPresses[keyPresses.length - 1] + '] <br>'
    updateKeyDuration()
  })
}


