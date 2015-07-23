// Set some variables
var timerRunning = false;
var paused = false;
var elapsedSeconds = 0;
var targetSeconds = 60;

$('#clock-container').hide();

$('#start-button').click(function() {
	elapsedSeconds = 0;
	targetSeconds = parseInt($('#timer-seconds').val(), 10) +
		parseInt($('#timer-minutes').val(), 10)*60;
	if (!$.isNumeric(targetSeconds)) {
		alert('Min/sec values should be numbers');
	} else {
		timerRunning = true;		
		$('.time-settings').hide();
		$('#clock-container').show();
	}
});

$('#pause-button').click(function() {paused = !paused});

$('#reset-button').click(function() {
	timerRunning = false;
	paused = false;
	$('.time-settings').show();
	$('#clock-container').hide();
});

// Do stuff while clock is running
function updateTime() {
	if (timerRunning && !paused) {
		elapsedSeconds++;

		// Update clock
		function rotate(el, deg) {
			$(el).attr('transform', 'rotate('+deg+' 50 50)')
		}
		rotate('#sec', (6*elapsedSeconds)%360);
		rotate('#min', (6*Math.floor(elapsedSeconds/60))%360);

		// Update digital-time

		var s = (elapsedSeconds%60).toString();
		if (s.length < 2)
			s = '0'+s;
		$('#digital-time').text(Math.floor(elapsedSeconds/60)+':'+s);

		// Do stuff if we've reached the max time
		if (elapsedSeconds == targetSeconds) {
			timerRunning = false;

		}
	}
}

setInterval(updateTime, 1000);