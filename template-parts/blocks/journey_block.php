<?php
$heading = get_sub_field('heading');
$description = get_sub_field('description');
$journey_items = get_sub_field('journey_items');

// Hiding and cosmetics/
include(locate_template('template-parts/blocks/hide_cosmetics.php', false, false));

if (($heading || $description) && !$hide_block):
?>

    <section id="journey" class="lqd-section module-sec journey--block bg-orange-100 min-h-100vh py-5 d-flex align-items-center justify-content-center fade-in overflow-hidden" data-section-luminosity="light">
        <div class="">
            <div class="row">
                <div class="col-lg-12 sec-title-animation animation-style2">
                    <div class="journey--wrapper d-flex align-items-center justify-content-center flex-column gap-5 mb-5 text-center">
                        <?php if ($heading) : ?>
                            <h2 class="title-animation">
                                <?= $heading; ?>
                            </h2>
                        <?php endif; ?>

                        <?php if ($description) : ?>
                            <p class="fs-4 lh-base" letters-fade-in-random text-split>
                                <?= $description; ?>
                            </p>
                        <?php endif; ?>

                        </p>
                    </div>

                </div>
                <div>
                    <?php if (have_rows('journey_items')): ?>

                        <ul class="journey--lists-wrapper position-relative d-block flex-lists-wrapper">
                            <?php while (have_rows('journey_items')): the_row();
                                $year = get_sub_field('year');
                                $job_title = get_sub_field('job_title');
                                $company_name = get_sub_field('company_name');
                                $delay = $delay + 0.2;
                            ?>
                                <li class="journey--flex-list link has-animation">

                                    <?php if ($year) : ?>
                                        <span class="flex-list-left"><?= $year; ?></span>
                                    <?php endif; ?>

                                    <?php if ($job_title) : ?>
                                        <span class="flex-list-center">
                                            <?= $job_title; ?>
                                        </span>
                                    <?php endif; ?>

                                    <?php if ($company_name) : ?>
                                        <span class="flex-list-right">
                                            <?= $company_name; ?>
                                        </span>
                                    <?php endif; ?>

                                </li>
                            <?php endwhile; ?>

                        </ul>
                    <?php endif; ?>

                </div>
            </div>
        </div>

    </section>








<?php
endif;
?>