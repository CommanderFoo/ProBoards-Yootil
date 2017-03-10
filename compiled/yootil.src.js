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

yootil.animation = class {

	constructor({callback = null, duration = 0, start = false} = {}){
		if(!callback){
			console.error("yootil.animation constructor: No callback passed");
		}

		this._anim_id = 0;
		this._callback = callback;
		this._start = start;
		this._duration = duration;
		this._time_start = 0;

		this._anim_func = (current_time) => {
			if(!this._time_start){
				this._time_start = current_time;
			}

			if(duration && (current_time - this._time_start) > duration){
				return;
			}

			this._callback(this, this._time_start, current_time, this._duration, this._anim_id);
			this._anim_id = requestAnimationFrame(this._anim_func);
		};

		if(this._start){
			this.start();
		}
	}

	repeat(){
		if(this._anim_id){
			this._time_start = 0;
			this._anim_func();
		}
	}

	start(){
		if(!this._anim_id){
			this._anim_id = requestAnimationFrame(this._anim_func);
		}
	}

	stop(){
		if(this._anim_id){
			cancelAnimationFrame(this._anim_id);
			this._anim_id = 0;
		}
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

yootil.clock = class {

	constructor(start = false, seconds = true){
		this._start = this._old = this._elapsed = 0;
		this._running = (start)? true : false;
		this._seconds = seconds;

		if(start){
			this.start();
		}
	}

	start(){
		this._start = this._old = performance.now();
		this._running = true;
	}

	stop(){
		this.delta();
		this._running = false;
	}

	resume(){
		this._running = true;
	}

	elapsed(){
		this.delta();

		return this._elapsed;
	}

	delta(){
		let diff = 0;

		if(this._running){
			let new_time = performance.now();

			diff = (new_time - this._old);

			if(this._seconds){
				diff /= 1000;
			};

			this._old = new_time;
			this._elapsed += diff;
		}

		return diff;
	}

};

/**
 * @class yootil.create
 * @static
 * Contains useful methods to creating things quickly (i.e containers).
 */

yootil.create = class {

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

	static container({title = "", h2 = true, content = ""} = {}){
		let html = "";

		title = (!h2)? title : ("<h2>" + title + "</h2>");

		html += "<div class=\"container\">";
		html += "<div class=\"title-bar\">" + title + "</div>";
		html += "<div class=\"content pad-all\">" + content + "</div>";
		html += "</div>";

		return $(html).show();
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

	static page({pattern = null, title = "", hide_content = true} = {}){
		if(!pattern){
			return this;
		}

		let reg = (pattern.constructor == RegExp)? pattern : new RegExp("\/\?" + pattern, "i");

		if(pattern && location.href.match(reg)){
			if(typeof title != "undefined" && title.length){
				document.title += " - " + title;
			}

			if(typeof hide_content == "undefined" || hide_content){
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

	static nav_branch({url = "/", text = ""} = {}){
		let $branch = yootil.get.last_nav_branch().clone();

		if($branch.length){
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

	static profile_tab({text = "", page = "/", active = false} = {}){
		if(yootil.location.profile()){
			let active_class = (active)? " class='ui-active'" : "";
			let $ul = $("div.show-user div.ui-tabMenu:first ul");

			if($ul.length){
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

	static profile_content_box(id = ""){
		let uid = (id || $.unique_id("yootil-"));

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

	static bbc_button({img = "", func = null} = {}){
		$(() => {
			let $li = $("<li>").addClass("button").append($(img));

			if(func){
				$li.click(func);
			}

			let $controls = $(".editor .ui-wysiwyg .controls");
			let $ul = $controls.find(".bbcode-editor, .visual-editor").find(".group:last ul:last");

			if($controls.length && $ul.length){
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

	static bbc_tab({title = "My Tab", content = "", id = "", css = null, events = {}} = {}){
		id = id || yootil.timestamp();

		let $wysiwyg_tabs = $(".editor ul.wysiwyg-tabs");
		let $tab = $("<li id='menu-item-" + id + "'><a href='#'>" + title + "</a></li>");
		let $tab_content = $("<div id='" + id + "'>" + content + "</div>");

		$wysiwyg_tabs.append($tab);
		
		if(css && typeof css == "object"){
			$tab_content.css(css);
		} else {
			$tab_content.css({

				border: "1px solid #E6E6E6",
				padding: "5px"

			});
		}

		$tab_content.hide().insertBefore($wysiwyg_tabs);

		$wysiwyg_tabs.find("li").click(function(e){
			let $active = $(this);

			e.preventDefault();

			$active.parent().find("li").removeClass("ui-active");
			$active.addClass("ui-active");

			$active.parent().find("li").each(function(){
				let id = $(this).attr("id");

				if(id.match(/bbcode|visual/i)){
					$(".editor .ui-wysiwyg .editors").hide();
				} else {
					if($active.attr("id") == id){
						return;
					}

					let selector = "";

					if(id){
						selector = "#" + id.split("menu-item-")[1];
					}

					if($(selector).length){
						if(events && events.hide){
							if(events.context){
								events.hide.bind(events.context)($tab, $tab_content);
							} else {
								events.hide($tab, $tab_content);
							}
						}

						$(selector).hide();
					}
				}
			});

			let id = $active.attr("id");
			let selector = "";

			if(id){
				selector = "#" + id.split("menu-item-")[1];
			}

			if(id.match(/bbcode|visual/i)){
				$(".editor .ui-wysiwyg .editors").show();
			} else if($(selector).length){
				console.log(events);

				if(events && events.show){
					if(events.context){
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

};

/**
 * @class yootil.event
 * @static
 *
 * Useful methods for event / ajax related stuff.
 */

yootil.event = (class {

	static init(){
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

		$.ajaxPrefilter(function(opts, orig_opts){
			let orig_success = orig_opts.success;
			let evt = "";

			switch(orig_opts.url){

				case proboards.routeMap["post_like"] :
					evt = "post_liked";
					break;

				case proboards.routeMap["bookmark_threads"] :
					evt = "bookmarked_thread";
					break;

				case proboards.routeMap["update_status"] :
					evt = "updated_status";
					break;

				case proboards.routeMap["shoutbox_add"] :
					evt = "shoutbox_shouted";
					break;

				case proboards.routeMap["shoutbox_update"] :
					evt = "shoutbox_updated";
					break;

				case proboards.routeMap["shoutbox_remove"] :
					evt = "shoutbox_removed";
					break;

				case proboards.routeMap["user_search"] :
					evt = "user_searched";
					break;

			}

			if(evt){
				opts.success = function(){
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

	static after_search(func, context = null){
		proboards.on("afterSearch", ((context)? func.bind(context) : func));

		return this;
	}

	/**
	 * Will run when the user clicks on a column title to sort a list.
	 *
	 * @param {Function} func The function that will be called after search.
	 * @param {Object} [context] Context of func.
	 * @chainable
	 */

	static column_sort(func, context = null){
		proboards.on("columnSort", ((context)? func.bind(context) : func));

		return this;
	}

	/**
	 * Will run when the 'Show More' link is clicked on a user's activity page.
	 *
	 * @param {Function} func The function that will be called after search.
	 * @param {Object} [context] Context of func.
	 * @chainable
	 */

	static more_activity(func, context = null){
		proboards.on("moreActivity", ((context)? func.bind(context) : func));

		return this;
	}

	/**
	 * Will run when the 'Show More' link is clicked on a user's notifications page.
	 *
	 * @param {Function} func The function that will be called after search.
	 * @param {Object} [context] Context of func.
	 * @chainable
	 */

	static more_notification(func, context = null){
		proboards.on("moreNotification", ((context)? func.bind(context) : func));

		return this;
	}

	/**
	 * Will run when paginating.
	 *
	 * @param {Function} func The function that will be called after search.
	 * @param {Object} [context] Context of func.
	 * @chainable
	 */

	static page_change(func, context = null){
		proboards.on("pageChange", ((context)? func.bind(context) : func));

		return this;
	}

	/**
	 * Will run when a post it liked.
	 *
	 * @param {Function} func The function that will be called after search.
	 * @param {Object} [context] Context of func.
	 * @chainable
	 */

	static post_liked(func, context = null){
		proboards.on("post_liked", function(){
			((context)? func.bind(context) : func)(this.args || []);
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

	static bookmarked_thread(func, context = null){
		proboards.on("bookmarked_thread", function(){
			((context)? func.bind(context) : func)(this.args || []);
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

	static updated_status(func, context = null){
		proboards.on("updated_status", function(){
			((context)? func.bind(context) : func)(this.args || []);
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

	static shoutbox_shouted(func, context = null){
		proboards.on("shoutbox_shouted", function(){
			((context)? func.bind(context) : func)(this.args || []);
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

	static shoutbox_updated(func, context = null){
		proboards.on("shoutbox_updated", function(){
			((context)? func.bind(context) : func)(this.args || []);
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

	static shoutbox_removed(func, context = null){
		proboards.on("shoutbox_removed", function(){
			((context)? func.bind(context) : func)(this.args || []);
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

	static user_searched(func, context = null){
		proboards.on("user_searched", function(){
			((context)? func.bind(context) : func)(this.args || []);
		});

		return this;
	}

}).init();

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
 *         events: {
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
 *     yootil.extension.run("monetary").pre_init();
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
	 * @param {Object} events The events that will be executed.
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

/**
 * @class yootil.forum
 * @static
 * Wrapper around the ProBoards data hash object to get forum info.
 */

yootil.forum = class {

	/**
	 * This is an internal method.
	 *
	 * @param {String} key The key on the page object to check and get.
	 * @return {String|Object|Number|Array}
	 * @ignore
	 */

	static __get_data(key){
		if(proboards && proboards.dataHash && typeof proboards.dataHash[key] != "undefined"){
			return proboards.dataHash[key];
		}

		return "";
	}

	/**
	 * Checks if the forum is ad free.
	 *
	 * @return {Boolean}
	 */

	static ad_free(){
		return this.__get_data("ad_free") == 1;
	}

	/**
	 * Gets the forum default avatar.
	 *
	 * @return {String}
	 */

	static default_avatar(){
		return this.__get_data("default_avatar");
	}

	/**
	 * Gets the forum ID.
	 *
	 * @return {String} This is stored as a string by ProBoards.
	 */

	static id(){
		return this.__get_data("forum_id");
	}

	/**
	 * Gets the forum login url.
	 *
	 * @return {String}
	 */

	static login_url(){
		return this.__get_data("login_url");
	}

	/**
	 * Checks if the current use is a guest or not.
	 *
	 * @return {Boolean}
	 */

	static guest(){
		return this.__get_data("is_current_user_guest") == 1;
	}

	/**
	 * Gets url for marking boards as read.
	 *
	 * @return {String}
	 */

	static mark_boards_read_url(){
		return this.__get_data("mark_boards_read_url");
	}

	/**
	 * Gets plugin key length for all keys not including super forum key.
	 *
	 * @return {Number}
	 */

	static max_key_length(){
		return this.__get_data("plugin_max_key_length");
	}

	/**
	 * Gets key length for the super forum key.
	 *
	 * @return {Number}
	 */

	static max_super_forum_key_length(){
		return this.__get_data("plugin_max_super_forum_key_length");
	}

	/**
	 * Gets forum register url.
	 *
	 * @return {String}
	 */

	static register_url(){
		return this.__get_data("register_url");
	}

	/**
	 * Gets forums "new" post image.
	 *
	 * @return {String}
	 */

	static new_post_image(){
		return this.__get_data("home_new_post_src");
	}

	/**
	 * Gets forums image path.
	 *
	 * @return {String}
	 */

	static image_path(){
		return this.__get_data("image_path");
	}

	/**
	 * Gets forums locale settings.
	 *
	 * @return {object}
	 */

	static locale_settings(){
		return this.__get_data("locale_settings") || {};
	}

	/**
	 * Is the forum on military time.
	 *
	 * @return {Number}
	 */

	static military_time(){
		return this.__get_data("military_time");
	}

	/**
	 * Max search query length.
	 *
	 * @return {Number}
	 */

	static max_search_query(){
		return this.__get_data("search-query-max");
	}

	/**
	 * Min search query length.
	 *
	 * @return {Number}
	 */

	static min_search_query(){
		return this.__get_data("search-query-min");
	}

	/**
	 * Server date.
	 *
	 * @return {Number}
	 */

	static server_date(){
		return this.__get_data("serverDate");
	}

	/**
	 * Time style
	 *
	 * @return {Number}
	 */

	static time_style(){
		return this.__get_data("time_style");
	}

	/**
	 * Time zone
	 *
	 * @return {Number}
	 */

	static time_zone(){
		return this.__get_data("timezone");
	}

	/**
	 * CSRF Token
	 *
	 * @return {String}
	 */

	static csrf_token(){
		return this.__get_data("csrf_token");
	}

};

/**
 * @alias yootil.get
 * @static
 * Quick methods to get certain elements.
 */

yootil.get = class {

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

	static mini_profiles(user_id = 0){
		let id = parseInt(user_id, 10);
		let selector = (id)? ":has(a.user-link.user-" + (id) + ")" : "";

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

	static mini_profile_avatars(user_id = 0){
		let id = parseInt(user_id, 10);
		let selector = (id)? ":has(a.user-link.user-" + (id) + ")" : "";

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

	static mini_profile_user_links(user_id = 0){
		let id = parseInt(user_id, 10);
		let selector = (id)? (".user-" + (id)) : "";

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

	static posts(post_id = 0){
		let id = parseInt(post_id, 10);
		let selector = (id)? ("-" + id) : "";

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

	static messages(message_id = 0){
		let id = parseInt(message_id, 10);
		let selector = (id)? ("-" + id) : "";

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

	static user_posts(user_id = 0){
		let id = parseInt(user_id, 10);

		if(!id){
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

	static user_messages(user_id = 0){
		let id = parseInt(user_id, 10);

		if(!id){
			return [];
		}

		return $("tr.item[id^=message]:has(.mini-profile a.user-link.user-" + id + ")");
	}

	/**
	 * Gets the quick reply.
	 *
	 * @return {Array}
	 */

	static quick_reply(){
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

	static mini_profile_info(user_id = 0){
		let id = parseInt(user_id, 10);
		let selector = (id)? ":has(a.user-link.user-" + id + ")" : "";

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

	static signatures(user_id = 0){
		let id = parseInt(user_id, 10);
		let selector = (id)? ":has(.mini-profile a.user-link.user-" + id + ")" : "";

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

	static last_edit(user_id = 0){
		let id = parseInt(user_id, 10);
		let selector = (id)? ":has(.mini-profile a.user-link.user-" + id + ")" : "";

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

	static post_info(user_id = 0){
		let id = parseInt(user_id, 10);
		let selector = (id)? ":has(.mini-profile a.user-link.user-" + id + ")" : "";

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

	static post_controls(user_id = 0){
		let id = parseInt(user_id, 10);
		let selector = (id)? ":has(.mini-profile a.user-link.user-" + id + ")" : "";

		return $("tr.item[id^=post-]" + selector + " .controls, tr[id^=message-]" + selector + " .controls");
	}

	/**
	 * Gets post / message summary.
	 *
	 *     yootil.get.summary();
	 *
	 * @return {Array} Matches are returned back.
	 */

	static summary(){
		return $(".messages.summary, .posts.summary");
	}

	/**
	 * Gets nav tree.
	 *
	 *     yootil.get.nav_tree();
	 *
	 * @return {Array} Matches are returned back.
	 */

	static nav_tree(){
		return $("#navigation-tree").find("#nav-tree");
	}

	/**
	 * Gets nav branches.
	 *
	 *     yootil.get.nav_branches();
	 *
	 * @return {Array} Matches are returned back.
	 */

	static nav_branches(){
		return this.nav_tree().find(".nav-tree-branch");
	}

	/**
	 * Gets last nav branch.
	 *
	 *     yootil.get.last_nav_branch();
	 *
	 * @return {Array} Matches are returned back.
	 */

	static last_nav_branch(){
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

	static nav_branch(pattern = null, type = "text"){
		if(!pattern){
			return [];
		}

		let matched = [];

		$("#navigation-tree").find(".nav-tree-branch a").each(function(){
			let match_against = (type == "url")? $(this).attr("href") : $(this).text();

			if(pattern.constructor == RegExp){
				if(pattern.test(match_against)){
					matched.push($(this).parent().parent());
				}
			} else if(typeof pattern == "string"){
				if(match_against.indexOf(pattern) != -1){
					matched.push($(this).parent().parent());
				}
			}

		});

		return matched;
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

yootil.key.splitter = class {

	/**
	 * @param {String|Array} keys The keys that the data will be split between.
	 */

	constructor(keys = []){
		if(!Array.isArray(keys)){
			keys = [keys];
		}

		this.keys = keys;
		this.excess_data = "";
		this.convert_keys_to_objs();
	}

	convert_keys_to_objs(){
		for(let [index, value] of this.keys.entries()){
			let obj = yootil.key(value);

			if(obj.exists()){
				this.keys[index] = {

					key: obj,
					data: ""

				};
			} else {
				delete this.keys[index];
			}
		}
	}

	/**
	 * Check to see if there is any excess data when splitting.
	 *
	 * @returns {Boolean}
	 */

	has_excess(){
		if(this.excess_data.length){
			return true;
		}

		return false;
	}

	/**
	 * Returns the excess data
	 *
	 * @returns {String}
	 */

	excess(){
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

	split({data = "", json = true, length = 0} = {}){
		if(!data || this.keys.length < 2){
			return false;
		}

		data = (json)? JSON.stringify(data) : data.toString();

		for(let obj of this.keys){
			let data_chunk = data.substr(0, (length || obj.key.max_space()));

			obj.data = data_chunk;

			data = data.substr(data_chunk.length, data.length);
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

	save(object_id = undefined){
		let last = null;

		for(let obj of this.keys){
			last = obj.key.set(obj.data, object_id);
		}

		return last;
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

/**
 * @class yootil.location
 * @static
 *
 * Used to determine where we are currently.
 */

yootil.location = (class {

	static init(){
		this._cached_route = ((pb.data && pb.data("route")) ? pb.data("route").name : "");

		return this;
	}

	/**
	 * INTERNAL METHOD.  Used to easily see if an id is the current page.
	 *
	 * @param {String} id ID of the page to check route against.
	 * @return {Boolean}
	 * @ignore
	 */

	static __is_page(id){
		return this._cached_route == id;
	}

	/**
	 * Are we currently viewing the main page of a board? (i.e. thread listing)
	 * @return {Boolean}
	 */

	static board(){
		return this.__is_page("board") || this.__is_page("list_threads");
	}

	/**
	 * Are we currently viewing the bookmarks listing?
	 * @return {Boolean}
	 */

	static bookmarks(){
		return this.__is_page("bookmarks");
	}

	/**
	 * Are we currently viewing the main calendar page?
	 * @return {Boolean}
	 */

	static calendar(){

		// calendar == this month, calendar_month == this or any depending on query string

		return this.__is_page("calendar") || this.__is_page("calendar_month") || this.__is_page("calendar_list");
	}

	/**
	 * Are we viewing a day of calendar events?
	 * @return {Boolean}
	 */

	static calendar_day(){
		return this.__is_page("calendar_day");
	}

	/**
	 * v5 uses "home" for custom page and "forum" for forum pages when a
	 * custom page is set as the home page.
	 *
	 * @return {Boolean}
	 */

	static forum(){
		return this.__is_page("forum")
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

	static home(){
		return this.__is_page("home") || this.__is_page("forum");
	}

	/**
	 * Are we currently viewing the members list?
	 * @return {Boolean}
	 */

	static members(){
		return this.__is_page("members") || this.__is_page("list_members");
	}

	/**
	 * Are we currently viewing the list of messages?
	 * @return {Boolean}
	 */

	static message_list(){
		return this.__is_page("conversations") || this.__is_page("conversations_inbox") || this.__is_page("list_conversations");
	}

	/**
	 * Are we currently viewing a message?
	 * @return {Boolean}
	 */

	static message_thread(){
		return this.__is_page("conversation") || this.__is_page("list_messages");
	}

	/**
	 * Are we currently sending a message?
	 * @return {Boolean}
	 */

	static messaging(){
		return this.message_new() || this.conversation_new() || this.message_quote();
	}

	/**
	 * Are we currently replying to a conversation?
	 * @return {Boolean}
	 */

	static message_new(){
		return this.__is_page("new_message");
	}

	/**
	 * Are we currently replying to a conversation by quoting?
	 * @return {Boolean}
	 */

	static message_quote(){
		return this.__is_page("quote_messages");
	}

	/**
	 * Are we currently creating a new conversation?
	 * @return {Boolean}
	 */

	static conversation_new(){
		return this.__is_page("new_conversation") || this.__is_page("create_conversation") || this.__is_page("conversation_new_user");
	}

	/**
	 * Are we currently creating a new conversation?
	 * @return {Boolean}
	 * @ignore
	 */

	static conversation_create(){
		return this.__is_page("create_conversation");
	}

	/**
	 * Are we currently creating a new conversation (new_user_conversation)?
	 * @return {Boolean}
	 * @ignore
	 */

	static conversation_new_user(){
		return this.__is_page("new_user_conversation");
	}

	/**
	 * Are we currently trying to post/create a thread/quote a post?
	 * @return {Boolean}
	 */

	static posting(){
		return this.posting_quote() || this.posting_reply() || this.posting_thread();
	}

	/**
	 * Are we currently trying to reply with a quote?
	 * @return {Boolean}
	 */

	static posting_quote(){
		return this.__is_page("quote_posts");
	}

	/**
	 * Are we currently trying to post a reply?
	 * @return {Boolean}
	 */

	static posting_reply(){
		return this.__is_page("new_post");
	}

	/**
	 * Are we currently trying to create a thread?
	 * @return {Boolean}
	 */

	static posting_thread(){
		return this.__is_page("new_thread");
	}

	/**
	 * Are we currently trying to edit a post?
	 * @return {Boolean}
	 */

	static editing_post(){
		return this.__is_page("edit_post");
	}

	/**
	 * Are we currently trying to edit a thread?
	 * @return {Boolean}
	 */

	static editing_thread(){
		return this.__is_page("edit_thread");
	}

	/**
	 * Are we currently trying to edit a thread or post?
	 * @return {Boolean}
	 */

	static editing(){
		return this.editing_thread() || this.editing_post();
	}

	/**
	 * Are we viewing a custom page?
	 * @return {Boolean}
	 */

	static page(){
		return this.__is_page("page");
	}

	/**
	 * Are we viewing a permalink page (i.e linking to a direct post)?
	 * @return {Boolean}
	 */

	static permalink(){
		return this.__is_page("permalink");
	}

	/**
	 * Are we viewing a permalink to a post?
	 * @return {Boolean}
	 */

	static permalink_post(){
		if(this.permalink()){
			let params = pb.data("route").params;

			if(params && params.post_id){
				return true;
			}
		}

		return false;
	}

	/**
	 * Are we viewing the activity profile page?
	 * @return {Boolean}
	 */

	static profile_activity(){
		return this.__is_page("show_user_activity");
	}

	/**
	 * Are we viewing the following profile page?
	 * @return {Boolean}
	 */

	static profile_following(){
		return this.__is_page("show_user_following");
	}

	/**
	 * Are we viewing the friends profile page?
	 * @return {Boolean}
	 */

	static profile_friends(){
		return this.__is_page("show_user_friends");
	}

	/**
	 * Are we viewing the gifts profile page?
	 * @return {Boolean}
	 */

	static profile_gift(){
		return this.__is_page("show_user_gift");
	}

	/**
	 * Are we viewing the groups profile page?
	 * @return {Boolean}
	 */

	static profile_groups(){
		return this.__is_page("show_user_groups");
	}

	/**
	 * Are we viewing a main profile page?
	 * @return {Boolean}
	 */

	static profile_home(){
		return this.__is_page("user") || this.__is_page("current_user");;
	}

	/**
	 * Is it a valid Profile
	 */

	static profile_exists(){
		return yootil.page.member.exists();
	}

	/**
	 * Are we editing the admin controls page for the user?
	 * @return {Boolean}
	 */

	static profile_edit_admin(){
		return this.__is_page("edit_user_admin");
	}

	/**
	 * Are we editing the user's avatar?
	 * @return {Boolean}
	 */

	static profile_edit_avatar(){
		return this.__is_page("edit_user_avatar");
	}

	/**
	 * Are we editing the user's badges?
	 * @return {Boolean}
	 */

	static profile_edit_badges(){
		return this.__is_page("edit_user_badges");
	}

	/**
	 * Are we editing the user's notifications?
	 * @return {Boolean}
	 */

	static profile_edit_notifications(){
		return this.__is_page("edit_user_notifications");
	}

	/**
	 * Are we editing the user's personal settings?
	 * @return {Boolean}
	 */

	static profile_edit_personal(){
		return this.__is_page("edit_user_personal");
	}

	/**
	 * Are we editing the user's privacy settings?
	 * @return {Boolean}
	 */

	static profile_edit_privacy(){
		return this.__is_page("edit_user_privacy");
	}

	/**
	 * Are we editing the user's general settings?
	 * @return {Boolean}
	 */

	static profile_edit_settings(){
		return this.__is_page("edit_user_settings");
	}

	/**
	 * Are we editing the user's social settings?
	 * @return {Boolean}
	 */

	static profile_edit_social(){
		return this.__is_page("edit_user_social");
	}

	/**
	 * Are we viewing the notifications profile page?
	 * @return {Boolean}
	 */

	static profile_notifications(){
		return this.__is_page("show_user_notifications") || this.__is_page("show_more_notifications");
	}

	/**
	 * Are we viewing the profile (including any of the profile tabs)
	 * @return {Boolean}
	 */

	static profile(){
		return (this.profile_activity() || this.profile_following() || this.profile_friends() || this.profile_gift() || this.profile_groups() || this.profile_home() || this.profile_notifications());
	}

	/**
	 * Are we currently viewing the recent posts page?
	 * @return {Boolean}
	 */

	static recent_posts(){
		return (this.__is_page("all_recent_posts") || this.__is_page("recent_posts"));
	}

	/**
	 * Are we currently viewing posts page by IP?
	 * @return {Boolean}
	 */

	static ip_posts(){
		return this.__is_page("posts_by_ip");
	}

	/**
	 * Are we currently viewing any posts page?
	 * @return {Boolean}
	 */

	static posts(){
		return this.recent_posts() || this.ip_threads();
	}

	/**
	 * Are we currently viewing the recent threads page?
	 * @return {Boolean}
	 */

	static recent_threads(){
		return this.__is_page("recent_threads") || this.__is_page("recent_threads_created");
	}

	/**
	 * Are we currently viewing threads by IP?
	 * @return {Boolean}
	 */

	static ip_threads(){
		return this.__is_page("threads_by_ip");
	}

	/**
	 * Are we currently viewing any type of thread listing?
	 * @return {Boolean}
	 */

	static thread_list(){
		return this.recent_threads() || this.ip_threads() || this.search_results() || this.message_thread();
	}

	/**
	 * Are we currently trying to search?
	 * @return {Boolean}
	 */

	static search(){
		return this.__is_page("search");
	}

	/**
	 * Are we viewing results of a search?
	 * @return {Boolean}
	 */

	static search_results(){
		return this.__is_page("search_results");
	}

	/**
	 * Are we currently viewing a thread?
	 * @return {Boolean}
	 */

	static thread(){
		return this.__is_page("thread") || this.__is_page("list_posts") || this.permalink_post();
	}
	
}).init();

/**
 * @class yootil.page
 * @ignore
 * Wrapper around the ProBoards data object "page".
 */

yootil.page = class {

	/**
	 * This is an internal method
	 *
	 * @param {String} key The key on the page object to check and get
	 * @return {String|Object|Array|Number}
	 */

	static __get_data(key){
		if(proboards && proboards.dataHash && proboards.dataHash.page && typeof proboards.dataHash.page[key] != "undefined"){
			return proboards.dataHash.page[key];
		}

		return "";
	}

};

/**
 * @class yootil.page.board
 * @static
 * Various methods to help get board information.
 */

yootil.page.board = class {

	/**
	 *	This is an internal method
	 *
	 * @param {String} key The key on the board object to check and get.
	 * @return {String|Object|Array|Number}
	 * @ignore
	 */

	static __get_data(key){
		let board_obj = yootil.page.__get_data("board");

		if(board_obj && typeof board_obj == "object" && board_obj[key] != "undefined"){
			return board_obj[key];
		}

		return "";
	}

	/**
	 * Gets the board ID
	 * @return {Number}
	 */

	static id(){
		return parseInt(this.__get_data("id"), 10) || null;
	}

	/**
	 * Gets the board name
	 * @return {String}
	 */

	static name(){
		return this.__get_data("name");
	}

	/**
	 * Gets the board URL
	 * @return {String}
	 */

	static url(){
		return this.__get_data("url");
	}

	/**
	 * Get the board description
	 * @return {String}
	 */

	static description(){
		return this.__get_data("description");
	}

	/**
	 * Checks if this board has post counts disabled
	 * @return {Boolean}
	 */

	static disable_post_counts(){
		return this.__get_data("disable_post_counts") == 1;
	}

	/**
	 * Checks if this board has posting disabled
	 * @return {Boolean}
	 */

	static disable_posting(){
		return this.__get_data("disable_posting") == 1;
	}

	/**
	 * Get the board name
	 * @return {String}
	 */

	static display_name(){
		return this.__get_data("display_name");
	}

	/**
	 * Checks if this board is hidden
	 * @return {Boolean}
	 */

	static hidden(){
		return this.__get_data("hidden") == 1;
	}

	/**
	 * Get the board total posts
	 * @return {Number}
	 */

	static posts(){
		return this.__get_data("posts");
	}

	/**
	 * Checks if this board has announcements showing
	 * @return {Boolean}
	 */

	static show_announcements(){
		return this.__get_data("show_announcements") == 1;
	}

	/**
	 * Get the board total threads
	 * @return {Number}
	 */

	static threads(){
		return this.__get_data("threads");
	}

};

/**
 * @class yootil.page.category
 * @static
 * Various methods to help get category information.
 */

yootil.page.category = class {

	/**
	 * This is an internal method.
	 *
	 * @param {String} key The key on the category object to check and get.
	 * @return {String}
	 * @ignore
	 */

	static __get_data(key){
		let cat_obj = yootil.page.__get_data("category");

		if(cat_obj && typeof cat_obj == "object" && cat_obj[key] != "undefined"){
			return cat_obj[key];
		}

		return "";
	}

	/**
	 * Gets the category ID.
	 * @return {Number}
	 */

	static id(){
		return parseInt(this.__get_data("id"), 10) || null;
	}

	/**
	 * Gets the category name.
	 * @return {String}
	 */

	static name(){
		return this.__get_data("name");
	}
	
};

/**
 * @class yootil.page.member
 * @static
 * Various methods to help get member information.
 */

yootil.page.member = class {

	/**
	 * This is an internal method
	 *
	 * @param {String} key The key on the page object to check and get
	 * @return {String|Object|Array|Number}
	 * @ignore
	 */

	static __get_data(key){
		let member_obj = yootil.page.__get_data("member");

		if(member_obj && typeof member_obj == "object" && member_obj[key] != "undefined"){
			return member_obj[key];
		}

		return "";
	}

	/**
	 * Gets the members ID.
	 * @return {Number}
	 */

	static id(){
		return parseInt(this.__get_data("id"), 10);
	}

	/**
	 * Gets the members name.
	 * @return {String}
	 */

	static name(){
		return this.__get_data("name");
	}

	/**
	 * Gets the members URL.
	 * @return {String}
	 */

	static url(){
		return this.__get_data("url");
	}

	/**
	 * Gets the members display group id.
	 * @return {Number}
	 */

	static display_group_id(){
		return this.__get_data("display_group_id");
	}

	/**
	 * Valid member
	 * @return {Boolean}
	 */

	static exists(){
		return this.id() != 0;
	}

}

/**
 * @class yootil.page.post
 * @static
 * Various methods to help get post information.
 */

yootil.page.post = class {

	/**
	 * This is an internal method
	 *
	 * @param {String} key The key on the page object to check and get
	 * @return {String|Object|Array|Number}
	 * @ignore
	 */

	static __get_data(key){
		let board_obj = yootil.page.__get_data("post");

		if(board_obj && typeof board_obj == "object" && board_obj[key] != "undefined"){
			return board_obj[key];
		}

		return "";
	}

	/**
	 * Gets the user id of who created the post
	 * @return {Number}
	 */

	static created_by(){
		return this.__get_data("created_by");
	}

	/**
	 * Gets the timeastamp when the post was created
	 * @return {Number}
	 */

	static created_on(){
		return parseInt(this.__get_data("created_on"), 10);
	}

	/**
	 * Gets the post id
	 * @return {Number}
	 */

	static id(){
		return parseInt(this.__get_data("id"), 10);
	}

	/**
	 * Checks if the post has been liked
	 * @return {boolean}
	 */

	static liked(){
		return this.__get_data("liked") == 1;
	}

	/**
	 * Gets the thread id
	 * @return {Number}
	 */

	static thread_id(){
		return parseInt(this.__get_data("thread_id"), 10);
	}

	/**
	 * Gets the post URL
	 * @return {String}
	 */

	static url(){
		return this.__get_data("url");
	}

};

/**
 * @class yootil.page.thread
 * @static
 * Various methods to help get thread information.
 */

yootil.page.thread = class {

	/**
	 * This is an internal method
	 *
	 * @param {String} key The key on the page object to check and get
	 * @return {String|Object|Array|Number}
	 * @ignore
	 */

	static __get_data(key){
		let thread_obj = yootil.page.__get_data("thread");

		if(thread_obj && typeof thread_obj == "object" && thread_obj[key] != "undefined"){
			return thread_obj[key];
		}

		return "";
	}

	/**
	 * Gets the thread ID
	 * @return {Number}
	 */

	static id(){
		return parseInt(this.__get_data("id"), 10);
	}

	/**
	 * Gets the thread creation date timestamp
	 * @return {Number}
	 */

	static created_on(){
		return parseInt(this.__get_data("created_on"), 10);
	}

	/**
	 * Is the thread an announcement?
	 * @return {Boolean}
	 */

	static announcement(){
		return this.__get_data("is_announcement") == 1;
	}

	/**
	 * Is the thread bookmarked?
	 * @return {Boolean}
	 */

	static bookmarked(){
		return this.__get_data("is_bookmarked") == 1;
	}

	/**
	 * Is the thread falling?
	 * @return {Boolean}
	 */

	static falling(){
		return this.__get_data("is_falling") == 1;
	}

	/**
	 * Is the thread locked?
	 * @return {Boolean}
	 */

	static locked(){
		return this.__get_data("is_locked") == 1;
	}

	/**
	 * Is the thread new?
	 * @return {Boolean}
	 */

	static fresh(){
		return this.__get_data("is_new") == 1;
	}

	/**
	 * Is the thread a poll?
	 * @return {Boolean}
	 */

	static poll(){
		return this.__get_data("is_poll") == 1;
	}

	/**
	 * Is the thread sticky?
	 * @return {Boolean}
	 */

	static sticky(){
		return this.__get_data("is_sticky") == 1;
	}

	/**
	 * Gets the thread subject
	 * @return {String}
	 */

	static subject(){
		return this.__get_data("subject");
	}

	/**
	 * Gets the thread URL
	 * @return {String}
	 */

	static url(){
		return this.__get_data("url");
	}

	/**
	 * Gets the board id
	 * @return {Number}
	 */

	static board_id(){
		return parseInt(this.__get_data("board_id"), 10);
	}

	/**
	 * Gets the member who created this thread
	 * @return {Number}
	 */

	static created_by(){
		return parseInt(this.__get_data("created_by"), 10);
	}

	/**
	 * Gets the last post id
	 * @return {Number}
	 */

	static last_post_id(){
		return parseInt(this.__get_data("last_post_id"), 10);
	}

	/**
	 * Gets the first post id
	 * @return {Number}
	 */

	static first_post_id(){
		return parseInt(this.__get_data("first_post_id"), 10);
	}

	/**
	 * Gets the last post time
	 * @return {Number}
	 */

	static last_post_time(){
		return parseInt(this.__get_data("last_post_time"), 10);
	}

};

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

yootil.queue = class {

	constructor(auto_start = false){
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

	add(func = null){
		if(!func){
			return;
		}

		this._queue.push(func);

		if(!this._iterator){
			this._iterator = this.iterator();
		}

		if(this._auto_start && !this._started){
			this.start();
		}

		return this;
	}

	*iterator(){
		while(!this._stopped && this._queue.length){
			yield this._queue[0](this);
			this._queue.shift();
		}
	}

	/**
	 * Moves to the next item in the iterator.
	 *
	 * @return {Object}
	 */

	next(){
		return this._iterator.next();
	}

	/**
	 * Starts the queue.
	 *
	 * @chainable
	 */

	start(){
		this._started = true;
		this._iterator.next();

		return this;
	}

	/**
	 * Stops the queue.
	 *
	 * @chainable
	 */

	stop(){
		this._queue = [];
		this._stopped = true;
	}

	/**
	 * Pauses the queue.
	 *
	 * @chainable
	 */

	pause(){
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

	resume(do_next = true){
		this._stopped = false;

		if(do_next){
			this._iterator.next();
		}

		return this;
	}

	/**
	 * Clears the queue.
	 *
	 * @chainable
	 */

	clear(){
		this._queue = [];

		return this;
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
 * @class yootil.storage
 * @static
 * Wrappers for session and persistent storage.
 */

yootil.storage = class {

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

	static set(key, value = "", json = false, persist = true){
		if(key){
			value = (json && !yootil.is_json(value))? JSON.stringify(value) : value;
		}

		if(persist){
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

	static get(key, json = false, persist = true){
		let value = "";

		if(key){
			if(persist){
				value = localStorage.getItem(key);
			} else {
				value = sessionStorage.getItem(key);
			}

			if(json && yootil.is_json(value)){
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

	static remove(key, persist = true){
		if(key){
			if(persist){
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

	static clear(persist = true){
		if(persist){
			localStorage.clear();
		} else {
			sessionStorage.clear();
		}

		return this;
	}

};

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

		yootil.storage.set(this._ls_key, data, true, true);

		// Delay adding event (IE issues yet again)

		setTimeout(() => $(window).on("storage", (evt) => {
			if(evt && evt.originalEvent && evt.originalEvent.key == this._ls_key){

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
		yootil.storage.set(this._ls_key, data, true, true);
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

/**
 * Uses a basic LCG algorithm for seeded random numbers.
 *
 * let rnd = new yootil.random(555);
 *
 * console.log(rnd.next()); // 0.19470878187320603
 *
 */

yootil.random = class {

	/**
	 *
	 * @param {Integer} seed
	 */

	constructor(seed){
		this.m = 2147483647;
		this.a = 1103515245;
		this.c = 12345;
		this.seed = (seed && typeof seed === "string")? yootil.hash_code(seed) :  Math.floor(Math.random() * this.m);
	}

	/**
	 *
	 * @returns {Number}
	 */

	current(){
		return this.seed / this.m;
	}

	/**
	 *
	 * @returns {Number}
	 */

	next(){
		this.seed = (this.a * this.seed + this.c) % this.m;

		return this.seed / this.m;
	}

};

yootil.init();