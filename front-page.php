	<?php get_header(); ?>

	<?php if (have_posts()) : ?>
		<?php while (have_posts()) : ?>
			<?php the_post(); ?>
			<main class="content" id="lqd-site-content" data-liquid-bg="true"
				data-liquid-bg-options='{ "interactWithHeader" :true }'>
				<?php include(locate_template('template-parts/modules.php', false, false)); ?>
			</main>
		<?php endwhile ?>
	<?php endif ?>

	<?php get_footer(); ?>