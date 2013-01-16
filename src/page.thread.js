/**
* Namespace: yootil.page.thread
*	Various methods to help get thread information
*/

yootil.page.thread = (function(){

	return {
	
		/**
		* Method: __get_data
		*	This is an internal method
		*
		* Parameters:
		*	key - *string* The key on the thread object to check and get
		*
		* Returns:
		*	*string*
		*/
		
		__get_data: function(key){
			var thread_obj = yootil.page.__get_data("thread");
			
			if(thread_obj && typeof thread_obj == "object" && thread_obj[key] != "undefined"){
				return thread_obj[key];
			}
			
			return "";
		},

		/**
		* Method: created_by
		*	Gets the thread creator
		*
		* Returns:
		*	*string*
		*/
		
		id: function(){
			return this.__get_data("created_by");
		},

		/**
		* Method: created_on
		*	Gets the thread creation date timestamp
		*
		* Returns:
		*	*string*
		*/
		
		id: function(){
			return this.__get_data("created_on");
		},

		/**
		* Method: id
		*	Gets the thread ID
		*
		* Returns:
		*	*integer*
		*/
		
		id: function(){
			return this.__get_data("id");
		},

		/**
		* Method: is_announcement
		*	Is the thread an announcement?
		*
		* Returns:
		*	*boolean*
		*/
		
		is_announcement: function(){
			return this.__get_data("is_announcement") === "1";
		},

		/**
		* Method: is_bookmarked
		*	Is the thread bookmarked?
		*
		* Returns:
		*	*boolean*
		*/
		
		is_bookmarked: function(){
			return this.__get_data("is_bookmarked") === "1";
		},

		/**
		* Method: is_falling
		*	Is the thread falling?
		*
		* Returns:
		*	*boolean*
		*/
		
		is_falling: function(){
			return this.__get_data("is_falling") === "1";
		},

		/**
		* Method: is_locked
		*	Is the thread locked?
		*
		* Returns:
		*	*boolean*
		*/
		
		is_locked: function(){
			return this.__get_data("is_locked") === "1";
		},

		/**
		* Method: is_new
		*	Is the thread new?
		*
		* Returns:
		*	*boolean*
		*/
		
		is_new: function(){
			return this.__get_data("is_new") === "1";
		},

		/**
		* Method: is_poll
		*	Is the thread a poll?
		*
		* Returns:
		*	*boolean*
		*/
		
		is_poll: function(){
			return this.__get_data("is_poll") === "1";
		},

		/**
		* Method: is_sticky
		*	Is the thread sticky?
		*
		* Returns:
		*	*boolean*
		*/
		
		is_sticky: function(){
			return this.__get_data("is_sticky") === "1";
		},

		/**
		* Method: subject
		*	Gets the thread subject
		*
		* Returns:
		*	*string*
		*/
		
		subject: function(){
			return this.__get_data("subject");
		},
		
		/**
		* Method: url
		*	Gets the thread URL
		*
		* Returns:
		*	*string*
		*/
		
		url: function(){
			return this.__get_data("url");
		}
	
	};

})();