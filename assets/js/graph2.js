var label = document.querySelector(".label");
var c1 = document.getElementById("c1");
var ctx1 = c1.getContext("2d");
var cw1 = c1.width = 700;
var ch1 = c1.height = 350;
var cx = cw1 / 2,
  cy = ch1 / 2;
var rad = Math.PI / 180;
var frames = 0;

ctx1.lineWidth = 1;
ctx1.strokeStyle = "#999";
ctx1.fillStyle = "#ccc";
ctx1.font = "14px monospace";

var grd = ctx1.createLinearGradient(0, 0, 0, cy);
grd.addColorStop(0, "hsla(167,72%,60%,1)");
grd.addColorStop(1, "hsla(167,72%,60%,0)");

var oData = {
  "2008": 10,
  "2009": 39.9,
  "2010": 17,
  "2011": 30.0,
  "2012": 5.3,
  "2013": 38.4,
  "2014": 15.7,
  "2015": 9.0
};

var valuesRy = [];
var propsRy = [];
for (var prop in oData) {

  valuesRy.push(oData[prop]);
  propsRy.push(prop);
}


var vData = 4;
var hData = valuesRy.length;
var offset = 50.5; //offset chart axis
var chartHeight = ch1 - 2 * offset;
var chartWidth = cw1 - 2 * offset;
var t = 1 / 7; // curvature : 0 = no curvature 
var speed = 2; // for the animation

var A = {
  x: offset,
  y: offset
}
var B = {
  x: offset,
  y: offset + chartHeight
}
var C = {
  x: offset + chartWidth,
  y: offset + chartHeight
}

/*
      A  ^
	    |  |  
	    + 25
	    |
	    |
	    |
	    + 25  
      |__|_________________________________  C
      B
*/

// CHART AXIS -------------------------
ctx1.beginPath();
ctx1.moveTo(A.x, A.y);
ctx1.lineTo(B.x, B.y);
ctx1.lineTo(C.x, C.y);
ctx1.stroke();

// vertical ( A - B )
var aStep = (chartHeight - 50) / (vData);

var Max = Math.ceil(arrayMax1(valuesRy) / 10) * 10;
var Min = Math.floor(arrayMin1(valuesRy) / 10) * 10;
var aStepValue = (Max - Min) / (vData);
console.log("aStepValue: " + aStepValue); //8 units
var verticalUnit = aStep / aStepValue;

var a = [];
ctx1.textAlign = "right";
ctx1.textBaseline = "middle";
for (var i = 0; i <= vData; i++) {

  if (i == 0) {
    a[i] = {
      x: A.x,
      y: A.y + 25,
      val: Max
    }
  } else {
    a[i] = {}
    a[i].x = a[i - 1].x;
    a[i].y = a[i - 1].y + aStep;
    a[i].val = a[i - 1].val - aStepValue;
  }
  drawCoords1(a[i], 3, 0);
}

//horizontal ( B - C )
var b = [];
ctx1.textAlign = "center";
ctx1.textBaseline = "hanging";
var bStep = chartWidth / (hData + 1);

for (var i = 0; i < hData; i++) {
  if (i == 0) {
    b[i] = {
      x: B.x + bStep,
      y: B.y,
      val: propsRy[0]
    };
  } else {
    b[i] = {}
    b[i].x = b[i - 1].x + bStep;
    b[i].y = b[i - 1].y;
    b[i].val = propsRy[i]
  }
  drawCoords1(b[i], 0, 3)
}

function drawCoords1(o, offX, offY) {
  ctx1.beginPath();
  ctx1.moveTo(o.x - offX, o.y - offY);
  ctx1.lineTo(o.x + offX, o.y + offY);
  ctx1.stroke();

  ctx1.fillText(o.val, o.x - 2 * offX, o.y + 2 * offY);
}
//----------------------------------------------------------

// DATA
var oDots = [];
var oFlat = [];
var i = 0;

for (var prop in oData) {
  oDots[i] = {}
  oFlat[i] = {}

  oDots[i].x = b[i].x;
  oFlat[i].x = b[i].x;

  oDots[i].y = b[i].y - oData[prop] * verticalUnit - 25;
  oFlat[i].y = b[i].y - 25;

  oDots[i].val = oData[b[i].val];
  
  i++
}



