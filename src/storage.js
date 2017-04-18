/**
 * Wrappers for session and persistent storage.
 */

yootil.storage = class {

	/**
	 *  Allows you to set a key and value, along with some other settings.
	 *
	 * @example
	 * yootil.storage.set("mykey", "myvalue") // Will be persistent
	 *
	 * @example
	 * yootil.storage.set("mykey", "myvalue". false, false) // Will be for the session
	 *
	 * @param {String} key - The key name for the storage.
	 * @param {String} value="" - The value that will be stored.
	 * @param {Boolean}	[json=false] - If true, the value will be turned into a JSON string.
	 * @param {Boolean} [persist=true] - By default the value is stored persistently, pass false to use session.
	 *
	 * @return {Object} yootil.storage
	 */

	static set(key, value = "", json = false, persist = true){
		if(key){
			value = (json && !yootil.is_json(value))? JSON.stringify(value) : value;
		}

		if(persist){
			localStorage.setItem(key, value);
		} else {
			sessionStorage.setItem(key, value);
		}

		return this;
	}

	/**
	 * Gets a value from storage in either session or persistent.
	 *
	 * @example
	 * yootil.storage.get("mykey", false, false) // Will look in session only
	 *
	 * @example
	 * yootil.storage.get("mykey", true, true) // Will look in persistent only
	 *
	 * @param {String} key - The key name for the storage.
	 * @param {Boolean} [json=false] - If true, the value will be JSON parsed.
	 * @param {Boolean} [persist=true] - You can specify not to look in persistent by passing false.
	 *
	 * @return {String|Object}
	 */

	static get(key, json = false, persist = true){
		let value = "";

		if(key){
			if(persist){
				value = localStorage.getItem(key);
			} else {
				value = sessionStorage.getItem(key);
			}

			if(json && yootil.is_json(value)){
				value = JSON.parse(value);
			}
		}

		return value;
	}

	/**
	 * Removes a key from storage
	 *
	 * @example
	 * yootil.storage.remove("mykey", false) // Will look in session only
	 *
	 * @example
	 * yootil.storage.remove("mykey", true) // Will look in persistent only
	 *
	 * @param {String} key - The key name for the storage.
	 * @param {Boolean} [persist=true] - You can specify not to look in persistent by passing false.
	 *
	 * @return {Object} yootil.storage
	 */

	static remove(key, persist = true){
		if(key){
			if(persist){
				localStorage.removeItem(key);
			} else {
				sessionStorage.removeItem(key);
			}
		}

		return this;
	}

	/**
	 * Clears everything from storage
	 *
	 * @param {Boolean} [persist=true] - If true, will clean persistent storage, or false will clear session.  Default is true.
	 *
	 * @return {Object} yootil.storage
	 */

	static clear(persist = true){
		if(persist){
			localStorage.clear();
		} else {
			sessionStorage.clear();
		}

		return this;
	}

};