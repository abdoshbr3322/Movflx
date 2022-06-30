import {fetchData} from "./get_data.js";

$(document).ready(function () {
  // Open Mega Menu On Hover On Desktop
  let megaMenuOpener = $("header nav ul li.menu-parent");
  let megaMenu = $("header nav ul li.menu-parent .mega-menu");
  let menu = $("nav ul");
  toggleDesktopMenu();
  $(window).resize(toggleDesktopMenu);

  function toggleDesktopMenu() {
    checkWindowSize();
    if (megaMenu.hasClass("desktop")) {
      megaMenuOpener.hover(
        function () {
          $(megaMenu).slideDown("fast");
        },
        function () {
          $(megaMenu).slideUp("fast");
        }
      );
    }
  }
  function checkWindowSize() {
    let signUp = document.querySelector("header nav ul li.signup a");
    if (window.innerWidth >= 992) {
      menu.removeClass("menu-active");
      $(document.body).removeClass("menu-active");
      megaMenu.css("display", "none").addClass("desktop");
      $(signUp).addClass("custom-btn");
    } else {
      megaMenu.removeClass("desktop").css("display", "block");
      megaMenuOpener.off("hover");
      $(signUp).removeClass("custom-btn");
    }
  }

  // Open ,Close Menu And Nav On Click On Mobile Screen
  let menuOpenerCloser = $(".menu-opener , .menu-closer");
  menuOpenerCloser.click(function () {
    let targetMenuSelector = $(this).attr("data-menu");
    $(targetMenuSelector).toggleClass("menu-active");
    if (targetMenuSelector.indexOf("navbar") > -1) {
      $(document.body).toggleClass("menu-active");
    }
  });

  // Close Menu On Blur

  let overlay = $("nav .overlay");

  overlay.click(() => {
    menu.removeClass("menu-active");
    $(document.body).removeClass("menu-active");
  });

  // Show Header And Scroll Top Button On Scroll

  let header = $("header");
  let scrollTop = $(".scroll-to-top");

  changeOnScroll(header, "fixed", 335);
  changeOnScroll(scrollTop, "active", 335);

  function changeOnScroll(el, className, scrollPosition) {
    checkScrollPosition(el, className, scrollPosition);
    $(window).on("scroll", () => {
      checkScrollPosition(el, className, scrollPosition);
    });
  }

  function checkScrollPosition(el, className, scrollPosition) {
    if ($(window).scrollTop() >= scrollPosition) {
      el.addClass(className);
    } else {
      el.removeClass(className);
    }
  }

  // make the scroll top button

  scrollTop.click(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

