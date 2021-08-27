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
          <li>
            <span>Sadness:</span> {result ? result.keywords[0].emotion.sadness : ""}
          </li>
          <li>
            <span>Joy:</span> {result ? result.keywords[0].emotion.joy : ""}
          </li>
          <li>
            <span>Fear:</span> {result ? result.keywords[0].emotion.fear: ""}
          </li>
          <li>
            <span>Disgust:</span> {result ? result.keywords[0].emotion.disgust: ""}
          </li>
          <li>
            <span>Anger:</span> {result ? result.keywords[0].emotion.anger: ""}
          </li>
        </div>
      
    </div>
  );
};

export default Report;
