/**
* Namespace: yootil.user.action
*   Used to find out what actions a user has recently performed, in terms of the website usage.
*/

yootil.user.action = (function(){

    return {

        /**
        * Method: created_thread
        *   Did the user just create a new thread?
        *
        * Returns:
        *   *boolean*
        */

        created_thread: function(){

        },

        /**
        * Method: posted
        *   Did the user just post a new thread or reply?
        *
        * Returns:
        *   *boolean*
        */
        
        posted: function(){
            // It is inclusive enough that they either created a thread or replied to one, to define posting
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

        },

        /**
        * Method: sent_pm
        *   Did the user just send a pm?
        *
        * Returns:
        *   *boolean*
        */

        sent_pm: function(){

        }
            
    };
})();