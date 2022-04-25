import arrow from "../arrow.svg";
import copy_icon from "../copy-icon.png";
import like_btn from "../like-btn.png";
import dislike_btn from "../dislike-btn.png";
import React, { useState, setState, useRef, useEffect } from "react";

import {
  completeSentence,
  postSentenceCompletions,
} from "../services/SentenceCompletionService";

export default function Complete() {
  const [output, showResult] = useState("");
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  let likeClicked = false;

  const handleLike = async () => {
    if (!likeClicked) {
      sendLogs(true);
      likeClicked = true;
    }
  };

  const handleDislike = async () => {
    sendLogs(false);
    /*Tells the app that the response is loading... */

    //setLoading(true);

    /*Awaits response from the backend. Response is in an object form */
    const data = await completeSentence(input);
    /*Tells the app that the response has been obtained */

    //setLoading(false);

    /*Show results extract the rephrased element of the object and displays it in the 
		"Response .." text area */
    showResult(data.rephrased);
  };

  const sendLogs = async (accepted) => {
    await postSentenceCompletions(input, output, accepted);
  };

  /*As long as there are changes being made on "Type something.. " text area,
	setInput set what ever changes as the value  */
  function handleChange(event) {
    /*Listens to those changes and set changes as the value*/
    setInput(event.target.value);
  }
  /*This function runs the moment you click on the arrow */
  async function handleSubmit(event) {
    likeClicked = false;

    /*Awaits response from the backend. Response is in an object form */
    const data = await completeSentence(input);
    /*Show results extract the rephrased element of the object and displays it in the 
		"Response .." text area */
    showResult(data.rephrased);

    /*Prevents textarea from reverting to their default value which is "" */
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
          value={input}
          align="left"
        ></textarea>
      </form>
      <button onClick={handleSubmit}>
        <img src={arrow} className="arrow" alt="arrow"></img>
      </button>
      <div className="output-box">
        <div className="result">{output}</div>
        <div className="bottom-bar">
          <button className="output-btn like-btn" onClick={handleLike}>
            <img className="icon" src={like_btn} />
          </button>
          <button className="output-btn dislike-btn" onClick={handleDislike}>
            <img className="icon" src={dislike_btn} />
          </button>
          <button
            className="output-btn copy-btn"
            onClick={() => {
              navigator.clipboard.writeText(output);
            }}
          >
            <img className="icon copy-icon" src={copy_icon} />
          </button>
        </div>
      </div>
    </div>
  );
}
