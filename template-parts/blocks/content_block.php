<?php

$description = get_sub_field('description');



// Hiding and cosmetics/
include(locate_template('template-parts/blocks/hide_cosmetics.php', false, false));

if (($description) && !$hide_block) :
?>
    <section id="quotes" class=" lqd-section module-sec quotes--block bg-aqua min-h-100vh py-5 d-flex align-items-center justify-content-center fade-in" data-section-luminosity="light">
        <div class="container">
            <div class="row justify-content-center text-center">
                <div class="col-lg-7">
                    <!-- <p class="fs-5 lh-base text-uppercase fw-medium mb-2">My Moto</p> -->

                    <div class="quotes--wrapper reveal-type text-center">
                        <?php if ($description) : ?>
                            <h2 class=""><?= $description; ?></h2>
                        <?php endif; ?>

                    </div>
                    <!-- <small class="fs-6 lh-base text-center text-uppercase fw-medium mt-4 d-block">— John Johnson</small> -->
                </div>

            </div>
        </div>

    </section>

<?php endif; ?>