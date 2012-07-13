
jQuery(function(){	
	var form = jQuery('#TB_inline');
	
	// function for counting tweet length
	var tCounter = function() {
		return 140 - twttr.txt.getTweetLength(form.find('#embedtweet-tweet').val());
	};
	
	var tweet = jQuery('#embedtweet-tweet');
	
	var counterTweetField = tweet.parent().find('#counter-tweet');
	
	var tweetLink = "https://twitter.com/intent/tweet?text=";
	
	// function for counting character on EmbedTweet Input
	form.find('#embedtweet-tweet').each(function() {  
		counterTweetField.html( tCounter() + ' characters left');
		
		// bind on key up event  
		jQuery(this).keyup(function(){
			counterTweetField.html( tCounter() + ' characters left');
			if(tCounter() >= 0) {
				counterTweetField.css("color", "black");
			} else {
				counterTweetField.css("color", "red");
			}
		});  
	});
	
	// function for Anchor Text filler if there is a selection
	form.find('#embedtweet-text').each(function() {
		var anchorText = tinyMCE.activeEditor.selection.getContent();
		if(anchorText !== "") {
			form.find(this).val(anchorText);
		}
	});
	
	// function for Tweet Text filler if there is a selection
	form.find('#embedtweet-tweet').each(function() {
		var selectedText = tinyMCE.activeEditor.selection.getNode().href;
		if(selectedText !== undefined && selectedText.indexOf(tweetLink) !== -1){
			var tweetText = decodeURIComponent(selectedText
																				.replace(tweetLink, ""));
			if(tweetText !== "") {
				form.find(this).val(tweetText);
			}
		}
	});
	
	// function for insert permalink on Tweet Text
	form.find('#embedtweet-copylink').click(function(){
		var sPermalink = tinyMCEPopup.getWindowArg('s_permalink');
		if(tweet.val() === tweet.attr('placeholder')) {
			tweet.val(sPermalink);
			counterTweetField.html( tCounter() + ' characters left');
			tweet[0].selectionStart = tweet[0].selectionEnd = tweet.val().length;
			tweet.css('color', '#000');
		} else {
			tweet.val(tweet.val() + " " + sPermalink);
			counterTweetField.html( tCounter() + ' characters left');
			tweet[0].selectionStart = tweet[0].selectionEnd = tweet.val().length;
		} 
	});
	
	// handles the click event of the submit button
	form.find('#embedtweet-submit').click(function(){
		if(tCounter() >= 0 && form.find('#embedtweet-text').val() !== "") {
			/*	
			var shortcode = '[embedtweet';
			shortcode += ' text="' + form.find('#embedtweet-text').val() + '"';
			shortcode += ' tweet="' + form.find('#embedtweet-tweet').val() + '"';
			shortcode += ']';
			*/
			
			var tweetUrl = '<a title="' + form.find('#embedtweet-text').val();
			tweetUrl += '" href="https://twitter.com/intent/tweet?text=';
			tweetUrl += encodeURIComponent(form.find('#embedtweet-tweet').val());
			tweetUrl += '" rel="nofollow" target="_blank">';
			tweetUrl += form.find('#embedtweet-text').val() + '</a>';
			
			// inserts the shortcode into the active editor and close it
			tinyMCEPopup.editor.execCommand('mceInsertContent', 0, tweetUrl);
			tinyMCEPopup.close();
		} else if(tCounter() >= 0 && form.find('#embedtweet-text').val() === "") {
			window.alert("Please fill Anchor Text field");
		} else if(tCounter() < 0 && form.find('#embedtweet-text').val() !== "") {
			window.alert("Your tweet is more than 140 character, please make it shorter and submit again.");
		} else {
			window.alert("Your tweet is more than 140 character, please make it shorter and submit again and please fill Anchor Text field");
		}
	});
	
	form.find('[placeholder]').focus(function() {
		var input = jQuery(this);
		if (input.val() === input.attr('placeholder')) {
			input.val('');
			input.removeClass('placeholder');
		}
	}).blur(function() {
		var input = jQuery(this);
		if (input.val() === '' || input.val() === input.attr('placeholder')) {
			input.addClass('placeholder');
			input.val(input.attr('placeholder'));
		}
	}).blur();
	
});