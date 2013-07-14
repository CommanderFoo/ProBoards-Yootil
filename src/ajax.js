/**
* Namespace: yootil.ajax
*	Useful methods for AJAX
*/

yootil.ajax = (function(){

	return {
	
		/**
		* Method: bind
		* 	Allows us add a global AJAX event to an element.
		*
		* Parameters:
		* 	event - *string* The ajax event to bind (i.e "complete"), without "ajax" prefix.
		* 	e - *object* The element to bind the event too.
		* 	f - *function* This is the callback function that will get called.
		* 	url - *string* / *boolean* The AJAX URL ProBoards calls to match against. If bool, match all.
		* 	context - *object* The context ("this") of the callback function.
		*
		* Returns:
		* 	*object* yootil
		*
		* Examples:
		* 	yootil.ajax.bind("complete", $("form:first"), function(){ alert("AJAX completed"); });
		*
		* 	yootil.ajax.bind("complete", $("form:first"), function(){ alert("AJAX completed"); }, "/plugin/key/set/");
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
			
			return yootil;
		},
		
		/**
		* Method: after_search
		*	Because ProBoards uses AJAX for pagination, and on filtering (i.e members page),
		*	we need to apply our DOM changes after the content on the page has been updated.
		*	Currently there is no official callback, however the Live Query plugin is included,
		*	but not recommended if you are after best performance.
		*
		* 	This is now a wrapper around ProBoards event.
		*
		*	Note:  Pages are cached, so you will need to check the DOM for your modified changes,
		*	otherwise you will see it repeat without checking.
		*
		* Parameters:
		*	func - *function* - The function that will be called after search.
		*	context - *object* - Context of func
		*
		* Returns:
		*	*object* Yootil
		*/
		
		after_search: function(func, context){
			proboards.on("afterSearch", ((context)? $.proxy(func, context) : func));
			
			/*var ui_as = $(".ui-autosearch");
			
			if(ui_as.length){
				var fn = ui_as.autosearch("option", "afterSearch");

				ui_as.autosearch("option", "afterSearch", function(){
					fn.apply(this, arguments);
					
					if(context){
						$.proxy(func, context)();
					} else {
						func();
					}
				});	
			}*/
		}
	
	};
    
})();