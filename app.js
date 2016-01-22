$(document).ready(function(){
  var divClock = document.getElementById('divClock');

  var clockFaceDivs = [];
  clockFaceDivs[0] = [200, 63.5, 10, 10, 1];
  clockFaceDivs[1] = [236.5, 100, 10, 10, 2];
  clockFaceDivs[2] = [250, 150, 10, 10, 3];
  clockFaceDivs[3] = [236.5, 200, 10, 10, 4];
  clockFaceDivs[4] = [200, 236.5, 10, 10, 5];
  clockFaceDivs[5] = [150, 250, 10, 10, 6];
  clockFaceDivs[6] = [100, 236.5, 10, 10, 7];
  clockFaceDivs[7] = [63.5, 200, 10, 10, 8];
  clockFaceDivs[8] = [50, 150, 10, 10, 9];
  clockFaceDivs[9] = [63.5, 100, 10, 10, 10];
  clockFaceDivs[10] = [100, 63.5, 10, 10, 11];
  clockFaceDivs[11] = [150, 50, 10, 10, 12];

  for (var i = 0; i < clockFaceDivs.length; i++) {
    console.log(clockFaceDivs[i][4]);
    var idString = clockFaceDivs[i][4] + 'holder';
    var noHolder = document.createElement('div');
    noHolder.className = 'clockElement';
    noHolder.id = idString;
    noHolder.textContent = clockFaceDivs[i][4];
    // noHolder.style.width = clockFaceDivs[i][2];
    // noHolder.style.height = clockFaceDivs[i][3];
    divClock.appendChild(noHolder);
    $('#' + idString).css('left', clockFaceDivs[i][0] - (clockFaceDivs[i][2]/2) );
    $('#' + idString).css('top', clockFaceDivs[i][1] - (clockFaceDivs[i][3]/2));
    $('#' + idString).width(clockFaceDivs[i][2] );
    $('#' + idString).height(clockFaceDivs[i][3] );
  }
  var secondHandArray = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110];
  var secondHandArrayIds = [];
  for (var i = 0; i < secondHandArray.length; i++){
    idString = secondHandArray[i] + 'second';
    var secondHandDiv = document.createElement('div');
    var secondHandDiv.id = idString;
    
  }
  var minuteHandArray = [0, 10, 20, 30, 40, 50, 60, 70, 80];

  var hourHandArray = [0, 10, 20, 30, 40, 50];



































































//CANVAS CLOCK __________________________________________________________________________________________________________________
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  ctx.strokeStyle = '#000000';
  var secondHand = {
    angle: 0,
    length: 110,
    increment: 0.10472,
    seconds: 0,

    updateSecondHand: function(){
      secondHand.seconds++;
      secondHand.angle = (secondHand.angle + secondHand.increment);// % 6.2832;
    },
    drawSecondHand: function(){
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.moveTo(150, 150);
      ctx.lineTo( 150 + secondHand.length * Math.sin(secondHand.angle), 150 - secondHand.length * Math.cos(secondHand.angle))
      ctx.stroke();
    }
  }
  var minuteHand = {
    angle: 0,
    length: 80,
    increment: 0.010472,
    seconds: 0,

    updateMinuteHand: function(){
      if (secondHand.seconds % 6 === 0){
        minuteHand.angle = (minuteHand.angle + minuteHand.increment);
      }
    },
    drawMinuteHand: function(){
      ctx.beginPath();
      ctx.lineWidth = 4;
      ctx.moveTo(150, 150);
      ctx.lineTo( 150 + minuteHand.length * Math.sin(minuteHand.angle), 150 - minuteHand.length * Math.cos(minuteHand.angle))
      ctx.stroke();
    }
  }
  //
  var hourHand = {
    angle: 0,
    length: 60,
    increment: 0.010472,
    seconds: 0,

    updateHourHand: function(){
      if (secondHand.seconds % 72 === 0){
        hourHand.angle = (hourHand.angle + hourHand.increment);
        if (secondHand.seconds % 86400 === 0){
          initialize();
        }
      }
    },
    drawHourHand: function(){
      ctx.beginPath();
      ctx.lineWidth = 8;
      ctx.moveTo(150, 150);
      ctx.lineTo( 150 + hourHand.length*Math.sin(hourHand.angle), 150 - hourHand.length * Math.cos(hourHand.angle))
      ctx.stroke();
    }
  }

  function initialize(){
    var date = new Date();
    var hrs = date.getHours();
    var mins = date.getMinutes();
    var secs = date.getSeconds();
    secondHand.seconds = 0;
    secondHand.angle = 0;
    minuteHand.angle = 0;
    hourHand.angle = 0;
    secondHand.seconds = ((3600 * hrs) + (60 * mins) + secs);
    secondHand.angle += (secondHand.seconds % 60) * secondHand.increment;
    minuteHand.angle += (((secondHand.seconds % 3600) - (secs % 6))/ 6 ) * minuteHand.increment;
    hourHand.angle += (((secondHand.seconds % 43200) - ( (60 * mins + secs) % 72) ) / 72 ) * hourHand.increment;
  }

  function clearCanvas(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
  }

  function drawBox(centerX, centerY, width, height, color){
    ctx.fillStyle = color;
    ctx.fillRect(centerX - width/2, centerY - height/2, width, height);
  }

  function drawClockFace(){
    drawBox(150, 50, 10, 30, '#000000');
    drawBox(150, 250, 10, 30, '#000000');
    drawBox(50, 150, 30, 10, '#000000');
    drawBox(250, 150, 30, 10, '#000000');
    drawBox(150, 150, 4, 4, '#000000');

    drawBox(200, 63.5, 4, 4, '#000000');
    drawBox(236.5, 100, 4, 4, '#000000');
    drawBox(100, 63.5, 4, 4, '#000000');
    drawBox(63.5, 100, 4, 4, '#000000');
    drawBox(63.5, 200, 4, 4, '#000000');
    drawBox(100, 236.5, 4, 4, '#000000');
    drawBox(200, 236.5, 4, 4, '#000000');
    drawBox(236.5, 200, 4, 4, '#000000');
  }

  function updateHands(){
    secondHand.updateSecondHand();
    minuteHand.updateMinuteHand();
    hourHand.updateHourHand();
  }

  function drawHands(){
    secondHand.drawSecondHand();
    minuteHand.drawMinuteHand();
    hourHand.drawHourHand();
  }

  initialize();
  drawClockFace();
  var requestAnimationFrame = window.requestAnimationFrame;
  function timeLoop() {
    updateHands();
    clearCanvas();
    drawClockFace();
    drawHands();
    setTimeout(function(){
      requestAnimationFrame(timeLoop);
    }, 1000);
  }
  requestAnimationFrame(timeLoop);

});
