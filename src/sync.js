/**
 * @class yootil.sync
 *
 * let my_key = yootil.key("my_key");
 * let sync = new Sync({key: "my_key", data: my_key.get(yootil.user.id())});
 *
 * sync.update(my_key.get()); // Called after setting key
 *
 * @constructor
 */

yootil.sync = class {

	constructor({key = "", data = {}, handler = {}} = {}){
		if(!key){
			return;
		}

		this._trigger_caller = false;
		this._change = (handler && handler.change)? handler.change : this.change;
		this._key = key;
		this._ls_key = key + "_data_sync_" + yootil.user.id();

		// Need to set the storage off the bat

		yootil.storage.set(this._key, data, true, true);

		// Delay adding event (IE issues yet again)

		setTimeout(() => $(window).on("storage", (evt) => {
			if(evt && evt.originalEvent && evt.originalEvent.key == this._key){

				// IE fix

				if(this._trigger_caller){
					this._trigger_caller = false;
					return;
				}

				let event = evt.originalEvent;
				let old_data = event.oldValue;
				let new_data = event.newValue;

				// If old == new, don't do anything

				if(old_data != new_data){
					this._change.bind((handler && handler.change)? handler : this, JSON.parse(new_data), JSON.parse(old_data))();
				}
			}
		}), 100);
	}

	// For outside calls to trigger a manual update

	update(data = {}){
		this._trigger_caller = true;
		yootil.storage.set(this._key, data, true, true);
	}

	change(new_data, old_data){
		let internal_key_data = proboards.plugin.keys.data[this._key];

		if(internal_key_data){
			internal_key_data[yootil.user.id()] = new_data;
		}
	}

	get key(){
		return this._key;
	}

	get local_key(){
		return this._ls_key;
	}

};