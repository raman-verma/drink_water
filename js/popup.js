var counter = 0;
var timeleft = 60;

function convertSeconds(s) {
  var min = floor(s / 60);
  var sec = floor(s % 60);
  return nf(min, 2) + ":" + nf(sec, 2);
}

function setup() {
  noCanvas();

  var timer = select("#timer");
  timer.html(convertSeconds(timeleft - counter));

  var interval = setInterval(timeIt, 1000);

  function timeIt() {
    counter++;
    timer.html(convertSeconds(timeleft - counter));
    if (counter == timeleft) {
      clearInterval(interval);
      //counter = 0;
    }
  }
}
