/** @format */
const gamesContainer = document.getElementById("games-container");
const loadGamesBtn = document.getElementById("load-more");

async function getGameList() {
  try {
    const fetchResult = await fetch("https://www.freetogame.com/api/games");
    const fetchedData = await fetchResult.json();
    // check if the fetch worked and check the data from json file
    console.log(fetchResult);
    console.log(fetchedData);
    addGamesToList(fetchedData);
  } catch (error) {
    console.log(error.message);
  }
}

getGameList();

let currentIndex = 0;
let gamesToLoad = 50; // amount of games that get loaded

const addGamesToList = (fetchedData) => {
  const loadedGames = fetchedData.slice(
    currentIndex,
    currentIndex + gamesToLoad
  );
  //   console.log(e.title);
  loadedGames.forEach((e) => {
    const gameContainer = document.createElement("div");
    const gameInfoContainer = document.createElement("div");
    gameContainer.classList.add("game-container");
    gameInfoContainer.classList.add("game-info");
    const gameTitle = document.createElement("h4");
    gameTitle.textContent = e.title;
    gameTitle.classList.add("display-content");
    const gameImage = document.createElement("img");
    gameImage.src = e.thumbnail;
    gameInfoContainer.append(gameTitle);
    gameContainer.append(gameInfoContainer);
    gameContainer.style.background = `url('${e.thumbnail}')`;
    gamesContainer.append(gameContainer);
  });
};

loadGamesBtn.addEventListener("click", () => {
  currentIndex += gamesToLoad;
  getGameList();
});
