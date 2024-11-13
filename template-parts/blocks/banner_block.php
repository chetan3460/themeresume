<?php
$banner_title = get_sub_field('banner_title');
$banner_subtitle = get_sub_field('banner_subtitle');
$banner_description = get_sub_field('banner_description');

// Hiding and cosmetics/
include(locate_template('template-parts/blocks/hide_cosmetics.php', false, false));

if (($banner_title || $banner_description) && !$hide_block):
?>
    <!-- Banner Block -->




    <!-- Start Banner -->
    <section id="home" class="lqd-section  banner--block d-flex align-items-center justify-content-center min-h-100vh bg-purple-100 w-100 position-relative pt-md-0 pt-10"
        data-section-luminosity="light">


        <div class="container">
            <div class="row">
                <div class="col col-12 relative text-center ">
                    <?php if ($banner_subtitle) : ?>
                        <p class="banner--intro-text fs-3 fw-bold mx-auto text-uppercase">
                            <?= $banner_subtitle; ?>
                            <!-- hey,i’m chetan. -->
                        </p>
                    <?php endif; ?>

                    <?php if ($banner_title) : ?>
                        <h1 class="my-2">
                            <?= $banner_title; ?>

                        </h1>
                    <?php endif; ?>

                    <?php if ($banner_description) : ?>
                        <p class="text-description text-uppercase fw-semibold mt-md-5 mt-3 mx-auto">
                            <?= $banner_description; ?>
                        </p>
                    <?php endif; ?>

                </div>
            </div>
        </div>
    </section>
    <!-- End Banner -->







<?php
endif;
?>