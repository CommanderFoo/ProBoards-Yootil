/**
 * @class yootil.page.member
 * @static
 * Various methods to help get member information.
 */

yootil.page.member = class {

	/**
	 * This is an internal method
	 *
	 * @param {String} key The key on the page object to check and get
	 * @return {String|Object|Array|Number}
	 * @ignore
	 */

	static __get_data(key){
		let member_obj = yootil.page.__get_data("member");

		if(member_obj && typeof member_obj == "object" && member_obj[key] != "undefined"){
			return member_obj[key];
		}

		return "";
	}

	/**
	 * Gets the members ID.
	 * @return {Number}
	 */

	static id(){
		return parseInt(this.__get_data("id"), 10);
	}

	/**
	 * Gets the members name.
	 * @return {String}
	 */

	static name(){
		return this.__get_data("name");
	}

	/**
	 * Gets the members URL.
	 * @return {String}
	 */

	static url(){
		return this.__get_data("url");
	}

	/**
	 * Gets the members display group id.
	 * @return {Number}
	 */

	static display_group_id(){
		return this.__get_data("display_group_id");
	}

	/**
	 * Valid member
	 * @return {Boolean}
	 */

	static exists(){
		return this.id() != 0;
	}

}