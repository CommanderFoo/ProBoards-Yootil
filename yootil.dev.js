/**
* Yootil 1.0.0
*
* http://yootil.pixeldepth.net
*/

/**
 * @class yootil
 * @static
 * Yootil is a utility library for ProBoards.  It was designed to help plugin developers develop quicker.
 *
 * The "yootil" namespace encapsulates all of the utilities and classes.
 *
 * <a href="https://github.com/PopThosePringles/ProBoards-Yootil">GitHub Repository</a> |
 * <a href="http://support.proboards.com/index.cgi?action=display&board=plugindatabase&thread=429360">ProBoards Forum Topic</a> |
 * <a href="https://www.proboards.com/library/plugins/item/38">ProBoards Plugin Library Link</a>
 */

yootil = (function(){

	return {

		VERSION: "1.0.0",

		settings: {},

		images: {},

		host: location.hostname,

		notifications_queue: {},

		/**
		 * Makes a string safe for inserting into the DOM.
		 *
		 *     var safe_html = yootil.html_encode("<b>this won't be bold</b>");
		 *
		 * @param {String} str The value you want returned to be safe.
		 * @return {string} The safe value.
		 */

		html_encode: function(str){
			str = (str)? str : "";

			return $("<div />").text(str).html();
		},

		/**
		 * Converts back to HTML
		 *
		 *     var html = yootil.html_decode("<b>this will be bold</b>");
		 *
		 * @param {String} str The string you want returned to be an HTML string.
		 * @return {String} The HTML string.
		 */

		html_decode: function(str){
			str = (str)? str : "";

			return $("<div />").html(str).text();
		},

		/**
		 * Formats numbers so they look pretty (i.e 1,530).
		 *
		 *     yootil.number_format(1000); // 1,000
		 *
		 * @param {String} str The string to format.
		 * @param {String} [delim] The delimiter between each block (i.e 100.000.000, 100,000,000).
		 * @return {String} Formatted string.
		 */

		number_format: function(str, delim){
			str = (str)? str : "";
			delim = (delim)? delim : ",";

			return (str.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + delim) || "0");
		},

		/**
		 * Checks to see if string passed in is a valid JSON string.
		 *
		 *     yootil.is_json("{\"hello\":\"world\"}");
		 *
		 * @param {String} str This is the string that is getting checked for valid JSON.
		 * @param {Boolean} [return_obj] If true, the string will be parsed and returned back.
		 * @return {Mixed}
		 */

		is_json: function(str, return_obj){
			try {
				str = JSON.parse(str);
			} catch(e){
				return false;
			}

			if(return_obj){
				return str;
			}

			return true;
		},

		/**
		 * Pad a string to a certain length with another string on the left or right side of passed in string.
		 *
		 *     yootil.pad(5, 6, "0"); // 000005
		 *
		 * @param {String} str This is the string that is going to be padded.
		 * @param {Number} len The length of the string to be returned, defaults to 6.
		 * @param {String} [pad_str] The string to pad with.
		 * @param {Mixed} [pad_pos] Position of the padding, can be 1 or "RIGHT", for right padding.  Default is left.
		 * @return {String}
		 */

		pad: function(str, len, pad_str, pad_pos){
			var pad_str = (pad_str)? pad_str : "0";
			var len = (len)? len : 6;
			var pad_pos = (pad_pos)? pad_pos : 0;

			while(str.toString().length < len){
				switch(pad_pos.toString().toLowerCase()){

					case "1" :
					case "right" :
						str = str.toString() + pad_str;
						break;

					default :
						str = pad_str + str.toString();

				}
			}

			return str;
		},

		/**
		 * Gets the outerHTML of an element.  It will use outerHTML if supported.
		 *
		 *     var html = yootil.outer_html($("#test"));
		 *
		 * @param {Object} elem The element you want the outer HTML to be returned.
		 * @return {String}
		 */

		outer_html: function(elem){
			if(elem){
				elem = (elem.length)? elem[0] : elem;

				if(elem.outerHTML){
					return elem.outerHTML;
				} else {
					return $("<div />").append($(elem).clone()).html();
				}
			}

			return null;
		},

		/**
		 * Simple method to convert version numbers (format being 0.0.0).
		 *
		 * <strong>Note:</strong>  Doesn't work with versions such as this: 0.9.10, it will appear
		 *	a smaller number compared to 0.9.3.
		 *
		 *     var versions = yootil.convert_versions("0.5.7", "0.8.2"); // [056, 082]
		 *
		 * @param {String} v1 Assumed old version.
		 * @param {String} v2 Assumed new version.
		 * @return {Array}
		 */

		convert_versions: function(v1, v2){
			var versions = [];

			$([v1, v2]).each(function(i, e){
				var n = (e || "").replace(/\./g, "");

				while(n.length < 3){
					n += "0";
				}

				versions.push(n);
			});

			return versions;
		},

		init: function(){
			var plugin = proboards.plugin.get("yootil_library");
			var settings = (plugin && plugin.settings)? plugin.settings : false;

			if(settings){
				this.settings = settings;
			}

			if(plugin.images){
				this.images = plugin.images;
			}

			return this;
		},
		/**
		 * Gets the version currently running.
		 *
		 * @return {String};
		 */

		version: function(){
			return this.VERSION;
		},

		/**
		 * Shorthand version for {@link #timestamp}.
		 *
		 * @return {Number}
		 */

		ts: function(){
			return this.timestamp();
		},

		/**
		 * Creates a timestamp.
		 *
		 * @return {Number}
		 */

		timestamp: function(){
			return (+ new Date());
		}

	};

})().init();

/**
* @class yootil.queue
* @constructor
*
* Handle queuing functions easily.
*
*     var q = new yootil.queue();
*
*     q.add(function(){
*     	console.log("Hello");
*
*     	setTimeout("q.next()", 1000);
*     });
*
*     q.add(function(){
*     	console.log("World");
*     	q.stop(); // Stop the queue
*     });
*
*     // Won't run as queue was stopped
*     q.add(function(){
*     	console.log("!");
*     });
*
* @param {Number} [poll] How often should we poll the queue list (default is 100ms).
*/

yootil.queue = (function(){

	function Queue(poll){
		this.queue = [];
		this.poll = poll || 100;
		this.polling = false;
		this.interval = false;
	}

	Queue.prototype = {

		/**
		 * Add a function to the queue.
		 *
		 * This will also start polling the queue the first time add is called.
		 *
		 * @param {Function} func The function to add to the queue.
		 * @chainable
		 */

		add: function(func){
			this.queue.push(func);
			this.start();

			return this;
		},

		start: function(){
			if(this.queue.length && !this.interval){
				this.interval = setInterval($.proxy(function(){
					if(!this.polling){
						if(this.queue.length){
							this.polling = true;
							this.queue[0]();
						}
					}
				}, this), this.poll);
			}
		},

		/**
		 * Move to the next item in the queue.
		 * @chainable
		 */

		next: function(){
			if(this.queue.length){
				this.queue.shift();
				this.polling = false;
			}

			if(!this.queue.length){
				clearInterval(this.interval);
			}

			return this;
		},

		/**
		 * Pauses the queue.
		 * @chainable
		 */

		pause: function(){
			clearInterval(this.interval);
			this.polling = this.interval = false;

			return this;
		},

		/**
		 * Stop the queue.  This empties the queue.
		 *@chainable
		 */

		stop: function(){
			this.queue = [];
			clearInterval(this.interval);
			this.polling = this.interval = false;

			return this;
		}

	};

	return Queue;

})();

/**
 * @class yootil.key
 * @static
 * Most methods are just wrappers, to see the ProBoards API documentation, <a href="https://www.proboards.com/developer/js/class/key">click here</a>.
 */

