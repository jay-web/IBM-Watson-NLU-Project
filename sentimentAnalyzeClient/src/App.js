import "./bootstrap.min.css";
import "./App.css";
import EmotionTable from "./EmotionTable.js";
import React from "react";

class App extends React.Component {
  /*
  We are setting the component as a state named innercomp.
  When this state is accessed, the HTML that is set as the 
  value of the state, will be returned. The initial input mode
  is set to text
  */
  state = {
    innercomp: <textarea rows="4" cols="50" id="textinput" />,
    mode: "text",
    sentimentOutput: [],
    sentiment: true,
    color: "",
    text: ""
  };

  /*
  This method returns the component based on what the input mode is.
  If the requested input mode is "text" it returns a textbox with 4 rows.
  If the requested input mode is "url" it returns a textbox with 1 row.
  */

  renderOutput = (input_mode) => {
    let rows = 1;
    let mode = "url";
    //If the input mode is text make it 4 lines
    if (input_mode === "text") {
      mode = "text";
      rows = 4;
    }
    document.getElementById("textinput").value = "";
    
    this.setState({
      innercomp: <textarea rows={rows} cols="50" id="textinput" />,
      mode: mode,
      sentimentOutput: [],
      sentiment: true,
      text: ""
      
    });
  };

  sendForSentimentAnalysis = () => {
    if (document.getElementById("textinput").value == "") {
      alert("Please enter the sentence");
      return;
    }
    this.setState({text: document.getElementById("textinput").value });
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
              {data.includes("not enough") ? "Please enter more text to analyse" : data}
            </div>
          );
          this.setState({ sentimentOutput: output });
          document.getElementById("textinput").value = "";
        })
        .catch((err) => {
          alert("Please enter more words to analyse!!");
          // return;
        });
    });
  };

  sendForEmotionAnalysis = () => {
    let text = document.getElementById("textinput").value;
    if (text == "") {
      alert("Please enter the sentence");
      return;
    }
    this.setState({text:  <h2>{text}</h2>});
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
    try{
      fetch(url)
      .then((response) => {
        
        response.json().then((data) => {
          console.log("response ", data);
          if(data.err){
            this.setState({text : <h1>Please enter more text to analyse</h1>});
            return;
          }
          this.setState({ sentimentOutput: <EmotionTable emotions={data} /> });
          document.getElementById("textinput").value = "";
        });
      })
     
    
    }catch(err){
      console.log(err);
      alert("Please enter more words to analyse!!");
    }
    
  };

  render() {
    return (
      <div className="App">
        <button
          className="btn btn-info"
          onClick={() => {
            this.renderOutput("text");
          }}
        >
          Text
        </button>
        <button
          className="btn btn-dark"
          onClick={() => {
            this.renderOutput("url");
          }}
        >
          URL
        </button>
        <br />
        <br />
        {this.state.innercomp}
        <br />
        <button className="btn-primary" onClick={this.sendForSentimentAnalysis}>
          Analyze Sentiment
        </button>
        <button className="btn-primary" onClick={this.sendForEmotionAnalysis}>
          Analyze Emotion
        </button>
        <br />
        {this.state.text}
        {this.state.sentimentOutput}
      </div>
    );
  }
}

export default App;
