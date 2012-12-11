/**
* Namespace: yootil.storage.persistent
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
		
		set: function(key, value){
			if(storage_element){
				storage_element.setAttribute(key, value);
				storage_element.save();
			} else if(yootil.storage.html5){
				localStorage.setItem(key, value);
			}
			
			return yootil.storage;
		},
		
		get: function(key){
			var value = "";
			
			if(storage_element){
				value = storage_element.getAttribute(key);
			} else if(yootil.storage.html5 && localStorage.length){
				value = localStorage.getItem(key);
			}
			
			return value;
		},
		
		remove: function(key){
			if(storage_element){
				storage_element.removeAttribute(key);
			} else if(yootil.storage.html5 && localStorage.length){
				localStorage.removeItem(key);
			}
			
			return yootil.storage;
		}
		
	};

})();