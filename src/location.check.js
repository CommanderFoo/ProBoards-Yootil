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