///// Animation Chart ///////////////////////////
//var speed = 3;
function animateChart1() {
  requestId = window.requestAnimationFrame(animateChart1);
  frames += speed; //console.log(frames)
  ctx1.clearRect(60, 0, cw1, ch1 - 60);
  
  for (var i = 0; i < oFlat.length; i++) {
    if (oFlat[i].y > oDots[i].y) {
      oFlat[i].y -= speed;
    }
  }
  drawCurve1(oFlat);
  for (var i = 0; i < oFlat.length; i++) {
      ctx1.fillText(oDots[i].val, oFlat[i].x, oFlat[i].y - 25);
      ctx1.beginPath();
      ctx1.arc(oFlat[i].x, oFlat[i].y, 3, 0, 2 * Math.PI);
      ctx1.fill();
    }

  if (frames >= Max * verticalUnit) {
    window.cancelAnimationFrame(requestId);
    
  }
}
requestId = window.requestAnimationFrame(animateChart1);

/////// EVENTS //////////////////////
c1.addEventListener("mousemove", function(e) {
  label.innerHTML = "";
  label.style.display = "none";
  this.style.cursor = "default";

  var m = oMousePos1(this, e);
  for (var i = 0; i < oDots.length; i++) {

    outpu1t(m, i);
  }

}, false);

function output1(m, i) {
  ctx1.beginPath();
  ctx1.arc(oDots[i].x, oDots[i].y, 20, 0, 2 * Math.PI);
  if (ctx1.isPointInPath(m.x, m.y)) {
    //console.log(i);
    label.style.display = "block";
    label.style.top = (m.y + 10) + "px";
    label.style.left = (m.x + 10) + "px";
    label.innerHTML = "<strong>" + propsRy[i] + "</strong>: " + valuesRy[i] + "%";
    c1.style.cursor = "pointer";
  }
}

// CURVATURE
function controlPoints1(p) {
  // given the points array p calculate the control points
  var pc = [];
  for (var i = 1; i < p.length - 1; i++) {
    var dx = p[i - 1].x - p[i + 1].x; // difference x
    var dy = p[i - 1].y - p[i + 1].y; // difference y
    // the first control point
    var x1 = p[i].x - dx * t;
    var y1 = p[i].y - dy * t;
    var o1 = {
      x: x1,
      y: y1
    };

    // the second control point
    var x2 = p[i].x + dx * t;
    var y2 = p[i].y + dy * t;
    var o2 = {
      x: x2,
      y: y2
    };

    // building the control points array
    pc[i] = [];
    pc[i].push(o1);
    pc[i].push(o2);
  }
  return pc;
}

function drawCurve1(p) {

  var pc = controlPoints1(p); // the control points array

  ctx1.beginPath();
  //ctx1.moveTo(p[0].x, B.y- 25);
  ctx1.lineTo(p[0].x, p[0].y);
  // the first & the last curve are quadratic Bezier
  // because I'm using push(), pc[i][1] comes before pc[i][0]
  ctx1.quadraticCurveTo(pc[1][1].x, pc[1][1].y, p[1].x, p[1].y);

  if (p.length > 2) {
    // central curves are cubic Bezier
    for (var i = 1; i < p.length - 2; i++) {
      ctx1.bezierCurveTo(pc[i][0].x, pc[i][0].y, pc[i + 1][1].x, pc[i + 1][1].y, p[i + 1].x, p[i + 1].y);
    }
    // the first & the last curve are quadratic Bezier
    var n = p.length - 1;
    ctx1.quadraticCurveTo(pc[n - 1][0].x, pc[n - 1][0].y, p[n].x, p[n].y);
  }

  //ctx1.lineTo(p[p.length-1].x, B.y- 25);
  ctx1.stroke();
  ctx1.save();
  ctx1.fillStyle = grd;
  ctx1.fill();
  ctx1.restore();
}

function arrayMax1(array) {
  return Math.max.apply(Math, array);
};

function arrayMin1(array) {
  return Math.min.apply(Math, array);
};

function oMousePos1(canvas, evt) {
  var ClientRect = canvas.getBoundingClientRect();
  return { //objeto
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  }
}