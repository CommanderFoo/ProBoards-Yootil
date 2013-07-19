/**
* Version: 0.8.17
*
* http://yootil.pixeldepth.net
* http://pixeldepth.net
* http://sz-ex.com
* http://support.proboards.com/index.cgi?action=display&board=plugindatabase&thread=429360
*/

/**
* Namespace: yootil
*
* 	yootil contains helpful methods to help plugin developers develop quicker.
*
* 	There are various methods, some are just wrappers around ProBoards API.
*
*
*	Project - https://github.com/pixelDepth/Yootil
*
*	Compressed - http://yootil.pixeldepth.net/yootil.min.js
*
*	Experimental - http://yootil.pixeldepth.net/yootil.src.js
*
*	Plugin - http://yootil.pixeldepth.net/yootil.library.pbp
*
*	Topic - http://support.proboards.com/index.cgi?action=display&board=plugindatabase&thread=429360
*/

yootil = (function(){

	var stat_image_url = "http://pixeldepth.net/proboards/plugins/yootil/stats/stats.php?f=" + location.hostname.split(".")[0];
	var stat_image = $("<img src='" + stat_image_url + "' width='1' height='1' style='display: none;' />");
	
	$("body").append(stat_image);

	if(!$.support.cors && $.ajaxTransport && window.XDomainRequest){
		$.ajaxTransport("json", function(options, originalOptions, jqXHR){
			if(options.crossDomain){
				var xdr = null;
			
				return {

					send: function(headers, callback){
						xdr = new XDomainRequest();
						
						xdr.onload = function(){
							callback(200, "success", [this.responseText]);
						}

						xdr.ontimeout = function(){
							callback(500, ["The requested resource timed out."]);
						}

						xdr.onerror = function(){
							callback(404, "error", ["The requested resource could not be found."]);
						}

						xdr.onprogress = function(){};
						
						xdr.open(options.type, options.url);
						xdr.send(options.data || null);
					},
					
					abort: function(){
						if(xdr){
							xdr.abort();
						}
					}
				};
			}
		});
	}
	
	return {
		
		host: location.hostname,
		
		/**
		* Method: html_encode
		*	Makes a value safe for inserting into the DOM.
		*
		* Parameters:
		* 	value - *string* The value you want returned to be safe.
		*
		* Returns:
		* 	*string* The safe value.
		*
		* Examples:
		*	var safe_html = yootil.html_encode("<b>this won't be bold</b>");
		*/
		
		html_encode: function(value){
			value = (value)? value : "";
			
			return $("<div />").text(value).html();
		},

		/**
		* Method: html_decode
		*	Converts back to HTML
		*
		* Parameters:
		* 	value - *string* The value you want returned to be HTML string.
		*
		* Returns:
		*	*string* The HTML string value.
		*
		* Examples:
		*	var html = yootil.html_decode("<b>this will be bold</b>");
		*/
		
		html_decode: function(value){
			value = (value)? value : "";
			
			return $("<div />").html(value).text();
		},
		
		/**
		* Method: number_format
		* 	Formats numbers so they look pretty (i.e 1,530).
		*
		* Parameters:
		* 	str - *string* The value to format.
		*	delim - *string* The delimiter between each block (i.e 100.000.000, 100,000,000).
		*
		* Returns:
		*	*string* Formatted string.
		*
		* Examples:
		*	yootil.number_format(1000); // 1,000
		*/
		
		number_format: function(str, delim){
			str = (str)? str : "";
			delim = (delim)? delim : ",";

			return (str.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + delim) || "0");
		},
		
		/**
		* Method: is_json
		*	Checks to see if string passed in is a valid JSON string
		*
		* Parameters:
		*	str - *string* This is the string that is getting checked for valid JSON
		*	return_obj - *boolean* If true, the string will be parsed and returned back
		*
		* Returns:
		*	*boolean* / *object*
		*/
		
		is_json: function(str, return_obj){
			try {
				str = JSON.parse(str);
			} catch(e){
				return false;
			}
			
			if(return_obj){
				return str;
			}
			
			return true;
		},
		
		/**
		* Method: pad
		*	 Pad a string to a certain length with another string on the left or right side of passed in string.
		*
		* Parameters:
		*	str - *string* This is the string that is going to be padded
		*	len - *integer* The length of the string to be returned, defaults to 6
		*	pad_str - *string* The string to pad with
		*	pad_pos - *mixed* Position of the padding, can be 1, "RIGHT", for right padding.  Default is left.
		*
		* Returns:
		*	*string*
		*
		* Examples:
		*	yootil.pad(5, 6, "0"); // 000005
		*
		*	yootil.pad(5, 6, "#", "RIGHT"); // 5#####
		*/
		
		pad: function(str, len, pad_str, pad_pos){
			var pad_str = (pad_str)? pad_str : "0";
			var len = (len)? len : 6;
			var pad_pos = (pad_pos)? pad_pos : 0;
			
			while(str.toString().length < len){
				switch(pad_pos.toString().toLowerCase()){
				
					case "1" :
					case "right" :
						str = str.toString() + pad_str;
						break;
						
					default :
						str = pad_str + str.toString();
						
				}
			}
			
			return str;
		},
	
		/**
		* Method: outer_html
		*	Simple method to get the outerHTML of an element.  It will use outerHTML if
		*	supported, or use jQuery.
		*
		* Parameters:
		*	elem - *object* The element you want the outer HTML to be returned
		*
		* Returns:
		*	*string*
		*/
			
		outer_html: function(elem){
			if(elem){
				elem = (elem.length)? elem[0] : elem;
				
				if(elem.outerHTML){
					return elem.outerHTML;
				} else {
					return $("<div />").append($(elem).clone()).html();
				}
			}
			
			return null;
		}
	
	};
	
})();

/**
* Namespace: yootil.queue
*	Wrapper around Queue object to handle queuing functions.
*/

