import arrow from '../arrow.png';
import React, { useState, setState, useRef, useEffect } from 'react';

export default function Home() {
    const [input, setInput] = useState('');
	// create some const output variable for holding the state of the output text.
	function handleChange(event) {
		setInput(event.target.value);
	}
	function handleSubmit(event) {
		alert(input);
		event.preventDefault();
	}

	function IOInterface(props) {
		return (
			<div className="IObox">
				<form>
					<textarea
						type="text"
						className="input"
						placeholder="Type something..."
						//onChange={handleChange}
						align="left"
					></textarea>
				</form>
				<button onClick={handleSubmit}>
					<img src={arrow} className="arrow" alt="arrow"></img>
				</button>
				<form>
					<textarea
						type="text"
						className="output"
						placeholder="Response..."
						// place the state here of the output, and be sure to put the same
						// handle change in here as well.
					></textarea>
				</form>
			</div>
		);
	}
	return (
		<IOInterface />
	);    
}