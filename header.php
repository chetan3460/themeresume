<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<?php
$header_scripts = get_field("header_scripts", "option");
$body_scripts = get_field("body_scripts", "option");
$header_cta = get_field("header_cta", "option");
if (!empty($header_cta)) {
    $cta_target = $header_cta['target'] ? $header_cta['target'] : '_self';
}

?>

<head>
    <meta charset="<?php bloginfo('charset'); ?>" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
    <link rel="profile" href="http://gmpg.org/xfn/11" />
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
    <meta name="format-detection" content="telephone=no">
    <meta name="theme-url" content="<?php echo get_template_directory_uri(); ?>">
    <!-- Custom scripts or code in header from theme settings -->

    <?php wp_head(); ?>
    <?php echo $header_scripts ?>

</head>


<body <?php body_class(); ?>>
    <?php echo $body_scripts ?>

    <?php wp_body_open(); ?>


    <div class=" <?php if (wp_is_mobile()) { ?> mobile-device <?php } ?>">
        <!-- opening of wrapper div ends in footer.php -->


        <script type="text/javascript">
            var ajaxurl = "<?php echo admin_url('admin-ajax.php'); ?>";
        </script>


        <header id="site-header" class="header top-0 start-0 w-100 position-fixed z-3" data-sticky-options='{"disableOnMobile":true,"dynamicColors":true}' data-liquid-bg="true"
            data-liquid-bg-options='{"setBgTo": ".navbar-brand-solid .navbar-brand-inner, .header-module > .btn-solid, .header-module > .btn-icon-solid .btn-icon","manipulateColor": [{"darken": 30}, {"brighten": 15}, {"saturate": 20}] }'>

            <div class="header--wrapper">
                <div class="container-fluid d-flex align-items-center justify-content-between">

                    <!-- Logo -->
                    <div class="header-module module-logo no-rotate navbar-brand-solid navbar-brand-circle py-15">
                        <a class="navbar-brand inline-flex text-18" href="<?php echo get_site_url(); ?>" rel="home">
                            <span class="navbar-brand-inner">
                                CD
                            </span>
                        </a>
                    </div>

                    <!-- Menu -->
                    <div class="header-module module-button" data-section-luminosity="dark">
                        <div class=" header__links btn-solid btn-icon" data-section-luminosity="dark">
                            <?php
                            if (has_nav_menu('main-menu')) {
                                wp_nav_menu(
                                    array(
                                        'theme_location' => 'main-menu',
                                        'container' => false,
                                        'menu_class' => 'header__links-inner',
                                        'add_a_class'     => 'header__link  scrollToSection text-capitalize',

                                    )
                                );
                            }
                            ?>

                            <div class="header__links-toggle">
                                <span class="header__links-toggle-icon header__links-toggle-icon-1"></span>
                                <span class="header__links-toggle-icon header__links-toggle-icon-2"></span>
                                <span class="header__links-toggle-icon header__links-toggle-icon-3"></span>
                            </div>
                        </div>
                    </div>


                    <div class="header-module module-button d-lg-none d-inline-block">
                        <a href="#" class=" header__toggle btn-solid btn-icon">
                            <span class="header__toggle-icon header__toggle-icon-1"></span> <span class="header__toggle-icon header__toggle-icon-2"></span> <span class="header__toggle-icon header__toggle-icon-3"></span>
                        </a>
                    </div>
                    <nav class="header__nav" data-lenis-prevent="">
                        <?php
                        if (has_nav_menu('main-menu')) {
                            wp_nav_menu(
                                array(
                                    'theme_location' => 'main-menu',
                                    'container' => false,
                                    'menu_class' => 'header__nav-item',
                                    'add_a_class'     => 'header__nav-link  scrollToSection text-capitalize',

                                )
                            );
                        }
                        ?>

                    </nav>
                </div>
            </div>
        </header>