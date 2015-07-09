/**
 * @class yootil.element.remove
 * @alias yootil.remove
 * @static
 * Easy remove and hide elements.
 */

yootil.element.remove = yootil.remove = (function(){

	return {

		/**
		 * Removes mini profiles.
		 *
		 *     yootil.element.remove.mini_profiles(); // Removes all mini profiles
		 *
		 *     yootil.element.remove.mini_profiles(1); // Removes all mini profiles for user id 1
		 *
		 *     yootil.element.remove.mini_profiles(null, true); // hides all mini profiles
		 *
		 * @param {Number} [user_id] If specified, it will match mini profiles for that user id.
		 * @param {Boolean} [hide] If you need to keep the mini profile in the DOM set this to true.
		 * @return {Array} Matched mini profiles are returned back.
		 */

		mini_profiles: function(user_id, hide){
			var mini_profile = yootil.element.get.mini_profiles(user_id);

			if(mini_profile.length){
				mini_profile[(!hide)? "remove" : "hide"]();
			}

			return mini_profile;
		},

		/**
		 * Removes mini profile avatars.
		 *
		 *     yootil.element.remove.mini_profile_avatars(); // Removes all avatars
		 *
		 *     yootil.element.remove.mini_profile_avatars(1); // Removes all avatars for user id 1
		 *
		 *     yootil.element.remove.mini_profile_avatars(null, true); // Hides all avatars
		 *
		 * @param {Number} [user_id] If specified, it will match avatars for that user id.
		 * @param {Boolean} [hide] If you need to keep the avatar in the DOM set this to true.
		 * @return {Array} Matched avatars are returned back.
		 */

		mini_profile_avatars: function(user_id, hide){
			var avatar = yootil.element.get.mini_profile_avatars(user_id);

			if(avatar.length){
				avatar[(!hide)? "remove" : "hide"]();
			}

			return avatar;
		},

		/**
		 * Removes mini profile user links.
		 *
		 *     yootil.element.remove.mini_profile_user_links(1); // Removes all user links for user id 1
		 *
		 *     yootil.element.remove.mini_profile_user_links(); // Removes all user links
		 *
		 *     yootil.element.remove.mini_profile_user_links(null, false, true); // Removes all user links including first br element
		 *
		 * @param {Number} [user_id] If specified, it will match user links for that user id.
		 * @param {Boolean} [hide] If you need to keep the user link in the DOM set this to true.
		 * @param {Boolean} [remove_br] Each mini profile has a br element after the name, set to true to remove it.
		 * @return {Array} Matched user links are returned back.
		 */

		mini_profile_user_links: function(user_id, hide, remove_br){
			var link = yootil.element.get.mini_profile_user_links(user_id);
			var br = (remove_br)? link.parent().find("br:first") : null;

			if(link.length){
				link[(!hide)? "remove" : "hide"]();

				if(br){
					br[(!hide)? "remove" : "hide"]();
				}
			}

			return link;
		},

		/**
		 * Removes posts.
		 *
		 *     yootil.element.remove.posts(); // Removes all posts
		 *
		 *     yootil.element.remove.posts(123); // Removes post with id 123
		 *
		 *     yootil.element.remove.posts(123, true); // Hides post with id 123
		 *
		 * @param {Number} [post_id] The post id for the post to remove.
		 * @param {Boolean} [hide] If you need to keep the post in the DOM set this to true.
		 * @return {Array} Matched posts are returned.
		 */

		posts: function(post_id, hide){
			var post = yootil.element.get.posts(post_id);

			if(post.length){
				post[(!hide)? "remove" : "hide"]();
			}

			return post;
		},

		/**
		 * Removes user posts.
		 *
		 *     yootil.element.remove.user_posts(1); // Removes all posts for user id 1
		 *
		 *     yootil.element.remove.user_posts(1, true); // Hides all posts for user id 1
		 *
		 * @param {Number} user_id The user id to find posts for.
		 * @param {Boolean} [hide] If you need to keep the post in the DOM set this to true.
		 * @return {Array} Matched posts are returned.
		 */

		user_posts: function(user_id, hide){
			var user_post = yootil.element.get.user_posts(user_id);

			if(user_post.length){
				user_post[(!hide)? "remove" : "hide"]();
			}

			return user_post;
		},

		/**
		 * Removes the quick reply.
		 *
		 * @param {Boolean} [hide] Set to true if you want to keep it in the DOM.
		 * @return {Array}
		 */

		quick_reply: function(hide){
			var quick_reply = yootil.element.get.quick_reply();

			if(quick_reply.length){
				quick_reply[(!hide)? "remove" : "hide"]();
			}

			return quick_reply;
		},

		/**
		 * Removes mini profile info section.
		 *
		 *     yootil.element.remove.mini_profile_info(); // Removes all mini profile info
		 *
		 *     yootil.element.remove.mini_profile_info(1); // Removes all mini profile info for the user id 1
		 *
		 *     yootil.element.remove.mini_profile_info(1, true); // Hides all mini profile info for user id 1
		 *
		 * @param {Number} [user_id] If specified, it will match user links for that user id.
		 * @param {Boolean} [hide] If you need to keep the user link in the DOM set this to true.
		 * @param {Boolean} [remove_br] Each mini profile has a br element after the name, set to true to remove it.
		 * @return {Array} Matched user links are returned back.
		 */

		mini_profile_info: function(user_id, hide){
			var info = yootil.element.get.mini_profile_info(user_id);

			if(info.length){
				info[(!hide)? "remove" : "hide"]();

			}

			return info;
		}

	};

})();