/**
* Namespace: yootil
*
* 	yootil contains helpful methods to help plugin developers develop quicker.
*
* 	There are various methods, some are just wrappers around ProBoards API.
*
*
*	Project - https://github.com/pixelDepth/Yootil
*
*	Compressed - http://yootil.pixeldepth.net/yootil.min.js
*
*	Experimental - http://yootil.pixeldepth.net/yootil.src.js
*
*	Plugin - http://yootil.pixeldepth.net/yootil.library.pbp
*
*	Topic - http://support.proboards.com/index.cgi?action=display&board=plugindatabase&thread=429360
*/

yootil = (function(){

	return {
		
		host: location.hostname,
		
		/**
		* Method: html_encode
		*	Makes a value safe for inserting into the DOM.
		*
		* Parameters:
		* 	value - *string* The value you want returned to be safe.
		*
		* Returns:
		* 	*string* The safe value.
		*
		* Examples:
		*	var safe_html = yootil.html_encode("<b>this won't be bold</b>");
		*/
		
		html_encode: function(value){
			value = (value)? value : "";
			
			return $("<div />").text(value).html();
		},

		/**
		* Method: html_decode
		*	Converts back to HTML
		*
		* Parameters:
		* 	value - *string* The value you want returned to be HTML string.
		*
		* Returns:
		*	*string* The HTML string value.
		*
		* Examples:
		*	var html = yootil.html_decode("<b>this will be bold</b>");
		*/
		
		html_decode: function(value){
			value = (value)? value : "";
			
			return $("<div />").html(value).text();
		},
		
		/**
		* Method: number_format
		* 	Formats numbers so they look pretty (i.e 1,530).
		*
		* Parameters:
		* 	str - *string* The value to format.
		*	delim - *string* The delimiter between each block (i.e 100.000.000, 100,000,000).
		*
		* Returns:
		*	*string* Formatted string.
		*
		* Examples:
		*	yootil.number_format(1000); // 1,000
		*/
		
		number_format: function(str, delim){
			str = (str)? str : "";
			delim = (delim)? delim : ",";

			return (str.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + delim) || "0");
		},
		
		/**
		* Method: is_json
		*	Checks to see if string passed in is a valid JSON string
		*
		* Parameters:
		*	str - *string* This is the string that is getting checked for valid JSON
		*	return_obj - *boolean* If true, the string will be parsed and returned back
		*
		* Returns:
		*	*boolean* / *object*
		*/
		
		is_json: function(str, return_obj){
			try {
				str = JSON.parse(str);
			} catch(e){
				return false;
			}
			
			if(return_obj){
				return str;
			}
			
			return true;
		},
		
		/**
		* Method: pad
		*	 Pad a string to a certain length with another string on the left or right side of passed in string.
		*
		* Parameters:
		*	str - *string* This is the string that is going to be padded
		*	len - *integer* The length of the string to be returned
		*	pad_str - *string* The string to pad with
		*	pad_pos - *mixed* Position of the padding, can be 1, "RIGHT", for right padding.  Default is left.
		*
		* Returns:
		*	*string*
		*
		* Examples:
		*	yootil.pad(5, 6, "0"); // 000005
		*
		*	yootil.pad(5, 6, "#", "RIGHT"); // 5#####
		*/
		
		pad: function(str, len, pad_str, pad_pos){
			var pad_str = (pad_str)? pad_str : "0";
			var len = (len)? len : 8;
			var pad_pos = (pad_pos)? pad_pos : 0;
			
			while(str.toString().length < len){
				switch(pad_pos.toString()){
				
					case "1" :
					case "RIGHT" :
					case "right" :
						str = str.toString() + pad_str;
						break;
						
					default :
						str = pad_str + str.toString();
				
				}
			}
			
			return str;
		}
	
	};
	
})();