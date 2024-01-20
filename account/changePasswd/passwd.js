import { signin, tryToLogin, updatePasswd } from "../../js/auth.js";
import { showToast } from "../../components/toast/toast.js";

const form = document.getElementById('form');
const oldPassword = document.getElementById('oldPassword');
const password = document.getElementById('password');

tryToLogin(user => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        updatePasswd(password.value,
            () => showToast("erfolgreich!"),
            err => {
                if (err.code === 'auth/requires-recent-login') {
                    console.log('needs passwd');
                    signin(user.email, oldPassword.value,
                        () => {
                            updatePasswd(password.value,
                                () => showToast("erfolgreich!"));
                        });
                }
            });
    });
}, () => window.location.href = '../../signin/');