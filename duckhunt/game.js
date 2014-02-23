// Your work goes here...

function draw() {

	var canvas = document.getElementById("game");

	if (canvas.getContext) {
		var ctx = canvas.getContext("2d");
	} else {
		//canvas-unsupported coded here
	}

	ctx.fillStyle = "#87CEEB";
	ctx.fillRect(0,0, 800, 600);
	var img = new Image();
	//Once the image is loaded, do the following
	img.onload = function () {
		
		//Drawing the tree
		ctx.drawImage(img, 0, 272, 78, 122, 10, 100, 200, 400);
		//Drawing the dirt and grass
		ctx.drawImage(img, 0, 706, 900, 194, 0, 406, 800, 194);
		
	}
	img.src = "assets/duckhunt.png";
	


}
