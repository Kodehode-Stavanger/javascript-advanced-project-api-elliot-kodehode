/** @format */
const gamesContainer = document.getElementById('games-container')
const loadGamesBtn = document.getElementById('load-more')
const sortBy = document.getElementById('sort-by')
const filtersContainer = document.getElementById('filter')

let fetchedData
let currentIndex = 0
let gamesToLoad = 50 // amount of games that get loaded
let initialLoad = true

async function getGameList() {
	try {
		const fetchResult = await fetch('https://corsproxy.io/?https://www.freetogame.com/api/games')
		fetchedData = await fetchResult.json()

		// check if the fetch worked and check the data from json file
		console.log(fetchResult)
		sortFunc()
		displayGames()
		makeSortingBoxes(fetchedData)
	} catch (error) {
		console.log(error.message)
	}
}

getGameList()

function sortAndDisplayGames() {
	sortFunc()
	displayGames()
}

// const makeSortingBoxes = () => {
// 	const genres = [...new Set(fetchedData.map((e) => e.genre.trim()))]
// 	console.log(genres)

// 	const labelForToggle = document.createElement('label')
// 	labelForToggle.htmlFor = 'genre'
// 	const genreContainer = document.createElement('div')

// 	const genreSelect = document.createElement('select')
// 	genreSelect.name = 'genre'
// 	genreSelect.id = 'genre'

// 	const uncheckedGenre = document.createElement('option')
// 	uncheckedGenre.textContent = ''
// 	uncheckedGenre.defaultSelected = true
// 	uncheckedGenre.disabled = true

// 	for (let i = 0; i < genres.length; i++) {
// 		genreContainer.classList.add('genre-container')

// 		const genreOption = document.createElement('option')
// 		genreOption.value = genres[i]
// 		genreOption.textContent = genres[i]

// 		// labelForToggle.textContent = genres[i]
// 		labelForToggle.classList.add('genre-pick')

// 		genreSelect.append(genreOption)
// 		genreSelect.prepend(uncheckedGenre)
// 		genreContainer.append(genreSelect, labelForToggle)
// 	}

// 	// genreContainer.prepend(uncheckedGenre)
// 	filtersContainer.append(genreContainer)
// }

// makeSortingBoxes()

function sortFunc() {
	fetchedData
		// .filter((e) => (!showCompleted.checked ? !e.completed : e))
		.sort((a, b) => {
			switch (sortBy.value) {
				case 'release-new':
					return b.release_date.localeCompare(a.release_date)
				case 'release-old':
					return a.release_date.localeCompare(b.release_date)
				case 'alpha-az':
					return a.title.localeCompare(b.title)
				case 'alpha-za':
					return b.title.localeCompare(a.title)
			}
		})
}

function displayGames() {
	const loadedGames = fetchedData.slice(currentIndex, currentIndex + gamesToLoad)

	if (initialLoad) {
		initialLoad = false

		while (gamesContainer.firstChild) {
			gamesContainer.removeChild(gamesContainer.firstChild)
		}
	}
	loadedGames.forEach((e) => {
		// containers for games
		const gameContainer = document.createElement('div')
		const gameInfoContainer = document.createElement('div')
		gameContainer.classList.add('game-container')
		gameInfoContainer.classList.add('game-info')
		// game info
		const gameTitle = document.createElement('h4')
		gameTitle.textContent = e.title
		gameTitle.classList.add('display-content')

		const gameImage = document.createElement('img')
		gameImage.src = e.thumbnail

		const gameDesc = document.createElement('p')
		gameDesc.textContent = e.short_description
		gameDesc.classList.add('display-content')

		const playNow = document.createElement('a')
		playNow.href = e.game_url
		playNow.textContent = 'Play now'
		playNow.classList.add('play-now-btn')
		// appending things
		gameInfoContainer.append(gameTitle, gameDesc, playNow)
		gameContainer.append(gameInfoContainer)
		gameContainer.style.background = `url('${e.thumbnail}')`
		gamesContainer.append(gameContainer)
	})
	currentIndex += gamesToLoad
}

sortBy.addEventListener('change', () => {
	currentIndex = 0
	initialLoad = true

	sortAndDisplayGames()
})

loadGamesBtn.addEventListener('click', () => {
	displayGames()
})
