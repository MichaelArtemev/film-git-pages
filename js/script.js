"use strict";

var clockFunc = function clockFunc() {
  function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor(t / 1000 % 60);
    var minutes = Math.floor(t / 1000 / 60 % 60);
    var hours = Math.floor(t / (1000 * 60 * 60) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

  function initializeClock(id, endtime) {
    var clock = document.getElementById(id);

    function updateClock() {
      var t = getTimeRemaining(endtime);
      clock.innerHTML = "".concat(t.days, " days ").concat(("0" + t.hours).slice(-2), " hours ").concat(("0" + t.minutes).slice(-2), " minutes ").concat(("0" + t.seconds).slice(-2), " seconds");

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }

  var deadline = "January 01 2021 00:00:00 GMT+0300"; // var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000); // for endless timer

  initializeClock("timer", deadline);
};

var burgerFunc = function burgerFunc() {
  var burger = document.querySelector(".hero__burger");
  var menu = document.querySelector(".hero__right-header");
  var body = document.querySelector("body");
  var wrapp = document.querySelector(".header-wrapp");
  var img = document.querySelector(".main-page__img-wrapper");
  var ulList = document.querySelector(".hero__list").children;
  var count = 0;

  while (count <= 4) {
    ulList[count].onclick = closeBurger;
    count++;
  }

  var checker = 0;

  function closeBurger() {
    img.style.display = "block";
    body.classList.remove("lock");
    menu.style.animation = "1.2s hideanim";
    setTimeout(function () {
      burger.classList.remove("active");
      menu.classList.remove("hero__right-header-active");
    }, 1000);
    checker = 0;
  }

  burger.onclick = function (e) {
    if (checker === 0) {
      img.style.display = "none";
      burger.classList.add("active");
      menu.style.animation = "1s opacity";
      menu.className += " hero__right-header-active";
      body.classList.add("lock");
      checker = 1;
    } else {
      closeBurger();
    }
  };
};

var sliderFunc = function sliderFunc() {
  function sliderCheck() {
    if (document.documentElement.clientWidth <= 458) {
      if (sliderRunTime === 458) {
        return;
      } else {
        sliderRunTime = 458;
        clearInterval(autoPlaySlider);
        slider(1);
      }
    } else if (document.documentElement.clientWidth <= 718 && document.documentElement.clientWidth > 458) {
      if (sliderRunTime === 718) {
        return;
      } else {
        sliderRunTime = 718;
        clearInterval(autoPlaySlider);
        slider(2);
      }
    } else if (document.documentElement.clientWidth <= 1200 && document.documentElement.clientWidth > 718) {
      if (sliderRunTime === 1200) {
        return;
      } else {
        sliderRunTime = 1200;
        clearInterval(autoPlaySlider);
        slider(3);
      }
    } else {
      if (sliderRunTime > 1250) {
        return;
      } else {
        sliderRunTime = 1300;
        clearInterval(autoPlaySlider);
        slider(5);
      }
    }
  }

  var checkTimer = setInterval(function () {
    sliderCheck();
  }, 1000);
  var sliderRunTime = 0;
  var autoPlaySlider = null;

  function slider(showCouner) {
    var position = 0;
    var slidesToShow = showCouner;
    var slidesToScroll = 1;
    var container = document.querySelector(".slider-container");
    var track = document.querySelector(".slider-track");
    var btnPrev = document.querySelector(".prev");
    var btnNext = document.querySelector(".next");
    var items = document.querySelectorAll(".slider-item");
    track.style.transform = 'translateX(0px)';
    var play = false;
    var timeoutKiller = null;
    var itemsCount = items.length;
    var itemWidth = 240;
    var movePosition = slidesToScroll * itemWidth;
    btnNext.addEventListener('click', function () {
      var itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
      position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
      clearInterval(autoPlaySlider); // if (play === false) {
      //   play = true;
      //   timeoutKiller = setTimeout(() => {
      //     autoPlay(2000);
      //   }, 5000)
      // }

      setPosition();
      checkBtns();
    });
    btnPrev.addEventListener('click', function () {
      var itemsLeft = Math.abs(position) / itemWidth;
      position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
      clearInterval(autoPlaySlider); // if (play === false) {
      //   play = true;
      //   timeoutKiller = setTimeout(() => {
      //     autoPlay(2000);
      //   }, 5000)
      // }

      setPosition();
      checkBtns();
    });

    var setPosition = function setPosition() {
      track.style.transform = "translateX(".concat(position, "px)");
    };

    var checkBtns = function checkBtns() {
      btnPrev.disabled = position === 0;
      btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
    };

    var autoPlay = function autoPlay(iterval) {
      play = false;
      autoPlaySlider = setInterval(function () {
        if (document.documentElement.clientWidth <= 458) {
          if (sliderRunTime === 458) {
            if (position === -2160) {
              position = 0;
            }
          }
        } else if (document.documentElement.clientWidth <= 718 && document.documentElement.clientWidth > 458) {
          if (sliderRunTime === 718) {
            if (position === -1920) {
              position = 0;
            }
          }
        } else if (document.documentElement.clientWidth <= 1200 && document.documentElement.clientWidth > 718) {
          if (sliderRunTime === 1200) {
            if (position === -1680) {
              position = 0;
            }
          }
        } else if (document.documentElement.clientWidth > 1200) {
          if (sliderRunTime > 1250) {
            if (position === -1200) {
              position = 0;
            }
          }
        }

        var itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
        position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
        setPosition();
        checkBtns();
      }, iterval);
    };

    checkBtns();
    autoPlay(2000);
  }
};

var searchFunc = function searchFunc() {
  var searchTrigger = document.querySelector("#search-span");
  var textInput = document.querySelector("#search-input");

  searchTrigger.onclick = function () {
    textInput.value = 'sorry try later'.toUpperCase();
  };
};

burgerFunc();
searchFunc();
sliderFunc();
clockFunc();
alertMsg();

function alertMsg() {
  var message = "Если вы запускаете сайт через gulp и находитесь на localhost: - webp файлы не успевают конвертироваться с 1 раза, просто нажмите f5 если увидите ошибки в консоли";
  alert(message);
  console.log(message);
}