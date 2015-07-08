/**
 * @class yootil.storage.persistent
 * @static
 * @ignore
 * Allows you to store a value that is peristent even after browser has closed.
 *
 * IE 7 is supported, and uses userData to handle the storage.
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
		 * Allows you to set a key and value.
		 *
		 *     yootil.storage.persistent.set("mykey", "myvalue");
		 *
		 * @param {String} key The key for the storage.
		 * @param {String} value The value that will be stored.
		 * @chainable
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
		 * Gets a value from storage in.
		 *
		 * @param {String} key The key for the storage.
		 * @return {String}
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
		 * Removes a key from storage
		 *
		 * @param {String} key The key for the storage.
		 * @chainable
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