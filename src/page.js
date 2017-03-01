/**
 * @class yootil.page
 * @ignore
 * Wrapper around the ProBoards data object "page".
 */

yootil.page = class {

	/**
	 * This is an internal method
	 *
	 * @param {String} key The key on the page object to check and get
	 * @return {String|Object|Array|Number}
	 */

	static __get_data(key){
		if(proboards && proboards.dataHash && proboards.dataHash.page && typeof proboards.dataHash.page[key] != "undefined"){
			return proboards.dataHash.page[key];
		}

		return "";
	}

};