import { app } from "../js/firebase.js";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

const storage = getStorage(app);


function upload(input, success = null, error = null) {
    const fileItem = input.files[0];
    const fileName = fileItem.name;

    let storageRef = ref(storage, `images/${fileName}`);
    uploadBytes(storageRef, fileItem).then((snapshot) => {
        if (success) success();
    }).catch((err) => {
        if (error) error(err);
    });
}


async function list(folder = 'images', success) {
    const listRef = ref(storage, folder);
    await listAll(listRef)
        .then((res) => {
            res.items.forEach((itemRef) => {
                const location = itemRef['_location'];
                success(location.path);
            });
        }).catch((error) => {
            console.error(error);
        });
}

async function getImgURL(path, success) {
    await getDownloadURL(ref(storage, path))
        .then((url) => {
            success(url);
        })
        .catch((error) => {
            // Handle any errors
        });
}

export {
    upload,
    list,
    getImgURL
}
