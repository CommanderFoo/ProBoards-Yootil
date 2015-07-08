/**
 * @class yootil.page.member
 * @static
 * Various methods to help get member information.
 */

yootil.page.member = (function(){

	return {

		/**
		 * This is an internal method
		 *
		 * @param {String} key The key on the page object to check and get
		 * @return [String}
		 * @ignore
		 */

		__get_data: function(key){
			var member_obj = yootil.page.__get_data("member");

			if(member_obj && typeof member_obj == "object" && member_obj[key] != "undefined"){
				return member_obj[key];
			}

			return "";
		},

		/**
		 * Gets the members ID.
		 * @return {Number}
		 */

		id: function(){
			return this.__get_data("id");
		},

		/**
		 * Gets the members name.
		 * @return {String}
		 */

		name: function(){
			return this.__get_data("name");
		},

		/**
		 * Gets the members URL.
		 * @return {String}
		 */

		url: function(){
			return this.__get_data("url");
		},

		/**
		 * Gets the members display group id.
		 * @return {Number}
		 */

		display_group_id: function(){
			return this.__get_data("display_group_id");
		}

	};

})();