/**
 * @extends {yootil.page}
 * Various methods to help get category information.
 */

yootil.page.category = class {

	/**
	 * This is an internal method.
	 *
	 * @param {String} key The key on the category object to check and get.
	 * @return {String}
	 * @ignore
	 */

	static __get_data(key){
		let cat_obj = yootil.page.__get_data("category");

		if(cat_obj && typeof cat_obj == "object" && cat_obj[key] != "undefined"){
			return cat_obj[key];
		}

		return "";
	}

	/**
	 * Gets the category ID.
	 *
	 * @return {Number}
	 */

	static id(){
		return parseInt(this.__get_data("id"), 10) || null;
	}

	/**
	 * Gets the category name.
	 *
	 * @return {String}
	 */

	static name(){
		return this.__get_data("name");
	}
	
};