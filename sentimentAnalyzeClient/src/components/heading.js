import React, {useContext} from "react";
import { StoreContext } from "../reducer/reducer";
import "../../src/bootstrap.min.css";
import "../../src/App.css";
import Buttons from "../components/buttons";
import { types } from "../reducer/actionTypes";
import Doc from "./doc";

const Heading = (props) => {
    const {showTextBox,sendForEmotionAnalysis} = props;
    const [, dispatch ] = useContext(StoreContext);

    let switchTextBox = (input_mode) => {
      dispatch({ type: types.DISABLE_BUTTON, payload: true});
  
      if (input_mode.category === "text") {
          dispatch({ type: types.UPDATE_MODE, payload: 'text'});
          dispatch({ type: types.SHOW_TEXTBOX, payload: true});
  
       
      } else {
          dispatch({ type: types.UPDATE_MODE, payload: 'url'});
          dispatch({ type: types.SHOW_TEXTBOX, payload: false});
      
      }
      dispatch({ type: types.UPDATE_SENTIMENT_OUTPUT, payload: <Doc /> });
      dispatch({ type: types.SHOW_GRAPH, payload: false});
      dispatch({ type: types.SHOW_ENTITIES, payload: false});
      dispatch({ type: types.UPDATE_REPORT, payload: null});
  
      document.getElementById("textinput").value = "";
    };


    return (
        <div className="row input-section">
        <div className="col-3 selection mb-2 mt-1">
          <h5>Select Input type</h5>
          <Buttons
            type="info"
            text="Text"
            category="text"
            renderOutput={switchTextBox}
            size="sm"
            disabled={false}
          />
          <Buttons
            type="dark"
            text="Url"
            category="url"
            renderOutput={switchTextBox}
            size="sm"
            disabled={false}
          />

          {/* <input className="mt-2" type="text" id="target" name="target" placeholder="Words to target (optional)" /> */}
        </div>
        <div className="col-6 content-section">
          {showTextBox ? (
            <textarea
              rows="4"
              cols="70"
              id="textinput"
              placeholder="Please type text here to analyze"
            />
          ) : (
            <textarea
              rows="1"
              cols="70"
              id="textinput"
              placeholder="Please type url here to analyze"
            />
          )}
        </div>
        <div className="col-3 navigation-section">
          <div className="selection mb-2 mt-1">
            <h5>Run Analyze type</h5>
          

            <Buttons
              type="primary"
              text=" Analyze Emotion"
              category=""
              renderOutput={sendForEmotionAnalysis}
              size="sm"
              disabled={false}
            />
          </div>
        </div>
      </div>
    )
}

export default Heading;