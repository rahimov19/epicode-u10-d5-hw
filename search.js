let allButton = document.querySelector('#searchAllButton')
let songsButton = document.querySelector('#searchSongsButton')
let albumsButton = document.querySelector('#searchAlbumsButton')
let artistsButton = document.querySelector('#searchArtistsButton')

let searchBar = document.querySelector('#searchbar')
async function getSongs() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0804dffc02mshffe59d44538faefp143e0bjsne323b0c03419',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
    },
  }
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchBar.value}`,
    options,
  )

  const listOfSearch = await response.json()
  return listOfSearch
}

window.onload = async () => {
  searchBar.value = 'hello'
  const listOfSearch = await getSongs()
  console.log(listOfSearch)
  fillLeft(listOfSearch)
  document.querySelector('#searchbar').addEventListener('keyup', getSongs2)
  document
    .querySelector('#searchAllButton')
    .addEventListener('click', function () {
      returnToAll()
      getSongs2
    })
  document
    .querySelector('#searchAllButton')
    .addEventListener('click', function () {
      songsButton.className = 'btn btn-dark searchbuttons'
      allButton.className = 'btn btn-dark searchbuttons active'
      artistsButton.className = 'btn btn-dark searchbuttons'
      albumsButton.className = 'btn btn-dark searchbuttons'
      returnToAll()
      getSongs2(event)
    })
  document
    .querySelector('#searchbar')
    .addEventListener('click', function (event) {
      event.target.value = ''
    })
  document
    .querySelector('#searchSongsButton')
    .addEventListener('click', function () {
      fillSearchSongs()
    })
  document
    .querySelector('#searchArtistsButton')
    .addEventListener('click', function () {
      fillSearchArtists()
    })
  document
    .querySelector('#searchAlbumsButton')
    .addEventListener('click', function () {
      fillSearchAlbums()
    })

  getParsedArray()
  fillPlaylist()
  getUser()
}

let leftSideSearch = document.querySelector('#leftSearch')
let rightSideSeacrh = document.querySelector('#rightSearch')
let albumsSearch = document.querySelector('#searchAlbums')
let artistsSearch = document.querySelector('#searchArtists')
let mainRow = document.querySelector('#mainrow')

let clearAll = function () {
  document.querySelector('#leftSearch').innerHTML = ''
  document.querySelector('#rightSearch').innerHTML = ''
  document.querySelector('#searchAlbums').innerHTML = ''
  document.querySelector('#searchArtists').innerHTML = ''
}

let returnToAll = function () {
  document.querySelector('.main-content').innerHTML = ''
  document.querySelector(
    '.main-content',
  ).innerHTML = `<div class="row" id="undersearch">
    <div class="col-3" id="h3BR"><h3>Best Result:</h3></div>
    <div class="col-9 pl-5" id="h3S"><h3>Songs:</h3></div>
   
</div>

<div class="row" id="mainrow"> 
    <div class="col-3" id="leftSearch">
    <img src="" alt="">
    <h3>Name of Album</h3>
    <p>Name of Artist</p>
</div>
<div class="col-9" >
    <ul id="rightSearch">
        <li><img src="" alt=""><span>Name of Artist</span><span>Name of track</span>
        <span>duration</span></li>
    </ul>
</div>
</div>
<h2 id="h2Albums">Albums</h2>
<div class="row" id="searchAlbums">
</div>
<h2 id="h2Artists">Artists</h2>
<div class="row" id="searchArtists">
</div>`
}

let fillLeft = function (listOfSearch) {
  console.log('fillleft')
  clearAll()

  document.querySelector(
    '#leftSearch',
  ).innerHTML = `<a href="albums.html?albumID=${listOfSearch.data[0].album.id}" class="aleftInside"><div class=leftInside><img src=${listOfSearch.data[0].album.cover_medium} class="sideImg" alt="">
    <h3>${listOfSearch.data[0].album.title}</h3>
    <p>${listOfSearch.data[0].artist.name}</p></div></a>`
  document.querySelector('#rightSearch').innerHTML = ''
  for (i = 0; i < 6; i++) {
    document.querySelector(
      '#rightSearch',
    ).innerHTML += `<li><a href="#" class="row col-12 songslist" onclick="playSong('${
      listOfSearch.data[i].title
    }', '${listOfSearch.data[i].artist.name}', '${
      listOfSearch.data[i].album.cover_small
    }', '${listOfSearch.data[i].preview}', event)"><img src=${
      listOfSearch.data[i].album.cover_small
    } alt=""> 
    <div class="spanText col-10"><span>${
      listOfSearch.data[i].artist.name
    }</span>
    <span>${listOfSearch.data[i].title}</span></div>
    <span class="duration">${
      (listOfSearch.data[i].duration - (listOfSearch.data[i].duration %= 60)) /
        60 +
      (9 < listOfSearch.data[i].duration ? ':' : ':0') +
      listOfSearch.data[i].duration
    }</span></a></li>`
  }
  for (i = 0; i < 6; i++) {
    document.querySelector('#searchAlbums').innerHTML += `
    <a class="col-2" href="albums.html?albumID=${listOfSearch.data[i].album.id}"><div class="col-12"> <div class="searchCard"><img class="cardimg" src=${listOfSearch.data[i].album.cover_medium}>
