/**
 * @class yootil.page.category
 * @static
 * Various methods to help get category information.
 */

yootil.page.category = (function(){

	return {

		/**
		 * This is an internal method.
		 *
		 * @param {String} key The key on the category object to check and get.
		 * @return {String}
		 * @ignore
		 */
		
		__get_data: function(key){
			var cat_obj = yootil.page.__get_data("category");
			
			if(cat_obj && typeof cat_obj == "object" && cat_obj[key] != "undefined"){
				return cat_obj[key];
			}
			
			return "";
		},

		/**
		 * Gets the category ID.
		 * @return {Number}
		 */
		
		id: function(){
			return this.__get_data("id");
		},

		/**
		 * Gets the category name.
		 * @return {String}
		 */
		
		name: function(){
			return this.__get_data("name");
		}
	
	};

})();