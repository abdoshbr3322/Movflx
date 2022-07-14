import * as data from '../get_data.js';

const apiKey = "k_62onzirj";
const latestApi = `https://imdb-api.com/en/API/MostPopularMovies/${apiKey}`;
const topRatedApi = `https://imdb-api.com/en/API/Top250Movies/${apiKey}`;
let apis = [latestApi, topRatedApi];
let blocked = ["tt10298810", "tt0110912"];
let boxParents = document.querySelectorAll(".movies .content");
let box = document.querySelector(".movies .content .box").cloneNode(true);

for (let i = 0; i < apis.length; i++) {
  let info = data.fetchData(apis[i]);
  data.addDataToBoxs(info, boxParents[i] ,box ,blocked);
}

document.querySelector(".movies .content .box").remove();