<h5>${listOfSearch.data[i].album.title}</h5>
<p>${listOfSearch.data[i].artist.name}</p>

</div></div></a> `
  }

  for (i = 0; i < 6; i++) {
    document.querySelector('#searchArtists').innerHTML += `
    <a class="col-2" href="artists.html?artistID=${listOfSearch.data[i].artist.id}"><div class="col-12"> <div class="searchCard"><img class="cardimg" src=${listOfSearch.data[i].artist.picture_medium}>
<h5>${listOfSearch.data[i].artist.name}</h5>
<p>Artist</p>
</div></div> </a>`
  }
}

const getSongs2 = async (event) => {
  if (event.keyCode === 13 || event.target.id === 'searchAllButton') {
    try {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key':
            '0804dffc02mshffe59d44538faefp143e0bjsne323b0c03419',
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
        },
      }
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchBar.value}`,
        options,
      )
      if (response.ok) {
        const listOfSearch = await response.json()
        console.log('getSongs2')
        if (
          document
            .querySelector('#searchAllButton')
            .classList.contains('active')
        ) {
          fillLeft(listOfSearch)
        } else if (
          document
            .querySelector('#searchSongsButton')
            .classList.contains('active')
        ) {
          fillSearchSongs(listOfSearch)
        } else if (
          document
            .querySelector('#searchAlbumsButton')
            .classList.contains('active')
        ) {
          fillSearchAlbums(listOfSearch)
        } else if (
          document
            .querySelector('#searchArtistsButton')
            .classList.contains('active')
        ) {
          fillSearchArtists(listOfSearch)
        } else {
          console.log('something')
        }
      } else {
        console.log('Error while fetching')
      }
    } catch (error) {
      console.error(error)
    }
  }
}

const fillSearchSongs = async () => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '0804dffc02mshffe59d44538faefp143e0bjsne323b0c03419',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
      },
    }
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchBar.value}`,
      options,
    )
    if (response.ok) {
      const listOfSongsSearch = await response.json()
      console.log(listOfSongsSearch)
      fillSongs(listOfSongsSearch)
    } else {
      console.log('Error while fetching')
    }
  } catch (error) {
    console.error(error)
  }
}

let fillSongs2 = function () {
  console.log('fillsongs2')
  // clearAll();
  document.querySelector('#h2Albums').innerHTML = ''
  document.querySelector('#h2Artists').innerHTML = ''
  document.querySelector(
    '#h3BR',
  ).innerHTML = `<h3 class="mb-3">Search Results:</h3>`
  document.querySelector('#h3S').innerHTML = ''
  document.querySelector('#searchAlbums').innerHTML = ''
  document.querySelector('#searchArtists').innerHTML = ''

  document.querySelector('#mainrow').innerHTML = `<table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Album</th>
            <th scope="col">Duration</th>
          </tr>
        </thead>
        
      <tbody id="tablebody"></tbody>
      `
}

let fillSongs = function (listOfSearch) {
  console.log('fillsongs')
  fillSongs2()
  for (i = 0; i < 20; i++) {
    document.querySelector('#tablebody').innerHTML += `
    <tr>

        <th scope="row">${[i + 1]}</th>
        <td><div class="songtitle"><img src=${
          listOfSearch.data[i].album.cover_small
        } alt=""><a class="col-10" href="search.html">
        <div class="spanText col-10"><span>${
          listOfSearch.data[i].artist.name
        }</span>
        <span>${listOfSearch.data[i].title}</span></div></a></td>
        <td><a href="albums.html?albumID=${listOfSearch.data[i].album.id}">${
      listOfSearch.data[i].album.title
    }</a></td>
        <td>${
          (listOfSearch.data[i].duration -
            (listOfSearch.data[i].duration %= 60)) /
            60 +
          (9 < listOfSearch.data[i].duration ? ':' : ':0') +
          listOfSearch.data[i].duration
        }</td>
      </tr>

  `
  }
  mainRow.innerHTML += `
