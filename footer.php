<?php
$enquiry_text = get_field("enquiry_text", "options");
$contact_title = get_field("contact_title", "option");
$contact_btn = get_field("contact_btn", "option");
$contact_email = get_field("contact_email", "option");
$contact_number = get_field("contact_number", "option");
$marque_text_1 = get_field("marque_text_1", "option");
$marque_text_2 = get_field("marque_text_2", "option");
$follow = get_field('follow_us', 'option');

?>
<footer id="site-footer" class="main-footer footer" data-sticky-footer="true">
    <section id="contact" class="lqd-section footer-content" data-section-luminosity="dark">
        <div class="footer__inner py-lg-10  bg-slate-100">
            <div class="container">
                <div class="row items-center">
                    <div class="col col-12 col-lg-7 mb-lg-7 mb-5">

                        <?php if ($enquiry_text) : ?>
                            <p class="fs-base lh-base fw-normal text-black">
                                <?= $enquiry_text; ?>
                            </p>
                        <?php endif; ?>

                    </div>


                    <div class="col-12 d-flex align-items-center justify-content-between flex-wrap gap-lg-0 gap-5 mb-lg-10 mb-6">
                        <div class="">
                            <?php if ($contact_title) : ?>
                                <h2 class="text-grey  text-dark module-btn folks-text">
                                    <?= $contact_title; ?>
                                </h2>
                            <?php endif; ?>

                        </div>
                        <div class="d-flex flex-lg-row flex-column flex align-items-lg-center align-items-start gap-lg-7 gap-5">
                            <div class="divider-separator"></div>
                            <?php if (!empty($contact_btn)) : ?>
                                <h3 class="mb-0 module-title text-dark text-uppercase">
                                    <?= $contact_btn['title']; ?>
                                </h3>
                            <?php endif; ?>

                        </div>
                    </div>


                    <div class="col col-12 d-flex flex-lg-row flex-column justify-content-between gap-lg-0 gap-5">
                        <div class="d-flex flex-wrap flex-md-row flex-column module-info gap-md-4 gap-1 text-dark">
                            <?php if ($contact_email) : ?>

                                <div class=" d-flex  flex-lg-row flex-column align-items-start px-15 sm:w-full module-email">
                                    <p class=" mb-0 text-15">Contact me:
                                        <a class="mb-0 text-22 font-bold" href="mailto:<?= $contact_email; ?>"><?= $contact_email; ?></a>
                                    </p>

                                </div>
                            <?php endif; ?>

                            <?php if ($contact_number) : ?>

                                <div class=" d-flex  flex-lg-row flex-column items-start px-15 sm:w-full">
                                    <p class=" mb-0 text-15">Say hello:
                                        <a class=" mb-0 text-22 font-bold" href="mailto:<?= $contact_number; ?>"><?= $contact_number; ?></a>
                                    </p>
                                    <!-- <p class=" mb-0 text-22 font-bold"><?= $contact_number; ?>/p> -->



                                </div>
                            <?php endif; ?>

                        </div>
                        <!-- Follow block -->
                        <?php if ($follow) :

                            $social_links = $follow['social_links'];
                            $instagram = $social_links['instagram'];
                            $facebook = $social_links['facebook'];
                            $linkedin = $social_links['linkedin'];
                        ?>
                            <div class="lqd-fancy-menu lqd-custom-menu flex justify-end md:justify-start">
                                <?php if ($social_links) : ?>

                                    <ul class="reset-ul inline-nav d-flex align-items-center gap-3">
                                        <?php if ($facebook) : ?>
                                            <li class="w-auto inline-flex mx-45">
                                                <a aria-label="facebook" href="<?= $facebook ?>" class="" target="_blank"> Fb.</a>
                                            </li>
                                        <?php endif; ?>
                                        <?php if ($instagram) : ?>
                                            <li class="w-auto inline-flex mx-45">
                                                <a href="<?= $instagram ?>" class="" target="_blank"> Tw.</a>
                                            </li>
                                        <?php endif; ?>
                                        <?php if ($linkedin) : ?>
                                            <li class="w-auto inline-flex mx-45">
                                                <a href="#" class="" target="_blank"> Li</a>
                                            </li>
                                        <?php endif; ?>

                                    </ul>
                                <?php endif; ?>

                            </div>
                        <?php
                        endif; ?>
                    </div>

                </div>
            </div>
        </div>
        <!-- <a href="#" class="footer__marquee" data-popup="contact">
            <div class="footer__marquee-wrap">
                <?php if ($marque_text_1) : ?>
                    <div class="footer__marquee-item heading"> <?= $marque_text_1; ?>
                    </div>
                <?php endif; ?>

                <?php if ($marque_text_2) : ?>

                    <div class="footer__marquee-item heading">
                        <?= $marque_text_2; ?>
                    </div>
                <?php endif; ?>
            </div>
            <div class="footer__cursor">
                <div class="arr-hover footer__cursor-main">
                    <div class="footer__cursor-txt txt-20 txt-bold"> Say Hi! </div>
                    <div class="arr-wrap arr-wrap-24">
                        <div class="arr-ic-main icon icon-24"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M22.8301 2.76091L2.25005 23.341L0.659058 21.75L21.2392 1.16992L22.8301 2.76091Z" fill="currentColor"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.375 1.125H22.875V20.625H20.625V3.375H3.375V1.125Z" fill="currentColor"></path>
                            </svg> </div>
                        <div class="arr-ic-clone icon icon-24"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M22.8301 2.76091L2.25005 23.341L0.659058 21.75L21.2392 1.16992L22.8301 2.76091Z" fill="currentColor"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.375 1.125H22.875V20.625H20.625V3.375H3.375V1.125Z" fill="currentColor"></path>
                            </svg> </div>
                    </div>
                </div>
            </div>
        </a> -->
    </section>
</footer>
<!-- Go to top button -->

<div id="gotoTop" class="">
    <span class="" aria-hidden="true"></span>
</div>


<?php wp_footer(); ?>

</body>

</html>