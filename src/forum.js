/**
 * Namespace: yootil.forum
 *	Wrapper around the ProBoards data hash object to get forum info
 */

yootil.forum = (function(){

	return {

		/**
		* Method: __get_data
		*	This is an internal method
		*
		* Parameters:
		*	key - *string* The key on the page object to check and get
		*
		* Returns:
		*	*string*
		*/

		__get_data: function(key){
			if(proboards && proboards.dataHash && typeof proboards.dataHash[key] != "undefined"){
				return proboards.dataHash[key];
			}

			return "";
		},

		/**
		* Method: ad_free
		*	Gets the ad free value
		*
		* Returns:
		*	*integer*
		*/

		ad_free: function(){
			return this.__get_data("ad_free");
		},

		/**
		* Method: is_ad_free
		*	Checks if the forum is ad free
		*
		* Returns:
		*	*boolean*
		*/

		is_ad_free: function(){
			if(this.ad_free() == 1){
				return true;
			}

			return false;
		},

		/**
		* Method: default_avatar
		*	Gets the forum default avatar
		*
		* Returns:
		*	*string*
		*/

		default_avatar: function(){
			return this.__get_data("default_avatar");
		},

		/**
		* Method: id
		*	Gets the forum ID
		*
		* Returns:
		*	*string*
		*/

		id: function(){
			return this.__get_data("forum_id");
		},

		/**
		* Method: login_url
		*	Gets the forum login url
		*
		* Returns:
		*	*string*
		*/

		login_url: function(){
			return this.__get_data("login_url");
		},

		/**
		* Method: current_user_guest
		*	Gets the guest value for the user viewing the forum
		*
		* Returns:
		*	*string*
		*/

		current_user_guest: function(){
			return this.__get_data("is_current_user_guest");
		},

		/**
		* Method: is_current_user_guest
		*	Checks if the current use is a guest or not
		*
		* Returns:
		*	*boolean*
		*/

		is_current_user_guest: function(){
			if(this.current_user_guest() == 1){
				return true;
			}

			return false;
		},

		/**
		* Method: mark_boards_read_url
		*	Gets url for marking boards as read
		*
		* Returns:
		*	*string*
		*/

		mark_boards_read_url: function(){
			return this.__get_data("mark_boards_read_url");
		},

		/**
		* Method: plugin_max_key_length
		*	Gets plugin key length for all keys not including super forum key
		*
		* Returns:
		*	*integer*
		*/

		plugin_max_key_length: function(){
			return this.__get_data("plugin_max_key_length");
		},

		/**
		* Method: plugin_max_super_forum_key_length
		*	Gets key length for the super forum key
		*
		* Returns:
		*	*integer*
		*/

		plugin_max_super_forum_key_length: function(){
			return this.__get_data("plugin_max_super_forum_key_length");
		},

		/**
		* Method: register_url
		*	Gets forum register url
		*
		* Returns:
		*	*string*
		*/

		register_url: function(){
			return this.__get_data("register_url");
		}

	};

})();