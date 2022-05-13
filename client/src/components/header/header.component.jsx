import React from 'react';
import { connect } from 'react-redux'; //hoc that connects app to redux store
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

// special syntax in React for importing SVG.
import { ReactComponent as Logo } from '../../assets/crown.svg';

import {
	HeaderContainer,
	LogoContainer,
	OptionsContainer,
	OptionLink,
} from './header.styles';

const Header = ({ currentUser, hidden }) => {
	return (
		<HeaderContainer>
			<LogoContainer to="/">
				<Logo />
			</LogoContainer>
			<OptionsContainer>
				<OptionLink to="/shop">SHOP</OptionLink>
				<OptionLink to="/shop">CONTACT</OptionLink>
				{currentUser ? (
					<OptionLink as="div" onClick={() => auth.signOut()}>
						SIGN OUT
					</OptionLink>
				) : (
					<OptionLink to="/signin">SIGN IN</OptionLink>
				)}
				<CartIcon />
			</OptionsContainer>
			{hidden ? null : <CartDropdown />}
		</HeaderContainer>
	);
};

// this naming can be anything but mapStateToProps is a convention for redux codebases
// createStructured automatically passes our toplevel state that we as our map state to propsinto each subsequent selector
const mapStateToProps = createStructuredSelector({
	//state is the root reducer
	// the name of the property will be the actual property we want to pass in.
	currentUser: selectCurrentUser,
	hidden: selectCartHidden,
	// currentUser: state.user.currentUser,
	// hidden: state.cart.hidden,
});

export default connect(mapStateToProps)(Header);
