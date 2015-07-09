/**
* Namespace: yootil.remove
*
* 	This object contains useful methods to remove ProBoards Elements
*/

yootil.remove = (function(){

	return {			

		/**
		* Function: nav_item
		*	Quickly remove items from the Navigation Tree.
		*
		* Parameters:
		*	Args - *string* / *array* The exact url of the Nav Item to be removed
		*		
		* Returns:
		*	*array* Contains all removed objects for easy return
		*
		* Examples:
		*	yootil.remove.nav_item('/');
		*
		*	yootil.remove.nav_item(["/", "/members"]);
		*/		

		nav_branch: function (args) {

			var array,
			nav = $('#nav-tree'),
			removed = [];

			if ( Object.prototype.toString.call(args) !== "[object Array]" )
				array = new Array(args);
			else
				array = args;

			for ( var i in array ) { 

				var obj = nav.find('[href="' + array[i].toString() + '"]').parentsUntil('#nav-tree').hide();

			removed.push(obj);

			}       

			return removed;

		},	

		/**
		* Function: replace
		*	Quickly replace items that have been removed.
		*
		* Parameters:
		*	Args - *array* Array containing the ojects to be replaced
		*		
		* Returns:
		*	*object* yootil.remove
		*
		* Examples:
		*	var x = yootil.remove.nav_item(["Forum", "Members"]);
		*	yootil.remove.replace(x)
		*/	

		replace: function(arr) {
			if ( Object.prototype.toString.call(arr) === "[object Array]") {
				for ( var i in arr ) {
					arr[i].show();
				}
			}
		}

	}

})();