import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

const form = document.getElementById('form');
const email = document.getElementById('email');
const resetBtn = document.getElementById('resetBtn');
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

form.addEventListener('submit', (e) => {
    e.preventDefault();
    reset()
});

function reset() {
    console.log('reset');
    //resetBtn.classList.add('load');
    sendPasswordResetEmail(auth, email.value)
        .then(() => {
            // Password reset email sent!
            // ..
            //resetBtn.classList.remove('load');
            window.location.href = origin + '/signin';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
}