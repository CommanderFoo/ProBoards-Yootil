/*
The MIT License (MIT)

Copyright (c) 2017 pixeldepth.net - http://support.proboards.com/user/2671

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/**
 * @class yootil
 * @static
 * Yootil is a utility library for ProBoards.  It was designed to help plugin developers develop quicker.
 *
 * The "yootil" namespace encapsulates all of the utilities and classes.
 *
 * <a href="https://github.com/PopThosePringles/ProBoards-Yootil">GitHub Repository</a> |
 * <a href="http://support.proboards.com/index.cgi?action=display&board=plugindatabase&thread=429360">ProBoards Forum Topic</a> |
 * <a href="https://www.proboards.com/library/plugins/item/38">ProBoards Plugin Library Link</a>
 */

class yootil {

	static init(){
		this._PLUGIN = "pixeldepth_yootil";
		this._called = this.timestamp();
		this._version = "2.0.0";

		this._notifications_queue = {};

		this._months = [

			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"

		];

		this._days = [

			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"

		];

		this._textarea = document.createElement("textarea");

		this.settings.init();
		this.setup();
		this.bar.init();
	}

	static setup(){
		let plugin = pb.plugin.get(this._PLUGIN);
		let settings = (plugin && plugin.settings)? plugin.settings : false;

		if(settings){
			this.settings.bar.enabled = (settings.bar_enabled == 1)? (!! settings.bar_enabled) : true;
			this.settings.bar.position = (settings.bar_position > 0)? (~~ settings.bar_position) : 4;

			if(plugin.images){
				this.settings.images = plugin.images;
			}
		}
	}

	/**
	 * Makes a string safe for inserting into the DOM.
	 *
	 *     let safe_html = yootil.html_encode("<b>this won't be bold</b>");
	 *
	 * @param {String} str The value you want returned to be safe.
	 * @param {Boolean} decode_first Pass true if you want to decode before encoding to prevent double encoding.
	 * @return {String} The safe value.
	 */

	static html_encode(str = "", decode_first = false){
		str = (decode_first)? this.html_decode(str) : str;

		return $("<div />").text(str).html();
	}

	/**
	 * Converts back to HTML
	 *
	 *     let html = yootil.html_decode("<b>this will be bold</b>");
	 *
	 * @param {String} str The string you want returned to be an HTML string.
	 * @return {String} The HTML string.
	 */

	static html_decode(str = ""){
		this._textarea.innerHTML = str;

		let val = this._textarea.value;

		this._textarea.innerHTML = "";

		return val;
	}

	/**
	 * Formats numbers so they look pretty (i.e 1,530).
	 *
	 *     yootil.utils.number_format(1000); // 1,000
	 *
	 * @param {String} str The string to format.
	 * @param {String} [delim] The delimiter between each block (i.e 100.000.000, 100,000,000).
	 * @return {String} Formatted string.
	 */

