/**
 * Quick methods to get certain elements.
 */

yootil.get = class {

	/**
	 * Gets mini profiles.
	 *
	 * @example
	 * yootil.get.mini_profiles(); // Gets all mini profiles
	 *
	 * @example
	 * yootil.get.mini_profiles(1); // Gets all mini profiles for user id 1
	 *
	 * @param {Number} [user_id=0] - If specified, it will match mini profiles for that user id.
	 * @return {Array} - Matched mini profiles are returned back.
	 */

	static mini_profiles(user_id = 0){
		let id = parseInt(user_id, 10);
		let selector = (id)? ":has(a.user-link.user-" + (id) + ")" : "";

		return $(".item .mini-profile" + selector);
	}

	/**
	 * Gets mini profile avatars.
	 *
	 * @example
	 * yootil.get.mini_profile_avatars(); // Gets all avatars
	 *
	 * @example
	 * yootil.get.mini_profile_avatars(1); // Gets all avatars for user id 1
	 *
	 * @param {Number} [user_id=0] - If specified, it will match avatars for that user id.
	 * @return {Array} - Matched avatars are returned back.
	 */

	static mini_profile_avatars(user_id = 0){
		let id = parseInt(user_id, 10);
		let selector = (id)? ":has(a.user-link.user-" + (id) + ")" : "";

		return $(".item .mini-profile .avatar" + selector);
	}

	/**
	 * Gets mini profile user links.
	 *
	 * @example
	 * yootil.get.mini_profile_user_links(1); // Gets all user links for user id 1
	 *
	 * @example
	 * yootil.get.mini_profile_user_links(); // Gets all user links
	 *
	 * @param {Number} [user_id=0] - If specified, it will match user links for that user id.
	 * @return {Array} - Matched user links are returned back.
	 */

	static mini_profile_user_links(user_id = 0){
		let id = parseInt(user_id, 10);
		let selector = (id)? (".user-" + (id)) : "";

		return $(".item .mini-profile a.user-link" + selector);
	}

	/**
	 * Gets posts.
	 *
	 * @example
	 * yootil.get.posts(); // Get all posts
	 *
	 * @example
	 * yootil.get.posts(123); // Gets post with id 123
	 *
	 * @param {Number} [post_id=0] - The post id for the post to get.
	 * @return {Array} - Matched posts are returned.
	 */

	static posts(post_id = 0){
		let id = parseInt(post_id, 10);
		let selector = (id)? ("-" + id) : "";

		return $("tr.item[id^=post" + selector + "]");
	}

	/**
	 * Gets messages.
	 *
	 * @example
	 * yootil.get.messages(); // Get all messages
	 *
	 * @example
	 * yootil.get.messages(123); // Gets post with id 123
	 *
	 * @param {Number} [message_id=0] - The message id for the message to get.
	 * @return {Array} - Matched messages are returned.
	 */

	static messages(message_id = 0){
		let id = parseInt(message_id, 10);
		let selector = (id)? ("-" + id) : "";

		return $("tr.item[id^=message" + selector + "]");
	}

	/**
	 * Gets user posts.
	 *
	 * @example
	 * yootil.get.user_posts(1); // Gets all posts for user id 1
	 *
	 * @param {Number} [user_id=0] - The user id to find posts for.
	 * @return {Array} - Matched posts are returned.
	 */

	static user_posts(user_id = 0){
		let id = parseInt(user_id, 10);

		if(!id){
			return [];
		}

		return $("tr.item[id^=post]:has(.mini-profile a.user-link.user-" + id + ")");
	}

	/**
	 * Gets user messages.
	 *
	 * @example
	 * yootil.get.user_messages(1); // Gets all messages for user id 1
	 *
	 * @param {Number} [user_id=0] - The user id to find messages for.
	 * @return {Array} - Matched messages are returned.
	 */

	static user_messages(user_id = 0){
		let id = parseInt(user_id, 10);

		if(!id){
			return [];
		}

		return $("tr.item[id^=message]:has(.mini-profile a.user-link.user-" + id + ")");
	}

	/**
	 * Gets the quick reply.
	 *
	 * @return {Array}
	 */

	static quick_reply(){
		return $(".quick-reply");
	}

	/**
	 * Gets mini profile info sections.
	 *
	 * @example
	 * yootil.get.mini_profile_info(); // Gets all mini profile info
	 *
	 * @example
	 * yootil.get.mini_profile_info(1); // Gets all mini profile info for the user id 1
	 *
	 * @param {Number} [user_id=0] - If specified, it will match user links for that user id.
	 * @return {Array} - Matched user links are returned back.
	 */

	static mini_profile_info(user_id = 0){
		let id = parseInt(user_id, 10);
		let selector = (id)? ":has(a.user-link.user-" + id + ")" : "";

		return $(".item .mini-profile" + selector + " .info");
	}

	/**
	 * Gets signatures for posts and messages.
	 *
	 * @example
	 * yootil.get.signatures(); // Gets all signatures
	 *
	 * @example
	 * yootil.get.signatures(1); // Gets all signatures for the user id 1
	 *
	 * @param {Number} [user_id=0] - If specified, it will match for that user id.
	 * @return {Array} - Matched results are returned back.
	 */

	static signatures(user_id = 0){
		let id = parseInt(user_id, 10);
		let selector = (id)? ":has(.mini-profile a.user-link.user-" + id + ")" : "";

		return $("tr.item[id^=post-]" + selector + " .foot .signature, tr[id^=message-]" + selector + " .foot .signature");
	}

	/**
	 * Gets last edit.
	 *
	 * @example
	 * yootil.get.last_edit(); // Gets all last edits
	 *
	 * @example
	 * yootil.get.last_edit(1); // Gets all for the user id 1
	 *
	 * @param {Number} [user_id=0] - If specified, it will match for that user id.
	 * @return {Array} - Matched results are returned back.
	 */

	static last_edit(user_id = 0){
		let id = parseInt(user_id, 10);
		let selector = (id)? ":has(.mini-profile a.user-link.user-" + id + ")" : "";

		return $("tr.item[id^=post-]" + selector + " .foot .edited_by, tr[id^=message-]" + selector + " .foot .edited_by");
	}

	/**
	 * Gets post / message info (date, likes, etc)
	 *
	 * @example
	 * yootil.get.post_info(); // Gets all
	 *
	 * @example
	 * yootil.get.post_info(1); // Gets all for the user id 1
	 *
	 * @param {Number} [user_id=0] - If specified, it will match for that user id.
	 * @return {Array} - Matched results are returned back.
	 */

	static post_info(user_id = 0){
		let id = parseInt(user_id, 10);
		let selector = (id)? ":has(.mini-profile a.user-link.user-" + id + ")" : "";

		return $("tr.item[id^=post-]" + selector + " .content .info, tr[id^=message-]" + selector + " .content .info");
	}

	/**
	 * Gets post / message controls.
	 *
	 * @example
	 * yootil.get.post_controls(); // Gets all
	 *
	 * @example
	 * yootil.get.post_controls(1); // Gets all for the user id 1
	 *
	 * @param {Number} [user_id=0] - If specified, it will match for that user id.
	 * @return {Array} - Matched results are returned back.
	 */

	static post_controls(user_id = 0){
		let id = parseInt(user_id, 10);
		let selector = (id)? ":has(.mini-profile a.user-link.user-" + id + ")" : "";

		return $("tr.item[id^=post-]" + selector + " .controls, tr[id^=message-]" + selector + " .controls");
	}

	/**
	 * Gets post / message summary.
	 *
	 * @example
	 * yootil.get.summary();
	 *
	 * @return {Array} - Matches are returned back.
	 */

	static summary(){
		return $(".messages.summary, .posts.summary");
	}

	/**
	 * Gets nav tree.
	 *
	 * @example
	 * yootil.get.nav_tree();
	 *
	 * @return {Array} - Matches are returned back.
	 */

	static nav_tree(){
		return $("#navigation-tree").find("#nav-tree");
	}

	/**
	 * Gets nav branches.
	 *
	 * @example
	 * yootil.get.nav_branches();
	 *
	 * @return {Array} - Matches are returned back.
	 */

	static nav_branches(){
		return this.nav_tree().find(".nav-tree-branch");
	}

	/**
	 * Gets last nav branch.
	 *
	 * @example
	 * yootil.get.last_nav_branch();
	 *
	 * @return {Array} - Matches are returned back.
	 */

	static last_nav_branch(){
		return this.nav_tree().find(".nav-tree-branch:last");
	}

	/**
	 * Gets a branch based on options passed in.
	 *
	 * @example
	 * let example1 = yootil.get.nav_branch("Members", "text");
	 *
	 * @example
	 * let example2 = yootil.get.nav_branch(/user\/1/, "url");
	 *
	 * @param {String|Object} pattern=null - This can be a string, or a regular expression pattern.
	 * @param {String} [type="text"] - You can match against the url or text of the branch.  Default is text.
	 * @return {Array} - Matches are returned back.
	 */

	static nav_branch(pattern = null, type = "text"){
		if(!pattern){
			return [];
		}

		let matched = [];

		$("#navigation-tree").find(".nav-tree-branch a").each(function(){
			let match_against = (type == "url")? $(this).attr("href") : $(this).text();

			if(pattern.constructor == RegExp){
				if(pattern.test(match_against)){
					matched.push($(this).parent().parent());
				}
			} else if(typeof pattern == "string"){
				if(match_against.indexOf(pattern) != -1){
					matched.push($(this).parent().parent());
				}
			}

		});

		return matched;
	}

};