import { gsap } from "gsap";
import { max767 } from "../utils"
import SplitType from "split-type";

export default class BannerSlider {
  constructor() {
    this.init();
  }

  init = () => {
    this.setDomMap();
    this.bindEvents();
  };

  setDomMap = () => {
  }

  bindEvents = () => {
    const captionTitle = $(".banner--block h1");

    function clearAndSplitText(element) {
      const splitText = new SplitType(element, {
        types: "words, lines",
        wordsClass: "word",
        linesClass: "line",
      });

      splitText.words.forEach((word, i) => word.classList.add(`word-${i + 1}`));
      splitText.lines.forEach((line, i) => line.classList.add(`line-${i + 1}`));

      return splitText.lines;
    }


    const titleHeadingSplitTextWords = clearAndSplitText(captionTitle);
    function bannerAnimation() {
      const header = $("header .header--wrapper");
      const bannerBlock = $(".banner--block");
      // const bannerSlider = $(".banner--block");
      const captionTitle = $(".banner--block h1");
      const captionSubTitle = $(".banner--block .banner--intro-text");

      // const bannerFreeSliderTitle = $(".banner-free-slide h3")


      const videoBlock = $(".banner--block .text-description");

      const duration2000 = 0.2;
      const duration4000 = 0.4;
      const duration6000 = 0.6;
      const duration8000 = 0.8;
      const duration10000 = 1;

      gsap.to(bannerBlock, {
        clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
        duration: max767.matches ? duration8000 : duration10000,
        ease: "Power3.easeInOut",
        onComplete: function () {
          fullAnimation();
        },
      });

      // gsap.to(bannerSlider, {
      //   scale: 1,
      //   duration: max767.matches ? duration8000 : duration10000,
      //   delay: max767.matches ? duration2000 : duration4000,
      //   ease: "Power1.easeOut",
      // });

      function fullAnimation() {
        gsap.to(header, {
          clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
          duration: max767.matches ? duration6000 : duration8000,
          ease: "0.25,0.1,0.25,1",
          onComplete: function () {
            gsap.set(header, { clipPath: "none" });
          }
        });
        gsap.to(titleHeadingSplitTextWords, {
          duration: max767.matches ? duration6000 : duration10000,
          autoAlpha: 1,
          y: 0,
          ease: "Power2.easeOut",
          stagger: 0.2,
        });
        gsap.to(captionSubTitle, {
          autoAlpha: 1,
          y: 0,
          duration: max767.matches ? duration6000 : duration8000,
          ease: "Power3.easeOut"
        });

        gsap.to(videoBlock, {
          scale: 1,
          autoAlpha: 1,
          duration: max767.matches ? duration8000 : duration10000,
          ease: "Power1.easeOut",
          // onComplete: function () {
          //   setTimeout(function () {
          //     lazy();
          //   }, 3000)
          // },
        });
      }
    }

    bannerAnimation();

  }
}