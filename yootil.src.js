/**
* Version: 0.7.0
*
* http://yootil.pixeldepth.net
* http://pixeldepth.net
* http://sz-ex.com
* http://support.proboards.com/index.cgi?action=display&board=plugindatabase&thread=429360
*/

/**
* Namespace: yootil
*
* 	yootil contains helpful methods to help plugin developers develop quicker.
*
* 	There are various methods, some are just wrappers around ProBoards API.
*
*
*	Project - https://github.com/pixelDepth/Yootil
*
*	Compressed - http://yootil.pixeldepth.net/yootil.min.js
*
*	Experimental - http://yootil.pixeldepth.net/yootil.src.js
*
*	Plugin - http://yootil.pixeldepth.net/yootil.library.pbp
*
*	Topic - http://support.proboards.com/index.cgi?action=display&board=plugindatabase&thread=429360
*/

yootil = (function(){

	return {
		
		/**
		* Method: html_encode
		*	Makes a value safe for inserting into the DOM.
		*
		* Parameters:
		* 	value - *string* The value you want returned to be safe.
		*
		* Returns:
		* 	*string* The safe value.
		*
		* Examples:
		*	var safe_html = yootil.html_encode("<b>this won't be bold</b>");
		*/
		
		html_encode: function(value){
			value = (value)? value : "";
			
			return $("<div />").text(value).html();
		},

		/**
		* Method: html_decode
		*	Converts back to HTML
		*
		* Parameters:
		* 	value - *string* The value you want returned to be HTML string.
		*
		* Returns:
		*	*string* The HTML string value.
		*
		* Examples:
		*	var html = yootil.html_decode("<b>this will be bold</b>");
		*/
		
		html_decode: function(value){
			value = (value)? value : "";
			
			return $("<div />").html(value).text();
		},
		
		/**
		* Method: number_format
		* 	Formats numbers so they look pretty (i.e 1,530).
		*
		* Parameters:
		* 	str - *string* The value to format.
		*	delim - *string* The delimiter between each block (i.e 100.000.000, 100,000,000).
		*
		* Returns:
		*	*string* Formatted string.
		*
		* Examples:
		*	yootilS.number_format(1000); // 1,000
		*/
		
		number_format: function(str, delim){
			str = (str)? str : "";
			delim = (delim)? delim : ",";

			return (str.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + delim) || "0");
		},
		
		/**
		* Method: is_json
		*	Checks to see if string passed in is a valid JSON string
		*
		* Parameters:
		*	str - *string* This is the string that is getting checked for valid JSON
		*	return_obj - *boolean* If true, the string will be parsed and returned back
		*
		* Returns:
		*	*boolean* / *object*
		*/
		
		is_json: function(str, return_obj){
			try {
				str = JSON.parse(str);
			} catch(e){
				return false;
			}
			
			if(return_obj){
				return str;
			}
			
			return true;
		}
	
	
	};
	
})();

/**
* Namespace: yootil.key
*
* 	This object is a wrapper around the proboards.plugin.key object.
*
* 	Note:  this isn't final, I might change things around a little and add a few more methods.
*
*	Also, things might get changed by ProBoards.
*/
	
