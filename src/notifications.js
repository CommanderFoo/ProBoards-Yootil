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

// @TODO: Add hooks to forms so that notifications that have been viewed are removed

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
		*	the_user_id - *integer* User id who is getting the message (default is current user).
		*	id - *mixed* Each message can have an id, this is optional.
		*
		* Returns:
		* 	*object*
		*
		* Examples:
		*	new yootil.notifications("my_key").create("Hello World!");
		*/

		create: function(message, the_user_id, id){
			if(this.plugin){
				var user_id = the_user_id || yootil.user.id();
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

				this.check_key_data(id);

				yootil.key.set(this.key, this.data, user_id);
			}

			return this;
		},

		// Lets check there is enough space in the key, if there isn't
		// we start pruning messages regardless if the user has seen
		// them or not.  It's better this way then the key breaking, or
		// the user not getting newer messages.

		check_key_data: function(last_id){
			var current_length = JSON.stringify(this.data).length;
			var max_len = proboards.data("plugin_max_key_length");

			if(current_length > max_len){
				var entries = [];
				for (var key in this.data){
					entries.push({
						ts: key,
						m: (this.data[key].m) ? this.data[key].m : this.data[key],
						i: (this.data[key].m) ? this.data[key].i : null
					});
				}

				// Sort them by timestamp (key)

				entries = entries.sort(function (a, b){
					return (a.ts > b.ts) ? 1 : 0;
				});

				if(entries.length){

					// Start by just removing the oldest one to hopefully skip loop checking

					if(this.data[entries[0].ts]){
						delete this.data[entries[0].ts];
						entries.shift();
					}

					// Check length again to try and avoid the loop

					if(JSON.stringify(this.data).length > max_len){

						// Now we need to keep removing entries until we are under the max length

						while(JSON.stringify(this.data).length > max_len){

							// Don't want an infinite loop, so check entries and bail out of loop

							if(!entries.length){
								break;
							}

							// Delete from top to bottom

							delete this.data[entries[0].ts];
							entries.shift();
						}
					}
				}

				// Finally check length of entries, if it's 0, then clear data

				if(!entries.length){
					this.data = {};
				}
			}
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

					if(the_notification.i == null){
						the_notification = {

							i: key,
							m: the_notification

						};
					}

					// Check if notification is in local storage, if it is, skip the loop

					if(this.is_in_storage(the_notification.i)){
						continue;
					}

					yootil.notifications_queue[this.key].add(
						$.proxy(
							function(notification){
								var self = this;
								var notify_html = self.html_tpl.replace("{NOTIFICATION_MESSAGE}", notification.m);

								$(notify_html).attr("id", "yootil-notification-" + notification.i).appendTo($("body")).delay(200).fadeIn("normal", function(){

									self.add_to_storage(notification.i);
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
		},

		add_to_storage: function(id){
			var local_data = yootil.storage.get(this.key, true, true);

			if(!local_data){
				local_data = {};
			}

			if(!local_data[id]){
				local_data[id] = 1;
			}

			yootil.storage.set(this.key, local_data, true, true);
		},

		remove_from_storage: function(id){
			var local_data = yootil.storage.get(this.key, true, true);

			if(local_data && local_data[id]){
				delete local_data[id];
			}

			yootil.storage.set(this.key, local_data, true, true);
		},

		is_in_storage: function(id){
			var local_data = yootil.storage.get(this.key, true, true);

			if(local_data && local_data[id]){
				return true;
			}

			return false;
		}

	};

	return Notifications;

})();