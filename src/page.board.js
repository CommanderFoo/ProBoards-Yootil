/**
* Namespace: yootil.page.board
*	Various methods to help get board information
*/

yootil.page.board = (function(){

	return {

		/**
		* Method: __get_data
		*	This is an internal method
		*
		* Parameters:
		*	key - *string* The key on the board object to check and get
		*
		* Returns:
		*	*string*
		*/

		__get_data: function(key){
			var board_obj = yootil.page.__get_data("board");

			if(board_obj && typeof board_obj == "object" && board_obj[key] != "undefined"){
				return board_obj[key];
			}

			return "";
		},

		/**
		* Method: id
		*	Gets the board ID
		*
		* Returns:
		*	*integer*
		*/

		id: function(){
			return this.__get_data("id");
		},

		/**
		* Method: name
		*	Gets the board name
		*
		* Returns:
		*	*string*
		*/

		name: function(){
			return this.__get_data("name");
		},

		/**
		* Method: url
		*	Gets the board URL
		*
		* Returns:
		*	*string*
		*/

		url: function(){
			return this.__get_data("url");
		},

        /**
        * Method: description
        *   Get the board description
        *
        * Returns:
        *   *string*
        */

		description: function(){
			return this.__get_data("description");
		},

        /**
        * Method: disable_post_counts
        *   Checks if this board has post counts disabled
        *
        * Returns:
        *   *boolean*
        */

		disable_post_counts: function(){
			return this.__get_data("disable_post_counts") === "1";
		},

        /**
        * Method: disable_posting
        *   Checks if this board has posting disabled
        *
        * Returns:
        *   *boolean*
        */

		disable_posting: function(){
			return this.__get_data("disable_posting") === "1";
		},

        /**
        * Method: display_name
        *   Get the board name
        *
        * Returns:
        *   *string*
        */

		display_name: function(){
			return this.__get_data("display_name");
		},

        /**
        * Method: hidden
        *   Checks if this board is hidden
        *
        * Returns:
        *   *boolean*
        */

		hidden: function(){
			return this.__get_data("hidden") === "1";
		},

        /**
        * Method: posts
        *   Get the board total posts
        *
        * Returns:
        *   *integer*
        */

		posts: function(){
			return this.__get_data("posts");
		},

        /**
        * Method: show_announcements
        *   Checks if this board has announcements showing
        *
        * Returns:
        *   *boolean*
        */

		show_announcements: function(){
			return this.__get_data("show_announcements") === "1";
		},

        /**
        * Method: threads
        *   Get the board total threads
        *
        * Returns:
        *   *integer*
        */

		threads: function(){
			return this.__get_data("threads");
		}

	};

})();