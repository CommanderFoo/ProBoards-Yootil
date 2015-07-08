/**
* Namespace: yootil.key
*
* 	This object is a wrapper around the proboards.plugin.key object.
*
* 	Note:  this isn't final, I might change things around a little and add a few more methods.
*
*	Also, things might get changed by ProBoards.
*/
	
yootil.key = (function(){
	
	return {
	
		/**
		* Property: pb_key_obj
		*	*object* Holds a reference to the ProBoards key object.
		*/
		
		pb_key_obj: pb.plugin.key,
		
		/**
		* Method: exists
		* 	Checks to see if a key exists.
		*
		* Parameters:
		* 	key - *string* The key to check.
		*
		* Returns:
		* 	*boolean*
		*
		* Examples:
		*	yootil.key.exists("mykey");
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
		* Method: get_key
		* 	Returns the key object.
		*
		* Parameters:
		* 	key - *string* The key to get.
		*
		* Returns:
		* 	*object* / *boolean*
		*
		* Examples:
		*	yootil.key.get_key("mykey");
		*/
		
		get_key: function(key){
			if(this.exists(key)){
				return this.pb_key_obj(key);
			}
			
			return false;
		},
		
		/**
		* Method: has_value
		* 	Checks to see if a key has a value.
		*
		* Parameters:
		* 	key - *string* The key to check.
		* 	user - *string* / *integer* This is the user id, proboards defaults to current user if not set.
		*
		* Returns:
		* 	*boolean*
		*
		* Examples:
		*	yootil.key.has_value("mykey");		
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
		* Method: value
		* 	Gets the key value
		*
		* Parameters:
		* 	key - *string* The key.
		* 	user - *string* / *integer* This is the user id, proboards defaults to current user if not set.
		* 	is_json - *boolean* If true, it will parse the JSON string.
		*
		* Returns:
		* 	*string*
		*
		* Examples:
		*	yootil.key.value("mykey");
		*
		*	yootil.key.value("mykey", null, true); // Parses JSON
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
		* Method: clear
		* 	Clears out key value.
		*
		* Parameters:
		* 	key - *string* The key.
		*	user - *string* / *integer* This is the user id, proboards defaults to current user if not set.
		*
		* Returns:
		* 	*object* - returns yootil.key object to allow chaining.
		*
		* Examples:
		*	yootil.key.clear("mykey");
		*/
		
		clear: function(key, user){
			this.set(key, "", user);
			
			return this;
		},
		
		/**
		* Method: set
		* 	Sets a keys value.
		*
		* Parameters:
		* 	key - *string* The key.
		* 	value - *string* / *object* Can be a string, or a object that will get .
		* 	user - *string* / *integer This is the user id, proboards defaults to current user if not set.
		*
		* Returns:
		*	*boolean*
		*
		* Examples:
		*	yootil.key.set("mykey", "apples");
		*
		*	yootil.key.set("mykey", "apples", null, true); // Save as JSON
		*/
		
		set: function(key, value, user){
			if(this.exists(key)){

				// No longer need this as ProBoards handles it

				/*if(is_json){
					value = JSON.stringify(value);
				}*/

				if(typeof user == "undefined" || !user || !user.toString().length){
					user = value;
					value = undefined;
				}

				this.pb_key_obj(key).set({

					object_id: user,
					value: value

				});
			}
			
			return this;
		},

		/**
		* Method: write
		* 	Checks permission on key to see if the user can write
		*
		* Parameters:
		* 	key - *string* The key.
		* 	user - *string* / *integer This is the user id, proboards defaults to current user if not set.
		*
		* Returns:
		*	*boolean*
		*/

		// @TODO: Fix this when ProBoards API has exposed it

		write: function(key, user){
			if(this.exists(key)){
				return true; // For now until can_write is exposed, we will just return true

				return !!this.pb_key_obj(key).can_write(user);
			}
			
			return false;
		},
	
		/**
		* Method: read
		* 	Checks permission on key to see if the user can read
		*
		* Parameters:
		* 	key - *string* The key.
		* 	user - *string* / *integer This is the user id, proboards defaults to current user if not set.
		*
		* Returns:
		*	*boolean*
		*/

		// @TODO: Fix this when ProBoards API has exposed it

		read: function(key, user){
			if(this.exists(key)){
				return true; // For now until can_read is exposed, we will just return true

				return !!this.pb_key_obj(key).can_read(user);
			}
			
			return false;
		}
		
	};
	
})();