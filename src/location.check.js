/**
 * @class yootil.location.check
 * @static
 * Used to determine where we are currently.
 */

yootil.location.check = (function(){
	
	return {
	
		cached_route: ((proboards.data && proboards.data("route")) ? proboards.data("route").name : ""),
		
		// Please keep these sorted alphabetically. Just helps our sanity
		
		/**
		 * INTERNAL METHOD.  Used to easily see if an id is the current page.
		 *
		 * @param {String} id ID of the page to check route against.
		 * @return {Boolean}
		 * @ignore
		 */

		__is_page: function(id){
			return this.cached_route == id;
		},

		/**
		 * Are we currently viewing the main page of a board? (i.e. thread listing)
		 * @return {Boolean}
		 */

		board: function(){
			return this.__is_page("board") || this.__is_page("list_threads");
		},

		/**
		 * Are we currently viewing the bookmarks listing?
		 * @return {Boolean}
		 */

		bookmarks: function(){
			return this.__is_page("bookmarks");
		},

		/**
		 * Are we currently viewing the main calendar page?
		 * @return {Boolean}
		 */

		calendar: function(){
			// calendar == this month, calendar_month == this or any depending on query string
			return this.__is_page("calendar") || this.__is_page("calendar_month") || this.__is_page("calendar_list");
		},

		/**
		 * Are we viewing a day of calendar events?
		 * @return {Boolean}
		 */

		calendar_day: function(){
			return this.__is_page("calendar_day");
		},

		/**
		 * Are we currently viewing the main forum? (i.e. board listing)
		 * @return {Boolean}
		 */

		forum: function(){
			// CURRENT ISSUE: This is "forum" when custom page is homepage...
			// See: http://support.proboards.com/index.cgi?board=openbetafeaturerequests&action=display&thread=429638&page=1
			// Plugins don't run on custom pages, so if home or forum, this is viewing main page.
			return this.__is_page("home") || this.__is_page("forum");
		},

		/**
		 * Are we currently viewing the members list?
		 * @return {Boolean}
		 */

		members: function(){
			return this.__is_page("members") || this.__is_page("list_members");
		},

		/**
		 * Are we currently viewing the list of messages?
		 * @return {Boolean}
		 */

		message_list: function(){
			return this.__is_page("conversations") || this.__is_page("conversations_inbox") || this.__is_page("list_conversations");
		},

		/**
		 * Are we currently viewing a message?
		 * @return {Boolean}
		 */

		message_thread: function(){
			return this.__is_page("conversation") || this.__is_page("list_messages");
		},

		/**
		 * Are we currently sending a message?
		 * @return {Boolean}
		 */

		messaging: function(){
			return this.message_new() || this.conversation_new() || this.conversation_create() || this.message_quote() || this.conversation_new_user();
		},

		/**
		 * Are we currently replying to a conversation?
		 * @return {Boolean}
		 */

		message_new: function(){
			return this.__is_page("new_message");
		},

		/**
		 * Are we currently replying to a conversation by quoting?
		 * @return {Boolean}
		 */

		message_quote: function(){
			return this.__is_page("quote_messages");
		},

		/**
		 * Are we currently creating a new conversation?
		 * @return {Boolean}
		 */

		conversation_new: function(){
			return this.__is_page("new_conversation") || this.__is_page("create_conversation") || this.__is_page("conversation_new_user");
		},

		/**
		 * Are we currently creating a new conversation?
		 * @return {Boolean}
		 */

		conversation_create: function(){
			return this.__is_page("create_conversation");
		},

		/**
		 * Are we currently creating a new conversation (new_user_conversation)?
		 * @return {Boolean}
		 */

		conversation_new_user: function(){
			return this.__is_page("new_user_conversation");
		},

		/**
		 * Are we currently trying to post/create a thread/quote a post?
		 * @return {Boolean}
		 */

		posting: function(){
			return this.posting_quote() || this.posting_reply() || this.posting_thread();
		},

		/**
		 * Are we currently trying to reply with a quote?
		 * @return {Boolean}
		 */

		posting_quote: function(){
			return this.__is_page("quote_posts");
		},

		/**
		 * Are we currently trying to post a reply?
		 * @return {Boolean}
		 */

		posting_reply: function(){
			return this.__is_page("new_post");
		},

		/**
		 * Are we currently trying to create a thread?
		 * @return {Boolean}
		 */

		posting_thread: function(){
			return this.__is_page("new_thread");
		},

		/**
		 * Are we currently trying to edit a post?
		 * @return {Boolean}
		 */

		editing_post: function(){
			return this.__is_page("edit_post");
		},

		/**
		 * Are we currently trying to edit a thread?
		 * @return {Boolean}
		 */

		editing_thread: function(){
			return this.__is_page("edit_thread");
		},

		/**
		 * Are we currently trying to edit a thread or post?
		 * @return {Boolean}
		 */

		editing: function(){
			return this.editing_thread() || this.editing_post();
		},

		/**
		 * Are we viewing the activity profile page?
		 * @return {Boolean}
		 */

		profile_activity: function(){
			return this.__is_page("show_user_activity");
		},

		/**
		 * Are we viewing the following profile page?
		 * @return {Boolean}
		 */

		profile_following: function(){
			return this.__is_page("show_user_following");
		},

		/**
		 * Are we viewing the friends profile page?
		 * @return {Boolean}
		 */

		profile_friends: function(){
			return this.__is_page("show_user_friends");
		},

		/**
		 * Are we viewing the gifts profile page?
		 * @return {Boolean}
		 */

		profile_gift: function(){
			return this.__is_page("show_user_gift");
		},

		/**
		 * Are we viewing the groups profile page?
		 * @return {Boolean}
		 */

		profile_groups: function(){
			return this.__is_page("show_user_groups");
		},

		/**
		 * Are we viewing a main profile page?
		 * @return {Boolean}
		 */

		profile_home: function(){
			return this.__is_page("user");
		},

		/**
		 * Are we editing the admin controls page for the user?
		 * @return {Boolean}
		 */

		profile_edit_admin: function(){
			return this.__is_page("edit_user_admin");
		},

		/**
		 * Are we editing the user's avatar?
		 * @return {Boolean}
		 */

		profile_edit_avatar: function(){
			return this.__is_page("edit_user_avatar");
		},

		/**
		 * Are we editing the user's badges?
		 * @return {Boolean}
		 */

		profile_edit_badges: function(){
			return this.__is_page("edit_user_badges");
		},

		/**
		 * Are we editing the user's notifications?
		 * @return {Boolean}
		 */

		profile_edit_notifications: function(){
			return this.__is_page("edit_user_notifications");
		},

		/**
		 * Are we editing the user's personal settings?
		 * @return {Boolean}
		 */

		profile_edit_personal: function(){
			return this.__is_page("edit_user_personal");
		},

		/**
		 * Are we editing the user's privacy settings?
		 * @return {Boolean}
		 */

		profile_edit_privacy: function(){
			return this.__is_page("edit_user_privacy");
		},

		/**
		 * Are we editing the user's general settings?
		 * @return {Boolean}
		 */

		profile_edit_settings: function(){
			return this.__is_page("edit_user_settings");
		},

		/**
		 * Are we editing the user's social settings?
		 * @return {Boolean}
		 */

		profile_edit_social: function(){
			return this.__is_page("edit_user_social");
		},

		/**
		 * Are we viewing the notifications profile page?
		 * @return {Boolean}
		 */

		profile_notifications: function(){
			return this.__is_page("show_user_notifications") || this.__is_page("show_more_notifications");
		},

		/**
		 * Are we viewing the profile (including any of the profile tabs)
		 * @return {Boolean}
		 */

		profile: function(){
			return (this.profile_activity() || this.profile_following() || this.profile_friends() || this.profile_gift() || this.profile_groups() || this.profile_home() || this.profile_notifications());
		},

		/**
		 * Are we currently viewing the recent posts page?
		 * @return {Boolean}
		 */

		recent_posts: function(){
			return (this.__is_page("all_recent_posts") || this.__is_page("recent_posts"));
		},

		/**
		 * Are we currently viewing the recent threads page?
		 * @return {Boolean}
		 */

		recent_threads: function(){
			return this.__is_page("recent_threads");
		},

		/**
		 * Are we currently trying to search?
		 * @return {Boolean}
		 */

		search: function(){
			return this.__is_page("search");
		},

		/**
		 * Are we viewing results of a search?
		 * @return {Boolean}
		 */

		search_results: function(){
			return this.__is_page("search_results");
		},

		/**
		 * Are we currently viewing a thread?
		 * @return {Boolean}
		 */

		thread: function(){
			// View thread
			return this.__is_page("thread") || this.__is_page("list_posts");
		}
		
	};

})();