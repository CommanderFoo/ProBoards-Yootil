/**
* Namespace: yootil.sound
*	Allows us to play a sound (doesn't use HTML 5 Audio)
*
*
* 	Didn't want to use a 3rd party library, they are too big for something that won't 
*	get used that often by plugins.
*
*
* 	Ideally we would use HTML 5 Audio, however there is a cross domain policy.
* 	We can set access on the audio files, specifically Access-Control-Allow-Origin.
* 	See http://www.w3.org/TR/cors/#access-control-allow-origin-response-hea
* 	for more information about Access-Control.
*
*
* 	But if other people use it, they would be forced to have a host that allowed
* 	them to set the origin (htaccess).  Too much trouble for now.
*/

yootil.sound = (function(){

	return {

		/**
		* Property: audio_obj
		*	Holds a reference to a jquery wrapped element for the sound
		*/
		
		audio_obj: null,
		
		/**
		* Method: play
		* 	This will create the correct element for the right browser and play the sound.
		*
		* Parameters:
		*	src - *string* The URL of the sound to play, usually MP3
		*
		* Examples:
		*	yootil.sound.play("http://pixeldepth.net/proboards/trophies/sounds/trophy.mp3");
		*/
		
		play: function(src){	
						
			// IE will play a double sound, so need to add bgsound element to the body
			// first, then set the src.
			// Chrome doesn't seem to like seting the src later, so we just remove and append
			
			if($.browser.msie){
				if(!this.audio_obj){
				
					// There are issues with IE and embed, so we use bgsound instead
					
					this.audio_obj = $("<bgsound src=\"#\" autostart=\"true\" loop=\"1\" width=\"1\" height=\"1\" id=\"yootil_sound_player\">").appendTo($("body"));
				}
				
				this.audio_obj.attr("src", src);
			} else {
				if(this.audio_obj){
					this.audio_obj.remove();
				}
			
				this.audio_obj = $("<embed src=\"" + src + "\" autostart=\"true\" width=\"1\" loop=\"1\" height=\"1\" id=\"yootil_sound_player\">").appendTo($("body"));
			}		
			
		}
			
	};
	
})();