import { app } from "../js/firebase.js";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

const storage = getStorage(app);


function upload(input) {
    const fileItem = input.files[0];
    const fileName = fileItem.name;

    let storageRef = ref(storage, `images/${fileName}`);
    uploadBytes(storageRef, fileItem).then((snapshot) => {
        console.log(snapshot);
        console.log('Uploaded a blob or file!');
    });
}


async function list(folder = 'images') {
    const listRef = ref(storage, folder);
    const items = [];
    await listAll(listRef)
        .then((res) => {
            /* res.prefixes.forEach((folderRef) => {
                console.log(folderRef);
            }); */
            res.items.forEach((itemRef) => {
                items.push(itemRef);
                const location = itemRef['_location'];
                downloadImg(location.path);
            });
        }).catch((error) => {
            console.error(error);
        });
    return items;

}

async function downloadImg(path) {
    await getDownloadURL(ref(storage, path))
        .then((url) => {
            console.log(url);
            const img = new Image();
            img.src = url;
            document.querySelector('body').appendChild(img);
        })
        .catch((error) => {
            // Handle any errors
        });
}

export {
    upload,
    list
}
