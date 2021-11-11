$(function() {
  $('.slideshow').each(function() {
    var $container = $(this),
        $slideGroup = $container.find('.slideshow-slides'),
        $slides = $slideGroup.find('.slide'),
        $nav = $container.find('.slideshow-nav'),
        $indicator = $container.find('.slideshow-indicator'),

        slideCount = $slides.length,
        indicatorHTML = '',
        currentIndex = 0,
        duration = 500,
        easing = 'easeInOutExpo',
        interval = 7500,
        timer;

        $slides.each(function(i) {
          $(this).css({ left: 100 * i + '%' });
          indicatorHTML += '<a href="#">' + (i + 1) + '</a>';
        });

        $indicator.html(indicatorHTML);

        function goToSlide(index) {
          $slideGroup.animate({ left: - 100 * index + '%' }, duration, easing);
          currentIndex = index;
          updateNav();
        }

        function updateNav() {
          var $navPrev = $nav.find('.prev'),
              $navNext = $nav.find('.next');
          if(currentIndex === 0) {
            $navPrev.addClass('disabled');
          } else {
            $navPrev.removeClass('disabled');
          }

          if(currentIndex === slideCount - 1) {
            $navNext.addClass('disabled');
          } else {
            $navNext.removeClass('disabled');
          }

          $indicator.find('a').removeClass('active')
            .eq(currentIndex).addClass('active');
        }

        function startTimer () {
          timer = setInterval(function() {
            var nextIndex = (currentIndex + 1) % slideCount;
            goToSlide(nextIndex);
          }, interval);
        }

        function stopTimer() {
          clearInterval(timer);
        }

        $nav.on('click', 'a', function(event) {
          event.preventDefault();
          if($(this).hasClass('prev')) {
            goToSlide(currentIndex - 1);
          } else {
            goToSlide(currentIndex + 1);
          }
        });

        $indicator.on('click', 'a', function(event) {
          event.preventDefault();
          if(!$(this).hasClass('active')) {
            goToSlide($(this).index());
          }
        });

        $container.on({
          mouseenter: stopTimer,
          mouseleave: startTimer
        });

        goToSlide(currentIndex);
        startTimer();
  });

  // ここからsticky header
  $('.page-header').each(function() {
    var $window = $(window),
        $header = $(this),
        $headerClone = $header.contents().clone(),
        $headerCloneContainer = $('<div class="page-header-clone"></div>'),
        threshold = $header.offset().top + $header.outerHeight();

    $headerCloneContainer.append($headerClone);

    $headerCloneContainer.appendTo('body');

    $window.on('scroll', $.throttle(1000 / 15, function() {
      if($window.scrollTop() > threshold) {
        $headerCloneContainer.addClass('visible');
      } else {
        $headerCloneContainer.removeClass('visible');
      }
    }));

    $window.trigger('scroll');
  });

  //ここからタブ
  $('.work-section').each(function() {
    var $container = $(this),
        $navItems = $container.find('.tabs-nav li'),
        $highlight = $container.find('.tabs-highlight');

    $container.tabs({
      hide: { duration: 250 },
      show: { duration: 125 },
      create: moveHighlight,
      activate: moveHighlight,
    });

    function moveHighlight(event, ui) {
      var $newTab = ui.newTab || ui.tab,
          left = $newTab.position().left;
      $highlight.animate({ left: left }, 500, 'easeOutExpo');
    }
  });

  $('.back-to-top').on('click', function() {
    $.smoothScroll({
      easing: 'easeOutExpo',
      speed: 500
    });
  });
})