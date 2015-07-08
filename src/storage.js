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