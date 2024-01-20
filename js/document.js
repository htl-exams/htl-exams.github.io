const gE = {
    id: function (id, parent = document) {
        return parent.getElementById(id)
    },
    qS: function (key, parent = document) {
        return parent.querySelector(key);
    },
    qSA: function (key, parent = document) {
        return document.querySelectorAll(key);
    }
}


export {
    gE
}