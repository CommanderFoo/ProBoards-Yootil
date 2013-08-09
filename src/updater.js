yootil.updater = (function(){
	
	return {
		
		init: function(){
			if(yootil.settings){
				this.check_version();
			}
			
			return this;
		},
		
		check_version: function(){
			if(yootil.settings.check_for_update && yootil.user.logged_in() && yootil.user.is_staff()){
				var data = yootil.storage.get("yootil_last_check", true);
				var first_data = false;
				
				if(!data || !data.t){
					first_data = true;
					
					data = {
						t: (+ new Date()),
						v: yootil.VERSION
					};
				}
				
				var DAY = (86400 * 1000);
				var WEEK = (DAY * 7);
				var WEEK_2 = (WEEK * 2);
				var WEEK_3 = (WEEK * 3);
				var MONTH = (WEEK_2 * 2);
				
				var check_ts = 0;
				
				switch(parseInt(yootil.settings.how_often)){
				
					case 1 :
					case 2 :
					case 3 :
					case 4 :
					case 5 :
					case 6 :
					case 7 :
						check_ts = (DAY * parseInt(yootil.settings.how_often));
						break;
						
					case 8 :
						check_ts = WEEK_2;
						break
						
					case 9 :
						check_ts = WEEK_3;
						break
						
					case 10 :
						check_ts = MONTH;
						break
						
				}
				
				var now = (+ new Date());
					
				if((data.t + check_ts) < now){
					var self = this;
					
					$.ajax({
						url: "http://pixeldepth.net/proboards/plugins/yootil/updates/update_check.php?t=" + (+ new Date),
						context: this,
						crossDomain: true,
						dataType: "json"				
					}).done(function(latest){
						data = {
							t: (+ new Date()),
							v: latest.v
						};
						
						yootil.storage.set("yootil_last_check", data, true, true);
					});
				}
				
				var versions = yootil.convert_versions(yootil.VERSION, data.v);
				
				if(versions[0] < versions[1]){
					var msg = "<div class='yootil-notification-content'>";
					
					msg += "<p>There is a new <strong>Yootil Library</strong> version available to install / download for this forum.</p>";
					msg += "<p>This forum currently have version <strong>" + yootil.VERSION + "</strong> installed, the latest version available to install is <strong>" + data.v + "</strong>.</p>";
					msg += "<p>It is <strong>highly recommended</strong> to update to the latest version of this plugin.</p>";
					msg += "<p style='margin-top: 8px;'>For more information, please visit the <a href='http://support.proboards.com/thread/429360/'>Yootil Library</a> forum topic on the <a href='http://support.proboards.com'>ProBoards forum</a>.</p>";
					msg += "<p style='margin-top: 8px;'>This message can be disabled from the Yootil Library settings.</p>";
					msg += "<p style='margin-top: 8px;'><a href='http://proboards.com/library/plugins/item/38'>ProBoards Plugin Library Link</a> | <a href='http://support.proboards.com/thread/429360/'>ProBoards Yootil Library Forum Link</a></p>";
					msg += "</div>";
					
					var notification = yootil.create.container("Staff Notification: Yootil Library Update Notice", msg).show().addClass("yootil-notification");
					
					$(function(){
						$("div#content").prepend(notification);
					});
				}
				
				if(first_data){
					yootil.storage.set("yootil_last_check", data, true, true);
				}
			}
		}
		
	};

})().init();