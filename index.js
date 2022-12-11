async function getAlbums() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0804dffc02mshffe59d44538faefp143e0bjsne323b0c03419',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
    },
  }
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=hello`,
    options,
  )

  const listOfSearch = await response.json()
  return listOfSearch
}

async function getSongs() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0804dffc02mshffe59d44538faefp143e0bjsne323b0c03419',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
    },
  }
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=skillet`,
    options,
  )

  const listOfSongs = await response.json()
  return listOfSongs
}

async function getArtist() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0804dffc02mshffe59d44538faefp143e0bjsne323b0c03419',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
    },
  }
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=song`,
    options,
  )

  const listOfArtists = await response.json()
  return listOfArtists
}

window.onload = async () => {
  const listOfSearch = await getAlbums()
  const listOfSongs = await getSongs()
  const listOfArtists = await getArtist()
  console.log(listOfArtists)
  console.log(listOfSearch)
  console.log(listOfSongs)
  fillPageAlbums(listOfSearch)
  fillPageSongs(listOfSongs)
  fillPageArtists(listOfArtists)
  getParsedArray()
  fillPlaylist()
  getUser()
}
// window.onload = () => {

// };
let topsidecards = document.querySelector('#topsidecards')
let firstRow = document.querySelector('#firstAlbumRow')
let secondRow = document.querySelector('#secondAlbumRow')

const fillPageAlbums = function (listOfSearch) {
  topsidecards.innerHTML = ''
  for (i = 0; i < 10; i++) {
    topsidecards.innerHTML += `<a href="albums.html?albumID=${listOfSearch.data[i].album.id}"<div class="sidecards col-2">
<img
  class="col-4"
  src="${listOfSearch.data[i].album.cover_medium}"
  alt=""
/>
<p class="col-8 sidetext">${listOfSearch.data[i].album.title}</p>
</div></a>`
  }
}

const fillPageSongs = function (listOfSongs) {
  firstRow.innerHTML = ''
  for (i = 0; i < 8; i++) {
    firstRow.innerHTML += `<a href="artists.html?artistID=${listOfSongs.data[i].artist.id}"<div class="albumCard">
        <img
          class="col-11"
          src="${listOfSongs.data[i].album.cover_medium}"
          alt=""
        />
        <div class="albumText">
          <p>${listOfSongs.data[i].artist.name}</p>
          <p>${listOfSongs.data[i].title}</p>
        </div>
      </div></a>`
  }
}

const fillPageArtists = function (listOfArtists) {
  secondRow.innerHTML = ''
  for (i = 0; i < 8; i++) {
    secondRow.innerHTML += `<a href="albums.html?albumID=${listOfArtists.data[i].album.id}"<div class="albumCard">
          <img
            class="col-11"
            src="${listOfArtists.data[i].artist.picture}"
            alt=""
          />
          <div class="albumText pb-4">
            <p>${listOfArtists.data[i].artist.name}</p>
            </div>
        </div></a>`
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
