import { gE } from "../../js/document.js";

const inputs = gE.qSA('div.co-input');
const pathToRoot = new Array(window.location.pathname.split('/').length-1).join('../');

inputs.forEach(input => {
    const placeholder = input.getAttribute('placeholder');
    const type = input.getAttribute('type');
    const id = input.id;
    const label = input.getAttribute('label');
    const name = input.getAttribute('name');

    input.setAttribute('placeholder', '');
    input.setAttribute('type', '');
    input.id = '';
    input.setAttribute('label', '');
    input.setAttribute('name', '');

    input.innerHTML = `
    <input placeholder="${placeholder}" type="${type}" id="${id}" name="${name}">
    <img src="${pathToRoot}img/info.svg" class="infoImg" tabindex="0">
    <div class="info" id="${id}">
        ${label}
    </div>`
});

function showInpErr(id, message) {
    const info = gE.qS(`div.info#${id}`);
    const inp = gE.qS('input', info.parentElement);

    info.classList.add('show');
    info.innerText = message;

    inp.oninput = () => {
        info.classList.remove('show');
    }
}

console.log(pathToRoot);

export {
    showInpErr
}