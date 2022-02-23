import { Outlet, Link } from 'react-router-dom';
import arrow from '../arrow.png';
import React, { useState, setState, useRef, useEffect } from 'react';

export default function Home() {
    const [input, setInput] = useState('');
	function handleChange(event) {
		setInput(event.target.value);
	}
	function handleSubmit(event) {
		alert(input);
		event.preventDefault();
	}
    return (
        <div className="box">
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
				<div className="function-sidebar">
					<div className="btn-holder">
					<button className="function-btn">
						<div className="heading">Rephrase sentences</div>
						<div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper lobortis justo id laoreet. </div>
					</button>
					<button className="function-btn">
						<div className="heading">Summarize sentences</div>
						<div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper lobortis justo id laoreet. </div>
					</button>
					<button className="function-btn">
						<div className="heading">
							<Link to="/completion">Sentence Completion</Link>
						</div>
						<div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper lobortis justo id laoreet. </div>
					</button>
					</div>
				</div>
			</div>
    );    
}