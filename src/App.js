import './App.css';
import arrow from './arrow.png';
import logo from './essAI-logo.png';
import dark_logo from './dark-essAI-logo.png';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ModeContext } from './ModeContext';
import { Switch } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function App() {
	let navigate = useNavigate();
	useEffect(() => {
		document.title = 'EssAI';
	}, []);
	const theme = createTheme({
		status: {
			danger: '#e53e3e',
		},
		palette: {
			primary: {
				main: '#00c113',
				darker: '#053e85',
			},
		},
	});
	const { light, setMode } = useContext(ModeContext);
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
	var changeMode = (light) => {
		console.log(light);
		let newStyles = [...styles];
		for (let i = 0; i < newStyles.length; i++) {
			if (light) {
				if (newStyles[i].function_btn == 'active-dark-function-btn') {
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
			} else {
				if (newStyles[i].function_btn == 'active-function-btn') {
					newStyles[i] = {
						function_btn: 'active-dark-function-btn',
						description: 'active-dark-description',
						heading: 'active-dark-heading',
					};
				} else {
					newStyles[i] = {
						function_btn: 'dark-function-btn',
						description: 'dark-description',
						heading: 'dark-heading',
					};
				}
			}
		}
		setStyles(newStyles);
	};
	var addStyles = (index) => {
		let newStyles = [...styles];
		for (let i = 0; i < newStyles.length; i++) {
			if (light) {
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
			} else {
				if (i === index) {
					newStyles[i] = {
						function_btn: 'active-dark-function-btn',
						description: 'active-dark-description',
						heading: 'active-dark-heading',
					};
				} else {
					newStyles[i] = {
						function_btn: 'dark-function-btn',
						description: 'dark-description',
						heading: 'dark-heading',
					};
				}
			}
		}
		setStyles(newStyles);
		console.log(newStyles);
	};

	useEffect(() => {
		console.log('App.js', light);
	}, [light]);

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
			<div className={light ? 'box' : 'dark-box'}>
				<div className={light ? 'function-sidebar' : 'dark-function-sidebar'}>
					<div className="logo-holder">
						<img
							src={light ? logo : dark_logo}
							className={light ? 'logo' : 'dark-logo'}
							alt="logo"
						></img>
					</div>
					<ThemeProvider theme={theme}>
						<Switch
							onChange={() => {
								setMode(!light);
								changeMode(!light);
							}}
							color="primary"
							inputProps={{ 'aria-label': 'controlled' }}
						/>
					</ThemeProvider>
					<div className="btn-holder">
						<SidebarButton
							index={0}
							heading="Rephrase a sentence"
							description="Type a sentence, and we'll give you another one with the same meaning."
							path="rephrase"
						/>
						<SidebarButton
							index={1}
							heading="Complete a sentence"
							description="Type a sentence, and we'll finish it for you based on the information you provided."
							path="complete"
						/>
						<SidebarButton
							index={2}
							heading="Create an outline"
							description="Type an essay, and we'll come up with a short outline on what the essay talks about."
							path="outline"
						/>
					</div>
				</div>
				<Outlet />
			</div>
		</div>
	);
}
