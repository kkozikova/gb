/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */


document.addEventListener('DOMContentLoaded', function () {
    // Select all elements with the class 'fade-in'
    var fadeElements = document.querySelectorAll('.fade-in');

    // Add the 'show' class to each element to trigger the CSS transition
    fadeElements.forEach(function (element) {
        element.classList.add('show');
    });

    const banner = document.getElementById('top-banner');
    const items = document.querySelectorAll('.nav__item_g');


    items.forEach(item => {
        item.addEventListener('mouseover', function () {
            const bannerImage = item.getAttribute('data-banner');
            banner.style.background = `linear-gradient(rgba(0,0,0, .1), rgba(0,0,0, .4)), ${bannerImage}`;
            banner.style.backgroundSize = 'cover'; /* Ensure background image covers the entire banner */
            banner.style.backgroundRepeat = 'no-repeat'; /* Prevent tiling of the background image */
            banner.classList.add('hovered');
        });

        item.addEventListener('mouseout', function () {
            banner.style.background = "linear-gradient(rgba(0,0,0, .1), rgba(0,0,0, .4)), url('./images/Untitled.gif')";
            banner.style.backgroundSize = 'cover'; /* Ensure background image covers the entire banner */
            banner.style.backgroundRepeat = 'no-repeat'; /* Prevent tiling of the background image */
            banner.classList.remove('hovered');
        });
    });

});

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

//carousels
document.querySelectorAll('[data-carousel]').forEach(carousel => {
    let currentSlide = 0;
    const slides = carousel.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    let slideInterval;

    function showSlide(index) {
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }
        const offset = -currentSlide * 100;
        carousel.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
        resetSlideInterval();
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function resetSlideInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 9000);
    }

    carousel.querySelector('[data-carousel-button="next"]').addEventListener('click', nextSlide);
    carousel.querySelector('[data-carousel-button="prev"]').addEventListener('click', prevSlide);

    // Initial automatic slide change
    slideInterval = setInterval(nextSlide, 9000);
});




//parallax
document.addEventListener('scroll', function() {
    const layers = document.querySelectorAll('.parallax-layer');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    layers.forEach(layer => {
        const speed = layer.getAttribute('data-speed');
        const yPos = -(scrollTop * speed);
        layer.style.transform = `translateY(${yPos}px)`;
    });
});

// Get all the image elements and the lightbox modal elements
const images = document.querySelectorAll('.image-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeBtn = document.querySelector('.close');

// Add click event to each image in the grid
images.forEach(image => {
    image.addEventListener('click', () => {
        // Set the lightbox image to the clicked image's source
        lightboxImage.src = image.src;
        // Display the lightbox
        lightbox.style.display = 'flex';
    });
});

// Close the lightbox when the close button is clicked
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none'; // Hide the lightbox
});

// Also close the lightbox if the user clicks anywhere outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImage) {
        lightbox.style.display = 'none';
    }
});