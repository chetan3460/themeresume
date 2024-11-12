
import { max767, min1024, lerp, viewport } from "../utils";
import lenis from "../utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default class Header {
  constructor({ header, htmlBody }) {
    this.header = header;
    this.htmlBody = htmlBody;
    this.bindEvents();
  }

  bindEvents = () => {
    const $container = this.htmlBody;

    const header = $('.header')
    let lastScrollTop = 0;
    const handleHeader = {
      toggleHide: (scrollPos) => {
        let headerHeight = header.height();
        if (scrollPos > lastScrollTop) {
          if (scrollPos > headerHeight) {
            header.addClass('on-hide')
          }
        } else {
          if (scrollPos > headerHeight) {
            header.addClass("on-hide");
            header.removeClass("on-hide");
          }
        }
        lastScrollTop = scrollPos;
      },
      addBG: (scrollPos) => {

        if (scrollPos > header.height()) header.addClass("on-scroll");
        else header.removeClass("on-scroll");
      },
      toggleNav: () => {
        const hamburger = $('.header__toggle');
        hamburger.on('click', function (e) {
          e.preventDefault();
          if (header.hasClass('open-nav')) {

            header.removeClass('open-nav');
            header.removeClass('force')
          }
          else {

            header.addClass('open-nav');
            header.addClass('force')
          }
        })
      },
    };


    handleHeader.toggleNav();

    function scrollHeaderSwitch() {
      if (viewport.width > 767) {
        lenis.on('scroll', function (inst) {
          let scrollPos = inst.scroll;
          handleHeader.addBG(inst.scroll);
          handleHeader.toggleHide(inst.scroll);
        })
      }
      else {
        let lastPos = $('.wrapper').scrollTop();
        $('.wrapper').on("scroll", function () {
          let scrollPos = $('.wrapper').scrollTop();
          handleHeader.addBG(scrollPos);
          handleHeader.toggleHide(scrollPos);

        });
      }
    }
    scrollHeaderSwitch();
  };








}

