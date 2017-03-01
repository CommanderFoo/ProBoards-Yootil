/**
 * @class yootil.create
 * @static
 * Contains useful methods to creating things quickly (i.e containers).
 */

yootil.create = class {

	/**
	 * Creates ProBoards div containers.
	 *
	 * Very basic example:
	 *
	 *     let $container = yootil.create.container("My Title", "My Content");
	 *
	 *     $("#content").prepend($container);
	 *
	 * This example would make titles and content safe:
	 *
	 *     let $container = yootil.create.container("My <em>Title</em>", "My <strong>Content</strong>", true);
	 *
	 *     $("#content").prepend($container);
	 *
	 * @param {String} title The container title.
	 * @param {String} content The container content.
	 * @param {Boolean} [no_h2] If set to true, it will not wrap the title with an h2 tag.
	 * @param {Boolean} [html_back] If true, returned content will be an html string.
	 * @return {String|Object} Depends on what html_back is set too, default is jquery object.
	 */

	static container(title = "", content = "", no_h2 = false, html_back = false){
		let html = "";

		title = (!no_h2)? title : ("<h2>" + title + "</h2>");

		html += "<div class=\"container\">";
			html += "<div class=\"title-bar\">" + title + "</div>";
			html += "<div class=\"content pad-all\">" + content + "</div>";
		html += "</div>";

		if(html_back){
			return $(html).wrap("<span/>").parent().html();
		} else {
			return $(html);
		}
	}

	/**
	 * Quickly create a blank page that matches a certain URL.
	 *
	 *     yootil.create.page("shop", "Shop");
	 *
	 * An example adding a container to the page as well:
	 *
	 *     yootil.create.page("shop", "Shop").container("The Shop", "Welcome to the Shop").appendTo("#content");
	 *
	 * @param {String|Object} locate This will get matched against the location.href value, can be a string or RegExp object.
	 * @param {String} [document_title] Gets Added onto the current document title.
	 * @param {Boolean} [hide_content] By default the children of #content gets hidden, you can override this.
	 * @chainable
	 */

	static page(locate, document_title = "", hide_content = true){
		let reg = (locate.constructor == RegExp)? locate : new RegExp("\/" + locate, "i");

		if(locate && location.href.match(reg)){
			if(typeof document_title != "undefined" && document_title.length){
				document.title += " - " + document_title;
			}

			if(typeof hide_content == "undefined" || hide_content){
				$("#content").children().hide();
			}
		}

		return this;
	}

	/**
	 * Extend the nav tree easily.
	 *
	 *     yootil.create.nav_branch("/shop/", "Shop");
	 *
	 * @param {String} url URL of the branch.
	 * @param {String} text Text of the branch.
	 * @return {Object} Branch jQuery wrapped.
	 */

	static nav_branch(url = "/", text = ""){
		let $branch = yootil.get.last_nav_branch().clone();

		if($branch.length){
			$branch.find("a").attr("href", url).find("span").html(text);
			$branch.appendTo(yootil.get.nav_tree());
		}

		return $branch;
	}

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

	static profile_tab(text = "", page = "/", active = false){
		if(yootil.location.profile()){
			let active_class = (active)? " class='ui-active'" : "";
			let $ul = $("div.show-user div.ui-tabMenu:first ul");

			if($ul.length){
				$ul.append($("<li" + active_class + "><a href='/user/" + yootil.page.member.id() + "/" + page + "'>" + text + "</a></li>"));
			}
		}

		return this;
	}

	/**
	 * Creates a profile content box.
	 *
	 *     yootil.create.profile_content_box();
	 *
	 * @param {String} id Enter a ID, or a unique one will be created.
	 * @return {Object} The box is returned wrapped with jQuery.
	 */

	static profile_content_box(id = ""){
		let uid = (id || $.unique_id("yootil-"));

		return $("<div />").addClass("content-box center-col").attr("id", uid);
	}

	/**
	 * Adds a new BBC button to the end on the reply page.
	 *
	 * Note:  Due to the WYSIWYG being dynamically created, this can fail.
	 *
	 * @param {Object} img The image element to append.
	 * @param {Function} [func] Adds an onlick event.
	 * @chainable
	 */

	static bbc_button(img = "", func = null){
		$(() => {
			let $li = $("<li>").addClass("button").append($(img));

			if(func){
				$li.click(func);
			}

			let $controls = $(".editor .ui-wysiwyg .controls");
			let $ul = $controls.find(".bbcode-editor, .visual-editor").find(".group:last ul:last");

			if($controls.length && $ul.length){
				$ul.append($li);
			}
		});

		return this;
	}

	/**
	 * Creates a new tab next to the BBCode tab on post / message reply pages.
	 *
	 *     let $my_tab = yootil.create.ubbc_tab("My Title", "My Content");
	 *
	 * An example using the hide and show events:
	 *
	 *     let $my_tab2 = yootil.create.ubbc_tab("My Title 2", "My Content 2", "myid2", null, {
	 *
	 *         show: function(tab, tab_content){
	 *     		   tab.css("background-color", "red");
	 *         },
	 *
	 *         hide: function(tab, tab_content){
	 *     		   tab.css("background-color", "");
	 *         }
	 *
	 *     );
	 *
	 * @param {String} tab_title The title for the tab, this can contain HTML.
	 * @param {String} content The content that will be shown when the tab is clicked.  HTML can be used.
	 * @param {String} [id] The id for this tab.  If not specified a random one will be created.
	 * @param {Object} [css] You can apply an object of css values that jQuery will apply, or defaults will be used.
	 * @param {Object} [events] There are 2 events, show and hide.
	 * @param {Function} [events.show] When the tab is clicked, this event will be called.  Tab and content are passed.
	 * @param {Function} [events.hide] When another tab is click, this event will be called.  Tab and content are passed.
	 * @param {Function} [events.context] Set the context of the functions.
	 * @return {Object} The tab content div is returned wrapped with jQuery.
	 */

	static ubbc_tab(tab_title = "My Tab", content = "", id = "", css = null, events = {}){
		id = id || yootil.ts();

		let $wysiwyg_tabs = $(".editor ul.wysiwyg-tabs");
		let $tab = $("<li id='menu-item-" + id + "'><a href='#'>" + tab_title + "</a></li>");
		let $tab_content = $("<div id='" + id + "'>" + content + "</div>");

		$wysiwyg_tabs.append($tab);
		
		if(css && typeof css == "object"){
			$tab_content.css(css);
		} else {
			$tab_content.css({

				border: "1px solid #E6E6E6",
				padding: "5px"

			});
		}

		$tab_content.hide().insertBefore($wysiwyg_tabs);

		$wysiwyg_tabs.find("li").click(function(e){
			let $active = $(this);

			e.preventDefault();

			$active.parent().find("li").removeClass("ui-active");
			$active.addClass("ui-active");

			$active.parent().find("li").each(function(){
				let id = $(this).attr("id");

				if(id.match(/bbcode|visual/i)){
					$(".editor .ui-wysiwyg .editors").hide();
				} else {
					if($active.attr("id") == id){
						return;
					}

					let selector = "";

					if(id){
						selector = "#" + id.split("menu-item-")[1];
					}

					if($(selector).length){
						if(events && events.hide){
							if(events.context){
								events.hide.bind(events.context)($tab, $tab_content);
							} else {
								events.hide($tab, $tab_content);
							}
						}

						$(selector).hide();
					}
				}
			});

			let id = $active.attr("id");
			let selector = "";

			if(id){
				selector = "#" + id.split("menu-item-")[1];
			}

			if(id.match(/bbcode|visual/i)){
				$(".editor .ui-wysiwyg .editors").show();
			} else if($(selector).length){
				console.log(events);

				if(events && events.show){
					if(events.context){
						events.show.bind(events.context)($tab, $tab_content);
					} else {
						events.show($tab, $tab_content);
					}
				}

				$(selector).show();
			}
		});

		return $tab_content;
	}

};