var app = new Framework7({
  // App root element
  el: '#app',
  // ... other parameters
});
var mainView = app.views.create('.view-main')

// water level thresholds
var waterlevel = 20;
var nowater = 0;
var drowning = 40;

// food level thresholds
var food = 30;
var nofood = 0;
var overfeed = 40;

var neardeath = false; 
var trimmed = false; 

function dryout() {
  var watertimer = setTimeout(dryout, 500);

  waterlevel --;
  console.log(waterlevel)
  checkhealth();
}

dryout(); // testing dryout paramaters

function starving() {
  food--;
  //console.log(food);
  checkhealth(); // check if the plant is starving or drying out
  var foodtimer = setTimeout(starving,500);

}

starving(); // testing starving parameters

function checkhealth() {
  if (waterlevel <= nowater || food <= nofood || waterlevel >= drowning){
    neardeath = true;
    console.log("Help!");
    $("#plant path").css("fill", "Chocolate") // changes the color after the timeout limit hits
  } 
  if (neardeath && waterlevel > nowater && food > nofood && trimmed){
    $("#plant path").css("fill", "#568b62") // reviving the plant 
    neardeath = false;
    setTimeout(function() {
      $("#trim").fadeIn();
      trimmed == false;
    }, 5000 )
  }
}

$("#water-me").on("click", function(){
  waterlevel =+ 20;
  $("#water").fadeIn().delay(1000).fadeOut(); // fade in and fade out water drops img
})

$("#feed-me").on("click", function(){
  food += 20;
  $("#food").fadeIn().delay(1000).fadeOut();
})

$("#trim-me").on("click", function(){
  trimmed = true;
  $("#scissors").fadeIn().delay(1000).fadeOut();
  $("#trim").fadeOut(); // fades out the section of plant when trimmed 
})

// by default:
// - plant starts healthy
// - dry out over time 
// - deplete in nurients over time 

// interactions:
// - water it, replenish the plants
// - feed it, nurtients for the plant
// - trim it  

// care: 
// - too much water, plant near death
// - too much fertilizer, plant near death
// - if plat falls into a near death state, you can only heal it by trimming it. 

const SLOTS_PER_REEL = 12;
// radius = Math.round( ( panelWidth / 2) / Math.tan( Math.PI / SLOTS_PER_REEL ) ); 
// current settings give a value of 149, rounded to 150
const REEL_RADIUS = 150;

function createSlots (ring) {
	
	var slotAngle = 360 / SLOTS_PER_REEL;

	var seed = getSeed();

	for (var i = 0; i < SLOTS_PER_REEL; i ++) {
		var slot = document.createElement('div');
		
		slot.className = 'slot';

		// compute and assign the transform for this slot
		var transform = 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';

		slot.style.transform = transform;

		// setup the number to show inside the slots
		// the position is randomized to 

		var content = $(slot).append('<p>' + ((seed + i)%12)+ '</p>');

		// add the poster to the row
		ring.append(slot);
	}
}

function getSeed() {
	// generate random number smaller than 13 then floor it to settle between 0 and 12 inclusive
	return Math.floor(Math.random()*(SLOTS_PER_REEL));
}

function spin(timer) {
	//var txt = 'seeds: ';
	for(var i = 1; i < 6; i ++) {
		var oldSeed = -1;
		/*
		checking that the old seed from the previous iteration is not the same as the current iteration;
		if this happens then the reel will not spin at all
		*/
		var oldClass = $('#ring'+i).attr('class');
		if(oldClass.length > 4) {
			oldSeed = parseInt(oldClass.slice(10));
			console.log(oldSeed);
		}
		var seed = getSeed();
		while(oldSeed == seed) {
			seed = getSeed();
		}

		$('#ring'+i)
			.css('animation','back-spin 1s, spin-' + seed + ' ' + (timer + i*0.5) + 's')
			.attr('class','ring spin-' + seed);
	}

	console.log('=====');
}

$(document).ready(function() {

	// initiate slots 
 	createSlots($('#ring1'));
 	createSlots($('#ring2'));
 	createSlots($('#ring3'));
 	createSlots($('#ring4'));
 	createSlots($('#ring5'));

 	// hook start button
 	$('.go').on('click',function(){
 		var timer = 2;
 		spin(timer);
 	})

 	// hook xray checkbox
 	$('#xray').on('click',function(){
 		//var isChecked = $('#xray:checked');
 		var tilt = 'tiltout';
 		
    if($(this).is(':checked')) {
 			tilt = 'tiltin';
 			$('.slot').addClass('backface-on');
 			$('#rotate').css('animation',tilt + ' 2s 1');

			setTimeout(function(){
			  $('#rotate').toggleClass('tilted');
			},2000);
 		} else {
      tilt = 'tiltout';
 			$('#rotate').css({'animation':tilt + ' 2s 1'});

			setTimeout(function(){
	 			$('#rotate').toggleClass('tilted');
	 			$('.slot').removeClass('backface-on');
	 		},1900);
 		}
 	})

 	// hook perspective
 	$('#perspective').on('click',function(){
 		$('#stage').toggleClass('perspective-on perspective-off');
 	})	
 });