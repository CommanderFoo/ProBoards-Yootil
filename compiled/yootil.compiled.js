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

"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var yootil = function () {
	function yootil() {
		_classCallCheck(this, yootil);
	}

	_createClass(yootil, null, [{
		key: "init",
		value: function init() {
			this._PLUGIN = "pixeldepth_yootil";
			this._called = this.timestamp();
			this._version = "2.0.0";

			this._notifications_queue = {};

			this._months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

			this._days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

			this._textarea = document.createElement("textarea");

			this.settings.init();
			this.setup();
			this.bar.init();
		}
	}, {
		key: "setup",
		value: function setup() {
			var plugin = pb.plugin.get(this._PLUGIN);
			var settings = plugin && plugin.settings ? plugin.settings : false;

			if (settings) {
				this.settings.bar.enabled = settings.bar_enabled == 1 ? !!settings.bar_enabled : true;
				this.settings.bar.position = settings.bar_position > 0 ? ~~settings.bar_position : 4;

				if (plugin.images) {
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

	}, {
		key: "html_encode",
		value: function html_encode() {
			var str = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
			var decode_first = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

			str = decode_first ? this.html_decode(str) : str;

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

	}, {
		key: "html_decode",
		value: function html_decode() {
			var str = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

			this._textarea.innerHTML = str;

			var val = this._textarea.value;

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

	}, {
		key: "number_format",
		value: function number_format() {
			var str = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
			var delim = arguments.length <= 1 || arguments[1] === undefined ? "," : arguments[1];

			return str.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + delim) || "0";
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

	}, {
		key: "is_json",
		value: function is_json() {
			var str = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
			var return_obj = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

			try {
				str = JSON.parse(str);
			} catch (e) {
				return false;
			}

			if (return_obj) {
				return str;
			}

			return true;
		}

		/**
   * Creates a timestamp.
   *
   * @return {Number}
   */

	}, {
		key: "timestamp",
		value: function timestamp() {
			return +new Date();
		}

		/**
   * Checks a number and returns the correct suffix to be used with it.
   *
   *     yootil.suffix(3); // "rd"
   *
   * @param {Number} n The number to be checked.
   * @return {String}
   */

	}, {
		key: "suffix",
		value: function suffix() {
			var n = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

			var j = n % 10;

			if (j == 1 && n != 11) {
				return "st";
			}

			if (j == 2 && n != 12) {
				return "nd";
			}

			if (j == 3 && n != 13) {
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

	}, {
		key: "day",
		value: function day() {
			var index = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
			var full = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

			if (index >= 0 && index < this._days.length) {
				return this._days[index].substr(0, full ? 9 : 3);
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

	}, {
		key: "month",
		value: function month() {
			var index = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
			var full = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

			if (index >= 0 && index < this._months.length) {
				return this._months[index].substr(0, full ? 9 : index == 8 ? 4 : 3);
			}

			return "";
		}
	}, {
		key: "compare_version",


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

		value: function compare_version() {
			var current = arguments.length <= 0 || arguments[0] === undefined ? "0.0.0" : arguments[0];
			var required = arguments.length <= 1 || arguments[1] === undefined ? "0.0.0" : arguments[1];

			current = current.toString();
			required = required.toString();

			if (current.length > required.length) {
				required += ".0".repeat(current.replace(/\D/g, "").length - required.replace(/\D/g, "").length);
			} else if (required.length > current.length) {
				current += ".0".repeat(required.replace(/\D/g, "").length - current.replace(/\D/g, "").length);
			}

			var a = current.split(".");
			var b = required.split(".");
			var len = a.length;

			for (var i = 0; i < len; i++) {
				if (~~a[i] > ~~b[i]) {
					return 1;
				}

				if (~~a[i] < ~~b[i]) {
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

	}, {
		key: "hash_code",
		value: function hash_code() {
			var str = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

			str = str.toString();

			if (!str.length) {
				return 0;
			}

			var hash = 0;

			for (var i = 0, len = str.length; i < len; ++i) {
				hash = (hash << 5) - hash + str.charCodeAt(i);
				hash |= 0;
			}

			return Math.abs(hash);
		}
	}, {
		key: "images",
		get: function get() {
			return this._images;
		}
	}, {
		key: "version",
		get: function get() {
			return this._version;
		}

		/**
   * Gets all the days array
   *
   * @return {Array}
   */

	}, {
		key: "days",
		get: function get() {
			return this._days;
		}

		/**
   * Gets all the months array
   *
   * @return {Array}
   */

	}, {
		key: "months",
		get: function get() {
			return this._months;
		}

		/**
   * Gets the timestamp of when init was called.
   *
   * @return {Number}
   */

	}, {
		key: "called",
		get: function get() {
			return this._called;
		}
	}]);

	return yootil;
}();

;

// This will likely be removed in v6

yootil.bar = function () {
	function _class() {
		_classCallCheck(this, _class);
	}

	_createClass(_class, null, [{
		key: "init",
		value: function init() {
			if (!yootil.settings.bar.enabled) {
				return;
			}

			this.setup();
			this.create_bar();
			this._items = new Map();
		}
	}, {
		key: "setup",
		value: function setup() {
			var position = yootil.settings.bar_position;

			this._settings = {

				enabled: yootil.settings.bar.enabled,
				position: "yootil-bar-bottom-left",
				setting: position,
				custom: null

			};

			switch (position) {

				case 1:
					this._settings.position = "yootil-bar-top-left";
					break;

				case 2:
					this._settings.position = "yootil-bar-top-center";
					this._settings.custom = {

						left: $(window).width() / 2

					};

					break;

				case 3:
					this._settings.position = "yootil-bar-top-right";
					break;

				case 4:
					this._settings.position = "yootil-bar-bottom-left";
					break;

				case 5:
					this._settings.position = "yootil-bar-bottom-center";
					this._settings.custom = {

						left: $(window).width() / 2

					};

					break;

				case 6:
					this._settings.position = "yootil-bar-bottom-right";
					break;

				case 7:
					this._settings.position = "yootil-bar-left-middle";
					this._settings.custom = {

						top: $(window).height() / 2

					};

					break;

				case 8:
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

	}, {
		key: "add",
		value: function add() {
			var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			var _ref$url = _ref.url;
			var url = _ref$url === undefined ? "" : _ref$url;
			var _ref$img = _ref.img;
			var img = _ref$img === undefined ? "" : _ref$img;
			var _ref$alt = _ref.alt;
			var alt = _ref$alt === undefined ? "" : _ref$alt;
			var _ref$key = _ref.key;
			var key = _ref$key === undefined ? "" : _ref$key;
			var _ref$func = _ref.func;
			var func = _ref$func === undefined ? null : _ref$func;
			var _ref$context = _ref.context;
			var context = _ref$context === undefined ? null : _ref$context;

			if (!this._settings.enabled) {
				return;
			}

			if (url && img) {
				var line_break = "";

				if (this._settings.position == 7 || this._settings.position == 8) {
					line_break = "<br />";
				}

				var $item = $("<a href='" + url + "'><img src='" + img + "' alt='" + alt + "' title='" + alt + "' />" + line_break + "</a>");

				if (line_break.length) {
					$item.addClass("yootil-bar-item-block");
				}

				if (func && typeof func == "function") {
					$item.click(func.bind(context));
				}

				if (key && key.toString().length) {
					this._items.set(key, $item);
				}

				this._plugin_bar.find("#yootil-bar").append($item);

				this.reposition_top();
				this.reposition_left();
			}

			if (this._plugin_bar.find("#yootil-bar a").length > 0) {
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

	}, {
		key: "remove",
		value: function remove() {
			var key = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

			key = key.toString();

			if (key && this._items.has(key)) {
				this._items.get(key).remove();
				this._items.delete(key);

				if (this._plugin_bar.find("#yootil-bar a").length == 0) {
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

	}, {
		key: "enabled",
		value: function enabled() {
			return yootil.settings.bar.enabled;
		}
	}, {
		key: "total_items",
		value: function total_items() {
			return this._items.length;
		}
	}, {
		key: "reposition_left",
		value: function reposition_left() {
			var position = this._settings.bar_position;

			if (position == 2 || position == 5) {
				this._plugin_bar.css("left", $(window).width() / 2 - this._plugin_bar.width() / 2);
			}
		}
	}, {
		key: "reposition_top",
		value: function reposition_top() {
			var position = yootil.settings.bar.position;

			if (position == 7 || position == 8) {
				this._plugin_bar.css("top", $(window).height() / 2 - this._plugin_bar.height() / 2);
			}
		}
	}, {
		key: "create_bar",
		value: function create_bar() {
			var $bar = $("<div id='yootil-bar-wrapper'><div id='yootil-bar'></div></div>").addClass(this._settings.position);

			if (this._settings.custom) {
				$bar.css(this._settings.custom);
			}

			// If the PB bar exists, lets move it above it

			if (this._settings.setting == 6) {
				if ($("#pbn-bar-wrapper").length) {
					$bar.addClass("yootil-bar-offset");
				}
			}

			$(function () {
				return $("body").append($bar);
			});
			this._plugin_bar = $bar;
		}
	}, {
		key: "settings",
		get: function get() {
			return this._settings;
		}
	}]);

	return _class;
}();

/**
 * @class yootil.key
 * @static
 * Most methods are just wrappers, to see the ProBoards API documentation, <a href="https://www.proboards.com/developer/js/class/key">click here</a>.
 */

// yootil.key("aaa").set("hi world", 1);

yootil.key = function () {
	function _class2() {
		_classCallCheck(this, _class2);
	}

	_createClass(_class2, null, [{
		key: "init",
		value: function init() {

			/**
    * @property {Object} pb_key_obj Holds a reference to the ProBoards key object.
    * @ignore
    */

			this.pb_key_obj = pb.plugin.key;

			return this.wrapper.bind(this);
		}
	}, {
		key: "wrapper",
		value: function wrapper() {
			var _this = this;

			var key = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

			return Object.assign(Object.create(null), {

				exists: function exists() {
					return _this.exists(key);
				},
				obj: function obj() {
					return _this.key_obj(key);
				},
				is_empty: function is_empty(object_id) {
					return _this.is_empty(key, object_id);
				},
				has_value: function has_value(object_id) {
					return !_this.is_empty(key, object_id);
				},
				get: function get(object_id, is_json) {
					return _this.get(key, object_id);
				},
				clear: function clear(object_id) {
					return _this.clear(key, object_id);
				},
				set: function set(value, object_id, type) {
					return _this.set(key, value, object_id, type);
				},
				on: function on(evt, value, object_id) {
					return _this.on(key, evt, value, object_id);
				},
				new_thread: function new_thread(value, object_id) {
					return _this.new_thread(key, value, object_id);
				},
				new_post: function new_post(value, object_id) {
					return _this.new_post(key, value, object_id);
				},
				new_quick_reply: function new_quick_reply(value, object_id) {
					return _this.post_quick_reply(key, value, object_id);
				},
				append: function append(value, object_id) {
					return _this.append(key, value, object_id);
				},
				prepend: function prepend(value, object_id) {
					return _this.prepend(key, value, object_id);
				},
				increment: function increment(value, object_id) {
					return _this.increment(key, value, object_id);
				},
				decrement: function decrement(value, object_id) {
					return _this.decrement(key, value, object_id);
				},
				pop: function pop(items, object_id) {
					return _this.pop(key, items, object_id);
				},
				push: function push(value, object_id) {
					return _this.push(key, value, object_id);
				},
				push_unique: function push_unique(value, object_id, strict) {
					return _this.push_unique(key, value, object_id, strict);
				},
				shift: function shift(items, object_id) {
					return _this.shift(key, items, object_id);
				},
				unshift: function unshift(value, object_id) {
					return _this.unshift(key, value, object_id);
				},
				unshift_unique: function unshift_unique(value, object_id, strict) {
					return _this.unshift_unique(key, value, object_id, strict);
				},
				write: function write(object_id) {
					return _this.write(key, object_id);
				},
				read: function read(object_id) {
					return _this.read(key, object_id);
				},
				type: function type(object_id, return_str) {
					return _this.type(key, return_str);
				},
				length: function length(object_id) {
					return _this.length(key, object_id);
				},
				user_key: function user_key() {
					return _this.user_key(key);
				},
				super_user_key: function super_user_key() {
					return _this.super_user_key(key);
				},
				thread_key: function thread_key() {
					return _this.thread_key(key);
				},
				post_key: function post_key() {
					return _this.post_key(key);
				},
				conversation_key: function conversation_key() {
					return _this.conversation_key(key);
				},
				message_key: function message_key() {
					return _this.message_key(key);
				},
				super_forum_key: function super_forum_key() {
					return _this.super_forum_key(key);
				},
				has_space: function has_space(object_id) {
					return _this.has_space(key, object_id);
				},
				space_left: function space_left(object_id) {
					return _this.space_left(key, object_id);
				},
				max_space: function max_space() {
					return _this.max_space(key);
				}

			});
		}

		/**
   * Checks to see if a key exists.
   *
   * @param {String} key The key to check.
   * @return {Boolean}
   */

	}, {
		key: "exists",
		value: function exists() {
			var key = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

			if (key) {
				if (typeof proboards.plugin._keys[key] != "undefined") {
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

	}, {
		key: "key_obj",
		value: function key_obj() {
			var key = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

			if (this.exists(key)) {
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

	}, {
		key: "is_empty",
		value: function is_empty() {
			var key = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
			var object_id = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

			if (this.exists(key)) {
				if (typeof this.pb_key_obj(key).get != "undefined") {
					var val = this.pb_key_obj(key).get(object_id || undefined) || "";

					if (val.toString().length || JSON.stringify(val).length) {
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

	}, {
		key: "get",
		value: function get() {
			var key = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
			var object_id = arguments[1];
			var is_json = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

			if (this.exists(key)) {
				object_id = object_id || undefined;

				if (!this.is_empty(key, object_id)) {
					var value = this.pb_key_obj(key).get(object_id);

					if (is_json && yootil.is_json(value)) {
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

	}, {
		key: "clear",
		value: function clear() {
			var key = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
			var object_id = arguments[1];

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

	}, {
		key: "set",
		value: function set() {
			var key = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
			var value = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

			var _this2 = this;

			var object_id = arguments[2];
			var type = arguments.length <= 3 || arguments[3] === undefined ? "" : arguments[3];

			var p = new Promise(function (resolve, reject) {
				object_id = object_id || undefined;

				if (_this2.exists(key)) {
					var options = {

						object_id: object_id,
						value: value

					};

					options.error = function (status) {
						reject(status);
					};

					options.success = function (status) {
						resolve(status);
					};

					if (type) {
						switch (type) {

							case "push":
							case "unshift":

								if (Array.isArray(options.value) && options.value.length > 1) {
									options.values = options.value;
									delete options.value;
								}

								break;

							case "pop":
							case "shift":

								if (options.value) {
									options.num_items = ~~options.value;
									delete options.value;
								}

								break;
						}

						_this2.pb_key_obj(key)[type](options);
					} else {
						_this2.pb_key_obj(key).set(options);
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

	}, {
		key: "on",
		value: function on(key) {
			var event = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];
			var value = arguments[2];
			var object_id = arguments.length <= 3 || arguments[3] === undefined ? undefined : arguments[3];

			if (!event) {
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

	}, {
		key: "append",
		value: function append(key, value, object_id) {
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

	}, {
		key: "prepend",
		value: function prepend(key, value, object_id) {
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

	}, {
		key: "increment",
		value: function increment(key) {
			var value = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
			var object_id = arguments[2];

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

	}, {
		key: "decrement",
		value: function decrement(key) {
			var value = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
			var object_id = arguments[2];

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

	}, {
		key: "pop",
		value: function pop(key) {
			var num_items = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
			var object_id = arguments[2];

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

	}, {
		key: "push",
		value: function push(key, value, object_id) {
			value = Array.isArray(value) && value.length == 1 ? value[0] : value;

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

	}, {
		key: "push_unique",
		value: function push_unique(key, value, object_id) {
			var strict = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

			var current_value = this.value(key);

			if (!current_value || !Array.isArray(current_value)) {
				current_value = [];
			}

			var new_values = [];

			if (typeof value != "undefined") {
				if (Array.isArray(value)) {
					new_values = value;
				} else {
					new_values.push(value);
				}
			}

			if (new_values.length) {
				var to_push = [];

				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					var _loop = function _loop() {
						var item = _step.value;

						var af = strict ? function (val) {
							return val === item;
						} : function (val) {
							return val == item;
						};

						if (!current_value.find(af)) {
							to_push.push(item);
						}
					};

					for (var _iterator = new_values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						_loop();
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				if (to_push.length) {
					to_push = to_push.length == 1 ? to_push[0] : to_push;

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

	}, {
		key: "shift",
		value: function shift(key) {
			var num_items = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
			var object_id = arguments[2];

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

	}, {
		key: "unshift",
		value: function unshift(key, value, object_id) {
			value = Array.isArray(value) && value.length == 1 ? value[0] : value;

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

	}, {
		key: "unshift_unique",
		value: function unshift_unique(key, value, object_id) {
			var strict = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

			var current_value = this.value(key);

			if (!current_value || !Array.isArray(current_value)) {
				current_value = [];
			}

			var new_values = [];

			if (typeof value != "undefined") {
				if (Array.isArray(value)) {
					new_values = value;
				} else {
					new_values.push(value);
				}
			}

			if (new_values.length) {
				var to_push = [];

				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					var _loop2 = function _loop2() {
						var item = _step2.value;

						var af = strict ? function (val) {
							return val === item;
						} : function (val) {
							return val == item;
						};

						if (!current_value.find(af)) {
							to_push.push(item);
						}
					};

					for (var _iterator2 = new_values[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						_loop2();
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}

				if (to_push.length) {
					to_push = to_push.length == 1 ? to_push[0] : to_push;

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

	}, {
		key: "write",
		value: function write(key, object_id) {
			if (this.exists(key)) {
				if (typeof this.pb_key_obj(key).can_write != "undefined") {
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

	}, {
		key: "read",
		value: function read(key, user) {
			if (this.exists(key)) {
				if (typeof this.pb_key_obj(key).can_read != "undefined") {
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

	}, {
		key: "type",
		value: function type(key) {
			var return_str = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

			var type = this.pb_key_obj(key).type();

			if (return_str) {
				var types = pb.plugin.key_types();

				for (var k in types) {
					if (types[k] == type) {
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

	}, {
		key: "length",
		value: function length(key, object_id) {
			var val = this.get(key, object_id);

			if (typeof val == "string") {
				return val.length;
			}

			return typeof val === "undefined" ? 0 : JSON.stringify(val).length;
		}

		/**
   * Checks to see if the key is a user type.
   *
   * @param {String} key The key to check.
   * @return {Boolean}
   */

	}, {
		key: "user_key",
		value: function user_key(key) {
			if (this.type(key) == 1) {
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

	}, {
		key: "super_user_key",
		value: function super_user_key(key) {
			if (this.type(key) == 2) {
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

	}, {
		key: "thread_key",
		value: function thread_key(key) {
			if (this.type(key) == 3) {
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

	}, {
		key: "post_key",
		value: function post_key(key) {
			if (this.type(key) == 4) {
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

	}, {
		key: "conversation_key",
		value: function conversation_key(key) {
			if (this.type(key) == 5) {
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

	}, {
		key: "message_key",
		value: function message_key(key) {
			if (this.type(key) == 6) {
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

	}, {
		key: "super_forum_key",
		value: function super_forum_key(key) {
			if (this.type(key) == 7) {
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

	}, {
		key: "has_space",
		value: function has_space(key, object_id) {
			var max_length = this.super_forum_key(key) ? pb.data("plugin_max_super_forum_key_length") : pb.data("plugin_max_key_length");

			if (this.length(key, object_id) < max_length) {
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

	}, {
		key: "space_left",
		value: function space_left(key, object_id) {
			var max_length = this.super_forum_key(key) ? pb.data("plugin_max_super_forum_key_length") : pb.data("plugin_max_key_length");
			var key_length = this.length(key, object_id);
			var space_left = max_length - key_length;

			return space_left < 0 ? 0 : space_left;
		}

		/**
   * Gets max space (characters).
   *
   * @param {String} key The key to check.
   * @return {Number}
   */

	}, {
		key: "max_space",
		value: function max_space(key) {
			var max_length = this.super_forum_key(key) ? pb.data("plugin_max_super_forum_key_length") : pb.data("plugin_max_key_length");

			return max_length;
		}
	}]);

	return _class2;
}().init();

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

yootil.key.pruner = function () {
	function _class3() {
		var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		var _ref2$keys = _ref2.keys;
		var keys = _ref2$keys === undefined ? [] : _ref2$keys;
		var _ref2$object_id = _ref2.object_id;
		var object_id = _ref2$object_id === undefined ? undefined : _ref2$object_id;
		var _ref2$from = _ref2.from;
		var from = _ref2$from === undefined ? "front" : _ref2$from;

		_classCallCheck(this, _class3);

		if (!Array.isArray(keys)) {
			keys = [keys];
		}

		this.keys = keys;
		this.object_id = object_id;
		this.prune_from = from;
		this._pruned_data = [];
		this.convert_keys_to_objs();
	}

	_createClass(_class3, [{
		key: "convert_keys_to_objs",
		value: function convert_keys_to_objs() {
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = this.keys.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var _step3$value = _slicedToArray(_step3.value, 2);

					var index = _step3$value[0];
					var value = _step3$value[1];

					var obj = yootil.key(value);

					if (obj.exists()) {
						this.keys[index] = {

							key: obj,
							data: []

						};
					} else {
						delete this.keys[index];
					}
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}
		}
	}, {
		key: "prune",
		value: function prune() {
			var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			var _ref3$add = _ref3.add;
			var add = _ref3$add === undefined ? [] : _ref3$add;
			var _ref3$to = _ref3.to;
			var to = _ref3$to === undefined ? "end" : _ref3$to;

			if (!add || !this.keys.length) {
				return false;
			}

			if (!Array.isArray(add)) {
				add = [add];
			}

			var all_data = [];

			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;

			try {
				for (var _iterator4 = this.keys[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
					var _obj = _step4.value;

					var data = _obj.key.get(this.object_id);

					if (Array.isArray(data)) {
						all_data = all_data.concat(data);
					}
				}
			} catch (err) {
				_didIteratorError4 = true;
				_iteratorError4 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion4 && _iterator4.return) {
						_iterator4.return();
					}
				} finally {
					if (_didIteratorError4) {
						throw _iteratorError4;
					}
				}
			}

			var new_data_len = JSON.stringify(add).length;
			var max_len = this.keys[0].key.max_space();

			if (all_data.length) {
				var counter = 0;

				var _iteratorNormalCompletion5 = true;
				var _didIteratorError5 = false;
				var _iteratorError5 = undefined;

				try {
					for (var _iterator5 = this.keys[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
						var obj = _step5.value;

						var _max_len = obj.key.max_space();
						var all_data_len = all_data.length;

						for (var i = 0; i < all_data_len; ++i) {
							if (typeof all_data[i] != "undefined") {
								var add_len = 0;

								if (!i && !counter && to == "front" || to == "end" && i == all_data.length - 1 && counter == this.keys.length - 1) {
									add_len = new_data_len;
								}

								var elem_len = JSON.stringify(all_data[i]).length + JSON.stringify(obj.data).length + add_len;

								if (elem_len <= _max_len) {
									obj.data = obj.data.concat(all_data[i]);
									all_data.splice(i, 1);
									i--;
								}
							}
						}

						counter++;
					}
				} catch (err) {
					_didIteratorError5 = true;
					_iteratorError5 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion5 && _iterator5.return) {
							_iterator5.return();
						}
					} finally {
						if (_didIteratorError5) {
							throw _iteratorError5;
						}
					}
				}

				if (to == "front") {
					var f_key = this.keys[0];
					var first_key_len = JSON.stringify(f_key.data).length;

					if (first_key_len + JSON.stringify(add).length <= f_key.key.max_space()) {
						f_key.data = add.concat(f_key.data);
					} else {
						return false;
					}
				} else {
					var l_key = null;
					var l_key_index = 0;
					var last_key_len = 0;

					// Need to find last key with space left

					var cloned_keys = Array.from(this.keys);
					var key_counter = cloned_keys.length - 1;

					while (key_counter >= 0) {
						var key_obj = this.keys[key_counter];

						if (key_obj.key.space_left() >= JSON.stringify(add).length) {
							l_key = key_obj;
							l_key_index = key_counter;
							last_key_len = key_obj.key.length();
						}

						key_counter--;
					}

					if (l_key && last_key_len + JSON.stringify(add).length <= l_key.key.max_space()) {
						this.keys[l_key_index].data = this.keys[l_key_index].data.concat(add);
					} else {
						return false;
					}
				}

				if (all_data.length) {
					this._pruned_data = all_data;
				}
			} else if (new_data_len <= max_len) {
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

	}, {
		key: "save",
		value: function save() {
			var object_id = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

			var last = null;

			var _iteratorNormalCompletion6 = true;
			var _didIteratorError6 = false;
			var _iteratorError6 = undefined;

			try {
				for (var _iterator6 = this.keys[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
					var obj = _step6.value;

					var data = obj.data.length == 0 ? "" : obj.data;

					last = obj.key.set(data, object_id);
				}
			} catch (err) {
				_didIteratorError6 = true;
				_iteratorError6 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion6 && _iterator6.return) {
						_iterator6.return();
					}
				} finally {
					if (_didIteratorError6) {
						throw _iteratorError6;
					}
				}
			}

			return last;
		}
	}, {
		key: "pruned_data",
		value: function pruned_data() {
			return this._pruned_data;
		}
	}]);

	return _class3;
}();

/*

 let joiner = new yootil.key.joiner(["testy", "testy2"])

 console.log(joiner.data(yootil.user.id()));

 */

yootil.key.joiner = function () {

	/**
  * @param {String|Array} keys The keys that has data that will be joined.
  * @param {Number} object_id
  */

	function _class4() {
		var _ref4 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		var _ref4$keys = _ref4.keys;
		var keys = _ref4$keys === undefined ? [] : _ref4$keys;
		var _ref4$object_id = _ref4.object_id;
		var object_id = _ref4$object_id === undefined ? undefined : _ref4$object_id;

		_classCallCheck(this, _class4);

		if (!Array.isArray(keys)) {
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


	_createClass(_class4, [{
		key: "data",
		value: function data() {
			var json = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

			if (this.keys.length) {
				var data = "";
				var data_is_array = false;

				var _iteratorNormalCompletion7 = true;
				var _didIteratorError7 = false;
				var _iteratorError7 = undefined;

				try {
					for (var _iterator7 = this.keys[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
						var key = _step7.value;

						var the_data = yootil.key(key).get(this.object_id);

						if (Array.isArray(the_data)) {
							data_is_array = true;

							if (!Array.isArray(data)) {
								data = [];
							}

							data = data.concat(the_data);
						} else if (!data_is_array) {
							data += the_data || "";
						}
					}
				} catch (err) {
					_didIteratorError7 = true;
					_iteratorError7 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion7 && _iterator7.return) {
							_iterator7.return();
						}
					} finally {
						if (_didIteratorError7) {
							throw _iteratorError7;
						}
					}
				}

				if (!Array.isArray(data) && json && yootil.is_json(data)) {
					data = JSON.parse(data);
				}

				return data;
			}

			return null;
		}
	}]);

	return _class4;
}();

yootil.settings = function () {
	function _class5() {
		_classCallCheck(this, _class5);
	}

	_createClass(_class5, null, [{
		key: "init",
		value: function init() {
			this.images = {};
			this.bar = {

				enabled: 1,
				bar_position: 4

			};

			this.images = {};
		}
	}]);

	return _class5;
}();

/**
 * @class yootil.user
 * @static
 * Contains useful methods relating to the user currently viewing the page, most being wrappers at the moment.
 */

yootil.user = function () {
	function _class6() {
		_classCallCheck(this, _class6);
	}

	_createClass(_class6, null, [{
		key: "init",
		value: function init() {
			this._data = {};
			return this;
		}

		/**
   * This checks to see if the ProBoards data object exists and has a user object, we cache it as well.
   * @return {Boolean}
   * @ignore
   */

	}, {
		key: "has_data",
		value: function has_data() {
			if (this._data && typeof this._data.id != "undefined") {
				return true;
			} else {
				if (typeof proboards != "undefined") {
					var data = proboards.data;

					if (typeof data != "undefined" && typeof data == "function") {
						var user_data = proboards.data("user");

						if (typeof user_data != "undefined") {
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

	}, {
		key: "logged_in",
		value: function logged_in() {
			if (this.has_data()) {
				if (typeof this._data.is_logged_in != "undefined" && this._data.is_logged_in) {
					return true;
				}
			}

			return false;
		}

		/**
   * Gets the current users ID
   * @return {Number}
   */

	}, {
		key: "id",
		value: function id() {
			if (this.has_data()) {
				if (typeof this._data.id != "undefined") {
					return parseInt(this._data.id, 10);
				}
			}

			return null;
		}

		/**
   * Checks to see if the current user is staff
   * @return {Boolean}
   */

	}, {
		key: "staff",
		value: function staff() {
			if (this.has_data()) {
				if (typeof this._data.is_staff != "undefined" && this._data.is_staff) {
					return true;
				}
			}

			return false;
		}

		/**
   * Gets the users name
   * @return {String}
   */

	}, {
		key: "name",
		value: function name() {
			if (this.has_data()) {
				if (typeof this._data.name != "undefined") {
					return this._data.name;
				}
			}

			return "";
		}

		/**
   * Gets the users theme ID
   * @return {Number}
   */

	}, {
		key: "theme",
		value: function theme() {
			if (this.has_data()) {
				if (typeof this._data.theme_id != "undefined") {
					return this._data.theme_id;
				}
			}

			return 0;
		}

		/**
   * Gets the users path URL to their profile
   * @return {String}
   */

	}, {
		key: "url",
		value: function url() {
			if (this.has_data()) {
				if (typeof this._data.url != "undefined") {
					return this._data.url;
				}
			}

			return "";
		}

		/**
   * Gets the users avatar (HTML)
   * @return {String}
   */

	}, {
		key: "avatar",
		value: function avatar() {
			if (this.has_data()) {
				if (typeof this._data.avatar != "undefined") {
					return this._data.avatar;
				}
			}

			return "";
		}

		/**
   * Gets the users birthday object
   * @return {Object}
   */

	}, {
		key: "birthday",
		value: function birthday() {
			if (this.has_data()) {
				if (typeof this._data.birthday != "undefined") {
					return this._data.birthday;
				}
			}

			return {};
		}

		/**
   * Gets the users date format (i.e d/m/y)
   * @return {String}
   */

	}, {
		key: "date_format",
		value: function date_format() {
			if (this.has_data()) {
				if (typeof this._data.date_format != "undefined") {
					return this._data.date_format;
				}
			}

			return "";
		}

		/**
   * Gets the users post mode.
   * @return {Object}
   */

	}, {
		key: "post_mode",
		value: function post_mode() {
			if (this.has_data()) {
				if (typeof this._data.default_post_mode != "undefined") {
					return this._data.default_post_mode;
				}
			}

			return "";
		}

		/**
   * Gets the users friends
   * @return {Object}
   */

	}, {
		key: "friends",
		value: function friends() {
			if (this.has_data()) {
				if (typeof this._data.friends != "undefined") {
					return this._data.friends;
				}
			}

			return {};
		}

		/**
   * Checks to see if user has new messages
   * @return {Number}
   */

	}, {
		key: "has_new_messages",
		value: function has_new_messages() {
			if (this.has_data()) {
				if (typeof this._data.has_new_messages != "undefined") {
					return this._data.has_new_messages;
				}
			}

			return 0;
		}

		/**
   * Gets users instant messengers
   * @return {Object}
   */

	}, {
		key: "instant_messengers",
		value: function instant_messengers() {
			if (this.has_data()) {
				if (typeof this._data.instant_messengers != "undefined") {
					return this._data.instant_messengers;
				}
			}

			return {};
		}

		/**
   * Gets users last online object
   * @return {Object}
   */

	}, {
		key: "last_online",
		value: function last_online() {
			if (this.has_data()) {
				if (typeof this._data.last_online != "undefined") {
					return this._data.last_online;
				}
			}

			return {};
		}

		/**
   * Gets users post count
   * @return {Number}
   */

	}, {
		key: "posts",
		value: function posts() {
			if (this.has_data()) {
				if (typeof this._data.posts != "undefined") {
					return this._data.posts;
				}
			}

			return 0;
		}

		/**
   * Gets users rank
   * @return {Object}
   */

	}, {
		key: "rank",
		value: function rank() {
			if (this.has_data()) {
				if (typeof this._data.rank != "undefined") {
					return this._data.rank;
				}
			}

			return {};
		}

		/**
   * Gets users registered on date
   * @return {Object}
   */

	}, {
		key: "registered_on",
		value: function registered_on() {
			if (this.has_data()) {
				if (typeof this._data.registered_on != "undefined") {
					return this._data.registered_on;
				}
			}

			return {};
		}

		/**
   * Gets users status
   * @return {String}
   */

	}, {
		key: "status",
		value: function status() {
			if (this.has_data()) {
				if (typeof this._data.status != "undefined") {
					return this._data.status;
				}
			}

			return "";
		}

		/**
   * Gets users time format
   * @return {String}
   */

	}, {
		key: "time_format",
		value: function time_format() {
			if (this.has_data()) {
				if (typeof this._data.time_format != "undefined") {
					return this._data.time_format;
				}
			}

			return "";
		}

		/**
   * Gets users username
   * @return {String}
   */

	}, {
		key: "username",
		value: function username() {
			if (this.has_data()) {
				if (typeof this._data.username != "undefined") {
					return this._data.username;
				}
			}

			return "";
		}

		/**
   * Gets users group ids
   * @return {Array}
   */

	}, {
		key: "group_ids",
		value: function group_ids() {
			if (this.has_data()) {
				if (typeof this._data.group_ids != "undefined") {
					return this._data.group_ids;
				}
			}

			return [];
		}

		/**
   * Gets users groups
   * @return {Object}
   */

	}, {
		key: "groups",
		value: function groups() {
			if (this.has_data()) {
				if (typeof this._data.groups != "undefined") {
					return this._data.groups;
				}
			}

			return {};
		}

		/**
   * Checks if the member is invisible
   * @return {Boolean}
   */

	}, {
		key: "invisible",
		value: function invisible() {
			if (this.has_data()) {
				if (typeof this._data.is_invisible != "undefined" && this._data.is_invisible) {
					return true;
				}
			}

			return false;
		}

		/**
   * Checks if the member has proboards plus on
   * @return {Boolean}
   */

	}, {
		key: "proboards_plus",
		value: function proboards_plus() {
			if (this.has_data()) {
				if (typeof this._data.proboards_plus != "undefined" && this._data.proboards_plus) {
					return true;
				}
			}

			return false;
		}

		/**
   * Gets the users block list
   * @return {Object}
   */

	}, {
		key: "block_list",
		value: function block_list() {
			if (this.has_data()) {
				if (typeof this._data.block_list != "undefined" && this._data.block_list) {
					return this._data.block_list;
				}
			}

			return {};
		}
	}]);

	return _class6;
}().init();


yootil.init();