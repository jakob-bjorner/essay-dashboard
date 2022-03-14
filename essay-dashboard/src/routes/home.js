import arrow from "../arrow.png";
import React, { useState, setState, useRef, useEffect } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  // const variable_name_example = {data: "hello"};

  // create some const output variable for holding the state of the output text.
  // const inputRef = useRef(null);
  function handleChange(event) {
    setInput(event.target.value);
  }
  function handleSubmit(event) {
    alert(input);
	// for implementing functionality look into the services folder.
	// you can model a service using the RephraseService class.
	// create a service file for doing a put request to the backend.
	// Once created you can call it from here and display the data to output text!
    event.preventDefault();
  }
  function handelChangeOutput(event) {
    setOutput(event.target.value);
  }

  useEffect(() => {
    console.log(input);
  }, [input]);
  return (
    <div className="IObox">
      <form>
        <textarea
          // ref={inputRef}
          key="user_name_key"
          type="text"
          className="input"
          placeholder="Type something..."
          onChange={handleChange}
          value={input}
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
          onChange={handelChangeOutput}
          value={output}
          // place the state here of the output, and be sure to put the same
          // handle change in here as well.
        ></textarea>
      </form>
    </div>
  );
}
