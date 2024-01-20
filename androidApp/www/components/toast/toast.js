const body = document.querySelector('body');
const toast = document.createElement('div');
const text = document.createElement('div');
toast.classList.add('toast');
text.classList.add('text');
toast.appendChild(text);
body.appendChild(toast);


function showToast(message, duracation = 5000) {
    toast.classList.add('active');
    toast.innerText = message;
    setTimeout(() => toast.classList.remove('active'), duracation);
}

export {
    showToast
};