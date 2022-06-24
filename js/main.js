$(document).ready(function () {
  // Open Mega Menu On Hover On Desktop
  let megaMenuOpener = $("header nav ul li.menu-parent");
  let megaMenu = $("header nav ul li.menu-parent .mega-menu");
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
    console.log(signUp)
    if (window.innerWidth >= 992) {
      megaMenu.css("display", "none");
      megaMenu.addClass("desktop");
      $(signUp).addClass("custom-btn");
    } else {
      megaMenu.removeClass("desktop");
      megaMenu.css("display", "block");
      megaMenuOpener.unbind("mouseenter mouseleave");
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

  // make the logic of scroll top button

  scrollTop.click(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

// Get Info From Api

let images = document.querySelectorAll(".movies .content .box .image img");
window.addEventListener("resize" ,resizeImgsP)
resizeImgsP();

function resizeImgsP() {
  images.forEach((image) => {
    getImageSize(image, function (height) {
      image.parentElement.style.height = height + "px";
    });
  });
}

function getImageSize($img, resizeImage) {
  var wait = setInterval(function () {
    let imageDimentions = $img.getBoundingClientRect();
    let h = imageDimentions.height;
    if (h) {
      clearInterval(wait);
      resizeImage.apply(this, [ h]);
    }
  }, 30);
}

