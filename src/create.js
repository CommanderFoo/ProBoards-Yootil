/**
* Namespace: yootil.create
*
* 	This object will contain useful ProBoards methods
*/

yootil.create = (function(){

	return {		

		/**
		* Method: container
		* 	Creates ProBoards v5 div containers.
		*
		* Parameters:
		* 	title - *string* The container title.
		* 	content - *string* The container content.
		* 	safe - *boolean* / *object* true or false, or pass onject to make html safe (i.e {title: false, content: true}).
		* 	title_styles - *object* key value par for css styles (i.e {color: "red", padding: "11px"}).
		* 	content_styles - *object* key value par for css styles (i.e {color: "red", padding: "11px"}).
		* 	container_styles - *object* key value par for css styles (i.e {color: "red", padding: "11px"}).
		* 	no_h2 - *boolean* If set to true, it will not wrap the title with an h2 tag.
		* 	jquery_obj - *boolean* If false, returned content will be html string.
		*
		* Returns:
		* 	*string* / *object* Depends on what jquery_obj is set too, default is jquery object.
		*
		* Examples:
		*	yootil.create.container("My Title", "My Content");
		*
		*	yootil.create.container("My Title", "My Content", {title: false, content: true});
		*/
	
		container: function(title, content, safe, title_styles, content_styles, container_styles, no_h2, jquery_obj){
			var html = "";
			var safe_title = safe_content = (typeof safe != "undefined" || safe)? true : false;

			title = (title || "");
			content = (content || "");
			
			if(typeof safe === "object"){
				if(typeof safe.title != "undefined"){
					safe_title = safe.title;
				}
				
				if(typeof safe.content != "undefined"){
					safe_content = safe.content;
				}
			}
			
			container_styles = (container_styles)? container_styles : {};
			title_styles = (title_styles)? title_styles : {};
			content_styles = (content_styles)? content_styles : {};
			
			title = (safe_title)? this.make_safe(title) : title;
			title = (typeof no_h2 != "undefined" && !no_h2)? title : ("<h2>" + title + "</h2>");
			
			content = (safe_content)? this.make_safe(content) : content;
			
			html += "<div class=\"container\">";
			html += $("<div class=\"title-bar\">" + title + "</div>").css(title_styles).wrap("<span/>").parent().html();
			html += $("<div class=\"content pad-all\">" + content + "</div>").css(content_styles).wrap("<span/>").parent().html();
			html += "</div>";
			
			if(typeof jquery_obj == "undefined" || jquery_obj){
				return $(html).css(container_styles);
			} else {
				return $(html).css(container_styles).wrap("<span/>").parent().html();
			}
		},
		
		/**
		* Function: page
		*	Quickly create a blank page that matches a certain URL.
		*
		* Parameters:
		*	locate - *string* / *object* This will get matched against the location.href value, can be a string or RegExp object.
		*	document_title - *string* Add onto the current document title.
		*	hide_content - *boolean* By default the children of #content gets hidden, you can override this
		*
		* Returns:
		*	*object* yootil.create
		*
		* Examples:
		*	yootil.create.page("shop", "Shop");
		*
		*	yootil.create.page("shop", "Shop").container("The Shop", "Welcome to the Shop").appendTo("#content");
		*/
	
		page: function(locate, document_title, hide_content){
			var reg = (locate.constructor == RegExp)? locate : new RegExp("\/" + locate, "i");
			
			if(locate && location.href.match(reg)){
				if(typeof document_title != "undefined" && document_title.length){
					document.title += " - " + document_title;
				}
				
				if(typeof hide_content == "undefined" || hide_content){
					$("#content[role=main]").children().hide();
				}
			}
			
			return yootil.create;
		},
		
/**
		* Function: nav_branch
		*	Extend the nav tree easily
		*
		* Parameters:
		*	url - *string* URL of the branch.
		*	text - *boolean* Text of the branch.
		*
		* Returns:
		*	*object* Branch jQuery wrapped
		*
		* Examples:
		*	yootil.create.nav_branch("/shop/", "Shop");
		*/
		
		nav_branch: function(url, text){
			var branch = $("#nav-tree li:last").clone();

			if(branch && branch.length){
				branch.find("a").attr("href", url).find("span").html(text);
				branch.appendTo("#nav-tree");
			}
			
			return branch;
		}
		
	};

})();