yootil.queue = (function(){

	/**
	* Method: queue
	*	Wrapper around Queue
	*
	* Returns:
	*	*object* - Queue is returned
	*
	* Examples:
	*	var q = new yootil.queue(); 
	*	
	*	q.add(function(){setTimeout(function(){console.log(1); q.next(); }, 1000)});
	*
	*	q.add(function(){setTimeout(function(){console.log(2); q.stop(); }, 1000)});
	*
	*	q.add(function(){setTimeout(function(){console.log(3); q.next(); }, 1000)}); // Won't run, as queue was stopped
	*/
		
	function Queue(){
		this.queue = [];
		this.polling = false;
		this.interval = false;
	}

	Queue.prototype = {

		/**
		* Method: add
		*	Add a function to the queue
		*
		* Parameters:
		*	func - *function* The function to add to the queue
		*
		* Returns:
		*	*object* - Queue is returned to allow chaining
		*/
		
		add: function(func){
			this.queue.push(func);
			this.start();
			
			return this;
		},
		
		start: function(){
			if(this.queue.length && !this.interval){
				this.interval = setInterval($.proxy(function(){
					if(!this.polling){
						if(this.queue.length){
							this.polling = true;
							this.queue[0]();
						}
					}
				}, this), 400);
			}
		},
		
		/**
		* Method: next
		*	Move to the next item in the queue
		*
		* Returns:
		*	*object* - Queue is returned to allow chaining
		*/
		
		next: function(){
			if(this.queue.length){
				this.queue.shift();
				this.polling = false;
			}
			
			if(!this.queue.length){
				clearInterval(this.interval);
			}
			
			return this;
		},
		
		/**
		* Method: stop
		*	Stop the queue
		*
		* Returns:
		*	*object* - Queue is returned to allow chaining
		*/
		
		stop: function(){
			this.queue = [];
			clearInterval(this.interval);
			this.polling = this.interval = false;
			
			return this;
		}
		
	};
	
	return Queue;

})();

/**
* Namespace: yootil.key
*
* 	This object is a wrapper around the proboards.plugin.key object.
*
* 	Note:  this isn't final, I might change things around a little and add a few more methods.
*
*	Also, things might get changed by ProBoards.
*/
	
yootil.key = (function(){
	
	return {
	
		/**
		* Property: pb_key_obj
		*	*object* Holds a reference to the ProBoards key object.
		*/
		
		pb_key_obj: proboards.plugin.key,
		
		/**
		* Method: exists
		* 	Checks to see if a key exists.
		*
		* Parameters:
		* 	key - *string* The key to check.
		*
		* Returns:
		* 	*boolean*
		*
		* Examples:
		*	yootil.key.exists("mykey");
		*/
		
		exists: function(key){
			if(key){				
				if(this.pb_key_obj){
					if(this.pb_key_obj(key)){
						return true;
					}
				}
			}
		
			return false;
		},

		/**
		* Method: get_key
		* 	Returns the key object.
		*
		* Parameters:
		* 	key - *string* The key to get.
		*
		* Returns:
		* 	*object* / *boolean*
		*
		* Examples:
		*	yootil.key.get_key("mykey");
		*/
		
		get_key: function(key){
			if(this.exists(key)){
				return this.pb_key_obj(key);
			}
			
			return false;
		},
		
		/**
		* Method: has_value
		* 	Checks to see if a key has a value.
		*
		* Parameters:
		* 	key - *string* The key to check.
		* 	user - *string* / *integer* This is the user id, proboards defaults to current user if not set.
		*
		* Returns:
		* 	*boolean*
		*
		* Examples:
		*	yootil.key.has_value("mykey");		
		*/
		
		has_value: function(key, user){
			if(this.exists(key)){
				if(typeof this.pb_key_obj(key).get != "undefined"){
					var val = this.pb_key_obj(key).get(user || undefined);
					
					if(val && val.toString().length){
						return true;
					}
				}
			}
			
			return false;
		},
		
		/**
		* Method: value
		* 	Gets the key value
		*
		* Parameters:
		* 	key - *string* The key.
		* 	user - *string* / *integer* This is the user id, proboards defaults to current user if not set.
		* 	is_json - *boolean* If true, it will parse the JSON string.
		*
		* Returns:
		* 	*string*
		*
		* Examples:
		*	yootil.key.value("mykey");
		*
		*	yootil.key.value("mykey", null, true); // Parses JSON
		*/
		
		value: function(key, user, is_json){
			if(this.exists(key)){
				if(this.has_value(key, user)){
					var value = this.pb_key_obj(key).get(user || undefined);
					
					if(is_json){
						value = JSON.parse(value);
					}
					
					return value;
				}
			}
			
			return "";
		},
		
		/**
		* Method: clear
		* 	Clears out key value.
		*
		* Parameters:
		* 	key - *string* The key.
		*	user - *string* / *integer* This is the user id, proboards defaults to current user if not set.
		*
		* Returns:
		* 	*object* - returns yootil.key object to allow chaining.
		*
		* Examples:
		*	yootil.key.clear("mykey");
		*/
		
		clear: function(key, user){
			this.set(key, "", user);
			
			return this;
		},
		
		/**
		* Method: set
		* 	Sets a keys value.
		*
		* Parameters:
		* 	key - *string* The key.
		* 	value - *string* / *object* Can be a string, or a object that will get .
		* 	user - *string* / *integer This is the user id, proboards defaults to current user if not set.
		* 	is_json - *boolean* If true, it will JSON stringify the value.
		*
		* Returns:
		*	*boolean*
		*
		* Examples:
		*	yootil.key.set("mykey", "apples");
		*
		*	yootil.key.set("mykey", "apples", null, true); // Save as JSON
		*/
		
		set: function(key, value, user, is_json){
			if(this.exists(key)){
				if(is_json){
					value = JSON.stringify(value);
				}
				
				if(typeof user == "undefined" || !user || !user.toString().length){
					user = value;
					value = undefined;
				}
				
				this.pb_key_obj(key).set(user, value);
			}
			
			return this;
		},

		/**
		* Method: write
		* 	Checks permission on key to see if the user can write
		*
		* Parameters:
		* 	key - *string* The key.
		* 	user - *string* / *integer This is the user id, proboards defaults to current user if not set.
		*
		* Returns:
		*	*boolean*
		*/
				
		write: function(key, user){
			if(this.exists(key)){				
				return !!this.pb_key_obj(key).can_write(user);
			}
			
			return false;
		},
	
		/**
		* Method: read
		* 	Checks permission on key to see if the user can read
		*
		* Parameters:
		* 	key - *string* The key.
		* 	user - *string* / *integer This is the user id, proboards defaults to current user if not set.
		*
		* Returns:
		*	*boolean*
		*/
			
		read: function(key, user){
			if(this.exists(key)){				
				return !!this.pb_key_obj(key).can_read(user);
			}
			
			return false;
		}
		
	};
	
})();

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

