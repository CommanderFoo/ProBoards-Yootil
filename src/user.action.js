/**
* Namespace: yootil.user.action
*   Used to find out what actions a user has recently performed, in terms of the website usage.
*/

yootil.user.action = (function(){
    var actionKey = "yootil.user.action.lastAction";
    var current_action = "";

    $(function(){
        // Helper to shorten code
        var markEvent = function(id){
            return function(){
                yootil.storage.set(actionKey, id);
            };
        };

        // Pull our current action and then clear it
        current_action = yootil.storage.get(actionKey);
        yootil.storage.set(actionKey, "");

        // There is only one case where a form submits without being validated client-side...
        if(yootil.location.check.conversation_new() && current_action == "created_conversation"){
            current_action = "";
        }

        // Onload, add our event handlers
        $(".form_thread_new").submit(markEvent("created_thread"));
        $(".form_post_new").submit(markEvent("replied")); // Gets quote also
        $(".form_conversation_new").submit(markEvent("created_conversation"));
        $(".form_message_new").submit(markEvent("sent_message"));

        // So, the quick reply is a little janky.
        if(yootil.location.check.message_thread()){
            $(".form_post_quick_reply").submit(markEvent("sent_message"));
        } else if(yootil.location.check.thread()){
            $(".form_post_quick_reply").submit(markEvent("replied"));
        }
    });

    /*
        TODO:
        - edited_post
        - deleted_post/message
        - added_poll
        - added_event
        - sent_message_quick_reply
        - replied_quick_reply
    */

    return {

        /**
        * Method: created_conversation
        *   Did the user just create a new conversation?
        *
        * Returns:
        *   *boolean*
        */

        created_conversation: function(){
            return current_action == "created_conversation";
        },

        /**
        * Method: created_thread
        *   Did the user just create a new thread?
        *
        * Returns:
        *   *boolean*
        */

        created_thread: function(){
            return current_action == "created_thread";
        },

        /**
        * Method: pmed
        *   Did the user just create a new conversation or send a message?
        *
        * Returns:
        *   *boolean*
        */
        
        pmed: function(){
            return this.created_conversation() || this.sent_message();
        },

        /**
        * Method: posted
        *   Did the user just post a new thread or reply?
        *
        * Returns:
        *   *boolean*
        */
        
        posted: function(){
            return this.created_thread() || this.replied();
        },

        /**
        * Method: replied
        *   Did the user just reply to a thread?
        *
        * Returns:
        *   *boolean*
        */

        replied: function(){
            return current_action == "replied";
        },

        /**
        * Method: sent_message
        *   Did the user just send a message/pm?
        *
        * Returns:
        *   *boolean*
        */

        sent_message: function(){
            return current_action == "sent_message";
        }
            
    };
})();