import * as auth from '../js/auth.js';
import { gE } from '../js/document.js';
import { showToast } from "../components/toast/toast.js";
import { showInpErr } from '../components/input/input.js';

const form = {
    e: gE.id('form'), // the form element
    email: gE.id('email'), // email child
    password: gE.id('password') // password child
};
const unameForm = {
    e: gE.id('unameForm'), // the form element
    uname: gE.id('uname') // the uname child
}

const googleLoginBtn = gE.id('googleLoginBtn');

form.e.addEventListener('submit', (e) => {
    e.preventDefault();
    auth.signin(form.email.value, form.password.value,
        () => window.location.href = '../overview/index.html',
        (err) => {
            if (err === 'auth/invalid-credential')
                form.e.classList.add('hidden'); // get username
        });
});

unameForm.e.addEventListener('submit', (e) => {
    e.preventDefault();
    auth.signup(form.email.value, form.password.value,
        () => window.location.href = '../overview/index.html',
        () => unameForm.uname.value
    )
});

googleLoginBtn.addEventListener('click', () => {
    auth.googleSignin();
});

auth.tryToLogin(() => {
    window.location.href = '../overview/index.html'
});