	static number_format(str = "", delim = ","){
		return (str.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + delim) || "0");
	}

	/**
	 * Checks to see if string passed in is a valid JSON string.
	 *
	 *     yootil.is_json("{\"hello\":\"world\"}");
	 *
	 * @param {String} str This is the string that is getting checked for valid JSON.
	 * @param {Boolean} [return_obj] If true, the string will be parsed and returned back.
	 * @return {Object|Boolean}
	 */

	static is_json(str = "", return_obj = false){
		try {
			str = JSON.parse(str);
		} catch(e){
			return false;
		}

		if(return_obj){
			return str;
		}

		return true;
	}

	/**
	 * Creates a timestamp.
	 *
	 * @return {Number}
	 */

	static timestamp(){
		return (+ new Date());
	}

	/**
	 * Checks a number and returns the correct suffix to be used with it.
	 *
	 *     yootil.suffix(3); // "rd"
	 *
	 * @param {Number} n The number to be checked.
	 * @return {String}
	 */

	static suffix(n = 0){
		let j = (n % 10);

		if(j == 1 && n != 11){
			return "st";
		}

		if(j == 2 && n != 12){
			return "nd";
		}

		if(j == 3 && n != 13) {
			return "rd";
		}

		return "th";
	}

	/**
	 * Gets a day from the days array.
	 *
	 *     yootil.day(1); // "Mon"
	 *
	 * @param {Number} index Indexing starts at 0, with Sunday being 0.
	 * @param {Boolean} full Returns full day name.
	 * @return {String}
	 */

	static day(index = 0, full = false){
		if(index >= 0 && index < this._days.length){
			return this._days[index].substr(0, ((full)? 9 : 3));
		}

		return "";
	}

	/**
	 * Gets a month from the months array.
	 *
	 *     yootil.month(2); // "Mar"
	 *
	 * @param {Number} index Indexing starts at 0.
	 * @param {Boolean} full Returns full month name.
	 * @return {String}
	 */

	static month(index = 0, full = false){
		if(index >= 0 && index < this._months.length){
			return this._months[index].substr(0, ((full)? 9 : ((index == 8)? 4 : 3)));
		}

		return "";
	}

	static get images(){
		return this._images;
	}

	static get version(){
		return this._version;
	}

	/**
	 * Gets all the days array
	 *
	 * @return {Array}
	 */

	static get days(){
		return this._days;
	}

	/**
	 * Gets all the months array
	 *
	 * @return {Array}
	 */

	static get months(){
		return this._months;
	}

	/**
	 * Gets the timestamp of when init was called.
	 *
	 * @return {Number}
	 */

	static get called(){
		return this._called;
	}

	/**
	 * Compares version numbers.
	 *
	 * 1 = current is higher than required
	 * -1 = required is higher than current
	 * 0 = current and required are the same
	 *
	 *    yootil.compare_version("1.1.1", "1.1.1.2"); // -1
	 *
	 * @param {String} [current]
	 * @param {String} [required]
	 * @return {Number}
	 */

	static compare_version(current = "0.0.0", required = "0.0.0"){
		current = current.toString();
		required = required.toString();

		if(current.length > required.length){
			required += ".0".repeat(current.replace(/\D/g, "").length - required.replace(/\D/g, "").length);
		} else if(required.length > current.length){
			current += ".0".repeat(required.replace(/\D/g, "").length - current.replace(/\D/g, "").length);
		}

		let a = current.split(".");
		let b = required.split(".");
		let len = a.length;

		for(let i = 0; i < len; i ++){
			if(~~ a[i] > ~~ b[i]){
				return 1;
			}

			if(~~ a[i] < ~~ b[i]){
				return -1;
			}
		}

		return 0;
	}

	/**
	 * Digests the string in to a single hash value (32 bit).
	 *
	 * Source: http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
	 *
	 * @param (String) str
	 * @returns {Number}
	 */

	static hash_code(str = ""){
		str = str.toString();

		if(!str.length){
			return 0;
		}

		let hash = 0;

		for(let i = 0, len = str.length; i < len; ++ i){
			hash = ((hash << 5) - hash) + str.charCodeAt(i);
			hash |= 0;
		}

		return Math.abs(hash);
	}

};

// This will likely be removed in v6

yootil.bar = class {

	static init(){
		if(!yootil.settings.bar.enabled){
			return;
		}

		this.setup();
		this.create_bar();
		this._items = new Map();
	}

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
	 *     yootil.bar.add({url: "http://proboards.com", img: "http://example.com/someimage.png", alt: "Hello World"});
	 *
	 * @param {String} $0.link URL for the item.
	 * @param {String} $0.img URL for the image.
	 * @param {String} [$0.alt] Alt / title for the image.
	 * @param {String} [$0.key] Pass in a unique key if you wish to have the option to remove it later.
	 * @param {Function} [$0.func] Pass function to be executed when clicked on.
	 * @param {Object} [$0.context] Context of the function being passed.
	 * @chainable
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
	 *     yootil.bar.remove("myitem");
	 *
	 * @param {String} key The unique key used when adding the item.
	 * @chainable
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
	 *     if(yootil.bar.enabled()){
	 *     	console.log("Bar is enabled");
	 *     }
	 *
	 * @return {Boolean}
	 */

	static enabled(){
		return yootil.settings.bar.enabled;
	}

	static total_items(){
		return this._items.length;
	}

	static reposition_left(){
		let position = this._settings.bar_position;

		if(position == 2 || position == 5){
			this._plugin_bar.css("left", (($(window).width() / 2) - (this._plugin_bar.width() / 2)));
		}
	}

	static reposition_top(){
		let position = yootil.settings.bar.position;

		if(position == 7 || position == 8){
			this._plugin_bar.css("top", (($(window).height() / 2) - (this._plugin_bar.height() / 2)));
		}
	}

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

	static get settings(){
		return this._settings;
	}

};

