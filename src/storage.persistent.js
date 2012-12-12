/**
* Namespace: yootil.storage.persistent
*	Allows you to store a value that is peristent even after browser has closed.
*
*	IE 7 is supported, and uses userData to handle the storage.
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
		* Method: set
		* 	Allows you to set a key and value.
		*
		* Parameters:
		*	key - *string* The key for the storage
		*	value - *string* The value that will be stored
		*
		* Returns:
		*	yootil.storage.persistent
		*
		* Examples:
		*	yootil.storage.persistent.set("mykey", "myvalue");
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
		*	yootil.storage.persistent.get("mykey");
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
		* Method: remove
		* 	Removes a key from storage
		*
		* Parameters:
		*	key - *string* The key for the storage
		*
		* Returns:
		*	yootil.storage.persistent
		*
		* Examples:
		*	yootil.storage.persistent.remove("mykey");
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