(function() {
	tinymce.create('tinymce.plugins.embedtweet', {
		init : function(ed, url) {
			ed.addCommand('embedtweetcmd', function() {
				ed.windowManager.open({
				  	url: url + '/file.php',
				  	width: 600 + parseInt(ed.getLang("media.delta_width",0)),
				  	height: 200 + parseInt(ed.getLang("media.delta_height",0)),
					title: 'Easy Embed Tweet',
					inline: 1
				}, {
				  	plugin_url : url,
					s_permalink : "[tweetlink]"
				});
			}),
			ed.addButton('embedtweet', {
				title : 'Easy Embed Tweet',
				image : url + '/css/images/embedtweet.png',
				cmd : 'embedtweetcmd'
			}),
			ed.addShortcut('ctrl+shift+e', 'Easy Tweet Embed', 'embedtweetcmd');
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
				version : "1.6.1"
			};
		}
	});
	tinymce.PluginManager.add('embedtweet', tinymce.plugins.embedtweet);
	
})();