yootil.key = (function(){
	
	return {

		/**
		 * @property {Object} pb_key_obj Holds a reference to the ProBoards key object.
		 * @ignore
		 */
		
		pb_key_obj: pb.plugin.key,

		/**
		 * Checks to see if a key exists.
		 *
		 *     if(yootil.key.exists("mykey")){
		 *     	console.log("key exists");
		 *     }
		 *
		 * @param {String} key The key to check.
		 * @return {Boolean}
		 */
		
		exists: function(key){
			if(key){				
				if(this.pb_key_obj){
					if(this.pb_key_obj(key)){
						return true;
					}
				}
			}
		
			return false;
		},

		/**
		 * Returns the ProBoards key object.
		 *
		 *     var the_key = yootil.key.get_key("mykey");
		 *
		 * @param {String} key The key to get.
		 * @return {Mixed} Returns either the key object, or false if it doesn't exist.
		 */
		
		get_key: function(key){
			if(this.exists(key)){
				return this.pb_key_obj(key);
			}
			
			return false;
		},

		/**
		 * Checks to see if a key has a value.
		 *
		 *     if(yootil.key.has_value("mykey")){
		 *     	console.log("Key has a value");
		 *     }
		 *
		 * @param {String} key The key to check.
		 * @param {Number} [user] This is the user id, proboards defaults to current user if not set.
		 * @return {Boolean}
		 */
		
		has_value: function(key, user){
			if(this.exists(key)){
				if(typeof this.pb_key_obj(key).get != "undefined"){
					var val = this.pb_key_obj(key).get(user || undefined);
					
					if(val && val.toString().length){
						return true;
					}
				}
			}
			
			return false;
		},

		/**
		 * Gets the value stored in the key.
		 *
		 *      var value = yootil.key.value("mykey", yootil.user.id());
		 *
		 * @param {String} key The ProBoards key we are getting.
		 * @param {Number} [user] This is the user id, proboards defaults to current user if not set.
		 * @param {Boolean} [is_json] If true, it will parse the JSON string.  ProBoards handles parsing now it seems.
		 * @returns {Mixed} If no value, an empty string is returned.
		 */
		
		value: function(key, user, is_json){
			if(this.exists(key)){
				if(this.has_value(key, user)){
					var value = this.pb_key_obj(key).get(user || undefined);

					if(is_json && yootil.is_json(value)){
						value = JSON.parse(value);
					}
					
					return value;
				}
			}
			
			return "";
		},

		/**
		 * Clears out key value.
		 *
		 *     yootil.key.clear("mykey");
		 *
		 * @param {String} key The key.
		 * @param {Number} [user] This is the user id, proboards defaults to current user if not set.
		 * @return {Boolean} Returns true if successful (relies on what ProBoards .set returns).
		 */
		
		clear: function(key, user){
			return this.set(key, "", user);
		},

		/**
		 * Sets a key value.
		 *
		 * Basic example (will set for current user):
		 *
		 *     yootil.key.set("mykey", "apples");
		 *
		 * Using some callbacks with context:
		 *
		 *     yootil.key.set("mykey", "somevalue", yootil.user.id(), {
		 *
		 *     	error: function(status){
		 *     		console.log(status.message);
		 *     	},
		 *
		 *     	success: function(){
		 *     		this.say("Success!");
		 *     	},
		 *
		 *     	context: {
		 *
		 *     		say: function(msg){
		 *     			console.log(msg);
		 *     		}
		 *
		 *     	}
		 *
		 *     });
		 *
		 * @param {String} key The key.
		 * @param {Mixed} value Can be a string, or a object.  ProBoards now handles stringifying objects.
		 * @param {Number} [user_id] This is the user id, proboards defaults to current user if not set.
		 * @param {Object} [callbacks] Setup callbacks along with a context if needed.
		 * @param {Function} [callbacks.error]
		 * @param {Function} [callbacks.success]
		 * @param {Function} [callbacks.complete]
		 * @param {Object} [callbacks.context]
		 * @param {Number} [type] Passed on set the method type (i.e append, pop etc).
		 * @return {Boolean} Returns true if successful (relies on what ProBoards .set returns).
		 */
		
		set: function(key, value, user_id, callbacks, type){
			if(this.exists(key)){
				var options = {

					object_id: user_id,
					value: value

				};

				if(callbacks && typeof callbacks == "object"){
					if(callbacks.success){
						options.success = (callbacks.context)? $.proxy(callbacks.success, callbacks.context) : callbacks.success;
					}

					if(callbacks.error){
						options.error = (callbacks.context)? $.proxy(callbacks.error, callbacks.context) : callbacks.error;
					}

					if(callbacks.complete){
						options.complete = (callbacks.context)? $.proxy(callbacks.complete, callbacks.context) : callbacks.complete;
					}
				}

				if(type){
					switch(type){

						case "push" :
						case "unshift" :

							if(options.value.constructor == Array && options.value.length > 1){
								options.values = options.value;
								delete options.value;
							}

							break;

						case "pop" :
						case "shift" :

							if(options.value){
								options.num_items = (~~ options.value);
								delete options.value;
							}

							break;
					}

					if(typeof this.pb_key_obj(key)[type] != "undefined"){
						return this.pb_key_obj(key)[type](options);
					}
				} else {
					return this.pb_key_obj(key).set(options);
				}
			}
		},

		/**
		 * Key is set when an event occurs.
		 *
		 *     yootil.key.set_on("mykey", "hello world", yootil.user.id(), "post_new");
		 *
		 * @param {String} key The key.
		 * @param {Mixed} value The value to be stored in the key.  ProBoards handles stringify now.
		 * @param {Number} [user_id] This is the user id, proboards defaults to current user if not set.
		 * @param {String} [event] The event to use.  Currently there are 2 "thread_new" and "post_new".
		 * @return {Boolean} Returns true if successful (relies on what ProBoards .set returns).
		 */

		set_on: function(key, value, user_id, event){
			if(!event){
				return;
			}

			return this.pb_key_obj(key).set_on(event, user_id, value);
		},

		/**
		 * Key is set when a new thread is created.
		 *
		 *     yootil.key.new_thread("mykey", "hello world", yootil.user.id());
		 *
		 * @param {String} key The key.
		 * @param {Mixed} value The value to be stored in the key.  ProBoards handles stringify now.
		 * @param {Number} [user_id] This is the user id, proboards defaults to current user if not set.
		 * @return {Boolean} Returns true if successful (relies on what ProBoards .set returns).
		 */

		new_thread: function(key, value, user_id){
			return this.set_on(key, value, user_id, "thread_new");
		},

		/**
		 * Key is set when a new post is created.
		 *
		 *     yootil.key.new_post("mykey", "hello world", yootil.user.id());
		 *
		 * @param {String} key The key.
		 * @param {Mixed} value The value to be stored in the key.  ProBoards handles stringify now.
		 * @param {Number} [user_id] This is the user id, proboards defaults to current user if not set.
		 * @return {Boolean} Returns true if successful (relies on what ProBoards .set returns).
		 */

		new_post: function(key, value, user_id){
			return this.set_on(key, value, user_id, "post_new");
		},

		/**
		 * Key is set when a new post is created using the quick reply.
		 *
		 *     yootil.key.post_quick_reply("mykey", "hello world", yootil.user.id());
		 *
		 * @param {String} key The key.
		 * @param {Mixed} value The value to be stored in the key.  ProBoards handles stringify now.
		 * @param {Number} [user_id] This is the user id, proboards defaults to current user if not set.
		 * @return {Boolean} Returns true if successful (relies on what ProBoards .set returns).
		 */

		post_quick_reply: function(key, value, user_id){
			return this.set_on(key, value, user_id, "post_quick_reply");
		},

		/**
		 * Concatenates a given value to the end of the existing key value.
		 *
		 *     yootil.key.append("mykey", "hello world", yootil.user.id());
		 *
		 * @param {String} key The key.
		 * @param {Mixed} value Can be a string or a number.
		 * @param {Number} [user_id] This is the user id, proboards defaults to current user if not set.
		 * @param {Object} [callbacks] Setup callbacks along with a context if needed.
		 * @param {Function} [callbacks.error]
		 * @param {Function} [callbacks.success]
		 * @param {Function} [callbacks.complete]
		 * @param {Object} [callbacks.context]
		 * @return {Boolean} Returns true if successful (relies on what ProBoards .set returns).
		 */

		append: function(key, value, user_id, callbacks){
			return this.set(key, value, user_id, callbacks, "append");
		},

		/**
		 * Inserts a given value in front of the existing key value.
		 *
		 *     yootil.key.prepend("mykey", "abc", yootil.user.id());
		 *
		 * @param {String} key The key.
		 * @param {Mixed} value Can be a string or a number.
		 * @param {Number} [user_id] This is the user id, proboards defaults to current user if not set.
		 * @param {Object} [callbacks] Setup callbacks along with a context if needed.
		 * @param {Function} [callbacks.error]
		 * @param {Function} [callbacks.success]
		 * @param {Function} [callbacks.complete]
		 * @param {Object} [callbacks.context]
		 * @return {Boolean} Returns true if successful (relies on what ProBoards .set returns).
		 */

		prepend: function(key, value, user_id, callbacks){
			return this.set(key, value, user_id, callbacks, "prepend");
		},

		/**
		 * If the key is an integer, increases the key's value by one, or you can supply a different amount to increment by.
		 *
		 *     yootil.key.increment("mykey");
		 *
		 * @param {String} key The key.
		 * @param {Number} [value] Increment by this amount.  Default is 1.
		 * @param {Number} [user_id] This is the user id, proboards defaults to current user if not set.
		 * @param {Object} [callbacks] Setup callbacks along with a context if needed.
		 * @param {Function} [callbacks.error]
		 * @param {Function} [callbacks.success]
		 * @param {Function} [callbacks.complete]
		 * @param {Object} [callbacks.context]
		 * @return {Boolean} Returns true if successful (relies on what ProBoards .set returns).
		 */

		increment: function(key, value, user_id, callbacks){
			return this.set(key, value, user_id, callbacks, "increment");
		},

		/**
		 * If the key is an integer, decreases the key's value by one, or you can supply a different amount to decrement by.
		 *
		 *     yootil.key.decrement("mykey");
		 *
		 * @param {String} key The key.
		 * @param {Number} [value] Decrement by this amount.  Default is 1.
		 * @param {Number} [user_id] This is the user id, proboards defaults to current user if not set.
		 * @param {Object} [callbacks] Setup callbacks along with a context if needed.
		 * @param {Function} [callbacks.error]
		 * @param {Function} [callbacks.success]
		 * @param {Function} [callbacks.complete]
		 * @param {Object} [callbacks.context]
		 * @return {Boolean} Returns true if successful (relies on what ProBoards .set returns).
		 */

		decrement: function(key, value, user_id, callbacks){
			return this.set(key, value, user_id, callbacks, "decrement");
		},

		/**
		 * If the key is an array, removes the last number of items specified and returns them back. Default is 1.
		 *
		 *     yootil.key.pop("mykey");
		 *
		 * @param {String} key The key.
		 * @param {Number} [num_items] Number of items to pop from the key.
		 * @param {Number} [user_id] This is the user id, proboards defaults to current user if not set.
		 * @param {Object} [callbacks] Setup callbacks along with a context if needed.
		 * @param {Function} [callbacks.error]
		 * @param {Function} [callbacks.success]
		 * @param {Function} [callbacks.complete]
		 * @param {Object} [callbacks.context]
		 * @return {Array} Always returns an array of items, even if there is only 1.
		 */

		pop: function(key, num_items, user_id, callbacks){
			var items = this.set(key, num_items, user_id, callbacks, "pop");

			if(items && !items.constructor == Array){
				items = [items];
			}

			return items;
		},

		/**
		 * If the key is an array, adds the given value to the end of the array.
		 *
		 *     yootil.key.push("mykey", "apples");
		 *
		 *     yootil.key.push("mykey", ["apples", "pears"], yootil.user.id());
		 *
		 * @param {String} key The key.
		 * @param {Mixed} value The value to be pushed into the key.  This can be an array of values.
		 * @param {Number} [user_id] This is the user id, proboards defaults to current user if not set.
		 * @param {Boolean} [strict] If set to true, it will use inArray instead of ProBoards inArrayLoose.
		 * @param {Object} [callbacks] Setup callbacks along with a context if needed.
		 * @param {Function} [callbacks.error]
		 * @param {Function} [callbacks.success]
		 * @param {Function} [callbacks.complete]
		 * @param {Object} [callbacks.context]
		 * @return {Boolean} Returns true if successful (relies on what ProBoards .set returns).
		 */

		push: function(key, value, user_id, callbacks){
			return this.set(key, value, user_id, callbacks, "push");
		},

		/**
		 * If the key is an array, adds the given value to the end of the array only if they are unique.
		 *
		 *     yootil.key.push_unique("mykey", "apples");
		 *
		 *     yootil.key.push_unique("mykey", ["apples", "pears"], false, yootil.user.id()); // Don't use strict
		 *
		 * @param {String} key The key.
		 * @param {Mixed} value The value to be pushed into the key.  This can be an array of values.
		 * @param {Number} [user_id] This is the user id, proboards defaults to current user if not set.
		 * @param {Boolean} [strict] If set to true, it will use inArray instead of ProBoards inArrayLoose.
		 * @param {Object} [callbacks] Setup callbacks along with a context if needed.
		 * @param {Function} [callbacks.error]
		 * @param {Function} [callbacks.success]
		 * @param {Function} [callbacks.complete]
		 * @param {Object} [callbacks.context]
		 * @return {Boolean} Returns true if successful (relies on what ProBoards .set returns).
		 */

		push_unique: function(key, value, user_id, strict, callbacks){
			var current_value = this.value(key);

			if(current_value && current_value.constructor == Array && value){
				var to_push = [];
				var method = (strict)? $.inArray : $.inArrayLoose;

				if(value.constructor == Array){
					for(var i = 0, l = value.length; i < l; i++){
						if(method(value[i], current_value) == -1){
							to_push.push(value[i]);
						}
					}
				} else {
					if(method(value, current_value) == -1){
						to_push = value;
					}
				}

				if(to_push && to_push.length){
					return this.push(key, to_push, user_id, callbacks);
				}
			}
		},

		/**
		 * If the key is an array, removes the first "num_items" values and returns them.
		 *
		 *     yootil.key.shift("mykey");
		 *
		 *     yootil.key.shift("mykey", 5);
		 *
		 * @param {String} key The key.
		 * @param {Mixed} num_items The number of items to shift from the array.
		 * @param {Number} [user_id] This is the user id, proboards defaults to current user if not set.
		 * @param {Object} [callbacks] Setup callbacks along with a context if needed.
		 * @param {Function} [callbacks.error]
		 * @param {Function} [callbacks.success]
		 * @param {Function} [callbacks.complete]
		 * @param {Object} [callbacks.context]
		 * @return {Array}
		 */

		shift: function(key, num_items, user_id, callbacks){
			var items = this.set(key, num_items, user_id, callbacks, "shift");

			if(items && !items.constructor == Array){
				items = [items];
			}

			return items;
		},

		/**
		 * If the key is an array, adds value to the front of the array.
		 *
		 *     yootil.key.unshift("mykey", "A");
		 *
		 * @param {String} key The key.
		 * @param {Mixed} value The value to be pushed into the key.  This can be an array of values.
		 * @param {Number} [user_id] This is the user id, proboards defaults to current user if not set.
		 * @param {Object} [callbacks] Setup callbacks along with a context if needed.
		 * @param {Function} [callbacks.error]
		 * @param {Function} [callbacks.success]
		 * @param {Function} [callbacks.complete]
		 * @param {Object} [callbacks.context]
		 * @return {Array}
		 */

		unshift: function(key, value, user_id, callbacks){
			return this.set(key, value, user_id, callbacks, "unshift");
		},

		/**
		 * If the key is an array, adds the given value to the front of the array only if they are unique.
		 *
		 *     yootil.key.unshift_unique("mykey", "apples");
		 *
		 *     yootil.key.unshift_unique("mykey", ["apples", "pears"], false, yootil.user.id()); // Don't use strict
		 *
		 * @param {String} key The key.
		 * @param {Mixed} value The value to be pushed into the key.  This can be an array of values.
		 * @param {Number} [user_id] This is the user id, proboards defaults to current user if not set.
		 * @param {Boolean} [strict] If set to true, it will use inArray instead of ProBoards inArrayLoose.
		 * @param {Object} [callbacks] Setup callbacks along with a context if needed.
		 * @param {Function} [callbacks.error]
		 * @param {Function} [callbacks.success]
		 * @param {Function} [callbacks.complete]
		 * @param {Object} [callbacks.context]
		 * @return {Boolean} Returns true if successful (relies on what ProBoards .set returns).
		 */

		unshift_unique: function(key, value, user_id, strict, callbacks){
			var current_value = this.value(key);

			if(current_value && current_value.constructor == Array && value){
				var to_shift = [];
				var method = (strict)? $.inArray : $.inArrayLoose;

				if(value.constructor == Array){
					for(var i = 0, l = value.length; i < l; i++){
						if(method(value[i], current_value) == -1){
							to_shift.push(value[i]);
						}
					}
				} else {
					if(method(value, current_value) == -1){
						to_shift = value;
					}
				}

				if(to_shift && to_shift.length){
					return this.unshift(key, to_shift, user_id, callbacks);
				}
			}
		},

		/**
		 * Checks permission on key to see if the user can write.
		 *
		 * @param {String} key The key.
		 * @param {Number} user This is the user id, proboards defaults to current user if not set.
		 * @return {Boolean}
		 */

		write: function(key, user){
			if(this.exists(key)){
				if(typeof this.pb_key_obj(key).can_write != "undefined"){
					return !!this.pb_key_obj(key).can_write(user);
				} else {

					// ProBoards hasn't exposed it.
					// Just return true so we don't break plugins

					return true;
				}
			}
			
			return false;
		},

		/**
		 *  Checks permission on key to see if the user can read.
		 *
		 * @param {String} key The key.
		 * @param {Number} user This is the user id, proboards defaults to current user if not set.
		 * @return {Boolean}
		 */

		read: function(key, user){
			if(this.exists(key)){
				if(typeof this.pb_key_obj(key).can_read != "undefined"){
					return !!this.pb_key_obj(key).can_read(user);
				} else {

					// ProBoards hasn't exposed it.
					// Just return true so we don't break plugins

					return true;
				}
			}
			
			return false;
		},

		/**
		 * Get they key type.
		 *
		 * @param {String} key The key.
		 * @param {Boolean} [return_str] If true, it will return a string value (i.e "USER").
		 * @return {Mixed}
		 */

		type: function(key, return_str){
			var type = this.pb_key_obj(key).type();

			if(return_str){
				var types = pb.plugin.key_types();

				for(var k in types){
					if(types[k] == type){
						type = k;
						break;
					}
				}
			}

			return type;
		},

		/**
		 * Gets the length of a key.
		 *
		 * @param {String} key The key to be checked.
		 * @return {Number} Returns the length.
		 */

		value_length: function(key){
			if(typeof this.value(key) == "string"){
				return this.value(key).length;
			}

			return JSON.stringify(this.value(key)).length;
		},

		/**
		 * Checks to see if the key is a user type.
		 *
		 * @param {String} key The key to check.
		 * @return {Boolean}
		 */

		user: function(key){
			if(this.type(key) == 1){
				return true;
			}

			return false;
		},

		/**
		 * Checks to see if the key is a super user type.
		 *
		 * @param {String} key The key to check.
		 * @return {Boolean}
		 */

		super_user: function(key){
			if(this.type(key) == 2){
				return true;
			}

			return false;
		},

		/**
		 * Checks to see if the key is a thread type.
		 *
		 * @param {String} key The key to check.
		 * @return {Boolean}
		 */

		thread: function(key){
			if(this.type(key) == 3){
				return true;
			}

			return false;
		},

		/**
		 * Checks to see if the key is a post type.
		 *
		 * @param {String} key The key to check.
		 * @return {Boolean}
		 */

		post: function(key){
			if(this.type(key) == 4){
				return true;
			}

			return false;
		},

		/**
		 * Checks to see if the key is a conversation type.
		 *
		 * @param {String} key The key to check.
		 * @return {Boolean}
		 */

		conversation: function(key){
			if(this.type(key) == 5){
				return true;
			}

			return false;
		},

		/**
		 * Checks to see if the key is a message type.
		 *
		 * @param {String} key The key to check.
		 * @return {Boolean}
		 */

		message: function(key){
			if(this.type(key) == 6){
				return true;
			}

			return false;
		},

		/**
		 * Checks to see if the key is a super_forum type.
		 *
		 * @param {String} key The key to check.
		 * @return {Boolean}
		 */

		super_forum: function(key){
			if(this.type(key) == 7){
				return true;
			}

			return false;
		},

		/**
		 * Checks to see if the key has space.
		 *
		 * @param {String} key The key to check.
		 * @return {Boolean}
		 */

		has_space: function(key){
			var max_length = (this.super_forum(key))? pb.data("plugin_max_super_forum_key_length") : pb.data("plugin_max_key_length");

			if(this.value_length(key) < max_length){
				return true;
			}

			return false;
		},

		/**
		 * Gets the space left in the key.
		 *
		 * @param {String} key The key to check.
		 * @return {Number}
		 */

		space_left: function(key){
			var max_length = (this.super_forum(key))? pb.data("plugin_max_super_forum_key_length") : pb.data("plugin_max_key_length");
			var key_length = this.value_length(key);
			var space_left = max_length - key_length;

			return (space_left < 0)? 0 : space_left;
		}
		
	};
	
})();

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

