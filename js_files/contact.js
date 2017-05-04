var contacts = [];
var scrolledCont = 30;
var contacter = {
	name:"Contacts",
	appColor:fcs[4],
	mousePressed : function(){},
	display:function() {
	var y = 30+70+scrolledCont;
	var height = 0;
	ctx.fillStyle = "white";
	ctx.font = "60px SegoeWP";
	ctx.fillText("contacts",30,y);
	y += 60;
	for(var i = 0; i<contacts.length;i++) {
		contacts[i].show(30,y);
		y+=60;
		height += 60;
	}
	maxy = height-550;
}
}

function compare(a,b) {
  if (a.name < b.name)
    return -1;
  if (a.name > b.name)
    return 1;
  return 0;
}
function Contact(name,gender,number,image) {
	this.name = name;
	this.number = number;
	this.h = 60;
	this.image = new Image();
	if(image)
		this.image.src = "contacts/"+image;
	else
		this.image.src = "contacts/appbar.unk_"+gender+".png";
	this.show = function(x,y) {
		ctx.drawImage(this.image,x,y,50,50);
		ctx.fillStyle = "white";
		ctx.font = "30px SegoeWP";
		ctx.fillText(this.name,x+60,y+25);
		ctx.font = "20px SegoeWP";
		ctx.fillStyle = "gray";
		ctx.fillText(this.number,x+65,y+45);
	}
}

function orderByName(list) {
	letters = "abcdefghijklmnopqrstzvwxyz+".toUpperCase();
	var arr = [];
	for(var c = 0;c<list.length;c++) {
	for(var i = 0;i<arr.length;i++) {
		if(letters.indexOf(list[c].name[0])<=letters.indexOf(arr[i].name[0])) {
			arr.splice(i,0,list[c]);
			break;
		}
	}
	}
	return arr;
}

function randomPhone() {
	number = "";
	for(var j = 0; j < 9; j++) {
		number+=Math.floor(Math.random()*10);
	}
	return number;
}

var girls = ["Emma","Olivia","Sophia","Isabella","Mia","Abigel","Emily","Charlotte","Harper","Medison","Elisabeth","Chloe","Grace"];
var boys = ["Noah","Liam","William","Ethan","James","Alexander","Michael","Benjamin","Logan","Matthew","Daniel","Lucas","David"];

for(var i = 0; i< girls.length; i++) {
	contacts.push(new Contact(girls[i],"female",randomPhone()));
}
for(var i = 0; i< boys.length; i++) {
	contacts.push(new Contact(boys[i],"male",randomPhone()));
}

contacts.push(new Contact("Jessica","female","0624324356"));
contacts.push(new Contact("Me","male","unknown"));
contacts.push(new Contact("Catman","male","123","catman.png"));
contacts.push(new Contact("DogBro","male","456","dogbro.jpg"));
contacts.sort(compare);
