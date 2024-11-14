
import tinycolor from "tinycolor2";

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from "split-type";
import { Back, Power2 } from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default class Animation {
  constructor() {
    this.init();
  }

  init = () => {
    this.setDomMap();
    this.bindEvents();
  };

  setDomMap = () => {
    this.window = $(window);
    this.body = $("body");
  };

  bindEvents = () => {
    this.fadeInAnimation();
    this.fadeUpStagger();
    this.title_animation();
    this.textRevealAnimation();
    this.textGradientAnimation();

    // Function to refresh ScrollTrigger
    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh();
      setTimeout(function () {
        ScrollTrigger.refresh();
      }, 1000);
    };

    // Function to trigger ScrollTrigger.refresh() on window load
    const onWindowFullyLoaded = () => {
      refreshScrollTrigger();
      // Optionally remove the event listener after it's been triggered
      window.removeEventListener("load", onWindowFullyLoaded);
    };
    // Add event listener for window fully loaded event
    window.addEventListener("load", onWindowFullyLoaded);
  };

  // fade In
  fadeInAnimation = () => {
    const fadeIn = document.querySelectorAll(".fade-in");
    if (fadeIn.length) {
      fadeIn.forEach((container) => {
        let fadeInTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "50px bottom",
          },
        });
        let delay = container.getAttribute("data-delay");
        fadeInTimeline.to(
          container,
          {
            opacity: 1,
            duration: 1,
            onComplete: () => {
              ScrollTrigger.refresh();
            },
          },
          delay
        );
      });
    }
  };



  // fade Up Stagger
  fadeUpStagger = () => {
    const fadeUpWrapper = gsap.utils.toArray(".fade-up-stagger-wrap");

    if (fadeUpWrapper.length) {
      fadeUpWrapper.forEach((fadeUpWrap) => {
        const fadeUp = fadeUpWrap.querySelectorAll(".fade-up-stagger");
        let delay = fadeUpWrap.getAttribute("data-delay");
        gsap.to(fadeUp, {
          scrollTrigger: {
            trigger: fadeUpWrap,
            start: "5% 100%",
          },
          opacity: 1,
          y: 0,
          duration: 1,
          delay: delay,
          stagger: 0.2,
        });
      });
    }
  };


  // Animation gsap 
  title_animation = () => {
    // Animation gsap 
    function title_animation() {
      var tg_var = jQuery('.sec-title-animation');
      if (!tg_var.length) {
        return;
      }
      const quotes = document.querySelectorAll(".sec-title-animation .title-animation");

      quotes.forEach(quote => {

        //Reset if needed
        if (quote.animation) {
          quote.animation.progress(1).kill();
          quote.split.revert();
        }

        var getclass = quote.closest('.sec-title-animation').className;
        var animation = getclass.split('animation-');
        if (animation[1] == "style4") return

        quote.split = new SplitType(quote, {
          type: "lines,words,chars",
          linesClass: "split-line"
        });
        gsap.set(quote, {
          perspective: 400
        });

        if (animation[1] == "style1") {
          gsap.set(quote.split.chars, {
            opacity: 0,
            y: "90%",
            rotateX: "-40deg"
          });
        }
        if (animation[1] == "style2") {
          gsap.set(quote.split.chars, {
            opacity: 0,
            x: "50"
          });
        }
        if (animation[1] == "style3") {
          gsap.set(quote.split.chars, {
            opacity: 0,
          });
        }
        quote.animation = gsap.to(quote.split.chars, {
          scrollTrigger: {
            trigger: quote,
            start: "top 90%",
          },
          x: "0",
          y: "0",
          rotateX: "0",
          opacity: 1,
          duration: 1,
          ease: Back.easeOut,
          stagger: .02
        });
      });
    }
    // ScrollTrigger.addEventListener("refresh", );
    title_animation();



    let typeSplit = new SplitType("[text-split]", {
      types: "words, chars",
      tagName: "span"
    });

    // Link timelines to scroll position
    function createScrollTrigger(triggerElement, timeline) {
      // Reset tl when scroll out of view past bottom of screen
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top bottom",
        onLeaveBack: () => {
          timeline.progress(0);
          timeline.pause();
        }
      });
      // Play tl when scrolled into view (60% from top of screen)
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 60%",
        onEnter: () => timeline.play()
      });
    }

    $("[letters-fade-in]").each(function (index) {
      let tl = gsap.timeline({ paused: true });
      tl.from($(this).find(".char"), { opacity: 0, duration: 0.2, ease: "power1.out", stagger: { amount: 0.8 } });
      createScrollTrigger($(this), tl);
    });

    $("[letters-fade-in-random]").each(function (index) {
      let tl = gsap.timeline({ paused: true });
      tl.from($(this).find(".char"), { opacity: 0, duration: 0.05, ease: "power1.out", stagger: { amount: 0.4, from: "random" } });
      createScrollTrigger($(this), tl);
    });

    // Avoid flash of unstyled content
    gsap.set("[text-split]", { opacity: 1 });
  };


  textRevealAnimation = () => {
    const splitTypes = document.querySelectorAll('.reveal-type');
    splitTypes.forEach((char, i) => {
      const text = new SplitType(char, { types: ['chars', 'words'] });
      gsap.from(text.chars, {
        scrollTrigger: {
          trigger: char,
          start: 'top 80%',
          end: 'top 20%',
          scrub: true,
          markers: false
        },
        opacity: 0.2,
        stagger: 0.1,
      })
    });
  };


  textGradientAnimation = () => {
    if (innerWidth > 576) {
      let folksBD = gsap.timeline({
        repeat: -1,
        delay: 0.5,
        scrollTrigger: {
          trigger: '.folks-text',
          start: 'bottom 100%-=50px'
        }
      });

      gsap.set('.folks-text', {
        opacity: 0
      });

      gsap.to('.folks-text', {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.folks-text',
          start: 'bottom 100%-=50px',
          once: true
        }
      });

      let mySplitText = new SplitType(".folks-text", { type: "words,chars,capitalize" });
      let chars = mySplitText.chars;

      // Define the start and end colors for the gradient
      const startColor = tinycolor("#14CF93");
      const endColor = tinycolor("#F8EC3A");

      folksBD.to(chars, {
        duration: 0.5,
        scaleY: 0.6,
        ease: "power3.out",
        stagger: 0.04,
        transformOrigin: 'center bottom'
      });

      folksBD.to(chars, {
        yPercent: -20,
        ease: "elastic",
        stagger: 0.03,
        duration: 0.8
      }, 0.5);

      folksBD.to(chars, {
        scaleY: 1,
        ease: "elastic.out(2.5, 0.2)",
        stagger: 0.03,
        duration: 1.5
      }, 0.5);

      folksBD.to(chars, {
        color: (i, el, arr) => {
          // Create a color that transitions from startColor to endColor based on the index
          return tinycolor.mix(startColor, endColor, (i / arr.length) * 100).toString();
        },
        ease: "power2.out",
        stagger: 0.03,
        duration: 0.3
      }, 0.5);

      folksBD.to(chars, {
        yPercent: 0,
        ease: "back",
        stagger: 0.03,
        duration: 0.8
      }, 0.7);

      folksBD.to(chars, {
        color: startColor.toString(),
        duration: 1.4,
        stagger: 0.05
      });
    }
  };



}
