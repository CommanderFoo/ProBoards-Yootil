/**
 * @class yootil.page
 * @ignore
 * Wrapper around the ProBoards data object "page".
 */

yootil.page = (function(){

	return {

		/**
		 * This is an internal method
		 *
		 * @param {String} key The key on the page object to check and get
		 * @return [String}
		 */
		
		__get_data: function(key){
			if(proboards && proboards.dataHash && proboards.dataHash.page && typeof proboards.dataHash.page[key] != "undefined"){
				return proboards.dataHash.page[key];
			}
			
			return "";
		}
	
	};

})();