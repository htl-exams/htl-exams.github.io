import { auth, signin, tryToLogin, verifyNewMail } from "../../js/auth.js";
import { showToast } from '../../components/toast/toast.js';
import { showInpErr } from "../../components/input/input.js";

const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');


tryToLogin(user => {

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (auth.currentUser.email !== email.value) {
            verifyNewMail(email.value, () => {
                showToast("Bestätigungsmail gesendet");
            }, err => {
                if (err.code === 'auth/requires-recent-login') {
                    signin(auth.currentUser.email, password.value,
                        () => {
                            verifyNewMail(email.value, () => {
                                showToast("Bestätigungsmail gesendet");
                            },
                                err => errorCode(err.code));
                        },
                        err => errorCode(err.code));
                }
                console.log(err.code);
            });
        } else
            showInpErr('email', 'Bitte verwende eine andere Email als bisher!');
    });
}, () =>
    window.location = '../../signin/index.html'
);
