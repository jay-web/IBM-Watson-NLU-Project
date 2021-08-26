import "./bootstrap.min.css";
import "./App.css";
import EmotionTable from "./EmotionTable.js";
import React from "react";
import Buttons from "./components/buttons";

class App extends React.Component {
  /*
  We are setting the component as a state named innercomp.
  When this state is accessed, the HTML that is set as the 
  value of the state, will be returned. The initial input mode
  is set to text
  */
  state = {
    showTextBox: true,
    mode: "text",
    sentimentOutput: [],
    sentiment: true,
    color: "",
    text: "",
    message: "Please wait ...",
    showMessage: false,
  };

  /*
  This method returns the component based on what the input mode is.
  If the requested input mode is "text" it returns a textbox with 4 rows.
  If the requested input mode is "url" it returns a textbox with 1 row.
  */

  renderOutput = (input_mode) => {
    console.log("inputt", input_mode);
    //If the input mode is text make it 4 lines
    if (input_mode.category === "text") {
      this.setState({
        mode: "text",
        showTextBox: true,
        sentimentOutput: [],
        sentiment: true,
        text: "",
      });
    } else {
      this.setState({
        mode: "url",
        showTextBox: false,
        sentimentOutput: [],
        sentiment: true,
        text: "",
      });
    }
    document.getElementById("textinput").value = "";
  };

  sendForSentimentAnalysis = () => {
    this.setState({ showMessage: true });
    let text = document.getElementById("textinput").value;
    if (text == "") {
      alert("Please enter the sentence");
      this.setState({ showMessage: false });
      return;
    }
    if(this.state.mode == "url" && !text.includes("http")){
      alert("Please type url or change the input type !!");
      this.setState({ showMessage: false });
      return;
    }
    this.setState({ text: <h2>{text}</h2> });
    this.setState({ sentiment: true });
    let url = ".";
    let mode = this.state.mode;
    url =
      url +
      "/" +
      mode +
      "/sentiment?" +
      mode +
      "=" +
      document.getElementById("textinput").value;

    fetch(url).then((response) => {
      response
        .text()
        .then((data) => {
          console.log("data ", data);
          // this.setState({sentimentOutput:data});
          let output = data;
          if (data == "positive") {
            this.setState({ color: "green" });
          } else if (data == "negative") {
            this.setState({ color: "red" });
          } else {
            this.setState({ color: "yellow" });
          }

          output = (
            <div
              style={{
                color: `${this.state.color}`,
                fontSize: 40,
                marginTop: "1rem",
                backgroundColor: "wheat",
              }}
            >
              {data.includes("not enough")
                ? "Please enter more text to analyse"
                : data}
            </div>
          );
          this.setState({ showMessage: false });
          this.setState({ sentimentOutput: output });
          // document.getElementById("textinput").value = "";
        })
        .catch((err) => {
          alert("Please enter more words to analyse!!");
          // return;
        });
    });
  };

  sendForEmotionAnalysis = () => {
    this.setState({ showMessage: true });
    let text = document.getElementById("textinput").value;
    if (text == "") {
      alert("Please enter the sentence");
      this.setState({ showMessage: false });
      return;
    }
    if(this.state.mode == "url" && !text.includes("http")){
      alert("Please type url or change the input type !!");
      this.setState({ showMessage: false });
      return;
    }
    this.setState({ text: <h2>{text}</h2> });
    this.setState({ sentiment: false });
    let url = ".";
    let mode = this.state.mode;
    url =
      url +
      "/" +
      mode +
      "/emotion?" +
      mode +
      "=" +
      document.getElementById("textinput").value;
    try {
      fetch(url).then((response) => {
        response.json().then((data) => {
          console.log("response ", data);
          if (data.err) {
            this.setState({ text: <h1>Please enter more text to analyse</h1> });
            return;
          }
          this.setState({ showMessage: false });
          this.setState({ sentimentOutput: <EmotionTable emotions={data} /> });
          // document.getElementById("textinput").value = "";
        });
      });
    } catch (err) {
      console.log(err);
      alert("Please enter more words to analyse!!");
    }
  };

  render() {
    return (
      <div className="App">
        <div className="container-fluid main">
          {/* // input-section */}
          <div className="row input-section">
            <div className="col-2">
              <div className="selection mb-2 mt-1">
                <h5>Select Input type</h5>
                <Buttons
                  type="info"
                  text="Text"
                  category="text"
                  renderOutput={this.renderOutput}
                />
                <Buttons
                  type="dark"
                  text="Url"
                  category="url"
                  renderOutput={this.renderOutput}
                />
              </div>
            </div>
            <div className="col-7 content-section">
              {this.state.showTextBox ? (
                <textarea rows="4" cols="70" id="textinput" placeholder="Please type text here to analyze"/>
              ) : (
                <textarea rows="1" cols="70" id="textinput" placeholder="Please type url here to analyze"/>
              )}
            </div>
            <div className="col-3 navigation-section">
              <div className="selection mb-2 mt-1">
                <h5>Run Analyze type</h5>
                <Buttons
                  type="primary"
                  text="Analyze Sentiment"
                  category=""
                  renderOutput={this.sendForSentimentAnalysis}
                />

                <Buttons
                  type="primary"
                  text=" Analyze Emotion"
                  category=""
                  renderOutput={this.sendForEmotionAnalysis}
                />
              </div>
            </div>
          </div>

          {/* output section */}
          <div className="row output-section">
          
            {this.state.sentimentOutput}
            {this.state.showMessage ? this.state.message : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
