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
		
		post: function(){
			if(yootil.location.posting_thread()){
				return $("form.form_thread_new");
			}
			
			return $("form.form_post_new");
		},

		/**
		 * Checks for a form to do with edit on the post page.
		 *
		 * @return {Array}
		 */
		
		edit_post: function(){
			if(yootil.location.editing_post()){
				return $("form.form_post_edit");
			}
			
			return [];
		},

		/**
		 * Checks for edit thread form.
		 *
		 * @return {Array}
		 */
		
		edit_thread: function(){
			if(yootil.location.editing_thread()){
				return $("form.form_thread_edit");
			}
			
			return [];
		},

		/**
		 * Checks for any form to do with quick replies, this includes threads and conversations.
		 *
		 * @return {Array}
		 */
				
		quick_reply: function(){
			return $("form.form_post_quick_reply");
		},

		/**
		 * Just for the quick reply on threads.
		 *
		 * @return {Array}
		 */
		
		post_quick_reply: function(){
			if(yootil.location.thread()){
				return this.quick_reply();
			}
			
			return [];
		},

		/**
		 * Just for the quick reply for messages.
		 *
		 * @return {Array}
		 */

		message_quick_reply: function(){
			if(yootil.location.message_thread()){
				return this.quick_reply();
			}

			return [];
		},

		/**
		 * Shoutbox form.
		 *
		 * @return {Array}
		 */
		
		shoutbox: function(){
			return $("form.form_shoutbox_shoutbox");
		},

		/**
		 * There are 2 forms for this, so we check if we are replying, if not
		 * we return the conversation new form.
		 *
		 * @return {Array}
		 */
				
		conversation: function(){
			if(yootil.location.message_new()){
				return this.message();
			}
				
			return this.conversation_new();
		},

		/**
		 * Returns the form used when creating a new conversation.
		 *
		 * @return {Array}
		 */
		
		conversation_new: function(){
			return $("form.form_conversation_new");
		},

		/**
		 * Returns the form used when creating a reply to a conversation
		 *
		 * @return {Array}
		 */
				
		message: function(){
			return $("form.form_message_new");
		},

		/**
		 * Returns the form used for editing profile personal info
		 *
		 * @return {Array}
		 */

		edit_personal: function(){
			return $("form.form_user_edit_personal");
		},

		/**
		 * Returns the form used for editing profile social websites.
		 *
		 * @return {Array}
		 */

		edit_social: function(){
			return $("form.form_user_edit_social");
		},

		/**
		 * Returns the form used for editing profile settings.
		 *
		 * @return {Array}
		 */

		edit_settings: function(){
			return $("form.form_user_edit_settings");
		},

		/**
		 * Returns the form used for editing profile privacy settings.
		 *
		 * @return {Array}
		 */

		edit_privacy: function(){
			return $("form.form_user_edit_privacy");
		},

		/**
		 * Returns the form used for editing profile staff settings.
		 *
		 * @return {Array}
		 */

		edit_staff_options: function(){
			return $("form.form_user_edit_admin");
		},

		/**
		 * Gets any form that is to do with conversations or messaging.
		 *
		 * @return {Array}
		 */

		any_messaging: function(){
			var the_form = [];

			if(this.conversation().length){
				the_form = this.conversation();
			} else if(this.conversation_new().length){
				the_form = this.conversation_new();
			} else if(this.message().length){
				the_form = this.message();
			} else if(this.message_quick_reply().length){
				the_form = this.message_quick_reply();
			}

			return the_form;
		},

		/**
		 * Gets any form to do with posting but not including messages.
		 *
		 * @return {Array}
		 */

		any_posting: function(){
			var the_form = [];

			if(this.post().length){
				the_form = this.post();
			} else if(this.edit_post().length){
				the_form = this.edit_post();
			} else if(this.post_quick_reply().length){
				the_form = this.post_quick_reply();
			} else if(this.edit_thread().length){
				the_form = this.edit_thread();
			}

			return the_form;
		},

		// These are all aliases now and deprecated.

		/**
		 * @inheritdoc #post
		 * @deprecated
		 */

		post_form: function(){
			return this.post();
		},

		/**
		 * @inheritdoc #edit_post
		 * @deprecated
		 */

		edit_post_form: function(){
			return this.edit_post();
		},

		/**
		 * @inheritdoc #edit_thread
		 * @deprecated
		 */

		edit_thread_form: function(){
			return this.edit_thread();
		},

		/**
		 * @inheritdoc #quick_reply
		 * @deprecated
		 */

		quick_reply_form: function(){
			return this.quick_reply();
		},

		/**
		 * @inheritdoc #post_quick_reply
		 * @deprecated
		 */

		post_quick_reply_form: function(){
			return this.post_quick_reply();
		},

		/**
		 * @inheritdoc #shoutbox
		 * @deprecated
		 */

		shoutbox_form: function(){
			return this.shoutbox();
		},

		/**
		 * @inheritdoc #conversation
		 * @deprecated
		 */

		conversation_form: function(){
			return this.conversation();
		},

		/**
		 * @inheritdoc #conversation_new
		 * @deprecated
		 */

		conversation_new_form: function(){
			return this.conversation_new();
		},

		/**
		 * @inheritdoc #message
		 * @deprecated
		 */

		message_form: function(){
			return this.message();
		}

		// End aliases
	
	};

})();