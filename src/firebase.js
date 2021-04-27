import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyBiV9k4BXEwSWhuQlg8VDpTCeBFchiY98Q",
    authDomain: "social-78ce0.firebaseapp.com",
    projectId: "social-78ce0",
    storageBucket: "social-78ce0.appspot.com",
    messagingSenderId: "47805025714",
    appId: "1:47805025714:web:0d2f0d94d045aa5ba228ab",
    measurementId: "G-SWS18J5PFX",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
