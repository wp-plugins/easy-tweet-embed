
jQuery(document).ready(function(){	
	
	var anchorText = jQuery('#embedtweet-text');
	var tweet = jQuery('#embedtweet-tweet');
	var counterTweetField = jQuery('#counter-tweet');
	var copyButton = jQuery('#embedtweet-copylink');
	var submitButton = jQuery('#embedtweet-submit');

	// function for counting tweet length
	var tCounter = function() {
		return 140 - twttr.txt.getTweetLength(tweet.val());
	};
	
	var countTweetText = function() {
		counterTweetField.html( tCounter() + ' characters left');
		if(tCounter() >= 0) {
			counterTweetField.css("color", "black");
		} else {
			counterTweetField.css("color", "red");
		}
	};
	
	var tweetLink = "https://twitter.com/intent/tweet?text=";
	
	// bind on key up event  
	tweet.keyup(function(){
		countTweetText();
	});
	
	// function for Anchor Text filler if there is a selection
	anchorText.each(function() {
		var selectedText = tinyMCE.activeEditor.selection.getContent();
		if(selectedText !== "") {
			jQuery(this).val(selectedText).css('color','#000');
		}
	});
	
	// function for Tweet Text filler if there is a selection
	tweet.each(function() {
		var selectedText = tinyMCE.activeEditor.selection.getNode().href;
		if(selectedText !== undefined && selectedText.indexOf(tweetLink) !== -1){
			var tweetText = decodeURIComponent(selectedText.replace(tweetLink, ""));
			if(tweetText !== "") {
				jQuery(this).val(tweetText);
			}
		}
		countTweetText();
	});
	
	// function for insert permalink on Tweet Text
	copyButton.click(function(){
		var sPermalink = tinyMCEPopup.getWindowArg('s_permalink');
		if(tweet.val() === tweet.attr('placeholder')) {
			tweet.val(sPermalink);
			countTweetText();
			tweet[0].selectionStart = tweet[0].selectionEnd = tweet.val().length;
			tweet.css('color', '#000');
		} else {
			tweet.val(tweet.val() + " " + sPermalink);
			countTweetText();
			tweet[0].selectionStart = tweet[0].selectionEnd = tweet.val().length;
		} 
	});
	
	// handles the click event of the submit button
	submitButton.click(function(){
		if(tCounter() >= 0 && anchorText.val() !== "") {
			// var tweetString = tweet.val().split("[tweetlink]");

			var tweetUrl = '<a class="embedtweet" title="' + anchorText.val();
			tweetUrl += '" href="https://twitter.com/intent/tweet?text=';
			// for (var i = 0; i < tweetString.length; i++) {
			// 	tweetUrl += encodeURIComponent(tweetString[i]);
			// 	tweetUrl += '[tweetlink]';
			// };
			tweetUrl += encodeURIComponent(tweet.val());

			tweetUrl += '" rel="nofollow" target="_blank">';
			tweetUrl += anchorText.val() + '</a>';
			tweetUrl = tweetUrl.replace(/%5Btweetlink%5D/g, "[tweetlink]");

			// inserts the shortcode into the active editor and close it
			tinyMCEPopup.editor.execCommand('mceInsertContent', 0, tweetUrl);
			tinyMCEPopup.close();
		} else if(tCounter() >= 0 && anchorText.val() === "") {
			alert("Please fill Anchor Text field");
		} else if(tCounter() < 0 && anchorText.val() !== "") {
			alert("Your tweet is more than 140 character, please make it shorter and submit again.");
		} else {
			alert("Your tweet is more than 140 character, please make it shorter and submit again and please fill Anchor Text field");
		}
	});
	
	jQuery('[placeholder]').focus(function() {
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

	// Outbound Link Tracking with Google Analytics
	// Requires jQuery 1.7 or higher (use .live if using a lower version)
	jQuery("a.embedtweet").on('click',function(e){
		var url = jQuery(this).attr("href");
		if (e.currentTarget.host != window.location.host) {
			_gaq.push(['_trackEvent', 'Easy Embed Tweet', e.currentTarget.host, url, 0]);
			if (e.metaKey || e.ctrlKey) {
				var newtab = true;
			}
			if (!newtab) {
				e.preventDefault();
				setTimeout('document.location = "' + url + '"', 100);
			}
		}
	});
});