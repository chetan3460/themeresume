<?php
$description = get_sub_field('description');
$project_items = get_sub_field('project_items');

// Hiding and cosmetics/
include(locate_template('template-parts/blocks/hide_cosmetics.php', false, false));

if (($project_items || $description) && !$hide_block):
?>


    <section id="projects" class="lqd-section module-sec projects--block bg-pink-100  py-5 " data-section-luminosity="light">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <?php if ($description) : ?>
                        <div class="">
                            <p class="">
                                <?= $description; ?>
                            </p>
                        </div>
                    <?php endif; ?>


                    <div class="pinned-gallery">
                        <?php if (have_rows('project_items')): ?>
                            <?php while (have_rows('project_items')): the_row();
                                $project_images = get_sub_field('project_images');

                            ?>
                                <?php if ($project_images) : ?>

                                    <div class="pinned-image">
                                        <img loading="lazy" src="<?= wp_get_attachment_image_url($project_images, 'blur') ?>" data-src="<?= wp_get_attachment_image_url($project_images, 'full') ?>" alt="<?= esc_attr(get_post_meta($project_images, '_wp_attachment_image_alt', true)) ?: 'Section Image' ?>" class="w-full aspect-[0.76] lazy-image object-cover" />
                                    </div>
                                <?php endif; ?>
                            <?php endwhile; ?>

                        <?php endif; ?>
                    </div>


                </div>
            </div>
        </div>
    </section>

<?php
endif;
?>
<style>
    /*--------------------------------------------------
	Pinned Gallery
---------------------------------------------------*/

    .pinned-gallery {
        max-width: 800px;
        margin: 0 auto;
    }

    .pinned-image {
        box-sizing: border-box;
        padding-bottom: 300px;
        position: relative;
    }

    .pinned-image:first-child {
        padding-top: 0;
    }

    .pinned-image:last-child {
        z-index: 10;
        padding-bottom: 0px;
    }

    .rounded-borders .pinned-image img {
        border-radius: 8px;
    }
</style>