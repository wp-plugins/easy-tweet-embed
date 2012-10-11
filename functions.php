<?php
/*
Plugin Name: Easy Tweet Embed
Plugin URI: http://www.leavingworkbehind.com/easy-tweet-embed/
Description: Allows you to easily embed pre-formatted tweets within your blog posts.
Version: 1.6.1
Author: Tom Ewer and Tito Pandu
Author URI: http://www.leavingworkbehind.com/easy-tweet-embed/
*/

function embedtweet_func( $atts, $content=null ) {
	extract( shortcode_atts( array(
		'text' => 'anchor text',
		'tweet' => 'tweet',
	), $atts ) );

	return '<a title="'.$text.'" href="https://twitter.com/intent/tweet?text='.rawurlencode($tweet).'" rel="nofollow" target="_blank">'.$text.'</a>';

}

function embedtweet_addbuttons() {
	// Don't bother doing this stuff if the current user lacks permissions
	if ( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') )
		return;

	// Add in TinyMCE editor
	if ( get_user_option('rich_editing') == 'true') {
		add_filter("mce_external_plugins", "add_embedtweet_tinymce_plugin");
		add_filter('mce_buttons', 'register_embedtweet_button');
	}
}

function register_embedtweet_button($buttons) {
	array_push($buttons, "|", "embedtweet");
	return $buttons;
}
 
// Load the TinyMCE plugin : editor_plugin.js (wp2.5)
function add_embedtweet_tinymce_plugin($plugin_array) {
	$plugin_array['embedtweet'] = plugin_dir_url( __FILE__ ) . 'editor_plugin.js';
	return $plugin_array;
}

if ( !function_exists('embedtweet_addfullscreen_buttons') ) {
	function embedtweet_addfullscreen_buttons($buttons) {
		// add a separator
		$buttons[] = 'separator';
		// format: title, onclick, show in both editors
		$buttons['embedtweet'] = array(
			// Title of the button
			'title' => __('Easy Tweet Embed'),
			// Command to execute
			'onclick' => "tinyMCE.execCommand('embedtweetcmd');",
			// Show on visual AND html mode
			'both' => false
		);
		return $buttons;
	}
	add_filter( 'wp_fullscreen_buttons', 'embedtweet_addfullscreen_buttons' );
}

add_shortcode( 'embedtweet', 'embedtweet_func' );
// init process for button control
add_action('init', 'embedtweet_addbuttons');

function embedtweetscript() {
	wp_register_style( 'custom_wp_admin_css', plugins_url('css/easy-tweet-embed.css', __FILE__) );
	wp_enqueue_style( 'custom_wp_admin_css' );

	global $post; 
	$getPostID = get_permalink($post->ID);
	wp_enqueue_script( 'custom_wp_admin_script', plugins_url('js/additional.js', __FILE__) );
	wp_localize_script( 'custom_wp_admin_script', 'getPostID', $getPostID );
}

add_action( 'admin_enqueue_scripts', 'embedtweetscript' );