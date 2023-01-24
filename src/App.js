import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

import "./index.css";

const settings = {
	apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
	network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
	const [address, setAddress] = useState(
		"0x4405510a8869cC02DE2C7C39DF399eD968bF7c0b"
	);
	const [blockNumber, setBlockNumber] = useState();
	const [ethBalance, setEthBalance] = useState();
	const [blockDetails, setBlockDetails] = useState();
	const [blockWithTransactions, setBlockWithTransactions] = useState();

	// useEffect: use getBlockNumber() from alchemy.core
	useEffect(() => {
		async function getBlockNumber() {
			// Call the alchemy.core.getBlockNumber method to retrieve the current block number from the Ethereum blockchain
			const blockNumber = await alchemy.core.getBlockNumber();

			// Update the component's state with the current block number
			// console.log("blockNumber: ", blockNumber);
			setBlockNumber(blockNumber);
		}
		// Call the getBlockNumber function
		getBlockNumber();

		async function getBlock() {
			// Call the alchemy.core.getBlock method to retrieve the details of the blockNumber
			const blockDetails = await alchemy.core.getBlock(blockNumber);
			const { transactions } = blockDetails;
			// Update the component's state with the current block number
			// console.log("blockDetails: ", blockDetails);
			setBlockDetails(transactions);
		}
		// Call the getBlock function
		getBlock();

		async function getBalance() {
			const balance = await alchemy.core.getBalance(address, "latest");
			setEthBalance(balance["_hex"] / Math.pow(10, 18));
			const balances = await alchemy.core.getTokenBalances(address);
			// console.log("balances", balances);
			// console.log("balance: ", balance);
		}
		getBalance();

		async function getBlockWithTransactions() {
			// Call the alchemy.core.getBlockWithTransactions method to retrieve the details of the blockNumber
			const { transactions } = await alchemy.core.getBlockWithTransactions(
				blockNumber
			);
			transactions.filter((transaction) => {
				// console.log("transaction: ", transaction);
				const { s } = transaction;
				// console.log("transaction: s ", s);

				return s;
			});

			// Update the component's state with the current block number
			// console.log("transaction details: ", transactions);
			setBlockWithTransactions(transactions.length);
		}
		async function getTransactionReceipt() {
			const transactions = await alchemy.core.getTransactionReceipt(
				"0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"
			);
			const { effectiveGasPrice } = transactions;

			console.log("TransactionReceipts: ", effectiveGasPrice);
		}
		getTransactionReceipt();
		// Call the getBlockWithTransactions function
		getBlockWithTransactions();
	}, [blockNumber]); // The second argument to useEffect is an array of dependencies, which can be left empty in this case because the effect does not depend on any values from props or state

	return (
		<div className='blockexplorer-container bg-red-300'>
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