/**
 * @class yootil.create
 * @static
 * Contains useful methods to creating things quickly (i.e containers).
 */

yootil.create = (function(){

	return {

		/**
		 * Creates ProBoards div containers.
		 *
		 * Very basic example:
		 *
		 *     var container = yootil.create.container("My Title", "My Content");
		 *
		 *     $("#content").prepend(container);
		 *
		 * This example would make titles and content safe:
		 *
		 *     var container = yootil.create.container("My <em>Title</em>", "My <strong>Content</strong>", true);
		 *
		 *     $("#content").prepend(container);
		 *
		 * @param {String} title The container title.
		 * @param {String} content The container content.
		 * @param {Mixed} [safe] True or false, or pass an object to make html safe (i.e {title: false, content: true}).
		 * @param {Boolean} safe.title If true, then yootil will handle making the title safe.
		 * @param {Boolean} safe.content If true, then yootil will handle making the content safe.
		 * @param {Object} [title_styles] Key value par for css styles (i.e {color: "red", padding: "11px"}).
		 * @param {Object} [content_styles] Key value par for css styles (i.e {color: "red", padding: "11px"}).
		 * @param {Object} [container_styles] Key value par for css styles (i.e {color: "red", padding: "11px"}).
		 * @param {Boolean} [no_h2] If set to true, it will not wrap the title with an h2 tag.
		 * @param {Boolean} [jquery_obj] If false, returned content will be an html string.
		 * @return {Mixed} Depends on what jquery_obj is set too, default is jquery object.
		 */
	
		container: function(title, content, safe, title_styles, content_styles, container_styles, no_h2, jquery_obj){
			var html = "";
			var safe_title = safe_content = (typeof safe != "undefined" || safe)? true : false;

			title = (title || "");
			content = (content || "");
			
			if(typeof safe === "object"){
				if(typeof safe.title != "undefined"){
					safe_title = safe.title;
				}
				
				if(typeof safe.content != "undefined"){
					safe_content = safe.content;
				}
			}
			
			container_styles = (container_styles)? container_styles : {};
			title_styles = (title_styles)? title_styles : {};
			content_styles = (content_styles)? content_styles : {};
			
			title = (safe_title)? yootil.html_encode(title) : title;
			title = (typeof no_h2 != "undefined" && !no_h2)? title : ("<h2>" + title + "</h2>");
			
			content = (safe_content)? yootil.html_encode(content) : content;
			
			html += "<div class=\"container\">";
			html += $("<div class=\"title-bar\">" + title + "</div>").css(title_styles).wrap("<span/>").parent().html();
			html += $("<div class=\"content pad-all\">" + content + "</div>").css(content_styles).wrap("<span/>").parent().html();
			html += "</div>";
			
			if(typeof jquery_obj == "undefined" || jquery_obj){
				return $(html).css(container_styles);
			} else {
				return $(html).css(container_styles).wrap("<span/>").parent().html();
			}
		},

		/**
		 * Quickly create a blank page that matches a certain URL.
		 *
		 *     yootil.create.page("shop", "Shop");
		 *
		 * An exanple adding a container to the page as well:
		 *
		 *     yootil.create.page("shop", "Shop").container("The Shop", "Welcome to the Shop").appendTo("#content");
		 *
		 * @param {Mixed} locate This will get matched against the location.href value, can be a string or RegExp object.
		 * @param {String} [document_title] Gets Added onto the current document title.
		 * @param {Boolean} [hide_content] By default the children of #content gets hidden, you can override this.
		 * @chainable
		 */
	
		page: function(locate, document_title, hide_content){
			var reg = (locate.constructor == RegExp)? locate : new RegExp("\/" + locate, "i");
			
			if(locate && location.href.match(reg)){
				if(typeof document_title != "undefined" && document_title.length){
					document.title += " - " + document_title;
				}
				
				if(typeof hide_content == "undefined" || hide_content){
					$("#content[role=main]").children().hide();
				}
			}
			
			return yootil.create;
		},

		/**
		 * Extend the nav tree easily.
		 *
		 *     yootil.create.nav_branch("/shop/", "Shop");
		 *
		 * @param {String} url URL of the branch.
		 * @param {String} text Text of the branch.
		 * @return {Object} Branch jQuery wrapped.
		 */
		
		nav_branch: function(url, text){
			var branch = $("#nav-tree li:last").clone();

			if(branch && branch.length){
				branch.find("a").attr("href", url).find("span").html(text);
				branch.appendTo("#nav-tree");
			}
			
			return branch;
		},

		/**
		 * Create a new tab on the profile
		 *
		 *     yootil.create.profile_tab("Test", "test");
		 *
		 * @param {String} text Text of the branch.
		 * @param {String} page URL of the branch.
		 * @param {Boolean} [active] Active page or not.
		 * @chainable
		 */
		
		profile_tab: function(text, page, active){
			if(yootil.location.profile()){
				var active_class = (active)? " class='ui-active'" : "";
				var ul = $("div.show-user div.ui-tabMenu ul");
				
				if(ul.length){
					ul.append($("<li" + active_class + "><a href='/user/" + yootil.page.member.id() + "/" + page + "'>" + text + "</a></li>"));
				}
			}
			
			return this;
		},

		/**
		 * Creates a profile content box.
		 *
		 *     yootil.create.profile_content_box();
		 *
		 * @param {String} id Enter a ID, or a unique one will be created.
		 * @return {Object} The box is returned wrapped with jQuery.
		 */
		
		profile_content_box: function(id){
			var uid = (id || $.unique_id("yootil-"));
			var box = $("<div />").addClass("content-box center-col").attr("id", uid);
				
			return box;
		},

		/**
		 * Adds a new BBC button to the end on the reply page.
		 *
		 * @param {Object} img The image element to append.
		 * @param {Function} [func] Adds an onlick event.
		 * @chainable
		 */
		
		bbc_button: function(img, func){
			$(".controls").find(".bbcode-editor, .visual-editor").ready(function(){
				var li = $("<li>").addClass("button").append($(img));

				if(func){
					li.click(func);
				}

				$(".controls").find(".bbcode-editor, .visual-editor").find(".group:last ul:last").append(li);
			});
			
			return this;
		},

		/**
		 * Creates a new tab next to the BBCode tab on post / message reply pages.
		 *
		 *     var my_tab = yootil.create.ubbc_tab("myid", "My Title", "My Content");
		 *
		 * An example using the hide and show events:
		 *
		 *     var my_tab2 = yootil.create.ubbc_tab("myid2", "My Title 2", "My Content 2", {
		 *
		 *     	show: function(tab, tab_content){
		 *     		tab.css("background-color", "red");
		 *     	},
		 *
		 *     	hide: function(tab, tab_content){
		 *     		tab.css("background-color", "");
		 *     	}
		 *
		 *     );
		 *
		 * @param {String} tab_title The title for the tab, this can contain HTML.
		 * @param {String} tab_content The content that will be shown when the tab is clicked.  HTML can be used.
		 * @param {String} [id] The id for this tab.  If not specified a random one will be created.
		 * @param {Object} [css] You can apply an object of css values that jQuery will apply, or defaults will be used.
		 * @param {Object} [events] There are 2 events, show and hide.
		 * @param {Function} [events.show] When the tab is clicked, this event will be called.  Tab and content are passed.
		 * @param {Function} [events.hide] When another tab is click, this event will be called.  Tab and content are passed.
		 * @param {Function} [events.context] Set the context of the functions.
		 * @return {Object} The tab content div is returned wrapped with jQuery.
		 */

		ubbc_tab: function(tab_title, content, id, css, events){
			id = id || yootil.ts();
			tab_title = tab_title || id;
			content = content || "";

			var tab = $("<li id='menu-item-" + id + "'><a href='#'>" + tab_title + "</a></li>");
			var wysiwyg_tabs = $("ul.wysiwyg-tabs").append(tab);
			var tab_content = $("<div id='" + id + "'>" + content + "</div>");

			if(typeof css == "undefined"){
				tab_content.css({

					border: "1px solid #E6E6E6",
					padding: "5px"

				});
			} else if(css && typeof css == "object"){
				tab_content.css(css);
			}

			tab_content.hide().insertBefore($("ul.wysiwyg-tabs"));

			wysiwyg_tabs.find("li").click(function(e){
				var active = $(this);

				e.preventDefault();

				active.parent().find("li").removeClass("ui-active");
				active.addClass("ui-active");

				active.parent().find("li").each(function(){
					var id = $(this).attr("id");

					if(id.match(/bbcode|visual/i)){
						$(".ui-wysiwyg .editors").hide();
					} else {
						if(active.attr("id") == id){
							return;
						}

						var selector = "";

						if(id){
							selector = "#" + id.split("menu-item-")[1];
						}

						if($(selector).length){
							if(events && events.hide){
								if(events.context){
									$.proxy(events.hide, events.context, tab, tab_content)();
								} else {
									events.hide(tab, tab_content);
								}
							}

							$(selector).hide();
						}
					}
				});

				var id = active.attr("id");
				var selector = "";

				if(id){
					selector = "#" + id.split("menu-item-")[1];
				}

				if(id.match(/bbcode|visual/i)){
					$(".ui-wysiwyg .editors").show();
				} else if($(selector).length){
					if(events && events.show){
						if(events.context){
							$.proxy(events.show, events.context, tab, tab_content)();
						} else {
							events.show(tab, tab_content);
						}
					}

					$(selector).show();
				}
			});

			return tab_content;
		}
		
	};

})();

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

