import "./bootstrap.min.css";
import "./App.css";
import EmotionTable from "./EmotionTable.js";
import React from "react";
import Buttons from "./components/buttons";
import Report from "./components/report";
import Doc from "./components/doc";

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
    sentimentOutput: <Doc />,
    sentiment: true,
    color: "",
    text: "",
    message: "Please wait ...",
    showMessage: false,
    report: null,
    showGraph: false
  };

  /*
  This method returns the component based on what the input mode is.
  If the requested input mode is "text" it returns a textbox with 4 rows.
  If the requested input mode is "url" it returns a textbox with 1 row.
  */

  renderOutput = (input_mode) => {
    if (input_mode.category === "text") {
      this.setState({
        mode: "text",
        showTextBox: true,
      });
    } else {
      this.setState({
        mode: "url",
        showTextBox: false,
      });
    }

    this.setState({
      sentimentOutput: [],
      sentiment: true,
      text: "",
    });
    document.getElementById("textinput").value = "";
  };

  sendForSentimentAnalysis = () => {
    this.setState({ showMessage: true });
    let text = document.getElementById("textinput").value;
    // let target = document.getElementById("target").value;
    if (text == "") {
      alert("Please enter the sentence");
      this.setState({ showMessage: false });
      return;
    }
    if (this.state.mode == "url" && !text.includes("http")) {
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

    fetch(url
    //   {method: "POST", 
    // headers: {
    //   'Content-Type': 'application/json;charset=utf-8'
    // },
    // body: JSON.stringify({target: target})}
    ).then((response) => {
      response
        .json()
        .then((res) => {
          console.log("data ", res);
          this.setState({ report: res });
          let data = res.sentiment.document.label;
          // res.send(analysisResults.result.sentiment.document.label);
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
              {data}
            </div>
          );
          this.setState({ showMessage: false });
          this.setState({ sentimentOutput: output });
          // document.getElementById("textinput").value = "";
        })
        .catch((err) => {
          alert(err);
          return;
        });
    });
  };

  sendForEmotionAnalysis = async () => {
    this.setState({ showMessage: true });
    let text = document.getElementById("textinput").value;
    // let target = document.getElementById("target");

    if (text == "") {
      alert("Please enter the sentence");
      this.setState({ showMessage: false });
      return;
    }
    if (this.state.mode == "url" && !text.includes("http")) {
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
      await fetch(url).then((response) => {
        response.json().then((res) => {
          console.log("response ", res);
          this.setState({ report: res });
          let data = res.keywords[0].emotion;
          // res.send(analysisResults.result.keywords[0].emotion, null, 2);
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
      alert(err);
      return;
    }
  };

  render() {
    return (
      <div className="App">
        <div className="container-fluid main">
          {/* // input-section */}
          <div className="row input-section">
            <div className="col-3 selection mb-2 mt-1">
              
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
                
              
                {/* <input className="mt-2" type="text" id="target" name="target" placeholder="Words to target (optional)" /> */}
              
              
            </div>
            <div className="col-6 content-section">
              {this.state.showTextBox ? (
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
                {/* <Buttons
                  type="primary"
                  text="Analyze Sentiment"
                  category=""
                  renderOutput={this.sendForSentimentAnalysis}
                /> */}

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
            <div className="col-3" id="report-section">
              
                <div>
                  <h5>Analysis Report</h5>
                  <Report result={this.state.report} />
                </div>
              
            </div>
            <div className="col-1"></div>
            <div className="col-8" id="result-section">
              <div className="row result-heading">
                <div className="col-6">
                <Buttons
                  type="primary"
                  text="Table Format"
                  category=""
                  renderOutput={() => this.setState({showGraph: false})}
                />
              <Buttons
                  type="primary"
                  text="Graph Format"
                  category=""
                  renderOutput={() => this.setState({showGraph: true})}
                />
                </div>
             <div className="col-6">
             <h5>Analysis Result</h5>
             </div>
             
              </div>
            

              {this.state.showGraph ? "Graph" : this.state.sentimentOutput}
              <br />
              {this.state.showMessage ? this.state.message : null}
            </div>
            {/* <div className="col-4"></div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
