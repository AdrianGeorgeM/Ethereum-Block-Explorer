import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const Account = (props) => {
	const [address, setAddress] = useState("");
	const [tokenBalances, setTokenBalances] = useState();
	const [ethBalance, setEthBalance] = useState();
	console.log("ethBalance", ethBalance);
	console.log("tokenBalances", tokenBalances);
	const { alchemy } = props;

	const tokens = [];

	const handleSubmit = async (e) => {
		e.preventDefault();
		const balance = await alchemy.core.getBalance(address, "latest");
		setEthBalance(balance["_hex"] / Math.pow(10, 18));
		const balances = await alchemy.core.getTokenBalances(address);
		// console.log(balances);

		// Remove tokens with zero balance
		const nonZeroBalances = balances.tokenBalances.filter((token) => {
			return token.tokenBalance !== "0";
		});

		console.log(`Token balances of ${address} \n`);

		for (let token of nonZeroBalances) {
			// Get balance of token
			let balance = token.tokenBalance;

			// Get metadata of token
			const metadata = await alchemy.core.getTokenMetadata(
				token.contractAddress
			);
			console.log(metadata);
			// Compute token balance in human-readable format
			balance = balance / Math.pow(10, metadata.decimals);
			balance = balance.toFixed(2);

			// Add token to list of tokens
			tokens.push({
				name: metadata.name,
				balance: balance,
				symbol: metadata.symbol,
			});
		}

		setTokenBalances(tokens);
	};

	return (
		<Card>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>Enter Ethereum Address:</Form.Label>
					<Form.Control
						type='text'
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
				</Form.Group>
				<Button style={{ margin: "15px" }} variant='primary' type='submit'>
					Get Balances
				</Button>
			</Form>
			{tokenBalances && ethBalance && (
				<Card.Body style={{ width: "auto" }}>
					<ListGroup variant='flush'>
						{tokenBalances.map((token, i) => {
							const { name, balance, symbol } = token;
							return (
								<ListGroup.Item key={`${i}: ${symbol}`}>
									{name}: {balance} {symbol}
								</ListGroup.Item>
							);
						})}
						<ListGroup.Item>Ether balance: {ethBalance} </ListGroup.Item>
					</ListGroup>
				</Card.Body>
			)}
		</Card>
	);
};

export default Account;
