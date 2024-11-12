<?php
$description = get_sub_field('description');
$project_items = get_sub_field('project_items');

// Hiding and cosmetics/
include(locate_template('template-parts/blocks/hide_cosmetics.php', false, false));

if (($project_itemsproject_items || $description) && !$hide_block):
?>


    <section id="projects" class="lqd-section module-sec projects--block bg-pink-100 min-h-100vh py-5 d-flex align-items-center justify-content-center fade-in" data-section-luminosity="light">
        <div class="container">
            <div class="row">
                <!-- Row -->
                <div class="content-row full row_padding_left row_padding_right dark-section text-align-center change-header-color disable-header-gradient" data-bgcolor="#0c0c0c">


                    <div class="slowed-pin">
                        <?php if ($description) : ?>
                            <div class="slowed-text">
                                <h2 class="big-title" letters-fade-in-random text-split>
                                    <?= $description; ?>
                                </h2>
                            </div>
                        <?php endif; ?>

                        <?php if (have_rows('project_items')): ?>

                            <div class="slowed-images">
                                <?php while (have_rows('project_items')): the_row();
                                    $project_images = get_sub_field('project_images');

                                ?>
                                    <div class="slowed-image">

                                        <?php if ($project_images) : ?>
                                            <img loading="lazy" src="<?= wp_get_attachment_image_url($project_images, 'blur') ?>" data-src="<?= wp_get_attachment_image_url($project_images, 'full') ?>" alt="<?= esc_attr(get_post_meta($project_images, '_wp_attachment_image_alt', true)) ?: 'Section Image' ?>" class="w-full aspect-[0.76] lazy-image object-cover" />
                                        <?php endif; ?>
                                    </div>
                                <?php endwhile; ?>

                            </div>
                        <?php endif; ?>

                    </div>

                </div>
                <!--/Row -->
            </div>
        </div>
    </section>
<?php
endif;
?>