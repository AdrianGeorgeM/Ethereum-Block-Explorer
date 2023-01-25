import React, { useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import Header from "./components/Header";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";

const settings = {
	apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
	network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
	const [blockNumber, setBlockNumber] = useState();
	const [showAccount, setShowAccount] = useState(false);
	const [showBlock, setShowBlock] = useState(false);

	useEffect(() => {
		async function getBlockNumber() {
			setBlockNumber(await alchemy.core.getBlockNumber());
		}
		console.log("blockNumber", blockNumber);
		getBlockNumber();
	}, []);

	function accountInfo() {
		setShowAccount(true);
	}
	console.log("showAccount", accountInfo);
	function blockInfo() {
		setShowBlock(true);
	}
	console.log("showBlock", blockInfo);
	return (
		<div className='App'>
			<div className='container'>
				<Header blockNumber={blockInfo} />
			</div>
		</div>
	);
}

export default App;
