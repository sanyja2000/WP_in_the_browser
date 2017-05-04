var calls = [];
//var backBtn=new Button(20,500,100,50,"Back",true);
var call_buttons = [];
var call_buttons_str = ["1","2","3","4","5","6","7","8","9","*","0","#"];
var call_buttons_call = [];
var call_number = "";
var calling_tone = new Audio();
calling_tone.src = "sounds/call_tone.mp3";
calling_tone.addEventListener("ended",function(){this.currentTime=0;this.play();},false);
var call_callingState = false;
var call_contact = new Contact("unknown","male","");
var x = 5, y=200;
var bgColor = "gray";
for(var i = 0; i < call_buttons_str.length;i++){
	if("*#".indexOf(call_buttons_str[i])>-1){
		bgColor = fcs[13];
	}
	else{bgColor = "gray"}
	call_buttons.push(new Button(x,y,150,110,call_buttons_str[i],false,bgColor));
	x+=160;
	if((i+1)%3==0){
	y+=120;
	x=5;	
	}
}
call_buttons.push(new Button(5,680,310,100,"✆",false,"lime"));
call_buttons.push(new Button(325,680,150,100,"←",false,fcs[15]));
call_buttons_call.push(new Button(15,680,450,100,"End Call",false,fcs[11]));
var caller = {
	name:"Calls",
	appColor: fcs[11],
	reset: function(){call_number = "";call_callingState = false;calling_tone.pause();calling_tone.currentTime=0;},
	mousePressed : function(evt){
		if(call_callingState){
			for(var i = 0; i<call_buttons_call.length;i++){
				call_buttons_call[i].checkClick(mouseX,mouseY,function(btn){
					if(btn.text.replace(/ /g,"")=="EndCall"){call_callingState = false;calling_tone.pause();calling_tone.currentTime=0;}
				});	
			}
		}
		else{
		for(var i = 0; i<call_buttons.length;i++){
			call_buttons[i].checkClick(mouseX,mouseY,function(btn){
				if(call_buttons_str.indexOf(btn.text)>-1 && call_number.length<13){call_number+=btn.text}
				else if(btn.text=="←" && call_number.length>0){call_number=call_number.slice(0,call_number.length-1)}
				else if(btn.text.replace(/ /g,"")=="✆" && call_number.length>0){
					calling_tone.play();
					call_callingState = true;
					call_contact = new Contact("unknown","male","");
					for(var i = 0; i < contacts.length;i++){
						if(contacts[i].number == call_number) {call_contact=contacts[i];break;}
					}
				}
			});
		}}
	},
	display: function() {
	if(call_callingState){
		ctx.drawImage(call_contact.image,0,180,480,480/call_contact.image.width*call_contact.image.height);
		ctx.textAlign = "start";//"rgba(0,100,0,0.3)";
		//ctx.fillRect(0,0,480,800);
		ctx.fillStyle = "white";
		ctx.font = "60px SegoeWP";
		ctx.textAlign = "center";
		ctx.font = "60px SegoeWP";
		ctx.fillText(call_contact.name,240,100);
		ctx.fillText(call_number,240,160);
		ctx.textAlign = "start";
		for(var i = 0; i<call_buttons_call.length;i++){
			call_buttons_call[i].display()
		}
		
	}
	else{
		ctx.fillStyle = "white";
		ctx.font = "60px SegoeWP";
		ctx.textAlign = "right";
		ctx.fillText(call_number,480,180);
		ctx.font = "50px SegoeWP";
		ctx.textAlign = "start";
		ctx.fillText("calls",30,90);
		for(var i = 0; i<call_buttons.length;i++){
			call_buttons[i].display()
		}}
	}
}

//var message = ["In this demo,","you can't receive","or","make calls."];