yootil.key = (function(){
	
	return {
	
		/**
		* Property: pb_key_obj
		*	*object* Holds a reference to the ProBoards key object.
		*/
		
		pb_key_obj: proboards.plugin.key,
		
		/**
		* Method: exists
		* 	Checks to see if a key exists.
		*
		* Parameters:
		* 	key - *string* The key to check.
		*
		* Returns:
		* 	*boolean*
		*
		* Examples:
		*	yootil.key.exists("mykey");
		*/
		
		exists: function(key){
			if(key){				
				if(this.pb_key_obj){
					if(this.pb_key_obj(key)){
						return true;
					}
				}
			}
		
			return false;
		},

		/**
		* Method: get_key
		* 	Returns the key object.
		*
		* Parameters:
		* 	key - *string* The key to get.
		*
		* Returns:
		* 	*object* / *boolean*
		*
		* Examples:
		*	yootil.key.get_key("mykey");
		*/
		
		get_key: function(key){
			if(this.exists(key)){
				return this.pb_key_obj(key);
			}
			
			return false;
		},
		
		/**
		* Method: has_value
		* 	Checks to see if a key has a value.
		*
		* Parameters:
		* 	key - *string* The key to check.
		* 	user - *string* / *integer* This is the user id, proboards defaults to current user if not set.
		*
		* Returns:
		* 	*boolean*
		*
		* Examples:
		*	yootil.key.has_value("mykey");		
		*/
		
		has_value: function(key, user){
			if(this.exists(key)){
				if(typeof this.pb_key_obj(key).get != "undefined"){
					var val = this.pb_key_obj(key).get(user || undefined);
					
					if(val && val.toString().length){
						return true;
					}
				}
			}
			
			return false;
		},
		
		/**
		* Method: value
		* 	Gets the key value
		*
		* Parameters:
		* 	key - *string* The key.
		* 	user - *string* / *integer* This is the user id, proboards defaults to current user if not set.
		* 	is_json - *boolean* If true, it will parse the JSON string.
		*
		* Returns:
		* 	*string*
		*
		* Examples:
		*	yootil.key.value("mykey");
		*
		*	yootil.key.value("mykey", null, true); // Parses JSON
		*/
		
		value: function(key, user, is_json){
			if(this.exists(key)){
				if(this.has_value(key, user)){
					var value = this.pb_key_obj(key).get(user || undefined);
					
					if(is_json){
						value = JSON.parse(value);
					}
					
					return value;
				}
			}
			
			return "";
		},
		
		/**
		* Method: clear
		* 	Clears out key value.
		*
		* Parameters:
		* 	key - *string* The key.
		*	user - *string* / *integer* This is the user id, proboards defaults to current user if not set.
		*
		* Returns:
		* 	*object* - returns yootil.key object to allow chaining.
		*
		* Examples:
		*	yootil.key.clear("mykey");
		*/
		
		clear: function(key, user){
			this.set(key, "", user);
			
			return this;
		},
		
		/**
		* Method: set
		* 	Sets a keys value.
		*
		* Parameters:
		* 	key - *string* The key.
		* 	value - *string* / *object* Can be a string, or a object that will get .
		* 	user - *string* / *integer This is the user id, proboards defaults to current user if not set.
		* 	is_json - *boolean* If true, it will JSON stringify the value.
		*
		* Returns:
		*	*boolean*
		*
		* Examples:
		*	yootil.key.set("mykey", "apples");
		*
		*	yootil.key.set("mykey", "apples", null, true); // Save as JSON
		*/
		
		set: function(key, value, user, is_json){
			if(this.exists(key)){
				if(is_json){
					value = JSON.stringify(value);
				}
				
				if(typeof user == "undefined" || !user || !user.toString().length){
					user = value;
					value = undefined;
				}
				
				this.pb_key_obj(key).set(user, value);
			}
			
			return this;
		}
	};
	
})();

/**
* Namespace: yootil.create
*
* 	This object will contain useful ProBoards methods
*/

