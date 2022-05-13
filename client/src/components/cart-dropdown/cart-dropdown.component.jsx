import { useNavigate } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, dispatch }) => {
	const navigate = useNavigate();

	return (
		<div className="cart-dropdown">
			<div className="cart-items">
				{cartItems.length !== 0 ? (
					cartItems.map((cartItem) => (
						<CartItem key={cartItem.id} item={cartItem} />
					))
				) : (
					<span className="empty-message">Your cart is empty.</span>
				)}
			</div>
			<CustomButton
				onClick={() => {
					navigate('/checkout');
					// Dispatch Action Shorthand
					dispatch(toggleCartHidden());
				}}>
				GO TO CHECKOUT
			</CustomButton>
		</div>
	);
};
// const mapStateToProps = ({ cart: { cartItems } }) => ({
// 	cartItems,
// });

//If we do not pass in the mapDispatchToProps into connect, connect authomatically passes dispatch as prop into our component.
const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
});

export default connect(mapStateToProps)(CartDropdown);
