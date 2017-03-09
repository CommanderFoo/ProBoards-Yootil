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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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

/**
 * @class yootil.animation
 * @constructor
 *
 *     let last_time = 0;
 *
 *     new yootil.animation({
 *
 *     	   callback: (animator, start_time, current_time, duration, anim_id) => {
 *		       if(current_time >= (last_time + 2000)){
 *  	    		console.log("hello world!"); // will show every 2 seconds
 *			        last_time = current_time;
 *	       		}
 *	       },
 *
 *         duration: 20000
 *
 *     }).start();
 *
 * @param {Function} [$0.callback] The function to be called on each frame.
 * @param {Number} [$0.duration] The length of the animation.
 * @param {Boolean} [$0.start] Pass true to auto start.
 */

yootil.animation = function () {
	function _class() {
		var _this = this;

		var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		var _ref$callback = _ref.callback;
		var callback = _ref$callback === undefined ? null : _ref$callback;
		var _ref$duration = _ref.duration;
		var duration = _ref$duration === undefined ? 0 : _ref$duration;
		var _ref$start = _ref.start;
		var start = _ref$start === undefined ? false : _ref$start;

		_classCallCheck(this, _class);

		if (!callback) {
			console.error("yootil.animation constructor: No callback passed");
		}

		this._anim_id = 0;
		this._callback = callback;
		this._start = start;
		this._duration = duration;
		this._time_start = 0;

		this._anim_func = function (current_time) {
			if (!_this._time_start) {
				_this._time_start = current_time;
			}

			if (duration && current_time - _this._time_start > duration) {
				return;
			}

			_this._callback(_this, _this._time_start, current_time, _this._duration, _this._anim_id);
			_this._anim_id = requestAnimationFrame(_this._anim_func);
		};

		if (this._start) {
			this.start();
		}
	}

	_createClass(_class, [{
		key: "repeat",
		value: function repeat() {
			if (this._anim_id) {
				this._time_start = 0;
				this._anim_func();
			}
		}
	}, {
		key: "start",
		value: function start() {
			if (!this._anim_id) {
				this._anim_id = requestAnimationFrame(this._anim_func);
			}
		}
	}, {
		key: "stop",
		value: function stop() {
			if (this._anim_id) {
				cancelAnimationFrame(this._anim_id);
				this._anim_id = 0;
			}
		}
	}]);

	return _class;
}();

// This will likely be removed in v6

