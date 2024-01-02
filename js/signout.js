import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

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

const signOutBtns = document.querySelectorAll('.signout');
signOutBtns.forEach(btn => {
    btn.addEventListener('click', logout);
});

function logout() {
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}


