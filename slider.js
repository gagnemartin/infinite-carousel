/**
 * Created by Martin on 2017-07-02.
 */

var Slider = function(options)
{
	this.options = options

	// Check the configuration. Throw errors if needed
	this.checkConfiguration()

	this.sliders = document.querySelectorAll(this.options.container)
	var windowWidth = window.innerWidth

	// If there's any container element with the selector "this.options.container" in the page
	if (this.sliders.length > 0) {
		// Go through each slider container and add a unique ID,
		// then select all the slides inside of it
		for (var i = this.sliders.length; i--;) {
			var $slider = this.sliders[i]
			var sliderId = randId()

			// Add a class to the slider for correct formatting
			$slider.classList.add('is-slider')

			$slider.slides = $slider.querySelectorAll(this.options.slides)

			$slider.id = sliderId

			// If there's any slide element with the selector "this.options.slides" in the page
			if ($slider.slides.length > 0) {
				var slideNum = $slider.slides.length
				// Width of a single slide
				var slideWidth = this.outerWidth($slider.slides[0])
				console.log(slideWidth)
				// Width of the slide set
				var sliderWidth = slideWidth * slideNum
				// Number of container we need to clone to fill the window width
				var cloneNum = Math.ceil(windowWidth / sliderWidth)
				// Final number of slides
				var cloneFinalNum = slideNum + (cloneNum * slideNum)
				var sliderWidthPx = '-' + sliderWidth + 'px'

				// Iterate through the new number of slide sets
				for (var iC = 0; iC < cloneNum; iC++) {
					// Iterate through each slide, clone it and append it
					for (var iS = 0; iS < slideNum; iS++) {
						var $slide = $slider.slides[iS]

						// Add a class to the slide for correct formatting
						$slide.classList.add('is-slide')
						// Set the animation
						$slide.style.animation = sliderId + ' ' + this.options.speed + ' linear infinite'

						// Clone the slide then append it
						var $slideClone = $slide.cloneNode(true)
						$slider.appendChild($slideClone)
					}
				}

				// Change the minimum width of the whole slider container to include the new cloned slides
				$slider.style.minWidth = (cloneFinalNum * slideWidth) + 'px'

				// Create the animation keyframes
				this.newKeyframes(sliderWidthPx, sliderId, $slider.dataset.direction)
			} else {
				var e = new Error('No slides found. Make sure the slides has the class "slide"');
				throw e;
			}
		}
	} else {
		var e = new Error('No slider found. Make sure the container has the class "slider"');
		throw e;
	}
}

Slider.prototype.checkConfiguration = function () {
	if (!this.options.container) {
		var e = new Error('No container selector found in the configuration. Add the following: var slider = new Slider({ container: "SELECTOR" })');
		throw e
	}

	if (!this.options.slides) {
		var e = new Error('No slide selector found in the configuration. Add the following: var slider = new Slider({ slides: "SELECTOR" })');
		throw e
	}

	if (!this.options.speed)
		this.options.speed = '50s'
}

Slider.prototype.outerWidth = function(element) {
	var style = element.currentStyle || window.getComputedStyle(element),
		width = element.offsetWidth, // or use style.width
		margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight),
		border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);

	return (width + margin + border);
}

Slider.prototype.newKeyframes = function(setWidth, id, direction) {
	var style = document.createElement('style');
	style.type = 'text/css';
	var keyFrames = getKeyframes(setWidth, id, direction)
	style.innerHTML = keyFrames;
	document.querySelector('head').appendChild(style);
}

var getKeyframes = function(setWidth, id, direction) {
	var keyframes
	// ************************* RIGHT TO LEFT ****************************
	if (direction == 'rtl') {
		keyframes = '\
@-webkit-keyframes ' + id + ' {\
    0% {\
        -webkit-transform: translateX(' + setWidth + ');\
    }\
    100% {\
    	-webkit-transform: translateX(0);\
    }\
}\
@-moz-keyframes ' + id + ' {\
    0% {\
        -moz-transform: translateX(' + setWidth + ');\
    }\
    100% {\
    	-moz-transform: translateX(0);\
    }\
}\
@keyframes ' + id + ' {\
    0% {\
        transform: translateX(' + setWidth + ');\
    }\
    100% {\
    	transform: translateX(0);\
    }\
}';
	} else {
		// ************************* LEFT TO RIGHT ****************************
		keyframes = '\
@-webkit-keyframes ' + id + ' {\
    100% {\
        -webkit-transform: translateX(' + setWidth + ');\
    }\
}\
@-moz-keyframes ' + id + ' {\
    100% {\
        -moz-transform: translateX(' + setWidth + ');\
    }\
}\
@keyframes ' + id + ' {\
    100% {\
        transform: translateX(' + setWidth + ');\
    }\
}';
	}

	return keyframes
}

function randId() {
	return 'is' + Math.random().toString(36).substr(2, 10);
}

