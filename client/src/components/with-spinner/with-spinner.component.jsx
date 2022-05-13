import { SpinnerOverlay, SpinnerContainer } from './with-spinner.styles';

const WithSpinner = (WrappedComponent) => {
	const Spinner = ({ isLoading }) => {
		return isLoading ? (
			<SpinnerOverlay>
				<SpinnerContainer />
			</SpinnerOverlay>
		) : (
			<WrappedComponent />
		);
	};

	return Spinner;
};
export default WithSpinner;
