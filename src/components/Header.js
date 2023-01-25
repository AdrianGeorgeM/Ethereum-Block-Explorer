import React from "react";

const Header = (props) => {
	const { blockNumber } = props;

	return (
		<header className='card'>
			<h2>Welcome to Adrian Block Explorer</h2>
			<h4>Current: {blockNumber}</h4>
		</header>
	);
};

export default Header;
