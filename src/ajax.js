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
		}
	
	};
    
})();