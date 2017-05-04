var songs = [];

var playImg= new Image();
playImg.src = "icons/appbar.control.play.png";

var currentlyPlaying = NaN;

var music = {
	name : "Music Player",
	appColor: fcs[12],
	reset: function(){
		for(var i = 0; i < songs.length;i++){
			songs[i].song.pause();
			songs[i].song.currentTime = 0;
			songs[i].playing = false;
		}
	},
	mousePressed:function(){
		for(var i = 0; i< songs.length; i++) {
			songs[i].clickplay();
		}
	},
	display:function() {
	var y = 200+scrolled;
	ctx.fillStyle = "white";
	ctx.font = "60px SegoeWP";
	ctx.fillText("music",30,y-100);
	var height = 0;
	currentlyPlaying = NaN;
	for(var i = 0; i<songs.length; i++) {
		songs[i].y = y+i*55-35;
		ctx.fillStyle = "white";
		ctx.strokeStyle ="white";
		ctx.font = "25px SegoeWP";
		ctx.fillText(songs[i].name,50,y+i*55);
		ctx.strokeRect(20,y+i*55-35,440,50);
		if(songs[i].playing) {
			ctx.drawImage(playImg,400,y+i*55-35,50,50);
			currentlyPlaying = songs[i];
		}
		height += 55;
	}
	if(currentlyPlaying) {
			var ctime = currentlyPlaying.song.currentTime;
			var dur = currentlyPlaying.song.duration;
			var percent = ctime/dur;
			var cmins = ("0"+Math.floor(ctime/60)).slice(-2);
			var csecs = ("0"+Math.floor(ctime%60)).slice(-2);
			var mins = ("0"+Math.floor(dur/60)).slice(-2);
			var secs = ("0"+Math.floor(dur%60)).slice(-2);
			ctx.fillStyle = "black";
			ctx.fillRect(0,740,480,60);
			ctx.fillStyle = "gray";
			ctx.fillRect(20,760,440,8);
			ctx.fillStyle = "white";
			ctx.fillRect(20,762,Math.floor(440*percent),4);
			ctx.font = "20px SegoeWP";
			ctx.fillText(cmins+":"+csecs,20,790);
			ctx.fillText(mins+":"+secs,410,790);
	}
	if(height+200>HEIGHT)
		maxy = height-500;
	else
		scrolled = 40;
		maxy = songs.length*20;
	}
} 

function Song(name,src) {
	this.x = 30;
	this.y = 0;
	this.name = name;
	this.src = "songs/"+src;
	this.song = new Audio();
	this.song.src = this.src;
	this.playing = false;
	this.song.onended = function() {this.playing = false;}
	this.clickplay = function() {
		if(mouseX > this.x && mouseX < this.x + 440 && mouseY > this.y && mouseY < this.y + 50){
			if(!this.playing) {
			//console.log("playing "+this.name);
			makeToast("Playing \n"+this.name);
			for(var i = 0; i < songs.length; i++) {
				if (i!=songs.indexOf(this)) {
					songs[i].song.pause();
					songs[i].song.currentTime = 0;
					songs[i].playing = false;
				}

			}
			this.playing = true;
			this.song.play();
			}
			else {
				console.log("stopped "+this.name);
				this.playing = false;
				this.song.pause();
			}
		}
	}
}

songs.push(new Song("Nightcore - Freaks","Freaks.mp3"));
songs.push(new Song("Computer Error Song","Computer_Error_Song.mp3"));
songs.push(new Song("Road - Világcsavargó","vilagcsavargo.mp3"));
songs.push(new Song("Ahrix - Nova","ahrix.mp3"));
songs.push(new Song("Zara Larsson - Never forget you","never_forget_you.mp3"));
songs.push(new Song("Adele - Rolling in the deep","rolling_in_the_deep.mp3"));
songs.push(new Song("Alan Walker - Fade","aw_fade.mp3"));
songs.push(new Song("Bon Jovi - It's my life","its_my_life.mp3"));
songs.push(new Song("Twisted Sisters - I Wanna Rock","i_wanna_rock.mp3"));
songs.push(new Song("Imagine Dragons - Radioactive","radioactive.mp3"));
songs.push(new Song("Adele - Skyfall","skyfall.mp3"));
songs.push(new Song("NightCore - Centuries","centuries.mp3"));
songs.push(new Song("21 pilots - Heathens","heathens.mp3"));
songs.push(new Song("Clean Bandit - Rockabye","rockabye_cleanbandit.mp3"));
songs.push(new Song("Calvin Harris - This Is What You C...","thisiswhatyoucamefor.mp3"));
songs.push(new Song("James Arthur - Impossible","impossible.mp3"));