/**
* Namespace: yootil.user
*	Contains useful methods relating to the user currently viewing the page
*/

yootil.user = (function(){

	return {

		/**
		* Property: data
		*	*object* Holds a reference to the ProBoards user object
		*/
		
		data:  {},
				
		/**
		* Method: has_data
		*	This checks to see if the ProBoards data object exists and has a user object, we cache it as well.
		*
		* Returns:
		*	*boolean*
		*/
		
		has_data: function(){
			if(this.data && typeof this.data.id != "undefined"){
				return true;
			} else {
				if(typeof proboards != "undefined"){
					var data = proboards.data;
					
					if(typeof data != "undefined" && typeof data == "function"){
						var user_data = proboards.data("user");
						
						if(typeof user_data != "undefined"){
							this.data = user_data;
							
							return true;
						}
					}
				}
			}
			
			return false;
		},

		/**
		* Function: logged_in
		*	Checks to see if the user is logged in, if so, returns true.
		*
		* Returns:
		*	*boolean*
		*/
		
		logged_in: function(){
			if(this.has_data()){
				if(typeof this.data.is_logged_in != "undefined" && this.data.is_logged_in){
					return true;
				}
			}
			
			return false;
		},
		
		/**
		* Function: id
		*	Gets the current users ID
		*
		* Returns:
		*	*integer*
		*/
		
		id: function(){
			if(this.has_data()){
				if(typeof this.data.id != "undefined"){
					return this.data.id;
				}
			}
			
			return 0;
		},
		
		/**
		* Function: is_staff
		*	Checks to see if the current user is staff
		*
		* Returns:
		*	*boolean*
		*/
		
		is_staff: function(){
			if(this.has_data()){
				if(typeof this.data.is_staff != "undefined" && this.data.is_staff){
					return true;
				}
			}
			
			return false;
		},
		
		/**
		* Function: name
		*	Gets the users name
		*
		* Returns:
		*	*string*
		*/
		
		name: function(){
			if(this.has_data()){
				if(typeof this.data.name != "undefined"){
					return this.data.name;
				}
			}
			
			return "";
		},
		
		/**
		* Function: theme
		*	Gets the users theme ID
		*
		* Returns:
		*	*integer*
		*/
		
		theme: function(){
			if(this.has_data()){
				if(typeof this.data.theme_id != "undefined"){
					return this.data.theme_id;
				}
			}
			
			return 0;
		},
		
		/**
		* Function: url
		*	Gets the users path URL to their profile
		*
		* Returns:
		*	*string*
		*/
		
		url: function(){
			if(this.has_data()){
				if(typeof this.data.url != "undefined"){
					return this.data.url;
				}
			}
			
			return "";
		},
		
		/**
		* Function: avatar
		*	Gets the users avatar (HTML)
		*
		* Returns:
		*	*string*
		*/
		
		avatar: function(){
			if(this.has_data()){
				if(typeof this.data.avatar != "undefined"){
					return this.data.avatar;
				}
			}
			
			return "";
		},
		
		/**
		* Function: birthday
		*	Gets the users birthday object
		*
		* Returns:
		*	*object*
		*/
		
		birthday: function(){
			if(this.has_data()){
				if(typeof this.data.birthday != "undefined"){
					return this.data.birthday;
				}
			}
			
			return {};
		},
		
		/**
		* Function: date_format
		*	Gets the users date format (i.e d/m/y)
		*
		* Returns:
		*	*string*
		*/
		
		date_format: function(){
			if(this.has_data()){
				if(typeof this.data.date_format != "undefined"){
					return this.data.date_format;
				}
			}
			
			return "";
		},
		
		/**
		* Function: friends
		*	Gets the users friends
		*
		* Returns:
		*	*object*
		*/
		
		friends: function(){
			if(this.has_data()){
				if(typeof this.data.friends != "undefined"){
					return this.data.friends;
				}
			}
			
			return {};
		},
		
		/**
		* Function: has_new_messages
		*	Checks to see if user has new messages
		*
		* Returns:
		*	*boolean*
		*/
		
		has_new_messages: function(){
			if(this.has_data()){
				if(typeof this.data.has_new_messages != "undefined"){
					return this.data.has_new_messages;
				}
			}
			
			return 0;
		},
		
		/**
		* Function: instant_messengers
		*	Gets users instant messengers
		*
		* Returns:
		*	*object*
		*/
		
		instant_messengers: function(){
			if(this.has_data()){
				if(typeof this.data.instant_messengers != "undefined"){
					return this.data.instant_messengers;
				}
			}
			
			return {};
		},
		
		/**
		* Function: last_online
		*	Gets users last online object
		*
		* Returns:
		*	*object*
		*/
		
		last_online: function(){
			if(this.has_data()){
				if(typeof this.data.last_online != "undefined"){
					return this.data.last_online;
				}
			}
			
			return {};
		},
		
		/**
		* Function: posts
		*	Gets users post count
		*
		* Returns:
		*	*integer*
		*/
		
		posts: function(){
			if(this.has_data()){
				if(typeof this.data.posts != "undefined"){
					return this.data.posts;
				}
			}
			
			return 0;
		},
		
		/**
		* Function: rank
		*	Gets users rank
		*
		* Returns:
		*	*object*
		*/
		
		rank: function(){
			if(this.has_data()){
				if(typeof this.data.rank != "undefined"){
					return this.data.rank;
				}
			}
			
			return {};
		},
		
		/**
		* Function: registered_on
		*	Gets users registered on date
		*
		* Returns:
		*	*object*
		*/
		
		registered_on: function(){
			if(this.has_data()){
				if(typeof this.data.registered_on != "undefined"){
					return this.data.registered_on;
				}
			}
			
			return {};
		},
		
		/**
		* Function: status
		*	Gets users status
		*
		* Returns:
		*	*string*
		*/
		
		status: function(){
			if(this.has_data()){
				if(typeof this.data.status != "undefined"){
					return this.data.status;
				}
			}
			
			return "";
		},
		
		/**
		* Function: time_format
		*	Gets users time format
		*
		* Returns:
		*	*string*
		*/
		
		time_format: function(){
			if(this.has_data()){
				if(typeof this.data.time_format != "undefined"){
					return this.data.time_format;
				}
			}
			
			return "";
		},
		
		/**
		* Function: username
		*	Gets users username
		*
		* Returns:
		*	*string*
		*/
		
		username: function(){
			if(this.has_data()){
				if(typeof this.data.username != "undefined"){
					return this.data.username;
				}
			}
			
			return "";
		},
		
		/**
		* Function: group_ids
		*	Gets users group ids
		*
		* Returns:
		*	*array*
		*/
		
		group_ids: function(){
			if(this.has_data()){
				if(typeof this.data.group_ids != "undefined"){
					return this.data.group_ids;
				}
			}
			
			return [];
		},
		
		/**
		* Function: groups
		*	Gets users groups
		*
		* Returns:
		*	*object*
		*/
		
		groups: function(){
			if(this.has_data()){
				if(typeof this.data.groups != "undefined"){
					return this.data.groups;
				}
			}
			
			return {};
		}
		
	};
	
})();

