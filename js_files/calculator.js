
var calc_buttons_str = ["7","8","9","*","4","5","6","-","1","2","3","+"],calc_buttons=[],calc_eval_line="0",calc_equaled=true;
var y = 200;
var x = 5;
for(var i = 0; i < calc_buttons_str.length; i++){
	if(i%4==0){
		y+=120;
		x=5;
	}
	var btnBgColor = "#333";
	if("123456789".indexOf(calc_buttons_str[i])<0){
		btnBgColor = "gray";
	}
	calc_buttons.push(new Button(x,y,110,110,calc_buttons_str[i],false,btnBgColor));
	x+=120;
}
calc_buttons.push(new Button(5,220,110,90," c",false,fcs[2]));
calc_buttons.push(new Button(125,220,110,90," (",false,fcs[12]));
calc_buttons.push(new Button(245,220,110,90,"  )",false,fcs[12]));
calc_buttons.push(new Button(365,220,110,90,"←",false,fcs[12]));
calc_buttons.push(new Button(5,680,110,110,"0",false,"#333"));
calc_buttons.push(new Button(245,680,110,110,"=",false,fcs[13]));
calc_buttons.push(new Button(365,680,110,110,"/",false,"gray"));
calc_buttons.push(new Button(125,680,110,110," .",false,"gray"));
/*
var calc_nullBtn = new Button(5,680,110,110,"0",false,"#333");
var calc_equalBtn = new Button(245,680,110,110,"=",false,fcs[13]);
var calc_divideBtn = new Button(365,680,110,110,"/",false,"gray")
var calc_dotBtn = new Button(125,680,110,110," .",false,"gray");
*/
var calculator = {
	name:"Calculator",
	appColor: fcs[3],
	line:"",
	reset: function(){calc_eval_line="";equaled=true},
	mousePressed : function(evt){
		for(var i = 0; i < calc_buttons.length; i++){
			calc_buttons[i].checkClick(mouseX,mouseY,function(btn){
				if (btn.text == " c") {
					calc_eval_line = "0";
					calc_equaled = true;
				}
				else if (btn.text=="←"){
					if(!calc_equaled && calc_eval_line.length > 1){
					calc_eval_line = calc_eval_line.slice(0,calc_eval_line.length-1);
				}
					else{
					calc_eval_line = "0";
					calc_equaled = true;
					}
				}
				else if(btn.text!="="){
					if("1234567890".indexOf(btn.text)>=0 && calc_equaled){
						calc_eval_line=btn.text;
					}
					else{
						calc_eval_line+=btn.text.replace(/ /g,"");
					}
					calc_equaled=false;}
				else{
					try {calc_eval_line=eval(calc_eval_line);calc_equaled=true;}catch(err){alert("Syntax error!")}
				}
			});
		}
	},
	display: function() {
	ctx.fillStyle = "rgba(255,255,255,0.7)";
	ctx.font = "50px SegoeWP";
	if(calc_equaled){
		ctx.fillText("=",40,170);
	}
	ctx.fillStyle = "white";
	ctx.font = "60px SegoeWP";
	ctx.fillText("calc",30,100);
	ctx.textAlign = "right";
	if((calc_eval_line+"").length < 13){ctx.font="60px SegoeWP"}
	else if((calc_eval_line+"").length < 17){ctx.font="50px SegoeWP"}
	else if((calc_eval_line+"").length < 21){ctx.font="40px SegoeWP"}
	else{ctx.font="30px SegoeWP";}
	ctx.fillText(calc_eval_line,460,200);
	ctx.textAlign="start";
	for(var i = 0; i < calc_buttons.length; i++){
		calc_buttons[i].display();
	}
	},
}
