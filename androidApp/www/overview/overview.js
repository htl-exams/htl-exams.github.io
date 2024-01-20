import * as auth from '../js/auth.js';
import * as storage from '../js/storage.js';


const fileInp = document.getElementById('fileInp');

auth.tryToLogin(
    () => console.log('logged in'),
    () => window.location = '../signin/'
);

fileInp.addEventListener('input', () => {
    storage.upload(fileInp);
});


// screenshot
document.addEventListener("deviceready", onDeviceReady, false);
// Enable
function onDeviceReady() {
    window.plugins.preventscreenshot.enable(successCallback, errorCallback);
}
/* // Disable
function onDeviceReady() {
    window.plugins.preventscreenshot.disable(successCallback, errorCallback);
} */

function successCallback(result) {
    console.log(result); // true - enabled, false - disabled
}

function errorCallback(error) {
    console.log(error);
}


document.addEventListener("onTookScreenshot", function () {
    // Receive notification when screenshot is ready;
    alert('screenshot');
});

document.addEventListener("onGoingBackground", function () {
    // Receive notification when control center or app going in background.
    alert('going background');
});

