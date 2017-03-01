/**
 * @class yootil.page.post
 * @static
 * Various methods to help get post information.
 */

yootil.page.post = class {

	/**
	 * This is an internal method
	 *
	 * @param {String} key The key on the page object to check and get
	 * @return {String|Object|Array|Number}
	 * @ignore
	 */

	static __get_data(key){
		let board_obj = yootil.page.__get_data("post");

		if(board_obj && typeof board_obj == "object" && board_obj[key] != "undefined"){
			return board_obj[key];
		}

		return "";
	}

	/**
	 * Gets the user id of who created the post
	 * @return {Number}
	 */

	static created_by(){
		return this.__get_data("created_by");
	}

	/**
	 * Gets the timeastamp when the post was created
	 * @return {Number}
	 */

	static created_on(){
		return parseInt(this.__get_data("created_on"), 10);
	}

	/**
	 * Gets the post id
	 * @return {Number}
	 */

	static id(){
		return parseInt(this.__get_data("id"), 10);
	}

	/**
	 * Checks if the post has been liked
	 * @return {boolean}
	 */

	static liked(){
		return this.__get_data("liked") == 1;
	}

	/**
	 * Gets the thread id
	 * @return {Number}
	 */

	static thread_id(){
		return parseInt(this.__get_data("thread_id"), 10);
	}

	/**
	 * Gets the post URL
	 * @return {String}
	 */

	static url(){
		return this.__get_data("url");
	}

};