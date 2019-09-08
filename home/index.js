document.querySelector("#mischief-btn").onclick = function() {
    window.open("../part1/part1.html", '_self');
}

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal & start footprints
btn.onclick = function() {
    console.log('hiiii')
// Get the modal
    //modal.style.display = "block";
    //modal = document.getElementById("myModal");
    modal.className = 'open modal';

    // var NavWidth=$(modal).width();
    // var NavHeight = $(modal).height();

    var NavWidth = window.innerWidth;
    var NavHeight = window.innerHeight;
    var x = NavWidth/2;
    var y = NavHeight/2;
    var rotation = 0;
    var crit = 0;

    console.log(NavHeight, NavWidth)


console.log('hi');

    function walk() {	
	    //Random rotation
	    var random = Math.floor((Math.random()*360));
    
        //Prevents the "character" from making angles> 45 or <-45
	    while((rotation-90)-random>45||(rotation-90)-random<-45) {
		    random = Math.floor((Math.random()*360));

        //Check if the "character" will come out of the screen
		if(x + Math.cos((random/180)*Math.PI)*50<0||y + Math.sin((random/180)*Math.PI)*50<0||x + Math.cos((random/180)*Math.PI)*50>NavWidth||y +Math.sin((random/180)*Math.PI)*50>NavHeight ) {
			//If so, he makes a U-turn
			random += 180;
			break;
        }


        
		//Check if the program is not stuck in the loop, if so fade after 10 iterations
		if(crit>10){break;}
		crit++;
	    }
	    crit=0;
    
        //Determine the future position according to the previous random angle
	    x = x + Math.cos((random/180)*Math.PI)*50;
        y = y +Math.sin((random/180)*Math.PI)*50;
    
        //Adjustment of the rotation according to the inclination of the original image
	    rotation = random+90;
    
        //Element creation
	    var footprint = document.createElement('img');
            footprint.setAttribute("src","../img/icons-&-items/footprint.png");
            footprint.setAttribute("width", "40px");
            footprint.setAttribute("height", "40px");
	    footprint.style.position="absolute";
	    footprint.style.left=x+"px";
	    footprint.style.top=y+"px";
	    footprint.className="footprint";
	    footprint.style.webkitTransform = "rotate("+rotation+"deg)";
        
        //Adding the item in the body
        document.body.appendChild(footprint);
        //$('.modal .modal-content').append(footprint)
    }

    //Call the walk () function every second
    setInterval(function(){walk();},900);

}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
//   modal.style.display = "none";
  modal.className = 'modal';

  
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



