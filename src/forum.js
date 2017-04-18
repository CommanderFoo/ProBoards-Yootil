/**
 * Wrapper around the ProBoards data hash object to get forum info.
 */

yootil.forum = class {

	/**
	 * This is an internal method.
	 *
	 * @param {String} key - The key on the page object to check and get.
	 * @return {String|Object|Number|Array}
	 * @ignore
	 */

	static __get_data(key){
		if(proboards && proboards.dataHash && typeof proboards.dataHash[key] != "undefined"){
			return proboards.dataHash[key];
		}

		return "";
	}

	/**
	 * Checks if the forum is ad free.
	 *
	 * @return {Boolean}
	 */

	static ad_free(){
		return this.__get_data("ad_free") == 1;
	}

	/**
	 * Gets the forum default avatar.
	 *
	 * @return {String}
	 */

	static default_avatar(){
		return this.__get_data("default_avatar");
	}

	/**
	 * Gets the forum ID.
	 *
	 * @return {String} This is stored as a string by ProBoards.
	 */

	static id(){
		return this.__get_data("forum_id");
	}

	/**
	 * Gets the forum login url.
	 *
	 * @return {String}
	 */

	static login_url(){
		return this.__get_data("login_url");
	}

	/**
	 * Checks if the current use is a guest or not.
	 *
	 * @return {Boolean}
	 */

	static guest(){
		return this.__get_data("is_current_user_guest") == 1;
	}

	/**
	 * Gets url for marking boards as read.
	 *
	 * @return {String}
	 */

	static mark_boards_read_url(){
		return this.__get_data("mark_boards_read_url");
	}

	/**
	 * Gets plugin key length for all keys not including super forum key.
	 *
	 * @return {Number}
	 */

	static max_key_length(){
		return this.__get_data("plugin_max_key_length");
	}

	/**
	 * Gets key length for the super forum key.
	 *
	 * @return {Number}
	 */

	static max_super_forum_key_length(){
		return this.__get_data("plugin_max_super_forum_key_length");
	}

	/**
	 * Gets forum register url.
	 *
	 * @return {String}
	 */

	static register_url(){
		return this.__get_data("register_url");
	}

	/**
	 * Gets forums "new" post image.
	 *
	 * @return {String}
	 */

	static new_post_image(){
		return this.__get_data("home_new_post_src");
	}

	/**
	 * Gets forums image path.
	 *
	 * @return {String}
	 */

	static image_path(){
		return this.__get_data("image_path");
	}

	/**
	 * Gets forums locale settings.
	 *
	 * @return {object}
	 */

	static locale_settings(){
		return this.__get_data("locale_settings") || {};
	}

	/**
	 * Is the forum on military time.
	 *
	 * @return {Number}
	 */

	static military_time(){
		return this.__get_data("military_time");
	}

	/**
	 * Max search query length.
	 *
	 * @return {Number}
	 */

	static max_search_query(){
		return this.__get_data("search-query-max");
	}

	/**
	 * Min search query length.
	 *
	 * @return {Number}
	 */

	static min_search_query(){
		return this.__get_data("search-query-min");
	}

	/**
	 * Server date.
	 *
	 * @return {Number}
	 */

	static server_date(){
		return this.__get_data("serverDate");
	}

	/**
	 * Time style
	 *
	 * @return {Number}
	 */

	static time_style(){
		return this.__get_data("time_style");
	}

	/**
	 * Time zone
	 *
	 * @return {Number}
	 */

	static time_zone(){
		return this.__get_data("timezone");
	}

	/**
	 * CSRF Token
	 *
	 * @return {String}
	 */

	static csrf_token(){
		return this.__get_data("csrf_token");
	}

};