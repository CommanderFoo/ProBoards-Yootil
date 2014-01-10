/**
* Namespace: yootil.queue
*	Handle queuing functions.
*/

yootil.queue = (function(){

	/**
	* Method: queue
	*	Handle queuing functions.
	*
	* Parameters:
	*	poll *integer* - How often should we poll the queue list (default is 100ms)?
	*
	* Returns:
	*	*object* - Queue is returned
	*
	* Examples:
	*	var q = new yootil.queue();
	*
	*	q.add(function(){setTimeout(function(){console.log(1); q.next(); }, 1000)});
	*
	*	q.add(function(){setTimeout(function(){console.log(2); q.stop(); }, 1000)});
	*
	*	q.add(function(){setTimeout(function(){console.log(3); q.next(); }, 1000)}); // Won't run, as queue was stopped
	*/

	function Queue(poll){
		this.queue = [];
		this.poll = poll || 100;
		this.polling = false;
		this.interval = false;
	}

	Queue.prototype = {

		/**
		* Method: add
		*	Add a function to the queue
		*
		* Parameters:
		*	func - *function* The function to add to the queue
		*
		* Returns:
		*	*object* - Queue is returned to allow chaining
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
		* Method: next
		*	Move to the next item in the queue
		*
		* Returns:
		*	*object* - Queue is returned to allow chaining
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
		* Method: stop
		*	Stop the queue
		*
		* Returns:
		*	*object* - Queue is returned to allow chaining
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