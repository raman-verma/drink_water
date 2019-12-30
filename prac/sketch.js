var counter = 0;

function setup() {
    noCanvas();

    var timer = select('#timer');
    timer.html(counter);

    function timeIt() {
        counter++;
        timer.html(counter);
    }
    
    setInterval(timeIt, 1000);


}