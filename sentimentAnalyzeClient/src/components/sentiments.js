import React from "react";


const SentimentResult = (props) => {
    let {report} = props;
    return (
            <div>
                {report && report.sentiments}
            </div>
    )   
}

export default SentimentResult;