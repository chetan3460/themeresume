
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import Header from './components/Header';
import DynamicImports from './components/DynamicImports';
import Animation from './components/Animation';
// import Background from './components/Background';
import lenis from './utils';
import { xGetter, yGetter, xSetter, ySetter, lerp, pointerCurr } from './utils';

export default new (class App {
  constructor() {
    this.setDomMap();
    this.previousScroll = 0;

    // DOM ready shorthand
    $(() => {
      this.domReady();
    });
  }

  domReady = () => {
    this.initComponents();
    this.handleUserAgent();
    this.windowResize();
    this.bindEvents();

  };

  initComponents = () => {
    new Header({
      header: this.header,
      htmlBody: this.htmlBody,
    });
    // new Background();

    new Animation();
    new DynamicImports();
    window.lenis = lenis;


  };

  setDomMap = () => {
    this.window = $(window);
    this.htmlNbody = $('body, html');
    this.html = $('html');
    this.htmlBody = $('body');
    this.siteLoader = $('.site-loader');
    this.header = $('header');
    this.siteBody = $('.site-body');
    this.footer = $('footer');
    this.gotoTop = $('#gotoTop');
    this.wrapper = $('.wrapper');
    this.pushDiv = this.wrapper.find('.push');
  };

  bindEvents = () => {



    // Curssor 
    function handleFooterCursor() {
      const footerCursorWrap = '.footer__cursor';
      const footerCursor = '.footer__cursor-main';
      function mousMove() {
        if ($(footerCursor).length) {
          let iconsX = xGetter(footerCursor);
          let iconsY = yGetter(footerCursor);
          xSetter(footerCursor)(lerp(iconsX, pointerCurr().x), 0.01);
          ySetter(footerCursor)(lerp(iconsY, pointerCurr().y - $(footerCursorWrap).get(0).getBoundingClientRect().top), 0.01);
        }
        requestAnimationFrame(mousMove)
      }
      requestAnimationFrame(mousMove)
    }
    if ($(window).width() > 767) {
      handleFooterCursor()
    }

    var hasAnimation = gsap.utils.toArray('.has-animation');
    hasAnimation.forEach(function (hAnimation) {
      var delayValue = parseInt(hAnimation.getAttribute("data-delay")) || 0;
      gsap.to(hAnimation, {
        scrollTrigger: {
          trigger: hAnimation,
          start: "top 85%",
          onEnter: function () {
            hAnimation.classList.add('animated');
          },
        },
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: Power2.easeOut,
        delay: delayValue / 1000,
      });
    });



    // Window Events
    this.window.resize(this.windowResize).scroll(this.windowScroll);

    // General Events
    const $container = this.wrapper;
    $container.on('click', '.disabled', () => false);


    this.gotoTop.on('click', () => {
      lenis.scrollTo(0, { duration: 1.5 }); // Scroll to the top with a smooth animation
    });






    // Section scroll Active class
    $(document).ready(function () {
      // Lenis Scroll Trigger on Click
      $(".scrollToSection").click(function (e) {
        e.preventDefault(); // Prevent default link behavior

        var headerHeight = $("header").outerHeight(); // Get header height
        var targetSectionId = $(this).attr("href");   // Get the href attribute (e.g., #section1)
        var targetElement = document.querySelector(targetSectionId);  // Find the target section

        // Check if the screen width is <= 991px (Mobile) and perform actions for mobile only
        if (window.innerWidth <= 991) {
          $("header").removeClass("open-nav");  // Close the mobile nav
          lenis.start(); // Start Lenis scrolling on mobile
        }

        // Manually add 'active' class to clicked link
        $(".scrollToSection").removeClass('active'); // Remove active from all links
        $(this).addClass('active');  // Add active to the clicked link

        // Use Lenis to scroll smoothly to the target section
        lenis.scrollTo(targetElement, {
          offset: -headerHeight - 5,  // Adjust for header height
          duration: 1.5,              // Scroll duration (in seconds)
          onComplete: () => {         // Callback function when scroll is complete
            console.log(`Scrolled to ${targetSectionId}`);
          }
        });

        console.log(`Scroll initiated to ${targetSectionId}`);
      });

      // IntersectionObserver to handle adding 'active' class on scroll
      const sections = document.querySelectorAll("section"); // Assuming your sections are wrapped in <section> tags
      const navLinks = document.querySelectorAll(".scrollToSection");

      // Observer Options: Different rootMargin for mobile to handle smaller screens
      const observerOptionsMobile = {
        root: null,
        rootMargin: "-20% 0px -60% 0px", // Adjusted margins for mobile to ensure early detection
        threshold: 0.1 // Trigger when 10% of the section is visible on mobile
      };

      // Observer Options: Keep original for desktop
      const observerOptionsDesktop = {
        root: null,
        rootMargin: "-50% 0px", // When 50% of the section is in the viewport
        threshold: 0 // Trigger when any part of the section is visible on desktop
      };

      // IntersectionObserver callback to handle adding 'active' class
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const targetSectionId = `#${entry.target.id}`;
          const activeLink = document.querySelector(`.scrollToSection[href='${targetSectionId}']`);

          if (entry.isIntersecting) {
            // Remove 'active' class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            // Add 'active' class to the link of the current section
            if (activeLink) {
              activeLink.classList.add('active');
            }
          }
        });
      }, window.innerWidth <= 991 ? observerOptionsMobile : observerOptionsDesktop);

      // Observe each section
      sections.forEach(section => sectionObserver.observe(section));

      // Re-initialize observer on window resize to handle mobile/desktop switching
      $(window).resize(function () {
        if (window.innerWidth <= 991) {
          // Use mobile-specific observer settings
          sections.forEach(section => sectionObserver.observe(section));
        } else {
          // Use desktop-specific observer settings
          sections.forEach(section => sectionObserver.observe(section));
        }
      });





    });





    gsap.utils.toArray('.pinned-gallery').forEach((pinnedGallery) => {

      if (pinnedGallery && pinnedGallery.classList.contains('random-img-ratation')) {
        const rotatedImages = pinnedGallery.querySelectorAll('.pinned-image:not(:first-child):not(:last-child)');
        gsap.utils.toArray(rotatedImages).forEach((pImage, i, arr) => {
          let rotation = i % 2 === 0 ? gsap.utils.random(-4, 0) : gsap.utils.random(0, 4);
          gsap.set(pImage.querySelector('img'), { rotation: rotation });
        });
      }

      const pinnedImages = pinnedGallery.querySelectorAll('.pinned-image');

      pinnedImages.forEach((pImage, i, arr) => {
        if (i < arr.length - 1) {
          const durationMultiplier = arr.length - i - 1;

          ScrollTrigger.create({
            trigger: pImage,
            start: function () {
              const centerPin = (window.innerHeight - pImage.querySelector('img').offsetHeight) / 2;
              return "top +=" + centerPin;
            },
            end: function () {
              const durationHeight = pImage.offsetHeight * durationMultiplier;
              return "+=" + durationHeight;
            },
            pin: true,
            pinSpacing: false,
            scrub: true,
            animation: gsap.to(pImage.querySelector('img'), {
              scale: 0.95,
              opacity: 1,
              zIndex: 0,
              duration: 1,
              ease: Linear.easeNone
            }),
          });
        }
      });

    });






  };


  windowResize = () => {
    this.screenWidth = this.window.width();
    this.screenHeight = this.window.height();

    // Calculate footer height and assign it to wrapper and push/footer div
    if (this.pushDiv.length) {
      this.footerHeight = this.footer.outerHeight();
      this.wrapper.css('margin-bottom', -this.footerHeight);
      this.pushDiv.height(this.footerHeight);
    }
  };

  windowScroll = () => {
    const topOffset = this.window.scrollTop();

    this.header.toggleClass('top', topOffset > 10);
    this.header.toggleClass('sticky', topOffset > 600);
    if (topOffset > this.previousScroll || topOffset < 500) {
      this.header.removeClass('sticky');
    } else if (topOffset < this.previousScroll) {
      this.header.addClass('sticky');
      // Additional checking so the header will not flicker
      if (topOffset > 250) {
        this.header.addClass('sticky');
      } else {
        this.header.removeClass('sticky');
      }
    }

    this.previousScroll = topOffset;
    this.gotoTop.toggleClass(
      'active',
      this.window.scrollTop() > this.screenHeight / 2,
    );



  };

  handleUserAgent = () => {
    // Detect mobile platform
    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
      this.htmlBody.addClass('ios-device');
    }
    if (navigator.userAgent.match(/Android/i)) {
      this.htmlBody.addClass('android-device');
    }

    // Detect desktop platform
    if (navigator.appVersion.indexOf('Win') !== -1) {
      this.htmlBody.addClass('win-os');
    }
    if (navigator.appVersion.indexOf('Mac') !== -1) {
      this.htmlBody.addClass('mac-os');
    }

    // Detect IE 10 and 11
    if (
      navigator.userAgent.indexOf('MSIE') !== -1 ||
      navigator.appVersion.indexOf('Trident/') > 0
    ) {
      this.html.addClass('ie10');
    }

    // Detect IE Edge
    if (/Edge\/\d./i.test(navigator.userAgent)) {
      this.html.addClass('ieEdge');
    }

    // Specifically for IE8 (for replacing SVG with PNG images)
    if (this.html.hasClass('ie8')) {
      const imgPath = '/themes/theedge/images/';
      $('header .logo a img,.loading-screen img').attr(
        'src',
        `${imgPath}logo.png`,
      );
    }

    // Show IE overlay popup for incompatible browser
    if (this.html.hasClass('ie9')) {
      const message = $(`
        <div class="no-support"> You are using an outdated browser. Please 
        <a href="https://browsehappy.com/" target="_blank">update</a> 
        your browser or 
        <a href="https://browsehappy.com/" target="_blank">install</a> 
        a modern browser like Google Chrome or Firefox.
        <div>`);
      this.htmlBody.prepend(message);
    }
  };

})();
