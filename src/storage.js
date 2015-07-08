/**
* Namespace: yootil.storage
* 	Wrappers for session and persistent storage.
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
		* Method: set
		* 	Allows you to set a key and value, along with some other settings.
		*
		* Parameters:
		*	key - *string* The key for the storage
		*	value - *string* The value that will be stored
		*	json - *boolean* If true, the value will be turned into a JSON string
		*	persist - *boolean* By default the value is stored for the session, pass true to persist it
		*
		* Returns:
		*	yootil.storage
		*
		* Examples:
		*	yootil.storage.set("mykey", "myvalue", false, true) // Will be persistent
		*
		*	yootil.storage.set("mykey", "myvalue") // Will be for the session
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
		* Method: get
		* 	Gets a value from storage in either session or persistent.
		*
		* Parameters:
		*	key - *string* The key for the storage
		*	json - *boolean* If true, the value will be JSON parsed
		*	persist - *boolean* You can specify not to look in persistent by passing false
		*
		* Returns:
		*	*string* / *object*
		*
		* Examples:
		*	yootil.storage.get("mykey") // Will look in session and persistent for key
		*
		*	yootil.storage.get("mykey", false, false) // Will look in session only
		*
		*	yootil.storage.get("mykey", true, true) // Will look in persistent only
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
		* Method: remove
		* 	Removes a key from storage
		*
		* Parameters:
		*	key - *string* The key for the storage
		*	persist - *boolean* You can specify not to look in persistent by passing false or to look by passing true
		*
		* Returns:
		*	yootil.storage
		*
		* Examples:
		*	yootil.storage.remove("mykey") // Will look in session and persistent for key and remove it
		*
		*	yootil.storage.remove("mykey", false) // Will look in session only
		*
		*	yootil.storage.remove("mykey", true) // Will look in persistent only
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