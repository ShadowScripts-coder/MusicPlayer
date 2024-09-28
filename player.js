const audioFiles = [
    'Back In Black [ ezmp3.cc ].mp3', 
    'Barracuda [ ezmp3.cc ].mp3',
    'Come As You Are [ ezmp3.cc ].mp3',
    "Don't Look Back In Anger (Remastered) [ ezmp3.cc ].mp3",
    "Don't Stop Believin' [ ezmp3.cc ].mp3",
    "Don't Stop Me Now (Remastered 2011) [ ezmp3.cc ].mp3",
    'Everybody Wants To Rule The World [ ezmp3.cc ].mp3',
    'Everything Must Go (2016 Remastered Version) [ ezmp3.cc ].mp3',
    'Eye of the Tiger [ ezmp3.cc ].mp3',
    'Footloose (From _Footloose_ Soundtrack) [ ezmp3.cc ].mp3',
    'Heart-Shaped Box [ ezmp3.cc ].mp3',
    'Highway to Hell [ ezmp3.cc ].mp3',
    "I Love Rock 'N Roll [ ezmp3.cc ].mp3",
    'I Want To Break Free [ ezmp3.cc ].mp3',
    "I Was Made For Lovin' You [ ezmp3.cc ].mp3",
    "I'm Still Standing [ ezmp3.cc ].mp3",
    'Iron Man (2012 - Remaster) [ ezmp3.cc ].mp3',
    "It's My Life [ ezmp3.cc ].mp3",
    'Live Forever (Remastered) [ ezmp3.cc ].mp3',
    "Livin' On A Prayer [ ezmp3.cc ].mp3",
    'Paranoid (2009 Remaster) [ ezmp3.cc ].mp3',
    'Seven Nation Army [ ezmp3.cc ].mp3',
    'Sharp Dressed Man (2008 Remaster) [ ezmp3.cc ].mp3',
    'Should I Stay or Should I Go (Remastered) [ ezmp3.cc ].mp3',
    'Smells Like Teen Spirit [ ezmp3.cc ].mp3',
    'Something In The Way [ ezmp3.cc ].mp3',
    "Sweet Child O' Mine [ ezmp3.cc ].mp3",
    'Sweet Dreams (Are Made of This) (Remastered) [ ezmp3.cc ].mp3',
    'T.N.T. [ ezmp3.cc ].mp3',
    'Take on Me [ ezmp3.cc ].mp3',
    'The Final Countdown [ ezmp3.cc ].mp3',
    'Thunderstruck [ ezmp3.cc ].mp3',
    'Under Pressure (Remastered 2011) [ ezmp3.cc ].mp3',
    'Uptown Girl [ ezmp3.cc ].mp3',
    'Viva La Vida [ ezmp3.cc ].mp3',
    'We Are The Champions (Remastered 2011) [ ezmp3.cc ].mp3',
    'We Will Rock You (Remastered 2011) [ ezmp3.cc ].mp3',
    'Wonderwall [ ezmp3.cc ].mp3',
    'You Give Love A Bad Name [ ezmp3.cc ].mp3'
];

let currentAudio = null; // To store the current audio object

document.getElementById('pickMp3Button').addEventListener('click', () => {
    playAudio();
});

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
    document.getElementById("song-title").innerHTML = selectedFile.split(" [")[0];
    document.getElementById("song-cover").setAttribute("src", './Covers/' + selectedFile.split("[")[0] + ".jpg");
    currentAudio.volume = document.getElementById('volume-slider').value; // Set volume from slider
    currentAudio.play().catch(error => {
        console.error('Error playing audio:', error);
    });

    // Add the selected file to previousFiles
    previousFiles.push(selectedFile);
    if (previousFiles.length > 5) {
        previousFiles.shift(); // Remove the oldest file if more than 5
    }

    currentAudio.addEventListener('ended', () => {
        playAudio();
    });
}


// Volume slider event listener
document.getElementById('volume-slider').addEventListener('input', function() {
    if (currentAudio) {
        currentAudio.volume = this.value; // Update the volume of the current audio
    }
});