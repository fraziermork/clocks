$(document).ready(function(){
  var divClock = document.getElementById('divClock');











































//CANVAS CLOCK __________________________________________________________________________________________________________________
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  ctx.strokeStyle = '#000000';
  var secondHand = {
    angle: 0,
    length: 110,
    increment: 0.10472,
    seconds: 0,

    moveSecondHand: function(){
      console.log('move second hand');
      secondHand.drawSecondHand();
      secondHand.updateSecondHand();
    },
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

    moveMinuteHand: function(){
      minuteHand.updateMinuteHand();
      minuteHand.drawMinuteHand();
    },
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

    moveHourHand: function(){
      hourHand.updateHourHand();
      hourHand.drawHourHand();
    },
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
