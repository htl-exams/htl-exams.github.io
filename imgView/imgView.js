const imgContainer = document.querySelector('.imgContainer');
const imgUrl = window.location.search.split('src=')[1];
imgContainer.style.backgroundImage = `url(${imgUrl})`;