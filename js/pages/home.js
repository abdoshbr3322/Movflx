import * as data from '../get_data.js';

const API_KEY = "k_62onzirj";
const latestApi = `https://imdb-api.com/en/API/MostPopularMovies/${API_KEY}`;
const topRatedApi = `https://imdb-api.com/en/API/Top250Movies/${API_KEY}`;
let apis = [latestApi, topRatedApi];
let blocked = ["tt10298810", "tt0110912", "tt10731256", "tt1655389", "tt0107120", "tt9731598", "tt0118799"];
let boxParents = document.querySelectorAll(".movies .content");
let box = document.querySelector(".movies .content .box").cloneNode(true);

for (let i = 0; i < apis.length; i++) {
  let info = data.fetchData(apis[i]);
  data.renderData(info, boxParents[i] ,box ,blocked);
}

document.querySelector(".movies .content .box").remove();
