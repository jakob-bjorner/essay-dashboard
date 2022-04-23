import { useState } from "react";
import { rephraseSentence } from "./services/RephraseRequestService";

const ExampleRephrase = (props) => {
  const [state, setState] = useState({
    original: "",
    rephrased: "",
  });

  const rephraseHandler = async () => {
    rephraseSentence(state.original)
      .then((response) => {
        setState({ ...state, rephrased: response.rephrased });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <input
        value={state.original}
        onChange={(e) => {
          setState({ ...state, original: e.target.value });
        }}
      ></input>
      <button onClick={rephraseHandler}>Rephrase</button>
      <p className="rephrasedOutput">{state.rephrased}</p>
    </div>
  );
};

export default ExampleRephrase;
