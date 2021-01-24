import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAis1LjiWVvIZaEADHHc5_lygwJQYSeyeg",
    authDomain: "cunyhack21.firebaseapp.com",
    databaseURL: "https://cunyhack21-default-rtdb.firebaseio.com",
    projectId: "cunyhack21",
    storageBucket: "cunyhack21.appspot.com",
    messagingSenderId: "50775061549",
    appId: "1:50775061549:web:d8fd200541c2e470b174a4",
    measurementId: "G-SYS0MJWYWS"
};
const fire = firebase.initialize(config);

export default fire;