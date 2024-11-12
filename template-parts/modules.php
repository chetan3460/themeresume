<?php if (have_rows('panels')) : ?>
    <div id="lqd-contents-wrap" class="flex-modules">

        <?php if (have_rows('panels')) : ?>
            <?php while (have_rows('panels')) : ?>
                <?php
                the_row();
                $layout = get_row_layout();
                get_template_part('template-parts/blocks/' . $layout);
                ?>
            <?php endwhile ?>
        <?php endif ?>
    </div>
<?php endif ?>