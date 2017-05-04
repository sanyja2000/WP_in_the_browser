var td_fighter = new Image();
td_fighter.src = "td_shooter/fighter.png";
var td_bg1 = new Image();
td_bg1.src = "td_shooter/bg2.jpg";
var td_bullets,td_stars,td_bstars,td_enemies,td_float_bgs,td_float_bgy;
var td_lvl1 = -2000;
function td_setup() {
td_bullets = [];
td_stars = [];
td_bstars = [];
td_enemies = [];
for(var i = 0; i<20; i++) {
	td_enemies.push(new td_Enemy(random(50,430),-2000-i*500,5));
}
for(var i = 0; i < 100; i++) {
	td_stars.push(new td_Star(random(0,480),random(-500,-50)));
}
for(var i = 0; i < 40; i++) {
	td_bstars.push(new td_BStar(random(0,480),random(-800,0,20)));
}
td_float_bgs = 1;
td_float_bgy = 0;
}
td_setup();
var td_shooter = {
	name:"Top Down Shooter",
	appColor:fcs[1],
	mousePressed:function() {
		td_bullets.push(new td_Bullet(mouseX,700));
	},
	display:function() {
		if(runningApps.indexOf(td_shooter)<0) {
			runningApps.push(td_shooter);
			td_setup();
		}
		canvas.style.cursor = "none";
		ctx.fillStyle = "rgb(20,10,10)";
		ctx.fillRect(0,0,480,800);
		//ctx.drawImage(td_bg1,-1735,td_float_bgy-5382);
		for(var i = 0; i<td_bstars.length;i++) {
			td_bstars[i].draw();
			td_bstars[i].update();
		}

		td_float_bgy += td_float_bgs;
		for(var i = 0; i<td_bullets.length;i++) {
			td_bullets[i].draw();
			td_bullets[i].update();
		}
		for(var i = 0; i<td_stars.length;i++) {
			td_stars[i].draw();
			td_stars[i].update();
		}
		for(var i = 0; i<td_enemies.length;i++) {
			td_enemies[i].draw();
			td_enemies[i].update();
		}
		ctx.beginPath();
		ctx.fillStyle = "red";
		ctx.ellipse(mouseX,770,5,Math.abs(Math.floor(Math.sin((frames/1)/20)*10))+10,Math.PI,Math.PI,Math.PI*2);
		ctx.fill();
		ctx.closePath();
		ctx.drawImage(td_fighter,mouseX-50,680,100,100);
		ctx.moveTo(mouseX-15,mouseY);
		ctx.lineTo(mouseX+15,mouseY);
		ctx.moveTo(mouseX,mouseY-15);
		ctx.lineTo(mouseX,mouseY+15);
		ctx.strokeStyle = "orange";
		ctx.lineWidth = 2;
		ctx.stroke();
	}
}

function td_Star(x,y) {
	this.x = x;
	this.y = y;
	this.vy = random(2,7,0.5);
	this.draw = function() {
		ctx.strokeStyle = "white";
		ctx.strokeRect(this.x-1,this.y-1,2,2);
	}
	this.update = function() {
		this.y += this.vy;
		if(this.y > 800) {
			this.y = random(-500,-50);
		}
	}
}

function td_BStar(x,y) {
	this.x = x;
	this.y = y;
	this.rad = random(2,10);
	this.draw = function() {
		ctx.save();
		ctx.shadowBlur = 20;
		ctx.shadowColor = "yellow"
		ctx.fillStyle = "orange";
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.rad,0,Math.PI*2);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}
	this.update = function() {
		this.y += td_float_bgs;
		if(this.y > 800) {
			this.y = random(-500,-50);
		}
	}
}

function td_Bullet(x,y,vy = -10,ebullet) {
	this.x = x;
	this.y = y;
	this.vy = vy;
	this.update = function() {
		this.y+=this.vy;
		if(ebullet) {
			if(this.y > 800)
				td_bullets.splice(td_bullets.indexOf(this),1);
			}
		else {
			if(this.y > 800 || this.y < -100)
				td_bullets.splice(td_bullets.indexOf(this),1);
		}
	}
	this.draw = function() {
		ctx.save();
		ctx.lineWidth=5;
		ctx.shadowBlur = 10;
		ctx.shadowColor = "red";
		ctx.strokeStyle = "red";
		ctx.beginPath();
		ctx.moveTo(this.x,this.y);
		ctx.lineTo(this.x,this.y+20);
		ctx.closePath();
		ctx.stroke();
		ctx.restore();
	}
}

function td_Enemy(x,y,vy) {
	this.x = x;
	this.y = y;
	this.vy = vy;
	this.vx = 0;
	this.shootdel = random(1,50);
	this.shooter = true;
	this.image = new Image();
	this.image.src = "td_shooter/enemy2.png";
	this.update = function() {
		this.y += this.vy;
		this.x += this.vx;
		if(this.shooter && (frames+this.shootdel)%60==0) {
			console.log("shoot");
			td_bullets.push(new td_Bullet(this.x,this.y,10,true));
		}};
	this.draw = function() {
		ctx.drawImage(this.image,this.x-50,this.y-50,100,100);
	}

}
