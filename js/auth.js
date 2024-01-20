import { app } from "../js/firebase.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, onAuthStateChanged, signOut, verifyBeforeUpdateEmail, updatePassword, deleteUser } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { showInpErr } from "../components/input/input.js";
import { showToast } from "../components/toast/toast.js";

const signoutBtns = document.querySelectorAll('.signout');

// Initialize Firebase
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
auth.useDeviceLanguage();


signoutBtns.forEach(btn => {
    btn.addEventListener('click', () => logout());
});


// check active user session
function tryToLogin(success = null, error = null) {
    onAuthStateChanged(auth, (user, err) => {
        if (user) {

            //nutzer ist eingeloggt
            if (success) success(user);
        } else if (error)
            error(err);
    });
}

// signup with email
function signup(email, password, success = null, error = null, uname = null) {
    createUserWithEmailAndPassword(auth, email, password, uname)
        .then(() => {
            if (uname) updateUser('displayName', uname);
            if (success) success();
        }).catch(err => {
            if (error) error(err);
            errorHandler(err);
        });
}

// signin with email
function signin(email, password, success = null, error = null) {
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            if (success) success();
        }).catch(err => {
            if (error) error(err);
            errorHandler(err);
        });
}

// signin/up with google
function googleSignin(success = null) {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            if (success) success();
            tryToLogin();
        }).catch(err => {
            if (error) error(err);
            errorHandler(err);
        });
}

function updateUser(key, value, success = null) {
    updateProfile(auth.currentUser, {
        [key]: value
    }).then(() => {
        if (success) success()
    }).catch(err => {
        if (error) error(err);
        errorHandler(err);
    });
}

function logout(success = null, error = null) {
    signOut(auth).then(() => {
        if (success) success();
    }).catch(err => {
        if (error) error(err);
        errorHandler(err);
    });
}

function verifyNewMail(email, success, error) {
    verifyBeforeUpdateEmail(auth.currentUser, email).then(() => {
        if (success) success();
    }).catch(err => {
        if (error) error(err);
        errorHandler(err);
    });
}

function updatePasswd(password, success = null, error = null) {
    tryToLogin(user => {
        updatePassword(user, password).then(() => {
            if (success) success();
        }).catch(err => {
            if (error) error(err);
            errorHandler(err);
        });
    });
}

function delUser(success = null, error = null) {
    tryToLogin(user => {
        deleteUser(user).then(() => {
            success();
        }).catch(err => {
            if (error) error(err);
            errorHandler(err);
        });
    }, (err) => {
        errorHandler(err);
    });
}

function errorHandler(err = null) {
    if (!err) return;
    switch (err.code) {
        case 'auth/invalid-credential': /* showInpErr('password', "Das Passwort ist falsch"); */ break;
        case 'auth/invalid-email': showInpErr('email', "Die Email ist nicht gültig"); break;
        case 'auth/missing-password':/*  showInpErr('password', "Das Passwort ist notwendig"); */ break;
        case 'auth/requires-recent-login': signin(); break;
        case 'auth/too-many-requests': showToast("Bitte versuche es später erneut", 5000);
        default: console.log(err, err.code);
    }
}


export {
    app,
    auth,
    googleProvider,
    tryToLogin,
    signup,
    signin,
    googleSignin,
    updateUser,
    logout,
    verifyNewMail,
    updatePasswd,
    delUser,
    errorHandler
}