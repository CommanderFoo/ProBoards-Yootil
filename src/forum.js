/**
 * @class yootil.forum
 * @static
 * Wrapper around the ProBoards data hash object to get forum info.
 */

yootil.forum = (function(){

	return {

		/**
		 * This is an internal method.
		 *
		 * @param {String} key The key on the page object to check and get.
		 * @return {Mixed}
		 * @ignore
		 */

		__get_data: function(key){
			if(proboards && proboards.dataHash && typeof proboards.dataHash[key] != "undefined"){
				return proboards.dataHash[key];
			}

			return "";
		},

		/**
		 * Gets the ad free value.
		 *
		 * @return {Number}
		 */

		ad_free: function(){
			return this.__get_data("ad_free");
		},

		/**
		 * Checks if the forum is ad free.
		 *
		 * @return {Boolean}
		 */

		is_ad_free: function(){
			if(this.ad_free() == 1){
				return true;
			}

			return false;
		},

		/**
		 * Gets the forum default avatar.
		 *
		 * @return {String}
		 */

		default_avatar: function(){
			return this.__get_data("default_avatar");
		},

		/**
		 * Gets the forum ID.
		 *
		 * @return {String} This is stored as a string by ProBoards.
		 */

		id: function(){
			return this.__get_data("forum_id");
		},

		/**
		 * Gets the forum login url.
		 *
		 * @return {String}
		 */

		login_url: function(){
			return this.__get_data("login_url");
		},

		/**
		 * Gets the guest value for the user viewing the forum.
		 *
		 * @return {String}
		 */

		current_user_guest: function(){
			return this.__get_data("is_current_user_guest");
		},

		/**
		 * Checks if the current use is a guest or not.
		 *
		 * @return {Boolean}
		 */

		is_current_user_guest: function(){
			if(this.current_user_guest() == 1){
				return true;
			}

			return false;
		},

		/**
		 * Gets url for marking boards as read.
		 *
		 * @return {String}
		 */

		mark_boards_read_url: function(){
			return this.__get_data("mark_boards_read_url");
		},

		/**
		 * Gets plugin key length for all keys not including super forum key.
		 *
		 * @return {Number}
		 */

		plugin_max_key_length: function(){
			return this.__get_data("plugin_max_key_length");
		},

		/**
		 * Gets key length for the super forum key.
		 *
		 * @return {Number}
		 */

		plugin_max_super_forum_key_length: function(){
			return this.__get_data("plugin_max_super_forum_key_length");
		},

		/**
		 * Gets forum register url.
		 *
		 * @return {String}
		 */

		register_url: function(){
			return this.__get_data("register_url");
		}

	};

})();