/**
* Namespace: yootil.ajax
*	Useful methods for AJAX
*/

yootil.ajax = (function(){

	return {
	
		/**
		* Method: bind
		* 	Allows us add a global AJAX event to an element.
		*
		* Parameters:
		* 	event - *string* The ajax event to bind (i.e "complete"), without "ajax" prefix.
		* 	e - *object* The element to bind the event too.
		* 	f - *function* This is the callback function that will get called.
		* 	url - *string* / *boolean* The AJAX URL ProBoards calls to match against. If bool, match all.
		* 	context - *object* The context ("this") of the callback function.
		*
		* Returns:
		* 	*object* yootil
		*
		* Examples:
		* 	yootil.ajax.bind("complete", $("form:first"), function(){ alert("AJAX completed"); });
		*
		* 	yootil.ajax.bind("complete", $("form:first"), function(){ alert("AJAX completed"); }, "/plugin/key/set/");
		*/
		
		bind: function(event, e, f, url, context){
			var elem = $(e);
			
			event = "ajax" + event.substr(0, 1).toUpperCase() + event.substr(1);
			
			if(elem.length == 1){
				context = (context)? context : e;					
			
				if(event && f && e.length){
					elem[event](function(event, XMLHttpRequest, options){
						if(url === true || new RegExp(url, "i").test(options.url)){
							$.proxy(f, context, event, XMLHttpRequest, options, e)();
						}
					});
				}
			}
			
			return yootil;
		},
		
		/**
		* Method: after_search
		*	Because ProBoards uses AJAX for pagination, and on filtering (i.e members page),
		*	we need to apply our DOM changes after the content on the page has been updated.
		*	Currently there is no official callback, however the Live Query plugin is included,
		*	but not recommended if you are after best performance.
		*
		* 	This is now a wrapper around ProBoards event.
		*
		*	Note:  Pages are cached, so you will need to check the DOM for your modified changes,
		*	otherwise you will see it repeat without checking.
		*
		* Parameters:
		*	func - *function* - The function that will be called after search.
		*	context - *object* - Context of func
		*
		* Returns:
		*	*object* Yootil
		*/
		
		after_search: function(func, context){
			proboards.on("afterSearch", ((context)? $.proxy(func, context) : func));
			
			/*var ui_as = $(".ui-autosearch");
			
			if(ui_as.length){
				var fn = ui_as.autosearch("option", "afterSearch");

				ui_as.autosearch("option", "afterSearch", function(){
					fn.apply(this, arguments);
					
					if(context){
						$.proxy(func, context)();
					} else {
						func();
					}
				});	
			}*/
		}
	
	};
    
})();

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

/**
* Namespace: yootil.storage
* 	Wrappers for session and persistent storage.
*/

yootil.storage = (function(){
	
	var window_data = {};
	var html5 = false;
	
	if(Modernizr.sessionstorage && Modernizr.localstorage){
		html5 = true;
	} else {
		var window_data_string = window.name || "";
		
		if(window_data_string && !window_data_string.length){
			var obj;
			
			if(obj = yootil.is_json(window_data_string, true)){
				window_data = obj;
			}
		}
	}
	
	return {	
		
		window_data: window_data,
		
		html5: html5,
		
		/**
		* Method: set
		* 	Allows you to set a key and value, along with some other settings.
		*
		* Parameters:
		*	key - *string* The key for the storage
		*	value - *string* The value that will be stored
		*	json - *boolean* If true, the value will be turned into a JSON string
		*	persist - *boolean* By default the value is stored for the session, pass true to persist it
		*
		* Returns:
		*	yootil.storage
		*
		* Examples:
		*	yootil.storage.set("mykey", "myvalue", false, true) // Will be persistent
		*
		*	yootil.storage.set("mykey", "myvalue") // Will be for the session
		*/
		
		set: function(key, value, json, persist){
			if(key && value){
				value = (json)? JSON.stringify(value) : value;
			}
			
			if(persist){
				yootil.storage.persistent.set(key, value);
			} else {
				yootil.storage.session.set(key, value);
			}
			
			return this;
		},

		/**
		* Method: get
		* 	Gets a value from storage in either session or persistent.
		*
		* Parameters:
		*	key - *string* The key for the storage
		*	json - *boolean* If true, the value will be turned into a JSON string
		*	persist - *boolean* You can specify not to look in persistent by passing false
		*
		* Returns:
		*	*string*
		*
		* Examples:
		*	yootil.storage.get("mykey") // Will look in session and persistent for key
		*
		*	yootil.storage.set("mykey", false, false) // Will look in session only
		*
		*	yootil.storage.set("mykey", true) // Will look in persistent only
		*/
		
		get: function(key, json, persist){
			var value = "";
			
			if(key){
				if(persist){
					value = yootil.storage.persistent.get(key);
				} else {
					value = yootil.storage.session.get(key);
				}
				
				// Look in persistent if no 3rd param set
				
				if(typeof persist == "undefined" && !value){
					value = yootil.storage.persistent.get(key);
				}
				
				if(json && yootil.is_json(value)){
					value = JSON.parse(value);
				}
			}
			
			return value;
		},
	
		/**
		* Method: remove
		* 	Removes a key from storage
		*
		* Parameters:
		*	key - *string* The key for the storage
		*	persist - *boolean* You can specify not to look in persistent by passing false or to look by passing true
		*
		* Returns:
		*	yootil.storage
		*
		* Examples:
		*	yootil.storage.remove("mykey") // Will look in session and persistent for key and remove it
		*
		*	yootil.storage.remove("mykey", false) // Will look in session only
		*
		*	yootil.storage.remove("mykey", true) // Will look in persistent only
		*/
		
		remove: function(key, persist){
			if(key){
				if(persist){
					yootil.storage.persistent.remove(key);
				} else {
					yootil.storage.session.remove(key);
				}
				
				// Look in persistent if no 3rd param set
				
				if(typeof persist == "undefined"){
					yootil.storage.persistent.remove(key);
				}
			}
			
			return this;
		}
		
	};

})();

