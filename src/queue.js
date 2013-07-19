/**
* Namespace: yootil.queue
*	Wrapper around Queue object to handle queuing functions.
*/

yootil.queue = (function(){

	/**
	* Method: queue
	*	Wrapper around Queue
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
		
	function Queue(){
		this.queue = [];
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
				}, this), 400);
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