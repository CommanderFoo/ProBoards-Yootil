/**
* Namespace: yootil.storage
*/

yootil.storage = (function(){
	
	var window_data = {};
	var html5 = false;
	
	if("sessionStorage" in window && "localStorage" in window){
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
		
		get: function(key, json, persist){
			var value = "";
			
			if(key){
				if(persist){
					value = yootil.storage.persistent.get(key);
				} else {
					value = yootil.storage.session.get(key);
				}
				
				if(json){
					value = JSON.parse(value);
				}
			}
			
			return value;
		},
		
		remove: function(key, persist){
			if(key){
				if(persist){
					yootil.storage.persistent.remove(key);
				} else {
					yootil.storage.session.remove(key);
				}
			}
			
			return this;	
		}
		
	};

})();