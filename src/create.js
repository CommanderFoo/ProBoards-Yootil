/**
 * @class yootil.create
 * @static
 * Contains useful methods to creating things quickly (i.e containers).
 */

yootil.create = (function(){

	return {

		/**
		 * Creates ProBoards div containers.
		 *
		 * Very basic example:
		 *
		 *     var container = yootil.create.container("My Title", "My Content");
		 *
		 *     $("#content").prepend(container);
		 *
		 * This example would make titles and content safe:
		 *
		 *     var container = yootil.create.container("My <em>Title</em>", "My <strong>Content</strong>", true);
		 *
		 *     $("#content").prepend(container);
		 *
		 * @param {String} title The container title.
		 * @param {String} content The container content.
		 * @param {Mixed} [safe] True or false, or pass an object to make html safe (i.e {title: false, content: true}).
		 * @param {Boolean} safe.title If true, then yootil will handle making the title safe.
		 * @param {Boolean} safe.content If true, then yootil will handle making the content safe.
		 * @param {Object} [title_styles] Key value par for css styles (i.e {color: "red", padding: "11px"}).
		 * @param {Object} [content_styles] Key value par for css styles (i.e {color: "red", padding: "11px"}).
		 * @param {Object} [container_styles] Key value par for css styles (i.e {color: "red", padding: "11px"}).
		 * @param {Boolean} [no_h2] If set to true, it will not wrap the title with an h2 tag.
		 * @param {Boolean} [jquery_obj] If false, returned content will be an html string.
		 * @return {Mixed} Depends on what jquery_obj is set too, default is jquery object.
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
			
			title = (safe_title)? yootil.html_encode(title) : title;
			title = (typeof no_h2 != "undefined" && !no_h2)? title : ("<h2>" + title + "</h2>");
			
			content = (safe_content)? yootil.html_encode(content) : content;
			
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
		 * Quickly create a blank page that matches a certain URL.
		 *
		 *     yootil.create.page("shop", "Shop");
		 *
		 * An exanple adding a container to the page as well:
		 *
		 *     yootil.create.page("shop", "Shop").container("The Shop", "Welcome to the Shop").appendTo("#content");
		 *
		 * @param {Mixed} locate This will get matched against the location.href value, can be a string or RegExp object.
		 * @param {String} [document_title] Gets Added onto the current document title.
		 * @param {Boolean} [hide_content] By default the children of #content gets hidden, you can override this.
		 * @chainable
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
		 * Extend the nav tree easily.
		 *
		 *     yootil.create.nav_branch("/shop/", "Shop");
		 *
		 * @param {String} url URL of the branch.
		 * @param {String} text Text of the branch.
		 * @return {Object} Branch jQuery wrapped.
		 */
		
		nav_branch: function(url, text){
			var branch = $("#nav-tree li:last").clone();

			if(branch && branch.length){
				branch.find("a").attr("href", url).find("span").html(text);
				branch.appendTo("#nav-tree");
			}
			
			return branch;
		},

		/**
		 * Create a new tab on the profile
		 *
		 *     yootil.create.profile_tab("Test", "test");
		 *
		 * @param {String} text Text of the branch.
		 * @param {String} page URL of the branch.
		 * @param {Boolean} [active] Active page or not.
		 * @chainable
		 */
		
		profile_tab: function(text, page, active){
			if(yootil.location.check.profile()){
				var active_class = (active)? " class='ui-active'" : "";
				var ul = $("div.show-user div.ui-tabMenu ul");
				
				if(ul.length){
					ul.append($("<li" + active_class + "><a href='/user/" + yootil.page.member.id() + "/" + page + "'>" + text + "</a></li>"));
				}
			}
			
			return this;
		},

		/**
		 * Creates a profile content box.
		 *
		 *     yootil.create.profile_content_box();
		 *
		 * @param {String} id Enter a ID, or a unique one will be created.
		 * @return {Object} The box is returned wrapped with jQuery.
		 */
		
		profile_content_box: function(id){
			var uid = (id || $.unique_id("yootil-"));
			var box = $("<div />").addClass("content-box center-col").attr("id", uid);
				
			return box;
		},

		/**
		 * Adds a new BBC button to the end on the reply page.
		 *
		 * @param {Object} The image you wish to add
		 * @chainable
		 */
		
		bbc_button: function(img){
			$(".controls").find(".bbcode-editor, .visual-editor").ready(function(){
				$(".controls").find(".bbcode-editor, .visual-editor").find(".group:last ul:last").append($("<li>").addClass("button").append($(img)));
			});
			
			return this;
		}
		
	};

})();