var iemessage = ["In this version of explorer,","you can't use www.google.com,","instead you can use bing.","You can watch youtube videos","if you paste in its link."];
var explorer = {
	name:"Internet Explorer",
	appColor:fcs[5],
	reset:function(){document.getElementById("browserFrame").src="http://www.bing.com";},
	mousePressed:function(){
		if(runningApps.indexOf(explorer)<0) {
			if(mouseX > 190 && mouseX < 290 && mouseY > 535 && mouseY < 575) {
				runningApps.push(explorer);
			}
		}
		//document.getElementById("http").value = document.getElementById("browserFrame").contentWindow.location.href;
	},
	display:function(){
		if(runningApps.indexOf(explorer)<0) {
		ctx.fillStyle = "white";
		ctx.font = "50px SegoeWP";
		ctx.fillText("Internet Explorer",30,100);
		ctx.fillStyle = "white";
		ctx.font = "30px SegoeWP";
		var x = 30;
			for(y = 0;y<iemessage.length;y++) {
			ctx.fillText(iemessage[y],x,300+y*45);
			}
		ctx.strokeStyle = "white";
		ctx.strokeRect(190,535,100,40);
		ctx.fillText("OK",220,565);
		}
		else {
		document.getElementById("browser").style.display="block";
		ctx.fillStyle = "white";
		ctx.font = "50px SegoeWP";
		ctx.fillText("Internet Explorer",30,90);
		document.getElementById("browser").style.left = (window.innerWidth/2-230)+"px";
		}
	}
}