/**
 * @class yootil.key
 * @static
 * Most methods are just wrappers, to see the ProBoards API documentation, <a href="https://www.proboards.com/developer/js/class/key">click here</a>.
 */

// yootil.key("aaa").set("hi world", 1);

yootil.key = (class {

	static init(){

		/**
		 * @property {Object} pb_key_obj Holds a reference to the ProBoards key object.
		 * @ignore
		 */

		this.pb_key_obj = pb.plugin.key;

		return this.wrapper.bind(this);
	}

	static wrapper(key = ""){
		return Object.assign(Object.create(null), {

			exists: () => this.exists(key),
			obj: () => this.key_obj(key),
			is_empty: object_id => this.is_empty(key, object_id),
			has_value: object_id => !this.is_empty(key, object_id),
			get: (object_id, is_json) => this.get(key, object_id),
			clear: object_id => this.clear(key, object_id),
			set: (value, object_id, type) => this.set(key, value, object_id, type),
			on: (evt, value, object_id) => this.on(key, evt, value, object_id),
			new_thread: (value, object_id) => this.new_thread(key, value, object_id),
			new_post: (value, object_id) => this.new_post(key, value, object_id),
			new_quick_reply: (value, object_id) => this.post_quick_reply(key, value, object_id),
			append: (value, object_id) => this.append(key, value, object_id),
			prepend: (value, object_id) => this.prepend(key, value, object_id),
			increment: (value, object_id) => this.increment(key, value, object_id),
			decrement: (value, object_id) => this.decrement(key, value, object_id),
			pop: (items, object_id) => this.pop(key, items, object_id),
			push: (value, object_id) => this.push(key, value, object_id),
			push_unique: (value, object_id, strict) => this.push_unique(key, value, object_id, strict),
			shift: (items, object_id) => this.shift(key, items, object_id),
			unshift: (value, object_id) => this.unshift(key, value, object_id),
			unshift_unique: (value, object_id, strict) => this.unshift_unique(key, value, object_id, strict),
			write: object_id => this.write(key, object_id),
			read: object_id => this.read(key, object_id),
			type: (object_id, return_str) => this.type(key, return_str),
			length: object_id => this.length(key, object_id),
			user_key: () => this.user_key(key),
			super_user_key: () => this.super_user_key(key),
			thread_key: () => this.thread_key(key),
			post_key: () => this.post_key(key),
			conversation_key: () => this.conversation_key(key),
			message_key: () => this.message_key(key),
			super_forum_key: () => this.super_forum_key(key),
			has_space: object_id => this.has_space(key, object_id),
			space_left: object_id => this.space_left(key, object_id),
			max_space: () => this.max_space(key)

		});
	}

	/**
	 * Checks to see if a key exists.
	 *
	 * @param {String} key The key to check.
	 * @return {Boolean}
	 */

	static exists(key = ""){
		if(key){
			if(typeof proboards.plugin._keys[key] != "undefined"){
				return true;
			}
		}

		return false;
	}

	/**
	 * Returns the ProBoards key object.
	 *
	 * @param {String} key The key to get.
	 * @return {Object}
	 */

	static key_obj(key = ""){
		if(this.exists(key)){
			return this.pb_key_obj(key);
		}

		return {};
	}

	/**
	 * Checks to see if a key is empty
	 *
	 * @param {String} key The key to check.
	 * @param {Number} [object_id] This is the object id, proboards defaults to current user if not set.
	 * @return {Boolean}
	 */

	static is_empty(key = "", object_id = 0){
		if(this.exists(key)){
			if(typeof this.pb_key_obj(key).get != "undefined"){
				let val = this.pb_key_obj(key).get(object_id || undefined) || "";

				if(val.toString().length || JSON.stringify(val).length){
					return false;
				}
			}
		}

		return true;
	}

	/**
	 * Gets the value stored in the key.
	 *
	 * @param {String} key The ProBoards key we are getting.
	 * @param {Number} [object_id] This is the object id, proboards defaults to current user if not set.
	 * @param {Boolean} [is_json] If true, it will parse the JSON string.  ProBoards handles parsing now it seems.
	 * @returns {String|Object} If no value, an empty string is returned.
	 */

	static get(key = "", object_id, is_json = false){
		if(this.exists(key)){
			object_id = object_id || undefined;

			if(!this.is_empty(key, object_id)){
				let value = this.pb_key_obj(key).get(object_id);

				if(is_json && yootil.is_json(value)){
					value = JSON.parse(value);
				}

				return value;
			}
		}

		return "";
	}

	/**
	 * Clears out key value.
	 *
	 * @param {String} key The key.
	 * @param {Number} [object_id] This is the object id, proboards defaults to current user if not set.
	 * @return {Object} Returns promise.
	 */

	static clear(key = "", object_id){
		return this.set(key, "", object_id);
	}

	/**
	 * Sets a key value.
	 *
	 * Basic example (will set for current user):
	 *
	 *     yootil.key("mykey").set("apples");
	 *
	 * Using resolve and reject for promise.
	 *
	 *     yootil.key("mykey").set("somevalue", yootil.user.id()).then((status) => {
	 *     		console.log(status.message);
	 *     }).catch((status) => {
	 *     		console.log(status.message);
	 *     });
	 *
	 * @param {String} key The key.
	 * @param {String|Object} value Can be a string, or a object.  ProBoards now handles stringifying objects.
	 * @param {Number} [object_id] This is the object id, proboards defaults to current user if not set.
	 * @param {String} [type] Passed on set the method type (i.e append, pop etc).
	 * @return {Object} Returns a promise.
	 */

	static set(key = "", value = "", object_id, type = ""){
		let p = new Promise((resolve, reject) => {
			object_id = object_id || undefined;

			if(this.exists(key)){
				let options = {

					object_id,
					value

				};

				options.error = function(status){
					reject(status);
				}

				options.success = function(status){
					resolve(status);
				}

				if(type){
					switch(type){

						case "push" :
						case "unshift" :

							if(Array.isArray(options.value) && options.value.length > 1){
								options.values = options.value;
								delete options.value;
							}

							break;

						case "pop" :
						case "shift" :

							if(options.value){
								options.num_items = (~~ options.value);
								delete options.value;
							}

							break;
					}

					this.pb_key_obj(key)[type](options);
				} else {
					this.pb_key_obj(key).set(options);
				}
			} else {
				reject({
					message: "Key does not exist"
				});
			}

		});

		return p;
	}

	/**
	 * Key is set when an event occurs.
	 *
	 * @param {String} key The key.
	 * @param {String} [event] The event to use.  Currently there are 2 "thread_new" and "post_new".
	 * @param {Mixed} value The value to be stored in the key.  ProBoards handles stringify now.
	 * @param {Number} [object_id] This is the object id, proboards defaults to current user if not set.
	 * @return {Boolean} Returns true if successful (relies on what ProBoards .set returns).
	 */

	static on(key, event = "", value, object_id = undefined){
		if(!event){
			return false;
		}

		return this.pb_key_obj(key).set_on(event, object_id, value);
	}

	/**
	 * Concatenates a given value to the end of the existing key value.
	 *
	 * @param {String} key The key.
	 * @param {Mixed} value Can be a string or a number.
	 * @param {Number} [object_id] This is the object id, proboards defaults to current user if not set.
	 * @return {Object} Returns promise.
	 */

	static append(key, value, object_id){
		return this.set(key, value, object_id, "append");
	}

	/**
	 * Inserts a given value in front of the existing key value.
	 *
	 * @param {String} key The key.
	 * @param {Mixed} value Can be a string or a number.
	 * @param {Number} [user_id] This is the object id, proboards defaults to current user if not set.
	 * @return {Object} Returns promise.
	 */

	static prepend(key, value, object_id){
		return this.set(key, value, object_id, "prepend");
	}

	/**
	 * If the key is an integer, increases the key's value by one, or you can supply a different amount to increment by.
	 *
	 * @param {String} key The key.
	 * @param {Number} [value] Increment by this amount.  Default is 1.
	 * @param {Number} [object_id] This is the object id, proboards defaults to current user if not set.
	 * @return {Object} Returns promise.
	 */

	static increment(key, value = 1, object_id){
		return this.set(key, value, object_id, "increment");
	}

	/**
	 * If the key is an integer, decreases the key's value by one, or you can supply a different amount to decrement by.
	 *
	 * @param {String} key The key.
	 * @param {Number} [value] Decrement by this amount.  Default is 1.
	 * @param {Number} [object_id] This is the object id, proboards defaults to current user if not set.
	 * @return {Object} Returns promise.
	 */

	static decrement(key, value = 1, object_id){
		return this.set(key, value, object_id, "decrement");
	}

	/**
	 * If the key is an array, removes the last number of items specified.
	 *
	 * @param {String} key The key.
	 * @param {Number} [num_items] Number of items to pop from the key.
	 * @param {Number} [object_id] This is the object id, proboards defaults to current user if not set.
	 * @return {Object} Returns promise.
	 */

	static pop(key, num_items = 1, object_id){
		return this.set(key, num_items, object_id, "pop");
	}

	/**
	 * If the key is an array, adds the given value to the end of the array.
	 *
	 *     yootil.key("mykey").push("apples");
	 *
	 *     yootil.key("mykey").push(["apples", "pears"], yootil.user.id());
	 *
	 * @param {String} key The key.
	 * @param {String|Array} value The value to be pushed into the key.  This can be an array of values.
	 * @param {Number} [object_id] This is the object id, proboards defaults to current user if not set.
	 * @param {Boolean} [strict] If set to true, it will use inArray instead of ProBoards inArrayLoose.
	 * @return {Object} Returns promise.
	 */

	static push(key, value, object_id){
		value = (Array.isArray(value) && value.length == 1)? value[0] : value;

		return this.set(key, value, object_id, "push");
	}

	/**
	 * If the key is an array, adds the given value to the end of the array only if they are unique.
	 *
	 *     yootil.key("mykey").push_unique("apples");
	 *
	 *     yootil.key("mykey").push_unique(["apples", "pears"], false, yootil.user.id()); // Don't use strict
	 *
	 * @param {String} key The key.
	 * @param {Mixed} value The value to be pushed into the key.  This can be an array of values.
	 * @param {Number} [object_id] This is the object id, proboards defaults to current user if not set.
	 * @param {Boolean} [strict] If set to true, it will use inArray instead of ProBoards inArrayLoose.
	 * @return {Object} Returns promise.
	 */

	static push_unique(key, value, object_id, strict = false){
		let current_value = this.value(key);

		if(!current_value || !Array.isArray(current_value)){
			current_value = [];
		}

		let new_values = [];

		if(typeof value != "undefined"){
			if(Array.isArray(value)){
				new_values = value;
			} else {
				new_values.push(value);
			}
		}

		if(new_values.length){
			let to_push = [];

			for(let item of new_values){
				let af = (strict)? ((val) => val === item) : ((val) => val == item);

				if(!current_value.find(af)){
					to_push.push(item);
				}
			}

			if(to_push.length){
				to_push = (to_push.length == 1)? to_push[0] : to_push;

				return this.push(key, to_push, object_id);
			}
		}
	}

	/**
	 * If the key is an array, removes the first "num_items" values.
	 *
	 * @param {String} key The key.
	 * @param {Number} num_items The number of items to shift from the array.
	 * @param {Number} [object_id] This is the object id, proboards defaults to current user if not set.
	 * @return {Object} Returns promise.
	 */

	static shift(key, num_items = 1, object_id){
		return this.set(key, num_items, object_id, "shift");
	}

	/**
	 * If the key is an array, adds value to the front of the array.
	 *
	 * @param {String} key The key.
	 * @param {String|Array} value The value to be pushed into the key.  This can be an array of values.
	 * @param {Number} [user_id] This is the object id, proboards defaults to current user if not set.
	 * @return {Object} Returns promise.
	 */

	static unshift(key, value, object_id){
		value = (Array.isArray(value) && value.length == 1)? value[0] : value;

		return this.set(key, value, object_id, "unshift");
	}

	/**
	 * If the key is an array, adds the given value to the front of the array only if they are unique.
	 *
	 *     yootil.key("mykey").unshift_unique("apples");
	 *
	 *     yootil.key("mykey").unshift_unique(["apples", "pears"], false, yootil.user.id()); // Don't use strict
	 *
	 * @param {String} key The key.
	 * @param {Mixed} value The value to be pushed into the key.  This can be an array of values.
	 * @param {Number} [object_id] This is the object id, proboards defaults to current user if not set.
	 * @param {Boolean} [strict] If set to true, it will use inArray instead of ProBoards inArrayLoose.
	 * @return {Object} Returns promise.
	 */

	static unshift_unique(key, value, object_id, strict = false){
		let current_value = this.value(key);

		if(!current_value || !Array.isArray(current_value)){
			current_value = [];
		}

		let new_values = [];

		if(typeof value != "undefined"){
			if(Array.isArray(value)){
				new_values = value;
			} else {
				new_values.push(value);
			}
		}

		if(new_values.length){
			let to_push = [];

			for(let item of new_values){
				let af = (strict)? ((val) => val === item) : ((val) => val == item);

				if(!current_value.find(af)){
					to_push.push(item);
				}
			}

			if(to_push.length){
				to_push = (to_push.length == 1)? to_push[0] : to_push;

				return this.unshift(key, to_push, object_id);
			}
		}
	}

	/**
	 * Checks permission on key to see if the user can write.
	 *
	 * @param {String} key The key.
	 * @param {Number} object_id This is the object id, proboards defaults to current user if not set.
	 * @return {Boolean}
	 */

	static write(key, object_id){
		if(this.exists(key)){
			if(typeof this.pb_key_obj(key).can_write != "undefined"){
				return !!this.pb_key_obj(key).can_write(object_id);
			}
		}

		return false;
	}

	/**
	 *  Checks permission on key to see if the user can read.
	 *
	 * @param {String} key The key.
	 * @param {Number} object_id This is the object id, proboards defaults to current user if not set.
	 * @return {Boolean}
	 */

	static read(key, user){
		if(this.exists(key)){
			if(typeof this.pb_key_obj(key).can_read != "undefined"){
				return !!this.pb_key_obj(key).can_read(object_id);
			} else {

				// ProBoards hasn't exposed it.
				// Just return true so we don't break plugins

				return true;
			}
		}

		return false;
	}

	/**
	 * Get they key type.
	 *
	 * @param {String} key The key.
	 * @param {Boolean} [return_str] If true, it will return a string value (i.e "USER").
	 * @return {String}
	 */

	static type(key, return_str = false){
		let type = this.pb_key_obj(key).type();

		if(return_str){
			let types = pb.plugin.key_types();

			for(let k in types){
				if(types[k] == type){
					type = k;
					break;
				}
			}
		}

		return type;
	}

	/**
	 * Gets the length of a key.
	 *
	 * @param {String} key The key to be checked.
	 * @param {Number} object_id Object id.
	 * @return {Number} Returns the length.
	 */

	static length(key, object_id){
		let val = this.get(key, object_id);

		if(typeof val == "string"){
			return val.length;
		}

		return (typeof val === "undefined")? 0 : JSON.stringify(val).length;
	}

	/**
	 * Checks to see if the key is a user type.
	 *
	 * @param {String} key The key to check.
	 * @return {Boolean}
	 */

	static user_key(key){
		if(this.type(key) == 1){
			return true;
		}

		return false;
	}

	/**
	 * Checks to see if the key is a super user type.
	 *
	 * @param {String} key The key to check.
	 * @return {Boolean}
	 */

	static super_user_key(key){
		if(this.type(key) == 2){
			return true;
		}

		return false;
	}

	/**
	 * Checks to see if the key is a thread type.
	 *
	 * @param {String} key The key to check.
	 * @return {Boolean}
	 */

	static thread_key(key){
		if(this.type(key) == 3){
			return true;
		}

		return false;
	}

	/**
	 * Checks to see if the key is a post type.
	 *
	 * @param {String} key The key to check.
	 * @return {Boolean}
	 */

	static post_key(key){
		if(this.type(key) == 4){
			return true;
		}

		return false;
	}

	/**
	 * Checks to see if the key is a conversation type.
	 *
	 * @param {String} key The key to check.
	 * @return {Boolean}
	 */

	static conversation_key(key){
		if(this.type(key) == 5){
			return true;
		}

		return false;
	}

	/**
	 * Checks to see if the key is a message type.
	 *
	 * @param {String} key The key to check.
	 * @return {Boolean}
	 */

	static message_key(key){
		if(this.type(key) == 6){
			return true;
		}

		return false;
	}

	/**
	 * Checks to see if the key is a super_forum type.
	 *
	 * @param {String} key The key to check.
	 * @return {Boolean}
	 */

	static super_forum_key(key){
		if(this.type(key) == 7){
			return true;
		}

		return false;
	}

	/**
	 * Checks to see if the key has space.
	 *
	 * @param {String} key The key to check.
	 * @param {Number} object_id Object id.
	 * @return {Boolean}
	 */

	static has_space(key, object_id){
		let max_length = (this.super_forum_key(key))? pb.data("plugin_max_super_forum_key_length") : pb.data("plugin_max_key_length");

		if(this.length(key, object_id) < max_length){
			return true;
		}

		return false;
	}

	/**
	 * Gets the space left in the key.
	 *
	 * @param {String} key The key to check.
	 * @param {Number} object_id Object id.
	 * @return {Number}
	 */

	static space_left(key, object_id){
		let max_length = (this.super_forum_key(key))? pb.data("plugin_max_super_forum_key_length") : pb.data("plugin_max_key_length");
		let key_length = this.length(key, object_id);
		let space_left = max_length - key_length;

		return (space_left < 0)? 0 : space_left;
	}

	/**
	 * Gets max space (characters).
	 *
	 * @param {String} key The key to check.
	 * @return {Number}
	 */

	static max_space(key){
		let max_length = (this.super_forum_key(key))? pb.data("plugin_max_super_forum_key_length") : pb.data("plugin_max_key_length");

		return max_length;
	}

}).init();

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
		let max_len = this.keys[0].key.max_space();

		if(all_data.length){
			let counter = 0;

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
			}

			if(to == "front"){
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
		}

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
	 * @returns {String|Object|Array}
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

