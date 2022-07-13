const apiKey = "k_62onzirj";
const latestApi = `https://imdb-api.com/en/API/MostPopularMovies/${apiKey}`;
const topRatedApi = `https://imdb-api.com/en/API/Top250Movies/${apiKey}`;

let apis = [latestApi, topRatedApi];
let blocked = ["tt10298810", "tt0110912"];

export async function fetchData(api) {
  let request = fetch(api, {
    method: "GET",
  });
  let response = await request.then((response) => response.json());
  let info = await response.items;
  return info;
}

let boxParents = document.querySelectorAll(".movies .content");

let box = document.querySelector(".movies .content .box").cloneNode(true);

for (let i = 0; i < apis.length; i++) {
  let data = fetchData(apis[i]);
  addDataToBoxs(data, boxParents[i]);
}

document.querySelector(".movies .content .box").remove();

/**
 * @param {Promise} data
 * @param {Element} boxParent
 */

async function addDataToBoxs(data, boxParent) {
  let info = await data;
  $(boxParent).empty();
  for (let i = 0; i < (info.length > 25 ? 25 : info.length); i++) {
    if (blocked.indexOf(info[i].id) > -1) continue;
    let ID;
    let movieBox = box.cloneNode(true);
    ({
      image: movieBox.querySelector("img").src,
      fullTitle: movieBox.querySelector(".discription .title").textContent,
      title: movieBox.querySelector(".name").textContent,
      imDbRating: movieBox.querySelector(".rate span").textContent,
      id: ID,
    } = info[i]);

    movieBox.querySelector(".watch").href = `./watch?id=${ID}`;
    movieBox.querySelector(".name").title = info[i].title;
    boxParent.appendChild(movieBox);
    resizeImgs();
  }
}

// Resize Images

function resizeImgs() {
  let images = Array.from(
    document.querySelectorAll(".movies .content .box .image img")
  );
  callImgs();
  window.onresize = callImgs;

  function callImgs() {
    images.forEach(getImageSize);
  }

  /**
   *
   * @param {Element} image
   */
  function getImageSize(image) {
    let h;
    let load = () => {
      setTimeout(resize, 50);
    };
    resize();
    function resize() {
      h = image.getBoundingClientRect().height;
      if (h) {
        image.parentElement.style.height = "calc(100% - 73px)";
        image.style.height = "100%";
        return;
      }
      load();
    }
  }
}