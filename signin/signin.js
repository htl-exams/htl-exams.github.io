import * as auth from '../js/auth.js';
import { gE } from '../js/document.js';
import { showToast } from "../components/toast/toast.js";
import { showInpErr } from '../components/input/input.js';

const form = gE.id('form'),
    email = gE.id('email'),
    password = gE.id('password')

const unameForm = gE.id('unameForm'),
    uname = gE.id('uname')

const googleLoginBtn = gE.id('googleLoginBtn');

form.addEventListener('submit', (e) => {
    console.log('form submit');
    e.preventDefault();
    auth.signin(form.email.value, form.password.value,
        () => window.location.href = '../overview/index.html',
        (err) => {
            switch (err.code) {
                case 'auth/invalid-credential': form.classList.add('hidden'); break; // get username
                default: break;
            }
            console.log(err);
        });
});

unameForm.addEventListener('submit', (e) => {
    console.log('unameform submit');
    e.preventDefault();
    auth.signup(form.email.value, form.password.value,
        () => window.location.href = '../overview/index.html',
        () => unameForm.uname.value
    )
});

googleLoginBtn.addEventListener('click', () => {
    console.log('login google');
    auth.googleSignin();
});

auth.tryToLogin(() => {
    window.location.href = '../overview/index.html'
});
