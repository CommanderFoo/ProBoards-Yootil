/**
 * @example
 * let last_time = 0;
 *
 * new yootil.animation({
 *
 *     callback: (animator, start_time, current_time, duration, anim_id) => {
 *         if(current_time >= (last_time + 2000)){
 *             console.log("hello world!"); // will show every 2 seconds
 *             last_time = current_time;
 *         }
 *     },
 *
 *    duration: 20000
 *
 * }).start();
 */

yootil.animation = class {

	/**
	 *
	 * @param {Object} config
	 * @param {Function} config.callback=null - The function to be called on each frame.
	 * @param {Number} config.duration=0 - The length of the animation.
	 * @param {Boolean} [config.start=false] - Pass true to auto start.
	 */

	constructor({callback = null, duration = 0, start = false} = {}){
		if(!callback){
			console.error("yootil.animation constructor: No callback passed");
		}

		this._anim_id = 0;
		this._callback = callback;
		this._start = start;
		this._duration = duration;
		this._time_start = 0;

		this._anim_func = (current_time) => {
			if(!this._time_start){
				this._time_start = current_time;
			}

			if(duration && (current_time - this._time_start) > duration){
				return;
			}

			this._callback(this, this._time_start, current_time, this._duration, this._anim_id);
			this._anim_id = requestAnimationFrame(this._anim_func);
		};

		if(this._start){
			this.start();
		}
	}

	/**
	 * Repeats the animation loop.
	 */

	repeat(){
		if(this._anim_id){
			this._time_start = 0;
			this._anim_func();
		}
	}

	/**
	 * Starts the animation loop.
	 */

	start(){
		if(!this._anim_id){
			this._anim_id = requestAnimationFrame(this._anim_func);
		}
	}

	/**
	 * Stops the animation loop.
	 */

	stop(){
		if(this._anim_id){
			cancelAnimationFrame(this._anim_id);
			this._anim_id = 0;
		}
	}

};