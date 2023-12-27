import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

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


const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');


onAuthStateChanged(auth, (user) => {
    if (user && user !== null) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log('user found', user);



        // ...
    } else {
        // User is signed out
        // ...
        console.log('no user found');
        window.location.href = origin + '/signin';
    }
});



document.addEventListener('click', e => {
    console.log(e.target.id);
    if (e.target.id !== 'menu' && e.target.id !== 'menuItem' && e.target.id!=='menuBtn'&& e.target.id!=='menuBtnItem') {
        menu.classList.remove('active');
    }
});
menuBtn.addEventListener('click', toogleMenu);


function toogleMenu() {
    menu.classList.toggle('active');
}


