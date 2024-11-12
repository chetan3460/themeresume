<?php

/**
 * Webdelite functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 */

if (!defined('T_PREFIX')) define('T_PREFIX', 'wd');

require_once get_theme_file_path('/inc/theme-settings.php');
require_once get_theme_file_path('/inc/enqueue.php');
require_once get_theme_file_path('/inc/menu.php');
require_once get_theme_file_path('/inc/custom_post_types.php');
require_once get_theme_file_path('/inc/posts_func.php');


/**
 * I want to use the basic 2012 theme but don't want TinyMCE to create
 * unwanted HTML. By removing editor-style.css from the $editor_styles
 * global, this code effectively undoes the call to add_editor_style()
 */
add_action('after_setup_theme', 'foobar_setup', 11);
function foobar_setup()
{
  global $editor_styles;
  $editor_styles = array();
}
