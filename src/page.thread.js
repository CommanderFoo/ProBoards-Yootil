/**
 * @class yootil.page.thread
 * @static
 * Various methods to help get thread information.
 */

yootil.page.thread = (function(){

	return {

		/**
		 * This is an internal method
		 *
		 * @param {String} key The key on the page object to check and get
		 * @return [ String}
		 * @ignore
		 */

		__get_data: function(key){
			var thread_obj = yootil.page.__get_data("thread");

			if(thread_obj && typeof thread_obj == "object" && thread_obj[key] != "undefined"){
				return thread_obj[key];
			}

			return "";
		},
		/**
		 * Gets the thread ID
		 * @return {String}
		 */

		id: function(){
			return this.__get_data("id");
		},

		/**
		 * Gets the thread creation date timestamp
		 * @return {String}
		 */

		created_on: function(){
			return this.__get_data("created_on");
		},

		/**
		 * Is the thread an announcement?
		 * @return {Boolean}
		 */

		is_announcement: function(){
			return this.__get_data("is_announcement") == 1;
		},

		/**
		 * Is the thread bookmarked?
		 * @return {Boolean}
		 */

		is_bookmarked: function(){
			return this.__get_data("is_bookmarked") == 1;
		},

		/**
		 * Is the thread falling?
		 * @return {Boolean}
		 */

		is_falling: function(){
			return this.__get_data("is_falling") == 1;
		},

		/**
		 * Is the thread locked?
		 * @return {Boolean}
		 */

		is_locked: function(){
			return this.__get_data("is_locked") == 1;
		},

		/**
		 * Is the thread new?
		 * @return {Boolean}
		 */

		is_new: function(){
			return this.__get_data("is_new") == 1;
		},

		/**
		 * Is the thread a poll?
		 * @return {Boolean}
		 */

		is_poll: function(){
			return this.__get_data("is_poll") == 1;
		},

		/**
		 * Is the thread sticky?
		 * @return {Boolean}
		 */

		is_sticky: function(){
			return this.__get_data("is_sticky") == 1;
		},

		/**
		 * Gets the thread subject
		 * @return {String}
		 */

		subject: function(){
			return this.__get_data("subject");
		},

		/**
		 * Gets the thread URL
		 * @return {String}
		 */

		url: function(){
			return this.__get_data("url");
		},

		/**
		 * Gets the board id
		 * @return {Number}
		 */

		board_id: function(){
			return this.__get_data("board_id");
		},

		/**
		 * Gets the member who created this thread
		 * @return {Number}
		 */

		created_by: function(){
			return this.__get_data("created_by");
		},

		/**
		 * Gets the last post id
		 * @return {Number}
		 */

		last_post_id: function(){
			return this.__get_data("last_post_id");
		},

		/**
		 * Gets the first post id
		 * @return {Number}
		 */

		first_post_id: function(){
			return this.__get_data("first_post_id");
		},

		/**
		 * Gets the last post time
		 * @return {Number}
		 */

		last_post_time: function(){
			return this.__get_data("last_post_time");
		}

	};

})();