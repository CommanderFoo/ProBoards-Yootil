/**
 * Namespace: yootil.notifications
 *
 *  This class handles notifications grouped by the key.
 *
 *  Easily create, remove notifications using an existing key.
 *
 *  IMPORTANT:  Encoding of your message is to be done by you.  You need to keep
 *  security in mind, because this plugin will not encode your message to make it safe.
 */

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
		* 	id - *mixed* The id for this message.  If one is not passed, a timestamp is used.
		* 	message - *string* The message to be saved.  IMPORTANT: It's up to you to secure this.
		*
		* Returns:
		* 	*object*
		*
		* Examples:
		*	new yootil.notifications("my_key").create(44, "Hello World!");
		*/

		create: function(id, message){
			if(this.plugin){
				this.data[id || (+ new Date())] = {

					t: (+ new Date()),
					m: message

				};

				yootil.key.set(this.key, this.data, yootil.user.id(), true);
			}

			return this;
		},

		/**
		* Method: get_all
		* 	Returns the object with all messages for this key
		*
		* Returns:
		* 	*object*
		*
		* Examples:
		*	new yootil.notifications("my_key").create(44, "Hello World!").get_all();
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
			if(this.data[id]){
				return this.data[id];
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
			if(this.data[id]) {
				delete this.data[id];
				yootil.key.set(this.key, this.data, yootil.user.id(), true);
			}

			return this;
		},

		show: function(){
			if(this.data){
				for(var id in this.data){
					yootil.notifications_queue[this.key].add(
						$.proxy(
							function(notification, id){
								var self = this;
								var notify_html = self.html_tpl.replace("{NOTIFICATION_MESSAGE}", notification.m);

								$(notify_html).attr("id", "yootil-notification-" + id).appendTo($("body")).delay(200).fadeIn("normal", function(){
									console.log("hi");
								}).delay(3500).fadeOut("normal", function(){
									//$(this).remove();
									yootil.notifications_queue[self.key].next();
								});
							},

							this,
							this.data[id],
							id
						)
					);
				}
			}

			return this;
		}

	};

	return Notifications;

})();