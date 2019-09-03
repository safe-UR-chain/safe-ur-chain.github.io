(function ($) {

  var intervall = null;

  $(document).ready(function () {
    initMaterialize();
    $("#play-btn").on("click", playCarousel);
    $("#pause-btn").on("click", pauseCarousel);
  });

  // functions 

  function initMaterialize() {

    $('.scrollspy').scrollSpy();
    
    M.AutoInit();

    $('.materialboxed').materialbox();
    
    $('.parallax').parallax();

    $('.sidenav').sidenav();
    $('.modal').modal();
  
    $('.pushpin').pushpin({
      top: 150,
      offset: 75
    });



    $('.carousel.carousel-slider').carousel({
      fullWidth: true,
      indicators: true,
      duration: 500
    });

  }

  function triggerCarousel() {
    $("#home-carousel").carousel('next');
  }

  function pauseCarousel() {
    clearInterval(intervall);
    intervall = null;
  }

  function playCarousel() {
    if (intervall === null) {
      triggerCarousel();
      intervall = setInterval(triggerCarousel, 7000);
    }
  }

})(jQuery); // end of jQuery name space