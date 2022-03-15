import arrow from '../arrow.png';
import React, { useState, setState, useRef, useEffect } from 'react';
import { getRephraseRequests } from '../services/RephraseRequestService';

export default function Rephrase() {
  const [input, setInput] = useState('');
  const [output, showResult] = useState('');

//	function handleChange(event) {
//		setInput(event.target.value);
//	}
	async function handleSubmit(event) {
   // setOutput(input);
    //console.log(input)
		alert(input);
		event.preventDefault();
		 
		const data = await getRephraseRequests();
		showResult(data);
		console.log(data)
	}

	function IOInterface(props) {
		return (
			<div className="IObox">
				<form>
					<textarea
						type="text"
						className="input"
						placeholder="Type something..."
						value = {input}
						//onChange={handleChange}
						onChange={(e) => setInput(e.target.value)}
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
						  value = {output}
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
	return (
		<IOInterface />
	);      
}