import React, {Fragment, useContext} from "react";
import { StoreContext } from "../reducer/reducer";
import Buttons from "./buttons";
import "../../src/bootstrap.min.css";
import { types } from "../reducer/actionTypes";

const ResultHeading = () => {
    const [globalState, dispatch ] = useContext(StoreContext);
    return (
        <Fragment>
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
      </Fragment>
      
    )
}

export default ResultHeading;