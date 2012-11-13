/**
* Namespace: yootil.page.category
*	Various methods to help get category information
*/

yootil.page.category = (function(){

	return {
	
		/**
		* Method: __get_data
		*	This is an internal method
		*
		* Parameters:
		*	key - *string* The key on the category object to check and get
		*
		* Returns:
		*	*string*
		*/
		
		__get_data: function(key){
			var cat_obj = yootil.page.__get_data("category");
			
			if(cat_obj && typeof cat_obj == "object" && cat_obj[key] != "undefined"){
				return cat_obj[key];
			}
			
			return "";
		},

		/**
		* Method: id
		*	Gets the category ID
		*
		* Returns:
		*	*integer*
		*/
		
		id: function(){
			return this.__get_data("id");
		},

		/**
		* Method: name
		*	Gets the category name
		*
		* Returns:
		*	*string*
		*/
		
		name: function(){
			return this.__get_data("name");
		}
	
	};

})();