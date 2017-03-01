/**
 * @class yootil.extension
 * @static
 *
 * Helper methods for plugin extensions.
 *
 *     yootil.extension.create({
 *
 *         plugin: "monetary",
 *         id: "test_money",
 *         handlers: {
 *
 *              init(){
 *                  console.log("init");
 *              }
 *
 *              pre_init(){
 *     	           console.log("pre");
 *              }
 *
 *              post_init(){
 *	                console.log("post");
 *              }
 *
 *              ready(){
 *	                console.log("ready");
 *              }
 *
 *         }
 *
 *     });
 *
 * The main plugin that supports extensions can then run any
 * pre, init, post, and ready events at the correct place in
 * the plugin.
 *
 *     yootil.extension.run("monetary").inits();
 *
 */

yootil.extension = (class {

	static init(){
		this._plugin_extensions = new Map();

		return this;
	}

	/**
	 * Creates an extension for an existing plugin.
	 *
	 * @param {String} plugin The name of the plugin this extension is for.
	 * @param {String} id The name of your extension plugin.
	 * @param {Object} handlers The handlers will be executed.
	 */

	static create({plugin = "", id = "", handlers = null} = {}){
		if(!plugin || !key || !handlers){
			return;
		}

		let plugin_name = plugin.toString().toUpperCase() + "_EXTENSIONS";
		let id_name = id.toString().toUpperCase();

		if(!this._plugin_extensions.has(plugin_name)){
			this._plugin_extensions.set(plugin_name, new Map());
		}

		this._plugin_extensions.get(plugin_name).set(id_name, handlers);

		return this;
	}

	/**
	 * For plugins to run various methods on extension classes.
	 *
	 * @param {String} plugin The main plugin name that extensions will use.
	 * @returns {Object} 4 possible methods are then callable (pre_init, init, post_init, and ready).
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

		methods.inits = () => {
			if(!this.plugin_exists(plugin)){
				return;
			}

			let exts = this.fetch(plugin);

			for(let [ext_name, klass] of exts){
				if(typeof klass.init != "undefined"){
					klass.init();
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

	static plugin_exists(plugin = ""){
		return this._plugin_extensions.has(plugin.toUpperCase() + "_EXTENSIONS");
	}

	static exists(plugin = "", ext_name = ""){
		if(this.plugin_exists(plugin)){
			return this._plugin_extensions.get(plugin.toUpperCase() + "_EXTENSIONS").has(ext_name.toUpperCase());
		}

		return false;
	}

	static fetch(plugin = ""){
		if(this.plugin_exists(plugin)){
			return this._plugin_extensions.get(plugin.toUpperCase() + "_EXTENSIONS");
		}

		return null;
	}

	static get plugin_extensions(){
		return this._plugin_extensions
	}

}).init();