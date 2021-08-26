import React from "react";

const Report = (props) => {
  let { result } = props;
  return (
    <div className="report-section">
      
        <div>
          <li>
            <span>Language:</span>
            {result ? result.language : ""}
          </li>
          <li>
            <span>Total characters:</span> {result ? result.usage.text_characters: ""}
          </li>
          <li>
            <span>Sentiment: </span>
            {result ? result.sentiment.document.label: ""}
          </li>
          <li>
            <span>Sentiment Score:</span> {result ? result.sentiment.document.score : ""}
          </li>
        </div>
      
    </div>
  );
};

export default Report;