/**
 * @class yootil.ajax
 * @static
 *	Useful methods for AJAX related stuff, mostly hooking into calls
 */

yootil.ajax = (function(){

	return {

		/**
		 * Adds a global AJAX event to an element.
		 *
		 *     yootil.ajax.bind("complete", $("form:first"), function(){
		 *     	alert("AJAX completed");
		 *     });
		 *
		 *     yootil.ajax.bind("complete", $("form:first"), function(){
		 *     	alert("AJAX completed");
		 *     }, "/plugin/key/set/");
		 *
		 * @param {String} event The ajax event to bind (i.e "complete"), without "ajax" prefix.
		 * @param {Object} e The element to bind the event too.
		 * @param {Function} f This is the callback function that will get called.
		 * @param {Mixed} url The AJAX URL ProBoards calls to match against. If it is a boolean, then it will match all.
		 * @param {Object} [context] The context of the callback function.
		 * @chainable
		 */

		bind: function(event, e, f, url, context){
			var elem = $(e);

			event = "ajax" + event.substr(0, 1).toUpperCase() + event.substr(1);

			if(elem.length == 1){
				context = (context)? context : e;

				if(event && f && e.length){
					elem[event](function(event, XMLHttpRequest, options){
						if(url === true || new RegExp(url, "i").test(options.url)){
							$.proxy(f, context, event, XMLHttpRequest, options, e)();
						}
					});
				}
			}

			return this;
		},

		/**
		 *	Because ProBoards uses AJAX for pagination and on filtering (i.e members page),
		 *	we need to apply our DOM changes after the content on the page has been updated.
		 *
		 * @param {Function} func The function that will be called after search.
		 * @param {Object} [context] Context of func.
		 * @chainable
		 */

		after_search: function(func, context){
			proboards.on("afterSearch", ((context)? $.proxy(func, context) : func));

			return this;
		}

	};

})();

/**
 * @class yootil.storage
 * @static
 * Wrappers for session and persistent storage.
 */

yootil.storage = (function(){
	
	var window_data = {};
	var html5 = false;
	
	if(Modernizr.sessionstorage && Modernizr.localstorage){
		html5 = true;
	} else {
		var window_data_string = window.name || "";
		
		if(window_data_string && !window_data_string.length){
			var obj;
			
			if(obj = yootil.is_json(window_data_string, true)){
				window_data = obj;
			}
		}
	}
	
	return {	
		
		window_data: window_data,
		
		html5: html5,

		/**
		 *  Allows you to set a key and value, along with some other settings.
		 *
		 *     yootil.storage.set("mykey", "myvalue", false, true) // Will be persistent
		 *
		 *     yootil.storage.set("mykey", "myvalue") // Will be for the session
		 *
		 * @param {String} key The key name for the storage.
		 * @param {String} value The value that will be stored.
		 * @param {Boolean}	[json] If true, the value will be turned into a JSON string.
		 * @param {Boolean} [persist] By default the value is stored for the session, pass true to persist it.
		 * @chainable
		 */
		
		set: function(key, value, json, persist){
			if(key && value){
				value = (json)? JSON.stringify(value) : value;
			}
			
			if(persist){
				yootil.storage.persistent.set(key, value);
			} else {
				yootil.storage.session.set(key, value);
			}
			
			return this;
		},

		/**
		 * Gets a value from storage in either session or persistent.
		 *
		 *     yootil.storage.get("mykey") // Will look in session and persistent for key
		 *
		 *     yootil.storage.get("mykey", false, false) // Will look in session only
		 *
		 *     yootil.storage.get("mykey", true, true) // Will look in persistent only
		 *
		 * @param {String} key The key name for the storage.
		 * @param {Boolean} [json] If true, the value will be JSON parsed.
		 * @param {Boolean} [persist] You can specify not to look in persistent by passing false.  Default will look in both.
		 * @return {Mixed}
		 */
		
		get: function(key, json, persist){
			var value = "";
			
			if(key){
				if(persist){
					value = yootil.storage.persistent.get(key);
				} else {
					value = yootil.storage.session.get(key);
				}
				
				// Look in persistent if no 3rd param set
				
				if(typeof persist == "undefined" && !value){
					value = yootil.storage.persistent.get(key);
				}
				
				if(json && yootil.is_json(value)){
					value = JSON.parse(value);
				}
			}
			
			return value;
		},

		/**
		 * Removes a key from storage
		 *
		 *     yootil.storage.remove("mykey") // Will look in session and persistent for key and remove it
		 *
		 *     yootil.storage.remove("mykey", false) // Will look in session only
		 *
		 *     yootil.storage.remove("mykey", true) // Will look in persistent only
		 *
		 * @param {String} key The key name for the storage.
		 * @param {Boolean} [persist] You can specify not to look in persistent by passing false.
		 * @chainable
		 */
		
		remove: function(key, persist){
			if(key){
				if(persist){
					yootil.storage.persistent.remove(key);
				} else {
					yootil.storage.session.remove(key);
				}
				
				// Look in persistent if no 3rd param set
				
				if(typeof persist == "undefined"){
					yootil.storage.persistent.remove(key);
				}
			}
			
			return this;
		}
		
	};

})();

/**
 * @class yootil.storage.persistent
 * @static
 * @ignore
 * Allows you to store a value that is peristent even after browser has closed.
 *
 * IE 7 is supported, and uses userData to handle the storage.
 */

yootil.storage.persistent = (function(){
	
	var storage_element;
	
	if(!yootil.storage.html5){
		storage_element = $("<link />")[0];
		
		if(storage_element && storage_element.addBehavior){
			$(storage_element).css("behavior", "url(#default#userData)");
			$("head").append($(storage_element));
			storage_element.load("yootil");
		}
	}
	
	return {

		/**
		 * Allows you to set a key and value.
		 *
		 *     yootil.storage.persistent.set("mykey", "myvalue");
		 *
		 * @param {String} key The key for the storage.
		 * @param {String} value The value that will be stored.
		 * @chainable
		 */
		
		set: function(key, value){
			if(storage_element){
				storage_element.setAttribute(key, value);
				storage_element.save();
			} else if(yootil.storage.html5){
				localStorage.setItem(key, value);
			}
			
			return this;
		},

		/**
		 * Gets a value from storage in.
		 *
		 * @param {String} key The key for the storage.
		 * @return {String}
		 */
		
		get: function(key){
			var value = "";
			
			if(storage_element){
				value = storage_element.getAttribute(key);
			} else if(yootil.storage.html5 && localStorage.length){
				value = localStorage.getItem(key);
			}
			
			return value;
		},

		/**
		 * Removes a key from storage
		 *
		 * @param {String} key The key for the storage.
		 * @chainable
		 */
				
		remove: function(key){
			if(storage_element){
				storage_element.removeAttribute(key);
			} else if(yootil.storage.html5 && localStorage.length){
				localStorage.removeItem(key);
			}
			
			return this;
		}
		
	};

})();

/**
 * @class yootil.storage.session
 * @static
 * @ignore
 * Allows you to store a value for the session.
 *
 * HTML 5 is used if available, otherwise uses window.name
 */

yootil.storage.session = (function(){
	
	function update_window(){
		if(yootil.storage.window_data){
			window.name = JSON.stringify(yootil.storage.window_data);
		}
	};
	
	return {

		/**
		 * Allows you to set a key and value.
		 *
		 *     yootil.storage.session.set("mykey", "myvalue");
		 *
		 * @param {String} key The key for the storage.
		 * @param {String} value The value that will be stored.
		 * @chainable
		 */
		
		set: function(key, value){
			if(yootil.storage.html5){
				sessionStorage.setItem(key, value);
			} else {
				if(!yootil.storage.window_data[yootil.host]){
					yootil.storage.window_data[yootil.host] = {};
				}
				
				yootil.storage.window_data[yootil.host][key] = value;
				update_window();
			}
			
			return this;
		},

		/**
		 * Gets a value from storage in.
		 *
		 * @param {String} key The key for the storage.
		 * @return {String}
		 */
		
		get: function(key){
			var value = "";
			
			if(yootil.storage.html5 && sessionStorage.length){
				value = sessionStorage.getItem(key);
			} else if(yootil.storage.window_data && yootil.storage.window_data[yootil.host] && yootil.storage.window_data[yootil.host][key]){
				value = yootil.storage.window_data[yootil.host][key];
			}
			
			return value;			
		},

		/**
		 * Removes a key from storage
		 *
		 * @param {String} key The key for the storage.
		 * @chainable
		 */
			
		remove: function(key){
			if(yootil.storage.html5 && sessionStorage.length){
				sessionStorage.removeItem(key);
			} else if(yootil.storage.window_data && yootil.storage.window_data[yootil.host]){
				delete yootil.storage.window_data[yootil.host];
				update_window();
			}
			
			return this;
		}
		
	};		

})();

/**
 * @class yootil.location
 * @alias yootil.location.check
 * @static
 * Used to determine where we are currently.
 *
 * location.check has been deprecated, for now an alias is setup for it.
 */

