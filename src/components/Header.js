import React from "react";

const Header = (props) => {
	const { blockNumber } = props;

	return (
		<header className='card'>
			<h2 className='text-sky-700 text-center'>
				Welcome to Adrian Block Explorer
			</h2>
			<h4 className='text-center text text-sky-500'>Current: {blockNumber}</h4>
		</header>
	);
};

export default Header;
