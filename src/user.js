/**
* Namespace: yootil.user
*	Contains useful methods relating to the user currently viewing the page
*/

yootil.user = (function(){

	return {

		/**
		* Property: data
		*	*object* Holds a reference to the ProBoards user object
		*/
		
		data:  {},
				
		/**
		* Method: has_data
		*	This checks to see if the ProBoards data object exists and has a user object, we cache it as well.
		*
		* Returns:
		*	*boolean*
		*/
		
		has_data: function(){
			if(this.data && typeof this.data.id != "undefined"){
				return true;
			} else {
				if(typeof proboards != "undefined"){
					var data = proboards.data;
					
					if(typeof data != "undefined" && typeof data == "function"){
						var user_data = proboards.data("user");
						
						if(typeof user_data != "undefined"){
							this.data = user_data;
							
							return true;
						}
					}
				}
			}
			
			return false;
		},

		/**
		* Function: logged_in
		*	Checks to see if the user is logged in, if so, returns true.
		*
		* Returns:
		*	*boolean*
		*/
		
		logged_in: function(){
			if(this.has_data()){
				if(typeof this.data.is_logged_in != "undefined" && this.data.is_logged_in){
					return true;
				}
			}
			
			return false;
		},
		
		/**
		* Function: id
		*	Gets the current users ID
		*
		* Returns:
		*	*integer*
		*/
		
		id: function(){
			if(this.has_data()){
				if(typeof this.data.id != "undefined"){
					return this.data.id;
				}
			}
			
			return 0;
		},
		
		/**
		* Function: is_staff
		*	Checks to see if the current user is staff
		*
		* Returns:
		*	*boolean*
		*/
		
		is_staff: function(){
			if(this.has_data()){
				if(typeof this.data.is_staff != "undefined" && this.data.is_staff){
					return true;
				}
			}
			
			return false;
		},
		
		/**
		* Function: name
		*	Gets the users name
		*
		* Returns:
		*	*string*
		*/
		
		name: function(){
			if(this.has_data()){
				if(typeof this.data.name != "undefined"){
					return this.data.name;
				}
			}
			
			return "";
		},
		
		/**
		* Function: theme
		*	Gets the users theme ID
		*
		* Returns:
		*	*integer*
		*/
		
		theme: function(){
			if(this.has_data()){
				if(typeof this.data.theme_id != "undefined"){
					return this.data.theme_id;
				}
			}
			
			return 0;
		},
		
		/**
		* Function: url
		*	Gets the users path URL to their profile
		*
		* Returns:
		*	*string*
		*/
		
		url: function(){
			if(this.has_data()){
				if(typeof this.data.url != "undefined"){
					return this.data.url;
				}
			}
			
			return "";
		}
		
	};
	
})();