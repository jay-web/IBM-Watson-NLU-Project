import React from "react";
import "../../src/bootstrap.min.css";
import "../../src/App.css";
import Buttons from "../components/buttons";

const Heading = (props) => {
    const {renderOutput, showTextBox,sendForEmotionAnalysis} = props;


    return (
        <div className="row input-section">
        <div className="col-3 selection mb-2 mt-1">
          <h5>Select Input type</h5>
          <Buttons
            type="info"
            text="Text"
            category="text"
            renderOutput={renderOutput}
            size="sm"
            disabled={false}
          />
          <Buttons
            type="dark"
            text="Url"
            category="url"
            renderOutput={renderOutput}
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