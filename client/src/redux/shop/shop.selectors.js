import { createSelector } from 'reselect';

// Find collection.id matching the url parameter of the collection id map
// A map object where the string value goes to the collection id
// const COLLECTION_ID_MAP = {
//     hats: 1,
//     sneakers: 2,
//     jackets: 3,
//     womens: 4,
//     mens: 5
// };

// Initial input selector
const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

// converting the normalize data into a collection array
export const selectShopCollectionsForPreview = createSelector(
    [selectShopCollections],
    // object.keys returns an array of the keys of the object
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
);

// collectionUrlParam which is the string value of the url parameter
export const selectShopCollection = collectionUrlParam => createSelector(
    [selectShopCollections],
    // memoized selector
    collections => collections ? collections[collectionUrlParam] : null
    // collections => collections.find(collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam])
);

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);

export const selectIsCollectionLoaded = createSelector(
    [selectShop],
    // The double bang operator is used to check if the value is truthy
    shop => !!shop.collections
);