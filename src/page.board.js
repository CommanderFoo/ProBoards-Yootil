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
		}
	
	};

})();