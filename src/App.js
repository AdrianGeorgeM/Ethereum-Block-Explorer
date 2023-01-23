import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

import "./App.css";

const settings = {
	apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
	network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
	const [blockNumber, setBlockNumber] = useState();

	const [blockDetails, setBlockDetails] = useState();
	const [blockWithTransactions, setBlockWithTransactions] = useState();

	// useEffect: use getBlockNumber() from alchemy.core
	useEffect(() => {
		async function getBlockNumber() {
			// Call the alchemy.core.getBlockNumber method to retrieve the current block number from the Ethereum blockchain
			const blockNumber = await alchemy.core.getBlockNumber();

			// Update the component's state with the current block number
			console.log("blockNumber: ", blockNumber);
			setBlockNumber(blockNumber);
		}
		// Call the getBlockNumber function
		getBlockNumber();

		async function getBlock() {
			// Call the alchemy.core.getBlock method to retrieve the details of the blockNumber
			const blockDetails = await alchemy.core.getBlock(blockNumber);
			const { transactions } = blockDetails;
			// Update the component's state with the current block number
			console.log("blockDetails: ", blockDetails);
			setBlockDetails(transactions);
		}
		// Call the getBlock function
		getBlock();

		async function getBlockWithTransactions() {
			// Call the alchemy.core.getBlockWithTransactions method to retrieve the details of the blockNumber
			const { transactions } = await alchemy.core.getBlockWithTransactions(
				blockNumber
			);

			// Update the component's state with the current block number
			console.log("transaction details: ", transactions);
			setBlockWithTransactions(transactions.length);
		}
		// Call the getBlockWithTransactions function
		getBlockWithTransactions();
	}, [blockNumber]); // The second argument to useEffect is an array of dependencies, which can be left empty in this case because the effect does not depend on any values from props or state

	return (
		<div className='blockexplorer-container'>
			<h1>Block Explorer</h1>
			<div className='App'>
				<p>Block Number (getBlockNumber): {blockNumber}</p>
				<p>Block Details (getBlock): {blockDetails}</p>
				<p>
					Block with Transactions (getBlockWithTransactions):{" "}
					{blockWithTransactions}
				</p>
			</div>
			;
		</div>
	);
}

export default App;
