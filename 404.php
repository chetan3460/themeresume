<?php

/**
 * The template for displaying 404 pages (Not Found)
 *
 */

get_header();

?>
<!-- 404 Block -->
<section class="page-not-found--block d-flex align-items-center justify-content-center text-white text-center">
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="page-not-found--main-wrapper">
                    <h1>
                        <span class="text-1">Error </span>
                        404
                    </h1>
                    <p>Oops! Page not found</p>
                    <a href="<?php echo esc_url(home_url('/')) ?>" class="btn">Go to Homepage</a>
                </div>
            </div>
        </div>
    </div>
</section>

<?php get_footer(); ?>