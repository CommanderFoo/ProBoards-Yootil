/**
* Namespace: yootil.form
*	Easy access to forms for many of the forms on the forum.
*
*	Each method will return either the form or an empty array.  This keeps
* 	things consistent with how jQuery works when a selector doesn't find anything.
*/

yootil.form = (function(){

	return {

		/**
		* Method: post_form
		*	Checks for any form to do with posting on the post page.
		*
		* Returns:
		*	*array* / *jQuery*
		*/
		
		post_form: function(){
			if(yootil.location.check.posting_thread()){
				return $("form.form_thread_new");
			}
			
			return $("form.form_post_new");
		},

		/**
		* Method: quick_reply_form
		*	Checks for any form to do with quick replies, this includes threads and conversations
		*
		* Returns:
		*	*array* / *jQuery*
		*/
				
		quick_reply_form: function(){
			return $("form.form_post_quick_reply");
		},
		
		/**
		* Method: post_quick_reply_form
		*	Just for the quick reply on threads.
		*
		* Returns:
		*	*array* / *jQuery*
		*/
		
		post_quick_reply_form: function(){
			if(yootil.location.check.thread()){
				return this.quick_reply_form();
			}
			
			return [];
		},
	
		/**
		* Method: shoutbox_form
		*	Shoutbox form
		*
		* Returns:
		*	*array* / *jQuery*
		*/
		
		shoutbox_form: function(){
			return $("form.form_shoutbox_shoutbox");
		},

		/**
		* Method: conversation_form
		*	There are 2 forms for this, so we check if we are replying, if not
		*	we return the conversation new form.
		*
		* Returns:
		*	*array* / *jQuery*
		*/
				
		conversation_form: function(){
			if(yootil.location.check.message_new()){
				return this.message_form();
			}
				
			return this.conversation_new_form();
		},

		/**
		* Method: conversation_new_form
		*	Returns the form used when creating a new conversation.
		*
		* Returns:
		*	*array* / *jQuery*
		*/
		
		conversation_new_form: function(){
			return $("form.form_conversation_new");
		},
		
		/**
		* Method: message_form
		*	Returns the form used when creating a reply to a conversation
		*
		* Returns:
		*	*array* / *jQuery*
		*/
				
		message_form: function(){
			return $("form.form_message_new");
		}
	
	};

})();