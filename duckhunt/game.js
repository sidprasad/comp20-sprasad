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


}
