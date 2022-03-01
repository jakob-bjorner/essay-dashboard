import arrow from '../arrow.png';
import React, { useState, setState, useRef, useEffect } from 'react';

export default function Rephrase() {
  const [input, setInput] = useState('');

	function handleChange(event) {
		setInput(event.target.value);
	}
	function handleSubmit(event) {
		alert(input);
		event.preventDefault();
	}

	function IOInterface(props) {
		return (
			<div className="text-input-output">
				<form>
					<textarea
						type="text"
						className="input"
						placeholder="Type something..."
						onChange={handleChange}
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
					></textarea>
				</form>
			</div>
		);
	}
	return (
		<IOInterface />
	);      
}