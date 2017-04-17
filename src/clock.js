yootil.clock = class {

	/**
	 * @example
	 * let clock = new yootil.clock();
	 *
	 * clock.start();
	 * clock.stop();
	 *
	 * console.log(clock.elapsed());
	 *
	 * @param {Boolean} [start=false] - If true, then the clock will start right away.
	 * @param {Boolean} [seconds=true] - If true, then elapsed will return seconds.
	 */

	constructor(start = false, seconds = true){
		this._start = this._old = this._elapsed = 0;
		this._running = (start)? true : false;
		this._seconds = seconds;

		if(start){
			this.start();
		}
	}

	/**
	 * Starts the clock.
	 */

	start(){
		this._start = this._old = performance.now();
		this._running = true;
	}

	/**
	 * Stops the clock.
	 */

	stop(){
		this.delta();
		this._running = false;
	}

	/**
	 * Resumes the clock.
	 */

	resume(){
		this._running = true;
	}

	/**
	 * Returns the elapsed time.
	 *
	 * @return {Number}
	 */

	elapsed(){
		this.delta();

		return this._elapsed;
	}

	/**
	 * @ignore
	 */

	delta(){
		let diff = 0;

		if(this._running){
			let new_time = performance.now();

			diff = (new_time - this._old);

			if(this._seconds){
				diff /= 1000;
			};

			this._old = new_time;
			this._elapsed += diff;
		}

		return diff;
	}

};