</table>`
  songsButton.className = 'btn btn-dark searchbuttons active'
  allButton.className = 'btn btn-dark searchbuttons'
  artistsButton.className = 'btn btn-dark searchbuttons'
  albumsButton.className = 'btn btn-dark searchbuttons'
}

const fillSearchArtists = async () => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '0804dffc02mshffe59d44538faefp143e0bjsne323b0c03419',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
      },
    }
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchBar.value}`,
      options,
    )
    if (response.ok) {
      const listOfSongsSearch = await response.json()
      console.log(listOfSongsSearch)
      fillArtists(listOfSongsSearch)
    } else {
      console.log('Error while fetching')
    }
  } catch (error) {
    console.error(error)
  }
}

let fillArtists2 = function () {
  songsButton.className = 'btn btn-dark searchbuttons'
  allButton.className = 'btn btn-dark searchbuttons'
  artistsButton.className = 'btn btn-dark searchbuttons active'
  albumsButton.className = 'btn btn-dark searchbuttons'

  console.log('fillArtists2')
  //   clearAll();
  document.querySelector('#searchAlbums').innerHTML = ''
  document.querySelector('#searchArtists').innerHTML = ''
  document.querySelector('#h2Albums').innerHTML = ''
  document.querySelector('#h2Artists').innerHTML = ''
  document.querySelector(
    '#h3BR',
  ).innerHTML = `<h3 class="mb-3">Search Results:</h3>`
  document.querySelector('#h3S').innerHTML = ''

  document.querySelector(
    '#mainrow',
  ).innerHTML = `<div id="artistsbody" class="row col-12 ml-3"></div>`
}

let fillArtists = function (listOfSearch) {
  console.log('fillArtists')
  fillArtists2()
  for (i = 0; i < 30; i++) {
    document.querySelector('#artistsbody').innerHTML += `
         <a href="artists.html?artistID=${listOfSearch.data[i].artist.id}"><div class="searchArtistCard col-2 mb-3" >
         <img class="artistSearchImg" src=${listOfSearch.data[i].artist.picture_medium}>
         <h5>${listOfSearch.data[i].artist.name}</h5>
         <p>Artist</p></a>
         `
  }
}

