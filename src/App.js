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
	const [transactions, setTransactions] = useState();
	const [blockNumber, setBlockNumber] = useState();
	const [nonce, setNonce] = useState();
	const [hash, setHash] = useState();
	const [number, setNumber] = useState();
	const [receipt, setReceipt] = useState();
	const [ethBalance, setEthBalance] = useState();
	const [blockDetails, setBlockDetails] = useState();
	const [transactionReceipt, setTransactionReceipt] = useState();
	const [blockWithTransactions, setBlockWithTransactions] = useState();

	useEffect(() => {
		async function getBlockNumber() {
			const blockNumber = await alchemy.core.getBlockNumber();
			setBlockNumber(blockNumber);
		}

		getBlockNumber();

		// async function getBlock() {
		// 	const blockDetails = await alchemy.core.getBlock(blockNumber);
		// 	const { transactions } = blockDetails;

		// 	setBlockDetails(transactions);
		// }

		const getBlock = async () => {
			const valuesArray = await alchemy.core.getBlock();
			setTransactions(valuesArray["transactions"]);
			setHash(valuesArray["hash"]);
			setNonce(valuesArray["nonce"]);
			setNumber(valuesArray["number"]);
		};

		getBlock();

		async function getBalance() {
			const balance = await alchemy.core.getBalance(address, "latest");
			setEthBalance(balance["_hex"] / Math.pow(10, 18));
			const balances = await alchemy.core.getTokenBalances(address);
		}
		getBalance();

		async function getBlockWithTransactions() {
			const { transactions } = await alchemy.core.getBlockWithTransactions(
				blockNumber
			);
			transactions.filter((transaction) => {
				const { s } = transaction;

				return s;
			});

			setBlockWithTransactions(transactions.length);
		}

		// async function getTransactionReceipt() {
		// 	const transaction = await alchemy.core.getTransactionReceipt(
		// 		"0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"
		// 	);

		// 	console.log("Transactions: ", transaction);
		// 	setTransactionReceipt(transaction);
		// }
		// const getBlockTransactions1 = async () => {
		// 	const _receipt = await alchemy.core.getTransactionReceipt(
		// 		"0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"
		// 	);
		// 	setTransactionReceipt("", _receipt);
		// 	console.log(transactionReceipt);
		// };

		// getBlockTransactions1();
	}, [blockNumber]);
	const getBlockTransactions = async (hash) => {
		const _receipt = await alchemy.core.getTransactionReceipt(hash);
		setReceipt(_receipt);
		console.log(receipt);
	};
	return (
		<div className='blockexplorer-container bg-red-300'>
			<h5 className='text-center'>Block Explorer</h5>
			<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
				<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th scope='row' className='px-6 py-3'>
								Block Number (getBlockNumber)
							</th>
							<th scope='col' className='px-6 py-3'>
								Block with Transactions (getBlockWithTransactions)
							</th>
							<th scope='col' className='px-6 py-3'>
								Block Details (getBlock)
							</th>
							<th>Transaction Receipt (getTransactionReceipt)</th>
						</tr>
					</thead>
					<tbody>
						<tr className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
							<th
								scope='row'
								className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
							>
								{blockNumber}
							</th>
							<td className='px-6 py-4 w-2'>{blockWithTransactions}</td>

							{/* <td className='px-6 py-4'>{transactionReceipt}j</td> */}
							{transactions.map((tx, i) => (
								<div
									key={i}
									style={{ padding: "10px 10px" }}
									onClick={() => getBlockTransactions(tx)}
								>
									<span style={{ fontWidth: "400px" }}> {i} | </span>
									{tx}
								</div>
							))}
							<td className='px-6 py-4'>""</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default App;
