import './App.css';
import arrow from './arrow.png';
import logo from './essAI-logo.png';
import React, { useState, setState, useRef, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function App() {
	let navigate = useNavigate()

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

	var addStyles = (index) => {
		let newStyles = [...styles];
		for (let i = 0; i < newStyles.length; i++) {
			if (i === index) {
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
				onClick={() => {
					addStyles(props.index);
					navigate(props.path);
				}}
				className={styles[props.index].function_btn}
			>
				<div className={styles[props.index].heading}>{props.heading}</div>
				<div className={styles[props.index].description}>
					{props.description}
				</div>
			</button>
		);
	}
	return (
		<div className="App">
			{/* <div className="header">
        <div className="navbar">
        <div className="logo-holder">
			<img src={logo} className="logo" alt="logo"></img>
		</div>
        </div>
    		</div> */}
			<div className="box">
				<div className="function-sidebar">
					<img src={logo} className="logo" alt="logo"></img>
					<div className="btn-holder">
						<SidebarButton
							index={0}
							heading="Rephrase a sentence"
							description="Type a sentence, and we'll give you another one with the same meaning."
							path = 'rephrase'
						/>
						<SidebarButton
							index={1}
							heading="Complete a sentence"
							description="Type a sentence, and we'll finish it for you based on the information you provided."
							path = 'complete'
						/>
						<SidebarButton
							index={2}
							heading="Create an outline"
							description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
								semper lobortis justo id laoreet."
							path = 'outline'
						/>
					</div>
				</div>
				<Outlet/>
			</div>
		</div>
	);
}


