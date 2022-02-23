import './App.css';
import arrow from './arrow.png';
import React, { useState, setState, useRef, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function App() {
	return (
		<div className="App">
			<div className="essay-header">
				<div className="title">
					Essay Dashboard
				</div>
			</div>
			<Outlet/>
		</div>
	);
}


