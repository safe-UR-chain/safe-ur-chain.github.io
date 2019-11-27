(function ($) {

  var intervall = null;
  var duration = 5500;

  $(document).ready(function () {
    initMaterialize();
    $("#play-btn").on("click", playCarousel);
    $("#pause-btn").on("click", pauseCarousel);

    // autoplay of the banner
    setTimeout(playCarousel, duration);
  });

  // functions 

  function initMaterialize() {

    M.AutoInit();

    $('.scrollspy').scrollSpy( {
      scrollOffset: 0
    });

    $('.materialboxed').materialbox();
    $('.parallax').parallax();
    $('.slider').slider();
    $('.sidenav').sidenav();
    $('.modal').modal();
  
    $('.pushpin').pushpin({
      top: 150,
      offset: 75
    });

    $('#home-carousel').carousel({
      fullWidth: true,
      indicators: true,
      duration: 300,
      onCycleTo: function(e) {
        manualCarousel();
      }
    });

    $('.carousel').carousel({
      indicators: true,
      fullWidth: true,
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
      intervall = setInterval(triggerCarousel, duration);
    }
  }

  function manualCarousel() {
    if (intervall !== null) {
      pauseCarousel();
      intervall = setInterval(triggerCarousel, duration);
    }
  }

})(jQuery); // end of jQuery name space