yootil.location = (function(){

	return {

		cached_route: ((proboards.data && proboards.data("route")) ? proboards.data("route").name : ""),

		// Please keep these sorted alphabetically. Just helps our sanity

		/**
		 * INTERNAL METHOD.  Used to easily see if an id is the current page.
		 *
		 * @param {String} id ID of the page to check route against.
		 * @return {Boolean}
		 * @ignore
		 */

		__is_page: function(id){
			return this.cached_route == id;
		},

		/**
		 * Are we currently viewing the main page of a board? (i.e. thread listing)
		 * @return {Boolean}
		 */

		board: function(){
			return this.__is_page("board") || this.__is_page("list_threads");
		},

		/**
		 * Are we currently viewing the bookmarks listing?
		 * @return {Boolean}
		 */

		bookmarks: function(){
			return this.__is_page("bookmarks");
		},

		/**
		 * Are we currently viewing the main calendar page?
		 * @return {Boolean}
		 */

		calendar: function(){
			// calendar == this month, calendar_month == this or any depending on query string
			return this.__is_page("calendar") || this.__is_page("calendar_month") || this.__is_page("calendar_list");
		},

		/**
		 * Are we viewing a day of calendar events?
		 * @return {Boolean}
		 */

		calendar_day: function(){
			return this.__is_page("calendar_day");
		},

		/**
		 * Are we currently viewing the main forum? (i.e. board listing)
		 *
		 * Use {@link #home}
		 *
		 * @return {Boolean}
		 * @deprecated
		 */

		forum: function(){
			return this.home();
		},

		/**
		 * Are we currently viewing the main forum? (i.e. board listing)
		 * @return {Boolean}
		 */

		home: function(){
			return this.__is_page("home") || this.__is_page("forum");
		},

		/**
		 * Are we currently viewing the members list?
		 * @return {Boolean}
		 */

		members: function(){
			return this.__is_page("members") || this.__is_page("list_members");
		},

		/**
		 * Are we currently viewing the list of messages?
		 * @return {Boolean}
		 */

		message_list: function(){
			return this.__is_page("conversations") || this.__is_page("conversations_inbox") || this.__is_page("list_conversations");
		},

		/**
		 * Are we currently viewing a message?
		 * @return {Boolean}
		 */

		message_thread: function(){
			return this.__is_page("conversation") || this.__is_page("list_messages");
		},

		/**
		 * Are we currently sending a message?
		 * @return {Boolean}
		 */

		messaging: function(){
			return this.message_new() || this.conversation_new() || this.message_quote();
		},

		/**
		 * Are we currently replying to a conversation?
		 * @return {Boolean}
		 */

		message_new: function(){
			return this.__is_page("new_message");
		},

		/**
		 * Are we currently replying to a conversation by quoting?
		 * @return {Boolean}
		 */

		message_quote: function(){
			return this.__is_page("quote_messages");
		},

		/**
		 * Are we currently creating a new conversation?
		 * @return {Boolean}
		 */

		conversation_new: function(){
			return this.__is_page("new_conversation") || this.__is_page("create_conversation") || this.__is_page("conversation_new_user");
		},

		/**
		 * Are we currently creating a new conversation?
		 * @return {Boolean}
		 * @ignore
		 */

		conversation_create: function(){
			return this.__is_page("create_conversation");
		},

		/**
		 * Are we currently creating a new conversation (new_user_conversation)?
		 * @return {Boolean}
		 * @ignore
		 */

		conversation_new_user: function(){
			return this.__is_page("new_user_conversation");
		},

		/**
		 * Are we currently trying to post/create a thread/quote a post?
		 * @return {Boolean}
		 */

		posting: function(){
			return this.posting_quote() || this.posting_reply() || this.posting_thread();
		},

		/**
		 * Are we currently trying to reply with a quote?
		 * @return {Boolean}
		 */

		posting_quote: function(){
			return this.__is_page("quote_posts");
		},

		/**
		 * Are we currently trying to post a reply?
		 * @return {Boolean}
		 */

		posting_reply: function(){
			return this.__is_page("new_post");
		},

		/**
		 * Are we currently trying to create a thread?
		 * @return {Boolean}
		 */

		posting_thread: function(){
			return this.__is_page("new_thread");
		},

		/**
		 * Are we currently trying to edit a post?
		 * @return {Boolean}
		 */

		editing_post: function(){
			return this.__is_page("edit_post");
		},

		/**
		 * Are we currently trying to edit a thread?
		 * @return {Boolean}
		 */

		editing_thread: function(){
			return this.__is_page("edit_thread");
		},

		/**
		 * Are we currently trying to edit a thread or post?
		 * @return {Boolean}
		 */

		editing: function(){
			return this.editing_thread() || this.editing_post();
		},

		/**
		 * Are we viewing a custom page?
		 * @return {Boolean}
		 */

		page: function(){
			return this.__is_page("page");
		},

		/**
		 * Are we viewing the activity profile page?
		 * @return {Boolean}
		 */

		profile_activity: function(){
			return this.__is_page("show_user_activity");
		},

		/**
		 * Are we viewing the following profile page?
		 * @return {Boolean}
		 */

		profile_following: function(){
			return this.__is_page("show_user_following");
		},

		/**
		 * Are we viewing the friends profile page?
		 * @return {Boolean}
		 */

		profile_friends: function(){
			return this.__is_page("show_user_friends");
		},

		/**
		 * Are we viewing the gifts profile page?
		 * @return {Boolean}
		 */

		profile_gift: function(){
			return this.__is_page("show_user_gift");
		},

		/**
		 * Are we viewing the groups profile page?
		 * @return {Boolean}
		 */

		profile_groups: function(){
			return this.__is_page("show_user_groups");
		},

		/**
		 * Are we viewing a main profile page?
		 * @return {Boolean}
		 */

		profile_home: function(){
			return this.__is_page("user");
		},

		/**
		 * Are we editing the admin controls page for the user?
		 * @return {Boolean}
		 */

		profile_edit_admin: function(){
			return this.__is_page("edit_user_admin");
		},

		/**
		 * Are we editing the user's avatar?
		 * @return {Boolean}
		 */

		profile_edit_avatar: function(){
			return this.__is_page("edit_user_avatar");
		},

		/**
		 * Are we editing the user's badges?
		 * @return {Boolean}
		 */

		profile_edit_badges: function(){
			return this.__is_page("edit_user_badges");
		},

		/**
		 * Are we editing the user's notifications?
		 * @return {Boolean}
		 */

		profile_edit_notifications: function(){
			return this.__is_page("edit_user_notifications");
		},

		/**
		 * Are we editing the user's personal settings?
		 * @return {Boolean}
		 */

		profile_edit_personal: function(){
			return this.__is_page("edit_user_personal");
		},

		/**
		 * Are we editing the user's privacy settings?
		 * @return {Boolean}
		 */

		profile_edit_privacy: function(){
			return this.__is_page("edit_user_privacy");
		},

		/**
		 * Are we editing the user's general settings?
		 * @return {Boolean}
		 */

		profile_edit_settings: function(){
			return this.__is_page("edit_user_settings");
		},

		/**
		 * Are we editing the user's social settings?
		 * @return {Boolean}
		 */

		profile_edit_social: function(){
			return this.__is_page("edit_user_social");
		},

		/**
		 * Are we viewing the notifications profile page?
		 * @return {Boolean}
		 */

		profile_notifications: function(){
			return this.__is_page("show_user_notifications") || this.__is_page("show_more_notifications");
		},

		/**
		 * Are we viewing the profile (including any of the profile tabs)
		 * @return {Boolean}
		 */

		profile: function(){
			return (this.profile_activity() || this.profile_following() || this.profile_friends() || this.profile_gift() || this.profile_groups() || this.profile_home() || this.profile_notifications());
		},

		/**
		 * Are we currently viewing the recent posts page?
		 * @return {Boolean}
		 */

		recent_posts: function(){
			return (this.__is_page("all_recent_posts") || this.__is_page("recent_posts"));
		},

		/**
		 * Are we currently viewing the recent threads page?
		 * @return {Boolean}
		 */

		recent_threads: function(){
			return this.__is_page("recent_threads") || this.__is_page("recent_threads_created");
		},

		/**
		 * Are we currently trying to search?
		 * @return {Boolean}
		 */

		search: function(){
			return this.__is_page("search");
		},

		/**
		 * Are we viewing results of a search?
		 * @return {Boolean}
		 */

		search_results: function(){
			return this.__is_page("search_results");
		},

		/**
		 * Are we currently viewing a thread?
		 * @return {Boolean}
		 */

		thread: function(){
			// View thread
			return this.__is_page("thread") || this.__is_page("list_posts");
		}

	};

})();

// Setup an alias for backwards compatibility.

yootil.location.check = yootil.location;

/**
 * @class yootil.form
 * @static
 * Easy access to forms for many of the forms on the forum.
 *
 * Each method will return either the form or an empty array.  This keeps
 * things consistent with how jQuery works when a selector doesn't find anything.
 */

yootil.form = (function(){

	return {

		/**
		* Checks for a form to do with posting on the post page.
		*
		* @return {Array}
		*/
		
		post: function(){
			if(yootil.location.posting_thread()){
				return $("form.form_thread_new");
			}
			
			return $("form.form_post_new");
		},

		/**
		 * Checks for a form to do with edit on the post page.
		 *
		 * @return {Array}
		 */
		
		edit_post: function(){
			if(yootil.location.editing_post()){
				return $("form.form_post_edit");
			}
			
			return [];
		},

		/**
		 * Checks for edit thread form.
		 *
		 * @return {Array}
		 */
		
		edit_thread: function(){
			if(yootil.location.editing_thread()){
				return $("form.form_thread_edit");
			}
			
			return [];
		},

		/**
		 * Checks for any form to do with quick replies, this includes threads and conversations.
		 *
		 * @return {Array}
		 */
				
		quick_reply: function(){
			return $("form.form_post_quick_reply");
		},

		/**
		 * Just for the quick reply on threads.
		 *
		 * @return {Array}
		 */
		
		post_quick_reply: function(){
			if(yootil.location.thread()){
				return this.quick_reply();
			}
			
			return [];
		},

		/**
		 * Just for the quick reply for messages.
		 *
		 * @return {Array}
		 */

		message_quick_reply: function(){
			if(yootil.location.message_thread()){
				return this.quick_reply();
			}

			return [];
		},

		/**
		 * Shoutbox form.
		 *
		 * @return {Array}
		 */
		
		shoutbox: function(){
			return $("form.form_shoutbox_shoutbox");
		},

		/**
		 * There are 2 forms for this, so we check if we are replying, if not
		 * we return the conversation new form.
		 *
		 * @return {Array}
		 */
				
		conversation: function(){
			if(yootil.location.message_new()){
				return this.message();
			}
				
			return this.conversation_new();
		},

		/**
		 * Returns the form used when creating a new conversation.
		 *
		 * @return {Array}
		 */
		
		conversation_new: function(){
			return $("form.form_conversation_new");
		},

		/**
		 * Returns the form used when creating a reply to a conversation
		 *
		 * @return {Array}
		 */
				
		message: function(){
			return $("form.form_message_new");
		},

		/**
		 * Returns the form used for editing profile personal info
		 *
		 * @return {Array}
		 */

		edit_personal: function(){
			return $("form.form_user_edit_personal");
		},

		/**
		 * Returns the form used for editing profile social websites.
		 *
		 * @return {Array}
		 */

		edit_social: function(){
			return $("form.form_user_edit_social");
		},

		/**
		 * Returns the form used for editing profile settings.
		 *
		 * @return {Array}
		 */

		edit_settings: function(){
			return $("form.form_user_edit_settings");
		},

		/**
		 * Returns the form used for editing profile privacy settings.
		 *
		 * @return {Array}
		 */

		edit_privacy: function(){
			return $("form.form_user_edit_privacy");
		},

		/**
		 * Returns the form used for editing profile staff settings.
		 *
		 * @return {Array}
		 */

		edit_staff_options: function(){
			return $("form.form_user_edit_admin");
		},

		/**
		 * Gets any form that is to do with conversations or messaging.
		 *
		 * @return {Array}
		 */

		any_messaging: function(){
			var the_form = [];

			if(this.conversation().length){
				the_form = this.conversation();
			} else if(this.conversation_new().length){
				the_form = this.conversation_new();
			} else if(this.message().length){
				the_form = this.message();
			} else if(this.message_quick_reply().length){
				the_form = this.message_quick_reply();
			}

			return the_form;
		},

		/**
		 * Gets any form to do with posting but not including messages.
		 *
		 * @return {Array}
		 */

		any_posting: function(){
			var the_form = [];

			if(this.post().length){
				the_form = this.post();
			} else if(this.edit_post().length){
				the_form = this.edit_post();
			} else if(this.post_quick_reply().length){
				the_form = this.post_quick_reply();
			} else if(this.edit_thread().length){
				the_form = this.edit_thread();
			}

			return the_form;
		},

		// These are all aliases now and deprecated.

		/**
		 * @inheritdoc #post
		 * @deprecated
		 */

		post_form: function(){
			return this.post();
		},

		/**
		 * @inheritdoc #edit_post
		 * @deprecated
		 */

		edit_post_form: function(){
			return this.edit_post();
		},

		/**
		 * @inheritdoc #edit_thread
		 * @deprecated
		 */

		edit_thread_form: function(){
			return this.edit_thread();
		},

		/**
		 * @inheritdoc #quick_reply
		 * @deprecated
		 */

		quick_reply_form: function(){
			return this.quick_reply();
		},

		/**
		 * @inheritdoc #post_quick_reply
		 * @deprecated
		 */

		post_quick_reply_form: function(){
			return this.post_quick_reply();
		},

		/**
		 * @inheritdoc #shoutbox
		 * @deprecated
		 */

		shoutbox_form: function(){
			return this.shoutbox();
		},

		/**
		 * @inheritdoc #conversation
		 * @deprecated
		 */

		conversation_form: function(){
			return this.conversation();
		},

		/**
		 * @inheritdoc #conversation_new
		 * @deprecated
		 */

		conversation_new_form: function(){
			return this.conversation_new();
		},

		/**
		 * @inheritdoc #message
		 * @deprecated
		 */

		message_form: function(){
			return this.message();
		}

		// End aliases
	
	};

})();

