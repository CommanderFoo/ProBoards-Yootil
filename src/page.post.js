/**
* Namespace: yootil.page.post
*	Various methods to help get post information
*/

yootil.page.post = (function(){

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
			var board_obj = yootil.page.__get_data("post");

			if(board_obj && typeof board_obj == "object" && board_obj[key] != "undefined"){
				return board_obj[key];
			}

			return "";
		},

		/**
		* Method: created_by
		*	Gets the user id of who created the post
		*
		* Returns:
		*	*integer*
		*/

		created_by: function(){
			return this.__get_data("created_by");
		},

		/**
		* Method: created_on
		*	Gets the timeastamp when the post was created
		*
		* Returns:
		*	*integer*
		*/

		created_on: function(){
			return this.__get_data("created_on");
		},

		/**
		* Method: id
		*	Gets the post id
		*
		* Returns:
		*	*integer*
		*/

		id: function(){
			return this.__get_data("id");
		},

		/**
		* Method: liked
		*	Checks if the post has been liked
		*
		* Returns:
		*	*boolean*
		*/

		liked: function(){
			return this.__get_data("liked") === "1";
		},

		/**
		* Method: thread_id
		*	Gets the thread id
		*
		* Returns:
		*	*integer*
		*/

		thread_id: function(){
			return this.__get_data("thread_id");
		},

		/**
		* Method: url
		*	Gets the post URL
		*
		* Returns:
		*	*string*
		*/

		url: function(){
			return this.__get_data("url");
		}

	};

})();