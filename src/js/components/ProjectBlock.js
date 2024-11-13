import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);

export default class ProjectBlock {
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

        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            lerp: 0.1,
            smooth: true
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // GSAP animations and ScrollTrigger initialization
        function initializeAnimations() {
            gsap.utils.toArray('.slowed-pin').forEach((slowedPin) => {
                const slowedText = slowedPin.querySelector('.slowed-text');
                const slowedTextWrapper = slowedPin.querySelector('.slowed-text-wrapper');
                const slowedImagesWrapper = slowedPin.querySelector('.slowed-images');
                const slowedImages = slowedPin.querySelectorAll('.slowed-image img');

                gsap.to(slowedText, {
                    scrollTrigger: {
                        trigger: slowedText,
                        scrub: true,
                        pin: true,
                        start: "top top",
                        end: () => `+=${slowedImagesWrapper.offsetHeight - window.innerHeight}`,
                        onUpdate: lenis.update
                    },
                    y: window.innerHeight - slowedText.offsetHeight
                });

                gsap.from(slowedTextWrapper, {
                    scrollTrigger: {
                        trigger: slowedText,
                        scrub: true,
                        start: "top top",
                        end: () => `+=${slowedImagesWrapper.offsetHeight - window.innerHeight}`,
                        onUpdate: lenis.update
                    },
                    y: 100
                });

                slowedImages.forEach((sImage) => {
                    gsap.to(sImage, {
                        scrollTrigger: {
                            trigger: sImage,
                            scrub: true,
                            start: "top 100%",
                            onUpdate: lenis.update
                        },
                        scale: 1,
                        y: 0
                    });
                });
            });

            // Additional refresh to ensure correct layout on page scroll
            ScrollTrigger.refresh();
        }

        // Wait for the page and images to load, then initialize animations
        window.addEventListener('load', () => {
            initializeAnimations();

            // Extra refresh to handle any layout shifts
            requestAnimationFrame(() => {
                ScrollTrigger.refresh();
            });
        });


    };
}
