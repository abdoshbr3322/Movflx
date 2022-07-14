async function fetchData(api) {
  let request = fetch(api, {
    method: "GET",
  });
  let response = await request.then((response) => response.json());
  let info = await response.items;
  return info;
}

async function addDataToBoxs(data, boxParent, box, blocked) {
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

    movieBox.querySelector(".watch-link").href = `./watch?id=${ID}`;
    movieBox.querySelector(".name").title = info[i].title;
    boxParent.appendChild(movieBox);
    resizeImgs();
  }
}

export { fetchData, addDataToBoxs };