/**
 * @class yootil.page
 * @ignore
 * Wrapper around the ProBoards data object "page".
 */

yootil.page = (function(){

	return {

		/**
		 * This is an internal method
		 *
		 * @param {String} key The key on the page object to check and get
		 * @return [String}
		 */
		
		__get_data: function(key){
			if(proboards && proboards.dataHash && proboards.dataHash.page && typeof proboards.dataHash.page[key] != "undefined"){
				return proboards.dataHash.page[key];
			}
			
			return "";
		}
	
	};

})();

/**
 * @class yootil.page.category
 * @static
 * Various methods to help get category information.
 */

yootil.page.category = (function(){

	return {

		/**
		 * This is an internal method.
		 *
		 * @param {String} key The key on the category object to check and get.
		 * @return {String}
		 * @ignore
		 */
		
		__get_data: function(key){
			var cat_obj = yootil.page.__get_data("category");
			
			if(cat_obj && typeof cat_obj == "object" && cat_obj[key] != "undefined"){
				return cat_obj[key];
			}
			
			return "";
		},

		/**
		 * Gets the category ID.
		 * @return {Number}
		 */
		
		id: function(){
			return this.__get_data("id");
		},

		/**
		 * Gets the category name.
		 * @return {String}
		 */
		
		name: function(){
			return this.__get_data("name");
		}
	
	};

})();

/**
 * @class yootil.page.board
 * @static
 * Various methods to help get board information.
 */

yootil.page.board = (function(){

	return {

		/**
		 *	This is an internal method
		 *
		 * @param {String} key The key on the board object to check and get.
		 * @return {Mixed}
		 * @ignore
		 */

		__get_data: function(key){
			var board_obj = yootil.page.__get_data("board");

			if(board_obj && typeof board_obj == "object" && board_obj[key] != "undefined"){
				return board_obj[key];
			}

			return "";
		},
		
		/**
		 * Gets the board ID
		 * @return {Number}
		 */

		id: function(){
			return this.__get_data("id");
		},

		/**
		 * Gets the board name
		 * @return {String}
		 */

		name: function(){
			return this.__get_data("name");
		},

		/**
		 * Gets the board URL
		 * @return {String}
		 */

		url: function(){
			return this.__get_data("url");
		},

		/**
		 * Get the board description
		 * @return {String}
		 */

		description: function(){
			return this.__get_data("description");
		},

		/**
		 * Checks if this board has post counts disabled
		 * @return {Boolean}
		 */

		disable_post_counts: function(){
			return this.__get_data("disable_post_counts") == 1;
		},

		/**
		 * Checks if this board has posting disabled
		 * @return {Boolean}
		 */

		disable_posting: function(){
			return this.__get_data("disable_posting") == 1;
		},

		/**
		 * Get the board name
		 * @return {String}
		 */

		display_name: function(){
			return this.__get_data("display_name");
		},

		/**
		 * Checks if this board is hidden
		 * @return {Boolean}
		 */

		hidden: function(){
			return this.__get_data("hidden") == 1;
		},

		/**
		 * Get the board total posts
		 * @return {Number}
		 */

		posts: function(){
			return this.__get_data("posts");
		},

		/**
		 * Checks if this board has announcements showing
		 * @return {Boolean}
		 */

		show_announcements: function(){
			return this.__get_data("show_announcements") == 1;
		},

		/**
		 * Get the board total threads
		 * @return {Number}
		 */

		threads: function(){
			return this.__get_data("threads");
		}

	};

})();

/**
 * @class yootil.page.member
 * @static
 * Various methods to help get member information.
 */

yootil.page.member = (function(){

	return {

		/**
		 * This is an internal method
		 *
		 * @param {String} key The key on the page object to check and get
		 * @return [String}
		 * @ignore
		 */

		__get_data: function(key){
			var member_obj = yootil.page.__get_data("member");

			if(member_obj && typeof member_obj == "object" && member_obj[key] != "undefined"){
				return member_obj[key];
			}

			return "";
		},

		/**
		 * Gets the members ID.
		 * @return {Number}
		 */

		id: function(){
			return this.__get_data("id");
		},

		/**
		 * Gets the members name.
		 * @return {String}
		 */

		name: function(){
			return this.__get_data("name");
		},

		/**
		 * Gets the members URL.
		 * @return {String}
		 */

		url: function(){
			return this.__get_data("url");
		},

		/**
		 * Gets the members display group id.
		 * @return {Number}
		 */

		display_group_id: function(){
			return this.__get_data("display_group_id");
		}

	};

})();

/**
 * @class yootil.page.thread
 * @static
 * Various methods to help get thread information.
 */

yootil.page.thread = (function(){

	return {

		/**
		 * This is an internal method
		 *
		 * @param {String} key The key on the page object to check and get
		 * @return [ String}
		 * @ignore
		 */

		__get_data: function(key){
			var thread_obj = yootil.page.__get_data("thread");

			if(thread_obj && typeof thread_obj == "object" && thread_obj[key] != "undefined"){
				return thread_obj[key];
			}

			return "";
		},
		/**
		 * Gets the thread ID
		 * @return {String}
		 */

		id: function(){
			return this.__get_data("id");
		},

		/**
		 * Gets the thread creation date timestamp
		 * @return {String}
		 */

		created_on: function(){
			return this.__get_data("created_on");
		},

		/**
		 * Is the thread an announcement?
		 * @return {Boolean}
		 */

		is_announcement: function(){
			return this.__get_data("is_announcement") == 1;
		},

		/**
		 * Is the thread bookmarked?
		 * @return {Boolean}
		 */

		is_bookmarked: function(){
			return this.__get_data("is_bookmarked") == 1;
		},

		/**
		 * Is the thread falling?
		 * @return {Boolean}
		 */

		is_falling: function(){
			return this.__get_data("is_falling") == 1;
		},

		/**
		 * Is the thread locked?
		 * @return {Boolean}
		 */

		is_locked: function(){
			return this.__get_data("is_locked") == 1;
		},

		/**
		 * Is the thread new?
		 * @return {Boolean}
		 */

		is_new: function(){
			return this.__get_data("is_new") == 1;
		},

		/**
		 * Is the thread a poll?
		 * @return {Boolean}
		 */

		is_poll: function(){
			return this.__get_data("is_poll") == 1;
		},

		/**
		 * Is the thread sticky?
		 * @return {Boolean}
		 */

		is_sticky: function(){
			return this.__get_data("is_sticky") == 1;
		},

		/**
		 * Gets the thread subject
		 * @return {String}
		 */

		subject: function(){
			return this.__get_data("subject");
		},

		/**
		 * Gets the thread URL
		 * @return {String}
		 */

		url: function(){
			return this.__get_data("url");
		},

		/**
		 * Gets the board id
		 * @return {Number}
		 */

		board_id: function(){
			return this.__get_data("board_id");
		},

		/**
		 * Gets the member who created this thread
		 * @return {Number}
		 */

		created_by: function(){
			return this.__get_data("created_by");
		},

		/**
		 * Gets the last post id
		 * @return {Number}
		 */

		last_post_id: function(){
			return this.__get_data("last_post_id");
		},

		/**
		 * Gets the first post id
		 * @return {Number}
		 */

		first_post_id: function(){
			return this.__get_data("first_post_id");
		},

		/**
		 * Gets the last post time
		 * @return {Number}
		 */

		last_post_time: function(){
			return this.__get_data("last_post_time");
		}

	};

})();

/**
 * @class yootil.page.post
 * @static
 * Various methods to help get post information.
 */

yootil.page.post = (function(){

	return {

		/**
		 * This is an internal method
		 *
		 * @param {String} key The key on the page object to check and get
		 * @return [String}
		 * @ignore
		 */

		__get_data: function(key){
			var board_obj = yootil.page.__get_data("post");

			if(board_obj && typeof board_obj == "object" && board_obj[key] != "undefined"){
				return board_obj[key];
			}

			return "";
		},

		/**
		 * Gets the user id of who created the post
		 * @return {Number}
		 */

		created_by: function(){
			return this.__get_data("created_by");
		},

		/**
		 * Gets the timeastamp when the post was created
		 * @return {Number}
		 */

		created_on: function(){
			return this.__get_data("created_on");
		},

		/**
		 * Gets the post id
		 * @return {Number}
		 */

		id: function(){
			return this.__get_data("id");
		},

		/**
		 * Checks if the post has been liked
		 * @return {boolean}
		 */

		liked: function(){
			return this.__get_data("liked") == 1;
		},

		/**
		 * Gets the thread id
		 * @return {Number}
		 */

		thread_id: function(){
			return this.__get_data("thread_id");
		},

		/**
		 * Gets the post URL
		 * @return {String}
		 */

		url: function(){
			return this.__get_data("url");
		}

	};

})();

/**
 * @class yootil.element
 * @ignore
 */

yootil.element = {};

/**
 * @class yootil.element.get
 * @alias yootil.get
 * @static
 * Quick methods to get certain elements.
 */

