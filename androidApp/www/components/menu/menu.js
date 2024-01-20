import {logout} from '../../js/auth.js';

const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
const signOutBtns = document.querySelectorAll('.signout');

signOutBtns.forEach(btn => {
    btn.addEventListener('click', logout);
});

document.addEventListener('click', e => {
    if (e.target.id !== 'menu' && e.target.id !== 'menuItem' && e.target.id !== 'menuBtn' && e.target.id !== 'menuBtnItem') {
        menu.classList.remove('active');
    }
});
menuBtn.addEventListener('click', toogleMenu);


function toogleMenu() {
    menu.classList.toggle('active');
}
