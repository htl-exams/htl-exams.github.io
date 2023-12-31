const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
const messageForm = document.querySelector('#messageForm');
const successMessage = document.querySelector('form div.success');

document.addEventListener('click', e => {
    console.log(e.target.id);
    if (e.target.id !== 'menu' && e.target.id !== 'menuItem' && e.target.id !== 'menuBtn' && e.target.id !== 'menuBtnItem') {
        menu.classList.remove('active');
    }
});
menuBtn.addEventListener('click', toogleMenu);


function toogleMenu() {
    menu.classList.toggle('active');
}

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#messageForm #email').value;
    const subject = document.querySelector('#messageForm #subject').value;
    const message = document.querySelector('#messageForm textarea').value;

    const r = new XMLHttpRequest();
    r.open("POST", "https://275b5a8bf8310ffbe1ebc39373a30973.serveo.net/mailer", true);
    r.onreadystatechange = function () {
        if (r.readyState != 4 || r.status != 200) return;
        successMessage.classList.remove('hide');
        if (r.responseText === 'success') {
            setTimeout(() => {
                successMessage.classList.add('hide');
            }, 5000);
        }
    };
    r.send(JSON.stringify({ subject: subject, message: message, sender: email }));
});
