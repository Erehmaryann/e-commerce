import { ReactComponent as ShoppingIcon } from '../../assets/shoppingBag.svg';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
	<div className="cart-icon" onClick={toggleCartHidden}>
		<ShoppingIcon className="shopping-icon" />
		<span className="item-count">{itemCount}</span>
	</div>
);

const mapDispatchToProps = (dispatch) => ({
	toggleCartHidden: () => dispatch(toggleCartHidden()),
});

const mapStateToProps = createStructuredSelector({
	itemCount: selectCartItemsCount,
	// state.cart.cartItems.reduce(
	// 	(accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,
	// 	0
	// ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
