/**
 * @class yootil.form
 * @static
 * Easy access to forms for many of the forms on the forum.
 *
 * Each method will return either the form or an empty array.  This keeps
 * things consistent with how jQuery works when a selector doesn't find anything.
 */

yootil.form = (function(){

	return {

		/**
		* Checks for a form to do with posting on the post page.
		*
		* @return {Array}
		*/
		
		post_form: function(){
			if(yootil.location.check.posting_thread()){
				return $("form.form_thread_new");
			}
			
			return $("form.form_post_new");
		},

		/**
		 * Checks for a form to do with edit on the post page.
		 *
		 * @return {Array}
		 */
		
		edit_post_form: function(){
			if(yootil.location.check.editing_post()){
				return $("form.form_post_edit");
			}
			
			return [];
		},

		/**
		 * Checks for edit thread form.
		 *
		 * @return {Array}
		 */
		
		edit_thread_form: function(){
			if(yootil.location.check.editing_thread()){
				return $("form.form_thread_edit");
			}
			
			return [];
		},

		/**
		 * Checks for any form to do with quick replies, this includes threads and conversations.
		 *
		 * @return {Array}
		 */
				
		quick_reply_form: function(){
			return $("form.form_post_quick_reply");
		},

		/**
		 * Just for the quick reply on threads.
		 *
		 * @return {Array}
		 */
		
		post_quick_reply_form: function(){
			if(yootil.location.check.thread()){
				return this.quick_reply_form();
			}
			
			return [];
		},

		/**
		 * Shoutbox form.
		 *
		 * @return {Array}
		 */
		
		shoutbox_form: function(){
			return $("form.form_shoutbox_shoutbox");
		},

		/**
		 * There are 2 forms for this, so we check if we are replying, if not
		 * we return the conversation new form.
		 *
		 * @return {Array}
		 */
				
		conversation_form: function(){
			if(yootil.location.check.message_new()){
				return this.message_form();
			}
				
			return this.conversation_new_form();
		},

		/**
		 * Returns the form used when creating a new conversation.
		 *
		 * @return {Array}
		 */
		
		conversation_new_form: function(){
			return $("form.form_conversation_new");
		},

		/**
		 * Returns the form used when creating a reply to a conversation
		 *
		 * @return {Array}
		 */
				
		message_form: function(){
			return $("form.form_message_new");
		},

		/**
		 * Returns the form used for editing profile personal info
		 *
		 * @return {Array}
		 */

		edit_personal_form: function(){
			return $("form.form_user_edit_personal");
		},

		/**
		 * Returns the form used for editing profile social websites.
		 *
		 * @return {Array}
		 */

		edit_social_form: function(){
			return $("form.form_user_edit_social");
		},

		/**
		 * Returns the form used for editing profile settings.
		 *
		 * @return {Array}
		 */

		edit_settings_form: function(){
			return $("form.form_user_edit_settings");
		},

		/**
		 * Returns the form used for editing profile privacy settings.
		 *
		 * @return {Array}
		 */

		edit_privacy_form: function(){
			return $("form.form_user_edit_privacy");
		},

		/**
		 * Returns the form used for editing profile staff settings.
		 *
		 * @return {Array}
		 */

		edit_staff_options_form: function(){
			return $("form.form_user_edit_admin");
		}
	
	};

})();