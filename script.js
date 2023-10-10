let playlist = [
    { id: 0, SongName: "Kuley Kuley", SongPath: "Kuley_Kuley_song.mp3", ImagePath: "kks.webp", SongDuration: "03:29" },
    { id: 1, SongName: "Man Mera", SongPath: "Mann_Mera_song.mp3", ImagePath: "man_mera.jpg", SongDuration: "03:18" },
    { id: 2, SongName: "Dilawara", SongPath: "Dilawara_song.mp3", ImagePath: "Dilawara.jpg", SongDuration: "04:10" },
    { id: 3, SongName: "Main Agar Kahoon", SongPath: "Main Agar Kahoon_song.mp3", ImagePath: "Main_Agar_Kahoon.jpg", SongDuration: "05:12" },
    { id: 4, SongName: "Lahore", SongPath: "Lahore_song.mp3", ImagePath: "Lahore.jpg", SongDuration: "03:17" },
    { id: 5, SongName: "Bijlee Bijlee", SongPath: "Bijlee_Bijlee_song.mp3", ImagePath: "Bijlee_Bijlee.jpg", SongDuration: "02:48" },
    { id: 6, SongName: "Blue Eyes", SongPath: "Blue Eyes_song.mp3", ImagePath: "Blue-Eyes.jpg", SongDuration: "03:41" },
    { id: 7, SongName: "Lehanga", SongPath: "Lehenga_song.mp3", ImagePath: "lehenga.jpg", SongDuration: "03:30" },
    { id: 8, SongName: "Tum Hi Ho", SongPath: "Tum Hi Ho_song.mp3", ImagePath: "tum hi ho.jpg", SongDuration: "04:22" }
]

let song = Array.from(document.getElementsByClassName('song'));

song.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = playlist[i].ImagePath;
    element.getElementsByClassName("songname")[0].innerText = playlist[i].SongName;
    element.getElementsByClassName("timespan")[0].innerText = playlist[i].SongDuration;
    element.getElementsByTagName("img")[1].src = "black_play.jpg";
})

let songId = 0;
let songElement = new Audio(playlist[0].SongPath);
let mainplay = document.getElementById('mainplay');
let songplaying = document.getElementById('songplaying');
let titleInfotext = document.getElementsByClassName('titleInfotext')[0];
let playedlength = document.getElementById('playedlength');
let totallength = document.getElementById('totallength');
let progressbar = document.getElementById('progressbar');
let gif = document.getElementById('gif');

songElement.addEventListener('timeupdate', () => {
    progress = parseInt((songElement.currentTime / songElement.duration) * 100);
    progressbar.value = progress;
})

progressbar.addEventListener('change', () => {
    songElement.currentTime = progressbar.value * songElement.duration / 100;
})

const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('play')).forEach((element) => {
        element.src = "black_play.jpg";
    })
}

Array.from(document.getElementsByClassName('play')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();
        e.target.src = "black_pause.png";

        index = parseInt(e.target.id);
        songId = index;
        songElement.src = playlist[index].SongPath;
        songElement.currentTime = 0;
        songElement.play();
        gif.style.opacity = 1;
        mainplay.src = "playing.png";
        songplaying.src = playlist[index].ImagePath;
        titleInfotext.innerHTML = playlist[index].SongName;
    })
})

let stat = 0;
mainplay.addEventListener('click', (e) => {
    if (songElement.currentTime <= 0) {
        songElement.play();
        gif.style.opacity = 1;
        stat = 1;
        mainplay.src = "playing.png";
        songplaying.src = playlist[0].ImagePath;
        titleInfotext.innerHTML = playlist[0].SongName;
        document.getElementsByClassName('play')[0].src = "black_pause.png";
    }
    else if (songElement.currentTime > 0 && stat == 0) {
        songElement.play();
        mainplay.src = "playing.png";
        gif.style.opacity = 1;
        stat = 1;
    }
    else {
        songElement.pause();
        stat = 0;
        gif.style.opacity = 0;
        mainplay.src = "paused.png";
    }
})

let prevsong = document.getElementById('prevsong');
prevsong.addEventListener('click', (e) => {
    document.getElementsByClassName('play')[songId].src = "black_play.jpg";
    if (songId == 0) {
        songId = 0;
    }
    else {
        songId--;
    }
    songElement.src = playlist[songId].SongPath;
    songElement.currentTime = 0;
    songElement.play();
    document.getElementsByClassName('play')[songId].src = "black_pause.png";
    gif.style.opacity = 1;
    mainplay.src = "playing.png";
    songplaying.src = playlist[songId].ImagePath;
    titleInfotext.innerHTML = playlist[songId].SongName;
})

let nextsong = document.getElementById('nextsong');
nextsong.addEventListener('click', (e) => {
    document.getElementsByClassName('play')[songId].src = "black_play.jpg";
    if (songId == playlist.length - 1) {
        songId = playlist.length - 1;
    }
    else {
        songId++;
    }
    songElement.src = playlist[songId].SongPath;
    songElement.currentTime = 0;
    songElement.play();
    document.getElementsByClassName('play')[songId].src = "black_pause.png";
    gif.style.opacity = 1;
    mainplay.src = "playing.png";
    songplaying.src = playlist[songId].ImagePath;
    titleInfotext.innerHTML = playlist[songId].SongName;
})

songElement.addEventListener('ended', () => {
    document.getElementsByClassName('play')[songId].src = "black_play.jpg";

    if (songId < playlist.length - 1)
        songId++;
    else songId = 0;

    songElement.src = playlist[songId].SongPath;
    songElement.currentTime = 0;
    songElement.play();
    document.getElementsByClassName('play')[songId].src = "black_pause.png";
    gif.style.opacity = 1;
    songplaying.src = playlist[songId].ImagePath;
    titleInfotext.innerHTML = playlist[songId].SongName;
})
