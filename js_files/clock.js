var clock_window = "timezone";
var clock_buttons = [];
var clock_stopwatch_time = 0,clock_stopwatch_started = false,clock_stopwatch_start = new Button(40,600,200,100,"Start",true,fcs[1]),clock_stopwatch_reset = new Button(250,600,200,100,"Reset",true,fcs[11]);
clock_stopwatch_start.font = "70px SegoeWP";
clock_stopwatch_reset.font = "70px SegoeWP";

var clock_timer_hup = new Button(80,300,90,70,"/\\",true), 
clock_timer_hdown = new Button(80,470,90,70,"\\/",true);
var clock_timer_mup = new Button(195,300,90,70,"/\\",true), 
clock_timer_mdown = new Button(195,470,90,70,"\\/",true);
var clock_timer_sup = new Button(310,300,90,70,"/\\",true), 
clock_timer_sdown = new Button(310,470,90,70,"\\/",true);

var clock_timer_endSnd = new Audio();
clock_timer_endSnd.src = "sounds/timer_end.mp3";

var clock_timer_time = 0,clock_timer_started = false,clock_timer_start = new Button(40,650,200,100,"Start",true,fcs[1]),clock_timer_reset = new Button(250,650,200,100,"Reset",true,fcs[11]);
var clock_timer_inter = 0;
clock_timer_start.font = "70px SegoeWP";
clock_timer_reset.font = "70px SegoeWP";
clock_buttons.push(new Button(80,80,280,75,"timezone"));
clock_buttons.push(new Button(370,80,300,75,"stopwatch",false,"black","rgba(255,255,255,0.6)"));
//clock_buttons.push(new Button(680,80,180,75,"timer",false,"black","rgba(255,255,255,0.6)"));
var clk_waited_millis = new Date().getTime();
var clock_animation = 0;
function clock_makeCurrent(window,index){
	var clk_now = new Date();
	if(clk_now.getTime()-300>clk_waited_millis){
		clock_window = window;
		clk_waited_millis = clk_now.getTime();
		var cl_mennyiseg = clock_buttons[index].x-80;
		var clock_count = 0;
		clock_animation = setInterval(function(){
			for(var i = 0; i < clock_buttons.length; i++){
				if(i!= index){clock_buttons[i].textColor = "rgba(255,255,255,0.6)";}
				else {clock_buttons[i].textColor = "white"}
				clock_buttons[i].x -= cl_mennyiseg/15;
			}
			clock_count++;
			if(clock_count == 15){clearInterval(clock_animation)}
		},1000/60);
	}
}
var clock = {
	name:"Clock",
	appColor:fcs[6],
	reset: function(){clock_makeCurrent("timezone",0);clock_timer_endSnd.pause();clock_timer_endSnd.currentTime=0;clock_stopwatch_time=0;clock_stopwatch_started = false;clock_stopwatch_start.text = "Start";},
	mousePressed:function(event){
		//Timezone Page
		if(clock_window == "timezone"){
			var rect1 = {x:299,y:300,w:40,h:40};
			var rect2 = {x:299,y:402,w:40,h:40};
			if(mouseX>rect1.x && mouseX<rect1.x+rect1.w && mouseY>rect1.y && mouseY<rect1.y+rect1.h) {
				GMT += 1;
			}
			else if(mouseX>rect2.x && mouseX<rect2.x+rect2.w && mouseY>rect2.y && mouseY<rect2.y+rect2.h) {
				GMT -= 1;
			}
			for(var i = 0; i < clock_buttons.length; i++){
				clock_buttons[i].checkClick(mouseX,mouseY,function(btn){clock_makeCurrent(clock_buttons[i].text,i)});
			}
		}
		//Stopwatch Page
		else if(clock_window=="stopwatch"){
			for(var i = 0; i < clock_buttons.length; i++){
				clock_buttons[i].checkClick(mouseX,mouseY,function(btn){clock_makeCurrent(clock_buttons[i].text,i)});
			}
			clock_stopwatch_start.checkClick(mouseX,mouseY,function(btn){
				if(clock_stopwatch_started){clock_stopwatch_started=false;clock_stopwatch_start.text = "Start";}
				else{clock_stopwatch_started = true;clock_stopwatch_start.text = "Pause";}
			});
			clock_stopwatch_reset.checkClick(mouseX,mouseY,function(btn){
				clock_stopwatch_time = 0;
			});
		}
		//Timer Page
		else if(clock_window=="timer"){
			for(var i = 0; i < clock_buttons.length; i++){
				clock_buttons[i].checkClick(mouseX,mouseY,function(btn){clock_makeCurrent(clock_buttons[i].text,i)});
			}
			clock_timer_start.checkClick(mouseX,mouseY,function(btn){
				if(clock_timer_started){clock_timer_started=false;clock_timer_start.text = "Start";}
				else{
					clock_timer_started = true;clock_timer_start.text = "Pause";
					if(!clock_timer_inter){
						clock_timer_inter = setInterval(function(){
							if(clock_timer_started && clock_timer_time>0){clock_timer_time-=1}
							//If ended
							if(clock_timer_time == 0){
								clearInterval(clock_timer_inter);
								var clk_timer_snd_rep = 4;
								var clk_timer_snd_loop = setInterval(function(){
									clock_timer_endSnd.play();
									if(clk_timer_snd_rep == 0){clearInterval(clk_timer_snd_loop);clock_timer_started = false;clock_timer_start.text = "Start";}
									clk_timer_snd_rep--;
								},clock_timer_endSnd.duration*1000);
						
							}
						},1000);
					}
				}
			});
			clock_timer_reset.checkClick(mouseX,mouseY,function(btn){
				clock_timer_time = 0;
				clock_timer_started = false;clock_timer_start.text = "Start";
				clearInterval(clock_timer_inter);
			});
			if(!clock_timer_started){
				clock_timer_hup.checkClick(mouseX,mouseY,function(btn){if(Math.floor(clock_timer_time/3600)==99){clock_timer_time-=99*3600}else{clock_timer_time+=3600}});
				clock_timer_hdown.checkClick(mouseX,mouseY,function(btn){if(Math.floor(clock_timer_time/3600)==0){clock_timer_time+=99*3600}else{clock_timer_time-=3600}});
				clock_timer_mup.checkClick(mouseX,mouseY,function(btn){if(Math.floor(clock_timer_time%3600/60)==59){clock_timer_time-=59*60}else{clock_timer_time+=60}});
				clock_timer_mdown.checkClick(mouseX,mouseY,function(btn){if(Math.floor(clock_timer_time%3600/60)==0){clock_timer_time+=59*60}else{clock_timer_time-=60}});
				clock_timer_sup.checkClick(mouseX,mouseY,function(btn){if(Math.floor(clock_timer_time%60)==59){clock_timer_time-=59}else{clock_timer_time+=1}});
				clock_timer_sdown.checkClick(mouseX,mouseY,function(btn){if(Math.floor(clock_timer_time%60)==0){clock_timer_time+=59}else{clock_timer_time-=1}});
			}
		}
	},
	display:function() {
	//Timezone Page
	if(clock_window=="timezone"){
		ctx.fillStyle = "white";
		ctx.font = "60px SegoeWP";
		for(var i = 0; i < clock_buttons.length; i++){
		clock_buttons[i].display();
		}
		//ctx.fillText("stopwatch",300,140);
		ctx.fillStyle="white";
		ctx.font = "40px SegoeWP";
		ctx.fillText("Current GMT:  "+GMT,50,400);
		ctx.strokeStyle = "white";
		ctx.font = "40px SegoeWP";
		//ctx.strokeRect(300,325,40,40);
		ctx.beginPath();
		ctx.arc(319,340,20,0,Math.PI*2);
		ctx.stroke();
		ctx.fillText("+",305,352);
		ctx.beginPath();
		ctx.arc(319,430,20,0,Math.PI*2);
		ctx.stroke();
		ctx.fillText("-",310,442);}
	//Stopwatch Page
	else if(clock_window=="stopwatch"){
		for(var i = 0; i < clock_buttons.length; i++){
		clock_buttons[i].display();
		}
		ctx.font = "90px SegoeWP";
		ctx.fillStyle = "white";
		ctx.textAlign="center";
		clock_stopwatch_start.display();
		clock_stopwatch_reset.display();
		ctx.fillText(checkTime(Math.floor(clock_stopwatch_time/60))+":"+checkTime(Math.floor(clock_stopwatch_time%60))+":"+checkTime(Math.floor(clock_stopwatch_time%1*100)),240,350);
	}
	//Timer Page
	else if(clock_window=="timer"){
		for(var i = 0; i < clock_buttons.length; i++){
		clock_buttons[i].display();
		}
		if(clock_timer_started){
			ctx.font="100px SegoeWP";
		}else{
		ctx.font = "90px SegoeWP";}
		ctx.fillStyle = "white";
		ctx.textAlign="center";
		clock_timer_start.display();
		clock_timer_reset.display();
		if(!clock_timer_started){
			clock_timer_hup.display();
			clock_timer_hdown.display();
			clock_timer_mup.display();
			clock_timer_mdown.display();
			clock_timer_sup.display();
			clock_timer_sdown.display();
		}
		ctx.fillText(checkTime(Math.floor(clock_timer_time/3600))+":"+checkTime(Math.floor(clock_timer_time%3600/60))+":"+checkTime(Math.floor(clock_timer_time%60)),240,450);
	}
	}
}
