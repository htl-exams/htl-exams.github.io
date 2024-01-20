import * as auth from '../js/auth.js';
import * as storage from '../js/storage.js';


const fileInp = document.getElementById('fileInp');
const imgContainer = document.querySelector('.imgContainer');

auth.tryToLogin(
    () => console.log('logged in'),
    () => window.location = '../signin/'
);

fileInp.addEventListener('input', () => {
    storage.upload(fileInp);
});

storage.list('images', (path) => {
    storage.getImgURL(path, (url) => {
        const img = new Image();
        img.src = url;
        img.addEventListener('click', () =>
            window.location.href = window.origin + '/imgView/index.html?src=' + url);
        imgContainer.appendChild(img);
    });
});


