import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

const form = document.getElementById('form');
const unameForm = document.getElementById('unameForm');
const email = document.getElementById('email');
const password = document.getElementById('password');
const uname = document.getElementById('uname');
const googleLoginBtn = document.getElementById('googleLoginBtn');


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
auth.useDeviceLanguage();
const googleProvider = new GoogleAuthProvider();
const user = auth.currentUser;
let checkUserLoggedIn = true;

function tryToLogin() {
    onAuthStateChanged(auth, (user) => {
        console.log('try');
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            console.log('is signed in', user);
            if (user.displayName !== null) {
                console.log(user);
                window.location.href = origin + '/overview';
            }
            // ...
        } else {
            // User is signed out
            // ...
        }
    });
}


function signup() {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            getUsername();
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (error && errorCode !== undefined) {
                if (errorCode === "auth/email-already-in-use")
                    showInpErr('password', 'falsches Passwort');
                else if (errorCode === 'auth/weak-password')
                    showInpErr('password', 'Das Passwort muss mindestens 6 Zeichen lang sein');

                console.error(errorCode);
            }
            // ..
        });
}

function signin() {
    checkUserLoggedIn = false;
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            window.location.href = origin + '/overview';
            // ...
        })
        .catch((error) => {
            if (error.code === "auth/invalid-credential")
                signup();
            else if (error.code === 'auth/invalid-email')
                showInpErr('email', 'Die Email ist nicht gültig');
            else if (error.code === 'auth/missing-password')
                showInpErr('password', 'Das Passwort ist notwendig');
            else
                console.log(error.code);
        });
}

function googleSignin() {
    checkUserLoggedIn = false;
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...

            tryToLogin();
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(" The email of the user's account used.");
            const email = error.customData.email;
            console.error("The AuthCredential type that was used.");
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}


function updateUser(key, value) {
    console.log(key, value, 'update user');
    updateProfile(auth.currentUser, {
        [key]: value
    }).then(() => {
        console.log('Profile updated!');
        console.log(user);
        // ...
    }).catch((error) => {
        if (error)
            console.log(error.message);
        // An error occurred
        // ...
    });
}


function getUsername() {
    form.classList.add('hidden');
    unameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        updateUser('displayName', uname.value);
        window.location.href = origin + '/overview';
    });
}

function showInpErr(id, message) {
    const info = document.querySelector(`div.info#${id}`);
    const inp = info.parentElement.getElementsByTagName('input')[0];
    console.log(inp);
    const defaultMessage = info.innerText;
    info.classList.add('show');
    info.innerText = message;
    if (info.innerText === message) {
        inp.oninput = () => {
            info.classList.remove('show');
            info.innerText = defaultMessage;
        }
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    signin();
});

googleLoginBtn.addEventListener('click', () => {
    googleSignin();
});



if (checkUserLoggedIn === true) tryToLogin();


