/**
 * Splits up data between keys.  The order of the keys is very important if
 * you are joining later.
 *
 * Any left over data that cannot be put into a key is lost.  It's important you
 * check the data length doesn't exceed the total length of the keys.  Use the
 * "has_excess" method to see if there was any data remaining before saving.
 *
 * @example
 * let splitter = new yootil.key.splitter(["testy", "testy2"])
 *
 * splitter.split("123456789", 5); // Split 5 into each key
 *
 * if(!splitter.has_excess()){
 *     splitter.save(yootil.user.id());
 * } else {
 *     console.log("No space");
 * }
 */

yootil.key.splitter = class {

	/**
	 * @param {String|Array} keys=[] - The keys that the data will be split between.
	 */

	constructor(keys = []){
		if(!Array.isArray(keys)){
			keys = [keys];
		}

		/**
		 * @ignore
		 */

		this.keys = keys;

		/**
		 * @ignore
		 */

		this.excess_data = "";
		this.convert_keys_to_objs();
	}

	/**
	 * @ignore
	 */

	convert_keys_to_objs(){
		for(let [index, value] of this.keys.entries()){
			let obj = yootil.key(value);

			if(obj.exists()){
				this.keys[index] = {

					key: obj,
					data: ""

				};
			} else {
				delete this.keys[index];
			}
		}
	}

	/**
	 * Check to see if there is any excess data when splitting.
	 *
	 * @returns {Boolean}
	 */

	has_excess(){
		if(this.excess_data.length){
			return true;
		}

		return false;
	}

	/**
	 * Returns the excess data
	 *
	 * @returns {String}
	 */

	excess(){
		return this.excess_data;
	}

	/**
	 * The data pass in is what gets split between the keys.
	 *
	 * @param {Object} config
	 * @param {String|Object|Array} config.data="" - The data to be split.
	 * @param {Boolean} [config.json=true] - Split as JSON string
	 * @param {Number} [config.length=0] - The length of each chunk. It's recommended to not pass a value in.
	 *
	 * @return {Boolean}
	 */

	split({data = "", json = true, length = 0} = {}){
		if(!data || this.keys.length < 2){
			return false;
		}

		data = (json)? JSON.stringify(data) : data.toString();

		for(let obj of this.keys){
			let data_chunk = data.substr(0, (length || obj.key.max_space()));

			obj.data = data_chunk;

			data = data.substr(data_chunk.length, data.length);
		}

		this.excess_data = data || "";

		return true;
	}

	/**
	 * Call this method to save the data to the keys.
	 *
	 * @param {Number} [object_id=undefined] - ID of the object (i.e user).
	 *
	 * @return {Object} - Last key to be set gets that promise returned.
	 */

	save(object_id = undefined){
		let last = null;

		for(let obj of this.keys){
			last = obj.key.set(obj.data, object_id);
		}

		return last;
	}


};