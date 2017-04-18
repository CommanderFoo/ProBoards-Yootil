/**
 * Helper methods for plugin extensions.
 *
 * @example
 * yootil.extension.create({
 *
 *     plugin: "monetary",
 *     id: "test_money",
 *     events: {
 *
 *         pre_init(){
 *     	       console.log("pre");
 *         }
 *
 *         post_init(){
 *	           console.log("post");
 *         }
 *
 *         ready(){
 *	           console.log("ready");
 *         }
 *
 *     }
 *
 * });
 *
 * // The main plugin that supports extensions can then run any
 * // pre, init, post, and ready events at the correct place in
 * // the plugin.
 *
 * yootil.extension.run("monetary").pre_init();
 */

yootil.extension = class {

	/**
	 * @ignore
	 */

	static init(){
		this._plugin_extensions = new Map();

		return this;
	}

	/**
	 * Creates an extension for an existing plugin.
	 *
	 * @param {Object} config
	 * @param {String} config.plugin="" - The name of the plugin this extension is for.
	 * @param {String} config.id="" - The name of your extension plugin.
	 * @param {Object} config.events={} - The events that will be executed.
	 *
	 * @return {Object} yootil.extension
	 */

	static create({plugin = "", id = "", events = null} = {}){
		if(!plugin || !id || !events){
			return;
		}

		let plugin_name = plugin.toString().toUpperCase() + "_EXTENSIONS";
		let id_name = id.toString().toUpperCase();

		if(!this._plugin_extensions.has(plugin_name)){
			this._plugin_extensions.set(plugin_name, new Map());
		}

		this._plugin_extensions.get(plugin_name).set(id_name, events);

		return this;
	}

	/**
	 * For plugins to run various methods on extension classes.
	 *
	 * @param {String} plugin="" - The main plugin name that extensions will use.
	 *
	 * @return {Object} - 3 possible methods are then callable (pre_init, post_init, and ready).
	 */

	static run(plugin = ""){
		let methods = Object.create(null);

		methods.pre_inits = () => {
			if(!this.plugin_exists(plugin)){
				return;
			}

			let exts = this.fetch(plugin);

			for(let [ext_name, klass] of exts){
				if(typeof klass.pre_init != "undefined"){
					klass.pre_init();
				}
			}
		};

		methods.post_inits = () => {
			if(!this.plugin_exists(plugin)){
				return;
			}

			let exts = this.fetch(plugin);

			for(let [ext_name, klass] of exts){
				if(typeof klass.post_init != "undefined"){
					klass.post_init();
				}
			}
		};

		methods.ready = () => {
			if(!this.plugin_exists(plugin)){
				return;
			}

			let exts = this.fetch(plugin);

			for(let [ext_name, klass] of exts){
				if(typeof klass.ready != "undefined"){
					klass.ready();
				}
			}
		};

		return methods;
	}

	/**
	 * @ignore
	 */

	static plugin_exists(plugin = ""){
		return this._plugin_extensions.has(plugin.toUpperCase() + "_EXTENSIONS");
	}

	/**
	 * @ignore
	 */

	static exists(plugin = "", ext_name = ""){
		if(this.plugin_exists(plugin)){
			return this._plugin_extensions.get(plugin.toUpperCase() + "_EXTENSIONS").has(ext_name.toUpperCase());
		}

		return false;
	}

	/**
	 * @ignore
	 */

	static fetch(plugin = ""){
		if(this.plugin_exists(plugin)){
			return this._plugin_extensions.get(plugin.toUpperCase() + "_EXTENSIONS");
		}

		return null;
	}

	/**
	 * @ignore
	 */

	static get plugin_extensions(){
		return this._plugin_extensions
	}

};

yootil.extension.init();