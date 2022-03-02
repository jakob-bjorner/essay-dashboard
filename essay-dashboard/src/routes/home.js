import arrow from '../arrow.png';
import React, { useState, setState, useRef, useEffect } from 'react';

export default function Home() {
    const [input, setInput] = useState('');
	const inputRef = useRef(null);
	function handleChange(event) {
		setInput(event.target.value);
	}
	function handleSubmit(event) {
		alert(input);
		event.preventDefault();
	}
	useEffect(() => {
		console.log(input);
	}, [input])
	function IOInterface(props) {
		return (
			<div className="text-input-output">
				<form>
					<textarea
						ref={inputRef}
						key="user_name_key"
						type="text"
						className="input"
						placeholder="Type something..."
						value={input}
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