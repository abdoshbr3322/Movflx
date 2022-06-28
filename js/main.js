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

  // Reize Images

  let images = $(".movies .content .box .image img");
  resizeImgs();
  $(window).resize(resizeImgs);

  function resizeImgs() {
    images.each(getImageSize);
  }

  function getImageSize(index, image) {
    let $img = $(image);
    let load = setInterval(resize, 1);
    function resize() {
      let h = $img.height();
      if (h > 0) {
        $img.parent().height(h);
        clearInterval(load);
      }
    }
  }
});

// const key = "7fc9363d34mshca4b24f8e510b2ap117c58jsnc0678d35766b";
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': key,
// 		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
// 	}
// };

// fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=tt0388629', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

const apiURL = "https://imdb-api.com/en/API/MostPopularMovies/";
const apiKey = "k_62onzirj";

fetch("https://imdb-api.com/API/AdvancedSearch/k_62onzirj?title=sherlock", {
  method: "GET",
})
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    throw new Error(err);
  });
