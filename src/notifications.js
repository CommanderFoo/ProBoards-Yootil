/**
 * Namespace: yootil.notifications
 *
 *  This class handles notifications grouped by the key.
 *
 *  Easily create and remove notifications using an existing key.
 *
 *  IMPORTANT:  Encoding of your message is to be done by you.  You need to keep
 *  security in mind, because this plugin will not encode your message to make it safe.
 */

// @TODO: Store viewed notifications in localStorage.
// @TODO: Add hooks to forms so that notifications that have been viewed
// @TODO: can be removed from "data" and localStorage.
// @TODO: Check there is enough space in the key to add another notification.
// @TODO: If there is not enough space, remove older notifications to free space up.

yootil.notifications = (function(){

	/**
	 * Method: Notifications
	 * 	Constructor
	 *
	 * Parameters:
	 * 	key - *string* The key to save and load too.
	 *
	 * Returns:
	 * 	*object*
	 *
	 * Examples:
	 *	new yootil.notifications("my_key");
	 */

	function Notifications(key, template, klass){
		if(!yootil.notifications_queue[key]){
			yootil.notifications_queue[key] = new yootil.queue();
		}

		this.html_tpl = "";
		this.key = key || null;
		this.plugin = proboards.plugin.keys.data[this.key] || null;
		this.data = {};

		if(this.plugin){
			this.data = yootil.key.value(this.key, yootil.user.id(), true) || {};
		}

		this.parse_template(template || null, klass || null);
		return this;
	}

	Notifications.prototype = {

		parse_template: function(template, klass){
			var css_klass = (klass)? " yootil-notifications-" + klass : "";

			this.html_tpl = (template && template.length)? template : "";

			// Default template

			if(!this.html_tpl.length) {
				this.html_tpl += '<div class="yootil-notifications ' + this.key + css_klass + '">';
				this.html_tpl += '<div class="yootil-notifications-image">';
				this.html_tpl += '{NOTIFICATION_IMAGE}';
				this.html_tpl += '</div>';
				this.html_tpl += '<div class="yootil-notifications-message">';
				this.html_tpl += '{NOTIFICATION_MESSAGE}';
				this.html_tpl += '</div>';
				this.html_tpl += '</div>';
			}

			this.html_tpl = this.html_tpl.replace("{PLUGIN_KEY}", this.key + css_klass);
			this.html_tpl = this.html_tpl.replace("{NOTIFICATION_IMAGE}", '<img src="' + yootil.images.notify + '" />');
		},

		/**
		* Method: create
		* 	Creates a new notification and saves it to the key
		*
		* Parameters:
		* 	message - *string* The message to be saved.  IMPORTANT: It's up to you to secure this.
		*	id - *mixed* Each message can have an id, this is optional.
		*
		* Returns:
		* 	*object*
		*
		* Examples:
		*	new yootil.notifications("my_key").create("Hello World!");
		*/

		create: function(message, id){
			if(this.plugin){
				var ts = (+ new Date());

				if(id){
					this.data[ts] = {

						i: id,
						m: message

					};
				} else {
					id = ts;
					this.data[ts] = message;
				}

				// Lets check there is enough space in the key, if there isn't
				// we start pruning messages regardless if the user has seen
				// them or not.  It's better this way then the key breaking, or
				// the user not getting newer messages.
				// We need to try and keep the last message being set though.

				this.check_key_data(id);

				yootil.key.set(this.key, this.data, yootil.user.id(), true);
			}

			return this;
		},

		check_key_data: function(last_id){
			var current_length = JSON.stringify(this.data);
			var entries = [];

			for(var key in this.data){
				entries.push(this.data[key]);
			}

			// Sort them by id
		},

		/**
		* Method: get_all
		* 	Returns the object with all messages for this key
		*
		* Returns:
		* 	*object*
		*
		* Examples:
		*	new yootil.notifications("my_key").create("Hello World!").get_all();
		*/

		get_all: function(){
			return this.data;
		},

		/**
		* Method: get
		* 	Returns a specific message
		*
		* Parameters:
		* 	id - *mixed* The id for the message you want to get.
		*
		* Returns:
		* 	*object*
		*
		* Examples:
		*	new yootil.notifications("my_key").get(44);
		*/

		get: function(id){
			for(var key in this.data){
				if(this.data[key].i != null && this.data[key].i == id){
					return this.data[key];
					break;
				}
			}

			return null;
		},

		/**
		* Method: remove_all
		* 	Removes all notifications from the key
		*
		* Returns:
		* 	*object*
		*
		* Examples:
		*	new yootil.notifications("my_key").remove_all();
		*/

		remove_all: function(){
			this.data = {};
			yootil.key.set(this.key, this.data, yootil.user.id(), true);

			return this;
		},

		/**
		* Method: removes
		* 	Removes a specific message
		*
		* Parameters:
		* 	id - *mixed* The id for the message you want to remove.
		*
		* Returns:
		* 	*object*
		*
		* Examples:
		*	new yootil.notifications("my_key").remove(44);
		*/

		remove: function(id){
			for(var key in this.data){
				if(this.data[key].i != null && this.data[key].i == id){
					delete this.data[key];
					yootil.key.set(this.key, this.data, yootil.user.id(), true);
					break;
				}
			}

			return this;
		},

		show: function(){
			if(this.data){
				for(var key in this.data){
					var the_notification = this.data[key];

					// Need to check if this notification hasn't already been view.
					// Each notification is stored in localStorage when the user has
					// seen it.  We then update the key when the user makes a post, or
					// other actions that stay within the rules of ProBoards when saving to keys.

					// @TODO: Insert call here to check if key is in localStorage

					if(the_notification.i == null){
						the_notification = {

							i: key,
							m: the_notification

						};
					}

					yootil.notifications_queue[this.key].add(
						$.proxy(
							function(notification){
								var self = this;
								var notify_html = self.html_tpl.replace("{NOTIFICATION_MESSAGE}", notification.m);

								$(notify_html).attr("id", "yootil-notification-" + notification.i).appendTo($("body")).delay(200).fadeIn("normal", function(){

									// Notification has been shown, so we need to store this in localStorage.
									// We use the same key in localStorage as we do for the notifications.

									// @TODO: Add call here to store entry in localStorage for this notification

								}).delay(3500).fadeOut("normal", function(){
									yootil.notifications_queue[self.key].next();
								});
							},

							this,
							the_notification
						)
					);
				}
			}

			return this;
		}

	};

	return Notifications;

})();