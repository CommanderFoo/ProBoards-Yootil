/**
 * @class yootil.element.get
 * @alias yootil.get
 * @static
 * Quick methods to get certain elements.
 */

yootil.element.get = yootil.get = (function(){

	return {

		/**
		 * Gets mini profiles.
		 *
		 *     yootil.element.get.mini_profiles(); // Gets all mini profiles
		 *
		 *     yootil.element.get.mini_profiles(1); // Gets all mini profiles for user id 1
		 *
		 * @param {Number} [user_id] If specified, it will match mini profiles for that user id.
		 * @return {Array} Matched mini profiles are returned back.
		 */

		mini_profiles: function(user_id){
			var selector = (~~ user_id)? ":has(a.user-link.user-" + (~~ user_id) + ")" : "";

			return $(".mini-profile" + selector);
		},

		/**
		 * Gets mini profile avatars.
		 *
		 *     yootil.element.get.mini_profile_avatars(); // Gets all avatars
		 *
		 *     yootil.element.get.mini_profile_avatars(1); // Gets all avatars for user id 1
		 *
		 * @param {Number} [user_id] If specified, it will match avatars for that user id.
		 * @return {Array} Matched avatars are returned back.
		 */

		mini_profile_avatars: function(user_id){
			var selector = (~~ user_id)? ":has(a.user-link.user-" + (~~ user_id) + ")" : "";

			return $(".mini-profile .avatar" + selector);;
		},

		/**
		 * Gets mini profile user links.
		 *
		 *     yootil.element.get.mini_profile_user_links(1); // Gets all user links for user id 1
		 *
		 *     yootil.element.get.mini_profile_user_links(); // Gets all user links
		 *
		 * @param {Number} [user_id] If specified, it will match user links for that user id.
		 * @return {Array} Matched user links are returned back.
		 */

		mini_profile_user_links: function(user_id){
			var selector = (~~ user_id)? (".user-" + (~~ user_id)) : "";

			return $(".mini-profile a.user-link" + selector);
		},

		/**
		 * Gets posts.
		 *
		 *     yootil.element.get.posts(); // Get all posts
		 *
		 *     yootil.element.get.posts(123); // Gets post with id 123
		 *
		 * @param {Number} [post_id] The post id for the post to get.
		 * @return {Array} Matched posts are returned.
		 */

		posts: function(post_id){
			var selector = (~~ post_id)? ("-" + (~~ post_id)) : "";

			return $("tr[id^=post" + selector + "]");
		},

		/**
		 * Gets user posts.
		 *
		 *     yootil.element.get.user_posts(1); // Gets all posts for user id 1
		 *
		 * @param {Number} [user_id] The user id to find posts for.
		 * @return {Array} Matched posts are returned.
		 */

		user_posts: function(user_id){
			if(!user_id){
				return [];
			}

			return $("tr[id^=post]:has(.mini-profile a.user-link.user-" + (~~ user_id) + ")");
		},

		/**
		 * Gets the quick reply.
		 *
		 * @return {Array}
		 */

		quick_reply: function(){
			return $(".quick-reply");
		},

		/**
		 * Gets mini profile info sections.
		 *
		 *     yootil.element.get.mini_profile_info(); // Gets all mini profile info
		 *
		 *     yootil.element.get.mini_profile_info(1); // Gets all mini profile info for the user id 1
		 *
		 * @param {Number} [user_id] If specified, it will match user links for that user id.
		 * @return {Array} Matched user links are returned back.
		 */

		mini_profile_info: function(user_id){
			var selector = (~~ user_id)? ":has(a.user-link.user-" + (~~ user_id) + ")" : "";

			return $(".mini-profile" + selector + " .info");
		},

		/**
		 * Gets signatures for posts and messages.
		 *
		 *     yootil.element.get.signatures(); // Gets all signatures
		 *
		 *     yootil.element.get.signatures(1); // Gets all signatures for the user id 1
		 *
		 * @param {Number} [user_id] If specified, it will match for that user id.
		 * @return {Array} Matched results are returned back.
		 */

		signatures: function(user_id){
			var selector = (~~ user_id)? ":has(.mini-profile a.user-link.user-" + (~~ user_id) + ")" : "";

			return $("tr[id^=post-]" + selector + " .foot .signature, tr[id^=message-]" + selector + " .foot .signature");
		},

		/**
		 * Gets last edit.
		 *
		 *     yootil.element.get.last_edit(); // Gets all last edits
		 *
		 *     yootil.element.get.last_edit(1); // Gets all for the user id 1
		 *
		 * @param {Number} [user_id] If specified, it will match for that user id.
		 * @return {Array} Matched results are returned back.
		 */

		last_edit: function(user_id){
			var selector = (~~ user_id)? ":has(.mini-profile a.user-link.user-" + (~~ user_id) + ")" : "";

			return $("tr[id^=post-]" + selector + " .foot .edited_by, tr[id^=message-]" + selector + " .foot .edited_by");
		},

		/**
		 * Gets post / message info (date, likes, etc)
		 *
		 *     yootil.element.get.post_info(); // Gets all
		 *
		 *     yootil.element.get.post_info(1); // Gets all for the user id 1
		 *
		 * @param {Number} [user_id] If specified, it will match for that user id.
		 * @return {Array} Matched results are returned back.
		 */

		post_info: function(user_id){
			var selector = (~~ user_id)? ":has(.mini-profile a.user-link.user-" + (~~ user_id) + ")" : "";

			return $("tr[id^=post-]" + selector + " .content .info, tr[id^=message-]" + selector + " .content .info");
		},

		/**
		 * Gets post / message controls.
		 *
		 *     yootil.element.get.post_controls(); // Gets all
		 *
		 *     yootil.element.get.post_controls(1); // Gets all for the user id 1
		 *
		 * @param {Number} [user_id] If specified, it will match for that user id.
		 * @return {Array} Matched results are returned back.
		 */

		post_controls: function(user_id){
			var selector = (~~ user_id)? ":has(.mini-profile a.user-link.user-" + (~~ user_id) + ")" : "";

			return $("tr[id^=post-]" + selector + " .content .controls, tr[id^=message-]" + selector + " .content .controls");
		},

		/**
		 * Gets post / message summary.
		 *
		 *     yootil.element.get.summary();
		 *
		 * @return {Array} Matches are returned back.
		 */

		summary: function(){
			return $(".messages.summary, .posts.summary");
		},

		/**
		 * Gets nav tree.
		 *
		 *     yootil.element.get.nav_tree();
		 *
		 * @return {Array} Matches are returned back.
		 */

		nav_tree: function(){
			return $("#navigation-tree");
		},

		/**
		 * Gets nav branches.
		 *
		 *     yootil.element.get.nav_branches();
		 *
		 * @return {Array} Matches are returned back.
		 */

		nav_branches: function(){
			return $("#navigation-tree #nav-tree .nav-tree-branch");
		},

		/**
		 * Gets last nav branche.
		 *
		 *     yootil.element.get.last_nav_branch();
		 *
		 * @return {Array} Matches are returned back.
		 */

		last_nav_branch: function(){
			return $("#navigation-tree #nav-tree .nav-tree-branch:last");
		},

		/**
		 * Gets a branch based on options passed in.
		 *
		 *     var example1 = yootil.element.get.nav_branch("Members", "text");
		 *
		 *     var example2 = yootil.element.get.nav_branch(/user\/1/, "url");
		 *
		 * @param {Mixed} pattern This can be a string, or a regular expression pattern.
		 * @param {String} [type] You can match against the url or text of the branch.  Default is text.
		 * @return {Array} Matches are returned back.
		 */

		nav_branch: function(pattern, type){
			if(!pattern){
				return [];
			}

			type = type || "text";

			var matched = [];

			$("#navigation-tree #nav-tree .nav-tree-branch a").each(function(){
				var match_against = (type == "url")? $(this).attr("href") : $(this).text();

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

})();