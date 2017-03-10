/*

Front multi key pruner.

Will prune from the front and add to the end.  Use in combination with key pushing.  Atttempt
to push to the key, if it fails, prune it and save.


let pruner = new yootil.key.pruner({

	keys: ["test", "test2"],
	object_id: yootil.user.id()

});

pruner.prune(["G"]); // Prunes key and adds new elements to the end.

console.log(pruner.pruned_data()); // Gets the data that got pruned.

*/

yootil.key.pruner = class {

	constructor({keys = [], object_id = undefined} = {}){
		if(!Array.isArray(keys)){
			keys = [keys];
		}

		this.keys = keys;
		this.object_id = object_id;
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

	defrag(data = [], first_run = false){
		if(!first_run){
			for(let obj of this.keys){
				data = data.concat(obj.data);
				obj.data = [];
			}
		}

		// Write back to data

		keys_loop:
		for(let [index, obj] of this.keys.entries()){
			for(let i = 0; i < data.length; ++ i){
				let elem_len = JSON.stringify(data[i]).length;
				let key_data_length = JSON.stringify(obj.data).length;

				if(index == (this.keys.length -1)){
					obj.data.push(data[i]);
				} else if((key_data_length + elem_len) <= obj.key.max_space()){
					obj.data.push(data[i]);
					data.splice(i, 1);
					i --;
				} else {
					continue keys_loop;
				}
			}
		}
	}

	prune(add = []){
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

		all_data = all_data.concat(add);

		if(all_data.length){
			this.defrag(all_data, true);

			let last_obj = this.get_last_key_with_data();
			let first_obj = this.keys[0];

			while(JSON.stringify(last_obj.data).length >= last_obj.key.max_space()){
				this._pruned_data.push(first_obj.data.shift());
				this.defrag([]);
			}
		}

		return true;
	}

	get_last_key_with_data(){
		let last = null;

		for(let obj of this.keys){
			if(obj.data.length){
				last = obj;
			}
		}

		if(!last){
			last = this.keys[this.keys.length - 1];
		}

		return last;
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