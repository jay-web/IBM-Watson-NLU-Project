import "./bootstrap.min.css";
import "./App.css";

import React, { useReducer, useContext } from "react";
import Buttons from "./components/buttons";
import Report from "./components/report";
import Doc from "./components/doc";
import { StoreContext } from "./reducer/reducer";

import renderGraphData from "./utilis/graphData";
import EntitiesData from "./components/entities";
import Graph from "./components/graph";
import Heading from "./components/heading";
import { types } from "./reducer/actionTypes";

import {INITIAL_STATE, reducer } from "./reducer/reducer";

const App  = () =>  {
 const [globalState, dispatch ] = useReducer(reducer, INITIAL_STATE);


  let sendForEmotionAnalysis = async () => {

    dispatch({type: types.SHOW_MESSAGE, payload: true});
    
    let text = document.getElementById("textinput").value;
    // let target = document.getElementById("target");

    if (text == "") {
      alert("Please enter the sentence");
      dispatch({type: types.SHOW_MESSAGE, payload: false});
      return;
    }
    if (globalState.mode == "url" && !text.includes("http")) {
      alert("Please type url or change the input type !!");
      dispatch({type: types.SHOW_MESSAGE, payload: false});
      return;
    }

    let url = ".";
    let mode = globalState.mode;
    url =
      url +
      "/" +
      mode +
      "/emotion?" +
      mode +
      "=" +
      document.getElementById("textinput").value;

    await fetch(url).then((response) => {
      response.json().then((res) => {
        if (res.err && res.err.status === 400) {
          alert(res.err.message);
          return;
        }

        let data = res.keywords[0].emotion;
        let emotionData = Object.keys(data).map((e, i) => {
          return data[e];
        });

        dispatch({type: types.UPDATE_EMOTIONS, payload: emotionData});
        dispatch({type: types.SHOW_GRAPH, payload: true});
        dispatch({type: types.DISABLE_BUTTON, payload: false});
        dispatch({type: types.SHOW_MESSAGE, payload: false});
        dispatch({type: types.UPDATE_REPORT, payload: res});
        dispatch({type: types.UPDATE_ENTITIES, payload: res.entities });
       

      });
    });
  };

    
    return (
        <div className="App">
          <StoreContext.Provider  value={[globalState, dispatch ]} >
        <div className="container-fluid main">
          {/* // input-section */}
          <Heading
            showTextBox={globalState.showTextBox}
            sendForEmotionAnalysis={sendForEmotionAnalysis}
          />

          {/* output section */}
          <div className="row output-section">
            <div className="col-3" id="report-section">
              <div>
                <h5>Analysis Report</h5>
                <Report  />
              </div>
            </div>

            <div className="col-9" id="result-section">
              <div className="row result-heading">
                <div className="col-6 heading-content ">
                  <Buttons
                    type="primary"
                    text="Doughnut Format"
                    category=""
                    renderOutput={() => {
                      dispatch({type: types.SHOW_GRAPH, payload: true });
                      dispatch({type: types.SHOW_ENTITIES, payload: false })
                    }
                    }
                    size="sm"
                    disabled={globalState.buttonDisabled}
                  />

                  <Buttons
                    type="secondary"
                    text="Entities Data"
                    category=""
                    renderOutput={() => {
                       dispatch({type: types.SHOW_GRAPH , payload: false});
                       dispatch({type: types.SHOW_ENTITIES, payload: true });
                    }
                    }
                    size="sm"
                    disabled={globalState.buttonDisabled}
                  />
                </div>
                <div className="col-6 heading-content ">
                  <h5>Analysis Result</h5>
                  <h6>
                    {globalState.report
                      ? globalState.showGraph
                        ? "( In Doughnut Format )"
                        : "( Entities Data Collection )"
                      : null}
                  </h6>
                </div>
              </div>
              <div className="row result-display">
                <div className="col-12">
                  {globalState.showGraph ? (
                    <Graph
                      data={renderGraphData(globalState.emotions)}
                      options={globalState.options}
                    />
                  ) : globalState.showEntities ? (
                    <EntitiesData entities={globalState.entities} />
                  ) : (
                    globalState.sentimentOutput
                  )}
                  <br />
                  { globalState.showMessage ? globalState.message : null}
                 
                </div>
              </div>
            </div>
            {/* <div className="col-4"></div> */}
          </div>
        </div>
        </StoreContext.Provider>
      </div>
    )
  
}

export default App;