/**
* Namespace: yootil.storage
*	A helpful wrapper for storing data for the session in window.name for the current host.
*
*	The data stored will be a json string.
*
*	The data is only stored for the session in the current window / tab.  If the user opens
*	another tab or window, the data is lost.
*/

yootil.storage = (function(){

	return {
	
		/**
		* Property: win_data
		*	*object* Holds the current value from window.name as an object.
		*/
		
		win_data: null,
				
		/**
		* Property: host
		*	*string* The current host.
		*/
		
		host: location.hostname,
		
		/**
		* Method: parse_data
		*	This is used to check that the data from window.name exists, is valid json, and for this host.
		*	This only sets win_data once if it's null.
		*/
		
		parse_data: function(){	
			if(this.win_data === null){
				var win_data_string = window.name;
			
				if(!win_data_string || !win_data_string.length){
					this.win_data = {};
				} else {
					var obj;
					
					if(obj = yootil.is_json(win_data_string, true)){
						this.win_data = obj;
					} else {
						this.win_data = {};
					}
				}
			}
		},
		
		/**
		* Method: set
		*	Sets a key on the current host object of win_data
		*
		* Parameters:
		*	key - *string*
		*	value - *string*
		*
		* Returns:
		*	yootil.storage
		*/
		
		set: function(key, value){
			this.parse_data();
			
			if(!this.win_data[this.host]){
				this.win_data[this.host] = {};
			}
			
			this.win_data[this.host][key] = value;
			this.update_window();
			
			return this;
		},

		/**
		* Method: get
		*	Gets a value from the host object
		*
		* Parameters:
		*	key - *string*
		*
		* Returns:
		*	*string*
		*/
				
		get: function(key){
			this.parse_data();
			
			if(this.win_data && this.win_data[this.host] && this.win_data[this.host][key]){
				return this.win_data[this.host][key];
			}
			
			return "";			
		},

		/**
		* Method: clear
		*	Clears the host object
		*
		* Returns:
		*	yootil.storage
		*/
		
		clear: function(key){
			this.parse_data();
			
			if(this.win_data && this.win_data[this.host]){
				delete this.win_data[this.host];
				this.update_window();
			}
			
			return this;
		},
		
		/**
		* Method: update_window
		*	Sets the window.name value
		*/
		
		update_window: function(){
			if(this.win_data){
				window.name = JSON.stringify(this.win_data);
			}
		}
	
	};

})();