
/**
 * jQuery Timer isn't natively a stopwatch, it just helps with
 * building one. Time must be incremented manually.
 *
 * The increment time is in milliseconds, so an input time of
 * 1000 equals 1 time per second.  This example uses an
 * increment time of 70 which is about 14 times per second.
 *
 * The timer function converts the current time to a string
 * and outputs to the stopwatch element, $stopwatch.
 */
var Example1 = new (function() {

    // Stopwatch element on the page
    var $stopwatch;
    
    // Timer speed in milliseconds
    var incrementTime = 70;

    // Current timer position in milliseconds
    var currentTime = 0;
    
    // Start the timer
    $(function() {
        $stopwatch = $('#stopwatch');
        Example1.Timer = $.timer(updateTimer, incrementTime, true);  
    });

    // Output time and increment
    function updateTimer() {
        var timeString = formatTime(currentTime);
        $stopwatch.html(timeString);
        currentTime += incrementTime;
    }

    // Reset timer
    this.resetStopwatch = function() {
        currentTime = 0;
        Example1.Timer.stop().once();
    };

});


/**
 * Example 2 is similar to Example 1. Two things that are
 * different are counting down instead of up and allowing
 * user input for start time. Also, when the timer counts
 * down to zero, an alert is triggered.
 */
var Example2 = new (function() {

    var $countdown;
    var $form;
    var incrementTime = 70;
    var currentTime = 300000; // 5 minutes (in milliseconds)
    
    $(function() {

        // Setup the timer
        $countdown = $('#countdown');
        Example2.Timer = $.timer(updateTimer, incrementTime, true);

        // Setup form
        $form = $('#example2form');
        $form.bind('submit', function() {
            Example2.resetCountdown();
            return false;
        });

    });

    function updateTimer() {

        // Output timer position
        var timeString = formatTime(currentTime);
        $countdown.html(timeString);

        // If timer is complete, trigger alert
        if (currentTime == 0) {
            Example2.Timer.stop();
            alert('Example 2: Countdown timer complete!');
            Example2.resetCountdown();
            return;
        }

        // Increment timer position
        currentTime -= incrementTime;
        if (currentTime < 0) currentTime = 0;

    }

    this.resetCountdown = function() {

        // Get time from form
        var newTime = parseInt($form.find('input[type=text]').val()) * 1000;
        if (newTime > 0) {currentTime = newTime;}

        // Stop and reset timer
        Example2.Timer.stop().once();

    };

});


/**
 * The purpose of this example is to demonstrate preserving
 * the time remaining when pausing a timer.  When you pause
 * the slide show, the time remaining until the next slide
 * is preserved.
 *
 * If you click pause after an image changes, you should
 * see a value close to 2.5 seconds remaining.
 */
var Example3 = new (function() {

    // An array of image elements
    var $galleryImages;

    // Usually hidden element to display time when paused
    var $timeRemaining;

    // Which image is being shown
    var imageId = 0;

    // Slide settings
    var slideTime = 2500;
    var transitionSpeed = 500;

    // Setup timer
    $(function() {
        $galleryImages = $('.galleryImages img');
        $timeRemaining = $('#timeRemaining');
        Example3.Timer = $.timer(updateTimer, slideTime, true).once();
    });

    // Change slides
    function updateTimer() {
        $galleryImages.eq(imageId).stop(true,true).animate({opacity:0}, transitionSpeed);
        imageId++;
        if (imageId >= $galleryImages.length) {
            imageId = 0;
        }
        $galleryImages.eq(imageId).stop(true,false).animate({opacity:1}, transitionSpeed);
    }

    // Pause timer and output remaining time
    this.toggleGallery = function() {
        if (this.Timer.active) {
            this.Timer.pause();

            // $.timer.remiaining only gets updated after pausing
            var seconds = this.Timer.remaining / 1000;
            $timeRemaining.html(seconds + " seconds remaining.");
        }
        else {
            this.Timer.play();

            // Clear output
            $timeRemaining.html("<br/>");
        }
    };
    
});


/**
 * Example 4 is as simple as it gets.  Just a timer object and
 * a counter that is displayed as it updates.
 */
var count = 0,
    timer = $.timer(function() {
        count++;
        $('#counter').html(count);
    });
timer.set({ time : 1000, autostart : true });


// Common functions
function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {str = '0' + str;}
    return str;
}
function formatTime(time) {
    time = time / 10;
    var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60),
        hundredths = pad(time - (sec * 100) - (min * 6000), 2);
    return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
}