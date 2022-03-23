import arrow from '../arrow.png';
import React, { useState, setState, useRef, useEffect } from 'react';

import { rephraseSentence } from '../services/RephraseRequestService';

export default function Rephrase() {
	const [output, showResult] = useState('');
	const [input, setInput] = useState('');
	const inputRef = useRef(null);
	/*As long as there are changes being made on "Type something.. " text area,
	setInput set what ever changes as the value  */
	function handleChange(event) {
		/*Listens to those changes and set changes as the value*/
		setInput(event.target.value);
	}
	/*This function runs the moment you click on the arrow */
	async function handleSubmit(event) {
		/*Awaits response from the backend. Response is in an object form */
		const data = await rephraseSentence(input);
		/*Show results extract the rephrased element of the object and displays it in the 
		"Response .." text area */
		showResult(data.rephrased);

		/*Prevents textarea from reverting to their default value which is "" */
		event.preventDefault();
	}

	useEffect(() => {
		console.log(input);
	}, [input]);

	return (

		<div className="IObox">
			<form>
				<textarea
					ref={inputRef}
					key="user_name_key"
					type="text"
					className="input"
					placeholder="Type something..."

					onChange={handleChange}
					value={input}
					align="left"
				></textarea>
			</form>
			<button onClick={handleSubmit}>
				<img src={arrow} className="arrow" alt="arrow"></img>
			</button>
			<div className="text-rephrase-out">
				<form>
					<textarea
						type="text"
						className="output"
						placeholder="Response..."
						value={output}
						onChange={(e) => showResult(e.target.value)}
					></textarea>
					<textarea
						type="text"
						className="output"
						placeholder="Response..."
					></textarea>
					<textarea
						type="text"
						className="output"
						placeholder="Response..."
					></textarea>
				</form>
			</div>
		</div>

	);
}