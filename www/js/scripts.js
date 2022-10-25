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