yootil.create = (function(){

	return {		

		/**
		* Method: container
		* 	Creates ProBoards v5 div containers.
		*
		* Parameters:
		* 	title - *string* The container title.
		* 	content - *string* The container content.
		* 	safe - *boolean* / *object* true or false, or pass onject to make html safe (i.e {title: false, content: true}).
		* 	title_styles - *object* key value par for css styles (i.e {color: "red", padding: "11px"}).
		* 	content_styles - *object* key value par for css styles (i.e {color: "red", padding: "11px"}).
		* 	container_styles - *object* key value par for css styles (i.e {color: "red", padding: "11px"}).
		* 	no_h2 - *boolean* If set to true, it will not wrap the title with an h2 tag.
		* 	jquery_obj - *boolean* If false, returned content will be html string.
		*
		* Returns:
		* 	*string* / *object* Depends on what jquery_obj is set too, default is jquery object.
		*
		* Examples:
		*	yootil.create.container("My Title", "My Content");
		*
		*	yootil.create.container("My Title", "My Content", {title: false, content: true});
		*/
	
		container: function(title, content, safe, title_styles, content_styles, container_styles, no_h2, jquery_obj){
			var html = "";
			var safe_title = safe_content = (typeof safe != "undefined" || safe)? true : false;

			title = (title || "");
			content = (content || "");
			
			if(typeof safe === "object"){
				if(typeof safe.title != "undefined"){
					safe_title = safe.title;
				}
				
				if(typeof safe.content != "undefined"){
					safe_content = safe.content;
				}
			}
			
			container_styles = (container_styles)? container_styles : {};
			title_styles = (title_styles)? title_styles : {};
			content_styles = (content_styles)? content_styles : {};
			
			title = (safe_title)? this.make_safe(title) : title;
			title = (typeof no_h2 != "undefined" && !no_h2)? title : ("<h2>" + title + "</h2>");
			
			content = (safe_content)? this.make_safe(content) : content;
			
			html += "<div class=\"container\">";
			html += $("<div class=\"title-bar\">" + title + "</div>").css(title_styles).wrap("<span/>").parent().html();
			html += $("<div class=\"content pad-all\">" + content + "</div>").css(content_styles).wrap("<span/>").parent().html();
			html += "</div>";
			
			if(typeof jquery_obj == "undefined" || jquery_obj){
				return $(html).css(container_styles);
			} else {
				return $(html).css(container_styles).wrap("<span/>").parent().html();
			}
		},
		
		/**
		* Function: page
		*	Quickly create a blank page that matches a certain URL.
		*
		* Parameters:
		*	locate - *string* / *object* This will get matched against the location.href value, can be a string or RegExp object.
		*	document_title - *string* Add onto the current document title.
		*	hide_content - *boolean* By default the children of #content gets hidden, you can override this
		*
		* Returns:
		*	*object* yootil.create
		*
		* Examples:
		*	yootil.create.page("shop", "Shop");
		*
		*	yootil.create.page("shop", "Shop").container("The Shop", "Welcome to the Shop").appendTo("#content");
		*/
	
		page: function(locate, document_title, hide_content){
			var reg = (locate.constructor == RegExp)? locate : new RegExp("\/" + locate, "i");
			
			if(locate && location.href.match(reg)){
				if(typeof document_title != "undefined" && document_title.length){
					document.title += " - " + document_title;
				}
				
				if(typeof hide_content == "undefined" || hide_content){
					$("#content[role=main]").children().hide();
				}
			}
			
			return yootil.create;
		}
	};

})();

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

/**
* Namespace: yootil.ajax
*	Useful methods for AJAX
*/

