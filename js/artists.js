const audio = document.querySelector('#audio')
const pause = document.querySelector('.pause-footer')
const play = document.querySelector('.play-footer')
let playlistArray = []
window.onload = () => {
  getArtist(getID())
  getParsedArray()
  fillPlaylist()
  getUser()
}

const getID = () => {
  const getID = new URLSearchParams(window.location.search).get('artistID')
  return getID
}

let getArtist = async (artistID) => {
  const response = await fetch(
    'https://striveschool-api.herokuapp.com/api/deezer/artist/' + artistID,
  )

  const artist = await response.json()

  const getTracks = await fetch(artist.tracklist)
  const allTracks = await getTracks.json()

  const artistName = document.querySelector('.artist')
  artistName.innerHTML = artist.name

  const bannerImage = document.querySelector('.banner')
  bannerImage.setAttribute('src', artist.picture_xl)

  const listeners = document.querySelector('.listeners')
  listeners.innerHTML =
    artist.nb_fan.toLocaleString('en-US') + ' monthly listeners'

  const artistPicture = document.querySelector('.artist-pick-album-cover')
  artistPicture.setAttribute('src', artist.picture_xl)
  console.log(allTracks)

  const songContainer = document.querySelector('.songs-container')

  allTracks.data.forEach((element, index) => {
    songContainer.innerHTML += `<div class="song d-flex align-items-center mb-3" onclick="playSong('${
      element.title
    }', '${artist.name}', '${element.album.cover_small}', '${
      element.preview
    }', event)">
    <div class="track-number">
      ${index + 1}
    </div>
    <div class="album-thumbnail-container">
      <a href="albums.html?albumID=${element.album.id}"><img
        class="album-thumbnail mr-3" 
        src="${element.album.cover_small}"
      /></a>
    </div>
    <div class="song-title">
      <span class="" ">
        ${element.title}
      </span></a>
    </div>
    <div class="play-counter">
      <span>${element.rank.toLocaleString('en-US')}</span>
    </div>
    <i class="fa-regular fa-heart iconheart" onclick="addEvent('${
      element.title
    }','${element.artist.name}', '${element.preview}', '${
      element.album.cover_small
    }', '${element.duration}')"></i>
    <span class="song-length mr-3">${
      (element.duration - (element.duration %= 60)) / 60 +
      (9 < element.duration ? ':' : ':0') +
      element.duration
    }</span>
  </div>`

    const artistPickArtist = document.querySelector('.artist-pick-artist')
    artistPickArtist.innerHTML = artist.name
  })
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
  event.target.classList.add('playing')

  // Assigns the values passed in the function to the DOM elements in the footer
  songTitleFooter.innerHTML = footerSong
  artist.innerHTML = footerArtist
  footerCover.setAttribute('src', albumCover)

  audio.src = songPreview
  audio.play()
}

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

saveArray = function () {
  console.log(playlistArray)
  const jsonArr = JSON.stringify(playlistArray)
  localStorage.setItem('array', jsonArr)
}
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
