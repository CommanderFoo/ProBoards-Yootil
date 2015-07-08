/**
 * @class yootil.page.board
 * @static
 * Various methods to help get board information.
 */

yootil.page.board = (function(){

	return {

		/**
		 *	This is an internal method
		 *
		 * @param {String} key The key on the board object to check and get.
		 * @return {Mixed}
		 * @ignore
		 */

		__get_data: function(key){
			var board_obj = yootil.page.__get_data("board");

			if(board_obj && typeof board_obj == "object" && board_obj[key] != "undefined"){
				return board_obj[key];
			}

			return "";
		},
		
		/**
		 * Gets the board ID
		 * @return {Number}
		 */

		id: function(){
			return this.__get_data("id");
		},

		/**
		 * Gets the board name
		 * @return {String}
		 */

		name: function(){
			return this.__get_data("name");
		},

		/**
		 * Gets the board URL
		 * @return {String}
		 */

		url: function(){
			return this.__get_data("url");
		},

		/**
		 * Get the board description
		 * @return {String}
		 */

		description: function(){
			return this.__get_data("description");
		},

		/**
		 * Checks if this board has post counts disabled
		 * @return {Boolean}
		 */

		disable_post_counts: function(){
			return this.__get_data("disable_post_counts") == 1;
		},

		/**
		 * Checks if this board has posting disabled
		 * @return {Boolean}
		 */

		disable_posting: function(){
			return this.__get_data("disable_posting") == 1;
		},

		/**
		 * Get the board name
		 * @return {String}
		 */

		display_name: function(){
			return this.__get_data("display_name");
		},

		/**
		 * Checks if this board is hidden
		 * @return {Boolean}
		 */

		hidden: function(){
			return this.__get_data("hidden") == 1;
		},

		/**
		 * Get the board total posts
		 * @return {Number}
		 */

		posts: function(){
			return this.__get_data("posts");
		},

		/**
		 * Checks if this board has announcements showing
		 * @return {Boolean}
		 */

		show_announcements: function(){
			return this.__get_data("show_announcements") == 1;
		},

		/**
		 * Get the board total threads
		 * @return {Number}
		 */

		threads: function(){
			return this.__get_data("threads");
		}

	};

})();