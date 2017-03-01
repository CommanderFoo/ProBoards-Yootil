/**
 * @class yootil.queue
 * @constructor
 *
 * Handle queuing functions easily.
 *
 * The queue is passed as a parameter to your queued function, the context is left
 * intact.
 *
 *     let q = new yootil.queue();
 *
 *     q.add(queue => {
 *     	   console.log("Hello");
 *    	   setTimeout(() => queue.next(), 1000);
 *     }).add(queue => {
 *     	   console.log("World");
 *     	   this.stop(); // Stop the queue
 *     }).add(queue => console.log("!")); // Won't run as queue was stopped
 *
 *     q.start(); // Manually start the queue
 *
 * @param {Boolean} [auto_start] If true, the queue will auto start once the first item is added.
 */

yootil.queue = class {

	constructor(auto_start = false){
		this._queue = [];
		this._iterator = null;
		this._started = false;
		this._auto_start = auto_start;
	}

	/**
	 * Add a function to the queue.
	 *
	 * @param {Function} func The function to add to the queue.
	 * @chainable
	 */

	add(func = null){
		if(!func){
			return;
		}

		this._queue.push(func);

		if(!this._iterator){
			this._iterator = this.iterator();
		}

		if(this._auto_start && !this._started){
			this.start();
		}

		return this;
	}

	*iterator(){
		while(!this._stopped && this._queue.length){
			yield this._queue[0](this);
			this._queue.shift();
		}
	}

	/**
	 * Moves to the next item in the iterator.
	 *
	 * @return {Object}
	 */

	next(){
		return this._iterator.next();
	}

	/**
	 * Starts the queue.
	 *
	 * @chainable
	 */

	start(){
		this._started = true;
		this._iterator.next();

		return this;
	}

	/**
	 * Stops the queue.
	 *
	 * @chainable
	 */

	stop(){
		this._queue = [];
		this._stopped = true;
	}

	/**
	 * Pauses the queue.
	 *
	 * @chainable
	 */

	pause(){
		this._stopped = true;

		return this;
	}

	/**
	 * Resumes the queue.
	 *
	 *  let q = new yootil.queue(true).add(queue => {
	 *     console.log("Hello");
	 *     queue.pause();
	 *  }).add(() => console.log(" World!"));
	 *
	 *  $("mybtn").click(q.resume);
	 *
	 * @param {Boolean} [do_next] Will call "next" on the iterator automatically.
	 * @chainable
	 */

	resume(do_next = true){
		this._stopped = false;

		if(do_next){
			this._iterator.next();
		}

		return this;
	}

	/**
	 * Clears the queue.
	 *
	 * @chainable
	 */

	clear(){
		this._queue = [];

		return this;
	}

};
