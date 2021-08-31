import React, {useContext} from "react";
import { StoreContext } from "../reducer/reducer";

const Report = () => {
  const [globalState] = useContext(StoreContext);

  let { report } = globalState;
  console.log("report ", report);
  let renderEmoji = (emotion) => {
      let emojies = {"positive": "😊", "negative": "😠", "neutral": "😐", "joy":"😃", "sadness": "😢", "fear": "😨", "anger": "😡", "disgust": "😖"}
      return emojies[emotion];
  }
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
            {report ? report.sentiment.document.label: ""} {report ? renderEmoji(report.sentiment.document.label) : null}
          </li>
          <li>
            <span>Sentiment Score:</span> {report ? report.sentiment.document.score : ""}
          </li>
          <li>
            <span>Sadness:</span> {report ? report.keywords[0].emotion.sadness : ""} {report ? renderEmoji("sadness") : null}
          </li>
          <li>
            <span>Joy:</span> {report ? report.keywords[0].emotion.joy : ""} {report ? renderEmoji("joy") : null}
          </li>
          <li>
            <span>Fear:</span> {report ? report.keywords[0].emotion.fear : ""} {report ? renderEmoji("fear") : null}
          </li>
          <li>
            <span>Disgust:</span> {report ? report.keywords[0].emotion.disgust : ""} {report ? renderEmoji("disgust"  ) : null}
          </li>
          <li>
            <span>Anger:</span> {report ? report.keywords[0].emotion.anger: ""} {report ? renderEmoji("anger") : null}
          </li>
        </div>
      
    </div>
  );
};

export default Report;
