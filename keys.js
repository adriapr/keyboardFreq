//var inputElement
var keyPresses = [];
var pairedKeys = [];
var KPD = []; 

function plotHistogram() {

  var formatCount = d3.format(",.0f"),
      w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      outerWidth = (w.innerWidth || e.clientWidth || g.clientWidth) - 30;
      margin = {top: 10, right: 10, bottom: 30, left: 30},
      width = outerWidth - margin.left - margin.right,
      outerHeight = 300,
      height = outerHeight - margin.top - margin.bottom,
      xMin = -0,
      xMax = 200;

  // remove previous plt, if any
  d3.select("#d3").selectAll("svg").remove();

  var svg = d3.select("#d3")
    .append("svg")
      .attr("width", width)
      .attr("height", outerHeight)

  g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 

  var x = d3.scaleLinear()
      .domain([xMin, xMax])
      .range([0, width]);

  var binEdges = [];
  for (ii = 0; ii < xMax-xMin+1; ii++) {
    binEdges[ii] = xMin + ii - 0.5
  }

  var bins = d3.histogram()
      .domain(x.domain())
      .thresholds(binEdges)
      // ( [100, 100, 101, 103] );
      (KPD);

  console.log(bins);
  console.log(bins[0]);

  var y = d3.scaleLinear()
      .domain([0, d3.max(bins, function(d) { return d.length; })])
      .range([height, 0]);

  var bar = g.selectAll(".bar")
    .data(bins)
    .enter().append("g")
      .attr("class", "bar")
      .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });

  bar.append("rect")
//      .attr("x", 1)
      .attr("width", x(1) - x(0) )
      .attr("height", function(d) { return height - y(d.length); });

  // var line = d3.area()
  //     .x(function(d, i) { return x((bins[i].x0 + bins[i].x1) / 2); })
  //     .y1(function(d, i) { return y(bins[i]); })
  //     .y0(height)

  // svg.append("path")
  //     .datum(bins)
  //     .attr("class", "line")
  //     .attr("d", line);

  g.append("g")
      .attr("class", "axis axis--y")
      // .attr("transform", "translate("+padding+",0)")
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
  // console.log(pairedKeys)
  // console.log(KPD)
  output.innerHTML += KPD[KPD.length-1] + ' | '
}

window.onload = function() {

  inputElement = document.getElementById('input-text')
  // console.log(inputElement)

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


