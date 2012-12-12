/**
* Namespace: yootil.storage.session
*	Allows you to store a value for the session.
*
*	HTML 5 is used if available, otherwise uses window.name
*/

yootil.storage.session = (function(){
	
	function update_window(){
		if(yootil.storage.window_data){
			window.name = JSON.stringify(yootil.storage.window_data);
		}
	};
	
	return {

		/**
		* Method: set
		* 	Allows you to set a key and value.
		*
		* Parameters:
		*	key - *string* The key for the storage
		*	value - *string* The value that will be stored
		*
		* Returns:
		*	yootil.storage.session
		*
		* Examples:
		*	yootil.storage.session.set("mykey", "myvalue");
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
		* Method: get
		* 	Gets a value from storage in.
		*
		* Parameters:
		*	key - *string* The key for the storage
		*
		* Returns:
		*	*string*
		*
		* Examples:
		*	yootil.storage.session.get("mykey");
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
		* Method: remove
		* 	Removes a key from storage
		*
		* Parameters:
		*	key - *string* The key for the storage
		*
		* Returns:
		*	yootil.storage.session
		*
		* Examples:
		*	yootil.storage.session.remove("mykey");
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