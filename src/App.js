import React, { useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import Button from "react-bootstrap/Button";
import Account from "./components/Account";
import Header from "./components/Header";
import Nav from "./components/Content";
import "./App.css";
import { Row, Col } from "react-bootstrap";

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
				<Row>
					<Col className='col-6'>
						{!showBlock && (
							<Button
								style={{ margin: "15px" }}
								variant='primary'
								type='submit'
								onClick={blockInfo}
							>
								Get Block Data
							</Button>
						)}
						{showBlock && <Nav alchemy={alchemy} />}
					</Col>
					<Col className='col-6'>
						{!showAccount && (
							<Button
								variant='primary'
								type='submit'
								style={{ margin: "15px" }}
								onClick={accountInfo}
							>
								Show Account Information
							</Button>
						)}
						{showAccount && <Account alchemy={alchemy} />}
					</Col>
				</Row>
			</div>
		</div>
	);
}

export default App;
