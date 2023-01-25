import React from "react";
import { useState } from "react";
import { Card, Button } from "react-bootstrap";

import styles from "./Content.module.css";

const Nav = (props) => {
	const [transactions, setTransactions] = useState();
	const [nonce, setNonce] = useState();
	const [hash, setHash] = useState();
	const [number, setNumber] = useState();
	const [receipt, setReceipt] = useState();

	const { alchemy } = props;

	//getBlock Returns the block from the network based on the provided block number or hash
	const getBlock = async () => {
		const valuesArray = await alchemy.core.getBlock();
		setTransactions(valuesArray["transactions"]);
		setHash(valuesArray["hash"]);
		setNonce(valuesArray["nonce"]);
		setNumber(valuesArray["number"]);
	};

	const getBlockTransactions = async (hash) => {
		const _receipt = await alchemy.core.getTransactionReceipt(hash);
		setReceipt(_receipt);
		console.log(receipt);
	};

	return (
		<>
			<Button
				style={{ margin: "15px" }}
				variant='primary'
				type='submit'
				onClick={() => getBlock()}
			>
				Get Data
			</Button>
			{hash && (
				<>
					<section className={styles.section} style={{ maxWidth: "auto" }}>
						<p className='border'> Hello Hash</p>
						<h2 className='text-rose-500'>Block Information</h2>
						<Card.Body>
							<Card.Text style={{ fontStyle: "bold" }}>Hash</Card.Text>
							<label className={styles.hash}>{hash}</label>
							<Card.Text style={{ textDecoration: "bold" }}>Nonce</Card.Text>

							<label className={styles.hash}>{nonce}</label>

							<Card.Text>Blocknumber</Card.Text>
							<label>{number}</label>
						</Card.Body>
						<Card.Footer> Adrian Blockchain Solutions </Card.Footer>
					</section>
					<Card style={{ maxWidth: "auto" }}>
						<Card.Title>Transactions:</Card.Title>
						<Card.Body>
							<ul>
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
							</ul>
						</Card.Body>
					</Card>
				</>
			)}
		</>
	);
};

export default Nav;
