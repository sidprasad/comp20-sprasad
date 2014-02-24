
/*
Siddhartha Prasad - Comp 20 Assignment 2

This function draws the sky, dirt road, grass, trees, bushes, a dog and 5 birds
on the canvas.
*/
function draw() {

	var canvas = document.getElementById("game");

	if (canvas.getContext) {
		var ctx = canvas.getContext("2d");

		ctx.fillStyle = "#87CEEB";
		ctx.fillRect(0,0, 800, 600);
		var img = new Image();
		//Once the image is loaded, do the following
		img.onload = function () {
		
			//Drawing the tree
			ctx.drawImage(img, 0, 272, 78, 122, 10, 100, 200, 400);
			//Drawing the dirt and grass
			ctx.drawImage(img, 0, 706, 900, 194, 0, 406, 800, 194);
			//Drawing the dog sniffing the road
			ctx.drawImage(img, 0, 0, 58, 45, 300, 450, 150, 116);
		
			//Drawing the first bird
			ctx.drawImage(img, 0, 118, 35, 27.5, 400, 50, 90, 59.4595);
		
			//Drawing the second bird
			ctx.drawImage(img, 165, 156.5, 205-165, 188.5 - 156.5,
						 100, 70, 100, 66.0661);

			//Drawing the third bird
			ctx.drawImage(img, 0, 195, 31, 228-195, 500, 200, 90, 63);
	
			//Drawing the fourth bird
			ctx.drawImage(img, 262, 155, 289-262, 188.5-155, 
						650, 20, 70, 86.8519);

			//Drawing the fifth bird
			ctx.drawImage(img, 78, 117, 113.5-78, 148-117, 240, 270,
							 80, 69.8592);
		}
		img.src = "assets/duckhunt.png";
	} else {
		//Canvas Unsupported
		alert("Your browser does not support duckhunt");
	}


}
