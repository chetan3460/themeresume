import { gsap } from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default class LazyLoad {
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
        this.initLazyLoad();
    };
    initLazyLoad = () => {
        const lazyImageView = document.querySelectorAll(".lazy-image");
        if (lazyImageView.length) {
            lazyImageView.forEach((image) => {
                let loadImage = () => {
                    if (!image.classList.contains("loaded")) {
                        image.classList.add("loaded");
                        let imgDataSrc = image.getAttribute("data-src");
                        if (imgDataSrc) {
                            image.setAttribute("src", imgDataSrc);
                            image.onload = function () {
                                image.classList.add("loaded-full-image");
                            };
                        }
                    }
                };
                let offset = image.getAttribute("data-offset");
                let defaultOffset = 700;
                let lazyImageViewTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: image,
                        start: `top bottom+=${offset ? offset : defaultOffset}`,
                        onEnter: loadImage,
                    },
                });
            });
            ScrollTrigger.refresh();
        }


    };
}
