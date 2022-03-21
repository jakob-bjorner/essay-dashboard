import arrow from '../arrow.png';
import React, { useState, setState, useRef, useEffect } from 'react';
import {getRephraseRequests} from '../services/RephraseRequestService';

export default function Rephrase() {
  	const [input, setInput] = useState('');
	const inputRef = useRef(null);
  	function handleChange(event) {
    	setInput(event.target.value);
  	}
	function handleSubmit(event) {
    	alert(input);
		console.log('hi')
		getRephraseRequests().then((data) => {
			console.log(data)
		})
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