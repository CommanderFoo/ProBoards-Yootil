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
		 * Removes messages.
		 *
		 *     yootil.element.remove.messages(); // Removes all messages
		 *
		 *     yootil.element.remove.messages(123); // Removes message with id 123
		 *
		 *     yootil.element.remove.messages(123, true); // Hides message with id 123
		 *
		 * @param {Number} [message_id] The message id for the message to remove.
		 * @param {Boolean} [hide] If you need to keep the messages in the DOM set this to true.
		 * @return {Array} Matched message is returned.
		 */

		messages: function(message_id, hide){
			var message = yootil.element.get.messages(message_id);

			if(message.length){
				message[(!hide)? "remove" : "hide"]();
			}

			return message;
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
		 * Removes user messages.
		 *
		 *     yootil.element.remove.user_messages(1); // Removes all messages for user id 1
		 *
		 *     yootil.element.remove.user_messages(1, true); // Hides all messages for user id 1
		 *
		 * @param {Number} user_id The user id to find messages for.
		 * @param {Boolean} [hide] If you need to keep the messages in the DOM set this to true.
		 * @return {Array} Matched messages are returned.
		 */

		user_messages: function(user_id, hide){
			var user_messages = yootil.element.get.user_messages(user_id);

			if(user_messages.length){
				user_messages[(!hide)? "remove" : "hide"]();
			}

			return user_messages;
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
		},

		/**
		 * Removes signatures from posts and messages.
		 *
		 *     yootil.element.remove.signatures(); // Removes all signatures
		 *
		 *     yootil.element.remove.signatures(1); // Removes all signatures for the user id 1
		 *
		 * @param {Number} [user_id] If specified, it will match for that user id.
		 * @param {Boolean} [hide] Pass true to keep the element in the DOM.
		 * @return {Array} Matched results are returned back.
		 */

		signatures: function(user_id, hide){
			var signatures = yootil.element.get.signatures(user_id);

			if(signatures.length){
				signatures[(!hide)? "remove" : "hide"]();

			}

			return signatures;
		},

		/**
		 * Removes last edit from posts.
		 *
		 *     yootil.element.remove.last_edit(); // Gets all last edits
		 *
		 *     yootil.element.remove.last_edit(1); // Gets all for the user id 1
		 *
		 * @param {Number} [user_id] If specified, it will match for that user id.
		 * @param {Boolean} [hide] Pass true to keep the element in the DOM.
		 * @return {Array} Matched results are returned back.
		 */

		last_edit: function(user_id, hide){
			var last_edit = yootil.element.get.last_edit(user_id);

			if(last_edit.length){
				last_edit[(!hide)? "remove" : "hide"]();

			}

			return last_edit;
		},

		/**
		 * Removes post / message info (date, likes, etc)
		 *
		 *     yootil.element.remove.post_info(); // Gets all
		 *
		 *     yootil.element.remove.post_info(1); // Gets all for the user id 1
		 *
		 * @param {Number} [user_id] If specified, it will match for that user id.
		 * @param {Boolean} [hide] Pass true to keep the element in the DOM.
		 * @return {Array} Matched results are returned back.
		 */

		post_info: function(user_id, hide){
			var info = yootil.element.get.post_info(user_id);

			if(info.length){
				info[(!hide)? "remove" : "hide"]();

			}

			return info;
		},

		/**
		 * Removes post / message controls.
		 *
		 *     yootil.element.remove.post_controls(); // Gets all
		 *
		 *     yootil.element.remove.post_controls(1); // Gets all for the user id 1
		 *
		 * @param {Number} [user_id] If specified, it will match for that user id.
		 * @param {Boolean} [hide] Pass true to keep the element in the DOM.
		 * @return {Array} Matched results are returned back.
		 */

		post_controls: function(user_id, hide){
			var controls = yootil.element.get.post_controls(user_id);

			if(controls.length){
				controls[(!hide)? "remove" : "hide"]();

			}

			return controls;
		},

		/**
		 * Removes post / message summary.
		 *
		 *     yootil.element.remove.summary();
		 *
		 * @param {Boolean} [hide] Pass true to keep the element in the DOM.
		 * @return {Array} Matches are returned back.
		 */

		summary: function(hide){
			var summary = yootil.element.get.summary();

			if(summary.length){
				summary[(!hide)? "remove" : "hide"]();
			}

			return summary;
		},

		/**
		 * Removes navigation tree.
		 *
		 *     yootil.element.remove.nav_tree();
		 *
		 * @param {Boolean} [hide] Pass true to keep the element in the DOM.
		 * @return {Array} Matches are returned back.
		 */

		nav_tree: function(hide){
			var nav = yootil.element.get.nav_tree();

			if(nav.length){
				nav[(!hide)? "remove" : "hide"]();
			}

			return nav;
		},

		/**
		 * Removes navigation tree branches.
		 *
		 *     yootil.element.remove.nav_branches();
		 *
		 * @param {Boolean} [hide] Pass true to keep the element in the DOM.
		 * @return {Array} Matches are returned back.
		 */

		nav_branches: function(hide){
			var branches = yootil.element.get.nav_branches();

			if(branches.length){
				branches[(!hide)? "remove" : "hide"]();
			}

			return branches;
		},

		/**
		 * Removes last navigation tree branch.
		 *
		 *     yootil.element.remove.last_nav_branch();
		 *
		 * @param {Boolean} [hide] Pass true to keep the element in the DOM.
		 * @return {Array} Matches are returned back.
		 */

		last_nav_branch: function(hide){
			var branch = yootil.element.get.last_nav_branch();

			if(branch.length){
				branch[(!hide)? "remove" : "hide"]();
			}

			return branch;
		},

		/**
		 * Removes branches based on options passed in.
		 *
		 *     var example1 = yootil.element.remove.nav_branch("Members", "text");
		 *
		 *     var example2 = yootil.element.remove.nav_branch(/user\/1/, "url");
		 *
		 *     var example3 = yootil.element.remove.nav_branch(/^\/(members)?$/, "url"); // Removes "Home" and "Members".
		 *
		 * @param {Mixed} pattern This can be a string, or a regular expression pattern.
		 * @param {String} [type] You can match against the url or text of the branch.  Default is text.
		 * @param {Boolean} [hide] Pass true to keep the element in the DOM.
		 * @return {Array} Matches are returned back.
		 */

		nav_branch: function(pattern, type, hide){
			var branches = yootil.element.get.nav_branch(pattern, type);

			if(branches.length){
				for(var branch in branches){
					branches[branch][(!hide)? "remove" : "hide"]();
				}
			}

			return branches;
		}

	};

})();