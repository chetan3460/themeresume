
import Lenis from 'lenis'

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from "split-type";
import { Back } from "gsap";
import tinycolor from "tinycolor2";
gsap.registerPlugin(ScrollTrigger);

export const importComponent = (element, classID) => {
    // if (element.length && !element.hasClass("init") && inVP(element)) { // for lazy loading
    if (element.length && !element.hasClass("init")) {
        import(
        /* webpackChunkName: "[request]" */ /* webpackMode: "lazy" */ `./components/${classID}`
        ).then(module => {
            new module.default();
        });
        element.addClass("init");
    }
};
// Debounce function to limit the rate of resize events
export const debounce = (func, delay) => {
    let timeoutId;

    return function () {
        const context = this;
        const args = arguments;

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
};
// Media Queries
export const min1024 = window.matchMedia("(min-width: 1024px)");
export const min991 = window.matchMedia("(min-width: 991px)");
export const max1200 = window.matchMedia("(max-width: 1200px)");
export const max767 = window.matchMedia("(max-width: 767px)");
export const max375 = window.matchMedia("(max-width: 375px)");



export const lerp = (a, b, t = 0.08) => {
    return a + (b - a) * t;
}
export const xSetter = (el) => gsap.quickSetter(el, 'x', `px`);
export const ySetter = (el) => gsap.quickSetter(el, 'y', `px`);

export const xGetter = (el) => gsap.getProperty(el, 'x')
export const yGetter = (el) => gsap.getProperty(el, 'y')
let pointer = { x: 0, y: 0 };
$(window).on('pointermove', function (e) {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
})
export const pointerCurr = () => {
    return pointer
}
// Initialize Lenis for smooth scrolling
const lenis = new Lenis();
function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf);
export default lenis;





let viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: window.devicePixelRatio,
}
const device = { lg: 1727, md: 991, sm: 767, xs: 476 }

const useRem = (vw, maxWidth) => {
    vw = viewport.width < maxWidth ? (vw * viewport.width) / 1000 : vw / 10;

    return (value) => Number((value * vw).toFixed(2));
};

/**
 * @param {Object} options - [viewport break]:
 * { md: (>991), sm: (<992), xs: (<768) }.
 */

const viewportBreak = (options) => {
    const { md, sm, xs } = options;
    let result;
    switch (true) {
        case viewport.width <= device.sm:
            result = xs;
            break;
        case viewport.width <= device.md:
            result = sm;
            break;
        case viewport.width <= device.lg:
            result = md;
            break;
        default:
            result = md;
            break;
    }
    return (result instanceof Function) ? result() : result;
}

const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

export { useRem, viewportBreak, viewport, isTouchDevice };