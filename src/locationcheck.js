/**
* Namespace: yootil.locationcheck
*   Used to find out where we are on ProBoards
*
*   Later on we can expand this to have a URL generating section
*/

yootil.locationcheck = (function(){

    return {

        // Keep these sorted alphabetically. Just helps our sanity

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
        * Method: calendar
        *   Are we currently viewing the main calendar page?
        *
        * Returns:
        *   *boolean*
        */

        calendar: function(){
            return this.__is_page('calendar');
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
            return this.__is_page('quotes_posts');
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