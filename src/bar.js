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
						var item = $("<a href='" + link + "' style='margin-top: 3px; display: inline-block;'><img src='" + img + "' style='padding: 0px 3px;' alt='" + alt + "' title='" + alt + "' /></a>");

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
						self.show_bar();
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

		show_bar: function(){
			if(this._bar.find("#yootil-bar a").length > 0){
				var display = yootil.storage.get("yootil_bar", false);

				if(display){
					if(display.toString() == "1" || display.toString().length == 0){
						this._bar.find("#yootil-bar").css("display", "inline-block");
					} else {
						this._bar.find("> img").attr("src", yootil.images.collapse).attr("alt", ">");
						this._bar.find("#yootil-bar").css("display", "none");
					}
				}

				this._bar.css("display", "");
			}
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
			if(yootil.settings && yootil.settings.bar_enabled && yootil.settings.bar_enabled == 0){
				return false;
			}

			return true;
		}

	};

	$(function(){
		if(!yootil.user.logged_in() || !bar.is_enabled()){
			return;
		}

		var html_built = false;
		var pb_bar = $("div#pbn-bar-wrapper");

		// If it doesn't exist, manually create it.

		if(!pb_bar.length){
			html_built = true;
			pb_bar = $('<div style="position: fixed; right: inherit; bottom: 0px; left: 0px; height: 22px; *height: 23px; display: none; text-align: right; z-index: 20;" id="yootil-bar-wrapper"><img style="display: inline-block; float: left;" alt="<" src="' + yootil.images.expand + '"><div style="display: inline-block; float: left; height: 23px; background-color: #F0F0F0; border-width: 1px 1px 0px 0px; border-style: solid; border-color: #B0B0B0;" id="yootil-bar"></div></div>');
		}

		if(pb_bar.length == 1){
			if(html_built){
				plugin_bar = pb_bar;
			} else {
				var plugin_bar = pb_bar.clone();

				plugin_bar.attr("id", "yootil-bar-wrapper");
				plugin_bar.css({

					right: "inherit",
					left: "0px",
					display: "none"

				});

				plugin_bar.find("img:first").css("float", "left").attr("src", yootil.images.expand).attr("alt", "<");

				plugin_bar.find("div#pbn-bar").css({

					width: "",
					"float": "left",
					"border-width": "1px 1px 0px 0px"

				}).attr("id", "yootil-bar").html("");
			}

			plugin_bar.find("> img").click(function(){
				var yootil_bar = $("#yootil-bar");

				yootil_bar.toggle();

				if(yootil_bar.is(":visible")){
					yootil_bar.css("display", "inline-block");
					$(this).attr("src", yootil.images.expand).attr("alt", "<");
				} else {
					$(this).attr("src", yootil.images.collapse).attr("alt", ">");
				}

				yootil.storage.set("yootil_bar", ((yootil_bar.is(":visible"))? "1" : "0"), false, true);
			});

			$("body").append(plugin_bar);
		}

	});

    return bar;

})();