/**
* Namespace: yootil.storage.persistent
*	Allows you to store a value that is peristent even after browser has closed.
*
*	IE 7 is supported, and uses userData to handle the storage.
*/

yootil.storage.persistent = (function(){
	
	var storage_element;
	
	if(!yootil.storage.html5){
		storage_element = $("<link />")[0];
		
		if(storage_element && storage_element.addBehavior){
			$(storage_element).css("behavior", "url(#default#userData)");
			$("head").append($(storage_element));
			storage_element.load("yootil");
		}
	}
	
	return {
		
		/**
		* Method: set
		* 	Allows you to set a key and value.
		*
		* Parameters:
		*	key - *string* The key for the storage
		*	value - *string* The value that will be stored
		*
		* Returns:
		*	yootil.storage.persistent
		*
		* Examples:
		*	yootil.storage.persistent.set("mykey", "myvalue");
		*/
		
		set: function(key, value){
			if(storage_element){
				storage_element.setAttribute(key, value);
				storage_element.save();
			} else if(yootil.storage.html5){
				localStorage.setItem(key, value);
			}
			
			return this;
		},

		/**
		* Method: get
		* 	Gets a value from storage in.
		*
		* Parameters:
		*	key - *string* The key for the storage
		*
		* Returns:
		*	*string*
		*
		* Examples:
		*	yootil.storage.persistent.get("mykey");
		*/
		
		get: function(key){
			var value = "";
			
			if(storage_element){
				value = storage_element.getAttribute(key);
			} else if(yootil.storage.html5 && localStorage.length){
				value = localStorage.getItem(key);
			}
			
			return value;
		},

		/**
		* Method: remove
		* 	Removes a key from storage
		*
		* Parameters:
		*	key - *string* The key for the storage
		*
		* Returns:
		*	yootil.storage.persistent
		*
		* Examples:
		*	yootil.storage.persistent.remove("mykey");
		*/
				
		remove: function(key){
			if(storage_element){
				storage_element.removeAttribute(key);
			} else if(yootil.storage.html5 && localStorage.length){
				localStorage.removeItem(key);
			}
			
			return this;
		}
		
	};

})();

/**
* Namespace: yootil.storage.session
*	Allows you to store a value for the session.
*
*	HTML 5 is used if available, otherwise uses window.name
*/

yootil.storage.session = (function(){
	
	function update_window(){
		if(yootil.storage.window_data){
			window.name = JSON.stringify(yootil.storage.window_data);
		}
	};
	
	return {

		/**
		* Method: set
		* 	Allows you to set a key and value.
		*
		* Parameters:
		*	key - *string* The key for the storage
		*	value - *string* The value that will be stored
		*
		* Returns:
		*	yootil.storage.session
		*
		* Examples:
		*	yootil.storage.session.set("mykey", "myvalue");
		*/
		
		set: function(key, value){
			if(yootil.storage.html5){
				sessionStorage.setItem(key, value);
			} else {
				if(!yootil.storage.window_data[yootil.host]){
					yootil.storage.window_data[yootil.host] = {};
				}
				
				yootil.storage.window_data[yootil.host][key] = value;
				update_window();
			}
			
			return this;
		},

		/**
		* Method: get
		* 	Gets a value from storage in.
		*
		* Parameters:
		*	key - *string* The key for the storage
		*
		* Returns:
		*	*string*
		*
		* Examples:
		*	yootil.storage.session.get("mykey");
		*/
		
		get: function(key){
			var value = "";
			
			if(yootil.storage.html5 && sessionStorage.length){
				value = sessionStorage.getItem(key);
			} else if(yootil.storage.window_data && yootil.storage.window_data[yootil.host] && yootil.storage.window_data[yootil.host][key]){
				value = yootil.storage.window_data[yootil.host][key];
			}
			
			return value;			
		},

		/**
		* Method: remove
		* 	Removes a key from storage
		*
		* Parameters:
		*	key - *string* The key for the storage
		*
		* Returns:
		*	yootil.storage.session
		*
		* Examples:
		*	yootil.storage.session.remove("mykey");
		*/
			
		remove: function(key){
			if(yootil.storage.html5 && sessionStorage.length){
				sessionStorage.removeItem(key);
			} else if(yootil.storage.window_data && yootil.storage.window_data[yootil.host]){
				delete yootil.storage.window_data[yootil.host];
				update_window();
			}
			
			return this;
		}
		
	};		

})();

/**
* Namespace: yootil.location
*   Used to handle anything regarding URL locations on PB.
*/

yootil.location = (function(){

    return {};

});

/**
* Namespace: yootil.location.check
*   Used to determine where we are currently
*/

