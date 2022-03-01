import './App.css';
import arrow from './arrow.png';
import React, { useState, setState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export default function App() {
	const [input, setInput] = useState('');
	const [styles, setStyles] = useState([
		{
			function_btn: 'function-btn',
			description: 'description',
			heading: 'heading',
		},
		{
			function_btn: 'function-btn',
			description: 'description',
			heading: 'heading',
		},
		{
			function_btn: 'function-btn',
			description: 'description',
			heading: 'heading',
		},
	]);

	function handleChange(event) {
		setInput(event.target.value);
	}
	function handleSubmit(event) {
		alert(input);
		event.preventDefault();
	}
	var addStyles = (index) => {
		let newStyles = [...styles];
		for (let i = 0; i < newStyles.length; i++) {
			if (i == index) {
				newStyles[i] = {
					function_btn: 'active-function-btn',
					description: 'active-description',
					heading: 'active-heading',
				};
			} else {
				newStyles[i] = {
					function_btn: 'function-btn',
					description: 'description',
					heading: 'heading',
				};
			}
		}
		setStyles(newStyles);
		console.log(newStyles);
	};
	useEffect(() => {
		console.log(styles);
	}, [styles]);

	function SidebarButton(props) {
		return (
			<button
				onClick={() => addStyles(props.index)}
				className={styles[props.index].function_btn}
			>
				<div className={styles[props.index].heading}>{props.heading}</div>
				<div className={styles[props.index].description}>
					{props.description}
				</div>
			</button>
		);
	}

	function SummarizeSentences(props) {
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
		<div className="App">
			<div className="essay-header">
				<div className="title">
					Essay Dashboard
				</div>
			</div>
			<div className="box">
				<Outlet/>
				<div className="function-sidebar">
					<div className="btn-holder">
						<SidebarButton
							index={0}
							heading="Rephrase sentences"
							description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
								semper lobortis justo id laoreet."
						/>
						<SidebarButton
							index={1}
							heading="Summarize sentences"
							description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
								semper lobortis justo id laoreet."
						/>
						<SidebarButton
							index={2}
							heading="Create an outline"
							description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
								semper lobortis justo id laoreet."
						/>
					</div>
				</div>
			</div>
		</div>
	);
}


