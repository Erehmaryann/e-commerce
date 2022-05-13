import React from 'react';

import { CustomButtonContainer } from './customButton.styles';

const CustomButton = ({ children, ...props }) => (
	<CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);

export default CustomButton;
