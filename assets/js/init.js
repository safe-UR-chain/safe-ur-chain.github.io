(function ($) {

  var intervall = null;

  $(document).ready(function () {
    initMaterialize();
    $("#play-btn").on("click", playCarousel);
    $("#pause-btn").on("click", pauseCarousel);

    // autoplay of the banner
    setTimeout(playCarousel, 7000);
  });

  // functions 

  function initMaterialize() {

    M.AutoInit();

    $('.scrollspy').scrollSpy( {
      scrollOffset: 0
    });

    $('.materialboxed').materialbox();
    
    $('.parallax').parallax();

    $('.sidenav').sidenav();
    $('.modal').modal();
  
    $('.pushpin').pushpin({
      top: 150,
      offset: 75
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
      intervall = setInterval(triggerCarousel, 5500);
    }
  }

})(jQuery); // end of jQuery name space