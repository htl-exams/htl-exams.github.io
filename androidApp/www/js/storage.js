import { app } from "../js/firebase.js";
import { getStorage, ref, uploadBytes, listAll } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

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


function list(folder='images') {
    const listRef = ref(storage,);
    listAll(listRef)
        .then((res) => {
            res.prefixes.forEach((folderRef) => {
                console.loog(folderRef);
            });
            res.items.forEach((itemRef) => {
                console.log(itemRef);
            });
        }).catch((error) => {
            console.error(error);
        });

}

export {
    upload,
    list
}
