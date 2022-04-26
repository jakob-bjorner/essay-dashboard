import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import Outline from './routes/outline';
import Complete from './routes/complete';
import Rephrase from './routes/rephrase';
import { ModeContext } from './ModeContext';

function ParentApp() {
	const [light, setMode] = useState(true);
	useEffect(() => {
		console.log('Parent app', light);
	}, [light]);
	return (
		<BrowserRouter>
			<ModeContext.Provider value={{ light, setMode }}>
				<Routes>
					<Route path="/" element={<App />}>
						<Route path="" element={<Rephrase />} />
						<Route path="rephrase" element={<Rephrase />} />
						<Route path="complete" element={<Complete />} />
						<Route path="outline" element={<Outline />} />
					</Route>
				</Routes>
			</ModeContext.Provider>
		</BrowserRouter>
	);
}

ReactDOM.render(<ParentApp />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
