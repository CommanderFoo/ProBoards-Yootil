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

yootil = (function(){

	return {

		VERSION: "{VER}",

		settings: {},

		images: {},

		host: location.hostname,

		notifications_queue: {},

		textarea: document.createElement("textarea"),

		months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],

		days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],

		/**
		 * Makes a string safe for inserting into the DOM.
		 *
		 *     var safe_html = yootil.html_encode("<b>this won't be bold</b>");
		 *
		 * @param {String} str The value you want returned to be safe.
		 * @param {Boolean} decode_first Pass true if you want to decode before encoding to prevent double encoding.
		 * @return {string} The safe value.
		 */

		html_encode: function(str, decode_first){
			str = (str)? str : "";
			str = (decode_first)? this.html_decode(str) : str;

			return $("<div />").text(str).html();
		},

		/**
		 * Converts back to HTML
		 *
		 *     var html = yootil.html_decode("<b>this will be bold</b>");
		 *
		 * @param {String} str The string you want returned to be an HTML string.
		 * @return {String} The HTML string.
		 */

		html_decode: function(str){
			str = (str)? str : "";

			this.textarea.innerHTML = str;

			var val = this.textarea.value;

			this.textarea.innerHTML = "";

			return val;
		},


		/**
		 * Formats numbers so they look pretty (i.e 1,530).
		 *
		 *     yootil.number_format(1000); // 1,000
		 *
		 * @param {String} str The string to format.
		 * @param {String} [delim] The delimiter between each block (i.e 100.000.000, 100,000,000).
		 * @return {String} Formatted string.
		 */

		number_format: function(str, delim){
			str = (str)? str : "";
			delim = (delim)? delim : ",";

			return (str.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + delim) || "0");
		},

		/**
		 * Checks to see if string passed in is a valid JSON string.
		 *
		 *     yootil.is_json("{\"hello\":\"world\"}");
		 *
		 * @param {String} str This is the string that is getting checked for valid JSON.
		 * @param {Boolean} [return_obj] If true, the string will be parsed and returned back.
		 * @return {Mixed}
		 */

		is_json: function(str, return_obj){
			try {
				str = JSON.parse(str);
			} catch(e){
				return false;
			}

			if(return_obj){
				return str;
			}

			return true;
		},

		/**
		 * Pad a string to a certain length with another string on the left or right side of passed in string.
		 *
		 *     yootil.pad(5, 6, "0"); // 000005
		 *
		 * @param {String} str This is the string that is going to be padded.
		 * @param {Number} len The length of the string to be returned, defaults to 6.
		 * @param {String} [pad_str] The string to pad with.
		 * @param {Mixed} [pad_pos] Position of the padding, can be 1 or "RIGHT", for right padding.  Default is left.
		 * @return {String}
		 */

		pad: function(str, len, pad_str, pad_pos){
			var pad_str = (pad_str)? pad_str : "0";
			var len = (len)? len : 6;
			var pad_pos = (pad_pos)? pad_pos : 0;

			while(str.toString().length < len){
				switch(pad_pos.toString().toLowerCase()){

					case "1" :
					case "right" :
						str = str.toString() + pad_str;
						break;

					default :
						str = pad_str + str.toString();

				}
			}

			return str;
		},

		/**
		 * Gets the outerHTML of an element.  It will use outerHTML if supported.
		 *
		 *     var html = yootil.outer_html($("#test"));
		 *
		 * @param {Object} elem The element you want the outer HTML to be returned.
		 * @return {String}
		 */

		outer_html: function(elem){
			if(elem){
				elem = (elem.length)? elem[0] : elem;

				if(elem.outerHTML){
					return elem.outerHTML;
				} else {
					return $("<div />").append($(elem).clone()).html();
				}
			}

			return null;
		},

		/**
		 * Simple method to convert version numbers (format being 0.0.0).
		 *
		 * <strong>Note:</strong>  Doesn't work with versions such as this: 0.9.10, it will appear
		 *	a smaller number compared to 0.9.3.
		 *
		 *     var versions = yootil.convert_versions("0.5.7", "0.8.2"); // [056, 082]
		 *
		 * @param {String} v1 Assumed old version.
		 * @param {String} v2 Assumed new version.
		 * @return {Array}
		 */

		convert_versions: function(v1, v2){
			var versions = [];

			$([v1, v2]).each(function(i, e){
				var n = (e || "").replace(/\./g, "");

				while(n.length < 3){
					n += "0";
				}

				versions.push(n);
			});

			return versions;
		},

		init: function(){
			var plugin = proboards.plugin.get("yootil_library");
			var settings = (plugin && plugin.settings)? plugin.settings : false;

			if(settings){
				this.settings = settings;
			}

			if(plugin.images){
				this.images = plugin.images;
			}

			return this;
		},
		/**
		 * Gets the version currently running.
		 *
		 * @return {String};
		 */

		version: function(){
			return this.VERSION;
		},

		/**
		 * Shorthand version for {@link #timestamp}.
		 *
		 * @return {Number}
		 */

		ts: function(){
			return this.timestamp();
		},

		/**
		 * Creates a timestamp.
		 *
		 * @return {Number}
		 */

		timestamp: function(){
			return (+ new Date());
		},

		/**
		 * Checks a number and returns the correct suffix to be used with it.
		 *
		 *     yootil.suffix(3); // "rd"
		 *
		 * @param {Number} n The number to be checked.
		 * @return {String}
		 */

		suffix: function(n){
			var j = (n % 10);

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
		},

		/**
		 * Gets a day from the days array.
		 *
		 *     yootil.day(1); // "Mon"
		 *
		 * @param {Number} index Indexing starts at 0, with Sunday being 0.
		 * @param {Boolean} full Returns full day name.
		 * @return {String}
		 */

		day: function(index, full){
			if(index >= 0 && index < this.days.length){
				return this.days[index].substr(0, ((full)? 9 : 3));
			}

			return "";
		},

		/**
		 * Gets a month from the months array.
		 *
		 *     yootil.month(2); // "Mar"
		 *
		 * @param {Number} index Indexing starts at 0.
		 * @param {Boolean} full Returns full month name.
		 * @return {String}
		 */

		month: function(index, full){
			if(index >= 0 && index < this.months.length){
				return this.months[index].substr(0, ((full)? 9 : ((index == 8)? 4 : 3)));
			}

			return "";
		}

	};

})().init();