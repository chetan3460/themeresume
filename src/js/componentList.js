const BannerBlock = $(".banner--block");
const horizontalMovement = $(".h-movement");
const parallaxUp = $(".parallax-block-wrap");
const SkillsRow = $(".skills--block");
const lazy = $(".lazy-image,.lazy-video");

// Set 'mobile' to false to prevent JS from loading on mobile. Change the media query as desired in DynamicImports.js

export const componentList = [
  {
    element: lazy,
    className: "LazyLoad",
    mobile: true,
  },
  {
    element: BannerBlock,
    // File Name
    className: "BannerBlock",
    mobile: true,
  },
  {
    element: horizontalMovement,
    className: "HorizontalMovement",
    mobile: true,
  },
  {
    element: parallaxUp,
    className: "ParallaxUp",
    mobile: true,
  },
  {
    element: SkillsRow,
    className: "SkillsRow",
    mobile: true,
  },
];
