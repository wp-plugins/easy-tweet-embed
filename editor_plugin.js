(function() {
	tinymce.create('tinymce.plugins.embedtweet', {
		init : function(ed, url) {
			ed.addButton('embedtweet', {
				title : 'Easy Embed Tweet',
				image : url + '/embedtweet.png',
				onclick : function() {
					/*
						This is the old way.
						var tweet = prompt("Your Tweet", "Enter the tweet you want to insert");
						if (tweet != null && tweet != 'undefined')
							ed.execCommand('mceInsertContent', false, '[embedtweet text="'+text+'" tweet="'+tweet+'"]');
					
						var width = jQuery(window).width(), W = ( 720 < width ) ? 720 : width;
						W = W - 250;
						tb_show('Easy Embed Tweet', 
										'#TB_inline?height=250&width=' + W + '&inlineId=embedtweet-form' );
					*/
					ed.windowManager.open({
					  url: url + '/file.php',
					  width: 600 + parseInt(ed.getLang("media.delta_width",0)),
					  height: 200 + parseInt(ed.getLang("media.delta_height",0)),
						title: 'Easy Embed Tweet',
						inline: 1
					}, {
					  plugin_url : url,
						s_permalink : jQuery('#sample-permalink').text()
					});
				}
			});
		},
		createControl : function(n, cm) {
			return null;
		},
		getInfo : function() {
			return {
				longname : "Easy Embed Tweet",
				author : 'Tom Ewer and Tito Pandu',
				authorurl : 'http://www.leavingworkbehind.com/',
				infourl : 'http://www.leavingworkbehind.com/',
				version : "1.5.1"
			};
		}
	});
	tinymce.PluginManager.add('embedtweet', tinymce.plugins.embedtweet);
	
})();