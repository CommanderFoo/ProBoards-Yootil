/**
* Namespace: yootil.storage.session
*/

yootil.storage.session = (function(){
	
	function update_window(){
		if(yootil.storage.window_data){
			window.name = JSON.stringify(yootil.storage.window_data);
		}
	};
	
	return {
	
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
			
			return yootil.storage;
		},

		get: function(key){
			var value = "";
			
			if(yootil.storage.html5 && localStorage.length){
				value = sessionStorage.getItem(key);
			} else if(yootil.storage.window_data && yootil.storage.window_data[yootil.host] && yootil.storage.window_data[yootil.host][key]){
				value = yootil.storage.window_data[yootil.host][key];
			}
			
			return value;			
		},
		
		remove: function(key){
			if(yootil.storage.html5 && localStorage.length){
				sessionStorage.removeItem(key);
			} else if(yootil.storage.window_data && yootil.storage.window_data[yootil.host]){
				delete yootil.storage.window_data[yootil.host];
				update_window();
			}
			
			return yootil.storage;
		}
		
	};		

})();