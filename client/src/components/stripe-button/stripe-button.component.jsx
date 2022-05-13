import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe = price * 100;
	const publishableKey =
		'pk_test_51Kgr0UJ1X7GKYd6QmdvnnFbKoDm9NRyzS362yHP6U8UxnJ6yQlKYK73ApWLDeL2hqwUM29C5Ir5bINMHb9dUm8J400tXJATZ8i';

	const onToken = (token) => {
		axios({
			url: 'payment',
			method: 'post',
			data: {
				amount: priceForStripe,
				token: token,
			},
		})
			.then((res) => {
				alert('Payment successful');
			})
			.catch((err) => {
				console.log('Payment error: ', JSON.parse(err));
				alert(
					'There was an issue with your payment. Please make sure you use the provided credit card'
				);
			});
	};

	return (
		<div>
			<StripeCheckout
				label="Pay Now"
				name="CRWN Clothing Ltd."
				billingAddress
				shippingAddress
				image="https://svgshare.com/i/CUz.svg"
				description={`Your total is $${price}`}
				amount={priceForStripe}
				panelLabel="Pay Now"
				token={onToken}
				stripeKey={publishableKey}
			/>
		</div>
	);
};

export default StripeCheckoutButton;
