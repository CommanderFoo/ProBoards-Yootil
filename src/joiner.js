/*

 let joiner = new yootil.key.joiner(["testy", "testy2"])

 console.log(joiner.data(yootil.user.id()));

 */

yootil.key.joiner = class {

	/**
	 * @param {String|Array} keys The keys that has data that will be joined.
	 * @param {Number} object_id
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
	 * @param {Boolean} json Pass false to not JSON parse the data.
	 * @returns {String|Object}
	 */
	data(json = true){
		if(this.keys.length > 1){
			let data = "";

			for(let key of this.keys){
				data += yootil.key(key).get(this.object_id);
			}

			if(json && yootil.is_json(data)){
				data = JSON.parse(data);
			}

			return data;
		}

		return null;
	}
};