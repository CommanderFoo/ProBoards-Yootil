/**
 * Various methods to help get thread information.
 */

yootil.page.thread = class {

	/**
	 * This is an internal method
	 *
	 * @ignore
	 *
	 * @param {String} key - The key on the page object to check and get
	 *
	 * @return {String|Object|Array|Number}
	 */

	static __get_data(key){
		let thread_obj = yootil.page.__get_data("thread");

		if(thread_obj && typeof thread_obj == "object" && thread_obj[key] != "undefined"){
			return thread_obj[key];
		}

		return "";
	}

	/**
	 * Gets the thread ID
	 *
	 * @return {Number}
	 */

	static id(){
		return parseInt(this.__get_data("id"), 10);
	}

	/**
	 * Gets the thread creation date timestamp
	 *
	 * @return {Number}
	 */

	static created_on(){
		return parseInt(this.__get_data("created_on"), 10);
	}

	/**
	 * Is the thread an announcement?
	 *
	 * @return {Boolean}
	 */

	static announcement(){
		return this.__get_data("is_announcement") == 1;
	}

	/**
	 * Is the thread bookmarked?
	 *
	 * @return {Boolean}
	 */

	static bookmarked(){
		return this.__get_data("is_bookmarked") == 1;
	}

	/**
	 * Is the thread falling?
	 *
	 * @return {Boolean}
	 */

	static falling(){
		return this.__get_data("is_falling") == 1;
	}

	/**
	 * Is the thread locked?
	 *
	 * @return {Boolean}
	 */

	static locked(){
		return this.__get_data("is_locked") == 1;
	}

	/**
	 * Is the thread new?
	 *
	 * @return {Boolean}
	 */

	static fresh(){
		return this.__get_data("is_new") == 1;
	}

	/**
	 * Is the thread a poll?
	 *
	 * @return {Boolean}
	 */

	static poll(){
		return this.__get_data("is_poll") == 1;
	}

	/**
	 * Is the thread sticky?
	 *
	 * @return {Boolean}
	 */

	static sticky(){
		return this.__get_data("is_sticky") == 1;
	}

	/**
	 * Gets the thread subject
	 *
	 * @return {String}
	 */

	static subject(){
		return this.__get_data("subject");
	}

	/**
	 * Gets the thread URL
	 *
	 * @return {String}
	 */

	static url(){
		return this.__get_data("url");
	}

	/**
	 * Gets the board id
	 *
	 * @return {Number}
	 */

	static board_id(){
		return parseInt(this.__get_data("board_id"), 10);
	}

	/**
	 * Gets the member who created this thread
	 *
	 * @return {Number}
	 */

	static created_by(){
		return parseInt(this.__get_data("created_by"), 10);
	}

	/**
	 * Gets the last post id
	 *
	 * @return {Number}
	 */

	static last_post_id(){
		return parseInt(this.__get_data("last_post_id"), 10);
	}

	/**
	 * Gets the first post id
	 *
	 * @return {Number}
	 */

	static first_post_id(){
		return parseInt(this.__get_data("first_post_id"), 10);
	}

	/**
	 * Gets the last post time
	 *
	 * @return {Number}
	 */

	static last_post_time(){
		return parseInt(this.__get_data("last_post_time"), 10);
	}

};