yootil.element.get = yootil.get = (function(){

	return {

		/**
		 * Gets mini profiles.
		 *
		 *     yootil.element.get.mini_profiles(); // Gets all mini profiles
		 *
		 *     yootil.element.get.mini_profiles(1); // Gets all mini profiles for user id 1
		 *
		 * @param {Number} [user_id] If specified, it will match mini profiles for that user id.
		 * @return {Array} Matched mini profiles are returned back.
		 */

		mini_profiles: function(user_id){
			var selector = (~~ user_id)? ":has(a.user-link.user-" + (~~ user_id) + ")" : "";

			return $(".mini-profile" + selector);
		},

		/**
		 * Gets mini profile avatars.
		 *
		 *     yootil.element.get.mini_profile_avatars(); // Gets all avatars
		 *
		 *     yootil.element.get.mini_profile_avatars(1); // Gets all avatars for user id 1
		 *
		 * @param {Number} [user_id] If specified, it will match avatars for that user id.
		 * @return {Array} Matched avatars are returned back.
		 */

		mini_profile_avatars: function(user_id){
			var selector = (~~ user_id)? ":has(a.user-link.user-" + (~~ user_id) + ")" : "";

			return $(".mini-profile .avatar" + selector);;
		},

		/**
		 * Gets mini profile user links.
		 *
		 *     yootil.element.get.mini_profile_user_links(1); // Gets all user links for user id 1
		 *
		 *     yootil.element.get.mini_profile_user_links(); // Gets all user links
		 *
		 * @param {Number} [user_id] If specified, it will match user links for that user id.
		 * @return {Array} Matched user links are returned back.
		 */

		mini_profile_user_links: function(user_id){
			var selector = (~~ user_id)? (".user-" + (~~ user_id)) : "";

			return $(".mini-profile a.user-link" + selector);
		},

		/**
		 * Gets posts.
		 *
		 *     yootil.element.get.posts(); // Get all posts
		 *
		 *     yootil.element.get.posts(123); // Gets post with id 123
		 *
		 * @param {Number} [post_id] The post id for the post to get.
		 * @return {Array} Matched posts are returned.
		 */

		posts: function(post_id){
			var selector = (~~ post_id)? ("-" + (~~ post_id)) : "";

			return $("tr[id^=post" + selector + "]");
		},

		/**
		 * Gets user posts.
		 *
		 *     yootil.element.get.user_posts(1); // Gets all posts for user id 1
		 *
		 * @param {Number} [user_id] The user id to find posts for.
		 * @return {Array} Matched posts are returned.
		 */

		user_posts: function(user_id){
			if(!user_id){
				return [];
			}

			return $("tr[id^=post]:has(.mini-profile a.user-link.user-" + (~~ user_id) + ")");
		},

		/**
		 * Gets the quick reply.
		 *
		 * @return {Array}
		 */

		quick_reply: function(){
			return $(".quick-reply");
		},

		/**
		 * Gets mini profile info sections.
		 *
		 *     yootil.element.get.mini_profile_info(); // Gets all mini profile info
		 *
		 *     yootil.element.get.mini_profile_info(1); // Gets all mini profile info for the user id 1
		 *
		 * @param {Number} [user_id] If specified, it will match user links for that user id.
		 * @return {Array} Matched user links are returned back.
		 */

		mini_profile_info: function(user_id){
			var selector = (~~ user_id)? ":has(a.user-link.user-" + (~~ user_id) + ")" : "";

			return $(".mini-profile" + selector + " .info");
		},

		/**
		 * Gets signatures for posts and messages.
		 *
		 *     yootil.element.get.signatures(); // Gets all signatures
		 *
		 *     yootil.element.get.signatures(1); // Gets all signatures for the user id 1
		 *
		 * @param {Number} [user_id] If specified, it will match for that user id.
		 * @return {Array} Matched results are returned back.
		 */

		signatures: function(user_id){
			var selector = (~~ user_id)? ":has(.mini-profile a.user-link.user-" + (~~ user_id) + ")" : "";

			return $("tr[id^=post-]" + selector + " .foot .signature, tr[id^=message-]" + selector + " .foot .signature");
		},

		/**
		 * Gets last edit.
		 *
		 *     yootil.element.get.last_edit(); // Gets all last edits
		 *
		 *     yootil.element.get.last_edit(1); // Gets all for the user id 1
		 *
		 * @param {Number} [user_id] If specified, it will match for that user id.
		 * @return {Array} Matched results are returned back.
		 */

		last_edit: function(user_id){
			var selector = (~~ user_id)? ":has(.mini-profile a.user-link.user-" + (~~ user_id) + ")" : "";

			return $("tr[id^=post-]" + selector + " .foot .edited_by, tr[id^=message-]" + selector + " .foot .edited_by");
		},

		/**
		 * Gets post / message info (date, likes, etc)
		 *
		 *     yootil.element.get.post_info(); // Gets all
		 *
		 *     yootil.element.get.post_info(1); // Gets all for the user id 1
		 *
		 * @param {Number} [user_id] If specified, it will match for that user id.
		 * @return {Array} Matched results are returned back.
		 */

		post_info: function(user_id){
			var selector = (~~ user_id)? ":has(.mini-profile a.user-link.user-" + (~~ user_id) + ")" : "";

			return $("tr[id^=post-]" + selector + " .content .info, tr[id^=message-]" + selector + " .content .info");
		},

		/**
		 * Gets post / message controls.
		 *
		 *     yootil.element.get.post_controls(); // Gets all
		 *
		 *     yootil.element.get.post_controls(1); // Gets all for the user id 1
		 *
		 * @param {Number} [user_id] If specified, it will match for that user id.
		 * @return {Array} Matched results are returned back.
		 */

		post_controls: function(user_id){
			var selector = (~~ user_id)? ":has(.mini-profile a.user-link.user-" + (~~ user_id) + ")" : "";

			return $("tr[id^=post-]" + selector + " .content .controls, tr[id^=message-]" + selector + " .content .controls");
		},

		/**
		 * Gets post / message summary.
		 *
		 *     yootil.element.get.summary();
		 *
		 * @return {Array} Matches are returned back.
		 */

		summary: function(){
			return $(".messages.summary, .posts.summary");
		},

		/**
		 * Gets nav tree.
		 *
		 *     yootil.element.get.nav_tree();
		 *
		 * @return {Array} Matches are returned back.
		 */

		nav_tree: function(){
			return $("#navigation-tree");
		},

		/**
		 * Gets nav branches.
		 *
		 *     yootil.element.get.nav_branches();
		 *
		 * @return {Array} Matches are returned back.
		 */

		nav_branches: function(){
			return $("#navigation-tree #nav-tree .nav-tree-branch");
		},

		/**
		 * Gets last nav branche.
		 *
		 *     yootil.element.get.last_nav_branch();
		 *
		 * @return {Array} Matches are returned back.
		 */

		last_nav_branch: function(){
			return $("#navigation-tree #nav-tree .nav-tree-branch:last");
		},

		/**
		 * Gets a branch based on options passed in.
		 *
		 *     var example1 = yootil.element.get.nav_branch("Members", "text");
		 *
		 *     var example2 = yootil.element.get.nav_branch(/user\/1/, "url");
		 *
		 * @param {Mixed} pattern This can be a string, or a regular expression pattern.
		 * @param {String} [type] You can match against the url or text of the branch.  Default is text.
		 * @return {Array} Matches are returned back.
		 */

		nav_branch: function(pattern, type){
			if(!pattern){
				return [];
			}

			type = type || "text";

			var matched = [];

			$("#navigation-tree #nav-tree .nav-tree-branch a").each(function(){
				var match_against = (type == "url")? $(this).attr("href") : $(this).text();

				if(pattern.constructor == RegExp){
					if(pattern.test(match_against)){
						matched.push($(this).parent().parent());
					}
				} else if(typeof pattern == "string"){
					if(match_against.indexOf(pattern) != -1){
						matched.push($(this).parent().parent());
					}
				}

			});

			return matched;
		}

	};

})();

/**
 * @class yootil.element.remove
 * @alias yootil.remove
 * @static
 * Easy remove and hide elements.
 */

yootil.element.remove = yootil.remove = (function(){

	return {

		/**
		 * Removes mini profiles.
		 *
		 *     yootil.element.remove.mini_profiles(); // Removes all mini profiles
		 *
		 *     yootil.element.remove.mini_profiles(1); // Removes all mini profiles for user id 1
		 *
		 *     yootil.element.remove.mini_profiles(null, true); // hides all mini profiles
		 *
		 * @param {Number} [user_id] If specified, it will match mini profiles for that user id.
		 * @param {Boolean} [hide] If you need to keep the mini profile in the DOM set this to true.
		 * @return {Array} Matched mini profiles are returned back.
		 */

		mini_profiles: function(user_id, hide){
			var mini_profile = yootil.element.get.mini_profiles(user_id);

			if(mini_profile.length){
				mini_profile[(!hide)? "remove" : "hide"]();
			}

			return mini_profile;
		},

		/**
		 * Removes mini profile avatars.
		 *
		 *     yootil.element.remove.mini_profile_avatars(); // Removes all avatars
		 *
		 *     yootil.element.remove.mini_profile_avatars(1); // Removes all avatars for user id 1
		 *
		 *     yootil.element.remove.mini_profile_avatars(null, true); // Hides all avatars
		 *
		 * @param {Number} [user_id] If specified, it will match avatars for that user id.
		 * @param {Boolean} [hide] If you need to keep the avatar in the DOM set this to true.
		 * @return {Array} Matched avatars are returned back.
		 */

		mini_profile_avatars: function(user_id, hide){
			var avatar = yootil.element.get.mini_profile_avatars(user_id);

			if(avatar.length){
				avatar[(!hide)? "remove" : "hide"]();
			}

			return avatar;
		},

		/**
		 * Removes mini profile user links.
		 *
		 *     yootil.element.remove.mini_profile_user_links(1); // Removes all user links for user id 1
		 *
		 *     yootil.element.remove.mini_profile_user_links(); // Removes all user links
		 *
		 *     yootil.element.remove.mini_profile_user_links(null, false, true); // Removes all user links including first br element
		 *
		 * @param {Number} [user_id] If specified, it will match user links for that user id.
		 * @param {Boolean} [hide] If you need to keep the user link in the DOM set this to true.
		 * @param {Boolean} [remove_br] Each mini profile has a br element after the name, set to true to remove it.
		 * @return {Array} Matched user links are returned back.
		 */

		mini_profile_user_links: function(user_id, hide, remove_br){
			var link = yootil.element.get.mini_profile_user_links(user_id);
			var br = (remove_br)? link.parent().find("br:first") : null;

			if(link.length){
				link[(!hide)? "remove" : "hide"]();

				if(br){
					br[(!hide)? "remove" : "hide"]();
				}
			}

			return link;
		},

		/**
		 * Removes posts.
		 *
		 *     yootil.element.remove.posts(); // Removes all posts
		 *
		 *     yootil.element.remove.posts(123); // Removes post with id 123
		 *
		 *     yootil.element.remove.posts(123, true); // Hides post with id 123
		 *
		 * @param {Number} [post_id] The post id for the post to remove.
		 * @param {Boolean} [hide] If you need to keep the post in the DOM set this to true.
		 * @return {Array} Matched posts are returned.
		 */

		posts: function(post_id, hide){
			var post = yootil.element.get.posts(post_id);

			if(post.length){
				post[(!hide)? "remove" : "hide"]();
			}

			return post;
		},

		/**
		 * Removes user posts.
		 *
		 *     yootil.element.remove.user_posts(1); // Removes all posts for user id 1
		 *
		 *     yootil.element.remove.user_posts(1, true); // Hides all posts for user id 1
		 *
		 * @param {Number} user_id The user id to find posts for.
		 * @param {Boolean} [hide] If you need to keep the post in the DOM set this to true.
		 * @return {Array} Matched posts are returned.
		 */

		user_posts: function(user_id, hide){
			var user_post = yootil.element.get.user_posts(user_id);

			if(user_post.length){
				user_post[(!hide)? "remove" : "hide"]();
			}

			return user_post;
		},

		/**
		 * Removes the quick reply.
		 *
		 * @param {Boolean} [hide] Set to true if you want to keep it in the DOM.
		 * @return {Array}
		 */

		quick_reply: function(hide){
			var quick_reply = yootil.element.get.quick_reply();

			if(quick_reply.length){
				quick_reply[(!hide)? "remove" : "hide"]();
			}

			return quick_reply;
		},

		/**
		 * Removes mini profile info section.
		 *
		 *     yootil.element.remove.mini_profile_info(); // Removes all mini profile info
		 *
		 *     yootil.element.remove.mini_profile_info(1); // Removes all mini profile info for the user id 1
		 *
		 *     yootil.element.remove.mini_profile_info(1, true); // Hides all mini profile info for user id 1
		 *
		 * @param {Number} [user_id] If specified, it will match user links for that user id.
		 * @param {Boolean} [hide] If you need to keep the user link in the DOM set this to true.
		 * @param {Boolean} [remove_br] Each mini profile has a br element after the name, set to true to remove it.
		 * @return {Array} Matched user links are returned back.
		 */

		mini_profile_info: function(user_id, hide){
			var info = yootil.element.get.mini_profile_info(user_id);

			if(info.length){
				info[(!hide)? "remove" : "hide"]();

			}

			return info;
		},

		/**
		 * Removes signatures from posts and messages.
		 *
		 *     yootil.element.remove.signatures(); // Removes all signatures
		 *
		 *     yootil.element.remove.signatures(1); // Removes all signatures for the user id 1
		 *
		 * @param {Number} [user_id] If specified, it will match for that user id.
		 * @param {Boolean} [hide] Pass true to keep the element in the DOM.
		 * @return {Array} Matched results are returned back.
		 */

		signatures: function(user_id, hide){
			var signatures = yootil.element.get.signatures(user_id);

			if(signatures.length){
				signatures[(!hide)? "remove" : "hide"]();

			}

			return signatures;
		},

		/**
		 * Removes last edit from posts.
		 *
		 *     yootil.element.remove.last_edit(); // Gets all last edits
		 *
		 *     yootil.element.remove.last_edit(1); // Gets all for the user id 1
		 *
		 * @param {Number} [user_id] If specified, it will match for that user id.
		 * @param {Boolean} [hide] Pass true to keep the element in the DOM.
		 * @return {Array} Matched results are returned back.
		 */

		last_edit: function(user_id, hide){
			var last_edit = yootil.element.get.last_edit(user_id);

			if(last_edit.length){
				last_edit[(!hide)? "remove" : "hide"]();

			}

			return last_edit;
		},

		/**
		 * Removes post / message info (date, likes, etc)
		 *
		 *     yootil.element.remove.post_info(); // Gets all
		 *
		 *     yootil.element.remove.post_info(1); // Gets all for the user id 1
		 *
		 * @param {Number} [user_id] If specified, it will match for that user id.
		 * @param {Boolean} [hide] Pass true to keep the element in the DOM.
		 * @return {Array} Matched results are returned back.
		 */

		post_info: function(user_id, hide){
			var info = yootil.element.get.post_info(user_id);

			if(info.length){
				info[(!hide)? "remove" : "hide"]();

			}

			return info;
		},

		/**
		 * Removes post / message controls.
		 *
		 *     yootil.element.remove.post_controls(); // Gets all
		 *
		 *     yootil.element.remove.post_controls(1); // Gets all for the user id 1
		 *
		 * @param {Number} [user_id] If specified, it will match for that user id.
		 * @param {Boolean} [hide] Pass true to keep the element in the DOM.
		 * @return {Array} Matched results are returned back.
		 */

		post_controls: function(user_id, hide){
			var controls = yootil.element.get.post_controls(user_id);

			if(controls.length){
				controls[(!hide)? "remove" : "hide"]();

			}

			return controls;
		},

		/**
		 * Removes post / message summary.
		 *
		 *     yootil.element.remove.summary();
		 *
		 * @param {Boolean} [hide] Pass true to keep the element in the DOM.
		 * @return {Array} Matches are returned back.
		 */

		summary: function(hide){
			var summary = yootil.element.get.summary();

			if(summary.length){
				summary[(!hide)? "remove" : "hide"]();
			}

			return summary;
		},

		/**
		 * Removes navigation tree.
		 *
		 *     yootil.element.remove.nav_tree();
		 *
		 * @param {Boolean} [hide] Pass true to keep the element in the DOM.
		 * @return {Array} Matches are returned back.
		 */

		nav_tree: function(hide){
			var nav = yootil.element.get.nav_tree();

			if(nav.length){
				nav[(!hide)? "remove" : "hide"]();
			}

			return nav;
		},

		/**
		 * Removes navigation tree branches.
		 *
		 *     yootil.element.remove.nav_branches();
		 *
		 * @param {Boolean} [hide] Pass true to keep the element in the DOM.
		 * @return {Array} Matches are returned back.
		 */

		nav_branches: function(hide){
			var branches = yootil.element.get.nav_branches();

			if(branches.length){
				branches[(!hide)? "remove" : "hide"]();
			}

			return branches;
		},

		/**
		 * Removes last navigation tree branch.
		 *
		 *     yootil.element.remove.last_nav_branch();
		 *
		 * @param {Boolean} [hide] Pass true to keep the element in the DOM.
		 * @return {Array} Matches are returned back.
		 */

		last_nav_branch: function(hide){
			var branch = yootil.element.get.last_nav_branch();

			if(branch.length){
				branch[(!hide)? "remove" : "hide"]();
			}

			return branch;
		},

		/**
		 * Removes branches based on options passed in.
		 *
		 *     var example1 = yootil.element.remove.nav_branch("Members", "text");
		 *
		 *     var example2 = yootil.element.remove.nav_branch(/user\/1/, "url");
		 *
		 *     var example3 = yootil.element.remove.nav_branch(/^\/(members)?$/, "url"); // Removes "Home" and "Members".
		 *
		 * @param {Mixed} pattern This can be a string, or a regular expression pattern.
		 * @param {String} [type] You can match against the url or text of the branch.  Default is text.
		 * @param {Boolean} [hide] Pass true to keep the element in the DOM.
		 * @return {Array} Matches are returned back.
		 */

		nav_branch: function(pattern, type, hide){
			var branches = yootil.element.get.nav_branch(pattern, type);

			if(branches.length){
				for(var branch in branches){
					branches[branch][(!hide)? "remove" : "hide"]();
				}
			}

			return branches;
		}

	};

})();

