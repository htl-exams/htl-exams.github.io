import * as auth from '../js/auth.js'

const cards = {
    email: document.querySelector('body .list .list .item#email'),
    passwd: document.querySelector('body .list .list .item#passwd'),
    uname: document.querySelector('body .list .list .item#uname'),
    delAcc: document.querySelector('body .list .list .item#delAcc')
}

auth.tryToLogin(null,
    () => window.location.href = origin + '/signin');


window.onload = () => {
    Object.keys(cards).forEach(key => {
        cards[key].addEventListener('click', e => {
            window.location.href = cards[key].dataset.url;
        })
    });
}

