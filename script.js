// Get Reference using Ids.
console.log("Hello Users");

let masterKey = document.getElementById("masterKey");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let playing_song = document.getElementById("playing_song");
let bannerImg = document.getElementById("bannerImg");

let audioElement = new Audio("songs/1.mp3");

let songIndex = 0;

let songs = [
    { songName: "song1", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" ,duration:"6.32"},
    { songName: "song2", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" ,duration:"6.32"},
    { songName: "song3", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" ,duration:"6.32"},
    { songName: "song4", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" ,duration:"6.32"},
    { songName: "song5", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" ,duration:"6.32"},
    { songName: "song6", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" ,duration:"6.32"},
];
let songsContainer = document.getElementsByClassName("songsItemContainer")[0]; // Assuming there is only one container

// Iterate through the songs array and create HTML elements dynamically
songs.forEach(song => {
    // Create a new songItem div
    let songItem = document.createElement("div");
    songItem.classList.add("songItem");

    // Create an image element
    let img = document.createElement("img");
    img.src = song.coverPath; // Assuming coverPath is the property in the songs array
    img.alt = song.songName; // Assuming songName is the property in the songs array

    // Create a span element for song name
    let songName = document.createElement("span");
    songName.textContent = song.songName;

    // Create a span element for timestamp
    let timeStamp = document.createElement("span");
    timeStamp.classList.add("timeStamp");
    timeStamp.textContent = song.duration ;

 
    let playIcon = document.createElement("i");
    playIcon.classList.add("fa-solid", "fa-circle-play", "songItemPlay");
    playIcon.id = `${song.filePath}_${song.songName}_${song.coverPath}`;
    
    timeStamp.appendChild(playIcon);
    
    // Append the created elements to the songItem div
    songItem.appendChild(img);
    songItem.appendChild(songName);
    songItem.appendChild(timeStamp);
   

    // Append the songItem div to the songsContainer
    songsContainer.appendChild(songItem);
});



// Play songs
masterKey.addEventListener('click', playPause);


audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
   myProgressBar.value=progress;
});

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
})

//song list play item 

const makeAllPlay = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
       });
    console.log("make all play");
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay(); // Reset all icons to play state

        let idParts = e.target.id.split("_");
let filePath = idParts[0];
let songName = idParts[1];
let coverPath = idParts.slice(2).join("_"); // In case coverPath itself contains underscores

console.log("File Path:", filePath);
console.log("Song Name:", songName);
console.log("Cover Path:", coverPath);

        audioElement.src =filePath; // Set the source before calling playPause

        playing_song.innerHTML = songName;
bannerImg.src=coverPath;



        playPause();
       


        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
    });
});

function playPause() {
    console.log(audioElement.paused);
    if (audioElement.paused) {
        audioElement.play();
        masterKey.classList.remove("fa-circle-play");
        masterKey.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterKey.classList.remove("fa-circle-pause");
        masterKey.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
}




