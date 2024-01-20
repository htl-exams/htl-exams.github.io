import { delUser, signin, tryToLogin } from "../../js/auth.js";


const form = document.getElementById('form');
const password = document.getElementById('password');

tryToLogin(user => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        //change password
        delUser(() => window.location = '/signin/', err => {
            if (err.code === 'auth/requires-recent-login') {
                signin(user.email, password.value,
                    () => delUser(() => window.location = '/signin/'));
            }
        });

    });
}, () => window.location.href = '../../signin/'
);