yootil.ajax = (function(){

	return {
	
		/**
		* Method: bind
		* 	When we call .set() on a key, we can't specify a callback for when it's done.  So this method allows
		* 	us to do just that.  This isn't ideal though, but works for now until we get a callback added in by
		* 	ProBoards officially.
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

/**
* Namespace: yootil.sound
*	Allows us to play a sound (doesn't use HTML 5 Audio)
*
*
* 	Didn't want to use a 3rd party library, they are too big for sometihng that won't 
*	get used that often by plugins.
*
*
* 	Ideally we would use HTML 5 Audio, however there is a cross domain policy.
* 	We can set access on the audio files, specifically Access-Control-Allow-Origin.
* 	See http://www.w3.org/TR/cors/#access-control-allow-origin-response-hea
* 	for more information about Access-Control.
*
*
* 	But if other people use it, they would be forced to have a host that allowed
* 	them to set the origin (htaccess).  Too much trouble for now.
*/

yootil.sound = (function(){

	return {

		/**
		* Property: audio_obj
		*	Holds a reference to a jquery wrapped element for the sound
		*/
		
		audio_obj: null,
		
		/**
		* Method: play
		* 	This will create the correct element for the right browser and play the sound.
		*
		* Parameters:
		*	src - *string* The URL of the sound to play, usually MP3
		*
		* Examples:
		*	yootil.sound.play("http://pixeldepth.net/proboards/trophies/sounds/trophy.mp3");
		*/
		
		play: function(src){	
						
			// IE will play a double sound, so need to add bgsound element to the body
			// first, then set the src.
			// Chrome doesn't seem to like set the src later, so we just remove and append
			
			if($.browser.msie){
				if(!this.audio_obj){
				
					// There are issues with IE and embed, so we use bgsound instead
					
					this.audio_obj = $("<bgsound src=\"#\" autostart=\"true\" loop=\"1\" width=\"1\" height=\"1\" id=\"yootil_sound_player\">").appendTo($("body"));
				}
				
				this.audio_obj.attr("src", src);
			} else {
				if(this.audio_obj){
					this.audio_obj.remove();
				}
			
				this.audio_obj = $("<embed src=\"" + src + "\" autostart=\"true\" width=\"1\" loop=\"1\" height=\"1\" id=\"yootil_sound_player\">").appendTo($("body"));
			}		
			
		}
			
	};
	
})();

/**
* Namespace: yootil.location
*   Used to handle anything regarding URL locations on PB.
*/

yootil.location = (function(){

    return {};

});

/**
* Namespace: yootil.location.check
*   Used to determine where we are currently
*/

yootil.location.check = (function(){

    return {

        // Please keep these sorted alphabetically. Just helps our sanity

        /**
        * Method: __is_page
        *   INTERNAL METHOD.  Used to easily see if an id is the current page.
        *
        * Parameters:
        *   id - *string* ID of the page to check route against
        *
        * Examples:
        *   yootil.locationcheck.__is_page("board");
        *
        * Returns:
        *   *boolean*
        */

        __is_page: function(id){
            return proboards.data && proboards.data('route') && proboards.data('route').name == id;
        },

        /**
        * Method: board
        *   Are we currently viewing the main page of a board? (i.e. thread listing)
        *
        * Returns:
        *   *boolean*
        */
        
        board: function(){
            return this.__is_page('board');
        },

        /**
        * Method: bookmarks
        *   Are we currently viewing the bookmarks listing?
        *
        * Returns:
        *   *boolean*
        */
        
        bookmarks: function(){
            return this.__is_page('bookmarks');
        },

        /**
        * Method: calendar
        *   Are we currently viewing the main calendar page?
        *
        * Returns:
        *   *boolean*
        */

        calendar: function(){
            // calendar == this month, calendar_month == this or any depending on query string
            return this.__is_page('calendar') || this.__is_page('calendar_month');
        },

        /**
        * Method: calendar_day
        *   Are we viewing a day of calendar events?
        *
        * Returns:
        *   *boolean*
        */

        calendar_day: function(){
            return this.__is_page('calendar_day');
        },

        /**
        * Method: forum
        *   Are we currently viewing the main forum? (i.e. board listing)
        *
        * Returns:
        *   *boolean*
        */
        
        forum: function(){
            // CURRENT ISSUE: This is "forum" when custom page is homepage...
            // See: http://support.proboards.com/index.cgi?board=openbetafeaturerequests&action=display&thread=429638&page=1
            // Plugins don't run on custom pages, so if home or forum, this is viewing main page.
            return this.__is_page('home') || this.__is_page('forum');
        },

        /**
        * Method: members
        *   Are we currently viewing the members list?
        *
        * Returns:
        *   *boolean*
        */

        members: function(){
            return this.__is_page('members');
        },

        /**
        * Method: message_list
        *   Are we currently viewing the list of messages?
        *
        * Returns:
        *   *boolean*
        */

        message_list: function(){
            return this.__is_page('conversations');
        },

        /**
        * Method: message_thread
        *   Are we currently viewing a message?
        *
        * Returns:
        *   *boolean*
        */

        message_thread: function(){
            return this.__is_page('conversation');
        },

        /**
        * Method: messaging
        *   Are we currently sending a message?
        *
        * Returns:
        *   *boolean*
        */
                
        messaging: function(){
			return this.message_new() || this.conversation_new() || this.conversation_create();
        },

        /**
        * Method: message_new
        *   Are we currently replying to a conversation?
        *
        * Returns:
        *   *boolean*
        */
        
		message_new: function(){
			return this.__is_page("new_message");
		},
		
		/**
        * Method: convertation_new
        *   Are we currently creating a new conversation?
        *
        * Returns:
        *   *boolean*
        */
        
		conversation_new: function(){
			return this.__is_page("new_conversation");
		},

		/**
        * Method: convertation_create
        *   Are we currently creating a new conversation?
        *
        * Returns:
        *   *boolean*
        */
        
		conversation_create: function(){
			return this.__is_page("create_conversation");
		},
				
        /**
        * Method: posting
        *   Are we currently trying to post/create a thread/quote a post?
        *
        * Returns:
        *   *boolean*
        */
        
        posting: function(){
            return this.posting_quote() || this.posting_reply() || this.posting_thread();
        },

        /**
        * Method: posting_quote
        *   Are we currently trying to reply with a quote?
        *
        * Returns:
        *   *boolean*
        */
        
        posting_quote: function(){
            return this.__is_page('quote_posts');
        },

        /**
        * Method: posting_reply
        *   Are we currently trying to post a reply?
        *
        * Returns:
        *   *boolean*
        */
        
        posting_reply: function(){
            return this.__is_page('new_post');
        },

        /**
        * Method: posting_thread
        *   Are we currently trying to create a thread?
        *
        * Returns:
        *   *boolean*
        */
        
        posting_thread: function(){
            return this.__is_page('new_thread');
        },

        /**
        * Method: editing_post
        *   Are we currently trying to edit a post?
        *
        * Returns:
        *   *boolean*
        */
        
        editing_post: function(){
            return this.__is_page('edit_post');
        },
        
        /**
        * Method: editing_thread
        *   Are we currently trying to edit a thread?
        *
        * Returns:
        *   *boolean*
        */
        
        editing_thread: function(){
            return this.__is_page('edit_thread');
        },

        /**
        * Method: editing
        *   Are we currently trying to edit a thread or post?
        *
        * Returns:
        *   *boolean*
        */
                
        editing: function(){
			return this.editing_thread() || this.editing_post();
        },
        
        /**
        * Method: profile_activity
        *   Are we viewing the activity profile page?
        *
        * Returns:
        *   *boolean*
        */

        profile_activity: function(){
            return this.__is_page('show_user_activity');
        },

        /**
        * Method: profile_following
        *   Are we viewing the following profile page?
        *
        * Returns:
        *   *boolean*
        */

        profile_following: function(){
            return this.__is_page('show_user_following');
        },

        /**
        * Method: profile_friends
        *   Are we viewing the friends profile page?
        *
        * Returns:
        *   *boolean*
        */

        profile_friends: function(){
            return this.__is_page('show_user_friends');
        },

        /**
        * Method: profile_gift
        *   Are we viewing the gifts profile page?
        *
        * Returns:
        *   *boolean*
        */

        profile_gift: function(){
            return this.__is_page('show_user_gift');
        },

        /**
        * Method: profile_groups
        *   Are we viewing the groups profile page?
        *
        * Returns:
        *   *boolean*
        */

        profile_groups: function(){
            return this.__is_page('show_user_groups');
        },

        /**
        * Method: profile_home
        *   Are we viewing a main profile page?
        *
        * Returns:
        *   *boolean*
        */

        profile_home: function(){
            return this.__is_page('user');
        },

        /**
        * Method: profile_edit_admin
        *   Are we editing the admin controls page for the user?
        *
        * Returns:
        *   *boolean*
        */

        profile_edit_admin: function(){
            return this.__is_page('edit_user_admin');
        },

        /**
        * Method: profile_edit_avatar
        *   Are we editing the user's avatar?
        *
        * Returns:
        *   *boolean*
        */

        profile_edit_avatar: function(){
            return this.__is_page('edit_user_avatar');
        },

        /**
        * Method: profile_edit_badges
        *   Are we editing the user's badges?
        *
        * Returns:
        *   *boolean*
        */

        profile_edit_badges: function(){
            return this.__is_page('edit_user_badges');
        },

        /**
        * Method: profile_edit_notifications
        *   Are we editing the user's notifications?
        *
        * Returns:
        *   *boolean*
        */

        profile_edit_notifications: function(){
            return this.__is_page('edit_user_notifications');
        },

        /**
        * Method: profile_edit_personal
        *   Are we editing the user's personal settings?
        *
        * Returns:
        *   *boolean*
        */

        profile_edit_personal: function(){
            return this.__is_page('edit_user_personal');
        },

        /**
        * Method: profile_edit_privacy
        *   Are we editing the user's privacy settings?
        *
        * Returns:
        *   *boolean*
        */

        profile_edit_privacy: function(){
            return this.__is_page('edit_user_privacy');
        },

        /**
        * Method: profile_edit_settings
        *   Are we editing the user's general settings?
        *
        * Returns:
        *   *boolean*
        */

        profile_edit_settings: function(){
            return this.__is_page('edit_user_settings');
        },

        /**
        * Method: profile_edit_social
        *   Are we editing the user's social settings?
        *
        * Returns:
        *   *boolean*
        */

        profile_edit_social: function(){
            return this.__is_page('edit_user_social');
        },

        /**
        * Method: profile_notifications
        *   Are we viewing the notifications profile page?
        *
        * Returns:
        *   *boolean*
        */

        profile_notifications: function(){
            return this.__is_page('show_user_notifications');
        },

        /**
        * Method: recent_posts
        *   Are we currently viewing the recent posts page?
        *
        * Returns:
        *   *boolean*
        */

        recent_posts: function(){
            return (this.__is_page('all_recent_posts') || this.__is_page("recent_posts"));
        },

        /**
        * Method: recent_threads
        *   Are we currently viewing the recent threads page?
        *
        * Returns:
        *   *boolean*
        */

        recent_threads: function(){
            return this.__is_page('recent_threads');
        },

        /**
        * Method: search
        *   Are we currently trying to search?
        *
        * Returns:
        *   *boolean*
        */

        search: function(){
            return this.__is_page('search');
        },

        /**
        * Method: search_results
        *   Are we viewing results of a search?
        *
        * Returns:
        *   *boolean*
        */

        search_results: function(){
            return this.__is_page('search_results');
        },

        /**
        * Method: thread
        *   Are we currently viewing a thread?
        *
        * Returns:
        *   *boolean*
        */
        
        thread: function(){
            // View thread
            return this.__is_page('thread');
        }
            
    };
 })();

/**
* Namespace: yootil.user.action
*   Used to find out what actions a user has recently performed, in terms of the website usage.
*/

yootil.user.action = (function(){

    return {

        /**
        * Method: created_thread
        *   Did the user just create a new thread?
        *
        * Returns:
        *   *boolean*
        */

        created_thread: function(){

        },

        /**
        * Method: posted
        *   Did the user just post a new thread or reply?
        *
        * Returns:
        *   *boolean*
        */
        
        posted: function(){
            // It is inclusive enough that they either created a thread or replied to one, to define posting
            return this.created_thread() || this.replied();
        },

        /**
        * Method: replied
        *   Did the user just reply to a thread?
        *
        * Returns:
        *   *boolean*
        */

        replied: function(){

        },

        /**
        * Method: sent_pm
        *   Did the user just send a pm?
        *
        * Returns:
        *   *boolean*
        */

        sent_pm: function(){

        }
            
    };
})();

/**
* Namespace: yootil.storage
*	A helpful wrapper for storing data for the session in window.name for the current host.
*
*	The data stored will be a json string.
*
*	The data is only stored for the session in the current window / tab.  If the user opens
*	another tab or window, the data is lost.
*/

yootil.storage = (function(){

	return {
	
		/**
		* Property: win_data
		*	*object* Holds the current value from window.name as an object.
		*/
		
		win_data: null,
				
		/**
		* Property: host
		*	*string* The current host.
		*/
		
		host: location.hostname,
		
		/**
		* Method: parse_data
		*	This is used to check that the data from window.name exists, is valid json, and for this host.
		*	This only sets win_data once if it's null.
		*/
		
		parse_data: function(){	
			if(this.win_data === null){
				var win_data_string = window.name;
			
				if(!win_data_string || !win_data_string.length){
					this.win_data = {};
				} else {
					var obj;
					
					if(obj = yootil.is_json(win_data_string, true)){
						this.win_data = obj;
					} else {
						this.win_data = {};
					}
				}
			}
		},
		
		/**
		* Method: set
		*	Sets a key on the current host object of win_data
		*
		* Parameters:
		*	key - *string*
		*	value - *string*
		*
		* Returns:
		*	yootil.storage
		*/
		
		set: function(key, value){
			this.parse_data();
			
			if(!this.win_data[this.host]){
				this.win_data[this.host] = {};
			}
			
			this.win_data[this.host][key] = value;
			this.update_window();
			
			return this;
		},

		/**
		* Method: get
		*	Gets a value from the host object
		*
		* Parameters:
		*	key - *string*
		*
		* Returns:
		*	*string*
		*/
				
		get: function(key){
			this.parse_data();
			
			if(this.win_data && this.win_data[this.host] && this.win_data[this.host][key]){
				return this.win_data[this.host][key];
			}
			
			return "";			
		},

		/**
		* Method: clear
		*	Clears the host object
		*
		* Returns:
		*	yootil.storage
		*/
		
		clear: function(key){
			this.parse_data();
			
			if(this.win_data && this.win_data[this.host]){
				delete this.win_data[this.host];
				this.update_window();
			}
			
			return this;
		},
		
		/**
		* Method: update_window
		*	Sets the window.name value
		*/
		
		update_window: function(){
			if(this.win_data){
				window.name = JSON.stringify(this.win_data);
			}
		}
	
	};

})();

/**
* Namespace: yootil.form
*	Easy access to forms for many of the forms on the forum.
*
*	Each method will return either the form or an empty array.  This keeps
* 	things consistent with how jQuery works when a selector doesn't find anything.
*/

yootil.form = (function(){

	return {

		/**
		* Method: post_form
		*	Checks for any form to do with posting on the post page.
		*
		* Returns:
		*	*array* / *jQuery*
		*/
		
		post_form: function(){
			if(yootil.location.check.posting_thread()){
				return $("form.form_thread_new");
			}
			
			return $("form.form_post_new");
		},

		/**
		* Method: quick_reply_form
		*	Checks for any form to do with quick replies, this includes threads and conversations
		*
		* Returns:
		*	*array* / *jQuery*
		*/
				
		quick_reply_form: function(){
			return $("form.form_post_quick_reply");
		},
		
		/**
		* Method: post_quick_reply_form
		*	Just for the quick reply on threads.
		*
		* Returns:
		*	*array* / *jQuery*
		*/
		
		post_quick_reply_form: function(){
			if(yootil.location.check.thread()){
				return this.quick_reply_form();
			}
			
			return [];
		},
	
		/**
		* Method: shoutbox_form
		*	Shoutbox form
		*
		* Returns:
		*	*array* / *jQuery*
		*/
		
		shoutbox_form: function(){
			return $("form.form_shoutbox_shoutbox");
		},

		/**
		* Method: conversation_form
		*	There are 2 forms for this, so we check if we are replying, if not
		*	we return the conversation new form.
		*
		* Returns:
		*	*array* / *jQuery*
		*/
				
		conversation_form: function(){
			if(yootil.location.check.message_new()){
				return this.message_form();
			}
				
			return this.conversation_new_form();
		},

		/**
		* Method: conversation_new_form
		*	Returns the form used when creating a new conversation.
		*
		* Returns:
		*	*array* / *jQuery*
		*/
		
		conversation_new_form: function(){
			return $("form.form_conversation_new");
		},
		
		/**
		* Method: message_form
		*	Returns the form used when creating a reply to a conversation
		*
		* Returns:
		*	*array* / *jQuery*
		*/
				
		message_form: function(){
			return $("form.form_message_new");
		}
	
	};

})();

/**
* Namespace: yootil.page
*	Wrapper around the ProBoards data object "page".
*/

yootil.page = (function(){

	return {
	
		/**
		* Method: __get_data
		*	This is an internal method
		*
		* Parameters:
		*	key - *string* The key on the page object to check and get
		*
		* Returns:
		*	*string*
		*/
		
		__get_data: function(key){
			if(proboards && proboards.dataHash && proboards.dataHash.page && typeof proboards.dataHash.page[key] != "undefined"){
				return proboards.dataHash.page[key];
			}
			
			return "";
		}
	
	};

})();

/**
* Namespace: yootil.page.category
*	Various methods to help get category information
*/

yootil.page.category = (function(){

	return {
	
		/**
		* Method: __get_data
		*	This is an internal method
		*
		* Parameters:
		*	key - *string* The key on the category object to check and get
		*
		* Returns:
		*	*string*
		*/
		
		__get_data: function(key){
			var cat_obj = yootil.page.__get_data("category");
			
			if(cat_obj && typeof cat_obj == "object" && cat_obj[key] != "undefined"){
				return cat_obj[key];
			}
			
			return "";
		},

		/**
		* Method: id
		*	Gets the category ID
		*
		* Returns:
		*	*integer*
		*/
		
		id: function(){
			return this.__get_data("id");
		},

		/**
		* Method: name
		*	Gets the category name
		*
		* Returns:
		*	*string*
		*/
		
		name: function(){
			return this.__get_data("name");
		}
	
	};

})();

/**
* Namespace: yootil.page.board
*	Various methods to help get board information
*/

yootil.page.board = (function(){

	return {
	
		/**
		* Method: __get_data
		*	This is an internal method
		*
		* Parameters:
		*	key - *string* The key on the board object to check and get
		*
		* Returns:
		*	*string*
		*/
		
		__get_data: function(key){
			var board_obj = yootil.page.__get_data("board");
			
			if(board_obj && typeof board_obj == "object" && board_obj[key] != "undefined"){
				return board_obj[key];
			}
			
			return "";
		},

		/**
		* Method: id
		*	Gets the board ID
		*
		* Returns:
		*	*integer*
		*/
		
		id: function(){
			return this.__get_data("id");
		},

		/**
		* Method: name
		*	Gets the board name
		*
		* Returns:
		*	*string*
		*/
		
		name: function(){
			return this.__get_data("name");
		},
		
		/**
		* Method: url
		*	Gets the board URL
		*
		* Returns:
		*	*string*
		*/
		
		url: function(){
			return this.__get_data("url");
		}
	
	};

})();