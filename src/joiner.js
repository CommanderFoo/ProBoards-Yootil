/**
 * Joins key data.
 *
 * @example
 * let joiner = new yootil.key.joiner(["testy", "testy2"])
 *
 * console.log(joiner.data(yootil.user.id()));
 */

yootil.key.joiner = class {

	/**
	 * @param {String|Array} keys=[] - The keys that has data that will be joined.
	 * @param {Number} [object_id=undefined] - The ID for this key object (e.g. user ID).
	 */

	constructor({keys = [], object_id = undefined} = {}){
		if(!Array.isArray(keys)){
			keys = [keys];
		}

		this.object_id = object_id;
		this.keys = keys;
	}

	/**
	 * Returns the data joined.
	 *
	 * @param {Boolean} [json=true] - Pass false to not JSON parse the data.
	 *
	 * @return {String|Object|Array}
	 */

	data(json = true){
		if(this.keys.length){
			let data = "";
			let data_is_array = false;

			for(let key of this.keys){
				let the_data = yootil.key(key).get(this.object_id);

				if(Array.isArray(the_data)){
					data_is_array = true;

					if(!Array.isArray(data)){
						data = [];
					}

					data = data.concat(the_data);
				} else if(!data_is_array){
					data += the_data || ""
				}
			}

			if(!Array.isArray(data) && (json && yootil.is_json(data))){
				data = JSON.parse(data);
			}

			return data;
		}

		return null;
	}
};