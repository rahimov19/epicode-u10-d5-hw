const URLparams = new URLSearchParams(window.location.search)
const albumID = URLparams.get('albumID')
let albumInfoContainer = document.querySelector('#toppart')
let tracklistContainer = document.querySelector('#tracklist')
const baseUrl = `https://striveschool-api.herokuapp.com/api/deezer/album/`
// const albumId = 125973652;
async function getData() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0804dffc02mshffe59d44538faefp143e0bjsne323b0c03419',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
    },
  }

  const response = await fetch(baseUrl + albumID, options)
  const album = await response.json()
  console.log(album)
  return album
}
window.onload = async () => {
  const album = await getData()
  fillDataAlbum(album)
  fillDataSongs(album)
  let albumDate = new Date(album.release_date)
  console.log(albumDate.getFullYear())
  getParsedArray()
  fillPlaylist()
  getUser()
}

let fillDataAlbum = function (album) {
  albumInfoContainer.innerHTML = ''
  albumInfoContainer.innerHTML = `
  <div class="row">
    <div class="col-2" id="albumLeft"><img id="album-cover-album" src=${
      album.cover_xl
    }></div>
    <div class="col-10" id="albumRight">
      <div class="album-text">
        <p class="album-small-text">ALBUM</p>
        <h2 class="album-name">${album.title}</h2>
        <div>
          <img id="artist-small-pic" src=${album.artist.picture_small}>
          <span>${album.artist.name}</span>
          <span class="pl-1">${album.release_date}</span>
          <span>${album.nb_tracks} songs</span>
          <span>${
            (album.duration - (album.duration %= 60)) / 60 +
            (9 < album.duration ? ':' : ':0') +
            album.duration
          } 
        </div>
       </div>`
}

let fillDataSongs = function (listOfData) {
  tracklistContainer.innerHTML = `<li class="row align-items-center">
  
  <div class="song row border-bottom mb-3"><span>#</span><span class="my-auto">Title</span><span><i class="bi bi-clock"></i></span></div>
  `
  for (i = 0; i < listOfData.tracks.data.length; i++) {
    tracklistContainer.innerHTML += `
  <li class="row align-items-center">
    
    <div class="song row" onclick="playSong('${
      listOfData.tracks.data[i].title
    }', '${listOfData.tracks.data[i].artist.name}', '${
      listOfData.tracks.data[i].album.cover_small
    }', '${listOfData.tracks.data[i].preview}', event)"><span>${[i + 1]}</span>
    <div class="artisttitle"><span>${listOfData.tracks.data[i].title}</span></a>
    <span class="fw-light">${
      listOfData.tracks.data[i].artist.name
    } </span></div>
    <span class="song-length"><i class="fa-regular fa-heart iconheart" onclick="addEvent('${
      listOfData.tracks.data[i].title
    }','${listOfData.tracks.data[i].artist.name}', '${
      listOfData.tracks.data[i].preview
    }', '${listOfData.tracks.data[i].album.cover_small}', '${
      listOfData.tracks.data[i].duration
    }')"></i>${
      (listOfData.tracks.data[i].duration -
        (listOfData.tracks.data[i].duration %= 60)) /
        60 +
      (9 < listOfData.tracks.data[i].duration ? ':' : ':0') +
      listOfData.tracks.data[i].duration
    }</span></div>
`
  }
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

const pause = document.querySelector('.pause-footer')
const play = document.querySelector('.play-footer')
const playerControls = () => {
  pause.classList.toggle('d-none')
  play.classList.toggle('d-none')
}
let index = 0
let playlist = document.querySelector('.playlists')
let addEvent = function (title, artist, preview, coverimage, songduration) {
  if (!playlistArray.some((song) => song.Songname === title)) {
    index++
    playlistArray.push({
      Songname: title,
      Artistname: artist,
      previewurl: preview,
      image: coverimage,
      duration: songduration,
    })
    saveArray()
    console.log(localStorage)
    console.log(playlistArray)
    playlist.innerHTML = ''
    for (i = 0; i < playlistArray.length; i++) {
      playlist.innerHTML += `<div class="songInPlaylist" onclick="playFromPlaylist(event)"><span>${playlistArray[i].Artistname}</span> - <span class="songName">${playlistArray[i].Songname}</span></div>`
    }
  }
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

saveArray = function () {
  console.log(playlistArray)
  const jsonArr = JSON.stringify(playlistArray)
  localStorage.setItem('array', jsonArr)
}

let playlistArray = []
let getParsedArray = function () {
  const arrayStr = localStorage.getItem('array')
  const parsedPlaylistArray = JSON.parse(arrayStr)
  // let aaa = playlistArray.concat(parsedPlaylistArray);
  // console.log(aaa);
  playlistArray = parsedPlaylistArray
}
fillPlaylist = function () {
  playlist.innerHTML = ''
  for (i = 0; i < playlistArray.length; i++) {
    playlist.innerHTML += `<div class="songInPlaylist" onclick="playFromPlaylist(event)"><span>${playlistArray[i].Artistname}</span> - <span class="songName">${playlistArray[i].Songname}</span></div>`
  }
}

let username = document.querySelector('#username')
let getUser = function () {
  let login = localStorage.getItem('login')
  username.innerText = login
}

const back = () => {
  history.back()
}
