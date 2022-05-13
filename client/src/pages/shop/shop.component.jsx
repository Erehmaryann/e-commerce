import { useEffect } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

export const ShopPage = ({ fetchCollectionsStartAsync }) => {
	useEffect(() => {
		fetchCollectionsStartAsync();
	}, [fetchCollectionsStartAsync]);

	return (
		<div className="shop-page">
			<Routes>
				<Route path="/" element={<CollectionsOverviewContainer />} />
				<Route path=":collectionId" element={<CollectionPageContainer />} />
			</Routes>
			<Outlet />
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
