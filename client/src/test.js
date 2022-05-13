import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // for the database

const firestore = firebase.firestore();

firestore.collection('users').doc('GRU1Hk9wsmYAymRoDUQl5rqMv293').collection('cartItems').doc('P7FkJIoGkiYi0dRzIa7T');

