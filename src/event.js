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