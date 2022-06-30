const apiKey = "k_62onzirj";
const latestApi = `https://imdb-api.com/en/API/MostPopularMovies/${apiKey}`;
const topRatedApi = `https://imdb-api.com/en/API/Top250Movies/${apiKey}`;

let apis = [latestApi, topRatedApi];
let blocked = ["tt10298810" ,"tt0110912"]

export async function fetchData(api) {
  let request = fetch(api, {
    method: "GET",
  });
  let response = await request.then((response) => response.json());
  let info = await response.items;
  return info;
}

let boxParents = document.querySelectorAll(".movies .content");

for (let i = 0; i < apis.length; i++) {
  let data = fetchData(apis[i]);
  addDataToBoxs(data, boxParents[i]);
}

let box = document.createElement("div");
box.className = "box";
box.innerHTML = `<div class="image">
    <div class="box-overlay"></div>
    <img src="./imgs/movie-1.jpg" alt="">
    <div class="discription">
      <div class="title">Sherlock Holmes</div>
      <div class="discript-content">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </div>
    </div>
  </div>
  <div class="info space-between-items">
    <div class="name">Sherlock Holmes</div>
    <div class="rate">
      <span>0.0</span>
      <i class="fas fa-star"></i>
    </div>
  </div>
  <div class="info space-between-items">
    <div class="quality">HD</div>
    <a href="./watch/" class="watch custom-btn"><i class="fas fa-play"></i> Watch</a>
  </div>`;

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
  let images = $(".movies .content .box .image img");
  callImgs();
  $(window).resize(callImgs);

  function callImgs() {
    images.each(getImageSize);
  }

  function getImageSize(index, image) {
    let $img = $(image);
    let load = setInterval(resize, 1);
    function resize() {
      let h = $img.height();
      if (h > 0) {
        $img.height("100%");
        $img.parent().height("calc(100% - 73px)");
        clearInterval(load);
      }
    }
  }
}
