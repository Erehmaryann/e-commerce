// base import(pulling the firebase utility library)
import firebase from 'firebase/compat/app';
// for the database
import 'firebase/compat/firestore';
// for the authentication
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyAiChbgvGiXSoZDjKyO7LPj5AKDnSEoJwQ",
    authDomain: "crwn-db-3b675.firebaseapp.com",
    projectId: "crwn-db-3b675",
    storageBucket: "crwn-db-3b675.appspot.com",
    messagingSenderId: "80944750037",
    appId: "1:80944750037:web:9dccf7c9fef5ca15d6b15c",
    measurementId: "G-9KSCMGSY5Z"
};

// storing user data in firebase
export const createUserProfileDocument = async (userAuth, additionalData) => {
    // If the user is not logged in, exit the function
    if (!userAuth) return;

    // If the user exists, get the userRef
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) { //.exists returns true if the user exists
        // data to be used to create the actual document(properties we need to store)
        const { email } = userAuth;
        // the current date and time when the user is created
        const createdAt = new Date();
        // asynchronous request to our database to store the data
        try {
            await userRef.set({ //.set() is an asynchronous function that creates a new document
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    // we might still need our userRef for something else.
    return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    // fire off batch request
    return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        };
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

firebase.initializeApp(config);

// Anything related to authentication
export const auth = firebase.auth();
// Anything related to the database
export const firestore = firebase.firestore();

// Setup Google Authentication ulitity
const provider = new firebase.auth.GoogleAuthProvider();
// When the user clicks the sign in button, it will trigger the Google sign in
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

// In case we wan the whole library to be exported
export default firebase;