/**
 * @class yootil.bar
 * @static
 * Mimics the ProBoards Network bar, but on the left and for plugins.
 */

yootil.bar = (function(){

	var bar = {

		_bar: null,

		_items: {},

		_total_items: 0,

		has_bar: function(){
			if(!bar.is_enabled()){
				return false;
			}

			if(this._bar){
				return true;
			}

			var the_bar = $("#yootil-bar-wrapper");

			if(the_bar.length == 1){
				this._bar = the_bar;
				return true;
			}

			return false;
		},

		/**
		 * Add an item to the Yootil Bar.
		 *
		 *     yootil.bar.add("http://proboards.com", "http://example.com/someimage.png", "Hello World");
		 *
		 * @param {String} link URL for the item.
		 * @param {String} img URL for the image.
		 * @param {String} [alt] Alt / title for the image.
		 * @param {String} [id] Pass in a unique ID if you wish to have the option to remove it later.
		 * @param {Function} [func] Pass function to be executed when clicked on.
		 * @param {Mixed} [context] Context of the function being passed.
		 * @chainable
		 */

		add: function(link, img, alt, id, func, context){
			var self = this;
			var alt = alt || "";

			$(function(){
				if(self.has_bar()){
					if(link && img){
						var item = $("<a href='" + link + "' style='margin-top: 3px; display: inline-block;'><img src='" + img + "' style='padding: 0px 3px;' alt='" + alt + "' title='" + alt + "' /></a>");

						if(id && id.toString().length){
							self._items["_" + id.toString()] = item;
						}

						if(func && typeof func == "function"){
							item.click(function(){
								return $.proxy(func, context)();
							});
						}

						self._total_items ++;
						self._bar.find("#yootil-bar").append(item);
						self.show_bar();
					}
				}
			});

			return this;
		},

		/**
		 * Remove an item to the Yootil Bar.
		 *
		 *     yootil.bar.remove("myitem");
		 *
		 * @param {String} id The unique ID used when adding the item.
		 * @chainable
		 */

		remove: function(id){
			if(id && id.toString().length && this._items["_" + id.toString()]){
				this._items["_" + id.toString()].remove();
				delete this._items["_" + id.toString()];
				this._total_items --;

				if(this._bar.find("#yootil-bar a").length == 0){
					this._bar.css("display", "none");
				}
			}

			return this;
		},

		/**
		 * Find out how many items are currently sitting in the bar.
		 *
		 * @return {Number}
		 */

		total_items: function(){
			return this._total_items;
		},

		/**
		 * Use this to get the item (jQuery wrapped)
		 *
		 *     yootil.get("myitem");
		 *
		 * @param {String} id The unique ID used when adding the item.
		 * @return {Object} jQuery object is returned that wraps around the a tag.
		 */

		get: function(id){
			if(id && id.toString().length && this._items["_" + id.toString()]){
				return this._items["_" + id.toString()];
			}
		},

		/**
		 * Use this to see if an item exists in the bar.
		 *
		 *     if(yootil.bar.has("myitem")){
		 *     	console.log("item is in the yootil bar");
		 *     }
		 *
		 * @param {String} id The unique ID used when adding the item.
		 * @return {Boolean}
		 */

		has: function(id){
			if(id && id.toString().length && this._items["_" + id.toString()]){
				return true;
			}

			return false;
		},

		show_bar: function(){
			if(this._bar.find("#yootil-bar a").length > 0){
				var display = yootil.storage.get("yootil_bar", false);

				if(display){
					if(display.toString() == "1" || display.toString().length == 0){
						this._bar.find("#yootil-bar").css("display", "inline-block");
					} else {
						this._bar.find("> img").attr("src", yootil.images.collapse).attr("alt", ">");
						this._bar.find("#yootil-bar").css("display", "none");
					}
				}

				this._bar.css("display", "");
			}
		},

		/**
		 * Checks to see if the bar is enabled.
		 *
		 *     if(yootil.bar.is_enabled()){
		 *     	console.log("Bar is enabled");
		 *     }
		 *
		 * @return {Boolean}
		 */

		is_enabled: function(){
			if(yootil.settings && yootil.settings.bar_enabled && yootil.settings.bar_enabled == 0){
				return false;
			}

			return true;
		}

	};

	$(function(){
		if(!yootil.user.logged_in() || !bar.is_enabled()){
			return;
		}

		var html_built = false;
		var pb_bar = $("div#pbn-bar-wrapper");

		// If it doesn't exist, manually create it.

		if(!pb_bar.length){
			html_built = true;
			pb_bar = $('<div style="position: fixed; right: inherit; bottom: 0px; left: 0px; height: 22px; *height: 23px; display: none; text-align: right; z-index: 20;" id="yootil-bar-wrapper"><img style="display: inline-block; float: left;" alt="<" src="' + yootil.images.expand + '"><div style="display: inline-block; float: left; height: 23px; background-color: #F0F0F0; border-width: 1px 1px 0px 0px; border-style: solid; border-color: #B0B0B0;" id="yootil-bar"></div></div>');
		}

		if(pb_bar.length == 1){
			if(html_built){
				plugin_bar = pb_bar;
			} else {
				var plugin_bar = pb_bar.clone();

				plugin_bar.attr("id", "yootil-bar-wrapper");
				plugin_bar.css({

					right: "inherit",
					left: "0px",
					display: "none"

				});

				plugin_bar.find("img:first").css("float", "left").attr("src", yootil.images.expand).attr("alt", "<");

				plugin_bar.find("div#pbn-bar").css({

					width: "",
					"float": "left",
					"border-width": "1px 1px 0px 0px"

				}).attr("id", "yootil-bar").html("");
			}

			plugin_bar.find("> img").click(function(){
				var yootil_bar = $("#yootil-bar");

				yootil_bar.toggle();

				if(yootil_bar.is(":visible")){
					yootil_bar.css("display", "inline-block");
					$(this).attr("src", yootil.images.expand).attr("alt", "<");
				} else {
					$(this).attr("src", yootil.images.collapse).attr("alt", ">");
				}

				yootil.storage.set("yootil_bar", ((yootil_bar.is(":visible"))? "1" : "0"), false, true);
			});

			$("body").append(plugin_bar);
		}

	});

    return bar;

})();

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

// @TODO: Add hooks to forms so that notifications that have been viewed are removed

yootil.notifications = (function(){

	function Notifications(key, template, klass){
		if(!yootil.notifications_queue[key]){
			yootil.notifications_queue[key] = new yootil.queue();
		}

		this.html_tpl = "";
		this.key = key || null;
		this.plugin = yootil.key.exists(this.key);
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
		 * Returns the object with all messages for this key.
		 *
		 *     new yootil.notifications("my_key").create("Hello World!").get_all();
		 *
		 * @return {Object}
		 */

		get_all: function(){
			return this.data;
		},

		/**
		 * Returns a specific message if an id was set.
		 *
		 *     var n = new yootil.notifications("my_key").get("notify44");
		 *
		 * @param {Mixed} id The id for the message you want to get.
		 * @return {Object}
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
		 * Removes all notifications from the key.
		 *
		 *     new yootil.notifications("my_key").remove_all();
		 *
		 * @chainable
		 */

		remove_all: function(){
			this.data = {};
			yootil.key.set(this.key, this.data, yootil.user.id(), true);

			return this;
		},

		/**
		 * Removes a specific notification.
		 *
		 * @param {Mixed} id The id for the notification you want to remove.
		 * @chainable
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

		/**
		 * Call this to show notifications.
		 *
		 *     var notify = new yootil.notifications("mykey");
		 *
		 *     notify.show();
		 *
		 * Example using the events:
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
		 *     });
		 *
		 * @param {Object} [events]
		 * @param {Function} [events.before] This is called before the notification is parsed.  The notification
		 * is passed in as the first argument.  It's very important that you return the notification back in this event.
		 * @param {Function} [events.after] This is called after the notification has been viewed.  The notification
		 * is passed in as the first argument.
		 *
		 * @chainable
		 */

		show: function(events){
			if(this.data){
				var has_notifications = false;

				for(var key in this.data){
					has_notifications = true;

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

								if(typeof events.before != "undefined" && typeof events.before == "function"){
									notification = events.before(notification);
								}

								var notify_html = self.html_tpl.replace("{NOTIFICATION_MESSAGE}", notification.m);

								$(notify_html).attr("id", "yootil-notification-" + notification.i).appendTo($("body")).delay(200).fadeIn("normal", function(){

									self.add_to_storage(notification.i);
								}).delay(3500).fadeOut("normal", function(){
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
			var data = yootil.key.value(this.key, yootil.user.id());
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

/**
 * @class yootil.sound
 * @static
 * @deprecated
 *
 * Allows us to play a sound (uses HTML 5 Audio).
 *
 * Set access on the audio files, specifically Access-Control-Allow-Origin.
 *
 * See "<a href="http://www.w3.org/TR/cors/#access-control-allow-origin-response-hea">Access Control Allow Origin - Response Header</a>" for more information about Access-Control.
 */

yootil.sound = (function(){

	return {

		audio_obj: null,

		/**
		 * Plays a sound.
		 *
		 * Browsers in force the origin policy, so make sure you allow access to the sounds.
		 *
		 * @param {String} sound The URL to the sound file.
		 */

		play: function(sound){
			if(!this.audio_obj){
				this.create_audio_obj();
			}

			if(sound){
				this.audio_obj.attr("src", sound);
				this.audio_obj.get(0).play();
			}
		},

		create_audio_obj: function(){
			this.audio_obj = $("<audio id='yootil_sound_player' style='display: none'></audio>");
			this.audio_obj.appendTo($("body"));
		}

	};

})();