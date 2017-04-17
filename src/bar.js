/**
 * Mimics the ProBoards bar, but on the left and for plugins.
 */

yootil.bar = class {

	/**
	 * @ignore
	 */

	static init(){
		if(!yootil.settings.bar.enabled){
			return;
		}

		this.setup();
		this.create_bar();
		this._items = new Map();
	}

	/**
	 * @ignore
	 */

	static setup(){
		let position = yootil.settings.bar_position;

		this._settings = {

			enabled: yootil.settings.bar.enabled,
			position: "yootil-bar-bottom-left",
			setting: position,
			custom: null

		};

		switch(position){

			case 1 :
				this._settings.position = "yootil-bar-top-left";
				break;

			case 2 :
				this._settings.position = "yootil-bar-top-center";
				this._settings.custom = {

					left: $(window).width() / 2

				};

				break;

			case 3 :
				this._settings.position = "yootil-bar-top-right";
				break;

			case 4 :
				this._settings.position = "yootil-bar-bottom-left";
				break;

			case 5 :
				this._settings.position = "yootil-bar-bottom-center";
				this._settings.custom = {

					left: $(window).width() / 2

				};

				break;

			case 6 :
				this._settings.position = "yootil-bar-bottom-right";
				break;

			case 7 :
				this._settings.position = "yootil-bar-left-middle";
				this._settings.custom = {

					top: $(window).height() / 2

				};

				break;

			case 8 :
				this._settings.position = "yootil-bar-right-middle";
				this._settings.custom = {

					top: $(window).height() / 2

				};

				break;

		}
	}

	/**
	 * Add an item to the Yootil Bar.
	 *
	 * @example
	 * yootil.bar.add({url: "http://proboards.com", img: "http://example.com/someimage.png", alt: "Hello World"});
	 *
	 * @param {Object} config
	 * @param {String} config.link="" - URL for the item.
	 * @param {String} config.img="" - URL for the image.
	 * @param {String} [config.alt=""] - Alt / title for the image.
	 * @param {String} [config.key=""] - Pass in a unique key if you wish to have the option to remove it later.
	 * @param {Function} [config.func=null] - Pass function to be executed when clicked on.
	 * @param {Object} [config.context=null] - Context of the function being passed.
	 *
	 * @return {Object} yootil.bar
	 */

	static add({url = "", img = "", alt = "", key = "", func = null, context = null} = {}){
		if(!this._settings.enabled){
			return;
		}

		if(url && img){
			let line_break = "";

			if(this._settings.position == 7 || this._settings.position == 8){
				line_break = "<br />";
			}

			let $item = $("<a href='" + url + "'><img src='" + img + "' alt='" + alt + "' title='" + alt + "' />" + line_break + "</a>");

			if(line_break.length){
				$item.addClass("yootil-bar-item-block");
			}

			if(func && typeof func == "function"){
				$item.click(func.bind(context));
			}

			if(key && key.toString().length){
				this._items.set(key, $item);
			}

			this._plugin_bar.find("#yootil-bar").append($item);

			this.reposition_top();
			this.reposition_left();
		}

		if(this._plugin_bar.find("#yootil-bar a").length > 0){
			this._plugin_bar.show();
		}

		return this;
	}

	/**
	 * Remove an item to the Yootil Bar.
	 *
	 * @example
	 * yootil.bar.remove("myitem");
	 *
	 * @param {String} key="" - The unique key used when adding the item.
	 *
	 * @return {Object} yootil.bar
	 */

	static remove(key = ""){
		key = key.toString();

		if(key && this._items.has(key)){
			this._items.get(key).remove();
			this._items.delete(key);

			if(this._plugin_bar.find("#yootil-bar a").length == 0){
				this._plugin_bar.css("display", "none");
			} else {
				this.reposition_left();
				this.reposition_top();
			}
		}

		return this;
	}

	/**
	 * Checks to see if the bar is enabled.
	 *
	 * @example
	 * if(yootil.bar.enabled()){
	 *     console.log("Bar is enabled");
	 * }
	 *
	 * @return {Boolean}
	 */

	static enabled(){
		return yootil.settings.bar.enabled;
	}

	/**
	 * Gets the total items in the bar.
	 *
	 * @return {Number}
	 */

	static total_items(){
		return this._items.length;
	}

	/**
	 * @ignore
	 */

	static reposition_left(){
		let position = this._settings.bar_position;

		if(position == 2 || position == 5){
			this._plugin_bar.css("left", (($(window).width() / 2) - (this._plugin_bar.width() / 2)));
		}
	}

	/**
	 * @ignore
	 */

	static reposition_top(){
		let position = yootil.settings.bar.position;

		if(position == 7 || position == 8){
			this._plugin_bar.css("top", (($(window).height() / 2) - (this._plugin_bar.height() / 2)));
		}
	}

	/**
	 * @ignore
	 */

	static create_bar(){
		let $bar = $("<div id='yootil-bar-wrapper'><div id='yootil-bar'></div></div>").addClass(this._settings.position);

		if(this._settings.custom){
			$bar.css(this._settings.custom);
		}

		// If the PB bar exists, lets move it above it

		if(this._settings.setting == 6){
			if($("#pbn-bar-wrapper").length){
				$bar.addClass("yootil-bar-offset");
			}
		}

		$(() => $("body").append($bar));
		this._plugin_bar = $bar;
	}

	/**
	 * @ignore
	 */

	static get settings(){
		return this._settings;
	}

};