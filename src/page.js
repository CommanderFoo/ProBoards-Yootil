/**
* Namespace: yootil.page
*	Wrapper around the ProBoards data object "page".
*/

yootil.page = (function(){

	return {
	
		/**
		* Method: __get_data
		*	This is an internal method
		*
		* Parameters:
		*	key - *string* The key on the page object to check and get
		*
		* Returns:
		*	*string*
		*/
		
		__get_data: function(key){
			if(proboards && proboards.dataHash && proboards.dataHash.page && typeof proboards.dataHash.page[key] != "undefined"){
				return proboards.dataHash.page[key];
			}
			
			return "";
		}
	
	};

})();