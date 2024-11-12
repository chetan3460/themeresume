<?php
$heading = get_sub_field('heading');
$description = get_sub_field('description');
$skills_items = get_sub_field('skills_items');

// Hiding and cosmetics/
include(locate_template('template-parts/blocks/hide_cosmetics.php', false, false));

if (($heading || $description) && !$hide_block):
?>
    <!-- Banner Block -->


    <section id="skills" class="skills--block lqd-section module-sec bg-green-100 min-h-100vh py-5 fade-in overflow-hidden" data-section-luminosity="light">
        <div class="container">
            <div class="row">
                <div class="col-12 sec-title-animation animation-style2">
                    <div class="text-center d-flex flex-column gap-md-5 gap-4 ">
                        <?php if ($heading) : ?>
                            <h2 class="title-animation">
                                <?= $heading; ?>
                            </h2>
                        <?php endif; ?>
                        <?php if ($description) : ?>
                            <p class="fs-5 lh-base" letters-fade-in-random text-split>
                                <?= $description; ?>
                            </p>
                        <?php endif; ?>

                    </div>
                    <div class="skills--grid mt-lg-7 mt-5">
                        <?php if (have_rows('skills_items')): ?>

                            <div class="skills--container">
                                <?php while (have_rows('skills_items')): the_row();
                                    $skills_title = get_sub_field('skills_title');
                                    $delay = $delay + 0.2;
                                ?>

                                    <div class="skills--item  py-lg-4 py-3  d-flex flex-lg-row flex-column align-items-center align-self-stretch justify-content-between  position-relative ">
                                        <?php if ($skills_title) : ?>
                                            <div class="skills-title p-2">
                                                <h3> <?= $skills_title; ?></h3>
                                            </div>
                                        <?php endif; ?>

                                        <?php if (have_rows('skills_list')): ?>
                                            <div class="skills_list d-flex align-items-center justify-content-end gap-3">
                                                <?php
                                                $is_first = true;
                                                while (have_rows('skills_list')): the_row();
                                                    $skills_title = get_sub_field('skills_title');
                                                    if (!$is_first) : ?>
                                                        <div class="skills_divider"></div>
                                                    <?php endif; ?>
                                                    <div class="skills_list-item">
                                                        <?= htmlspecialchars($skills_title); ?>
                                                    </div>
                                                    <?php $is_first = false; ?>
                                                <?php endwhile; ?>
                                            </div>
                                        <?php endif; ?>
                                        <div class="line-under"></div>
                                    </div>
                                <?php endwhile; ?>

                            </div>
                        <?php endif; ?>

                    </div>
                </div>
            </div>
        </div>
    </section>



<?php
endif;
?>