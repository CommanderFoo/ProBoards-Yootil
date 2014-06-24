/**
* Namespace: yootil.remove
*
* 	This object will contain useful methods to remove ProBoards objects
*/

yootil.remove = (function(){

	return {

		/**
		* Object: removed
		*   Containes all removed objects, eventually will support easy insert back into DOM
		*/

		removed: {},

		/**
		* Function: __remove
		*	This is an interal method
		*
		* Parameters:
		*	Obj - *object* The object to be removed		
		*
		* Returns:
		*	*object* yootil.remove
		*/

		__remove: function (obj, where, selector) {

			var	id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
				clone = obj.clone(true, true);

			if ( obj.length ) {			

				obj.replaceWith('<div id="' + id + '" style="display: none"/>');

				if(this.removed[where]) {
					this.removed[where][selector] = { "obj": clone, "id": id };
				}
				else{
					this.removed[where] = {};
					this.removed[where][selector] = { "obj": clone, "id": id };
				}

			} else {

				throw new Error('Yootil Error: Tried to remove a Nav Branch that did not exist.');

			}


		},			

		/**
		* Function: nav_item
		*	Quickly remove items from the Navigation Tree.
		*
		* Parameters:
		*	Args - *string* / *array* The exact url of the Nav Item to be removed
		*		
		* Returns:
		*	*object* yootil.remove
		*
		* Examples:
		*	yootil.remove.nav_item('Forum');
		*
		*	yootil.remove.nav_item(["Forum", "Members"]);
		*/		

        nav_item: function (args) {

            var array
                _nav = $('#nav-tree');

            if ( Object.prototype.toString.call(args) !== "[object Array]" )
                array = new Array(args);
            else
                array = args;

            for ( i in array ) { 

            	var obj = _nav.find('[href="' + array[i].toString() + '"]').parentsUntil('#nav-tree');

                this.__remove(obj, 'nav_item', '[href="' + array[i].toString() + '"]');



            }       

            return yootil.remove;
        },	



	}

})();