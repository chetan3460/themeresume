import { gsap } from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


export default class SkillsRow {
    constructor() {
        this.setDomMap();
        this.bindEvents();
    }

    setDomMap() {

    }

    bindEvents() {
        $(".skills--item").each(function (index) {
            let triggerElement = $(this);
            let heading = $(this).find(".skills-title h3");
            let text = $(this).find(".skills_list");

            let tl2 = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerElement,
                    start: "top center",
                    end: "bottom center",
                    toggleActions: "play none play reverse",
                    preventOverlaps: true
                    //scrub: true
                }
            });
            tl2.to(this, {
                scale: 1.025,
                ease: "power3.out",
                duration: 0.4
            });
            tl2.to(
                heading,
                {
                    fontWeight: "700",
                    // color: "#2c78f6",
                    ease: "power3.out",
                    duration: 0.2
                },
                "-=.4"
            );
            tl2.from(
                this,
                {
                    opacity: 0.8,
                    ease: "power3.out",
                    duration: 0.2
                },
                "-=.4"
            );
            tl2.to(
                text,
                {
                    opacity: 1,
                    ease: "power3.out",
                    duration: 0.2
                },
                "-=.4"
            );
        });

        let tl6 = gsap.timeline({
            scrollTrigger: {
                trigger: ".skills--container",
                start: "-40% center",
                end: "bottom bottom",
                toggleActions: "restart none none reverse",
                scrub: 1.2,
                // markers: true
            }
        });

        tl6.from(".line-under", {
            width: "0%",
            stagger: { each: 0.1 },
            ease: "power3.out",
            duration: 0.7
        });
    }


}
