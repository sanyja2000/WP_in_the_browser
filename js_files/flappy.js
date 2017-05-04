var flappy = {
	name:"flappy bird",
	appColor:fcs[1],
	mousePressed: function() {onpress();}
	display: function() {
var

// Game vars //


fgpos = 0,
score = 0,
best = localStorage.getItem("best") || 0,

// State vars //

currentstate,
states = {
	Splash: 0, Game: 1, Score: 2
},

// Game objects //

/**
 * Ok button initiated in main()
 */
okbtn,

/**
 * The bird
 */
bird = {

	x: 60,
	y: 0,

	frame: 0,
	velocity: 0,
	animation: [0, 1, 2, 1], // animation sequence

	rotation: 0,
	radius: 12,

	gravity: 0.25,
	_jump: 4.6,

	/**
	 * Makes the bird "flap" and jump
	 */
	jump: function() {
		this.velocity = -this._jump;
	},

	/**
	 * Update sprite animation and position of bird
	 */
	update: function() {
		// make sure animation updates and plays faster in gamestate
		var n = currentstate === states.Splash ? 10 : 5;
		this.frame += frames % n === 0 ? 1 : 0;
		this.frame %= this.animation.length;

		// in splash state make bird hover up and down and set
		// rotation to zero
		if (currentstate === states.Splash) {

			this.y = pheight - 280 + 5*Math.cos(frames/10);
			this.rotation = 0;

		} else { // game and score state //

			this.velocity += this.gravity;
			this.y += this.velocity;

			// change to the score state when bird touches the ground
			if (this.y >= pheight - s_fg.pheight-10) {
				this.y = pheight - s_fg.pheight-10;
				if (currentstate === states.Game) {
					currentstate = states.Score;
				}
				// sets velocity to jump speed for correct rotation
				this.velocity = this._jump;
			}

			// when bird lack upward momentum increment the rotation
			// angle
			if (this.velocity >= this._jump) {

				this.frame = 1;
				this.rotation = Math.min(Math.PI/2, this.rotation + 0.3);

			} else {

				this.rotation = -0.3;

			}
		}
	},

	/**
	 * Draws bird with rotation to canvas ctx
	 * 
	 * @param  {CanvasRenderingContext2D} ctx the context used for
	 *                                        drawing
	 */
	draw: function(ctx) {
		ctx.save();
		// translate and rotate ctx coordinatesystem
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rotation);
		
		var n = this.animation[this.frame];
		// draws the bird with center in origo
		s_bird[n].draw(ctx, -s_bird[n].pwidth/2, -s_bird[n].pheight/2);

		ctx.restore();
	}
},

/**
 * The pipes
 */
pipes = {

	_pipes: [],
	// padding: 80, // TODO: Implement paddle variable

	/**
	 * Empty pipes array
	 */
	reset: function() {
		this._pipes = [];
	},

	/**
	 * Create, push and update all pipes in pipe array
	 */
	update: function() {
		// add new pipe each 100 frames
		if (frames % 100 === 0) {
			// calculate y position
			var _y = pheight - (s_pipeSouth.pheight+s_fg.pheight+120+200*Math.random());
			// create and push pipe to array
			this._pipes.push({
				x: 500,
				y: _y,
				pwidth: s_pipeSouth.pwidth,
				pheight: s_pipeSouth.pheight
			});
		}
		for (var i = 0, len = this._pipes.length; i < len; i++) {
			var p = this._pipes[i];

			if (i === 0) {

				score += p.x === bird.x ? 1 : 0;

				// collision check, calculates x/y difference and
				// use normal vector length calculation to determine
				// intersection
				var cx  = Math.min(Math.max(bird.x, p.x), p.x+p.pwidth);
				var cy1 = Math.min(Math.max(bird.y, p.y), p.y+p.pheight);
				var cy2 = Math.min(Math.max(bird.y, p.y+p.pheight+80), p.y+2*p.pheight+80);
				// closest difference
				var dx  = bird.x - cx;
				var dy1 = bird.y - cy1;
				var dy2 = bird.y - cy2;
				// vector length
				var d1 = dx*dx + dy1*dy1;
				var d2 = dx*dx + dy2*dy2;
				var r = bird.radius*bird.radius;
				// determine intersection
				if (r > d1 || r > d2) {
					currentstate = states.Score;
				}
			}
			// move pipe and remove if outside of canvas
			p.x -= 2;
			if (p.x < -p.pwidth) {
				this._pipes.splice(i, 1);
				i--;
				len--;
			}
		}
	},

	/**
	 * Draw all pipes to canvas context.
	 * 
	 * @param  {CanvasRenderingContext2D} ctx the context used for
	 *                                        drawing
	 */
	draw: function(ctx) {
		for (var i = 0, len = this._pipes.length; i < len; i++) {
			var p = this._pipes[i];
			s_pipeSouth.draw(ctx, p.x, p.y);
			s_pipeNorth.draw(ctx, p.x, p.y+80+p.pheight);
		}
	}
};

/**
 * Called on mouse or touch press. Update and change state
 * depending on current game state.
 * 
 * @param  {MouseEvent/TouchEvent} evt tho on press event
 */
function onpress(evt) {

	switch (currentstate) {

		// change state and update bird velocity
		case states.Splash:
			currentstate = states.Game;
			bird.jump();
			break;

		// update bird velocity
		case states.Game:
			bird.jump();
			break;

		// change state if event within okbtn bounding box
		case states.Score:
			// get event position
			var mx = evt.offsetX, my = evt.offsetY;

			if (mx == null || my == null) {
				mx = evt.touches[0].clientX;
				my = evt.touches[0].clientY;
			}

			// check if within
			if (okbtn.x < mx && mx < okbtn.x + okbtn.pwidth &&
				okbtn.y < my && my < okbtn.y + okbtn.pheight
			) {
				pipes.reset();
				currentstate = states.Splash;
				score = 0;
			}
			break;

	}
}

/**
 * Starts and initiate the game
 */
function main() {
	// create canvas and set pwidth/pheight

	var pwidth = 460;
	var pheight = 700;
	var evt = "mousedown";

	// listen for input event

	currentstate = states.Splash;
	// append canvas to document

	// initate graphics and okbtn
	var img = new Image();
	img.onload = function() {
		initSprites(this);
		ctx.fillStyle = s_bg.color;

		okbtn = {
			x: (pwidth - s_buttons.Ok.pwidth)/2,
			y: pheight - 200,
			pwidth: s_buttons.Ok.pwidth,
			pheight: s_buttons.Ok.pheight
		}

		run();
	}
	img.src = "res/sheet.png";
}

/**
 * Starts and update gameloop
 */
function run() {
	var loop = function() {
		update();
		render();
	}
	loop();
}

/**
 * Update forground, bird and pipes position
 */
function update() {
	frames++;

	if (currentstate !== states.Score) {
		fgpos = (fgpos - 2) % 14;
	} else {
		// set best score to maximum score
		best = Math.max(best, score);
		localStorage.setItem("best", best);
	}
	if (currentstate === states.Game) {
		pipes.update();
	}

	bird.update();
}

/**
 * Draws bird and all pipes and assets to the canvas
 */
function render() {
	// draw background color
	ctx.fillRect(0, 0, pwidth, pheight);
	// draw background sprites
	s_bg.draw(ctx, 0, pheight - s_bg.pheight);
	s_bg.draw(ctx, s_bg.pwidth, pheight - s_bg.pheight);

	pipes.draw(ctx);
	bird.draw(ctx);

	// draw forground sprites
	s_fg.draw(ctx, fgpos, pheight - s_fg.pheight);
	s_fg.draw(ctx, fgpos+s_fg.pwidth, pheight - s_fg.pheight);

	var pwidth2 = pwidth/2; // center of canvas

	if (currentstate === states.Splash) {
		// draw splash text and sprite to canvas
		s_splash.draw(ctx, pwidth2 - s_splash.pwidth/2, pheight - 300);
		s_text.GetReady.draw(ctx, pwidth2 - s_text.GetReady.pwidth/2, pheight-380);

	}
	if (currentstate === states.Score) {
		// draw gameover text and score board
		s_text.GameOver.draw(ctx, pwidth2 - s_text.GameOver.pwidth/2, pheight-400);
		s_score.draw(ctx, pwidth2 - s_score.pwidth/2, pheight-340);
		s_buttons.Ok.draw(ctx, okbtn.x, okbtn.y);
		// draw score and best inside the score board
		s_numberS.draw(ctx, pwidth2-47, pheight-304, score, null, 10);
		s_numberS.draw(ctx, pwidth2-47, pheight-262, best, null, 10);

	} else {
		// draw score to top of canvas
		s_numberB.draw(ctx, null, 20, score, pwidth2);

	}
}

// start and run the game
main();
}