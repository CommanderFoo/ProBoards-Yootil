/**
 * @class yootil.key
 * @static
 * Most methods are just wrappers, to see the ProBoards API documentation, <a href="https://www.proboards.com/developer/js/class/key">click here</a>.
 */

// yootil.key("aaa").set("hi world", 1);

yootil.key = (class {

	static init(){

		/**
		 * @property {Object} pb_key_obj Holds a reference to the ProBoards key object.
		 * @ignore
		 */

		this.pb_key_obj = pb.plugin.key;

		return this.wrapper.bind(this);
	}

	static wrapper(key = ""){
		return Object.assign(Object.create(null), {

			exists: () => this.exists(key),
			obj: () => this.key_obj(key),
			is_empty: object_id => this.is_empty(key, object_id),
			has_value: object_id => !this.is_empty(key, object_id),
			get: (object_id, is_json) => this.get(key, object_id),
			clear: object_id => this.clear(key, object_id),
			set: (value, object_id, type) => this.set(key, value, object_id, type),
			on: (evt, value, object_id) => this.on(key, evt, value, object_id),
			new_thread: (value, object_id) => this.new_thread(key, value, object_id),
			new_post: (value, object_id) => this.new_post(key, value, object_id),
			new_quick_reply: (value, object_id) => this.post_quick_reply(key, value, object_id),
			append: (value, object_id) => this.append(key, value, object_id),
			prepend: (value, object_id) => this.prepend(key, value, object_id),
			increment: (value, object_id) => this.increment(key, value, object_id),
			decrement: (value, object_id) => this.decrement(key, value, object_id),
			pop: (items, object_id) => this.pop(key, items, object_id),
			push: (value, object_id) => this.push(key, value, object_id),
			push_unique: (value, object_id, strict) => this.push_unique(key, value, object_id, strict),
			shift: (items, object_id) => this.shift(key, items, object_id),
			unshift: (value, object_id) => this.unshift(key, value, object_id),
			unshift_unique: (value, object_id, strict) => this.unshift_unique(key, value, object_id, strict),
			write: object_id => this.write(key, object_id),
			read: object_id => this.read(key, object_id),
			type: (object_id, return_str) => this.type(key, return_str),
			length: object_id => this.length(key, object_id),
			user_key: () => this.user_key(key),
			super_user_key: () => this.super_user_key(key),
			thread_key: () => this.thread_key(key),
			post_key: () => this.post_key(key),
			conversation_key: () => this.conversation_key(key),
			message_key: () => this.message_key(key),
			super_forum_key: () => this.super_forum_key(key),
			has_space: object_id => this.has_space(key, object_id),
			space_left: object_id => this.space_left(key, object_id),
			max_space: () => this.max_space(key)

		});
	}

	/**
	 * Checks to see if a key exists.
	 *
	 * @param {String} key The key to check.
	 * @return {Boolean}
	 */

	static exists(key = ""){
		if(key){
			if(typeof proboards.plugin._keys[key] != "undefined"){
				return true;
			}
		}

		return false;
	}

	/**
	 * Returns the ProBoards key object.
	 *
	 * @param {String} key The key to get.
	 * @return {Object}
	 */

	static key_obj(key = ""){
		if(this.exists(key)){
			return this.pb_key_obj(key);
		}

		return {};
	}

	/**
	 * Checks to see if a key is empty
	 *
	 * @param {String} key The key to check.
	 * @param {Number} [object_id] This is the object id, proboards defaults to current user if not set.
	 * @return {Boolean}
	 */

	static is_empty(key = "", object_id = 0){
		if(this.exists(key)){
			if(typeof this.pb_key_obj(key).get != "undefined"){
				let val = this.pb_key_obj(key).get(object_id || undefined);

				if(val && val.toString().length){
					return false;
				}
			}
		}

		return true;
	}

	/**
	 * Gets the value stored in the key.
	 *
	 * @param {String} key The ProBoards key we are getting.
	 * @param {Number} [object_id] This is the object id, proboards defaults to current user if not set.
	 * @param {Boolean} [is_json] If true, it will parse the JSON string.  ProBoards handles parsing now it seems.
	 * @returns {String|Object} If no value, an empty string is returned.
	 */

	static get(key = "", object_id, is_json = false){
		if(this.exists(key)){
			object_id = object_id || undefined;

			if(!this.is_empty(key, object_id)){
				let value = this.pb_key_obj(key).get(object_id);

				if(is_json && yootil.is_json(value)){
					value = JSON.parse(value);
				}

				return value;
			}
		}

		return "";
	}

	/**
	 * Clears out key value.
	 *
	 * @param {String} key The key.
	 * @param {Number} [object_id] This is the object id, proboards defaults to current user if not set.
	 * @return {Object} Returns promise.
	 */

	static clear(key = "", object_id){
		return this.set(key, "", object_id);
	}

	/**
	 * Sets a key value.
	 *
	 * Basic example (will set for current user):
	 *
	 *     yootil.key("mykey").set("apples");
	 *
	 * Using resolve and reject for promise.
	 *
	 *     yootil.key("mykey").set("somevalue", yootil.user.id()).then((status) => {
	 *     		console.log(status.message);
	 *     }).catch((status) => {
	 *     		console.log(status.message);
	 *     });
	 *
	 * @param {String} key The key.
	 * @param {String|Object} value Can be a string, or a object.  ProBoards now handles stringifying objects.
	 * @param {Number} [object_id] This is the object id, proboards defaults to current user if not set.
	 * @param {String} [type] Passed on set the method type (i.e append, pop etc).
	 * @return {Object} Returns a promise.
	 */

	static set(key = "", value = "", object_id, type = ""){
		let p = new Promise((resolve, reject) => {
			object_id = object_id || undefined;

			if(this.exists(key)){
				let options = {

					object_id,
					value

				};

				options.error = function(status){
					reject(status);
				}

				options.success = function(status){
					resolve(status);
				}

				if(type){
					switch(type){

						case "push" :
						case "unshift" :

							if(Array.isArray(options.value) && options.value.length > 1){
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

					this.pb_key_obj(key)[type](options);
				} else {
					this.pb_key_obj(key).set(options);
				}
			} else {
				reject({
					message: "Key does not exist"
				});
			}

		});

		return p;
	}

	/**
	 * Key is set when an event occurs.
	 *
	 * @param {String} key The key.
	 * @param {String} [event] The event to use.  Currently there are 2 "thread_new" and "post_new".
	 * @param {Mixed} value The value to be stored in the key.  ProBoards handles stringify now.
	 * @param {Number} [object_id] This is the object id, proboards defaults to current user if not set.
	 * @return {Boolean} Returns true if successful (relies on what ProBoards .set returns).
	 */

	static on(key, event = "", value, object_id = undefined){
		if(!event){
			return false;
		}

		return this.pb_key_obj(key).set_on(event, object_id, value);
	}

	/**
	 * Concatenates a given value to the end of the existing key value.
	 *
	 * @param {String} key The key.
	 * @param {Mixed} value Can be a string or a number.
	 * @param {Number} [object_id] This is the object id, proboards defaults to current user if not set.
	 * @return {Object} Returns promise.
	 */

	static append(key, value, object_id){
		return this.set(key, value, object_id, "append");
	}

	/**
	 * Inserts a given value in front of the existing key value.
	 *
	 * @param {String} key The key.
	 * @param {Mixed} value Can be a string or a number.
	 * @param {Number} [user_id] This is the object id, proboards defaults to current user if not set.
	 * @return {Object} Returns promise.
	 */

	static prepend(key, value, object_id){
		return this.set(key, value, object_id, "prepend");
	}

	/**
	 * If the key is an integer, increases the key's value by one, or you can supply a different amount to increment by.
	 *
	 * @param {String} key The key.
	 * @param {Number} [value] Increment by this amount.  Default is 1.
	 * @param {Number} [object_id] This is the object id, proboards defaults to current user if not set.
	 * @return {Object} Returns promise.
	 */

	static increment(key, value = 1, object_id){
		return this.set(key, value, object_id, "increment");
	}

	/**
	 * If the key is an integer, decreases the key's value by one, or you can supply a different amount to decrement by.
	 *
	 * @param {String} key The key.
	 * @param {Number} [value] Decrement by this amount.  Default is 1.
	 * @param {Number} [object_id] This is the object id, proboards defaults to current user if not set.
	 * @return {Object} Returns promise.
	 */

	static decrement(key, value = 1, object_id){
		return this.set(key, value, object_id, "decrement");
	}

	/**
	 * If the key is an array, removes the last number of items specified.
	 *
	 * @param {String} key The key.
	 * @param {Number} [num_items] Number of items to pop from the key.
	 * @param {Number} [object_id] This is the object id, proboards defaults to current user if not set.
	 * @return {Object} Returns promise.
	 */

	static pop(key, num_items = 1, object_id){
		return this.set(key, num_items, object_id, "pop");
	}

	/**
	 * If the key is an array, adds the given value to the end of the array.
	 *
	 *     yootil.key("mykey").push("apples");
	 *
	 *     yootil.key("mykey").push(["apples", "pears"], yootil.user.id());
	 *
	 * @param {String} key The key.
	 * @param {String|Array} value The value to be pushed into the key.  This can be an array of values.
	 * @param {Number} [object_id] This is the object id, proboards defaults to current user if not set.
	 * @param {Boolean} [strict] If set to true, it will use inArray instead of ProBoards inArrayLoose.
	 * @return {Object} Returns promise.
	 */

	static push(key, value, object_id){
		value = (Array.isArray(value) && value.length == 1)? value[0] : value;

		return this.set(key, value, object_id, "push");
	}

	/**
	 * If the key is an array, adds the given value to the end of the array only if they are unique.
	 *
	 *     yootil.key("mykey").push_unique("apples");
	 *
	 *     yootil.key("mykey").push_unique(["apples", "pears"], false, yootil.user.id()); // Don't use strict
	 *
	 * @param {String} key The key.
	 * @param {Mixed} value The value to be pushed into the key.  This can be an array of values.
	 * @param {Number} [object_id] This is the object id, proboards defaults to current user if not set.
	 * @param {Boolean} [strict] If set to true, it will use inArray instead of ProBoards inArrayLoose.
	 * @return {Object} Returns promise.
	 */

	static push_unique(key, value, object_id, strict = false){
		let current_value = this.value(key);

		if(!current_value || !Array.isArray(current_value)){
			current_value = [];
		}

		let new_values = [];

		if(typeof value != "undefined"){
			if(Array.isArray(value)){
				new_values = value;
			} else {
				new_values.push(value);
			}
		}

		if(new_values.length){
			let to_push = [];

			for(let item of new_values){
				let af = (strict)? ((val) => val === item) : ((val) => val == item);

				if(!current_value.find(af)){
					to_push.push(item);
				}
			}

			if(to_push.length){
				to_push = (to_push.length == 1)? to_push[0] : to_push;

				return this.push(key, to_push, object_id);
			}
		}
	}

	/**
	 * If the key is an array, removes the first "num_items" values.
	 *
	 * @param {String} key The key.
	 * @param {Number} num_items The number of items to shift from the array.
	 * @param {Number} [object_id] This is the object id, proboards defaults to current user if not set.
	 * @return {Object} Returns promise.
	 */

	static shift(key, num_items = 1, object_id){
		return this.set(key, num_items, object_id, "shift");
	}

	/**
	 * If the key is an array, adds value to the front of the array.
	 *
	 * @param {String} key The key.
	 * @param {String|Array} value The value to be pushed into the key.  This can be an array of values.
	 * @param {Number} [user_id] This is the object id, proboards defaults to current user if not set.
	 * @return {Object} Returns promise.
	 */

	static unshift(key, value, object_id){
		value = (Array.isArray(value) && value.length == 1)? value[0] : value;

		return this.set(key, value, object_id, "unshift");
	}

	/**
	 * If the key is an array, adds the given value to the front of the array only if they are unique.
	 *
	 *     yootil.key("mykey").unshift_unique("apples");
	 *
	 *     yootil.key("mykey").unshift_unique(["apples", "pears"], false, yootil.user.id()); // Don't use strict
	 *
	 * @param {String} key The key.
	 * @param {Mixed} value The value to be pushed into the key.  This can be an array of values.
	 * @param {Number} [object_id] This is the object id, proboards defaults to current user if not set.
	 * @param {Boolean} [strict] If set to true, it will use inArray instead of ProBoards inArrayLoose.
	 * @return {Object} Returns promise.
	 */

	static unshift_unique(key, value, object_id, strict = false){
		let current_value = this.value(key);

		if(!current_value || !Array.isArray(current_value)){
			current_value = [];
		}

		let new_values = [];

		if(typeof value != "undefined"){
			if(Array.isArray(value)){
				new_values = value;
			} else {
				new_values.push(value);
			}
		}

		if(new_values.length){
			let to_push = [];

			for(let item of new_values){
				let af = (strict)? ((val) => val === item) : ((val) => val == item);

				if(!current_value.find(af)){
					to_push.push(item);
				}
			}

			if(to_push.length){
				to_push = (to_push.length == 1)? to_push[0] : to_push;

				return this.unshift(key, to_push, object_id);
			}
		}
	}

	/**
	 * Checks permission on key to see if the user can write.
	 *
	 * @param {String} key The key.
	 * @param {Number} object_id This is the object id, proboards defaults to current user if not set.
	 * @return {Boolean}
	 */

	static write(key, object_id){
		if(this.exists(key)){
			if(typeof this.pb_key_obj(key).can_write != "undefined"){
				return !!this.pb_key_obj(key).can_write(object_id);
			}
		}

		return false;
	}

	/**
	 *  Checks permission on key to see if the user can read.
	 *
	 * @param {String} key The key.
	 * @param {Number} object_id This is the object id, proboards defaults to current user if not set.
	 * @return {Boolean}
	 */

	static read(key, user){
		if(this.exists(key)){
			if(typeof this.pb_key_obj(key).can_read != "undefined"){
				return !!this.pb_key_obj(key).can_read(object_id);
			} else {

				// ProBoards hasn't exposed it.
				// Just return true so we don't break plugins

				return true;
			}
		}

		return false;
	}

	/**
	 * Get they key type.
	 *
	 * @param {String} key The key.
	 * @param {Boolean} [return_str] If true, it will return a string value (i.e "USER").
	 * @return {String}
	 */

	static type(key, return_str = false){
		let type = this.pb_key_obj(key).type();

		if(return_str){
			let types = pb.plugin.key_types();

			for(let k in types){
				if(types[k] == type){
					type = k;
					break;
				}
			}
		}

		return type;
	}

	/**
	 * Gets the length of a key.
	 *
	 * @param {String} key The key to be checked.
	 * @param {Number} object_id Object id.
	 * @return {Number} Returns the length.
	 */

	static length(key, object_id){
		let val = this.get(key, object_id);

		if(typeof val == "string"){
			return val.length;
		}

		return JSON.stringify(val).length;
	}

	/**
	 * Checks to see if the key is a user type.
	 *
	 * @param {String} key The key to check.
	 * @return {Boolean}
	 */

	static user_key(key){
		if(this.type(key) == 1){
			return true;
		}

		return false;
	}

	/**
	 * Checks to see if the key is a super user type.
	 *
	 * @param {String} key The key to check.
	 * @return {Boolean}
	 */

	static super_user_key(key){
		if(this.type(key) == 2){
			return true;
		}

		return false;
	}

	/**
	 * Checks to see if the key is a thread type.
	 *
	 * @param {String} key The key to check.
	 * @return {Boolean}
	 */

	static thread_key(key){
		if(this.type(key) == 3){
			return true;
		}

		return false;
	}

	/**
	 * Checks to see if the key is a post type.
	 *
	 * @param {String} key The key to check.
	 * @return {Boolean}
	 */

	static post_key(key){
		if(this.type(key) == 4){
			return true;
		}

		return false;
	}

	/**
	 * Checks to see if the key is a conversation type.
	 *
	 * @param {String} key The key to check.
	 * @return {Boolean}
	 */

	static conversation_key(key){
		if(this.type(key) == 5){
			return true;
		}

		return false;
	}

	/**
	 * Checks to see if the key is a message type.
	 *
	 * @param {String} key The key to check.
	 * @return {Boolean}
	 */

	static message_key(key){
		if(this.type(key) == 6){
			return true;
		}

		return false;
	}

	/**
	 * Checks to see if the key is a super_forum type.
	 *
	 * @param {String} key The key to check.
	 * @return {Boolean}
	 */

	static super_forum_key(key){
		if(this.type(key) == 7){
			return true;
		}

		return false;
	}

	/**
	 * Checks to see if the key has space.
	 *
	 * @param {String} key The key to check.
	 * @param {Number} object_id Object id.
	 * @return {Boolean}
	 */

	static has_space(key, object_id){
		let max_length = (this.super_forum_key(key))? pb.data("plugin_max_super_forum_key_length") : pb.data("plugin_max_key_length");

		if(this.length(key, object_id) < max_length){
			return true;
		}

		return false;
	}

	/**
	 * Gets the space left in the key.
	 *
	 * @param {String} key The key to check.
	 * @param {Number} object_id Object id.
	 * @return {Number}
	 */

	static space_left(key, object_id){
		let max_length = (this.super_forum_key(key))? pb.data("plugin_max_super_forum_key_length") : pb.data("plugin_max_key_length");
		let key_length = this.length(key, object_id);
		let space_left = max_length - key_length;

		return (space_left < 0)? 0 : space_left;
	}

	/**
	 * Gets max space (characters).
	 *
	 * @param {String} key The key to check.
	 * @return {Number}
	 */

	static max_space(key){
		let max_length = (this.super_forum_key(key))? pb.data("plugin_max_super_forum_key_length") : pb.data("plugin_max_key_length");

		return max_length;
	}

}).init();