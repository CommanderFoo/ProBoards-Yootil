/**
 * @class yootil.sound
 * @static
 * @deprecated
 *
 * Allows us to play a sound (uses HTML 5 Audio).
 *
 * Set access on the audio files, specifically Access-Control-Allow-Origin.
 *
 * See "<a href="http://www.w3.org/TR/cors/#access-control-allow-origin-response-hea">Access Control Allow Origin - Response Header</a>" for more information about Access-Control.
 */

yootil.sound = (function(){

	return {

		audio_obj: null,

		/**
		 * Plays a sound.
		 *
		 * Browsers in force the origin policy, so make sure you allow access to the sounds.
		 *
		 * @param {String} sound The URL to the sound file.
		 */

		play: function(sound){
			if(!this.audio_obj){
				this.create_audio_obj();
			}

			if(sound){
				this.audio_obj.attr("src", sound);
				this.audio_obj.get(0).play();
			}
		},

		create_audio_obj: function(){
			this.audio_obj = $("<audio id='yootil_sound_player' style='display: none'></audio>");
			this.audio_obj.appendTo($("body"));
		}

	};

})();