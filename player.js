const audioFiles = [
    "Back In Black.mp3", 
    "Barracuda.mp3", 
    "Come As You Are.mp3", 
    "Don't Look Back In Anger.mp3", 
    "Don't Stop Believin'.mp3", 
    "Don't Stop Me Now.mp3", 
    "Everybody Wants To Rule The World.mp3", 
    "Everything Must Go.mp3", 
    "Eye of the Tiger.mp3", 
    "Footloose.mp3", 
    "Heart-Shaped Box.mp3", 
    "Highway to Hell.mp3",
    "I Love Rock 'N Roll.mp3",
    "I Want To Break Free.mp3",
    "I Was Made For Lovin' You.mp3",
    "I'm Still Standing.mp3",
    "Iron Man.mp3",
    "It's My Life.mp3",
    "Live Forever.mp3",
    "Livin' On A Prayer.mp3",
    "Paranoid.mp3",
    "Seven Nation Army.mp3",
    "Sharp Dressed Man.mp3",
    "Should I Stay or Should I Go.mp3",
    "Smells Like Teen Spirit.mp3",
    "Something In The Way.mp3",
    "Sweet Child O' Mine.mp3",
    "Sweet Dreams (Are Made of This).mp3",
    "T.N.T..mp3",
    "Take on Me.mp3",
    "The Final Countdown.mp3",
    "Thunderstruck.mp3",
    "Under Pressure.mp3",
    "Uptown Girl.mp3",
    "Viva La Vida.mp3",
    "We Are The Champions.mp3",
    "We Will Rock You.mp3",
    "Wonderwall.mp3",
    "You Give Love A Bad Name.mp3"
];

let currentAudio = null; // To store the current audio object

// Array to keep track of the last 5 audio files played
let previousFiles = [];

function playAudio() {
    // Randomly select an audio file
    let randomIndex;
    let selectedFile;

    do {
        randomIndex = Math.floor(Math.random() * audioFiles.length);
        selectedFile = audioFiles[randomIndex];
    } while (previousFiles.includes(selectedFile)); // Retry if the file is in the previous selection

    // Stop the current audio if it's playing
    if (currentAudio) {
        currentAudio.pause();
    }

    // Create a new audio object and play it
    currentAudio = new Audio('./Epic Music/' + selectedFile);
    document.getElementById("song-title").innerHTML = selectedFile.split(".mp3")[0];
    document.getElementById("song-cover").setAttribute("src", './Covers/' + selectedFile.split(".mp3")[0] + ".jpg");
    currentAudio.volume = document.getElementById('volume-slider').value; // Set volume from slider
    currentAudio.play().catch(error => {
        console.error('Error playing audio:', error);
    });

    // Add the selected file to previousFiles
    previousFiles.push(selectedFile);
    if (previousFiles.length > 5) {
        previousFiles.shift(); // Remove the oldest file if more than 5
    }

    timeUpdate();

    currentAudio.addEventListener('ended', () => {
        playAudio();
    });
}


function isPlaying(audioElement) {
    return !audioElement.paused;
}

// Volume slider event listener
document.getElementById('volume-slider').addEventListener('input', function() {
    if (currentAudio) {
        currentAudio.volume = this.value; // Update the volume of the current audio
    }
});

function timeUpdate() {
    currentAudio.addEventListener('timeupdate', () => {
        const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
        document.getElementById('progress-bar').value = progress;
    });
}

document.getElementById('progress-bar').addEventListener('input', function() {
    const seekTime = (this.value / 100) * currentAudio.duration;
    currentAudio.currentTime = seekTime;
});

document.getElementById('pauseButton').addEventListener('click', () => {
    currentAudio.pause();
    document.getElementById('pauseButton').style.display = "none";
    document.getElementById('pickMp3Button').style.display = "inline";
})

document.getElementById('pickMp3Button').addEventListener('click', () => {
    if (currentAudio == null) {
        playAudio();
        document.getElementById('pickMp3Button').style.display = "none";
        document.getElementById('pauseButton').style.display = "inline";
    } else {
        currentAudio.play();
        document.getElementById('pickMp3Button').style.display = "none";
        document.getElementById('pauseButton').style.display = "inline";
    }
});

document.getElementById('song-cover').addEventListener('click', () => {
    if (currentAudio != null) {
        if (isPlaying(currentAudio) != true) {
            currentAudio.play();
            document.getElementById('pickMp3Button').style.display = "none";
            document.getElementById('pauseButton').style.display = "inline";
        } else {
            currentAudio.pause();
            document.getElementById('pauseButton').style.display = "none";
            document.getElementById('pickMp3Button').style.display = "inline";
        }
    }
});