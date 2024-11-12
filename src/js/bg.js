"use strict";

window.liquidIsElementor =
	window.liquidIsElementor ||
	document.body.classList.contains("elementor-page");
window.liquidElements = ($) => {
	window.$liquidWindow = $(window);
	window.$liquidBody = $("body");
	window.$liquidSiteWrap = $("#wrap");
	window.$liquidContents = $("#lqd-site-content");
	window.$liquidContentsWrap = $("#lqd-contents-wrap");
	window.$liquidMainHeader = $(".main-header");
	window.$liquidMainFooter = $(".main-footer");
	window.$liquidSectionsWrapper = $liquidContentsWrap;

	window.$liquidSections = liquidIsElementor
		? $liquidSectionsWrapper
			.find(elementorSectionsSelector)
			.add($elementorFooterSections)
		: $liquidSectionsWrapper.add($liquidMainFooter).find(".lqd-section");

	window.liquidBodyBg = window.$liquidBody.css("backgroundColor");
	window.liquidContentsBg = window.$liquidContents.css("backgroundColor");
};


liquidElements(jQuery);

window.liquidIsMobile = function () {
	return (
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent,
		) ||
		(navigator.platform === "MacIntel" && navigator.maxTouchPoints > 0) ||
		navigator.platform === "iPad"
	);
};

window.liquidWindowWidth = function () {
	return window.innerWidth;
};

class LiquidSectionsDetails {
	constructor() {
		this.sections = [];
	}
	static getInstance() {
		if (!this.instance) {
			this.instance = new LiquidSectionsDetails();
		}
		return this.instance;
	}
	static getDetails() {
		const instance = this.getInstance();
		return new Promise(async (resolve) => {
			if (instance.sections.length < 1) {
				instance.sections = [];
				const liquidContentsRect = await instance.getElementRect({
					element: $liquidContents[0],
				});
				await Promise.all(instance.init(liquidContentsRect, instance));
				const mainContentSections = instance.sections.filter(
					(section) => section.isInMainContent,
				);
				if (mainContentSections.length < 1) {
					const DOM = {
						element: $liquidContents[0],
						$element: $liquidContents,
					};
					await instance
						.createDetailsObj(liquidContentsRect, liquidContentsRect, DOM, true)
						.then((detailsObj) => {
							instance.sections.unshift(detailsObj);
						});
				}
				await instance.addLuminosity(instance);
			}
			resolve(instance.sections);
		});
	}
	init(liquidContentsRect, instance) {
		const promises = [];
		$liquidSections.each((i, row) => {
			const promise = new Promise((resolve) => {
				const DOM = {
					element: row,
					$element: jQuery(row),
					parent: row.parentElement,
				};
				this.getElementRect(DOM).then((rowRect) => {
					this.createDetailsObj(liquidContentsRect, rowRect, DOM, false).then(
						(detailsObj) => {
							instance.sections[i] = detailsObj;
							resolve(detailsObj);
						},
					);
				});
			});
			promises.push(promise);
		});
		return promises;
	}
	getElementRect(DOM) {
		return new Promise((resolve) => {
			new IntersectionObserver(([entry], observer) => {
				fastdom.measure(() => {
					observer.disconnect();
					resolve(entry.boundingClientRect);
				});
			}).observe(DOM.element);
		});
	}
	createDetailsObj(liquidContentsRect, rowRect, DOM, isLiquidContentElement) {
		return new Promise((resolve) => {
			fastdom.measure(async () => {
				const { scrollY, scrollX } = window;
				const styles = getComputedStyle(DOM.element);
				const obj = {};
				obj.el = DOM.element;
				obj.$el = DOM.$element;
				obj.rect = {
					initialOffset: {
						x: rowRect.x + scrollX,
						y: rowRect.y + scrollY,
					},
					width: rowRect.width,
					height: rowRect.height,
					x: rowRect.x,
					y: rowRect.y,
				};
				obj.backgroundColor = styles.backgroundColor;
				if (isLiquidContentElement) {
					obj.isMainContentElement = true;
					return resolve(obj);
				}
				const footerParent = DOM.element.closest(".main-footer");

				obj.isInFooter = footerParent != null;
				obj.isInMainContent = DOM.element.closest("#lqd-site-content") != null;
				obj.isHidden = obj.rect.width < 1 && obj.rect.height < 1;
				obj.predefinedLuminosity = null;
				obj.parentSection = null;
				obj.innerSections = [];
				if (obj.el.hasAttribute("data-section-luminosity")) {
					obj.predefinedLuminosity = obj.el.getAttribute(
						"data-section-luminosity",
					);
				}

				resolve(obj);
			});
		});
	}

