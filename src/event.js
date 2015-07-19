/**
 * @class yootil.event
 * @alias yootil.ajax
 * @static
 *
 * Useful methods for event / ajax related stuff.
 *
 * Note:  This was originally called "ajax" and has been renamed.
 */

yootil.event = yootil.ajax = (function(){

	// Setup new events

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

	proboards.events.user_searched = [];
	proboards.events.user_searchedOne = [];

	$.ajaxPrefilter(function(opts, orig_opts){
		var orig_success = orig_opts.success;
		var evt = "";

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

			case proboards.routeMap["user_search"] :
				evt = "user_searched";
				break;

		}

		if(evt){
			opts.success = function(){
				orig_success.apply(this, arguments);
				proboards.events.run(evt, {args: arguments});
			};
		}
	});

	return {

		/**
		 * Adds a global AJAX event to an element.
		 *
		 *     yootil.ajax.bind("complete", $("form:first"), function(){
		 *     	alert("AJAX completed");
		 *     });
		 *
		 *     yootil.ajax.bind("complete", $("form:first"), function(){
		 *     	alert("AJAX completed");
		 *     }, "/plugin/key/set/");
		 *
		 * @param {String} event The ajax event to bind (i.e "complete"), without "ajax" prefix.
		 * @param {Object} e The element to bind the event too.
		 * @param {Function} f This is the callback function that will get called.
		 * @param {Mixed} url The AJAX URL ProBoards calls to match against. If it is a boolean, then it will match all.
		 * @param {Object} [context] The context of the callback function.
		 * @chainable
		 */

		bind: function(event, e, f, url, context){
			var elem = $(e);

			event = "ajax" + event.substr(0, 1).toUpperCase() + event.substr(1);

			if(elem.length == 1){
				context = (context)? context : e;

				if(event && f && e.length){
					elem[event](function(event, XMLHttpRequest, options){
						if(url === true || new RegExp(url, "i").test(options.url)){
							$.proxy(f, context, event, XMLHttpRequest, options, e)();
						}
					});
				}
			}

			return this;
		},

		/**
		 * Will run after an auto-search (note: this occurs when a board or thread page are first loaded as well).
		 *
		 * @param {Function} func The function that will be called after search.
		 * @param {Object} [context] Context of func.
		 * @chainable
		 */

		after_search: function(func, context){
			proboards.on("afterSearch", ((context)? $.proxy(func, context) : func));

			return this;
		},

		/**
		 * Will run when the user clicks on a column title to sort a list.
		 *
		 * @param {Function} func The function that will be called after search.
		 * @param {Object} [context] Context of func.
		 * @chainable
		 */

		column_sort: function(func, context){
			proboards.on("columnSort", ((context)? $.proxy(func, context) : func));

			return this;
		},

		/**
		 * Will run when the 'Show More' link is clicked on a user's activity page.
		 *
		 * @param {Function} func The function that will be called after search.
		 * @param {Object} [context] Context of func.
		 * @chainable
		 */

		more_activity: function(func, context){
			proboards.on("moreActivity", ((context)? $.proxy(func, context) : func));

			return this;
		},

		/**
		 * Will run when the 'Show More' link is clicked on a user's notifications page.
		 *
		 * @param {Function} func The function that will be called after search.
		 * @param {Object} [context] Context of func.
		 * @chainable
		 */

		more_notification: function(func, context){
			proboards.on("moreNotification", ((context)? $.proxy(func, context) : func));

			return this;
		},

		/**
		 * Will run when paginating.
		 *
		 * @param {Function} func The function that will be called after search.
		 * @param {Object} [context] Context of func.
		 * @chainable
		 */

		page_change: function(func, context){
			proboards.on("pageChange", ((context)? $.proxy(func, context) : func));

			return this;
		},

		/**
		 * Will run when a post it liked.
		 *
		 * @param {Function} func The function that will be called after search.
		 * @param {Object} [context] Context of func.
		 * @chainable
		 */

		post_liked: function(func, context){
			proboards.on("post_liked", function(){
				((context)? $.proxy(func, context) : func)(this.args || []);
			});

			return this;
		},

		/**
		 * Will run when a thread is bookmarked.
		 *
		 * @param {Function} func The function that will be called after search.
		 * @param {Object} [context] Context of func.
		 * @chainable
		 */

		bookmarked_thread: function(func, context){
			proboards.on("bookmarked_thread", function(){
				((context)? $.proxy(func, context) : func)(this.args || []);
			});

			return this;
		},

		/**
		 * Will run when a user updates their status.
		 *
		 * @param {Function} func The function that will be called after search.
		 * @param {Object} [context] Context of func.
		 * @chainable
		 */

		updated_status: function(func, context){
			proboards.on("updated_status", function(){
				((context)? $.proxy(func, context) : func)(this.args || []);
			});

			return this;
		},

		/**
		 * Will run when a user posts a shout in the shoutbox.
		 *
		 * @param {Function} func The function that will be called after search.
		 * @param {Object} [context] Context of func.
		 * @chainable
		 */

		shoutbox_shouted: function(func, context){
			proboards.on("shoutbox_shouted", function(){
				((context)? $.proxy(func, context) : func)(this.args || []);
			});

			return this;
		},

		/**
		 * Will run when the shoutbox updates (i.e fetching new messages).
		 *
		 * @param {Function} func The function that will be called after search.
		 * @param {Object} [context] Context of func.
		 * @chainable
		 */

		shoutbox_updated: function(func, context){
			proboards.on("shoutbox_updated", function(){
				((context)? $.proxy(func, context) : func)(this.args || []);
			});

			return this;
		},

		/**
		 * Will run when a user is being searched (i.e bbc insert user link).
		 *
		 * @param {Function} func The function that will be called after search.
		 * @param {Object} [context] Context of func.
		 * @chainable
		 */

		user_searched: function(func, context){
			proboards.on("user_searched", function(){
				((context)? $.proxy(func, context) : func)(this.args || []);
			});

			return this;
		}

	};

})();