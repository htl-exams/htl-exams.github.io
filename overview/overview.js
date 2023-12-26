import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, onAuthStateChanged, deleteUser, reauthenticateWithCredential } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

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

const delUserBtn = document.getElementById('delUserBtn');
console.log(delUserBtn);

delUserBtn.addEventListener('click', () => delUser());

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


function delUser() {
    const user = auth.currentUser;
    deleteUser(user).then(() => {
        // User deleted.
        console.log('User deleted');
    }).catch((error) => {
        // An error ocurred
        // ...
        console.log('User not deleted', auth.currentUser, error.code);
        if (error.code === 'auth/requires-recent-login') {
            reauth();
        }
    });

}


function reauth() {
    const user = auth.currentUser;
    const credential = {
        email: prompt('Email'),
        password: prompt('Passwort')
    };

    reauthenticateWithCredential(user, credential).then(() => {
        // User re-authenticated.
        console.log('reauth success');
    }).catch((error) => {
        // An error ocurred
        // ...
        console.log('reauth not success', error);
    });
}

