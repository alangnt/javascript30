// Let's break the entire code down
// First we're gonna set up the keys
// const keys = document.querySelectorAll('.key'); // Selects all the keys in the document

// Now we're gonna add two event listeners to the keys
// The first one is the keydown event - every time a key is pressed down
/*window.addEventListener('keydown', function (e) {
    // We're gonna link the audio file to the key that was pressed down
    // `` selector means we're gonna add some HTML inside the string
    // audio[data-key="${e.keyCode}"]
    // We're selecting all the corresponding audio files to the key that was pressed down
    // ${e.keyCode} is the key that was pressed down
    // keyCode refers to the code of the pressed down key (ex: A would be 65)
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);

    // Then we're gonna do the same thing for the keys
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

    // Now we're gonna prevent the console to return an error if the audio file doesn't exist (saves memory)
    if (!audio) return;

    // Then we're gonna make sure the sounds rewinds to the start each time a key is pressed down
    audio.currentTime = 0;

    // Then we're gonna play the audio file corresponding to the key that was pressed down
    audio.play();

    // And finally, we're gonna add the playing class to the key that was pressed down
    // But we'll need to remove it later so it doesn't stay like that
    key.classList.add('playing');
});
*/

// The second one is the transitionend event - works every time a key gets a 'transition' property
// First we're gonna select all the keys to get the same keyup event
/*keys.forEach(key => key.addEventListener('transitionend', function (e) {
    // Then we're gonna put an IF statement to check if there is indeed a "transform" property on the key
    // And we're gonna want all of them that don't have the "transform" property to be ignored
    if (e.propertyName !== 'transform') return;

    // Finally, we're gonna remove the "playing" class from the key that was released
    this.classList.remove('playing');
}));
*/

// Good job !
// Thing is, it's way too long and complicated
// Let's break it down on multiple functions

// Set up the keys
const keys = document.querySelectorAll('.key');

// Now create a function to replace the 'function(e)' in the keydown event
function pressedKey(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audio) return;

    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
}

// You can then create your EventListener while adding the function as a parameter
window.addEventListener('keydown', pressedKey);

// Now create another function to replace the 'function(e)' in the transitionend event
function endTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

// And finally create the EventListener while adding the function as a parameter
keys.forEach(key => key.addEventListener('transitionend', endTransition));

// This actually prevents your code to be overcomplicated and easier to read
// If you want it to be even better, you can sort the functions together and the Events together as well

// Today we're gonna try to add the possibility to turn the volume up and down
// First let's define two variables to store the volume and the range
const volumeControl = document.querySelector('#volume');
const volumeValue = document.querySelector('#volume-value');

// Let's create a function that will allow us to change the volume of the music
function changeVolume() {
    const volume = volumeControl.value / 100;
    const audios = document.querySelectorAll('audio');

    // Let's set up a change for all the audio files
    audios.forEach(audio => {
        audio.volume = volume;
    });

    // Now let's change the value of the range depending of the exact value of the volume
    volumeValue.textContent = volumeControl.value;
}

// Now let's make it usable with keys
function changeWithKey(e) {
    // Let's add 1 every time E is pressed down
    // and remove 1 every time Q is pressed down
    if (e.keyCode === 81) { // Q key
        // Let's add a max and min value while asking to add or remove 1
        volumeControl.value = Math.max(0, parseInt(volumeControl.value) - 1);
    }
    if (e.keyCode === 69) { // E key
        volumeControl.value = Math.min(100, parseInt(volumeControl.value) + 1);
    }

    // Now update the volume based on the new value of the volume
    changeVolume();
}

// Now let's create an EventListener for the volume change
volume.addEventListener('input', changeVolume);

// Let's also create an EventListener for the volume change with keys
window.addEventListener('keydown', changeWithKey);