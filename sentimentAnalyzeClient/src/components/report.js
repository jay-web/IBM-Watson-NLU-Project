import React, {useContext} from "react";
import { StoreContext } from "../reducer/reducer";

const Report = () => {
  const [globalState] = useContext(StoreContext);

  let { report } = globalState;
  return (
    <div className="report-section">
      
        <div>
          <li>
            <span>Language:</span>
            {report ? report.language : ""}
          </li>
          <li>
            <span>Total characters:</span> {report ? report.usage.text_characters: ""}
          </li>
          <li>
            <span>Sentiment: </span>
            {report ? report.sentiment.document.label: ""}
          </li>
          <li>
            <span>Sentiment Score:</span> {report ? report.sentiment.document.score : ""}
          </li>
          <li>
            <span>Sadness:</span> {report ? report.keywords[0].emotion.sadness : ""}
          </li>
          <li>
            <span>Joy:</span> {report ? report.keywords[0].emotion.joy : ""}
          </li>
          <li>
            <span>Fear:</span> {report ? report.keywords[0].emotion.fear: ""}
          </li>
          <li>
            <span>Disgust:</span> {report ? report.keywords[0].emotion.disgust: ""}
          </li>
          <li>
            <span>Anger:</span> {report ? report.keywords[0].emotion.anger: ""}
          </li>
        </div>
      
    </div>
  );
};

export default Report;
