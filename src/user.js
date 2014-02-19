/**
* Namespace: yootil.user
*	Contains useful methods relating to the user currently viewing the page
*/

yootil.user = (function(){

	return {

		/**
		* Property: data
		*	*object* Holds a reference to the ProBoards user object
		*/

		data:  {},

		/**
		* Method: has_data
		*	This checks to see if the ProBoards data object exists and has a user object, we cache it as well.
		*
		* Returns:
		*	*boolean*
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
		* Function: logged_in
		*	Checks to see if the user is logged in, if so, returns true.
		*
		* Returns:
		*	*boolean*
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
		* Function: id
		*	Gets the current users ID
		*
		* Returns:
		*	*integer*
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
		* Function: is_staff
		*	Checks to see if the current user is staff
		*
		* Returns:
		*	*boolean*
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
		* Function: name
		*	Gets the users name
		*
		* Returns:
		*	*string*
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
		* Function: theme
		*	Gets the users theme ID
		*
		* Returns:
		*	*integer*
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
		* Function: url
		*	Gets the users path URL to their profile
		*
		* Returns:
		*	*string*
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
		* Function: avatar
		*	Gets the users avatar (HTML)
		*
		* Returns:
		*	*string*
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
		* Function: birthday
		*	Gets the users birthday object
		*
		* Returns:
		*	*object*
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
		* Function: date_format
		*	Gets the users date format (i.e d/m/y)
		*
		* Returns:
		*	*string*
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
		* Function: friends
		*	Gets the users friends
		*
		* Returns:
		*	*object*
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
		* Function: has_new_messages
		*	Checks to see if user has new messages
		*
		* Returns:
		*	*boolean*
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
		* Function: instant_messengers
		*	Gets users instant messengers
		*
		* Returns:
		*	*object*
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
		* Function: last_online
		*	Gets users last online object
		*
		* Returns:
		*	*object*
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
		* Function: posts
		*	Gets users post count
		*
		* Returns:
		*	*integer*
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
		* Function: rank
		*	Gets users rank
		*
		* Returns:
		*	*object*
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
		* Function: registered_on
		*	Gets users registered on date
		*
		* Returns:
		*	*object*
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
		* Function: status
		*	Gets users status
		*
		* Returns:
		*	*string*
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
		* Function: time_format
		*	Gets users time format
		*
		* Returns:
		*	*string*
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
		* Function: username
		*	Gets users username
		*
		* Returns:
		*	*string*
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
		* Function: group_ids
		*	Gets users group ids
		*
		* Returns:
		*	*array*
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
		* Function: groups
		*	Gets users groups
		*
		* Returns:
		*	*object*
		*/

		groups: function(){
			if(this.has_data()){
				if(typeof this.data.groups != "undefined"){
					return this.data.groups;
				}
			}

			return {};
		}

	};

})();