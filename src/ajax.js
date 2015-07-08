/**
 * @class yootil.ajax
 * @static
 *	Useful methods for AJAX related stuff, mostly hooking into calls
 */

yootil.ajax = (function(){

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
		 *	Because ProBoards uses AJAX for pagination and on filtering (i.e members page),
		 *	we need to apply our DOM changes after the content on the page has been updated.
		 *
		 * @param {Function} func The function that will be called after search.
		 * @param {Object} [context] Context of func.
		 * @chainable
		 */

		after_search: function(func, context){
			proboards.on("afterSearch", ((context)? $.proxy(func, context) : func));

			return this;
		}

	};

})();