import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, onAuthStateChanged, updatePassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

const form = document.getElementById('form');
const toast = document.querySelector('.toast');
const oldPassword = document.getElementById('oldPassword');
const password = document.getElementById('password');
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

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            //change password
            updatePassword(user, password.value).then(() => { showToast("erfolgreich!") })
                .catch(err => {
                    if (err.code === 'auth/requires-recent-login') {
                        signInWithEmailAndPassword(auth, user.email, oldPassword.value)
                            .then(() => {
                                updatePassword(user, password.value)
                                    .then(() => showToast("erfolgreich!"))
                                    .catch(errorCode);
                            })
                            .catch(errorCode);
                    }
                    errorCode(err)
                });
        });
    } else {
        window.location.href = '../../signin/';
    }
});



function showToast(message) {
    toast.classList.add('active');
    toast.innerText = message;
    setTimeout(() => toast.classList.remove('active'), 5000);
}

function errorCode(err) {
    const code = err.code;
    switch (code) {
        case 'auth/invalid-credential': showInpErr('password', "Das Passwort ist ungültig!");
        case 'auth/missing-password': showInpErr('password', "Es wird ein Passwort benötigt!");
        default: console.log(code);
    }
}