yootil.settings = class {

	static init(){
		this.images = {};
		this.bar = {

			enabled: 1,
			bar_position: 4

		};

		this.images = {};
	}

};

/**
 * @class yootil.user
 * @static
 * Contains useful methods relating to the user currently viewing the page, most being wrappers at the moment.
 */

yootil.user = (class {

	static init(){
		this._data = {};
		return this;
	}

	/**
	 * This checks to see if the ProBoards data object exists and has a user object, we cache it as well.
	 * @return {Boolean}
	 * @ignore
	 */

	static has_data(){
		if(this._data && typeof this._data.id != "undefined"){
			return true;
		} else {
			if(typeof proboards != "undefined"){
				let data = proboards.data;

				if(typeof data != "undefined" && typeof data == "function"){
					let user_data = proboards.data("user");

					if(typeof user_data != "undefined"){
						this._data = user_data || {};

						return true;
					}
				}
			}
		}

		return false;
	}

	/**
	 * Checks to see if the user is logged in, if so, returns true.
	 * @return {Boolean}
	 */

	static logged_in(){
		if(this.has_data()){
			if(typeof this._data.is_logged_in != "undefined" && this._data.is_logged_in){
				return true;
			}
		}

		return false;
	}

	/**
	 * Gets the current users ID
	 * @return {Number}
	 */

	static id(){
		if(this.has_data()){
			if(typeof this._data.id != "undefined"){
				return parseInt(this._data.id, 10);
			}
		}

		return null;
	}

	/**
	 * Checks to see if the current user is staff
	 * @return {Boolean}
	 */

	static staff(){
		if(this.has_data()){
			if(typeof this._data.is_staff != "undefined" && this._data.is_staff){
				return true;
			}
		}

		return false;
	}

	/**
	 * Gets the users name
	 * @return {String}
	 */

	static name(){
		if(this.has_data()){
			if(typeof this._data.name != "undefined"){
				return this._data.name;
			}
		}

		return "";
	}

	/**
	 * Gets the users theme ID
	 * @return {Number}
	 */

	static theme(){
		if(this.has_data()){
			if(typeof this._data.theme_id != "undefined"){
				return this._data.theme_id;
			}
		}

		return 0;
	}

	/**
	 * Gets the users path URL to their profile
	 * @return {String}
	 */

	static url(){
		if(this.has_data()){
			if(typeof this._data.url != "undefined"){
				return this._data.url;
			}
		}

		return "";
	}

	/**
	 * Gets the users avatar (HTML)
	 * @return {String}
	 */

	static avatar(){
		if(this.has_data()){
			if(typeof this._data.avatar != "undefined"){
				return this._data.avatar;
			}
		}

		return "";
	}

	/**
	 * Gets the users birthday object
	 * @return {Object}
	 */

	static birthday(){
		if(this.has_data()){
			if(typeof this._data.birthday != "undefined"){
				return this._data.birthday;
			}
		}

		return {};
	}

	/**
	 * Gets the users date format (i.e d/m/y)
	 * @return {String}
	 */

	static date_format(){
		if(this.has_data()){
			if(typeof this._data.date_format != "undefined"){
				return this._data.date_format;
			}
		}

		return "";
	}

	/**
	 * Gets the users post mode.
	 * @return {Object}
	 */

	static post_mode(){
		if(this.has_data()){
			if(typeof this._data.default_post_mode != "undefined"){
				return this._data.default_post_mode;
			}
		}

		return "";
	}

	/**
	 * Gets the users friends
	 * @return {Object}
	 */

	static friends(){
		if(this.has_data()){
			if(typeof this._data.friends != "undefined"){
				return this._data.friends;
			}
		}

		return {};
	}

	/**
	 * Checks to see if user has new messages
	 * @return {Number}
	 */

	static has_new_messages(){
		if(this.has_data()){
			if(typeof this._data.has_new_messages != "undefined"){
				return this._data.has_new_messages;
			}
		}

		return 0;
	}

	/**
	 * Gets users instant messengers
	 * @return {Object}
	 */

	static instant_messengers(){
		if(this.has_data()){
			if(typeof this._data.instant_messengers != "undefined"){
				return this._data.instant_messengers;
			}
		}

		return {};
	}

	/**
	 * Gets users last online object
	 * @return {Object}
	 */

	static last_online(){
		if(this.has_data()){
			if(typeof this._data.last_online != "undefined"){
				return this._data.last_online;
			}
		}

		return {};
	}

	/**
	 * Gets users post count
	 * @return {Number}
	 */

	static posts(){
		if(this.has_data()){
			if(typeof this._data.posts != "undefined"){
				return this._data.posts;
			}
		}

		return 0;
	}

	/**
	 * Gets users rank
	 * @return {Object}
	 */

	static rank(){
		if(this.has_data()){
			if(typeof this._data.rank != "undefined"){
				return this._data.rank;
			}
		}

		return {};
	}

	/**
	 * Gets users registered on date
	 * @return {Object}
	 */

	static registered_on(){
		if(this.has_data()){
			if(typeof this._data.registered_on != "undefined"){
				return this._data.registered_on;
			}
		}

		return {};
	}

	/**
	 * Gets users status
	 * @return {String}
	 */

	static status(){
		if(this.has_data()){
			if(typeof this._data.status != "undefined"){
				return this._data.status;
			}
		}

		return "";
	}

	/**
	 * Gets users time format
	 * @return {String}
	 */

	static time_format(){
		if(this.has_data()){
			if(typeof this._data.time_format != "undefined"){
				return this._data.time_format;
			}
		}

		return "";
	}

	/**
	 * Gets users username
	 * @return {String}
	 */

	static username(){
		if(this.has_data()){
			if(typeof this._data.username != "undefined"){
				return this._data.username;
			}
		}

		return "";
	}

	/**
	 * Gets users group ids
	 * @return {Array}
	 */

	static group_ids(){
		if(this.has_data()){
			if(typeof this._data.group_ids != "undefined"){
				return this._data.group_ids;
			}
		}

		return [];
	}

	/**
	 * Gets users groups
	 * @return {Object}
	 */

	static groups(){
		if(this.has_data()){
			if(typeof this._data.groups != "undefined"){
				return this._data.groups;
			}
		}

		return {};
	}

	/**
	 * Checks if the member is invisible
	 * @return {Boolean}
	 */

	static invisible(){
		if(this.has_data()){
			if(typeof this._data.is_invisible != "undefined" && this._data.is_invisible){
				return true;
			}
		}

		return false;
	}

	/**
	 * Checks if the member has proboards plus on
	 * @return {Boolean}
	 */

	static proboards_plus(){
		if(this.has_data()){
			if(typeof this._data.proboards_plus != "undefined" && this._data.proboards_plus){
				return true;
			}
		}

		return false;
	}

	/**
	 * Gets the users block list
	 * @return {Object}
	 */

	static block_list(){
		if(this.has_data()){
			if(typeof this._data.block_list != "undefined" && this._data.block_list){
				return this._data.block_list;
			}
		}

		return {};
	}

}).init();

yootil.init();