	getLuminosity(obj, instance) {
		let { backgroundColor } = obj;
		if (
			obj.isInnerSection &&
			obj.parentSection &&
			tinycolor(backgroundColor).getAlpha() === 0
		) {
			backgroundColor = obj.parentSection.backgroundColor;
		}
		if (tinycolor(backgroundColor).getAlpha() === 0) {
			if (obj.isInFooter) {
				backgroundColor = instance.footerBg;
			} else {
				backgroundColor = window.liquidContentsBg;
			}
		}
		return tinycolor(backgroundColor).isDark() ? "dark" : "light";
	}
	async addLuminosity(instance) {
		instance.sections.forEach(async (sec) => {
			sec.isBgTransparent = tinycolor(sec.backgroundColor).getAlpha() === 0;
			sec.luminosity = sec.predefinedLuminosity
				? sec.predefinedLuminosity
				: instance.getLuminosity(sec, instance);
			await fastdomPromised.mutate(() => {
				sec.el.setAttribute("data-section-luminosity", sec.luminosity);
			});
		});
	}
}

(function ($) {
	"use strict";

	const pluginName = "liquidBgColor";
	let defaults = {
		getBgFromSelector: "backgroundColor",
		setBgTo: "self",
		manipulateColor: null,
		changeBorderColor: false,
		interactWithHeader: false,
		makeGradient: false,
	};
	class Plugin {
		constructor(element, options) {
			this._defaults = defaults;
			this._name = pluginName;
			this.options = {
				...defaults,
				...options,
			};
			this.element = element;
			this.$element = $(element);
			this.setBgToEls =
				this.options.setBgTo === "self"
					? [this.element]
					: $(this.options.setBgTo, this.element).get();
			this.bgEl = false;
			this.rowsRect = [];
			this.colors = [];
			this.direction = 0;
			this.$element.is($liquidContents) && this._addBgElement();
			this.liquidBgColorInitPromise = new Promise((resolve) => {
				this.$element.on("lqd-bg-color-init", resolve.bind(this, this));
			});
			// LiquidSectionsDetails.getDetails().then((sections) => {
			// 	$(sections).imagesLoaded(this._init(sections));
			// });
			LiquidSectionsDetails.getDetails().then((sections) => {
				if ($.fn.imagesLoaded) {
					// Only call imagesLoaded if it exists
					$(sections).imagesLoaded(this._init(sections));
				} else {
					// console.warn("imagesLoaded function is missing. Initializing without imagesLoaded.");
					// Fall back to calling _init directly if imagesLoaded is not available
					this._init(sections);
				}
			});
		}

		_init(liquidSections) {
			const sections = liquidSections
				.filter((sec) => !sec.isHidden && !sec.isInFooter)
				.filter((sec) => !sec.isInnerSection);

			// console.log(sections);

			sections.forEach(async (sec, i) => {
				await this._getColors(sec);
				Promise.all(this._getRects(sec, i)).then(() => {
					this._setupIO(sec, i);

					if (this.bgEl) {
						this.element.classList.add("transparent-bg");
						sec.el.classList.add("transparent-bg");

						if (sec.isInnerSection && sec.parentSection) {
							sec.parentSection.el.classList.add("transparent-bg");
						}
					}
				});
			});

			const event = new Event("lqd-bg-color-init");
			this.element.dispatchEvent(event);
		}

		_addBgElement() {
			if (this.bgEl) return;

			const overflowClassname = liquidIsMobile() ? "overflow-hidden" : "";
			const posClassname = liquidIsMobile()
				? "pos-fix fixed"
				: "pos-sticky sticky";
			const heightClassname = liquidIsMobile()
				? "h-100 h-full"
				: "h-vh-100 h-100vh";

			this.bgEl = document.createElement("div");
			this.bgEl.className = `lqd-liquid-bg-el-wrap lqd-overlay pointer-events-none z-index--1 ${overflowClassname}`;

			const bgElement = document.createElement("div");
			bgElement.className = `lqd-liquid-bg-el ${posClassname} pos-tl w-100 top-0 left-0 w-full ${heightClassname} pointer-events-none`;

			this.bgEl.appendChild(bgElement);
			document.body.appendChild(this.bgEl);

			// console.log(this.bgEl);
		}

		_getColors(lqdSection) {
			return fastdomPromised.measure(() => {
				const { getBgFromSelector, manipulateColor } = this.options;
				const obj = {};
				let color = lqdSection[getBgFromSelector]
					.replace(/, /g, ",")
					.split(" ")[0];
				let dataLuminosityAttr = lqdSection.$el.attr("data-section-luminosity");

				if (lqdSection.isBgTransparent) {
					color = $liquidContents.css("backgroundColor");
				}
				if (manipulateColor && manipulateColor.length > 0) {
					for (let i = 0; i < manipulateColor.length; i++) {
						color = tinycolor(color)
						[Object.keys(manipulateColor[i])[0]](
							Object.values(manipulateColor[i])[0],
						)
							.toString();
					}
				}
				obj.color = color;
				obj.luminosity =
					dataLuminosityAttr != null && !manipulateColor
						? dataLuminosityAttr
						: tinycolor(color).getLuminance() <= 0.4
							? "dark"
							: "light";
				this.colors.push(obj);
			});
		}

		_getRects(lqdSection, loopIndex) {
			const promises = [];

			const rowPromise = new Promise((resolve) => {
				new IntersectionObserver(([entry], observer) => {
					observer.disconnect();
					this.rowsRect[loopIndex] = entry.boundingClientRect;
					resolve();
				}).observe(lqdSection.el);
			});
			promises.push(rowPromise);
			return promises;
		}
		_setupIO(lqdSection, loopIndex) {
			const timeline = gsap.timeline();
			const start =
				loopIndex === 0
					? "top bottom"
					: `top+=${this.rowsRect[loopIndex].y - lqdSection.rect.y} bottom`;
			this.setBgToEls.forEach((element) => {
				const onUpdate = () => {
					const i =
						this.direction < 1 && loopIndex > 0 ? loopIndex - 1 : loopIndex;
					this.options.interactWithHeader &&
						this.$stickyModules &&
						this._interactWithHeader(this.colors[i].luminosity);
				};
				timeline.fromTo(
					element,
					{
						backgroundColor:
							loopIndex === 0
								? this.colors[loopIndex].color
								: this.colors[loopIndex - 1].color,
					},
					{
						backgroundColor: this.colors[loopIndex].color,
						onUpdate,
						onComplete: () => {
							element.style.transition = "";
						},
					},
					0,
				);
			});
			ScrollTrigger.create({
				animation: timeline,
				trigger: lqdSection.el,
				start,
				end: `+=${this.rowsRect[loopIndex].height}`,
				scrub: 0.1,
				onUpdate: (st) => {
					this.direction = st.direction;
				},
			});
		}
	}
	$.fn[pluginName] = function (options) {
		return this.each(function () {
			const pluginOptions = {
				...$(this).data("liquid-bg-options"),
				...options,
			};
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this, pluginOptions));
			}
		});
	};
})(jQuery);



// New code 18 oct
jQuery(function ($) {
	const liquidBgEls = $("[data-liquid-bg]").liquidBgColor();

	if (liquidIsElementor) {
		liquidBgEls.filter($liquidContents).each((_, el) => {
			if ($liquidMainHeader.length && !$liquidMainHeader.attr("data-liquid-bg")) {
				$liquidMainHeader.liquidBgColor({
					manipulateColor: [
						{ darken: 30 },
						{ brighten: 15 },
						{ saturate: 20 },
					],
				});
			}
		});
	}
});
