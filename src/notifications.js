/**
 * @class yootil.notifications
 * @constructor
 * Easily create notifications that show to the user.
 *
 *     var notify = new yootil.notifications("my_key");
 *
 *     notify.show(); // Shows notifications that may be in the queue.
 *
 *     notify.create("hello"); // Creates a new notification.
 *
 * @param {String} key The key to save and load too.
 * @param {String} [template] The template to use for the notifications.
 * @param {String} [klass] Custom class to add to the notifications.
 * @chainable
 */

yootil.notifications = (function(){

	function Notifications(key, template, klass){
		if(!yootil.notifications_queue[key]){
			yootil.notifications_queue[key] = new yootil.queue();
		}

		this.lookup = {};
		this.html_tpl = "";
		this.key = key || null;
		this.plugin = yootil.key.exists(this.key);

		if(this.plugin){
			var all_data = proboards.plugin.keys.data[this.key];

			for(var key in all_data){
				this.lookup[key] = all_data[key] || {};
			}

			this.parse_template(template || null, klass || null);
		}

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
		 * Creates a new notification and saves it to the key.
		 *
		 *     new yootil.notifications("my_key").create("Hello").create("World");
		 *
		 * @param {String} message The message to be saved.  <strong>IMPORTANT:</strong> It's up to you to secure this.
		 * @param {Number} [the_user_id] User id who is getting the message (default is current user).
		 * @param {Mixed} [id] Each message can have an id, this is optional.
		 * @chainable
		 */

		create: function(message, the_user_id, id){
			if(this.plugin){
				var user_id = the_user_id || yootil.user.id();
				var ts = (+ new Date());

				if(!this.lookup[user_id]){
					this.lookup[user_id] = {};
				}

				if(id){
					this.lookup[user_id][ts] = {
						i: id,
						m: message
					};
				} else {
					id = ts;

					this.lookup[user_id][ts] = message;
				}

				this.check_key_data(id, user_id);

				yootil.key.set(this.key, this.lookup[user_id], user_id);
			}

			return this;
		},

		// Lets check there is enough space in the key, if there isn't
		// we start pruning messages regardless if the user has seen
		// them or not.  It's better this way then the key breaking, or
		// the user not getting newer messages.

		check_key_data: function(last_id, user_id){
			var current_length = JSON.stringify(this.lookup[user_id]).length;
			var max_len = (yootil.key.super_forum(this.key))? pb.data("plugin_max_super_forum_key_length") : pb.data("plugin_max_key_length");

			if(current_length > max_len){
				var entries = [];
				for (var key in this.lookup[user_id]){
					entries.push({
						ts: key,
						m: (this.lookup[user_id][key].m) ? this.lookup[user_id][key].m : this.lookup[user_id][key],
						i: (this.lookup[user_id][key].m) ? this.lookup[user_id][key].i : null
					});
				}

				// Sort them by timestamp (key)

				entries = entries.sort(function (a, b){
					return (a.ts > b.ts) ? 1 : 0;
				});

				if(entries.length){

					// Start by just removing the oldest one to hopefully skip loop checking

					if(this.lookup[user_id][entries[0].ts]){
						delete this.lookup[user_id][entries[0].ts];
						entries.shift();
					}

					// Check length again to try and avoid the loop

					if(JSON.stringify(this.lookup[user_id]).length > max_len){

						// Now we need to keep removing entries until we are under the max length

						while(JSON.stringify(this.lookup[user_id]).length > max_len){

							// Don't want an infinite loop, so check entries and bail out of loop

							if(!entries.length){
								break;
							}

							// Delete from top to bottom

							delete this.lookup[user_id][entries[0].ts];
							entries.shift();
						}
					}
				}

				// Finally check length of entries, if it's 0, then clear data

				if(!entries.length){
					this.lookup[user_id] = {};
				}
			}
		},

		/**
		 * Returns the object with all messages for this key.
		 *
		 *     new yootil.notifications("my_key").create("Hello World!").get_all();
		 *
		 * @param {Number} [user_id] The user we are targetting.
		 * @return {Object}
		 */

		get_all: function(user_id){
			return this.lookup[user_id || yootil.user.id()] || {};
		},

		/**
		 * Returns a specific message if an id was set.
		 *
		 *     var n = new yootil.notifications("my_key").get("notify44");
		 *
		 * @param {Mixed} id The id for the message you want to get.
		 * @param {Number} [user_id] The user we are targetting.
		 * @return {Object}
		 */

		get: function(id, user_id){
			var user = user_id || yootil.user.id();

			for(var key in this.lookup[user]){
				if(this.lookup[user] && this.lookup[user][key].i != null && this.lookup[user][key].i == id){
					return this.lookup[user][key];
					break;
				}
			}

			return null;
		},

		/**
		 * Removes all notifications from the key for the user.
		 *
		 *     new yootil.notifications("my_key").remove_all();
		 *
		 * @param {Number} [user_id] The user we are targetting.
		 * @chainable
		 */

		remove_all: function(user_id){
			var user = user_id || yootil.user.id();

			this.lookup[user] = {};

			yootil.key.set(this.key, this.lookup[user], user, true);

			return this;
		},

		/**
		 * Removes a specific notification.
		 *
		 * @param {Mixed} id The id for the notification you want to remove.
		 * @param {Number} [user_id] The user we are targetting.
		 * @chainable
		 */

		remove: function(id, user_id){
			var user = user_id || yootil.user.id();

			for(var key in this.lookup[user]){
				if(this.lookup[user][key].i != null && this.lookup[user][key].i == id){
					delete this.lookup[user][key];
					yootil.key.set(this.key, this.lookup[user], user, true);
					break;
				}
			}

			return this;
		},

		/**
		 * Call this to show notifications.
		 *
		 *     var notify = new yootil.notifications("mykey");
		 *
		 *     notify.show();
		 *
		 * Example using the events and effect options:
		 *
		 *     var notify = new yootil.notifications("mykey");
		 *
		 *     notify.show({
		 *
		 *     	before: function(notification){
		 *     		notification.m = "message has been changed";
		 *
		 *     		return notification;
		 *     	},
		 *
		 *     	// No need to return the notification as we are finished
		 *
		 *     	after: function(notification){
		 *     		console.log(notification);
		 *     	}
		 *
		 *     }, {
		 *
		 *     	show_speed: 2000,
		 *     	show_effect "slideDown",
		 *
		 *     	hide_speed: 4000
		 *
		 *     });
		 *
		 * @param {Object} [events]
		 * @param {Function} [events.before] This is called before the notification is parsed.  The notification
		 * is passed in as the first argument.  It's very important that you return the notification back in this event.
		 * @param {Function} [events.after] This is called after the notification has been viewed.  The notification
		 * is passed in as the first argument.
		 * @param {Object} [effect_options] Pass in options to customise the effect.  Takes jQuery basic effect options.
		 * @param {String} [effect_options.show_effect] Can be "fadeIn", "fadeOut", "slideDown", "slideUp", "show", "hide".
		 * @param {Mixed} [effect_options.show_speed] Can be either "slow", "normal", "fast", or a number.
		 * @param {Number} [effect_options.show_delay] Adds a delay before running the effect.
		 * @param {String} [effect_options.hide_effect] Can be "fadeIn", "fadeOut", "slideDown", "slideUp", "show", "hide".
		 * @param {Mixed} [effect_options.hide_speed] Can be either "slow", "normal", "fast", or a number.
		 * @param {Number} [effect_options.hide_delay] Adds a delay before running the effect.
		 * @chainable
		 */

		show: function(events, effect_options){
			var user = yootil.user.id();

			if(this.plugin && this.lookup[user]){
				var has_notifications = false;
				var options = {

					show_effect: "fadeIn",
					show_speed: "normal",
					show_delay: 0,

					hide_effect: "fadeOut",
					hide_speed: "normal",
					hide_delay: 3500

				};

				if(typeof effect_options == "object"){
					options = $.extend(options, effect_options);
				}

				for(var key in this.lookup[user]){
					has_notifications = true;

					var the_notification = this.lookup[user][key];

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

								if(typeof events.before != "undefined" && typeof events.before == "function"){
									notification = events.before(notification);
								}

								var notify_html = self.html_tpl.replace("{NOTIFICATION_MESSAGE}", notification.m);

								$(notify_html).attr("id", "yootil-notification-" + notification.i).appendTo($("body")).delay(options.show_delay)[options.show_effect](options.show_speed, function(){

									self.add_to_storage(notification.i);
								}).delay(options.hide_delay)[options.hide_effect](options.hide_speed, function(){
									if(typeof events.after != "undefined" && typeof events.after == "function"){
										events.after(notification);
									}

									yootil.notifications_queue[self.key].next();
								});
							},

							this,
							the_notification
						)
					);
				}

				// So we have notifications, but now we need to check storage and
				// see if there are any in there.  If there are, then it means those
				// have been marked as viewed and can be removed from key and storage.

				if(has_notifications){

					// Don't want to do location, form checks, and event binding for nothing,
					// so we make sure there is local data first.

					if(this.has_local_data()){
						var posting = (yootil.location.thread() || yootil.location.editing() || yootil.location.posting());
						var messaging = (yootil.location.conversation_new() || yootil.location.messaging());

						if(posting || messaging){

							// Ok, so we are posting or messaging, we need to work out which forum
							// is available to us so we can bind the event.

							var the_form;

							if(posting){
								the_form = yootil.form.any_posting();
							} else {
								the_form = yootil.form.any_messaging();
							}

							if(the_form.length == 1){
								this.bind_form_submit(the_form);
							}
						}
					}
				}
			}

			return this;
		},

		// Checks the local data object to see if it is empty or not

		has_local_data: function(){
			var local_data = yootil.storage.get(this.key, true, true);

			if(!$.isEmptyObject(local_data)){
				return true;
			}

			return false;
		},

		// Bind event

		bind_form_submit: function(the_form){
			the_form.bind("submit", $.proxy(this.remove_viewed_notifications, this));
		},

		remove_viewed_notifications: function(){
			var data = yootil.key.value(this.key, yootil.user.id()) || {};
			var local_data = yootil.storage.get(this.key, true, true);

			for(var key in local_data){
				if(data[key]){
					delete data[key];
				}

				delete local_data[key];
			}

			// Now update key and local

			yootil.key.set(this.key, data, yootil.user.id());
			yootil.storage.set(this.key, local_data, true, true);
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