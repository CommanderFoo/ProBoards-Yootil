/**
 * @class yootil.bar
 * @static
 * Mimics the ProBoards Network bar, but on the left and for plugins.
 */

yootil.bar = (function(){

	var bar = {

		_bar: null,

		_items: {},

		_total_items: 0,

		has_bar: function(){
			if(!bar.is_enabled()){
				return false;
			}

			if(this._bar){
				return true;
			}

			var the_bar = $("#yootil-bar-wrapper");

			if(the_bar.length == 1){
				this._bar = the_bar;
				return true;
			}

			return false;
		},

		/**
		 * Add an item to the Yootil Bar.
		 *
		 *     yootil.bar.add("http://proboards.com", "http://example.com/someimage.png", "Hello World");
		 *
		 * @param {String} link URL for the item.
		 * @param {String} img URL for the image.
		 * @param {String} [alt] Alt / title for the image.
		 * @param {String} [id] Pass in a unique ID if you wish to have the option to remove it later.
		 * @param {Function} [func] Pass function to be executed when clicked on.
		 * @param {Mixed} [context] Context of the function being passed.
		 * @chainable
		 */

		add: function(link, img, alt, id, func, context){
			var self = this;
			var alt = alt || "";

			$(function(){
				if(self.has_bar()){
					if(link && img){
						var line_break = "";

						if(yootil.settings.bar_position == 7 || yootil.settings.bar_position == 8){
							line_break = "<br />";
						}

						var item = $("<a href='" + link + "'><img src='" + img + "' alt='" + alt + "' title='" + alt + "' />" + line_break + "</a>");

						if(line_break.length){
							item.addClass("yootil-bar-item-block");
						}

						if(id && id.toString().length){
							self._items["_" + id.toString()] = item;
						}

						if(func && typeof func == "function"){
							item.click(function(){
								return $.proxy(func, context)();
							});
						}

						self._total_items ++;
						self._bar.find("#yootil-bar").append(item);

						self.reposition_top();
						self.reposition_left();
					}

					if(self._bar.find("#yootil-bar a").length > 0){
						self._bar.show();
					}
				}
			});

			return this;
		},

		/**
		 * Remove an item to the Yootil Bar.
		 *
		 *     yootil.bar.remove("myitem");
		 *
		 * @param {String} id The unique ID used when adding the item.
		 * @chainable
		 */

		remove: function(id){
			if(id && id.toString().length && this._items["_" + id.toString()]){
				this._items["_" + id.toString()].remove();
				delete this._items["_" + id.toString()];
				this._total_items --;

				if(this._bar.find("#yootil-bar a").length == 0){
					this._bar.css("display", "none");
				} else {
					this.reposition_left();
					this.reposition_top();
				}
			}

			return this;
		},

		/**
		 * Find out how many items are currently sitting in the bar.
		 *
		 * @return {Number}
		 */

		total_items: function(){
			return this._total_items;
		},

		/**
		 * Use this to get the item (jQuery wrapped)
		 *
		 *     yootil.get("myitem");
		 *
		 * @param {String} id The unique ID used when adding the item.
		 * @return {Object} jQuery object is returned that wraps around the a tag.
		 */

		get: function(id){
			if(id && id.toString().length && this._items["_" + id.toString()]){
				return this._items["_" + id.toString()];
			}
		},

		/**
		 * Use this to see if an item exists in the bar.
		 *
		 *     if(yootil.bar.has("myitem")){
		 *     	console.log("item is in the yootil bar");
		 *     }
		 *
		 * @param {String} id The unique ID used when adding the item.
		 * @return {Boolean}
		 */

		has: function(id){
			if(id && id.toString().length && this._items["_" + id.toString()]){
				return true;
			}

			return false;
		},

		/**
		 * Checks to see if the bar is enabled.
		 *
		 *     if(yootil.bar.is_enabled()){
		 *     	console.log("Bar is enabled");
		 *     }
		 *
		 * @return {Boolean}
		 */

		is_enabled: function(){
			if(yootil.settings.bar_enabled){
				return true;
			}

			return false;
		},

		reposition_left: function(){
			var position = yootil.settings.bar_position;

			if(position == 2 || position == 5){
				this._bar.css("left", (($(window).width() / 2) - (this._bar.width() / 2)));
			}
		},

		reposition_top: function(){
			var position = yootil.settings.bar_position;

			if(position == 7 || position == 8){
				this._bar.css("top", (($(window).height() / 2) - (this._bar.height() / 2)));
			}
		},

		get_bar_settings: function(){
			var position = yootil.settings.bar_position;
			var bar_settings = {

				position: "yootil-bar-bottom-left",
				setting: position,
				custom: null

			};

			switch(position){

				case 1 :
					bar_settings.position = "yootil-bar-top-left";
					break;

				case 2 :
					bar_settings.position = "yootil-bar-top-center";
					bar_settings.custom = {

						left: $(window).width() / 2

					}

					break;

				case 3 :
					bar_settings.position = "yootil-bar-top-right";
					break;

				case 4 :
					bar_settings.position = "yootil-bar-bottom-left";
					break;

				case 5 :
					bar_settings.position = "yootil-bar-bottom-center";
					bar_settings.custom = {

						left: $(window).width() / 2

					}

					break;

				case 6 :
					bar_settings.position = "yootil-bar-bottom-right";
					break;

				case 7 :
					bar_settings.position = "yootil-bar-left-middle";
					bar_settings.custom = {

						top: $(window).height() / 2

					}

					break;

				case 8 :
					bar_settings.position = "yootil-bar-right-middle";
					bar_settings.custom = {

						top: $(window).height() / 2

					}

					break;

			}

			return bar_settings;
		}

	};

	if(yootil.user.logged_in() || bar.is_enabled()){
		$(function(){
			var bar_settings = yootil.bar.get_bar_settings();
			var plugin_bar = $("<div id='yootil-bar-wrapper'><div id='yootil-bar'></div></div>").addClass(bar_settings.position);

			if(bar_settings.custom){
				plugin_bar.css(bar_settings.custom);
			}

			// If the PB bar exists, lets move it above it

			if(bar_settings.setting == 6){
				if($("#pbn-bar-wrapper").length){
					plugin_bar.addClass("yootil-bar-offset");
				}
			}

			$("body").append(plugin_bar);
		});
	};

    return bar;

})();