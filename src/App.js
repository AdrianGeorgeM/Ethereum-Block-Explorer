import React, { useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";
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
			{/* <div className='container'>
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
			</div> */}
			<Alert dismissible variant='danger'>
				<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
				<p>Change this and that and try again.</p>
			</Alert>
			<Form.Group className='mb-3'>
				<Form.Label>Disabled input</Form.Label>
				<Form.Control placeholder='Disabled input' disabled />
			</Form.Group>
			<Form.Group className='mb-3'>
				<Form.Label>Disabled select menu</Form.Label>
				<Form.Select disabled>
					<option>Disabled select</option>
				</Form.Select>
			</Form.Group>
			<Form.Group className='mb-3'>
				<Form.Check type='checkbox' label="Can't check this" disabled />
			</Form.Group>
		</div>
	);
}

export default App;