yootil.bar = function () {
	function _class2() {
		_classCallCheck(this, _class2);
	}

	_createClass(_class2, null, [{
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
			var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			var _ref2$url = _ref2.url;
			var url = _ref2$url === undefined ? "" : _ref2$url;
			var _ref2$img = _ref2.img;
			var img = _ref2$img === undefined ? "" : _ref2$img;
			var _ref2$alt = _ref2.alt;
			var alt = _ref2$alt === undefined ? "" : _ref2$alt;
			var _ref2$key = _ref2.key;
			var key = _ref2$key === undefined ? "" : _ref2$key;
			var _ref2$func = _ref2.func;
			var func = _ref2$func === undefined ? null : _ref2$func;
			var _ref2$context = _ref2.context;
			var context = _ref2$context === undefined ? null : _ref2$context;

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

	return _class2;
}();

/**
 * @class yootil.clock
 * @constructor
 *
 * let clock = new yootil.clock();
 *
 * clock.start();
 * clock.stop();
 * console.log(clock.elapsed());
 *
 * @param {Boolean} [start] If true, then the clock will start right away.
 * @param {Boolean} [seconds] If true, then "elapsed" will return seconds.
 */

yootil.clock = function () {
	function _class3() {
		var start = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
		var seconds = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

		_classCallCheck(this, _class3);

		this._start = this._old = this._elapsed = 0;
		this._running = start ? true : false;
		this._seconds = seconds;

		if (start) {
			this.start();
		}
	}

	_createClass(_class3, [{
		key: "start",
		value: function start() {
			this._start = this._old = performance.now();
			this._running = true;
		}
	}, {
		key: "stop",
		value: function stop() {
			this.delta();
			this._running = false;
		}
	}, {
		key: "resume",
		value: function resume() {
			this._running = true;
		}
	}, {
		key: "elapsed",
		value: function elapsed() {
			this.delta();

			return this._elapsed;
		}
	}, {
		key: "delta",
		value: function delta() {
			var diff = 0;

			if (this._running) {
				var new_time = performance.now();

				diff = new_time - this._old;

				if (this._seconds) {
					diff /= 1000;
				};

				this._old = new_time;
				this._elapsed += diff;
			}

			return diff;
		}
	}]);

	return _class3;
}();

/**
 * @class yootil.create
 * @static
 * Contains useful methods to creating things quickly (i.e containers).
 */

yootil.create = function () {
	function _class4() {
		_classCallCheck(this, _class4);
	}

	_createClass(_class4, null, [{
		key: "container",


		/**
   * Creates ProBoards div containers.
   *
   * Example:
   *
   *     let $container = yootil.create.container({
   *
   *        title: "My Title",
   *        content: "My Content",
   *        h2: true
   *
   *     });
   *
   *     $("#content").prepend($container);
   *
   * @param {String} $0.title Title of the container.
   * @param {Boolean} [$0.h2] If set to true, it will not wrap the title with an h2 tag.
   * @param {String} $0.content Content of the container
   *
   * @return {Object} jQuery
   */

		value: function container() {
			var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			var _ref3$title = _ref3.title;
			var title = _ref3$title === undefined ? "" : _ref3$title;
			var _ref3$h = _ref3.h2;
			var h2 = _ref3$h === undefined ? true : _ref3$h;
			var _ref3$content = _ref3.content;
			var content = _ref3$content === undefined ? "" : _ref3$content;

			var html = "";

			title = !h2 ? title : "<h2>" + title + "</h2>";

			html += "<div class=\"container\">";
			html += "<div class=\"title-bar\">" + title + "</div>";
			html += "<div class=\"content pad-all\">" + content + "</div>";
			html += "</div>";

			return $(html);
		}

		/**
   * Quickly create a blank page that matches a certain URL.
   *
   *     yootil.create.page({pattern: "shop", title: "Shop"});
   *
   * An example adding a container to the page:
   *
   *     yootil.create.page({pattern: "shop", title: "Shop"}).container("The Shop", "Welcome to the Shop").appendTo("#content");
   *
   * @param {String|Object} $0.pattern This will get matched against the location.href value, can be a string or RegExp object.
   * @param {String} [$0.title] Gets Added onto the current document title.
   * @param {Boolean} [$0.hide_content] By default the children of #content gets hidden, you can override this.
   * @chainable
   */

	}, {
		key: "page",
		value: function page() {
			var _ref4 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			var _ref4$pattern = _ref4.pattern;
			var pattern = _ref4$pattern === undefined ? null : _ref4$pattern;
			var _ref4$title = _ref4.title;
			var title = _ref4$title === undefined ? "" : _ref4$title;
			var _ref4$hide_content = _ref4.hide_content;
			var hide_content = _ref4$hide_content === undefined ? true : _ref4$hide_content;

			if (!pattern) {
				return this;
			}

			var reg = pattern.constructor == RegExp ? pattern : new RegExp("\/\?" + pattern, "i");

			if (pattern && location.href.match(reg)) {
				if (typeof title != "undefined" && title.length) {
					document.title += " - " + title;
				}

				if (typeof hide_content == "undefined" || hide_content) {
					$("#content").children().hide();
				}
			}

			return this;
		}

		/**
   * Extend the nav tree easily.
   *
   *     yootil.create.nav_branch({url: "/shop/", text: "Shop"});
   *
   * @param {String} $0.url URL of the branch.
   * @param {String} $0.text Text of the branch.
   * @return {Object} Branch jQuery wrapped.
   */

	}, {
		key: "nav_branch",
		value: function nav_branch() {
			var _ref5 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			var _ref5$url = _ref5.url;
			var url = _ref5$url === undefined ? "/" : _ref5$url;
			var _ref5$text = _ref5.text;
			var text = _ref5$text === undefined ? "" : _ref5$text;

			var $branch = yootil.get.last_nav_branch().clone();

			if ($branch.length) {
				$branch.find("a").attr("href", url).find("span").html(text);
				$branch.appendTo(yootil.get.nav_tree());
			}

			return $branch;
		}

		/**
   * Create a new tab on the profile
   *
   *     yootil.create.profile_tab({text: "Test", page: "test", active: false});
   *	 *
   * @param {String} $0.text Text of the branch.
   * @param {String} $0.page URL of the branch.
   * @param {Boolean} [$0.active] Active page or not.
   * @chainable
   */

	}, {
		key: "profile_tab",
		value: function profile_tab() {
			var _ref6 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			var _ref6$text = _ref6.text;
			var text = _ref6$text === undefined ? "" : _ref6$text;
			var _ref6$page = _ref6.page;
			var page = _ref6$page === undefined ? "/" : _ref6$page;
			var _ref6$active = _ref6.active;
			var active = _ref6$active === undefined ? false : _ref6$active;

			if (yootil.location.profile()) {
				var active_class = active ? " class='ui-active'" : "";
				var $ul = $("div.show-user div.ui-tabMenu:first ul");

				if ($ul.length) {
					$ul.append($("<li" + active_class + "><a href='/user/" + yootil.page.member.id() + "/" + page + "'>" + text + "</a></li>"));
				}
			}

			return this;
		}

		/**
   * Creates a profile content box.  Doesn't add to the DOM.
   *
   *     yootil.create.profile_content_box();
   *
   * @param {String} id Enter a ID, or a unique one will be created.
   * @return {Object} The box is returned wrapped with jQuery.
   */

	}, {
		key: "profile_content_box",
		value: function profile_content_box() {
			var id = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

			var uid = id || $.unique_id("yootil-");

			return $("<div />").addClass("content-box center-col").attr("id", uid);
		}

		/**
   * Adds a new BBC button to the end on the reply page.
   *
   * Note:  Due to the WYSIWYG being dynamically created, this can fail.
   *
   * @param {Object} $0.img The image element to append.
   * @param {Function} [$0.func] Adds an onlick event.
   * @chainable
   */

	}, {
		key: "bbc_button",
		value: function bbc_button() {
			var _ref7 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			var _ref7$img = _ref7.img;
			var img = _ref7$img === undefined ? "" : _ref7$img;
			var _ref7$func = _ref7.func;
			var func = _ref7$func === undefined ? null : _ref7$func;

			$(function () {
				var $li = $("<li>").addClass("button").append($(img));

				if (func) {
					$li.click(func);
				}

				var $controls = $(".editor .ui-wysiwyg .controls");
				var $ul = $controls.find(".bbcode-editor, .visual-editor").find(".group:last ul:last");

				if ($controls.length && $ul.length) {
					$ul.append($li);
				}
			});

			return this;
		}

		/**
   * Creates a new tab next to the BBCode tab on post / message reply pages.
   *
   *     let $my_tab = yootil.create.ubbc_tab("My Title", "My Content");
   *
   * An example using the hide and show events:
   *
   *     let $my_tab2 = yootil.create.ubbc_tab("My Title 2", "My Content 2", "myid2", null, {
   *
   *         show: function(tab, tab_content){
   *     		   tab.css("background-color", "red");
   *         },
   *
   *         hide: function(tab, tab_content){
   *     		   tab.css("background-color", "");
   *         }
   *
   *     );
   *
   * @param {String} $0.title The title for the tab, this can contain HTML.
   * @param {String} $0.content The content that will be shown when the tab is clicked.  HTML can be used.
   * @param {String} [$0.id] The id for this tab.  If not specified a random one will be created.
   * @param {Object} [$0.css] You can apply an object of css values that jQuery will apply, or defaults will be used.
   * @param {Object} [$0.events] There are 2 events, show and hide.
   * @param {Function} [$0.events.show] When the tab is clicked, this event will be called.  Tab and content are passed.
   * @param {Function} [$0.events.hide] When another tab is click, this event will be called.  Tab and content are passed.
   * @param {Function} [$0.events.context] Set the context of the functions.
   * @return {Object} The tab content div is returned wrapped with jQuery.
   */

	}, {
		key: "bbc_tab",
		value: function bbc_tab() {
			var _ref8 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			var _ref8$title = _ref8.title;
			var title = _ref8$title === undefined ? "My Tab" : _ref8$title;
			var _ref8$content = _ref8.content;
			var content = _ref8$content === undefined ? "" : _ref8$content;
			var _ref8$id = _ref8.id;
			var id = _ref8$id === undefined ? "" : _ref8$id;
			var _ref8$css = _ref8.css;
			var css = _ref8$css === undefined ? null : _ref8$css;
			var _ref8$events = _ref8.events;
			var events = _ref8$events === undefined ? {} : _ref8$events;

			id = id || yootil.timestamp();

			var $wysiwyg_tabs = $(".editor ul.wysiwyg-tabs");
			var $tab = $("<li id='menu-item-" + id + "'><a href='#'>" + title + "</a></li>");
			var $tab_content = $("<div id='" + id + "'>" + content + "</div>");

			$wysiwyg_tabs.append($tab);

			if (css && (typeof css === "undefined" ? "undefined" : _typeof(css)) == "object") {
				$tab_content.css(css);
			} else {
				$tab_content.css({

					border: "1px solid #E6E6E6",
					padding: "5px"

				});
			}

			$tab_content.hide().insertBefore($wysiwyg_tabs);

			$wysiwyg_tabs.find("li").click(function (e) {
				var $active = $(this);

				e.preventDefault();

				$active.parent().find("li").removeClass("ui-active");
				$active.addClass("ui-active");

				$active.parent().find("li").each(function () {
					var id = $(this).attr("id");

					if (id.match(/bbcode|visual/i)) {
						$(".editor .ui-wysiwyg .editors").hide();
					} else {
						if ($active.attr("id") == id) {
							return;
						}

						var _selector = "";

						if (id) {
							_selector = "#" + id.split("menu-item-")[1];
						}

						if ($(_selector).length) {
							if (events && events.hide) {
								if (events.context) {
									events.hide.bind(events.context)($tab, $tab_content);
								} else {
									events.hide($tab, $tab_content);
								}
							}

							$(_selector).hide();
						}
					}
				});

				var id = $active.attr("id");
				var selector = "";

				if (id) {
					selector = "#" + id.split("menu-item-")[1];
				}

				if (id.match(/bbcode|visual/i)) {
					$(".editor .ui-wysiwyg .editors").show();
				} else if ($(selector).length) {
					console.log(events);

					if (events && events.show) {
						if (events.context) {
							events.show.bind(events.context)($tab, $tab_content);
						} else {
							events.show($tab, $tab_content);
						}
					}

					$(selector).show();
				}
			});

			return $tab_content;
		}
	}]);

	return _class4;
}();

/**
 * @class yootil.event
 * @static
 *
 * Useful methods for event / ajax related stuff.
 */

yootil.event = function () {
	function _class5() {
		_classCallCheck(this, _class5);
	}

	_createClass(_class5, null, [{
		key: "init",
		value: function init() {
			proboards.events.post_liked = [];
			proboards.events.post_likedOne = [];

			proboards.events.bookmarked_thread = [];
			proboards.events.bookmarked_threadOne = [];

			proboards.events.updated_status = [];
			proboards.events.updated_statusOne = [];

			proboards.events.shoutbox_shouted = [];
			proboards.events.shoutbox_shoutedOne = [];

			proboards.events.shoutbox_updated = [];
			proboards.events.shoutbox_updatedOne = [];

			proboards.events.shoutbox_removed = [];
			proboards.events.shoutbox_removedOne = [];

			proboards.events.user_searched = [];
			proboards.events.user_searchedOne = [];

			$.ajaxPrefilter(function (opts, orig_opts) {
				var orig_success = orig_opts.success;
				var evt = "";

				switch (orig_opts.url) {

					case proboards.routeMap["post_like"]:
						evt = "post_liked";
						break;

					case proboards.routeMap["bookmark_threads"]:
						evt = "bookmarked_thread";
						break;

					case proboards.routeMap["update_status"]:
						evt = "updated_status";
						break;

					case proboards.routeMap["shoutbox_add"]:
						evt = "shoutbox_shouted";
						break;

					case proboards.routeMap["shoutbox_update"]:
						evt = "shoutbox_updated";
						break;

					case proboards.routeMap["shoutbox_remove"]:
						evt = "shoutbox_removed";
						break;

					case proboards.routeMap["user_search"]:
						evt = "user_searched";
						break;

				}

				if (evt) {
					opts.success = function () {
						orig_success.bind(this)(arguments);
						proboards.events.run(evt, {

							args: arguments

						});
					};
				}
			});

			return this;
		}

		/**
   * Will run after an auto-search (note: this occurs when a board or thread page are first loaded as well).
   *
   * @param {Function} func The function that will be called after search.
   * @param {Object} [context] Context of func.
   * @chainable
   */

	}, {
		key: "after_search",
		value: function after_search(func) {
			var context = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

			proboards.on("afterSearch", context ? func.bind(context) : func);

			return this;
		}

		/**
   * Will run when the user clicks on a column title to sort a list.
   *
   * @param {Function} func The function that will be called after search.
   * @param {Object} [context] Context of func.
   * @chainable
   */

	}, {
		key: "column_sort",
		value: function column_sort(func) {
			var context = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

			proboards.on("columnSort", context ? func.bind(context) : func);

			return this;
		}

		/**
   * Will run when the 'Show More' link is clicked on a user's activity page.
   *
   * @param {Function} func The function that will be called after search.
   * @param {Object} [context] Context of func.
   * @chainable
   */

	}, {
		key: "more_activity",
		value: function more_activity(func) {
			var context = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

			proboards.on("moreActivity", context ? func.bind(context) : func);

			return this;
		}

		/**
   * Will run when the 'Show More' link is clicked on a user's notifications page.
   *
   * @param {Function} func The function that will be called after search.
   * @param {Object} [context] Context of func.
   * @chainable
   */

	}, {
		key: "more_notification",
		value: function more_notification(func) {
			var context = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

			proboards.on("moreNotification", context ? func.bind(context) : func);

			return this;
		}

		/**
   * Will run when paginating.
   *
   * @param {Function} func The function that will be called after search.
   * @param {Object} [context] Context of func.
   * @chainable
   */

	}, {
		key: "page_change",
		value: function page_change(func) {
			var context = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

			proboards.on("pageChange", context ? func.bind(context) : func);

			return this;
		}

		/**
   * Will run when a post it liked.
   *
   * @param {Function} func The function that will be called after search.
   * @param {Object} [context] Context of func.
   * @chainable
   */

	}, {
		key: "post_liked",
		value: function post_liked(func) {
			var context = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

			proboards.on("post_liked", function () {
				(context ? func.bind(context) : func)(this.args || []);
			});

			return this;
		}

		/**
   * Will run when a thread is bookmarked.
   *
   * @param {Function} func The function that will be called after search.
   * @param {Object} [context] Context of func.
   * @chainable
   */

	}, {
		key: "bookmarked_thread",
		value: function bookmarked_thread(func) {
			var context = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

			proboards.on("bookmarked_thread", function () {
				(context ? func.bind(context) : func)(this.args || []);
			});

			return this;
		}

		/**
   * Will run when a user updates their status.
   *
   * @param {Function} func The function that will be called after search.
   * @param {Object} [context] Context of func.
   * @chainable
   */

	}, {
		key: "updated_status",
		value: function updated_status(func) {
			var context = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

			proboards.on("updated_status", function () {
				(context ? func.bind(context) : func)(this.args || []);
			});

			return this;
		}

		/**
   * Will run when a user posts a shout in the shoutbox.
   *
   * @param {Function} func The function that will be called after search.
   * @param {Object} [context] Context of func.
   * @chainable
   */

	}, {
		key: "shoutbox_shouted",
		value: function shoutbox_shouted(func) {
			var context = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

			proboards.on("shoutbox_shouted", function () {
				(context ? func.bind(context) : func)(this.args || []);
			});

			return this;
		}

		/**
   * Will run when the shoutbox updates (i.e fetching new messages).
   *
   * @param {Function} func The function that will be called after search.
   * @param {Object} [context] Context of func.
   * @chainable
   */

	}, {
		key: "shoutbox_updated",
		value: function shoutbox_updated(func) {
			var context = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

			proboards.on("shoutbox_updated", function () {
				(context ? func.bind(context) : func)(this.args || []);
			});

			return this;
		}

		/**
   * Will run when a shout is removed.
   *
   * @param {Function} func The function that will be called after search.
   * @param {Object} [context] Context of func.
   * @chainable
   */

	}, {
		key: "shoutbox_removed",
		value: function shoutbox_removed(func) {
			var context = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

			proboards.on("shoutbox_removed", function () {
				(context ? func.bind(context) : func)(this.args || []);
			});

			return this;
		}

		/**
   * Will run when a user is being searched (i.e bbc insert user link).
   *
   * @param {Function} func The function that will be called after search.
   * @param {Object} [context] Context of func.
   * @chainable
   */

	}, {
		key: "user_searched",
		value: function user_searched(func) {
			var context = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

			proboards.on("user_searched", function () {
				(context ? func.bind(context) : func)(this.args || []);
			});

			return this;
		}
	}]);

	return _class5;
}().init();

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

yootil.extension = function () {
	function _class6() {
		_classCallCheck(this, _class6);
	}

	_createClass(_class6, null, [{
		key: "init",
		value: function init() {
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

	}, {
		key: "create",
		value: function create() {
			var _ref9 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			var _ref9$plugin = _ref9.plugin;
			var plugin = _ref9$plugin === undefined ? "" : _ref9$plugin;
			var _ref9$id = _ref9.id;
			var id = _ref9$id === undefined ? "" : _ref9$id;
			var _ref9$handlers = _ref9.handlers;
			var handlers = _ref9$handlers === undefined ? null : _ref9$handlers;

			if (!plugin || !key || !handlers) {
				return;
			}

			var plugin_name = plugin.toString().toUpperCase() + "_EXTENSIONS";
			var id_name = id.toString().toUpperCase();

			if (!this._plugin_extensions.has(plugin_name)) {
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

	}, {
		key: "run",
		value: function run() {
			var _this2 = this;

			var plugin = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

			var methods = Object.create(null);

			methods.pre_inits = function () {
				if (!_this2.plugin_exists(plugin)) {
					return;
				}

				var exts = _this2.fetch(plugin);

				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = exts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _step$value = _slicedToArray(_step.value, 2);

						var ext_name = _step$value[0];
						var klass = _step$value[1];

						if (typeof klass.pre_init != "undefined") {
							klass.pre_init();
						}
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
			};

			methods.inits = function () {
				if (!_this2.plugin_exists(plugin)) {
					return;
				}

				var exts = _this2.fetch(plugin);

				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = exts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var _step2$value = _slicedToArray(_step2.value, 2);

						var ext_name = _step2$value[0];
						var klass = _step2$value[1];

						if (typeof klass.init != "undefined") {
							klass.init();
						}
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
			};

			methods.post_inits = function () {
				if (!_this2.plugin_exists(plugin)) {
					return;
				}

				var exts = _this2.fetch(plugin);

				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;

				try {
					for (var _iterator3 = exts[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var _step3$value = _slicedToArray(_step3.value, 2);

						var ext_name = _step3$value[0];
						var klass = _step3$value[1];

						if (typeof klass.post_init != "undefined") {
							klass.post_init();
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
			};

			methods.ready = function () {
				if (!_this2.plugin_exists(plugin)) {
					return;
				}

				var exts = _this2.fetch(plugin);

				var _iteratorNormalCompletion4 = true;
				var _didIteratorError4 = false;
				var _iteratorError4 = undefined;

				try {
					for (var _iterator4 = exts[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
						var _step4$value = _slicedToArray(_step4.value, 2);

						var ext_name = _step4$value[0];
						var klass = _step4$value[1];

						if (typeof klass.ready != "undefined") {
							klass.ready();
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
			};

			return methods;
		}
	}, {
		key: "plugin_exists",
		value: function plugin_exists() {
			var plugin = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

			return this._plugin_extensions.has(plugin.toUpperCase() + "_EXTENSIONS");
		}
	}, {
		key: "exists",
		value: function exists() {
			var plugin = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
			var ext_name = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

			if (this.plugin_exists(plugin)) {
				return this._plugin_extensions.get(plugin.toUpperCase() + "_EXTENSIONS").has(ext_name.toUpperCase());
			}

			return false;
		}
	}, {
		key: "fetch",
		value: function fetch() {
			var plugin = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

			if (this.plugin_exists(plugin)) {
				return this._plugin_extensions.get(plugin.toUpperCase() + "_EXTENSIONS");
			}

			return null;
		}
	}, {
		key: "plugin_extensions",
		get: function get() {
			return this._plugin_extensions;
		}
	}]);

	return _class6;
}().init();

/**
 * @class yootil.forum
 * @static
 * Wrapper around the ProBoards data hash object to get forum info.
 */

yootil.forum = function () {
	function _class7() {
		_classCallCheck(this, _class7);
	}

	_createClass(_class7, null, [{
		key: "__get_data",


		/**
   * This is an internal method.
   *
   * @param {String} key The key on the page object to check and get.
   * @return {String|Object|Number|Array}
   * @ignore
   */

		value: function __get_data(key) {
			if (proboards && proboards.dataHash && typeof proboards.dataHash[key] != "undefined") {
				return proboards.dataHash[key];
			}

			return "";
		}

		/**
   * Checks if the forum is ad free.
   *
   * @return {Boolean}
   */

	}, {
		key: "ad_free",
		value: function ad_free() {
			return this.__get_data("ad_free") == 1;
		}

		/**
   * Gets the forum default avatar.
   *
   * @return {String}
   */

	}, {
		key: "default_avatar",
		value: function default_avatar() {
			return this.__get_data("default_avatar");
		}

		/**
   * Gets the forum ID.
   *
   * @return {String} This is stored as a string by ProBoards.
   */

	}, {
		key: "id",
		value: function id() {
			return this.__get_data("forum_id");
		}

		/**
   * Gets the forum login url.
   *
   * @return {String}
   */

	}, {
		key: "login_url",
		value: function login_url() {
			return this.__get_data("login_url");
		}

		/**
   * Checks if the current use is a guest or not.
   *
   * @return {Boolean}
   */

	}, {
		key: "guest",
		value: function guest() {
			return this.__get_data("is_current_user_guest") == 1;
		}

		/**
   * Gets url for marking boards as read.
   *
   * @return {String}
   */

	}, {
		key: "mark_boards_read_url",
		value: function mark_boards_read_url() {
			return this.__get_data("mark_boards_read_url");
		}

		/**
   * Gets plugin key length for all keys not including super forum key.
   *
   * @return {Number}
   */

	}, {
		key: "max_key_length",
		value: function max_key_length() {
			return this.__get_data("plugin_max_key_length");
		}

		/**
   * Gets key length for the super forum key.
   *
   * @return {Number}
   */

	}, {
		key: "max_super_forum_key_length",
		value: function max_super_forum_key_length() {
			return this.__get_data("plugin_max_super_forum_key_length");
		}

		/**
   * Gets forum register url.
   *
   * @return {String}
   */

	}, {
		key: "register_url",
		value: function register_url() {
			return this.__get_data("register_url");
		}

		/**
   * Gets forums "new" post image.
   *
   * @return {String}
   */

	}, {
		key: "new_post_image",
		value: function new_post_image() {
			return this.__get_data("home_new_post_src");
		}

		/**
   * Gets forums image path.
   *
   * @return {String}
   */

	}, {
		key: "image_path",
		value: function image_path() {
			return this.__get_data("image_path");
		}

		/**
   * Gets forums locale settings.
   *
   * @return {object}
   */

	}, {
		key: "locale_settings",
		value: function locale_settings() {
			return this.__get_data("locale_settings") || {};
		}

		/**
   * Is the forum on military time.
   *
   * @return {Number}
   */

	}, {
		key: "military_time",
		value: function military_time() {
			return this.__get_data("military_time");
		}

		/**
   * Max search query length.
   *
   * @return {Number}
   */

	}, {
		key: "max_search_query",
		value: function max_search_query() {
			return this.__get_data("search-query-max");
		}

		/**
   * Min search query length.
   *
   * @return {Number}
   */

	}, {
		key: "min_search_query",
		value: function min_search_query() {
			return this.__get_data("search-query-min");
		}

		/**
   * Server date.
   *
   * @return {Number}
   */

	}, {
		key: "server_date",
		value: function server_date() {
			return this.__get_data("serverDate");
		}

		/**
   * Time style
   *
   * @return {Number}
   */

	}, {
		key: "time_style",
		value: function time_style() {
			return this.__get_data("time_style");
		}

		/**
   * Time zone
   *
   * @return {Number}
   */

	}, {
		key: "time_zone",
		value: function time_zone() {
			return this.__get_data("timezone");
		}

		/**
   * CSRF Token
   *
   * @return {String}
   */

	}, {
		key: "csrf_token",
		value: function csrf_token() {
			return this.__get_data("csrf_token");
		}
	}]);

	return _class7;
}();

/**
 * @alias yootil.get
 * @static
 * Quick methods to get certain elements.
 */

yootil.get = function () {
	function _class8() {
		_classCallCheck(this, _class8);
	}

	_createClass(_class8, null, [{
		key: "mini_profiles",


		/**
   * Gets mini profiles.
   *
   *     yootil.get.mini_profiles(); // Gets all mini profiles
   *
   *     yootil.get.mini_profiles(1); // Gets all mini profiles for user id 1
   *
   * @param {Number} [user_id] If specified, it will match mini profiles for that user id.
   * @return {Array} Matched mini profiles are returned back.
   */

		value: function mini_profiles() {
			var user_id = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

			var id = parseInt(user_id, 10);
			var selector = id ? ":has(a.user-link.user-" + id + ")" : "";

			return $(".item .mini-profile" + selector);
		}

		/**
   * Gets mini profile avatars.
   *
   *     yootil.get.mini_profile_avatars(); // Gets all avatars
   *
   *     yootil.get.mini_profile_avatars(1); // Gets all avatars for user id 1
   *
   * @param {Number} [user_id] If specified, it will match avatars for that user id.
   * @return {Array} Matched avatars are returned back.
   */

	}, {
		key: "mini_profile_avatars",
		value: function mini_profile_avatars() {
			var user_id = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

			var id = parseInt(user_id, 10);
			var selector = id ? ":has(a.user-link.user-" + id + ")" : "";

			return $(".item .mini-profile .avatar" + selector);
		}

		/**
   * Gets mini profile user links.
   *
   *     yootil.get.mini_profile_user_links(1); // Gets all user links for user id 1
   *
   *     yootil.get.mini_profile_user_links(); // Gets all user links
   *
   * @param {Number} [user_id] If specified, it will match user links for that user id.
   * @return {Array} Matched user links are returned back.
   */

	}, {
		key: "mini_profile_user_links",
		value: function mini_profile_user_links() {
			var user_id = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

			var id = parseInt(user_id, 10);
			var selector = id ? ".user-" + id : "";

			return $(".item .mini-profile a.user-link" + selector);
		}

		/**
   * Gets posts.
   *
   *     yootil.get.posts(); // Get all posts
   *
   *     yootil.get.posts(123); // Gets post with id 123
   *
   * @param {Number} [post_id] The post id for the post to get.
   * @return {Array} Matched posts are returned.
   */

	}, {
		key: "posts",
		value: function posts() {
			var post_id = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

			var id = parseInt(post_id, 10);
			var selector = id ? "-" + id : "";

			return $("tr.item[id^=post" + selector + "]");
		}

		/**
   * Gets messages.
   *
   *     yootil.get.messages(); // Get all messages
   *
   *     yootil.get.messages(123); // Gets post with id 123
   *
   * @param {Number} [message_id] The message id for the message to get.
   * @return {Array} Matched messages are returned.
   */

	}, {
		key: "messages",
		value: function messages() {
			var message_id = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

			var id = parseInt(message_id, 10);
			var selector = id ? "-" + id : "";

			return $("tr.item[id^=message" + selector + "]");
		}

		/**
   * Gets user posts.
   *
   *     yootil.get.user_posts(1); // Gets all posts for user id 1
   *
   * @param {Number} [user_id] The user id to find posts for.
   * @return {Array} Matched posts are returned.
   */

	}, {
		key: "user_posts",
		value: function user_posts() {
			var user_id = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

			var id = parseInt(user_id, 10);

			if (!id) {
				return [];
			}

			return $("tr.item[id^=post]:has(.mini-profile a.user-link.user-" + id + ")");
		}

		/**
   * Gets user messages.
   *
   *     yootil.get.user_messages(1); // Gets all messages for user id 1
   *
   * @param {Number} [user_id] The user id to find messages for.
   * @return {Array} Matched messages are returned.
   */

	}, {
		key: "user_messages",
		value: function user_messages() {
			var user_id = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

			var id = parseInt(user_id, 10);

			if (!id) {
				return [];
			}

			return $("tr.item[id^=message]:has(.mini-profile a.user-link.user-" + id + ")");
		}

		/**
   * Gets the quick reply.
   *
   * @return {Array}
   */

	}, {
		key: "quick_reply",
		value: function quick_reply() {
			return $(".quick-reply");
		}

		/**
   * Gets mini profile info sections.
   *
   *     yootil.get.mini_profile_info(); // Gets all mini profile info
   *
   *     yootil.get.mini_profile_info(1); // Gets all mini profile info for the user id 1
   *
   * @param {Number} [user_id] If specified, it will match user links for that user id.
   * @return {Array} Matched user links are returned back.
   */

	}, {
		key: "mini_profile_info",
		value: function mini_profile_info() {
			var user_id = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

			var id = parseInt(user_id, 10);
			var selector = id ? ":has(a.user-link.user-" + id + ")" : "";

			return $(".item .mini-profile" + selector + " .info");
		}

		/**
   * Gets signatures for posts and messages.
   *
   *     yootil.get.signatures(); // Gets all signatures
   *
   *     yootil.get.signatures(1); // Gets all signatures for the user id 1
   *
   * @param {Number} [user_id] If specified, it will match for that user id.
   * @return {Array} Matched results are returned back.
   */

	}, {
		key: "signatures",
		value: function signatures() {
			var user_id = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

			var id = parseInt(user_id, 10);
			var selector = id ? ":has(.mini-profile a.user-link.user-" + id + ")" : "";

			return $("tr.item[id^=post-]" + selector + " .foot .signature, tr[id^=message-]" + selector + " .foot .signature");
		}

		/**
   * Gets last edit.
   *
   *     yootil.get.last_edit(); // Gets all last edits
   *
   *     yootil.get.last_edit(1); // Gets all for the user id 1
   *
   * @param {Number} [user_id] If specified, it will match for that user id.
   * @return {Array} Matched results are returned back.
   */

	}, {
		key: "last_edit",
		value: function last_edit() {
			var user_id = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

			var id = parseInt(user_id, 10);
			var selector = id ? ":has(.mini-profile a.user-link.user-" + id + ")" : "";

			return $("tr.item[id^=post-]" + selector + " .foot .edited_by, tr[id^=message-]" + selector + " .foot .edited_by");
		}

		/**
   * Gets post / message info (date, likes, etc)
   *
   *     yootil.get.post_info(); // Gets all
   *
   *     yootil.get.post_info(1); // Gets all for the user id 1
   *
   * @param {Number} [user_id] If specified, it will match for that user id.
   * @return {Array} Matched results are returned back.
   */

	}, {
		key: "post_info",
		value: function post_info() {
			var user_id = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

			var id = parseInt(user_id, 10);
			var selector = id ? ":has(.mini-profile a.user-link.user-" + id + ")" : "";

			return $("tr.item[id^=post-]" + selector + " .content .info, tr[id^=message-]" + selector + " .content .info");
		}

		/**
   * Gets post / message controls.
   *
   *     yootil.get.post_controls(); // Gets all
   *
   *     yootil.get.post_controls(1); // Gets all for the user id 1
   *
   * @param {Number} [user_id] If specified, it will match for that user id.
   * @return {Array} Matched results are returned back.
   */

	}, {
		key: "post_controls",
		value: function post_controls() {
			var user_id = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

			var id = parseInt(user_id, 10);
			var selector = id ? ":has(.mini-profile a.user-link.user-" + id + ")" : "";

			return $("tr.item[id^=post-]" + selector + " .controls, tr[id^=message-]" + selector + " .controls");
		}

		/**
   * Gets post / message summary.
   *
   *     yootil.get.summary();
   *
   * @return {Array} Matches are returned back.
   */

	}, {
		key: "summary",
		value: function summary() {
			return $(".messages.summary, .posts.summary");
		}

		/**
   * Gets nav tree.
   *
   *     yootil.get.nav_tree();
   *
   * @return {Array} Matches are returned back.
   */

	}, {
		key: "nav_tree",
		value: function nav_tree() {
			return $("#navigation-tree").find("#nav-tree");
		}

		/**
   * Gets nav branches.
   *
   *     yootil.get.nav_branches();
   *
   * @return {Array} Matches are returned back.
   */

	}, {
		key: "nav_branches",
		value: function nav_branches() {
			return this.nav_tree().find(".nav-tree-branch");
		}

		/**
   * Gets last nav branch.
   *
   *     yootil.get.last_nav_branch();
   *
   * @return {Array} Matches are returned back.
   */

	}, {
		key: "last_nav_branch",
		value: function last_nav_branch() {
			return this.nav_tree().find(".nav-tree-branch:last");
		}

		/**
   * Gets a branch based on options passed in.
   *
   *     let example1 = yootil.get.nav_branch("Members", "text");
   *
   *     let example2 = yootil.get.nav_branch(/user\/1/, "url");
   *
   * @param {String|Object} pattern This can be a string, or a regular expression pattern.
   * @param {String} [type] You can match against the url or text of the branch.  Default is text.
   * @return {Array} Matches are returned back.
   */

	}, {
		key: "nav_branch",
		value: function nav_branch() {
			var pattern = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
			var type = arguments.length <= 1 || arguments[1] === undefined ? "text" : arguments[1];

			if (!pattern) {
				return [];
			}

			var matched = [];

			$("#navigation-tree").find(".nav-tree-branch a").each(function () {
				var match_against = type == "url" ? $(this).attr("href") : $(this).text();

				if (pattern.constructor == RegExp) {
					if (pattern.test(match_against)) {
						matched.push($(this).parent().parent());
					}
				} else if (typeof pattern == "string") {
					if (match_against.indexOf(pattern) != -1) {
						matched.push($(this).parent().parent());
					}
				}
			});

			return matched;
		}
	}]);

	return _class8;
}();

/**
 * @class yootil.key
 * @static
 * Most methods are just wrappers, to see the ProBoards API documentation, <a href="https://www.proboards.com/developer/js/class/key">click here</a>.
 */

// yootil.key("aaa").set("hi world", 1);

yootil.key = function () {
	function _class9() {
		_classCallCheck(this, _class9);
	}

	_createClass(_class9, null, [{
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
			var _this3 = this;

			var key = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

			return Object.assign(Object.create(null), {

				exists: function exists() {
					return _this3.exists(key);
				},
				obj: function obj() {
					return _this3.key_obj(key);
				},
				is_empty: function is_empty(object_id) {
					return _this3.is_empty(key, object_id);
				},
				has_value: function has_value(object_id) {
					return !_this3.is_empty(key, object_id);
				},
				get: function get(object_id, is_json) {
					return _this3.get(key, object_id);
				},
				clear: function clear(object_id) {
					return _this3.clear(key, object_id);
				},
				set: function set(value, object_id, type) {
					return _this3.set(key, value, object_id, type);
				},
				on: function on(evt, value, object_id) {
					return _this3.on(key, evt, value, object_id);
				},
				new_thread: function new_thread(value, object_id) {
					return _this3.new_thread(key, value, object_id);
				},
				new_post: function new_post(value, object_id) {
					return _this3.new_post(key, value, object_id);
				},
				new_quick_reply: function new_quick_reply(value, object_id) {
					return _this3.post_quick_reply(key, value, object_id);
				},
				append: function append(value, object_id) {
					return _this3.append(key, value, object_id);
				},
				prepend: function prepend(value, object_id) {
					return _this3.prepend(key, value, object_id);
				},
				increment: function increment(value, object_id) {
					return _this3.increment(key, value, object_id);
				},
				decrement: function decrement(value, object_id) {
					return _this3.decrement(key, value, object_id);
				},
				pop: function pop(items, object_id) {
					return _this3.pop(key, items, object_id);
				},
				push: function push(value, object_id) {
					return _this3.push(key, value, object_id);
				},
				push_unique: function push_unique(value, object_id, strict) {
					return _this3.push_unique(key, value, object_id, strict);
				},
				shift: function shift(items, object_id) {
					return _this3.shift(key, items, object_id);
				},
				unshift: function unshift(value, object_id) {
					return _this3.unshift(key, value, object_id);
				},
				unshift_unique: function unshift_unique(value, object_id, strict) {
					return _this3.unshift_unique(key, value, object_id, strict);
				},
				write: function write(object_id) {
					return _this3.write(key, object_id);
				},
				read: function read(object_id) {
					return _this3.read(key, object_id);
				},
				type: function type(object_id, return_str) {
					return _this3.type(key, return_str);
				},
				length: function length(object_id) {
					return _this3.length(key, object_id);
				},
				user_key: function user_key() {
					return _this3.user_key(key);
				},
				super_user_key: function super_user_key() {
					return _this3.super_user_key(key);
				},
				thread_key: function thread_key() {
					return _this3.thread_key(key);
				},
				post_key: function post_key() {
					return _this3.post_key(key);
				},
				conversation_key: function conversation_key() {
					return _this3.conversation_key(key);
				},
				message_key: function message_key() {
					return _this3.message_key(key);
				},
				super_forum_key: function super_forum_key() {
					return _this3.super_forum_key(key);
				},
				has_space: function has_space(object_id) {
					return _this3.has_space(key, object_id);
				},
				space_left: function space_left(object_id) {
					return _this3.space_left(key, object_id);
				},
				max_space: function max_space() {
					return _this3.max_space(key);
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

			var _this4 = this;

			var object_id = arguments[2];
			var type = arguments.length <= 3 || arguments[3] === undefined ? "" : arguments[3];

			var p = new Promise(function (resolve, reject) {
				object_id = object_id || undefined;

				if (_this4.exists(key)) {
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

						_this4.pb_key_obj(key)[type](options);
					} else {
						_this4.pb_key_obj(key).set(options);
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

				var _iteratorNormalCompletion5 = true;
				var _didIteratorError5 = false;
				var _iteratorError5 = undefined;

				try {
					var _loop = function _loop() {
						var item = _step5.value;

						var af = strict ? function (val) {
							return val === item;
						} : function (val) {
							return val == item;
						};

						if (!current_value.find(af)) {
							to_push.push(item);
						}
					};

					for (var _iterator5 = new_values[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
						_loop();
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

				var _iteratorNormalCompletion6 = true;
				var _didIteratorError6 = false;
				var _iteratorError6 = undefined;

				try {
					var _loop2 = function _loop2() {
						var item = _step6.value;

						var af = strict ? function (val) {
							return val === item;
						} : function (val) {
							return val == item;
						};

						if (!current_value.find(af)) {
							to_push.push(item);
						}
					};

					for (var _iterator6 = new_values[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
						_loop2();
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

	return _class9;
}().init();

/*

let splitter = new yootil.key.splitter(["testy", "testy2"])

splitter.split("123456789", 5); // Split 5 into each key

if(!splitter.has_excess()){
	splitter.save(yootil.user.id());
} else {
	console.log("No space");
}

*/

/**
 * Splits up data between keys.  The order of the keys is very important if
 * you are joining later.
 *
 * Any left over data that cannot be put into a key is lost.  It's important you
 * check the data length doesn't exceed the total length of the keys.  Use the
 * "has_excess" method to see if there was any data remaining before saving.
 */

yootil.key.splitter = function () {

	/**
  * @param {String|Array} keys The keys that the data will be split between.
  */

	function _class10() {
		var keys = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

		_classCallCheck(this, _class10);

		if (!Array.isArray(keys)) {
			keys = [keys];
		}

		this.keys = keys;
		this.excess_data = "";
		this.convert_keys_to_objs();
	}

	_createClass(_class10, [{
		key: "convert_keys_to_objs",
		value: function convert_keys_to_objs() {
			var _iteratorNormalCompletion7 = true;
			var _didIteratorError7 = false;
			var _iteratorError7 = undefined;

			try {
				for (var _iterator7 = this.keys.entries()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
					var _step7$value = _slicedToArray(_step7.value, 2);

					var index = _step7$value[0];
					var value = _step7$value[1];

					var obj = yootil.key(value);

					if (obj.exists()) {
						this.keys[index] = {

							key: obj,
							data: ""

						};
					} else {
						delete this.keys[index];
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
		}

		/**
   * Check to see if there is any excess data when splitting.
   *
   * @returns {Boolean}
   */

	}, {
		key: "has_excess",
		value: function has_excess() {
			if (this.excess_data.length) {
				return true;
			}

			return false;
		}

		/**
   * Returns the excess data
   *
   * @returns {String}
   */

	}, {
		key: "excess",
		value: function excess() {
			return this.excess_data;
		}

		/**
   * The data pass in is what gets split between the keys.
   *
   * @param {String|Object|Array} data The data to be split.
   * @param {Boolean} json Split as JSON string
   * @param {Number} length The length of each chunk. It's recommended to not pass a value in.
   * @returns {Boolean}
   */

	}, {
		key: "split",
		value: function split() {
			var _ref10 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			var _ref10$data = _ref10.data;
			var data = _ref10$data === undefined ? "" : _ref10$data;
			var _ref10$json = _ref10.json;
			var json = _ref10$json === undefined ? true : _ref10$json;
			var _ref10$length = _ref10.length;
			var length = _ref10$length === undefined ? 0 : _ref10$length;

			if (!data || this.keys.length < 2) {
				return false;
			}

			data = json ? JSON.stringify(data) : data.toString();

			var _iteratorNormalCompletion8 = true;
			var _didIteratorError8 = false;
			var _iteratorError8 = undefined;

			try {
				for (var _iterator8 = this.keys[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
					var obj = _step8.value;

					var data_chunk = data.substr(0, length || obj.key.max_space());

					obj.data = data_chunk;

					data = data.substr(data_chunk.length, data.length);
				}
			} catch (err) {
				_didIteratorError8 = true;
				_iteratorError8 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion8 && _iterator8.return) {
						_iterator8.return();
					}
				} finally {
					if (_didIteratorError8) {
						throw _iteratorError8;
					}
				}
			}

			this.excess_data = data || "";

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

			var _iteratorNormalCompletion9 = true;
			var _didIteratorError9 = false;
			var _iteratorError9 = undefined;

			try {
				for (var _iterator9 = this.keys[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
					var obj = _step9.value;

					last = obj.key.set(obj.data, object_id);
				}
			} catch (err) {
				_didIteratorError9 = true;
				_iteratorError9 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion9 && _iterator9.return) {
						_iterator9.return();
					}
				} finally {
					if (_didIteratorError9) {
						throw _iteratorError9;
					}
				}
			}

			return last;
		}
	}]);

	return _class10;
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

	function _class11() {
		var _ref11 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		var _ref11$keys = _ref11.keys;
		var keys = _ref11$keys === undefined ? [] : _ref11$keys;
		var _ref11$object_id = _ref11.object_id;
		var object_id = _ref11$object_id === undefined ? undefined : _ref11$object_id;

		_classCallCheck(this, _class11);

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


	_createClass(_class11, [{
		key: "data",
		value: function data() {
			var json = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

			if (this.keys.length) {
				var data = "";
				var data_is_array = false;

				var _iteratorNormalCompletion10 = true;
				var _didIteratorError10 = false;
				var _iteratorError10 = undefined;

				try {
					for (var _iterator10 = this.keys[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
						var _key = _step10.value;

						var the_data = yootil.key(_key).get(this.object_id);

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
					_didIteratorError10 = true;
					_iteratorError10 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion10 && _iterator10.return) {
							_iterator10.return();
						}
					} finally {
						if (_didIteratorError10) {
							throw _iteratorError10;
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

	return _class11;
}();

/**
 * @class yootil.location
 * @static
 *
 * Used to determine where we are currently.
 */

yootil.location = function () {
	function _class12() {
		_classCallCheck(this, _class12);
	}

	_createClass(_class12, null, [{
		key: "init",
		value: function init() {
			this._cached_route = pb.data && pb.data("route") ? pb.data("route").name : "";

			return this;
		}

		/**
   * INTERNAL METHOD.  Used to easily see if an id is the current page.
   *
   * @param {String} id ID of the page to check route against.
   * @return {Boolean}
   * @ignore
   */

	}, {
		key: "__is_page",
		value: function __is_page(id) {
			return this._cached_route == id;
		}

		/**
   * Are we currently viewing the main page of a board? (i.e. thread listing)
   * @return {Boolean}
   */

	}, {
		key: "board",
		value: function board() {
			return this.__is_page("board") || this.__is_page("list_threads");
		}

		/**
   * Are we currently viewing the bookmarks listing?
   * @return {Boolean}
   */

	}, {
		key: "bookmarks",
		value: function bookmarks() {
			return this.__is_page("bookmarks");
		}

		/**
   * Are we currently viewing the main calendar page?
   * @return {Boolean}
   */

	}, {
		key: "calendar",
		value: function calendar() {

			// calendar == this month, calendar_month == this or any depending on query string

			return this.__is_page("calendar") || this.__is_page("calendar_month") || this.__is_page("calendar_list");
		}

		/**
   * Are we viewing a day of calendar events?
   * @return {Boolean}
   */

	}, {
		key: "calendar_day",
		value: function calendar_day() {
			return this.__is_page("calendar_day");
		}

		/**
   * v5 uses "home" for custom page and "forum" for forum pages when a
   * custom page is set as the home page.
   *
   * @return {Boolean}
   */

	}, {
		key: "forum",
		value: function forum() {
			return this.__is_page("forum");
		}

		/**
   * If no custom page is set as home page, then "home" will show the normal forum
   * page (i.e board listings), but if there is a custom page set as the home page,
   * then this usually represents the custom page being viewed.
   *
   * Due to the cross over with these, "home" will refer to both.
   *
   * @return {Boolean}
   */

	}, {
		key: "home",
		value: function home() {
			return this.__is_page("home") || this.__is_page("forum");
		}

		/**
   * Are we currently viewing the members list?
   * @return {Boolean}
   */

	}, {
		key: "members",
		value: function members() {
			return this.__is_page("members") || this.__is_page("list_members");
		}

		/**
   * Are we currently viewing the list of messages?
   * @return {Boolean}
   */

	}, {
		key: "message_list",
		value: function message_list() {
			return this.__is_page("conversations") || this.__is_page("conversations_inbox") || this.__is_page("list_conversations");
		}

		/**
   * Are we currently viewing a message?
   * @return {Boolean}
   */

	}, {
		key: "message_thread",
		value: function message_thread() {
			return this.__is_page("conversation") || this.__is_page("list_messages");
		}

		/**
   * Are we currently sending a message?
   * @return {Boolean}
   */

	}, {
		key: "messaging",
		value: function messaging() {
			return this.message_new() || this.conversation_new() || this.message_quote();
		}

		/**
   * Are we currently replying to a conversation?
   * @return {Boolean}
   */

	}, {
		key: "message_new",
		value: function message_new() {
			return this.__is_page("new_message");
		}

		/**
   * Are we currently replying to a conversation by quoting?
   * @return {Boolean}
   */

	}, {
		key: "message_quote",
		value: function message_quote() {
			return this.__is_page("quote_messages");
		}

		/**
   * Are we currently creating a new conversation?
   * @return {Boolean}
   */

	}, {
		key: "conversation_new",
		value: function conversation_new() {
			return this.__is_page("new_conversation") || this.__is_page("create_conversation") || this.__is_page("conversation_new_user");
		}

		/**
   * Are we currently creating a new conversation?
   * @return {Boolean}
   * @ignore
   */

	}, {
		key: "conversation_create",
		value: function conversation_create() {
			return this.__is_page("create_conversation");
		}

		/**
   * Are we currently creating a new conversation (new_user_conversation)?
   * @return {Boolean}
   * @ignore
   */

	}, {
		key: "conversation_new_user",
		value: function conversation_new_user() {
			return this.__is_page("new_user_conversation");
		}

		/**
   * Are we currently trying to post/create a thread/quote a post?
   * @return {Boolean}
   */

	}, {
		key: "posting",
		value: function posting() {
			return this.posting_quote() || this.posting_reply() || this.posting_thread();
		}

		/**
   * Are we currently trying to reply with a quote?
   * @return {Boolean}
   */

	}, {
		key: "posting_quote",
		value: function posting_quote() {
			return this.__is_page("quote_posts");
		}

		/**
   * Are we currently trying to post a reply?
   * @return {Boolean}
   */

	}, {
		key: "posting_reply",
		value: function posting_reply() {
			return this.__is_page("new_post");
		}

		/**
   * Are we currently trying to create a thread?
   * @return {Boolean}
   */

	}, {
		key: "posting_thread",
		value: function posting_thread() {
			return this.__is_page("new_thread");
		}

		/**
   * Are we currently trying to edit a post?
   * @return {Boolean}
   */

	}, {
		key: "editing_post",
		value: function editing_post() {
			return this.__is_page("edit_post");
		}

		/**
   * Are we currently trying to edit a thread?
   * @return {Boolean}
   */

	}, {
		key: "editing_thread",
		value: function editing_thread() {
			return this.__is_page("edit_thread");
		}

		/**
   * Are we currently trying to edit a thread or post?
   * @return {Boolean}
   */

	}, {
		key: "editing",
		value: function editing() {
			return this.editing_thread() || this.editing_post();
		}

		/**
   * Are we viewing a custom page?
   * @return {Boolean}
   */

	}, {
		key: "page",
		value: function page() {
			return this.__is_page("page");
		}

		/**
   * Are we viewing a permalink page (i.e linking to a direct post)?
   * @return {Boolean}
   */

	}, {
		key: "permalink",
		value: function permalink() {
			return this.__is_page("permalink");
		}

		/**
   * Are we viewing a permalink to a post?
   * @return {Boolean}
   */

	}, {
		key: "permalink_post",
		value: function permalink_post() {
			if (this.permalink()) {
				var params = pb.data("route").params;

				if (params && params.post_id) {
					return true;
				}
			}

			return false;
		}

		/**
   * Are we viewing the activity profile page?
   * @return {Boolean}
   */

	}, {
		key: "profile_activity",
		value: function profile_activity() {
			return this.__is_page("show_user_activity");
		}

		/**
   * Are we viewing the following profile page?
   * @return {Boolean}
   */

	}, {
		key: "profile_following",
		value: function profile_following() {
			return this.__is_page("show_user_following");
		}

		/**
   * Are we viewing the friends profile page?
   * @return {Boolean}
   */

	}, {
		key: "profile_friends",
		value: function profile_friends() {
			return this.__is_page("show_user_friends");
		}

		/**
   * Are we viewing the gifts profile page?
   * @return {Boolean}
   */

	}, {
		key: "profile_gift",
		value: function profile_gift() {
			return this.__is_page("show_user_gift");
		}

		/**
   * Are we viewing the groups profile page?
   * @return {Boolean}
   */

	}, {
		key: "profile_groups",
		value: function profile_groups() {
			return this.__is_page("show_user_groups");
		}

		/**
   * Are we viewing a main profile page?
   * @return {Boolean}
   */

	}, {
		key: "profile_home",
		value: function profile_home() {
			return this.__is_page("user") || this.__is_page("current_user");;
		}

		/**
   * Is it a valid Profile
   */

	}, {
		key: "profile_exists",
		value: function profile_exists() {
			return yootil.page.member.exists();
		}

		/**
   * Are we editing the admin controls page for the user?
   * @return {Boolean}
   */

	}, {
		key: "profile_edit_admin",
		value: function profile_edit_admin() {
			return this.__is_page("edit_user_admin");
		}

		/**
   * Are we editing the user's avatar?
   * @return {Boolean}
   */

	}, {
		key: "profile_edit_avatar",
		value: function profile_edit_avatar() {
			return this.__is_page("edit_user_avatar");
		}

		/**
   * Are we editing the user's badges?
   * @return {Boolean}
   */

	}, {
		key: "profile_edit_badges",
		value: function profile_edit_badges() {
			return this.__is_page("edit_user_badges");
		}

		/**
   * Are we editing the user's notifications?
   * @return {Boolean}
   */

	}, {
		key: "profile_edit_notifications",
		value: function profile_edit_notifications() {
			return this.__is_page("edit_user_notifications");
		}

		/**
   * Are we editing the user's personal settings?
   * @return {Boolean}
   */

	}, {
		key: "profile_edit_personal",
		value: function profile_edit_personal() {
			return this.__is_page("edit_user_personal");
		}

		/**
   * Are we editing the user's privacy settings?
   * @return {Boolean}
   */

	}, {
		key: "profile_edit_privacy",
		value: function profile_edit_privacy() {
			return this.__is_page("edit_user_privacy");
		}

		/**
   * Are we editing the user's general settings?
   * @return {Boolean}
   */

	}, {
		key: "profile_edit_settings",
		value: function profile_edit_settings() {
			return this.__is_page("edit_user_settings");
		}

		/**
   * Are we editing the user's social settings?
   * @return {Boolean}
   */

	}, {
		key: "profile_edit_social",
		value: function profile_edit_social() {
			return this.__is_page("edit_user_social");
		}

		/**
   * Are we viewing the notifications profile page?
   * @return {Boolean}
   */

	}, {
		key: "profile_notifications",
		value: function profile_notifications() {
			return this.__is_page("show_user_notifications") || this.__is_page("show_more_notifications");
		}

		/**
   * Are we viewing the profile (including any of the profile tabs)
   * @return {Boolean}
   */

	}, {
		key: "profile",
		value: function profile() {
			return this.profile_activity() || this.profile_following() || this.profile_friends() || this.profile_gift() || this.profile_groups() || this.profile_home() || this.profile_notifications();
		}

		/**
   * Are we currently viewing the recent posts page?
   * @return {Boolean}
   */

	}, {
		key: "recent_posts",
		value: function recent_posts() {
			return this.__is_page("all_recent_posts") || this.__is_page("recent_posts");
		}

		/**
   * Are we currently viewing posts page by IP?
   * @return {Boolean}
   */

	}, {
		key: "ip_posts",
		value: function ip_posts() {
			return this.__is_page("posts_by_ip");
		}

		/**
   * Are we currently viewing any posts page?
   * @return {Boolean}
   */

	}, {
		key: "posts",
		value: function posts() {
			return this.recent_posts() || this.ip_threads();
		}

		/**
   * Are we currently viewing the recent threads page?
   * @return {Boolean}
   */

	}, {
		key: "recent_threads",
		value: function recent_threads() {
			return this.__is_page("recent_threads") || this.__is_page("recent_threads_created");
		}

		/**
   * Are we currently viewing threads by IP?
   * @return {Boolean}
   */

	}, {
		key: "ip_threads",
		value: function ip_threads() {
			return this.__is_page("threads_by_ip");
		}

		/**
   * Are we currently viewing any type of thread listing?
   * @return {Boolean}
   */

	}, {
		key: "thread_list",
		value: function thread_list() {
			return this.recent_threads() || this.ip_threads() || this.search_results() || this.message_thread();
		}

		/**
   * Are we currently trying to search?
   * @return {Boolean}
   */

	}, {
		key: "search",
		value: function search() {
			return this.__is_page("search");
		}

		/**
   * Are we viewing results of a search?
   * @return {Boolean}
   */

	}, {
		key: "search_results",
		value: function search_results() {
			return this.__is_page("search_results");
		}

		/**
   * Are we currently viewing a thread?
   * @return {Boolean}
   */

	}, {
		key: "thread",
		value: function thread() {
			return this.__is_page("thread") || this.__is_page("list_posts") || this.permalink_post();
		}
	}]);

	return _class12;
}().init();

/**
 * @class yootil.page
 * @ignore
 * Wrapper around the ProBoards data object "page".
 */

yootil.page = function () {
	function _class13() {
		_classCallCheck(this, _class13);
	}

	_createClass(_class13, null, [{
		key: "__get_data",


		/**
   * This is an internal method
   *
   * @param {String} key The key on the page object to check and get
   * @return {String|Object|Array|Number}
   */

		value: function __get_data(key) {
			if (proboards && proboards.dataHash && proboards.dataHash.page && typeof proboards.dataHash.page[key] != "undefined") {
				return proboards.dataHash.page[key];
			}

			return "";
		}
	}]);

	return _class13;
}();

/**
 * @class yootil.page.board
 * @static
 * Various methods to help get board information.
 */

yootil.page.board = function () {
	function _class14() {
		_classCallCheck(this, _class14);
	}

	_createClass(_class14, null, [{
		key: "__get_data",


		/**
   *	This is an internal method
   *
   * @param {String} key The key on the board object to check and get.
   * @return {String|Object|Array|Number}
   * @ignore
   */

		value: function __get_data(key) {
			var board_obj = yootil.page.__get_data("board");

			if (board_obj && (typeof board_obj === "undefined" ? "undefined" : _typeof(board_obj)) == "object" && board_obj[key] != "undefined") {
				return board_obj[key];
			}

			return "";
		}

		/**
   * Gets the board ID
   * @return {Number}
   */

	}, {
		key: "id",
		value: function id() {
			return parseInt(this.__get_data("id"), 10) || null;
		}

		/**
   * Gets the board name
   * @return {String}
   */

	}, {
		key: "name",
		value: function name() {
			return this.__get_data("name");
		}

		/**
   * Gets the board URL
   * @return {String}
   */

	}, {
		key: "url",
		value: function url() {
			return this.__get_data("url");
		}

		/**
   * Get the board description
   * @return {String}
   */

	}, {
		key: "description",
		value: function description() {
			return this.__get_data("description");
		}

		/**
   * Checks if this board has post counts disabled
   * @return {Boolean}
   */

	}, {
		key: "disable_post_counts",
		value: function disable_post_counts() {
			return this.__get_data("disable_post_counts") == 1;
		}

		/**
   * Checks if this board has posting disabled
   * @return {Boolean}
   */

	}, {
		key: "disable_posting",
		value: function disable_posting() {
			return this.__get_data("disable_posting") == 1;
		}

		/**
   * Get the board name
   * @return {String}
   */

	}, {
		key: "display_name",
		value: function display_name() {
			return this.__get_data("display_name");
		}

		/**
   * Checks if this board is hidden
   * @return {Boolean}
   */

	}, {
		key: "hidden",
		value: function hidden() {
			return this.__get_data("hidden") == 1;
		}

		/**
   * Get the board total posts
   * @return {Number}
   */

	}, {
		key: "posts",
		value: function posts() {
			return this.__get_data("posts");
		}

		/**
   * Checks if this board has announcements showing
   * @return {Boolean}
   */

	}, {
		key: "show_announcements",
		value: function show_announcements() {
			return this.__get_data("show_announcements") == 1;
		}

		/**
   * Get the board total threads
   * @return {Number}
   */

	}, {
		key: "threads",
		value: function threads() {
			return this.__get_data("threads");
		}
	}]);

	return _class14;
}();

/**
 * @class yootil.page.category
 * @static
 * Various methods to help get category information.
 */

yootil.page.category = function () {
	function _class15() {
		_classCallCheck(this, _class15);
	}

	_createClass(_class15, null, [{
		key: "__get_data",


		/**
   * This is an internal method.
   *
   * @param {String} key The key on the category object to check and get.
   * @return {String}
   * @ignore
   */

		value: function __get_data(key) {
			var cat_obj = yootil.page.__get_data("category");

			if (cat_obj && (typeof cat_obj === "undefined" ? "undefined" : _typeof(cat_obj)) == "object" && cat_obj[key] != "undefined") {
				return cat_obj[key];
			}

			return "";
		}

		/**
   * Gets the category ID.
   * @return {Number}
   */

	}, {
		key: "id",
		value: function id() {
			return parseInt(this.__get_data("id"), 10) || null;
		}

		/**
   * Gets the category name.
   * @return {String}
   */

	}, {
		key: "name",
		value: function name() {
			return this.__get_data("name");
		}
	}]);

	return _class15;
}();

/**
 * @class yootil.page.member
 * @static
 * Various methods to help get member information.
 */

yootil.page.member = function () {
	function _class16() {
		_classCallCheck(this, _class16);
	}

	_createClass(_class16, null, [{
		key: "__get_data",


		/**
   * This is an internal method
   *
   * @param {String} key The key on the page object to check and get
   * @return {String|Object|Array|Number}
   * @ignore
   */

		value: function __get_data(key) {
			var member_obj = yootil.page.__get_data("member");

			if (member_obj && (typeof member_obj === "undefined" ? "undefined" : _typeof(member_obj)) == "object" && member_obj[key] != "undefined") {
				return member_obj[key];
			}

			return "";
		}

		/**
   * Gets the members ID.
   * @return {Number}
   */

	}, {
		key: "id",
		value: function id() {
			return parseInt(this.__get_data("id"), 10);
		}

		/**
   * Gets the members name.
   * @return {String}
   */

	}, {
		key: "name",
		value: function name() {
			return this.__get_data("name");
		}

		/**
   * Gets the members URL.
   * @return {String}
   */

	}, {
		key: "url",
		value: function url() {
			return this.__get_data("url");
		}

		/**
   * Gets the members display group id.
   * @return {Number}
   */

	}, {
		key: "display_group_id",
		value: function display_group_id() {
			return this.__get_data("display_group_id");
		}

		/**
   * Valid member
   * @return {Boolean}
   */

	}, {
		key: "exists",
		value: function exists() {
			return this.id() != 0;
		}
	}]);

	return _class16;
}();

/**
 * @class yootil.page.post
 * @static
 * Various methods to help get post information.
 */

yootil.page.post = function () {
	function _class17() {
		_classCallCheck(this, _class17);
	}

	_createClass(_class17, null, [{
		key: "__get_data",


		/**
   * This is an internal method
   *
   * @param {String} key The key on the page object to check and get
   * @return {String|Object|Array|Number}
   * @ignore
   */

		value: function __get_data(key) {
			var board_obj = yootil.page.__get_data("post");

			if (board_obj && (typeof board_obj === "undefined" ? "undefined" : _typeof(board_obj)) == "object" && board_obj[key] != "undefined") {
				return board_obj[key];
			}

			return "";
		}

		/**
   * Gets the user id of who created the post
   * @return {Number}
   */

	}, {
		key: "created_by",
		value: function created_by() {
			return this.__get_data("created_by");
		}

		/**
   * Gets the timeastamp when the post was created
   * @return {Number}
   */

	}, {
		key: "created_on",
		value: function created_on() {
			return parseInt(this.__get_data("created_on"), 10);
		}

		/**
   * Gets the post id
   * @return {Number}
   */

	}, {
		key: "id",
		value: function id() {
			return parseInt(this.__get_data("id"), 10);
		}

		/**
   * Checks if the post has been liked
   * @return {boolean}
   */

	}, {
		key: "liked",
		value: function liked() {
			return this.__get_data("liked") == 1;
		}

		/**
   * Gets the thread id
   * @return {Number}
   */

	}, {
		key: "thread_id",
		value: function thread_id() {
			return parseInt(this.__get_data("thread_id"), 10);
		}

		/**
   * Gets the post URL
   * @return {String}
   */

	}, {
		key: "url",
		value: function url() {
			return this.__get_data("url");
		}
	}]);

	return _class17;
}();

/**
 * @class yootil.page.thread
 * @static
 * Various methods to help get thread information.
 */

yootil.page.thread = function () {
	function _class18() {
		_classCallCheck(this, _class18);
	}

	_createClass(_class18, null, [{
		key: "__get_data",


		/**
   * This is an internal method
   *
   * @param {String} key The key on the page object to check and get
   * @return {String|Object|Array|Number}
   * @ignore
   */

		value: function __get_data(key) {
			var thread_obj = yootil.page.__get_data("thread");

			if (thread_obj && (typeof thread_obj === "undefined" ? "undefined" : _typeof(thread_obj)) == "object" && thread_obj[key] != "undefined") {
				return thread_obj[key];
			}

			return "";
		}

		/**
   * Gets the thread ID
   * @return {Number}
   */

	}, {
		key: "id",
		value: function id() {
			return parseInt(this.__get_data("id"), 10);
		}

		/**
   * Gets the thread creation date timestamp
   * @return {Number}
   */

	}, {
		key: "created_on",
		value: function created_on() {
			return parseInt(this.__get_data("created_on"), 10);
		}

		/**
   * Is the thread an announcement?
   * @return {Boolean}
   */

	}, {
		key: "announcement",
		value: function announcement() {
			return this.__get_data("is_announcement") == 1;
		}

		/**
   * Is the thread bookmarked?
   * @return {Boolean}
   */

	}, {
		key: "bookmarked",
		value: function bookmarked() {
			return this.__get_data("is_bookmarked") == 1;
		}

		/**
   * Is the thread falling?
   * @return {Boolean}
   */

	}, {
		key: "falling",
		value: function falling() {
			return this.__get_data("is_falling") == 1;
		}

		/**
   * Is the thread locked?
   * @return {Boolean}
   */

	}, {
		key: "locked",
		value: function locked() {
			return this.__get_data("is_locked") == 1;
		}

		/**
   * Is the thread new?
   * @return {Boolean}
   */

	}, {
		key: "fresh",
		value: function fresh() {
			return this.__get_data("is_new") == 1;
		}

		/**
   * Is the thread a poll?
   * @return {Boolean}
   */

	}, {
		key: "poll",
		value: function poll() {
			return this.__get_data("is_poll") == 1;
		}

		/**
   * Is the thread sticky?
   * @return {Boolean}
   */

	}, {
		key: "sticky",
		value: function sticky() {
			return this.__get_data("is_sticky") == 1;
		}

		/**
   * Gets the thread subject
   * @return {String}
   */

	}, {
		key: "subject",
		value: function subject() {
			return this.__get_data("subject");
		}

		/**
   * Gets the thread URL
   * @return {String}
   */

	}, {
		key: "url",
		value: function url() {
			return this.__get_data("url");
		}

		/**
   * Gets the board id
   * @return {Number}
   */

	}, {
		key: "board_id",
		value: function board_id() {
			return parseInt(this.__get_data("board_id"), 10);
		}

		/**
   * Gets the member who created this thread
   * @return {Number}
   */

	}, {
		key: "created_by",
		value: function created_by() {
			return parseInt(this.__get_data("created_by"), 10);
		}

		/**
   * Gets the last post id
   * @return {Number}
   */

	}, {
		key: "last_post_id",
		value: function last_post_id() {
			return parseInt(this.__get_data("last_post_id"), 10);
		}

		/**
   * Gets the first post id
   * @return {Number}
   */

	}, {
		key: "first_post_id",
		value: function first_post_id() {
			return parseInt(this.__get_data("first_post_id"), 10);
		}

		/**
   * Gets the last post time
   * @return {Number}
   */

	}, {
		key: "last_post_time",
		value: function last_post_time() {
			return parseInt(this.__get_data("last_post_time"), 10);
		}
	}]);

	return _class18;
}();

/**
 * @class yootil.queue
 * @constructor
 *
 * Handle queuing functions easily.
 *
 * The queue is passed as a parameter to your queued function, the context is left
 * intact.
 *
 *     let q = new yootil.queue();
 *
 *     q.add(queue => {
 *     	   console.log("Hello");
 *    	   setTimeout(() => queue.next(), 1000);
 *     }).add(queue => {
 *     	   console.log("World");
 *     	   this.stop(); // Stop the queue
 *     }).add(queue => console.log("!")); // Won't run as queue was stopped
 *
 *     q.start(); // Manually start the queue
 *
 * @param {Boolean} [auto_start] If true, the queue will auto start once the first item is added.
 */

yootil.queue = function () {
	function _class19() {
		var auto_start = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

		_classCallCheck(this, _class19);

		this._queue = [];
		this._iterator = null;
		this._started = false;
		this._auto_start = auto_start;
	}

	/**
  * Add a function to the queue.
  *
  * @param {Function} func The function to add to the queue.
  * @chainable
  */

	_createClass(_class19, [{
		key: "add",
		value: function add() {
			var func = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

			if (!func) {
				return;
			}

			this._queue.push(func);

			if (!this._iterator) {
				this._iterator = this.iterator();
			}

			if (this._auto_start && !this._started) {
				this.start();
			}

			return this;
		}
	}, {
		key: "iterator",
		value: regeneratorRuntime.mark(function iterator() {
			return regeneratorRuntime.wrap(function iterator$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							if (!(!this._stopped && this._queue.length)) {
								_context.next = 6;
								break;
							}

							_context.next = 3;
							return this._queue[0](this);

						case 3:
							this._queue.shift();
							_context.next = 0;
							break;

						case 6:
						case "end":
							return _context.stop();
					}
				}
			}, iterator, this);
		})

		/**
   * Moves to the next item in the iterator.
   *
   * @return {Object}
   */

	}, {
		key: "next",
		value: function next() {
			return this._iterator.next();
		}

		/**
   * Starts the queue.
   *
   * @chainable
   */

	}, {
		key: "start",
		value: function start() {
			this._started = true;
			this._iterator.next();

			return this;
		}

		/**
   * Stops the queue.
   *
   * @chainable
   */

	}, {
		key: "stop",
		value: function stop() {
			this._queue = [];
			this._stopped = true;
		}

		/**
   * Pauses the queue.
   *
   * @chainable
   */

	}, {
		key: "pause",
		value: function pause() {
			this._stopped = true;

			return this;
		}

		/**
   * Resumes the queue.
   *
   *  let q = new yootil.queue(true).add(queue => {
   *     console.log("Hello");
   *     queue.pause();
   *  }).add(() => console.log(" World!"));
   *
   *  $("mybtn").click(q.resume);
   *
   * @param {Boolean} [do_next] Will call "next" on the iterator automatically.
   * @chainable
   */

	}, {
		key: "resume",
		value: function resume() {
			var do_next = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

			this._stopped = false;

			if (do_next) {
				this._iterator.next();
			}

			return this;
		}

		/**
   * Clears the queue.
   *
   * @chainable
   */

	}, {
		key: "clear",
		value: function clear() {
			this._queue = [];

			return this;
		}
	}]);

	return _class19;
}();

yootil.settings = function () {
	function _class20() {
		_classCallCheck(this, _class20);
	}

	_createClass(_class20, null, [{
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

	return _class20;
}();

/**
 * @class yootil.storage
 * @static
 * Wrappers for session and persistent storage.
 */

yootil.storage = function () {
	function _class21() {
		_classCallCheck(this, _class21);
	}

	_createClass(_class21, null, [{
		key: "set",


		/**
   *  Allows you to set a key and value, along with some other settings.
   *
   *     yootil.storage.set("mykey", "myvalue") // Will be persistent
   *
   *     yootil.storage.set("mykey", "myvalue". false, false) // Will be for the session
   *
   * @param {String} key The key name for the storage.
   * @param {String} value The value that will be stored.
   * @param {Boolean}	[json] If true, the value will be turned into a JSON string.
   * @param {Boolean} [persist] By default the value is stored persistently, pass false to use session.
   * @chainable
   */

		value: function set(key) {
			var value = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];
			var json = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
			var persist = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

			if (key) {
				value = json && !yootil.is_json(value) ? JSON.stringify(value) : value;
			}

			if (persist) {
				localStorage.setItem(key, value);
			} else {
				sessionStorage.setItem(key, value);
			}

			return this;
		}

		/**
   * Gets a value from storage in either session or persistent.
   *
   *     yootil.storage.get("mykey", false, false) // Will look in session only
   *
   *     yootil.storage.get("mykey", true, true) // Will look in persistent only
   *
   * @param {String} key The key name for the storage.
   * @param {Boolean} [json] If true, the value will be JSON parsed.
   * @param {Boolean} [persist] You can specify not to look in persistent by passing false.
   * @return {String|Object}
   */

	}, {
		key: "get",
		value: function get(key) {
			var json = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
			var persist = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

			var value = "";

			if (key) {
				if (persist) {
					value = localStorage.getItem(key);
				} else {
					value = sessionStorage.getItem(key);
				}

				if (json && yootil.is_json(value)) {
					value = JSON.parse(value);
				}
			}

			return value;
		}

		/**
   * Removes a key from storage
   *
   *     yootil.storage.remove("mykey", false) // Will look in session only
   *
   *     yootil.storage.remove("mykey", true) // Will look in persistent only
   *
   * @param {String} key The key name for the storage.
   * @param {Boolean} [persist] You can specify not to look in persistent by passing false.
   * @chainable
   */

	}, {
		key: "remove",
		value: function remove(key) {
			var persist = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

			if (key) {
				if (persist) {
					localStorage.removeItem(key);
				} else {
					sessionStorage.removeItem(key);
				}
			}

			return this;
		}

		/**
   * Clears everything from storage
   *
   * @param {Boolean} [persist] If true, will clean persistent storage, or false will clear session.  Default is true.
   * @chainable
   */

	}, {
		key: "clear",
		value: function clear() {
			var persist = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

			if (persist) {
				localStorage.clear();
			} else {
				sessionStorage.clear();
			}

			return this;
		}
	}]);

	return _class21;
}();

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

yootil.sync = function () {
	function _class22() {
		var _this5 = this;

		var _ref12 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		var _ref12$key = _ref12.key;
		var key = _ref12$key === undefined ? "" : _ref12$key;
		var _ref12$data = _ref12.data;
		var data = _ref12$data === undefined ? {} : _ref12$data;
		var _ref12$handler = _ref12.handler;
		var handler = _ref12$handler === undefined ? {} : _ref12$handler;

		_classCallCheck(this, _class22);

		if (!key) {
			return;
		}

		this._trigger_caller = false;
		this._change = handler && handler.change ? handler.change : this.change;
		this._key = key;
		this._ls_key = key + "_data_sync_" + yootil.user.id();

		// Need to set the storage off the bat

		yootil.storage.set(this._ls_key, data, true, true);

		// Delay adding event (IE issues yet again)

		setTimeout(function () {
			return $(window).on("storage", function (evt) {
				if (evt && evt.originalEvent && evt.originalEvent.key == _this5._ls_key) {

					// IE fix

					if (_this5._trigger_caller) {
						_this5._trigger_caller = false;
						return;
					}

					var event = evt.originalEvent;
					var old_data = event.oldValue;
					var new_data = event.newValue;

					// If old == new, don't do anything

					if (old_data != new_data) {
						_this5._change.bind(handler && handler.change ? handler : _this5, JSON.parse(new_data), JSON.parse(old_data))();
					}
				}
			});
		}, 100);
	}

	// For outside calls to trigger a manual update

	_createClass(_class22, [{
		key: "update",
		value: function update() {
			var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			this._trigger_caller = true;
			yootil.storage.set(this._ls_key, data, true, true);
		}
	}, {
		key: "change",
		value: function change(new_data, old_data) {
			var internal_key_data = proboards.plugin.keys.data[this._key];

			if (internal_key_data) {
				internal_key_data[yootil.user.id()] = new_data;
			}
		}
	}, {
		key: "key",
		get: function get() {
			return this._key;
		}
	}, {
		key: "local_key",
		get: function get() {
			return this._ls_key;
		}
	}]);

	return _class22;
}();

/**
 * @class yootil.user
 * @static
 * Contains useful methods relating to the user currently viewing the page, most being wrappers at the moment.
 */

yootil.user = function () {
	function _class23() {
		_classCallCheck(this, _class23);
	}

	_createClass(_class23, null, [{
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

	return _class23;
}().init();

/**
 * Uses a basic LCG algorithm for seeded random numbers.
 *
 * let rnd = new yootil.random(555);
 *
 * console.log(rnd.next()); // 0.19470878187320603
 *
 */

yootil.random = function () {

	/**
  *
  * @param {Integer} seed
  */

	function _class24(seed) {
		_classCallCheck(this, _class24);

		this.m = 2147483647;
		this.a = 1103515245;
		this.c = 12345;
		this.seed = seed && typeof seed === "string" ? yootil.hash_code(seed) : Math.floor(Math.random() * this.m);
	}

	/**
  *
  * @returns {Number}
  */

	_createClass(_class24, [{
		key: "current",
		value: function current() {
			return this.seed / this.m;
		}

		/**
   *
   * @returns {Number}
   */

	}, {
		key: "next",
		value: function next() {
			this.seed = (this.a * this.seed + this.c) % this.m;

			return this.seed / this.m;
		}
	}]);

	return _class24;
}();


yootil.init();