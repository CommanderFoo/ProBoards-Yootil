/**
 * @class yootil.form
 * @static
 */

yootil.form = class {

	/**
	 * New thread form.
	 *
	 * @return {Object}
	 */

	static new_thread(){
		return $("form.form_thread_new");
	}

	/**
	 * New post form.
	 *
	 * @return {Object}
	 */

	static new_post(){
		return $("form.form_post_new");
	}

	/**
	 * Edit post form.
	 *
	 * @return {Object}
	 */

	static edit_post(){
		return $("form.form_post_edit");
	}

	/**
	 * Edit thread form.
	 *
	 * @return {Object}
	 */

	static edit_thread(){
		return $("form.form_thread_edit");
	}

	/**
	 * Gets any form to do with posting but not including messages.
	 *
	 * @return {Object}
	 */

	static posting(){
		return $("form.form_thread_new, form.form_post_new, form.form_post_edit, form.form_post_quick_reply");
	}

	/**
	 * Checks for any form to do with quick replies, this includes threads and conversations.
	 *
	 * @return {Object}
	 */

	static quick_reply(){
		return $("form.form_post_quick_reply");
	}

	/**
	 * Shoutbox form.
	 *
	 * @return {Array}
	 */

	static shoutbox(){
		return $("form.form_shoutbox_shoutbox");
	}

	/**
	 * Form for creating a new conversation.
	 *
	 * @return {Object}
	 */

	static conversation(){
		return $("form.form_conversation_new");
	}

	/**
	 * Returns the form used when creating a reply to a conversation
	 *
	 * @return {Object}
	 */

	static message(){
		return $("form.form_message_new");
	}

	/**
	 * Gets any form that is to do with conversations or messaging.
	 *
	 * @return {Object}
	 */

	static messaging(){
		return $("form.form_conversation_new, form.form_message_new, form.form_post_quick_reply");
	}

	/**
	 * Returns the form used for editing profile personal info
	 *
	 * @return {Object}
	 */

	static edit_personal(){
		return $("form.form_user_edit_personal");
	}

	/**
	 * Returns the form used for editing profile social websites.
	 *
	 * @return {Object}
	 */

	static edit_social(){
		return $("form.form_user_edit_social");
	}

	/**
	 * Returns the form used for editing profile settings.
	 *
	 * @return {Object}
	 */

	static edit_settings(){
		return $("form.form_user_edit_settings");
	}

	/**
	 * Returns the form used for editing profile privacy settings.
	 *
	 * @return {Object}
	 */

	static edit_privacy(){
		return $("form.form_user_edit_privacy");
	}

	/**
	 * Returns the form used for editing profile staff settings.
	 *
	 * @return {Object}
	 */

	static edit_staff_options(){
		return $("form.form_user_edit_admin");
	}

};