<?php

/*
  =============================================================
  1.0 - Register Menu
  =============================================================
 */

function register_menus()
{
    register_nav_menus(
        array(
            'main-menu' => __('Main Menu'),
            'ham-menu' => __('Mobile Menu'),

        )
    );
}
add_action('init', 'register_menus');


/*
=============================================================
1.3- Add custom class to Wp-nav anchor tag
=============================================================
*/

function add_class_on_a_tag($classes, $item, $args)
{
    if (isset($args->add_a_class)) {
        $classes['class'] = $args->add_a_class;
    }
    return $classes;
}

add_filter('nav_menu_link_attributes', 'add_class_on_a_tag', 1, 3);


function add_additional_class_on_li($classes, $item, $args)
{
    if (isset($args->li_class)) {
        $classes[] = $args->li_class; // Add the class
    }
    return $classes;
}
add_filter('nav_menu_css_class', 'add_additional_class_on_li', 1, 3);