const fillSearchAlbums = async () => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '0804dffc02mshffe59d44538faefp143e0bjsne323b0c03419',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
      },
    }
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchBar.value}`,
      options,
    )
    if (response.ok) {
      const listOfSongsSearch = await response.json()
      console.log(listOfSongsSearch)
      fillAlbums(listOfSongsSearch)
    } else {
      console.log('Error while fetching')
    }
  } catch (error) {
    console.error(error)
  }
}

let fillAlbums2 = function () {
  songsButton.className = 'btn btn-dark searchbuttons'
  allButton.className = 'btn btn-dark searchbuttons'
  artistsButton.className = 'btn btn-dark searchbuttons '
  albumsButton.className = 'btn btn-dark searchbuttons active'

  console.log('fillAlbums2')
  //   clearAll();
  document.querySelector('#searchAlbums').innerHTML = ''
  document.querySelector('#searchArtists').innerHTML = ''
  document.querySelector('#h2Albums').innerHTML = ''
  document.querySelector('#h2Artists').innerHTML = ''
  document.querySelector(
    '#h3BR',
  ).innerHTML = `<h3 class="mb-3">Search Results:</h3>`
  document.querySelector('#h3S').innerHTML = ''

  document.querySelector(
    '#mainrow',
  ).innerHTML = `<div id="artistsbody" class="row col-12 ml-3"></div>`
}

let fillAlbums = function (listOfSearch) {
  console.log('fillAlbums')
  fillAlbums2()
  for (i = 0; i < 30; i++) {
    document.querySelector('#artistsbody').innerHTML += `
          <a href="albums.html?albumID=${listOfSearch.data[i].album.id}">
           <div class="searchArtistCard col-2 mb-3" >
           <img class="albumsSearchImg" src=${listOfSearch.data[i].album.cover_medium}>
           <h5>${listOfSearch.data[i].album.title}</h5>
           <p>${listOfSearch.data[i].artist.name}</p></a>
           `
  }
}

const audio = document.querySelector('#audio')
const pause = document.querySelector('.pause-footer')
const play = document.querySelector('.play-footer')

let playlistArray = []
let getParsedArray = function () {
  const arrayStr = localStorage.getItem('array')
  const parsedPlaylistArray = JSON.parse(arrayStr)
  // let aaa = playlistArray.concat(parsedPlaylistArray);
  // console.log(aaa);
  playlistArray = parsedPlaylistArray
}

let playlist = document.querySelector('.playlists')
// let playlistArray = parsedPlaylistArray;
fillPlaylist = function () {
  playlist.innerHTML = ''
  for (i = 0; i < playlistArray.length; i++) {
    playlist.innerHTML += `<div class="songInPlaylist" onclick="playFromPlaylist(event)"><span>${playlistArray[i].Artistname}</span> - <span class="songName">${playlistArray[i].Songname}</span></div>`
  }
}

let index = 0
const playFromPlaylist = function (event) {
  let foundIndex = playlistArray.findIndex(function (song, index2) {
    if (
      song.Songname == event.currentTarget.querySelector('.songName').innerText
    ) {
      index = index2
    }
  })

  console.log(index)
  playSongHeart()
}

const playSongHeart = function () {
  let songInPlaylist = document.querySelectorAll('.songInPlaylist')
  for (i = 0; i < songInPlaylist.length; i++) {
    songInPlaylist[i].className = 'songInPlaylist'
  }
  const songTitleFooter = document.querySelector('.footer-song')
  const artist = document.querySelector('.footer-artist')
  const footerCover = document.querySelector('.album-cover-footer')
  const footer = document.querySelector('.footer')
  footer.classList.remove('d-none')
  songTitleFooter.innerHTML = playlistArray[index].Songname
  artist.innerHTML = playlistArray[index].Artistname
  footerCover.setAttribute('src', playlistArray[index].image)
  audio.src = playlistArray[index].previewurl
  audio.play()
  songInPlaylist[index].className = 'playing songInPlaylist'
}

const previousSongButton = document.querySelector('.fa-backward-step')
previousSongButton.addEventListener('click', function () {
  index--
  if (index < 0) {
    index = playlistArray.length
  }
  playSongHeart()
})
const nextSongButton = document.querySelector('.fa-forward-step')
nextSongButton.addEventListener('click', function () {
  index++
  if (index > playlistArray.length) {
    index = 0
  }
  playSongHeart()
})

pause.addEventListener('click', function () {
  audio.pause()
})
play.addEventListener('click', function () {
  audio.play()
})
const playerControls = () => {
  pause.classList.toggle('d-none')
  play.classList.toggle('d-none')
}

let username = document.querySelector('#username')
let getUser = function () {
  let login = localStorage.getItem('login')
  username.innerText = login
}

const playSong = (footerSong, footerArtist, albumCover, songPreview, event) => {
  //Gets the DOM elements of the footer
  const songTitleFooter = document.querySelector('.footer-song')
  const artist = document.querySelector('.footer-artist')
  const footerCover = document.querySelector('.album-cover-footer')

  const footer = document.querySelector('.footer')
  footer.classList.remove('d-none')

  //Search the DOM for all elements that are currently 'green' (the one being played), and turn them white again
  const currentlyPlayed = document.querySelectorAll('.playing')

  for (let i = 0; i < currentlyPlayed.length; i++) {
    currentlyPlayed[i].classList.remove('playing')
  }

  //Turns the clicked element green to show that it is currently playing
  //event.target.classList.add('playing')

  // Assigns the values passed in the function to the DOM elements in the footer
  songTitleFooter.innerHTML = footerSong
  artist.innerHTML = footerArtist
  footerCover.setAttribute('src', albumCover)
  audio.src = songPreview
  audio.play()
}
