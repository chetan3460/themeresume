<?php

/*
=============================================================
1.1 - Get page url based on template
=============================================================
*/

function getTplPageURL($template_name)
{
    $url = null;
    $pages = get_pages(array(
        'meta_key' => '_wp_page_template',
        'meta_value' => $template_name
    ));
    if (isset($pages[0])) {
        $url = get_page_link($pages[0]->ID);
    }
    return $url;
}

/*
=============================================================
1.2 - Image Placeholder
=============================================================
*/
function get_image_with_fallback($image_id, $size = 'full', $placeholder = 'placeholder.jpg')
{
    // Check if image exists, otherwise use placeholder
    $image_url = $image_id ? wp_get_attachment_image_url($image_id, $size) : get_template_directory_uri() . '/assets/images/' . $placeholder;

    // Get alt text or default to 'Placeholder Image'
    $alt_text = $image_id ? esc_attr(get_post_meta($image_id, '_wp_attachment_image_alt', true)) : 'Placeholder Image';

    return [
        'url' => $image_url,
        'alt' => $alt_text
    ];
}
