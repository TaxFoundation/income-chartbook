'use strict';

// Initialize slide to display content for any given hash route
function setSlide() {
  if ($('.active-slide').length) {
    $('.active-slide').removeClass('active-slide');
    $('.active-li').removeClass('active-li');
  }

  var firstSlide = '#' + document.getElementsByTagName('section')[0].id;
  var slide = window.location.hash || firstSlide;
  var slideSection = $(slide);
  if (slideSection.length) {
    setSlideClasses(slideSection);
    $('li[onclick*="' + slide + '"]').addClass('active-li');
  } else {
    window.location.hash = firstSlide;
    setSlideClasses($(firstSlide));
  }
}

// Set specified slide as .active-slide, all before as .previous-slide, and all after as .next-slide
function setSlideClasses(slide) {
  var nextSlide = slide.nextAll();
  var previousSlide = slide.prevAll();
  slide.removeAttr('class').addClass('active-slide');
  if (nextSlide.length) {
    nextSlide.removeAttr('class').addClass('next-slide');
  }

  if (previousSlide.length) {
    previousSlide.removeAttr('class').addClass('previous-slide');
  }
}

// Transition to the next slide
function nextSlide() {
  var slide = $('.active-slide');
  var newSlide = slide.next();
  if (newSlide.length) {
    slideTransition(slide, newSlide, 'next');
  }
}

// Transition to the previous slide
function previousSlide() {
  var slide = $('.active-slide');
  var newSlide = slide.prev();
  if (newSlide.length) {
    slideTransition(slide, newSlide, 'previous');
  }
}

// Handle transitions and their animations through CSS classes
function slideTransition(slide, newSlide, direction) {
  var otherDirection = direction === 'next' ? 'previous' : 'next';

  window.location.hash = '#' + newSlide.attr('id');
  $('.active-li').removeClass('active-li');
  $('li[onclick*="#' + newSlide.attr('id') + '"]').addClass('active-li');
  slide.addClass(otherDirection + '-slide').removeClass('active-slide');
  newSlide.removeClass(direction + '-slide').addClass('active-slide');
}

// Change slides from the nav menu
function changeSlide(slide) {
  window.location.hash = slide;
  setSlide();
  toggleNavMenu();
}

// Toggles nav menu visibility on mobile; has no effect on desktop
function toggleNavMenu() {
  var navMenu = $('#nav-menu');
  if (navMenu.hasClass('nav-open-mobile')) {
    navMenu.removeClass('nav-open-mobile');
  } else {
    navMenu.addClass('nav-open-mobile');
  }
}

function handleArrowKeys(e) {
  e = e || window.event;

  if (e.keyCode == '37') {
    previousSlide();
  } else if (e.keyCode == '39') {
    nextSlide();
  }
}

// Use Hammer.js for swipe actions; only created if screen size <= 800px
if ($(window).width() <= 800) {
  var chartbook = document.getElementById('slides');
  var menu = document.getElementById('nav-menu');

  var slideSwipe = new Hammer(chartbook);
  var menuSwipe = new Hammer(menu);

  slideSwipe.on('swipeleft', function() {
    nextSlide();
  });

  slideSwipe.on('swiperight', function() {
    previousSlide();
  });

  menuSwipe.on('swipeleft', function() {
    toggleNavMenu();
  });
}

$('document').ready(function() {
  setSlide();
  document.onkeydown = handleArrowKeys;
});
