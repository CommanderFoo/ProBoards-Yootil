/**
 * @class yootil.storage.session
 * @static
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