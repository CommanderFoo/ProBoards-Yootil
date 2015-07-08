/**
 * @class yootil.page.post
 * @static
 * Various methods to help get post information.
 */

yootil.page.post = (function(){

	return {

		/**
		 * This is an internal method
		 *
		 * @param {String} key The key on the page object to check and get
		 * @return [String}
		 * @ignore
		 */

		__get_data: function(key){
			var board_obj = yootil.page.__get_data("post");

			if(board_obj && typeof board_obj == "object" && board_obj[key] != "undefined"){
				return board_obj[key];
			}

			return "";
		},

		/**
		 * Gets the user id of who created the post
		 * @return {Number}
		 */

		created_by: function(){
			return this.__get_data("created_by");
		},

		/**
		 * Gets the timeastamp when the post was created
		 * @return {Number}
		 */

		created_on: function(){
			return this.__get_data("created_on");
		},

		/**
		 * Gets the post id
		 * @return {Number}
		 */

		id: function(){
			return this.__get_data("id");
		},

		/**
		 * Checks if the post has been liked
		 * @return {boolean}
		 */

		liked: function(){
			return this.__get_data("liked") == 1;
		},

		/**
		 * Gets the thread id
		 * @return {Number}
		 */

		thread_id: function(){
			return this.__get_data("thread_id");
		},

		/**
		 * Gets the post URL
		 * @return {String}
		 */

		url: function(){
			return this.__get_data("url");
		}

	};

})();