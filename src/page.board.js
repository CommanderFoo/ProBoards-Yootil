/**
 * Various methods to help get board information.
 */

yootil.page.board = class {

	/**
	 *	This is an internal method
	 *
	 * @param {String} key - The key on the board object to check and get.
	 * @return {String|Object|Array|Number}
	 * @ignore
	 */

	static __get_data(key){
		let board_obj = yootil.page.__get_data("board");

		if(board_obj && typeof board_obj == "object" && board_obj[key] != "undefined"){
			return board_obj[key];
		}

		return "";
	}

	/**
	 * Gets the board ID
	 *
	 * @return {Number}
	 */

	static id(){
		return parseInt(this.__get_data("id"), 10) || null;
	}

	/**
	 * Gets the board name
	 *
	 * @return {String}
	 */

	static name(){
		return this.__get_data("name");
	}

	/**
	 * Gets the board URL
	 *
	 * @return {String}
	 */

	static url(){
		return this.__get_data("url");
	}

	/**
	 * Get the board description
	 *
	 * @return {String}
	 */

	static description(){
		return this.__get_data("description");
	}

	/**
	 * Checks if this board has post counts disabled
	 *
	 * @return {Boolean}
	 */

	static disable_post_counts(){
		return this.__get_data("disable_post_counts") == 1;
	}

	/**
	 * Checks if this board has posting disabled
	 *
	 * @return {Boolean}
	 */

	static disable_posting(){
		return this.__get_data("disable_posting") == 1;
	}

	/**
	 * Get the board name
	 *
	 * @return {String}
	 */

	static display_name(){
		return this.__get_data("display_name");
	}

	/**
	 * Checks if this board is hidden
	 *
	 * @return {Boolean}
	 */

	static hidden(){
		return this.__get_data("hidden") == 1;
	}

	/**
	 * Get the board total posts
	 *
	 * @return {Number}
	 */

	static posts(){
		return this.__get_data("posts");
	}

	/**
	 * Checks if this board has announcements showing
	 *
	 * @return {Boolean}
	 */

	static show_announcements(){
		return this.__get_data("show_announcements") == 1;
	}

	/**
	 * Get the board total threads
	 *
	 * @return {Number}
	 */

	static threads(){
		return this.__get_data("threads");
	}

};