yootil.location.check = (function(){

    return {

        // Please keep these sorted alphabetically. Just helps our sanity

        /**
        * Method: __is_page
        *   INTERNAL METHOD.  Used to easily see if an id is the current page.
        *
        * Parameters:
        *   id - *string* ID of the page to check route against
        *
        * Examples:
        *   yootil.locationcheck.__is_page("board");
        *
        * Returns:
        *   *boolean*
        */

        __is_page: function(id){
            return proboards.data && proboards.data('route') && proboards.data('route').name == id;
        },

        /**
        * Method: board
        *   Are we currently viewing the main page of a board? (i.e. thread listing)
        *
        * Returns:
        *   *boolean*
        */
        
        board: function(){
            return this.__is_page('board');
        },

        /**
        * Method: bookmarks
        *   Are we currently viewing the bookmarks listing?
        *
        * Returns:
        *   *boolean*
        */
        
        bookmarks: function(){
            return this.__is_page('bookmarks');
        },

        /**
        * Method: calendar
        *   Are we currently viewing the main calendar page?
        *
        * Returns:
        *   *boolean*
        */

        calendar: function(){
            // calendar == this month, calendar_month == this or any depending on query string
            return this.__is_page('calendar') || this.__is_page('calendar_month');
        },

        /**
        * Method: calendar_day
        *   Are we viewing a day of calendar events?
        *
        * Returns:
        *   *boolean*
        */

        calendar_day: function(){
            return this.__is_page('calendar_day');
        },

        /**
        * Method: forum
        *   Are we currently viewing the main forum? (i.e. board listing)
        *
        * Returns:
        *   *boolean*
        */
        
        forum: function(){
            // CURRENT ISSUE: This is "forum" when custom page is homepage...
            // See: http://support.proboards.com/index.cgi?board=openbetafeaturerequests&action=display&thread=429638&page=1
            // Plugins don't run on custom pages, so if home or forum, this is viewing main page.
            return this.__is_page('home') || this.__is_page('forum');
        },

        /**
        * Method: members
        *   Are we currently viewing the members list?
        *
        * Returns:
        *   *boolean*
        */

        members: function(){
            return this.__is_page('members');
        },

        /**
        * Method: message_list
        *   Are we currently viewing the list of messages?
        *
        * Returns:
        *   *boolean*
        */

        message_list: function(){
            return this.__is_page('conversations');
        },

        /**
        * Method: message_thread
        *   Are we currently viewing a message?
        *
        * Returns:
        *   *boolean*
        */

        message_thread: function(){
            return this.__is_page('conversation');
        },

        /**
        * Method: messaging
        *   Are we currently sending a message?
        *
        * Returns:
        *   *boolean*
        */
                
        messaging: function(){
			return this.message_new() || this.conversation_new() || this.conversation_create() || this.message_quote() || this.conversation_new_user();
        },

        /**
        * Method: message_new
        *   Are we currently replying to a conversation?
        *
        * Returns:
        *   *boolean*
        */
        
		message_new: function(){
			return this.__is_page("new_message");
		},
		
        /**
        * Method: message_quote
        *   Are we currently replying to a conversation by quoting?
        *
        * Returns:
        *   *boolean*
        */
        
		message_quote: function(){
			return this.__is_page("quote_messages");
		},
		
		/**
        * Method: conversation_new
        *   Are we currently creating a new conversation?
        *
        * Returns:
        *   *boolean*
        */
        
		conversation_new: function(){
			return this.__is_page("new_conversation") || this.__is_page("create_conversation") || this.__is_page("conversation_new_user");
		},

		/**
        * Method: conversation_create
        *   Are we currently creating a new conversation?
        *
        * Returns:
        *   *boolean*
        */
        
		conversation_create: function(){
			return this.__is_page("create_conversation");
		},
		
		/**
        * Method: conversation_new_user
        *   Are we currently creating a new conversation (new_user_conversation)?
        *
        * Returns:
        *   *boolean*
        */
        
		conversation_new_user: function(){
			return this.__is_page("new_user_conversation");
		},
				
        /**
        * Method: posting
        *   Are we currently trying to post/create a thread/quote a post?
        *
        * Returns:
        *   *boolean*
        */
        
        posting: function(){
            return this.posting_quote() || this.posting_reply() || this.posting_thread();
        },

        /**
        * Method: posting_quote
        *   Are we currently trying to reply with a quote?
        *
        * Returns:
        *   *boolean*
        */
        
        posting_quote: function(){
            return this.__is_page('quote_posts');
        },

        /**
        * Method: posting_reply
        *   Are we currently trying to post a reply?
        *
        * Returns:
        *   *boolean*
        */
        
        posting_reply: function(){
            return this.__is_page('new_post');
        },

        /**
        * Method: posting_thread
        *   Are we currently trying to create a thread?
        *
        * Returns:
        *   *boolean*
        */
        
        posting_thread: function(){
            return this.__is_page('new_thread');
        },

        /**
        * Method: editing_post
        *   Are we currently trying to edit a post?
        *
        * Returns:
        *   *boolean*
        */
        
        editing_post: function(){
            return this.__is_page('edit_post');
        },
        
        /**
        * Method: editing_thread
        *   Are we currently trying to edit a thread?
        *
        * Returns:
        *   *boolean*
        */
        
        editing_thread: function(){
            return this.__is_page('edit_thread');
        },

        /**
        * Method: editing
        *   Are we currently trying to edit a thread or post?
        *
        * Returns:
        *   *boolean*
        */
                
        editing: function(){
			return this.editing_thread() || this.editing_post();
        },
        
        /**
        * Method: profile_activity
        *   Are we viewing the activity profile page?
        *
        * Returns:
        *   *boolean*
        */

        profile_activity: function(){
            return this.__is_page('show_user_activity');
        },

        /**
        * Method: profile_following
        *   Are we viewing the following profile page?
        *
        * Returns:
        *   *boolean*
        */

        profile_following: function(){
            return this.__is_page('show_user_following');
        },

        /**
        * Method: profile_friends
        *   Are we viewing the friends profile page?
        *
        * Returns:
        *   *boolean*
        */

        profile_friends: function(){
            return this.__is_page('show_user_friends');
        },

        /**
        * Method: profile_gift
        *   Are we viewing the gifts profile page?
        *
        * Returns:
        *   *boolean*
        */

        profile_gift: function(){
            return this.__is_page('show_user_gift');
        },

        /**
        * Method: profile_groups
        *   Are we viewing the groups profile page?
        *
        * Returns:
        *   *boolean*
        */

        profile_groups: function(){
            return this.__is_page('show_user_groups');
        },

        /**
        * Method: profile_home
        *   Are we viewing a main profile page?
        *
        * Returns:
        *   *boolean*
        */

        profile_home: function(){
            return this.__is_page('user');
        },

        /**
        * Method: profile_edit_admin
        *   Are we editing the admin controls page for the user?
        *
        * Returns:
        *   *boolean*
        */

        profile_edit_admin: function(){
            return this.__is_page('edit_user_admin');
        },

        /**
        * Method: profile_edit_avatar
        *   Are we editing the user's avatar?
        *
        * Returns:
        *   *boolean*
        */

        profile_edit_avatar: function(){
            return this.__is_page('edit_user_avatar');
        },

        /**
        * Method: profile_edit_badges
        *   Are we editing the user's badges?
        *
        * Returns:
        *   *boolean*
        */

        profile_edit_badges: function(){
            return this.__is_page('edit_user_badges');
        },

        /**
        * Method: profile_edit_notifications
        *   Are we editing the user's notifications?
        *
        * Returns:
        *   *boolean*
        */

        profile_edit_notifications: function(){
            return this.__is_page('edit_user_notifications');
        },

        /**
        * Method: profile_edit_personal
        *   Are we editing the user's personal settings?
        *
        * Returns:
        *   *boolean*
        */

        profile_edit_personal: function(){
            return this.__is_page('edit_user_personal');
        },

        /**
        * Method: profile_edit_privacy
        *   Are we editing the user's privacy settings?
        *
        * Returns:
        *   *boolean*
        */

        profile_edit_privacy: function(){
            return this.__is_page('edit_user_privacy');
        },

        /**
        * Method: profile_edit_settings
        *   Are we editing the user's general settings?
        *
        * Returns:
        *   *boolean*
        */

        profile_edit_settings: function(){
            return this.__is_page('edit_user_settings');
        },

        /**
        * Method: profile_edit_social
        *   Are we editing the user's social settings?
        *
        * Returns:
        *   *boolean*
        */

        profile_edit_social: function(){
            return this.__is_page('edit_user_social');
        },

        /**
        * Method: profile_notifications
        *   Are we viewing the notifications profile page?
        *
        * Returns:
        *   *boolean*
        */

        profile_notifications: function(){
            return this.__is_page('show_user_notifications');
        },

        /**
        * Method: recent_posts
        *   Are we currently viewing the recent posts page?
        *
        * Returns:
        *   *boolean*
        */

        recent_posts: function(){
            return (this.__is_page('all_recent_posts') || this.__is_page("recent_posts"));
        },

        /**
        * Method: recent_threads
        *   Are we currently viewing the recent threads page?
        *
        * Returns:
        *   *boolean*
        */

        recent_threads: function(){
            return this.__is_page('recent_threads');
        },

        /**
        * Method: search
        *   Are we currently trying to search?
        *
        * Returns:
        *   *boolean*
        */

        search: function(){
            return this.__is_page('search');
        },

        /**
        * Method: search_results
        *   Are we viewing results of a search?
        *
        * Returns:
        *   *boolean*
        */

        search_results: function(){
            return this.__is_page('search_results');
        },

        /**
        * Method: thread
        *   Are we currently viewing a thread?
        *
        * Returns:
        *   *boolean*
        */
        
        thread: function(){
            // View thread
            return this.__is_page('thread');
        }
            
    };
 })();

