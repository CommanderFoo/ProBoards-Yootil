/**
 * Yootil is a utility library for ProBoards.  It was designed to help plugin developers develop quicker.
 *
 * The "yootil" namespace encapsulates all of the utilities and classes.
 *
 * <a href="https://github.com/PopThosePringles/ProBoards-Yootil">GitHub Repository</a> |
 * <a href="http://support.proboards.com/index.cgi?action=display&board=plugindatabase&thread=429360">ProBoards Forum Topic</a> |
 * <a href="https://www.proboards.com/library/plugins/item/38">ProBoards Plugin Library Link</a>
 */

class yootil {

	/**
	 * @private
	 */

	static init(){
		this._PLUGIN = "pixeldepth_yootil";
		this._called = this.timestamp();
		this._version = "{VER}";

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

	/**
	 * @private
	 */

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
	 * @example
	 * let safe_html = yootil.html_encode("<b>this won't be bold</b>");
	 *
	 * @param {String} str="" - The value you want returned to be safe.
	 * @param {Boolean} [decode_first=false] - Pass true if you want to decode before encoding to prevent double encoding.
	 *
	 * @return {String} - The safe value.
	 */

	static html_encode(str = "", decode_first = false){
		str = (decode_first)? this.html_decode(str) : str;

		return $("<div />").text(str).html();
	}

	/**
	 * Converts back to HTML
	 *
	 * @example
	 * let html = yootil.html_decode("<b>this will be bold</b>");
	 *
	 * @param {String} str="" - The string you want returned to be an HTML string.
	 *
	 * @return {String} - The HTML string.
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
	 * @example
	 * yootil.utils.number_format(1000); // 1,000
	 *
	 * @param {String} str="" - The string to format.
	 * @param {String} [delim=","] - The delimiter between each block (i.e 100.000.000, 100,000,000).
	 *
	 * @return {String} - Formatted string.
	 */

	static number_format(str = "", delim = ","){
		return (str.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + delim) || "0");
	}

	/**
	 * Checks to see if string passed in is a valid JSON string.
	 *
	 * @example
	 * yootil.is_json("{\"hello\":\"world\"}");
	 *
	 * @param {String} str="" - This is the string that is getting checked for valid JSON.
	 * @param {Boolean} [return_obj=false] - If true, the string will be parsed and returned back.
	 *
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
	 * @example
	 * yootil.suffix(3); // "rd"
	 *
	 * @param {Number} n=0 - The number to be checked.
	 *
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
	 * @example
	 * yootil.day(1); // "Mon"
	 *
	 * @param {Number} index=0 - Indexing starts at 0, with Sunday being 0.
	 * @param {Boolean} [full=false] - Returns full day name.
	 *
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
	 * @example
	 * yootil.month(2); // "Mar"
	 *
	 * @param {Number} index=0 - Indexing starts at 0.
	 * @param {Boolean} [full=false] - Returns full month name.
	 *
	 * @return {String}
	 */

	static month(index = 0, full = false){
		if(index >= 0 && index < this._months.length){
			return this._months[index].substr(0, ((full)? 9 : ((index == 8)? 4 : 3)));
		}

		return "";
	}

	/**
	 * Current version of Yootil
	 *
	 * @return {String}
	 */

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
	 * @example
	 * 1 = current is higher than required
	 * -1 = required is higher than current
	 * 0 = current and required are the same
	 *
	 * yootil.compare_version("1.1.1", "1.1.1.2"); // -1
	 *
	 * @param {String} current=0.0.0 - Current version.
	 * @param {String} required=0.0.0 - Required version.
	 *
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
	 * @param {String} str=""
	 *
	 * @return {Number}
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