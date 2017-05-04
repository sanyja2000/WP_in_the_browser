function getMousePos(evt){
   var rect=canvas.getBoundingClientRect();
   var x= evt.clientX - rect.left;
   var y = evt.clientY - rect.top;
   return [x,y];
}

function makeToast(text,lf) {
	toasts.push(new Toast(text,lf));
}

function Toast(text, lifespan){
	this.text = text;
	this.lifespan = lifespan || 120;
	this.display = function(){
		ctx.save();
		ctx.font = "40px SegoeWP";
		ctx.fillStyle = "rgba(0,0,0,"+(this.lifespan+125)/255+")";
		ctx.fillRect(240-this.text.length*10,700,this.text.length*20,50);
		ctx.textAlign = "center";
		ctx.fillStyle = "rgba(255,255,255,"+(this.lifespan+125)/255+")";
		ctx.fillText(this.text,240,740);
		ctx.restore();
		this.lifespan--;
		if(this.lifespan<=0){toasts.splice(toasts.indexOf(this),1);}
	}
}

function Button(x,y,w,h,text,stroke,bgcolor,textcolor,strokecolor){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.text=text;
    this.isStroked = stroke;
    this.bgColor=bgcolor || "black";
    this.textColor=textcolor || "white";
    this.strokeColor=strokecolor || "white";
	this.font = Math.floor(this.h*0.8)+"px SegoeWP";
    this.display = function(){
        ctx.save();
        ctx.fillStyle=this.bgColor;
        ctx.fillRect(this.x,this.y,this.w,this.h);
        if(this.isStroked){
             ctx.strokeStyle=this.strokeColor;
             ctx.strokeRect(this.x,this.y,this.w,this.h);
        }
        ctx.fillStyle=this.textColor;
        ctx.font=this.font;//Math.floor(this.h*0.8)+"px SegoeWP";
        //ctx.fillText(this.text,this.x+this.w*0.1,this.y+this.h*0.8);
		ctx.textAlign = "center";
		ctx.fillText(this.text,this.x+this.w*0.5,this.y+this.h*0.8);
        ctx.restore();
    }
    this.checkClick=function(mx,my,func){
        if(mx >= this.x && mx <=this.x+this.w && my>=this.y && my <=this.y+this.h){
            func(this);
        }
    }
}

