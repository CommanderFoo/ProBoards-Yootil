/**
* Namespace: yootil.bar
*   Mimics the ProBoards Network bar, but on the left and for plugins.
*/

yootil.bar = (function(){

	var bar = {
		
		_bar: null,
		
		has_bar: function(){
			if(this._bar){
				return true;
			}
			
			var the_bar = $("#yootil-bar-wrapper");
			
			if(the_bar.length == 1){
				this._bar = the_bar;
				return true;
			}
			
			return false;
		},
		
		/**
		* Method: add
		*	Use this to add an item to the Yootil Bar
		*
		* Parameters:
		*	link - *string* URL for the item
		*	img - *string* URL for the image
		*	alt - *string* Alt / title for the image
		*/
		
		add: function(link, img, alt){
			if(this.has_bar()){
				if(link && img){
					var alt = alt || "";
					var item = $("<a href='" + link + "' style='margin-top: 3px; display: inline-block;'><img src='" + img + "' style='padding: 0px 3px;' alt='" + alt + "' title='" + alt + "' /></a>");
					
					this._bar.find("#yootil-bar").append(item);
					this.show_bar();
				}
			}
		},
		
		show_bar: function(){
			if(this._bar.find("#yootil-bar a").length > 0){
				var display = yootil.storage.get("yootil_bar", false);
				
				if(display == "1" || display.length == 0){
					this._bar.find("#yootil-bar").css("display", "inline-block");
				} else {
					this._bar.find("> img").attr("src", "/images/button_collapse.png").attr("alt", ">");
					this._bar.find("#yootil-bar").css("display", "none");
				}
				
				this._bar.css("display", "");
			}
		}
	
	};
		
	$(function(){
		if(!yootil.user.logged_in()){
			return;
		}
		
		var pb_bar = $("div#pbn-bar-wrapper");
		
		if(pb_bar.length == 1){
			var plugin_bar = pb_bar.clone();

			plugin_bar.attr("id", "yootil-bar-wrapper");
			plugin_bar.css({
			
				right: "inherit",
				left: "0px",
				display: "none"
				
			});
			
			plugin_bar.find("img:first").css("float", "left").attr("src", "/images/button_expand.png").attr("alt", "<");
			
			plugin_bar.find("div#pbn-bar").css({
			
				width: "",
				"float": "left",
				"border-width": "1px 1px 0px 0px"
				
			}).attr("id", "yootil-bar").html("");
			
			plugin_bar.find("> img").click(function(){
				var yootil_bar = $("#yootil-bar");
				
				yootil_bar.toggle();
				
				if(yootil_bar.is(":visible")){
					yootil_bar.css("display", "inline-block");
					$(this).attr("src", "/images/button_expand.png").attr("alt", "<");
				} else {
					$(this).attr("src", "/images/button_collapse.png").attr("alt", ">");
				}
				
				yootil.storage.set("yootil_bar", ((yootil_bar.is(":visible"))? 1 : 0), false, true);
			});
			
			$("body").append(plugin_bar);
		}
		
	});
	
    return bar;
    
})();