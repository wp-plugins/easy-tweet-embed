<?php
	$admin = dirname( __FILE__ ) ;
	$admin = substr( $admin , 0 , strpos( $admin , "wp-content" ) ) ;
	require_once( $admin . 'wp-admin/admin.php' ) ;
	
?>
<head>
	<title>Easy Embed Tweet</title>
	<script type="text/javascript" src="<?php echo get_option('siteurl')."/wp-includes/js/tinymce/tiny_mce_popup.js"?>"></script>
	<link href="css/styles.css" rel="stylesheet">
</head>
<body>
	<form class="form-horizontal" id="TB_inline">
		<div class="control-group">
			<label class="control-label" for="embedtweet-text">Anchor Text</label>
			<div class="controls">
				<input type="text" name="text" id="embedtweet-text" placeholder="Tweet this" value="">
			</div>
		</div>
		<div class="control-group">
			<label class="control-label" for="embedtweet-tweet">Tweet</label>
			<div class="controls">
				<textarea name="tweet" id="embedtweet-tweet" cols="60" rows="3" placeholder="Your tweet goes here..."></textarea>
				<p class="help-block"><span id="counter-tweet"></span></p>
			</div>
		</div>
		<div class="form-actions">
			<button type="button" class="button" id="embedtweet-copylink" name="insert">Insert Permalink</button><br>
			<button type="submit" class="button-primary" id="embedtweet-submit" name="submit">Insert Tweet</button><br>
		</div>
	</form>
	<script type="text/javascript" src="<?php echo get_option('siteurl')."/wp-includes/js/jquery/jquery.js"?>"></script>
	<script type="text/javascript" src="js/twitter-text.js"></script>
	<script type="text/javascript" src="js/scripts.js"></script>
</body>