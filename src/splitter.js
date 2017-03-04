/*

let splitter = new yootil.key.splitter(["testy", "testy2"])

splitter.split("123456789", 3);
splitter.save(yootil.user.id());

*/

/**
 * Splits up data between keys.  The order of the keys is very important if
 * you are joining later.
 *
 * Any left over data that cannot be put into a key is lost.  It's important you
 * check the data length doesn't exceed the total length of the keys.  Use the
 * "has_excess" method to see if there was any data remaining before saving.
 */

yootil.key.splitter = class {

	/**
	 * @param {String|Array} keys The keys that the data will be split between.
	 */

	constructor(keys = []){
		if(!Array.isArray(keys)){
			keys = [keys];
		}

		this.keys = keys;
		this.excess_data = "";
		this.convert_keys_to_objs();
	}

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

	has_excess(){
		if(this.excess_data.length){
			return true;
		}

		return false;
	}

	excess(){
		return this.excess_data;
	}

	/**
	 * The data pass in is what gets split between the keys.
	 *
	 * @param {String|Object|Array} data The data to be split.
	 * @param {Number} chunk_len The length of each chunk. It's recommended to not pass a value in.
	 * @returns {Boolean}
	 */

	split(data = "", chunk_len = 0){
		if(!data || this.keys.length < 2){
			return false;
		}

		data = JSON.stringify(data);

		for(let obj of this.keys){
			let data_chunk = data.substr(0, (chunk_len || obj.key.max_space()));

			obj.data = data_chunk;

			data = data.substr(data_chunk.length, data.length);
		}

		this.excess_data = data || "";

		return true;
	}

	/**
	 * Call this method to save the data to the keys.
	 *
	 * @param {Number} object_id ID of the object (i.e user)
	 * @returns {Object} Last key to be set gets that promise returned.
	 */

	save(object_id = undefined){
		let last = null;

		for(let obj of this.keys){
			last = obj.key.set(obj.data, object_id);
		}

		return last;
	}


};