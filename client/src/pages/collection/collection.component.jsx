import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectShopCollection } from '../../redux/shop/shop.selectors';

import './collection.styles.scss';

const CollectionPage = () => {
	const { collectionId } = useParams();
	const collection = useSelector(selectShopCollection(collectionId));
	const { title, items } = collection;

	return (
		<div className="collection-page">
			<h2 className="title">{title}</h2>
			<div className="items">
				{items.map((item) => (
					<CollectionItem key={item.id} item={item} />
				))}
			</div>
		</div>
	);
};

// ownProps is the second params that are passed in the component wrapped by connect
// const mapStateToProps = (state, ownProps) => ({
// 	collection: selectShopCollection(ownProps.match.params.collectionId)(state),
// });

export default CollectionPage;
