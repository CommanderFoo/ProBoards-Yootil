/*

let pruner = new yootil.key.pruner({

	keys: ["test", "test2"],
	from: "front"

});

pruner.prune({

	add: ["G"],
	to: "end"

});

*/

yootil.key.pruner = class {

	constructor({keys = [], object_id = undefined, from = "front"} = {}){
		if(!Array.isArray(keys)){
			keys = [keys];
		}

		this.keys = keys;
		this.object_id = object_id;
		this.prune_from = from;
		this._pruned_data = [];
		this.convert_keys_to_objs();
	}

	convert_keys_to_objs(){
		for(let [index, value] of this.keys.entries()){
			let obj = yootil.key(value);

			if(obj.exists()){
				this.keys[index] = {

					key: obj,
					data: []

				};
			} else {
				delete this.keys[index];
			}
		}
	}

	defrag(all_data = []){

		// Clear data first

		for(let obj of this.keys){
			obj.data = [];
		}

		// Write back to data

		for(let obj of this.keys){
			for(let i = 0; i < all_data.length; ++ i){
				let elem_len = JSON.stringify(all_data[i]).length;
				let key_data_length = JSON.stringify(obj.data).length;

				if((key_data_length + elem_len) <= obj.key.max_space()){
					obj.data = obj.data.concat(all_data[i]);
					all_data.splice(i, 1);
					i --;
				}
			}
		}
	}

	prune({add = [], to = "end"} = {}){
		if(!add || !this.keys.length){
			return false;
		}

		if(!Array.isArray(add)){
			add = [add];
		}

		let all_data = [];

		for(let obj of this.keys){
			let data = obj.key.get(this.object_id);

			if(Array.isArray(data)){
				all_data = all_data.concat(data);
			}
		}

		let new_data_len = JSON.stringify(add).length;

		if(to == "end"){
			all_data = all_data.concat(add);
		} else {
			all_data = data.concat(all_data);
		}

		if(all_data.length){
			this.defrag(all_data, new_data_len);

			console.log(this.keys);
		}
			/*let counter = 0;

			for(let obj of this.keys){
				let max_len = obj.key.max_space();
				let all_data_len = all_data.length;

				for(let i = 0; i < all_data_len; ++ i){
					if(typeof all_data[i] != "undefined"){
						let add_len = 0;

						if((!i && !counter && to == "front") || (to == "end" && i == (all_data.length - 1) && counter == (this.keys.length - 1))){
							add_len = new_data_len;
						}

						let elem_len = JSON.stringify(all_data[i]).length + JSON.stringify(obj.data).length + add_len;

						if(elem_len <= max_len){
							obj.data = obj.data.concat(all_data[i]);
							all_data.splice(i, 1);
							i --;
						}
					}
				}

				counter ++;
			}*/

			/*if(to == "front"){
				let f_key = this.keys[0];
				let first_key_len = JSON.stringify(f_key.data).length;

				if((first_key_len + JSON.stringify(add).length) <= f_key.key.max_space()){
					f_key.data = add.concat(f_key.data);
				} else {
					return false;
				}
			} else {

				let l_key = null;
				let l_key_index = 0;
				let last_key_len = 0;

				// Need to find last key with space left

				let cloned_keys = Array.from(this.keys);
				let key_counter = cloned_keys.length - 1;

				while(key_counter >= 0){
					let key_obj = this.keys[key_counter];

					if(key_obj.key.space_left() >= JSON.stringify(add).length){
						l_key = key_obj;
						l_key_index = key_counter;
						last_key_len = key_obj.key.length();
					}

					key_counter --;
				}

				if(l_key && (last_key_len + JSON.stringify(add).length) <= l_key.key.max_space()){
					this.keys[l_key_index].data = this.keys[l_key_index].data.concat(add);
				} else {
					return false;
				}
			}

			if(all_data.length){
				this._pruned_data = all_data;
			}
		} else if(new_data_len <= max_len){
			this.keys[0].data = add;
		} else {
			return false;
		}*/

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
			let data = (obj.data.length == 0)? "" : obj.data;

			last = obj.key.set(data, object_id);
		}

		return last;
	}

	pruned_data(){
		return this._pruned_data;
	}

};