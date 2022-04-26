import arrow from "../arrow.svg";
import copy_icon from "../copy-icon.png";
import like_btn from "../like-btn.png";
import dislike_btn from "../dislike-btn.png";
import {
  completeSentence,
  postSentenceCompletions,
} from "../services/SentenceCompletionService";
import React, {
  useState,
  setState,
  useRef,
  useEffect,
  useContext,
} from "react";
import Rive from "rive-react";
import { ModeContext } from "../ModeContext.js";

function OutputBox(props) {
  const { light, setMode } = useContext(ModeContext);

  const handleLike = async () => {
    sendLogs(true);
  };

  const handleDislike = async () => {
    sendLogs(false);
    /*Tells the app that the response is loading... */

    props.setLoading(true);

    /*Awaits response from the backend. Response is in an object form */
    const data = await completeSentence(props.input);
    /*Tells the app that the response has been obtained */

    props.setLoading(false);

    /*Show results extract the rephrased element of the object and displays it in the 
		"Response .." text area */
    props.showResult(data.rephrased);
  };

  const sendLogs = async (accepted) => {
    await postSentenceCompletions(props.input, props.output, accepted);
  };

  if (props.loading) {
    return (
      <div className={light ? "output-box" : "dark-output-box"}>
        <Rive
          className="loading-animation"
          src="Loading-Animation.riv"
          animations="Loading"
        />
        <div className="bottom-bar">
          <button
            className={
              light ? "output-btn like-btn" : "dark-output-btn like-btn"
            }
          >
            <img className="icon like-icon" src={like_btn} />
          </button>
          <button
            className={
              light ? "output-btn dislike-btn" : "dark-output-btn dislike-btn"
            }
          >
            <img className="icon dislike-icon" src={dislike_btn} />
          </button>
          <button
            className={
              light ? "output-btn copy-btn" : "dark-output-btn copy-btn"
            }
          >
            <img
              className="icon copy-icon"
              src={copy_icon}
              onClick={() => {
                navigator.clipboard.writeText(props.output);
              }}
            />
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={light ? "output-box" : "dark-output-box"}>
        <div className="result">{props.output}</div>
        <div className="bottom-bar">
          <button
            className={
              light ? "output-btn like-btn" : "dark-output-btn like-btn"
            }
            onClick={handleLike}
          >
            <img className="icon like-icon" src={like_btn} />
          </button>
          <button
            className={
              light ? "output-btn dislike-btn" : "dark-output-btn dislike-btn"
            }
            onClick={handleDislike}
          >
            <img className="icon dislike-icon" src={dislike_btn} />
          </button>
          <button
            className={
              light ? "output-btn copy-btn" : "dark-output-btn copy-btn"
            }
          >
            <img
              className={light ? "icon copy-icon" : "icon dark-copy-icon"}
              src={copy_icon}
              onClick={() => {
                navigator.clipboard.writeText(props.output);
              }}
            />
          </button>
        </div>
      </div>
    );
  }
}
export default function Rephrase() {
  const { light, setMode } = useContext(ModeContext);
  const [output, showResult] = useState("");
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  /*As long as there are changes being made on "Type something.. " text area,
	setInput set what ever changes as the value  */
  function handleChange(event) {
    /*Listens to those changes and set changes as the value*/
    setInput(event.target.value);
    /* If the user removes their input, remove the previous output as well */
    if (event.target.value == "") {
      showResult("");
    }
  }
  /*This function runs the moment you click on the arrow */
  async function handleSubmit(event) {
    /*Tells the app that the response is loading... */
    setLoading(true);
    /*Awaits response from the backend. Response is in an object form */
    const data = await completeSentence(input);
    /*Tells the app that the response has been obtained */
    setLoading(false);
    /*Show results extract the rephrased element of the object and displays it in the 
		"Response .." text area */
    showResult(data.rephrased);

    /*Prevents textarea from reverting to their default value which is "" */
    event.preventDefault();
  }

  useEffect(() => {
    console.log("Rephrase: ", light);
  }, [light]);

  return (
    <div className={light ? "IObox" : "dark-IObox"}>
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
        <img
          src={arrow}
          className={light ? "arrow" : "dark-arrow"}
          alt="arrow"
        ></img>
      </button>
      <OutputBox
        output={output}
        loading={loading}
        input={input}
        setLoading={setLoading}
        showResult={showResult}
      />
    </div>
  );
}
