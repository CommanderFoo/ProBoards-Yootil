/**
 * @class yootil.location
 * @static
 *
 * Used to determine where we are currently.
 */

yootil.location = (class {

	static init(){
		this._cached_route = ((pb.data && pb.data("route")) ? pb.data("route").name : "");

		return this;
	}

	/**
	 * INTERNAL METHOD.  Used to easily see if an id is the current page.
	 *
	 * @param {String} id ID of the page to check route against.
	 * @return {Boolean}
	 * @ignore
	 */

	static __is_page(id){
		return this._cached_route == id;
	}

	/**
	 * Are we currently viewing the main page of a board? (i.e. thread listing)
	 * @return {Boolean}
	 */

	static board(){
		return this.__is_page("board") || this.__is_page("list_threads");
	}

	/**
	 * Are we currently viewing the bookmarks listing?
	 * @return {Boolean}
	 */

	static bookmarks(){
		return this.__is_page("bookmarks");
	}

	/**
	 * Are we currently viewing the main calendar page?
	 * @return {Boolean}
	 */

	static calendar(){

		// calendar == this month, calendar_month == this or any depending on query string

		return this.__is_page("calendar") || this.__is_page("calendar_month") || this.__is_page("calendar_list");
	}

	/**
	 * Are we viewing a day of calendar events?
	 * @return {Boolean}
	 */

	static calendar_day(){
		return this.__is_page("calendar_day");
	}

	/**
	 * v5 uses "home" for custom page and "forum" for forum pages when a
	 * custom page is set as the home page.
	 *
	 * @return {Boolean}
	 */

	static forum(){
		return this.__is_page("forum")
	}

	/**
	 * If no custom page is set as home page, then "home" will show the normal forum
	 * page (i.e board listings), but if there is a custom page set as the home page,
	 * then this usually represents the custom page being viewed.
	 *
	 * Due to the cross over with these, "home" will refer to both.
	 *
	 * @return {Boolean}
	 */

	static home(){
		return this.__is_page("home") || this.__is_page("forum");
	}

	/**
	 * Are we currently viewing the members list?
	 * @return {Boolean}
	 */

	static members(){
		return this.__is_page("members") || this.__is_page("list_members");
	}

	/**
	 * Are we currently viewing the list of messages?
	 * @return {Boolean}
	 */

	static message_list(){
		return this.__is_page("conversations") || this.__is_page("conversations_inbox") || this.__is_page("list_conversations");
	}

	/**
	 * Are we currently viewing a message?
	 * @return {Boolean}
	 */

	static message_thread(){
		return this.__is_page("conversation") || this.__is_page("list_messages");
	}

	/**
	 * Are we currently sending a message?
	 * @return {Boolean}
	 */

	static messaging(){
		return this.message_new() || this.conversation_new() || this.message_quote();
	}

	/**
	 * Are we currently replying to a conversation?
	 * @return {Boolean}
	 */

	static message_new(){
		return this.__is_page("new_message");
	}

	/**
	 * Are we currently replying to a conversation by quoting?
	 * @return {Boolean}
	 */

	static message_quote(){
		return this.__is_page("quote_messages");
	}

	/**
	 * Are we currently creating a new conversation?
	 * @return {Boolean}
	 */

	static conversation_new(){
		return this.__is_page("new_conversation") || this.__is_page("create_conversation") || this.__is_page("conversation_new_user");
	}

	/**
	 * Are we currently creating a new conversation?
	 * @return {Boolean}
	 * @ignore
	 */

	static conversation_create(){
		return this.__is_page("create_conversation");
	}

	/**
	 * Are we currently creating a new conversation (new_user_conversation)?
	 * @return {Boolean}
	 * @ignore
	 */

	static conversation_new_user(){
		return this.__is_page("new_user_conversation");
	}

	/**
	 * Are we currently trying to post/create a thread/quote a post?
	 * @return {Boolean}
	 */

	static posting(){
		return this.posting_quote() || this.posting_reply() || this.posting_thread();
	}

	/**
	 * Are we currently trying to reply with a quote?
	 * @return {Boolean}
	 */

	static posting_quote(){
		return this.__is_page("quote_posts");
	}

	/**
	 * Are we currently trying to post a reply?
	 * @return {Boolean}
	 */

	static posting_reply(){
		return this.__is_page("new_post");
	}

	/**
	 * Are we currently trying to create a thread?
	 * @return {Boolean}
	 */

	static posting_thread(){
		return this.__is_page("new_thread");
	}

	/**
	 * Are we currently trying to edit a post?
	 * @return {Boolean}
	 */

	static editing_post(){
		return this.__is_page("edit_post");
	}

	/**
	 * Are we currently trying to edit a thread?
	 * @return {Boolean}
	 */

	static editing_thread(){
		return this.__is_page("edit_thread");
	}

	/**
	 * Are we currently trying to edit a thread or post?
	 * @return {Boolean}
	 */

	static editing(){
		return this.editing_thread() || this.editing_post();
	}

	/**
	 * Are we viewing a custom page?
	 * @return {Boolean}
	 */

	static page(){
		return this.__is_page("page");
	}

	/**
	 * Are we viewing a permalink page (i.e linking to a direct post)?
	 * @return {Boolean}
	 */

	static permalink(){
		return this.__is_page("permalink");
	}

	/**
	 * Are we viewing a permalink to a post?
	 * @return {Boolean}
	 */

	static permalink_post(){
		if(this.permalink()){
			let params = pb.data("route").params;

			if(params && params.post_id){
				return true;
			}
		}

		return false;
	}

	/**
	 * Are we viewing the activity profile page?
	 * @return {Boolean}
	 */

	static profile_activity(){
		return this.__is_page("show_user_activity");
	}

	/**
	 * Are we viewing the following profile page?
	 * @return {Boolean}
	 */

	static profile_following(){
		return this.__is_page("show_user_following");
	}

	/**
	 * Are we viewing the friends profile page?
	 * @return {Boolean}
	 */

	static profile_friends(){
		return this.__is_page("show_user_friends");
	}

	/**
	 * Are we viewing the gifts profile page?
	 * @return {Boolean}
	 */

	static profile_gift(){
		return this.__is_page("show_user_gift");
	}

	/**
	 * Are we viewing the groups profile page?
	 * @return {Boolean}
	 */

	static profile_groups(){
		return this.__is_page("show_user_groups");
	}

	/**
	 * Are we viewing a main profile page?
	 * @return {Boolean}
	 */

	static profile_home(){
		return this.__is_page("user");
	}

	/**
	 * Is it a valid Profile
	 */

	static profile_exists(){
		return yootil.page.member.exists();
	}

	/**
	 * Are we editing the admin controls page for the user?
	 * @return {Boolean}
	 */

	static profile_edit_admin(){
		return this.__is_page("edit_user_admin");
	}

	/**
	 * Are we editing the user's avatar?
	 * @return {Boolean}
	 */

	static profile_edit_avatar(){
		return this.__is_page("edit_user_avatar");
	}

	/**
	 * Are we editing the user's badges?
	 * @return {Boolean}
	 */

	static profile_edit_badges(){
		return this.__is_page("edit_user_badges");
	}

	/**
	 * Are we editing the user's notifications?
	 * @return {Boolean}
	 */

	static profile_edit_notifications(){
		return this.__is_page("edit_user_notifications");
	}

	/**
	 * Are we editing the user's personal settings?
	 * @return {Boolean}
	 */

	static profile_edit_personal(){
		return this.__is_page("edit_user_personal");
	}

	/**
	 * Are we editing the user's privacy settings?
	 * @return {Boolean}
	 */

	static profile_edit_privacy(){
		return this.__is_page("edit_user_privacy");
	}

	/**
	 * Are we editing the user's general settings?
	 * @return {Boolean}
	 */

	static profile_edit_settings(){
		return this.__is_page("edit_user_settings");
	}

	/**
	 * Are we editing the user's social settings?
	 * @return {Boolean}
	 */

	static profile_edit_social(){
		return this.__is_page("edit_user_social");
	}

	/**
	 * Are we viewing the notifications profile page?
	 * @return {Boolean}
	 */

	static profile_notifications(){
		return this.__is_page("show_user_notifications") || this.__is_page("show_more_notifications");
	}

	/**
	 * Are we viewing the profile (including any of the profile tabs)
	 * @return {Boolean}
	 */

	static profile(){
		return (this.profile_activity() || this.profile_following() || this.profile_friends() || this.profile_gift() || this.profile_groups() || this.profile_home() || this.profile_notifications());
	}

	/**
	 * Are we currently viewing the recent posts page?
	 * @return {Boolean}
	 */

	static recent_posts(){
		return (this.__is_page("all_recent_posts") || this.__is_page("recent_posts"));
	}

	/**
	 * Are we currently viewing posts page by IP?
	 * @return {Boolean}
	 */

	static ip_posts(){
		return this.__is_page("posts_by_ip");
	}

	/**
	 * Are we currently viewing any posts page?
	 * @return {Boolean}
	 */

	static posts(){
		return this.recent_posts() || this.ip_threads();
	}

	/**
	 * Are we currently viewing the recent threads page?
	 * @return {Boolean}
	 */

	static recent_threads(){
		return this.__is_page("recent_threads") || this.__is_page("recent_threads_created");
	}

	/**
	 * Are we currently viewing threads by IP?
	 * @return {Boolean}
	 */

	static ip_threads(){
		return this.__is_page("threads_by_ip");
	}

	/**
	 * Are we currently viewing any threads?
	 * @return {Boolean}
	 */

	static threads(){
		return this.recent_threads() || this.ip_threads();
	}

	/**
	 * Are we currently trying to search?
	 * @return {Boolean}
	 */

	static search(){
		return this.__is_page("search");
	}

	/**
	 * Are we viewing results of a search?
	 * @return {Boolean}
	 */

	static search_results(){
		return this.__is_page("search_results");
	}

	/**
	 * Are we currently viewing a thread?
	 * @return {Boolean}
	 */

	static thread(){
		return this.__is_page("thread") || this.__is_page("list_posts") || this.permalink_post();
	}
	
}).init();