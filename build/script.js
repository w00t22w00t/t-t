"use strict";

function debounce(func, wait, immediate) {
  var timeout;
  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

;
window.addEventListener('DOMContentLoaded', function () {
  var container = document.querySelector(".horizontal-container");
  var wrap = document.querySelectorAll('.rotating');

  function addingClass(className) {
    wrap.forEach(function (element, index) {
      element.classList.add(className);
    });
  }

  function removingClass(className) {
    wrap.forEach(function (element, index) {
      element.classList.remove(className);
    });
  }

  var returnStatic = debounce(function () {
    removingClass('scroll-left');
    removingClass('scroll-right');
  }, 150);
  var tl = gsap.timeline();
  tl.to(container, {
    x: function x() {
      return -(container.scrollWidth + 150 - document.documentElement.clientWidth) + "px";
    },
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      // end: "+=500",
      pin: true,
      scrub: 0.35,
      onUpdate: function onUpdate(_ref) {
        var progress = _ref.progress,
            direction = _ref.direction,
            isActive = _ref.isActive;
        console.log(direction);

        if (direction === 1) {
          addingClass('scroll-right');
          removingClass('scroll-left');
        } else {
          addingClass('scroll-left');
          removingClass('scroll-right');
        }

        returnStatic();
      }
    }
  });
});