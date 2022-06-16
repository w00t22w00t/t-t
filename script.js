'usestrict'


function debounce(func, wait, immediate) {
  let timeout;

  return function executedFunction() {
    const context = this;
    const args = arguments;

    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};




window.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector(".horizontal-container");
  const wrap = document.querySelectorAll('.rotating')

  function addingClass(className) {
    wrap.forEach( function(element, index) {
      element.classList.add(className)
    })
  }


  function removingClass(className) {
    wrap.forEach( function(element, index) {
      element.classList.remove(className)
    })
  }

  const returnStatic = debounce(function() {
    removingClass('scroll-left')
    removingClass('scroll-right')
  }, 150);

  let tl = gsap.timeline();
  tl.to(container, {
    x: () => -(container.scrollWidth + 150 - document.documentElement.clientWidth) + "px",
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      // end: "+=500",
      pin: true,
      scrub: 0.35,
      onUpdate: ({progress, direction, isActive}) => {
        console.log(direction)
        if(direction === 1) {
          addingClass('scroll-right')
          removingClass('scroll-left')
          
        } else {
          addingClass('scroll-left')
          removingClass('scroll-right')
        }

        returnStatic()
      },
    }
  })
})