/**
* Namespace: yootil.user.action
*   Used to find out what actions a user has recently performed, in terms of the website usage.
*/

yootil.user.action = (function(){
    var actionKey = "lastaction";
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
		*	Checks for a form to do with posting on the post page.
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
		* Method: edit_post_form
		*	Checks for a form to do with edit on the post page.
		*
		* Returns:
		*	*array* / *jQuery*
		*/
		
		edit_post_form: function(){
			if(yootil.location.check.editing_post()){
				return $("form.form_post_edit");
			}
			
			return [];
		},
		
		/**
		* Method: edit_thread_form
		*	Checks for edit thread form.
		*
		* Returns:
		*	*array* / *jQuery*
		*/
		
		edit_thread_form: function(){
			if(yootil.location.check.editing_thread()){
				return $("form.form_thread_edit");
			}
			
			return [];
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

/**
* Namespace: yootil.page
*	Wrapper around the ProBoards data object "page".
*/

yootil.page = (function(){

	return {
	
		/**
		* Method: __get_data
		*	This is an internal method
		*
		* Parameters:
		*	key - *string* The key on the page object to check and get
		*
		* Returns:
		*	*string*
		*/
		
		__get_data: function(key){
			if(proboards && proboards.dataHash && proboards.dataHash.page && typeof proboards.dataHash.page[key] != "undefined"){
				return proboards.dataHash.page[key];
			}
			
			return "";
		}
	
	};

})();

/**
* Namespace: yootil.page.category
*	Various methods to help get category information
*/

yootil.page.category = (function(){

	return {
	
		/**
		* Method: __get_data
		*	This is an internal method
		*
		* Parameters:
		*	key - *string* The key on the category object to check and get
		*
		* Returns:
		*	*string*
		*/
		
		__get_data: function(key){
			var cat_obj = yootil.page.__get_data("category");
			
			if(cat_obj && typeof cat_obj == "object" && cat_obj[key] != "undefined"){
				return cat_obj[key];
			}
			
			return "";
		},

		/**
		* Method: id
		*	Gets the category ID
		*
		* Returns:
		*	*integer*
		*/
		
		id: function(){
			return this.__get_data("id");
		},

		/**
		* Method: name
		*	Gets the category name
		*
		* Returns:
		*	*string*
		*/
		
		name: function(){
			return this.__get_data("name");
		}
	
	};

})();

/**
* Namespace: yootil.page.board
*	Various methods to help get board information
*/

yootil.page.board = (function(){

	return {
	
		/**
		* Method: __get_data
		*	This is an internal method
		*
		* Parameters:
		*	key - *string* The key on the board object to check and get
		*
		* Returns:
		*	*string*
		*/
		
		__get_data: function(key){
			var board_obj = yootil.page.__get_data("board");
			
			if(board_obj && typeof board_obj == "object" && board_obj[key] != "undefined"){
				return board_obj[key];
			}
			
			return "";
		},

		/**
		* Method: id
		*	Gets the board ID
		*
		* Returns:
		*	*integer*
		*/
		
		id: function(){
			return this.__get_data("id");
		},

		/**
		* Method: name
		*	Gets the board name
		*
		* Returns:
		*	*string*
		*/
		
		name: function(){
			return this.__get_data("name");
		},
		
		/**
		* Method: url
		*	Gets the board URL
		*
		* Returns:
		*	*string*
		*/
		
		url: function(){
			return this.__get_data("url");
		}
	
	};

})();

/**
* Namespace: yootil.page.member
*	Various methods to help get member information
*/

yootil.page.member = (function(){

	return {
	
		/**
		* Method: __get_data
		*	This is an internal method
		*
		* Parameters:
		*	key - *string* The key on the board object to check and get
		*
		* Returns:
		*	*string*
		*/
		
		__get_data: function(key){
			var member_obj = yootil.page.__get_data("member");
			
			if(member_obj && typeof member_obj == "object" && member_obj[key] != "undefined"){
				return member_obj[key];
			}
			
			return "";
		},

		/**
		* Method: id
		*	Gets the members ID
		*
		* Returns:
		*	*integer*
		*/
		
		id: function(){
			return this.__get_data("id");
		},

		/**
		* Method: name
		*	Gets the members name
		*
		* Returns:
		*	*string*
		*/
		
		name: function(){
			return this.__get_data("name");
		},
		
		/**
		* Method: url
		*	Gets the members URL
		*
		* Returns:
		*	*string*
		*/
		
		url: function(){
			return this.__get_data("url");
		}
	
	};

})();

/**
* Namespace: yootil.page.thread
*	Various methods to help get thread information
*/

yootil.page.thread = (function(){

	return {
	
		/**
		* Method: __get_data
		*	This is an internal method
		*
		* Parameters:
		*	key - *string* The key on the thread object to check and get
		*
		* Returns:
		*	*string*
		*/
		
		__get_data: function(key){
			var thread_obj = yootil.page.__get_data("thread");
			
			if(thread_obj && typeof thread_obj == "object" && thread_obj[key] != "undefined"){
				return thread_obj[key];
			}
			
			return "";
		},

		/**
		* Method: created_by
		*	Gets the thread creator
		*
		* Returns:
		*	*string*
		*/
		
		id: function(){
			return this.__get_data("created_by");
		},

		/**
		* Method: created_on
		*	Gets the thread creation date timestamp
		*
		* Returns:
		*	*string*
		*/
		
		id: function(){
			return this.__get_data("created_on");
		},

		/**
		* Method: id
		*	Gets the thread ID
		*
		* Returns:
		*	*integer*
		*/
		
		id: function(){
			return this.__get_data("id");
		},

		/**
		* Method: is_announcement
		*	Is the thread an announcement?
		*
		* Returns:
		*	*boolean*
		*/
		
		is_announcement: function(){
			return this.__get_data("is_announcement") === "1";
		},

		/**
		* Method: is_bookmarked
		*	Is the thread bookmarked?
		*
		* Returns:
		*	*boolean*
		*/
		
		is_bookmarked: function(){
			return this.__get_data("is_bookmarked") === "1";
		},

		/**
		* Method: is_falling
		*	Is the thread falling?
		*
		* Returns:
		*	*boolean*
		*/
		
		is_falling: function(){
			return this.__get_data("is_falling") === "1";
		},

		/**
		* Method: is_locked
		*	Is the thread locked?
		*
		* Returns:
		*	*boolean*
		*/
		
		is_locked: function(){
			return this.__get_data("is_locked") === "1";
		},

		/**
		* Method: is_new
		*	Is the thread new?
		*
		* Returns:
		*	*boolean*
		*/
		
		is_new: function(){
			return this.__get_data("is_new") === "1";
		},

		/**
		* Method: is_poll
		*	Is the thread a poll?
		*
		* Returns:
		*	*boolean*
		*/
		
		is_poll: function(){
			return this.__get_data("is_poll") === "1";
		},

		/**
		* Method: is_sticky
		*	Is the thread sticky?
		*
		* Returns:
		*	*boolean*
		*/
		
		is_sticky: function(){
			return this.__get_data("is_sticky") === "1";
		},

		/**
		* Method: subject
		*	Gets the thread subject
		*
		* Returns:
		*	*string*
		*/
		
		subject: function(){
			return this.__get_data("subject");
		},
		
		/**
		* Method: url
		*	Gets the thread URL
		*
		* Returns:
		*	*string*
		*/
		
		url: function(){
			return this.__get_data("url");
		}
	
	};

})();

/**
* Namespace: yootil.bar
*   Mimics the ProBoards Network bar, but on the left and for plugins.
*/

yootil.bar = (function(){

	var bar = {
		
		_bar: null,
		
		_items: {},
		
		_total_items: 0,
		
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
		*	id - *string* Pass in a unique ID if you wish to have the option to remove it later
		*	func - *function* Pass function to be executed when clicked on
		*	context - *mixed* Context of the function
		*/
		
		add: function(link, img, alt, id, func, context){
			if(this.has_bar()){
				if(link && img){
					var alt = alt || "";
					var item = $("<a href='" + link + "' style='margin-top: 3px; display: inline-block;'><img src='" + img + "' style='padding: 0px 3px;' alt='" + alt + "' title='" + alt + "' /></a>");
					
					if(id && id.toString().length){
						this._items["_" + id.toString()] = item;
					}
					
					if(func && typeof func == "function"){
						item.click(function(){
							return $.proxy(func, context)();
						});
					}
					
					this._total_items ++;
					this._bar.find("#yootil-bar").append(item);
					this.show_bar();
				}
			}
		},

		/**
		* Method: remove
		*	Use this to remove an item to the Yootil Bar
		*
		* Parameters:
		*	id - *string* The unique ID used when adding the item
		*
		* Returns:
		*	*boolean*
		*/
		
		remove: function(id){
			if(id && id.toString().length && this._items["_" + id.toString()]){
				this._items["_" + id.toString()].remove();
				delete this._items["_" + id.toString()];
				this._total_items --;
				
				if(this._bar.find("#yootil-bar a").length == 0){
					this._bar.css("display", "none");
				}
			}
		},

		/**
		* Method: total_items
		*	Find out how many items are currently sitting in the bar
		*
		* Returns:
		*	*integer"
		*/
		
		total_items: function(){
			return this._total_items;
		},
		
		/**
		* Method: get
		*	Use this to get the jQuery item (a tag)
		*
		* Parameters:
		*	id - *string* The unique ID used when adding the item
		*
		* Returns:
		*	*object* jQuery object is returned that wraps around the a tag
		*/
			
		get: function(id){
			if(id && id.toString().length && this._items["_" + id.toString()]){
				return this._items["_" + id.toString()];
			}
		},

		/**
		* Method: has
		*	Use this to see if an item exists in the bar
		*
		* Parameters:
		*	id - *string* The unique ID used when adding the item
		*
		* Returns:
		*	*boolean*
		*/
		
		has: function(id){
			if(id && id.toString().length && this._items["_" + id.toString()]){
				return true;
			}
			
			return false;
		},
		
		show_bar: function(){
			if(this._bar.find("#yootil-bar a").length > 0){
				var display = yootil.storage.get("yootil_bar", false);
				
				if(display){
					if(display.toString() == "1" || display.toString().length == 0){
						this._bar.find("#yootil-bar").css("display", "inline-block");
					} else {
						this._bar.find("> img").attr("src", "/images/button_collapse.png").attr("alt", ">");
						this._bar.find("#yootil-bar").css("display", "none");
					}
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
				
				yootil.storage.set("yootil_bar", ((yootil_bar.is(":visible"))? "1" : "0"), false, true);
			});
			
			$("body").append(plugin_bar);
		}
		
	});
	
    return bar;
    
})();