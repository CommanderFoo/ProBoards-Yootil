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