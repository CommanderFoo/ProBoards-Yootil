/**
 * @class yootil.user
 * @static
 * Contains useful methods relating to the user currently viewing the page, most being wrappers at the moment.
 */

yootil.user = (function(){

	return {

		/**
		 * @ignore
		 * @property {Object} data Holds a reference to the ProBoards user object.
		 */

		data:  {},

		/**
		 * This checks to see if the ProBoards data object exists and has a user object, we cache it as well.
		 * @return {Boolean}
		 * @ignore
		 */

		has_data: function(){
			if(this.data && typeof this.data.id != "undefined"){
				return true;
			} else {
				if(typeof proboards != "undefined"){
					var data = proboards.data;

					if(typeof data != "undefined" && typeof data == "function"){
						var user_data = proboards.data("user");

						if(typeof user_data != "undefined"){
							this.data = user_data || {};

							return true;
						}
					}
				}
			}

			return false;
		},

		/**
		 * Checks to see if the user is logged in, if so, returns true.
		 *@return {Boolean}
		 */

		logged_in: function(){
			if(this.has_data()){
				if(typeof this.data.is_logged_in != "undefined" && this.data.is_logged_in){
					return true;
				}
			}
			return false;
		},

		/**
		 * Gets the current users ID
		 *@return {Number}
		 */

		id: function(){
			if(this.has_data()){
				if(typeof this.data.id != "undefined"){
					return this.data.id;
				}
			}
			return 0;
		},

		/**
		 * Checks to see if the current user is staff
		 *@return {Boolean}
		 */

		is_staff: function(){
			if(this.has_data()){
				if(typeof this.data.is_staff != "undefined" && this.data.is_staff){
					return true;
				}
			}
			return false;
		},

		/**
		 * Gets the users name
		 *@return {String}
		 */

		name: function(){
			if(this.has_data()){
				if(typeof this.data.name != "undefined"){
					return this.data.name;
				}
			}
			return "";
		},

		/**
		 * Gets the users theme ID
		 *@return {Number}
		 */

		theme: function(){
			if(this.has_data()){
				if(typeof this.data.theme_id != "undefined"){
					return this.data.theme_id;
				}
			}
			return 0;
		},

		/**
		 * Gets the users path URL to their profile
		 *@return {String}
		 */

		url: function(){
			if(this.has_data()){
				if(typeof this.data.url != "undefined"){
					return this.data.url;
				}
			}
			return "";
		},

		/**
		 * Gets the users avatar (HTML)
		 *@return {String}
		 */

		avatar: function(){
			if(this.has_data()){
				if(typeof this.data.avatar != "undefined"){
					return this.data.avatar;
				}
			}
			return "";
		},

		/**
		 * Gets the users birthday object
		 *@return {Object}
		 */

		birthday: function(){
			if(this.has_data()){
				if(typeof this.data.birthday != "undefined"){
					return this.data.birthday;
				}
			}
			return {};
		},

		/**
		 * Gets the users date format (i.e d/m/y)
		 *@return {String}
		 */

		date_format: function(){
			if(this.has_data()){
				if(typeof this.data.date_format != "undefined"){
					return this.data.date_format;
				}
			}
			return "";
		},

		/**
		 * Gets the users friends
		 *@return {Object}
		 */

		friends: function(){
			if(this.has_data()){
				if(typeof this.data.friends != "undefined"){
					return this.data.friends;
				}
			}
			return {};
		},

		/**
		 * Checks to see if user has new messages
		 *@return {Boolean}
		 */

		has_new_messages: function(){
			if(this.has_data()){
				if(typeof this.data.has_new_messages != "undefined"){
					return this.data.has_new_messages;
				}
			}
			return 0;
		},

		/**
		 * Gets users instant messengers
		 *@return {Object}
		 */

		instant_messengers: function(){
			if(this.has_data()){
				if(typeof this.data.instant_messengers != "undefined"){
					return this.data.instant_messengers;
				}
			}
			return {};
		},

		/**
		 * Gets users last online object
		 *@return {Object}
		 */

		last_online: function(){
			if(this.has_data()){
				if(typeof this.data.last_online != "undefined"){
					return this.data.last_online;
				}
			}
			return {};
		},

		/**
		 * Gets users post count
		 *@return {Number}
		 */

		posts: function(){
			if(this.has_data()){
				if(typeof this.data.posts != "undefined"){
					return this.data.posts;
				}
			}
			return 0;
		},

		/**
		 * Gets users rank
		 *@return {Object}
		 */

		rank: function(){
			if(this.has_data()){
				if(typeof this.data.rank != "undefined"){
					return this.data.rank;
				}
			}
			return {};
		},

		/**
		 * Gets users registered on date
		 *@return {Object}
		 */

		registered_on: function(){
			if(this.has_data()){
				if(typeof this.data.registered_on != "undefined"){
					return this.data.registered_on;
				}
			}
			return {};
		},

		/**
		 * Gets users status
		 *@return {String}
		 */

		status: function(){
			if(this.has_data()){
				if(typeof this.data.status != "undefined"){
					return this.data.status;
				}
			}
			return "";
		},

		/**
		 * Gets users time format
		 *@return {String}
		 */

		time_format: function(){
			if(this.has_data()){
				if(typeof this.data.time_format != "undefined"){
					return this.data.time_format;
				}
			}
			return "";
		},

		/**
		 * Gets users username
		 *@return {String}
		 */

		username: function(){
			if(this.has_data()){
				if(typeof this.data.username != "undefined"){
					return this.data.username;
				}
			}
			return "";
		},

		/**
		 * Gets users group ids
		 *@return {Array}
		 */

		group_ids: function(){
			if(this.has_data()){
				if(typeof this.data.group_ids != "undefined"){
					return this.data.group_ids;
				}
			}
			return [];
		},

		/**
		 * Gets users groups
		 *@return {Object}
		 */

		groups: function(){
			if(this.has_data()){
				if(typeof this.data.groups != "undefined"){
					return this.data.groups;
				}
			}
			return {};
		},

		/**
		 * Checks if the member is invisible
		 *@return {Boolean}
		 */

		is_invisible: function(){
			if(this.has_data()){
				if(typeof this.data.is_invisible != "undefined" && this.data.is_invisible){
					return true;
				}
			}
			return false;
		},

		/**
		 * Checks if the member has proboards plus on
		 *@return {Boolean}
		 */

		proboards_plus: function(){
			if(this.has_data()){
				if(typeof this.data.proboards_plus != "undefined" && this.data.proboards_plus){
					return true;
				}
			}
			return false;
		},

		/**
		 * Gets the users block list
		 *@return {Object}
		 */

		block_list: function(){
			if(this.has_data()){
				if(typeof this.data.block_list != "undefined" && this.data.block_list){
					return this.data.block_list;
				}
			}
			return {};
		}
	};

})();