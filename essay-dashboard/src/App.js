import './App.css';
import arrow from './arrow.png';
import React, { useState, setState } from 'react';

function App() {
	const [input, setInput] = useState('');
	function handleChange(event) {
		setInput(event.target.value);
	}
	function handleSubmit(event) {
		alert(input);
		event.preventDefault();
	}
	return (
		<div className="App">
			<div className="essay-header">
				<div className="title">
				Essay Dashboard
			</div>
			</div>
			<div className="text-box">
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
			</div>
		</div>
	);
}

export default App;
