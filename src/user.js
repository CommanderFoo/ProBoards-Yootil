/**
 * @class yootil.user
 * @static
 * Contains useful methods relating to the user currently viewing the page, most being wrappers at the moment.
 */

yootil.user = (class {

	static init(){
		this._data = {};
		return this;
	}

	/**
	 * This checks to see if the ProBoards data object exists and has a user object, we cache it as well.
	 * @return {Boolean}
	 * @ignore
	 */

	static has_data(){
		if(this._data && typeof this._data.id != "undefined"){
			return true;
		} else {
			if(typeof proboards != "undefined"){
				let data = proboards.data;

				if(typeof data != "undefined" && typeof data == "function"){
					let user_data = proboards.data("user");

					if(typeof user_data != "undefined"){
						this._data = user_data || {};

						return true;
					}
				}
			}
		}

		return false;
	}

	/**
	 * Checks to see if the user is logged in, if so, returns true.
	 * @return {Boolean}
	 */

	static logged_in(){
		if(this.has_data()){
			if(typeof this._data.is_logged_in != "undefined" && this._data.is_logged_in){
				return true;
			}
		}

		return false;
	}

	/**
	 * Gets the current users ID
	 * @return {Number}
	 */

	static id(){
		if(this.has_data()){
			if(typeof this._data.id != "undefined"){
				return parseInt(this._data.id, 10);
			}
		}

		return null;
	}

	/**
	 * Checks to see if the current user is staff
	 * @return {Boolean}
	 */

	static staff(){
		if(this.has_data()){
			if(typeof this._data.is_staff != "undefined" && this._data.is_staff){
				return true;
			}
		}

		return false;
	}

	/**
	 * Gets the users name
	 * @return {String}
	 */

	static name(){
		if(this.has_data()){
			if(typeof this._data.name != "undefined"){
				return this._data.name;
			}
		}

		return "";
	}

	/**
	 * Gets the users theme ID
	 * @return {Number}
	 */

	static theme(){
		if(this.has_data()){
			if(typeof this._data.theme_id != "undefined"){
				return this._data.theme_id;
			}
		}

		return 0;
	}

	/**
	 * Gets the users path URL to their profile
	 * @return {String}
	 */

	static url(){
		if(this.has_data()){
			if(typeof this._data.url != "undefined"){
				return this._data.url;
			}
		}

		return "";
	}

	/**
	 * Gets the users avatar (HTML)
	 * @return {String}
	 */

	static avatar(){
		if(this.has_data()){
			if(typeof this._data.avatar != "undefined"){
				return this._data.avatar;
			}
		}

		return "";
	}

	/**
	 * Gets the users birthday object
	 * @return {Object}
	 */

	static birthday(){
		if(this.has_data()){
			if(typeof this._data.birthday != "undefined"){
				return this._data.birthday;
			}
		}

		return {};
	}

	/**
	 * Gets the users date format (i.e d/m/y)
	 * @return {String}
	 */

	static date_format(){
		if(this.has_data()){
			if(typeof this._data.date_format != "undefined"){
				return this._data.date_format;
			}
		}

		return "";
	}

	/**
	 * Gets the users post mode.
	 * @return {Object}
	 */

	static post_mode(){
		if(this.has_data()){
			if(typeof this._data.default_post_mode != "undefined"){
				return this._data.default_post_mode;
			}
		}

		return "";
	}

	/**
	 * Gets the users friends
	 * @return {Object}
	 */

	static friends(){
		if(this.has_data()){
			if(typeof this._data.friends != "undefined"){
				return this._data.friends;
			}
		}

		return {};
	}

	/**
	 * Checks to see if user has new messages
	 * @return {Number}
	 */

	static has_new_messages(){
		if(this.has_data()){
			if(typeof this._data.has_new_messages != "undefined"){
				return this._data.has_new_messages;
			}
		}

		return 0;
	}

	/**
	 * Gets users instant messengers
	 * @return {Object}
	 */

	static instant_messengers(){
		if(this.has_data()){
			if(typeof this._data.instant_messengers != "undefined"){
				return this._data.instant_messengers;
			}
		}

		return {};
	}

	/**
	 * Gets users last online object
	 * @return {Object}
	 */

	static last_online(){
		if(this.has_data()){
			if(typeof this._data.last_online != "undefined"){
				return this._data.last_online;
			}
		}

		return {};
	}

	/**
	 * Gets users post count
	 * @return {Number}
	 */

	static posts(){
		if(this.has_data()){
			if(typeof this._data.posts != "undefined"){
				return this._data.posts;
			}
		}

		return 0;
	}

	/**
	 * Gets users rank
	 * @return {Object}
	 */

	static rank(){
		if(this.has_data()){
			if(typeof this._data.rank != "undefined"){
				return this._data.rank;
			}
		}

		return {};
	}

	/**
	 * Gets users registered on date
	 * @return {Object}
	 */

	static registered_on(){
		if(this.has_data()){
			if(typeof this._data.registered_on != "undefined"){
				return this._data.registered_on;
			}
		}

		return {};
	}

	/**
	 * Gets users status
	 * @return {String}
	 */

	static status(){
		if(this.has_data()){
			if(typeof this._data.status != "undefined"){
				return this._data.status;
			}
		}

		return "";
	}

	/**
	 * Gets users time format
	 * @return {String}
	 */

	static time_format(){
		if(this.has_data()){
			if(typeof this._data.time_format != "undefined"){
				return this._data.time_format;
			}
		}

		return "";
	}

	/**
	 * Gets users username
	 * @return {String}
	 */

	static username(){
		if(this.has_data()){
			if(typeof this._data.username != "undefined"){
				return this._data.username;
			}
		}

		return "";
	}

	/**
	 * Gets users group ids
	 * @return {Array}
	 */

	static group_ids(){
		if(this.has_data()){
			if(typeof this._data.group_ids != "undefined"){
				return this._data.group_ids;
			}
		}

		return [];
	}

	/**
	 * Gets users groups
	 * @return {Object}
	 */

	static groups(){
		if(this.has_data()){
			if(typeof this._data.groups != "undefined"){
				return this._data.groups;
			}
		}

		return {};
	}

	/**
	 * Checks if the member is invisible
	 * @return {Boolean}
	 */

	static invisible(){
		if(this.has_data()){
			if(typeof this._data.is_invisible != "undefined" && this._data.is_invisible){
				return true;
			}
		}

		return false;
	}

	/**
	 * Checks if the member has proboards plus on
	 * @return {Boolean}
	 */

	static proboards_plus(){
		if(this.has_data()){
			if(typeof this._data.proboards_plus != "undefined" && this._data.proboards_plus){
				return true;
			}
		}

		return false;
	}

	/**
	 * Gets the users block list
	 * @return {Object}
	 */

	static block_list(){
		if(this.has_data()){
			if(typeof this._data.block_list != "undefined" && this._data.block_list){
				return this._data.block_list;
			}
		}

		return {};
	}

}).init();