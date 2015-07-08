/**
* @class yootil.queue
* @constructor
*
* Handle queuing functions easily.
*
*     var q = new yootil.queue();
*
*     q.add(function(){
*     	console.log("Hello");
*
*     	setTimeout("q.next()", 1000);
*     });
*
*     q.add(function(){
*     	console.log("World");
*     	q.stop(); // Stop the queue
*     });
*
*     // Won't run as queue was stopped
*     q.add(function(){
*     	console.log("!");
*     });
*
* @param {Number} [poll] How often should we poll the queue list (default is 100ms).
*/

yootil.queue = (function(){

	function Queue(poll){
		this.queue = [];
		this.poll = poll || 100;
		this.polling = false;
		this.interval = false;
	}

	Queue.prototype = {

		/**
		 * Add a function to the queue.
		 *
		 * This will also start polling the queue the first time add is called.
		 *
		 * @param {Function} func The function to add to the queue.
		 * @chainable
		 */

		add: function(func){
			this.queue.push(func);
			this.start();

			return this;
		},

		start: function(){
			if(this.queue.length && !this.interval){
				this.interval = setInterval($.proxy(function(){
					if(!this.polling){
						if(this.queue.length){
							this.polling = true;
							this.queue[0]();
						}
					}
				}, this), this.poll);
			}
		},

		/**
		 * Move to the next item in the queue.
		 * @chainable
		 */

		next: function(){
			if(this.queue.length){
				this.queue.shift();
				this.polling = false;
			}

			if(!this.queue.length){
				clearInterval(this.interval);
			}

			return this;
		},

		/**
		 * Pauses the queue.
		 * @chainable
		 */

		pause: function(){
			clearInterval(this.interval);
			this.polling = this.interval = false;

			return this;
		},

		/**
		 * Stop the queue.  This empties the queue.
		 *@chainable
		 */

		stop: function(){
			this.queue = [];
			clearInterval(this.interval);
			this.polling = this.interval = false;

			return this;
		}

	};

	return Queue;

})();