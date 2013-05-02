/**
* Namespace: yootil.page.member
*	Various methods to help get member information
*/

yootil.page.member = (function(){

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
			var member_obj = yootil.page.__get_data("member");
			
			if(member_obj && typeof member_obj == "object" && member_obj[key] != "undefined"){
				return member_obj[key];
			}
			
			return "";
		},

		/**
		* Method: id
		*	Gets the members ID
		*
		* Returns:
		*	*integer*
		*/
		
		id: function(){
			return this.__get_data("id");
		},

		/**
		* Method: name
		*	Gets the members name
		*
		* Returns:
		*	*string*
		*/
		
		name: function(){
			return this.__get_data("name");
		},
		
		/**
		* Method: url
		*	Gets the members URL
		*
		* Returns:
		*	*string*
		*/
		
		url: function(){
			return this.__get_data("url");
		}
	
	};

})();