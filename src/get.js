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
		 * Gets signatures.
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
		}

	};

})();