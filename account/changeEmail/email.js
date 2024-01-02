import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, onAuthStateChanged, verifyBeforeUpdateEmail, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const toast = document.querySelector('.toast');

const firebaseConfig = {
    apiKey: "AIzaSyCoCCH7h-56nHoQPCJ_Yymh2y2gkjaPg34",
    authDomain: "htlexams-jl.firebaseapp.com",
    projectId: "htlexams-jl",
    storageBucket: "htlexams-jl.appspot.com",
    messagingSenderId: "371527470114",
    appId: "1:371527470114:web:ff5fda5e509cb43c9e8e7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (user) {
        //sendEmailVerification(auth.currentUser);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (auth.currentUser.email !== email.value) {
                verifyBeforeUpdateEmail(user, email.value).then(() => {
                    showToast("Bestätigungsmail gesendet");
                }).catch(err => {
                    if (err.code === 'auth/requires-recent-login') {
                        signInWithEmailAndPassword(auth, auth.currentUser.email, password.value)
                            .then(() => {
                                verifyBeforeUpdateEmail(user, email.value).then(() => {
                                    showToast("Bestätigungsmail gesendet");
                                })
                                    .catch(err => errorCode(err.code));
                            })
                            .catch(err => errorCode(err.code));
                    }
                    errorCode(err.code);
                    console.log(err.code);
                });
            } else
                showInpErr('email', 'Bitte verwende eine andere Email als bisher!');
        });
    } else {
        window.location.href = '../../signin/';
    }
});


function showInpErr(id, message) {
    const info = document.querySelector(`div.info#${id}`);
    const inp = info.parentElement.getElementsByTagName('input')[0];

    const defaultMessage = info.innerText;
    info.classList.add('show');
    info.innerText = mess
    function showToast(message, duracation = 5000) {
        toast.classList.add('active');
        toast.innerText = message;
        setTimeout(() => toast.classList.remove('active'), duracation);
    }
    
    function errorCode(code) {
        switch (code) {
            case 'auth/invalid-new-email': showInpErr('email', 'Die Email ist ungültig!');
            case 'auth/invalid-credential': showInpErr('password', "Das Passwort ist ungültig!");
            case 'auth/missing-new-email': showInpErr('email', "Es wird eine neue Email benötigt!");
            case 'auth/missing-password': showInpErr('password', "Es wird ein Passwort benötigt!");
            default: console.log(code);
        }
    }age;
    inp.oninput = () => {
        info.classList.remove('show');
        info.innerText = defaultMessage;
    }
    document.addEventListener('click', () => {
        info.classList.remove('show');
        info.innerText = defaultMessage;
    });
}

document.addEventListener('keydown', (e) => {
    if (e.keyCode === 32)
        showToast("Das ist ein Toast");
});

function showToast(message, duracation = 5000) {
    toast.classList.add('active');
    toast.innerText = message;
    setTimeout(() => toast.classList.remove('active'), duracation);
}

function errorCode(code) {
    switch (code) {
        case 'auth/invalid-new-email': showInpErr('email', 'Die Email ist ungültig!');
        case 'auth/invalid-credential': showInpErr('password', "Das Passwort ist ungültig!");
        case 'auth/missing-new-email': showInpErr('email', "Es wird eine neue Email benötigt!");
        case 'auth/missing-password': showInpErr('password', "Es wird ein Passwort benötigt!");
        default: console.log(code);
    }
}