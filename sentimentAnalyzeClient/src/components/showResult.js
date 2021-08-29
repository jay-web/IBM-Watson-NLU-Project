import React, {Fragment, useContext } from "react";
import { StoreContext } from "../reducer/reducer";

import renderGraphData from "../utilis/graphData";
import Graph from "./graph";
import ShowEntities from "./entities";

const ShowResult = () => {
    const [globalState] = useContext(StoreContext);

    return (
        <Fragment>
        <div className="col-12">
        {globalState.showGraph ? (
          <Graph
            data={renderGraphData(globalState.emotions)}
            options={globalState.options}
          />
        ) : globalState.showEntities ? (
          <ShowEntities entities={globalState.entities} />
        ) : (
          globalState.sentimentOutput
        )}
        <br />
        { globalState.showMessage ? globalState.message : null}
       
      </div>
      </Fragment>
    )
}

export default ShowResult;