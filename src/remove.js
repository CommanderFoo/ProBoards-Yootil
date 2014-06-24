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
		*	yootil.remove.nav_item('Forum');
		*
		*	yootil.remove.nav_item(["Forum", "Members"]);
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

	}

})();