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
		*	yootilS.number_format(1000); // 1,000
		*/
		
		number_format: function(str, delim){
			str = (str)? str : "";
			delim = (delim)? delim : ",";

			return (str.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + delim) || "0");
		}
	
	};
	
})();