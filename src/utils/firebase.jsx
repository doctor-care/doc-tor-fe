import { initializeApp } from "firebase/app";
import { getDatabase, ref, serverTimestamp } from "firebase/database";
import { getStorage } from "firebase/storage";

// Thay thế với thông tin cấu hình Firebase của bạn
const firebaseConfig = {
    apiKey: "AIzaSyD_GZCTGxqPd756XV12-bSlvwqXBAhcx5k",
    authDomain: "projectspring1-3a404.firebaseapp.com",
    projectId: "projectspring1-3a404",
    storageBucket: "projectspring1-3a404.appspot.com",
    messagingSenderId: "139714467302",
    appId: "1:139714467302:web:7f88912ff48a18839f3227",
    measurementId: "G-1FD5Y69Z9H",
    databaseURL: "gs://projectspring1-3a404.appspot.com"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

export { database, ref, serverTimestamp, storage };