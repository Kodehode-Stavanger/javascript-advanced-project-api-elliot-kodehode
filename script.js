async function getGameList() {
    try {
        const fetchResult = await fetch("https://free-to-play-games-database.p.rapidapi.com/api");
        const fetchedData = await fetchResult.json();
        console.log(fetchResult)
        console.log(fetchedData)
    } catch (error) {
        console.log(error.message)
    }
}

getGameList()