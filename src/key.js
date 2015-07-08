/**
 * @class yootil.key
 * @static
 *  Wrapper around the proboards.plugin.key object while including some useful methods.
 */

// @TODO: Add easy pop, shift, increment etc methods.  i.e yootil.key.pop(key, id, num_items).
// @TODO: Add support for callbacks (success, error, complete)

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
		 * @chainable
		 */
		
		clear: function(key, user){
			this.set(key, "", user);
			
			return this;
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
		 * @param {Number} [user] This is the user id, proboards defaults to current user if not set.
		 * @param {Object} [callbacks] Setup callbacks along with a context if needed.
		 * @param {Function} callbacks.error
		 * @param {Function} callbacks.success
		 * @param {Function} callbacks.complete
		 * @param {Object} callbacks.context
		 * @chainable
		 */
		
		set: function(key, value, user, callbacks){
			if(this.exists(key)){

				// No longer need this as ProBoards handles it

				/*if(is_json){
					value = JSON.stringify(value);
				}*/

				if(typeof user == "undefined" || !user || !user.toString().length){
					user = value;
					value = undefined;
				}

				var options = {

					object_id: user,
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

				this.pb_key_obj(key).set(options);
			}
			
			return this;
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
		}
		
	};
	
})();