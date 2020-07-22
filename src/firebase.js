import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAnljkqNsUC4im8BqrSb0ksMrmbtCKh9QE",
    authDomain: "zoocial-fdc73.firebaseapp.com",
    databaseURL: "https://zoocial-fdc73.firebaseio.com",
    projectId: "zoocial-fdc73",
    storageBucket: "zoocial-fdc73.appspot.com",
    messagingSenderId: "419235996567",
    appId: "1:419235996567:web:5b89f3aebc701ac7c31ad2",
    measurementId: "G-QJP99NFT7W",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
