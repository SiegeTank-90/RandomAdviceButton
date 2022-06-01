import "./App.css";
import dice from "./images/icon-dice.svg";
import desktopDivider from "./images/pattern-divider-desktop.svg";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    GetAdvice();
  }, []);

  const [adviceMessage, setAdviceMessage] = useState("");
  const [adviceID, setAdviceID] = useState("");
  const [activeState, setActiveState] = useState("Randomizer")

  async function GetAdvice() {
    let response = await axios.get("https://api.adviceslip.com/advice");
    try {
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setActiveState("Randomizer-Deactive")
    setAdviceMessage(response.data.slip.advice);
    setAdviceID(response.data.slip.id);
    setTimeout( () => {setActiveState("Randomizer")}, 2000)
  }

  return (
    <div className="Container">
      <div className="MessageContainer">
        <h3 className="AdviceNum">advice #{adviceID}</h3>
        <h1 className="AdviceMessage">{adviceMessage}</h1>
        <div className="Divider">
          <img src={desktopDivider} alt="divider" />"
        </div>
      </div>
      <button className={activeState} onClick={GetAdvice}>
        <img src={dice} alt="dice"  />
      </button>
    </div>
  );
}

export default App;
