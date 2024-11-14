<?php

$description = get_sub_field('description');

// Hiding and cosmetics/
include(locate_template('template-parts/blocks/hide_cosmetics.php', false, false));

if (($description) && !$hide_block) :
?>
    <section id="quotes" class=" lqd-section module-sec quotes--block bg-aqua  py-5 d-flex align-items-center justify-content-center" data-section-luminosity="light">
        <div class="container">
            <div class="row justify-content-center text-center">
                <div class="col-lg-7">

                    <div class="quotes--wrapper reveal-type text-center">
                        <?php if ($description) : ?>
                            <h2 class=""><?= $description; ?></h2>
                        <?php endif; ?>

                    </div>

                </div>

            </div>
        </div>

    </section>

<?php endif; ?>