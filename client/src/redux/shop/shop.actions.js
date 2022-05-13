import ShopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap,
});

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());

        // Observable Pattern
        // (
        // 	async (snapshot) => {
        // 		const collectionMap = convertCollectionsSnapshotToMap(snapshot);
        // 		updateCollections(collectionMap);
        // 		this.setState({ loading: false });
        // 	}
        // );

        // Fetch pattern
        // fetch(
        // 	'https://firestore.googleapis.com/v1/projects/crwn-db-3b675/databases/(default)/documents/collections'
        // ).then(res => res.json()).then(collections => console.log(collections));

        // Promise Pattern
        collectionRef.get().then((snapshot) => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionsMap));
        }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
    };
};