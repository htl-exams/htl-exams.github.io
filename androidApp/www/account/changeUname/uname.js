import { showInpErr } from "../../components/input/input.js";
import { showToast } from "../../components/toast/toast.js";
import { tryToLogin, updateUser } from "../../js/auth.js";

const form = document.getElementById('form');
const uname = document.getElementById('uname');

tryToLogin((user) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        //change uname
        if (uname.value === '') showInpErr('uname', "Bitte gib einen Benutzernamen ein!");
        else
            updateUser('displayName', uname.value, showToast("Erfolgreich"));
    });
}, () => window.location.href = '../../signin/');


