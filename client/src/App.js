import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import CheckoutPage from './pages/checkout/checkout.components';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from "./redux/user/user.action";
import { selectCurrentUser } from './redux/user/user.selectors';

import './App.css';

const App = ({ setCurrentUser, currentUser }) => {

  useEffect(() => {
    // To unscribe from the auth listener so it won't cause memory leaks
    let unsubscribeFromAuth = null;

    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // this.setState({ currentUser: user });
      // createUserProfileDocument(user);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      // else {
      setCurrentUser(userAuth);
      // } 
    }, error => console.log(error));

    // represents the cleanup function that will be called when the component is unmounted.
    return () => {
      // closes the subscription
      unsubscribeFromAuth();
    };
  }, [setCurrentUser]);



  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='shop/*' element={<ShopPage />} />
        <Route path='checkout' element={<CheckoutPage />} />
        <Route path='signin' element={currentUser ? (<Navigate replace to="/" />) : (<SignInAndSignUpPage />)} />
      </Routes>
    </div>
  );
};

// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser
// });
// createStructuredSelector automatically passes in our top level state into our prop. 
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  // The prop name has to be whatever prop we want to pass in that dispatches the new action we are trying to pass.
  setCurrentUser: user => dispatch(setCurrentUser(user)) //setCurrentUser goes to a function that gets the user object and then call dispatch and what dispatches is an action that can be passed to all reducers.
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
