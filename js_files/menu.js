  
var buttons = [];

var marginLeft = 30;
var marginBetween = 10;

var scrolledMenu = 30;
var maxy;

function backToMainScreen(){
	currentApp = menu;
	scroll = 30;
}

var menu = {name : "Menu" ,appColor:"rgba(0,0,0,0)",mousePressed : function(event) 
{
	if(event.button == 0) {
	for(var i = 0; i<buttons.length;i++) {
		b = buttons[i];
		if(mouseX > b.x && mouseX < b.x+b.w && mouseY > b.y && mouseY < b.y+b.h) {
			buttons[i].clicked();
		}
	}}},
display:function() {
	var y = 30+scrolledMenu;
	var height = 0;
	var ly = y;
	for(var i = 0; i< buttons.length;i++) {
		var isNewLine = (ly != y);
		if(buttons[i].size == "wide") {
			ly = y;
			if(buttons[i-1] && !isNewLine) {
				y += buttons[i-1].y;
			}
			buttons[i].display(marginLeft,y);
			y += buttons[i].h + marginBetween;
		}
		else if(buttons[i].size == "normal") {
			ly = y;
			if(buttons[i-1] && !isNewLine) {
			buttons[i].display(marginLeft+(!isNewLine*buttons[i-1].w)+!isNewLine*marginBetween,y);}
			else {buttons[i].display(marginLeft,y);}
			y = y + (!isNewLine*buttons[i].h+!isNewLine*marginBetween);
		}
		height += y-ly;
	}
	maxy = height-550;
}

}

function MenuButton(size,image,color,name,command) {
	this.sx = NaN;
	this.size = size;
	this.tsize = 20;
	this.image = new Image();
	this.image.src = "icons/"+image;
	this.x = 0;
	this.y = 0;
	if(this.size == "small") {
		this.w = 100;
		this.h = 100;
	}
	else if(this.size == "swide") {
		this.w = 210;
		this.h = 100;
	}
	else if(this.size == "wide") {
		this.sx = 0;
		this.w = 410;
		this.h = 200;
	}
	else if(this.size == "normal") {
		this.w = 200;
		this.h = 200;
	}
	this.color = color;
	this.name = name;
	this.command = command;
	this.display = function(x,y) {
		this.x = x;
		this.y = y;
		ctx.save();
		ctx.fillStyle = this.color;
		ctx.fillRect(x,y,this.w,this.h);
		ctx.font = this.tsize+"px SegoeWP";
		ctx.fillStyle = "white";
		ctx.fillText(this.name,x+10,y+this.h-this.tsize);
		ctx.drawImage(this.image,this.x+this.w/2-38,this.y+this.h/2-38,76,76);
		ctx.restore();
	}
	this.clicked = function() {
		this.command();
		if(runningApps.indexOf(currentApp)<0 && currentApp != explorer ){//&& currentApp != td_shooter) {
			runningApps.push(currentApp);}
		if(currentApp != menu)
			scrolled = 30;
	}
}
buttons.push(new MenuButton("wide","appbar.clock.png",fcs[6],"Clock",function() {currentApp = clock}));
buttons.push(new MenuButton("normal","appbar.people.png",fcs[4],"Contacts",function() {currentApp = contacter}));
buttons.push(new MenuButton("normal","appbar.phone.png",fcs[11],"Calls",function(){currentApp=caller;}));
buttons.push(new MenuButton("normal","appbar.music.png",fcs[12],"Music",function() {currentApp = music;}));
//buttons.push(new MenuButton("normal","appbar.social.skype.png",fcs[5],"Skype",function() {console.log('skype opened');}));
buttons.push(new MenuButton("normal","appbar.browser.ie.png",fcs[5],"Internet Explorer",function() {currentApp = explorer;}));
buttons.push(new MenuButton("normal","appbar.calculator.png",fcs[3],"Calculator",function() {currentApp = calculator;}));
//buttons.push(new MenuButton("normal","appbar.xbox.png",fcs[1],"Games",function() {console.log("games opened");}))
//buttons.push(new MenuButton("normal","appbar.td_shooter.png",fcs[1],"Top-Down Shooter",function() {currentApp = td_shooter;}))
