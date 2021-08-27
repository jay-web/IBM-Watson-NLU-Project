import "./bootstrap.min.css";
import "./App.css";
import EmotionTable from "./EmotionTable.js";
import React from "react";
import Buttons from "./components/buttons";
import Report from "./components/report";
import Doc from "./components/doc";
import { Doughnut } from "react-chartjs-2";
import renderGraphData from "./utilis/graphData";
import EntitiesData from "./components/entities";
import Graph from "./components/graph";
import Heading from "./components/heading";

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
    
    message: "Please wait ...",
    showMessage: false,
    report: null,
    showGraph: false,
    emotions: [],
    entities: [],
    showEntities: false,
    buttonDisabled:true,
    options: {
      plugins: {
        legend: {
          position: 'right',
          // maxHeight: "200px"
          fullSize: true,
          labels:{
            boxHeight: 100,
            boxWidth: 100,
            font:{
              size:30
            }
          },
         
        },
        tooltip:{
          enabled:false
        }
      
      }
    }
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
      sentimentOutput:  <Doc />,
      sentiment: true,
      text: "",
      showGraph: false,
      showEntities:false,
      report:null
    });
    document.getElementById("textinput").value = "";
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

     fetch(url).then((response) => {
        response.json().then((res) => {
          console.log("response ", res);
          if(res.err && res.err.status === 400){
            alert(res.err.message);
            return;
          }

         
            console.log("response ", res);
            this.setState({ report: res, entities: res.entities });
            
            let data = res.keywords[0].emotion;
            // res.send(analysisResults.result.keywords[0].emotion, null, 2);
            if (data.err) {
              this.setState({ text: <h1>Please enter more text to analyse</h1> });
              return;
            }
            this.setState({ showMessage: false });
            let emotionData = Object.keys(data).map((e, i) => {
              return data[e];
            });
            this.setState({ emotions: emotionData, showGraph: true, buttonDisabled:false });
          

         
         

          // this.setState({ sentimentOutput: <EmotionTable emotions={data} /> });
          // document.getElementById("textinput").value = "";
        });
      });
    
  };

  

  

  render() {
    return (
      <div className="App">
        <div className="container-fluid main">
          {/* // input-section */}
         <Heading 
         renderOutput={this.renderOutput} 
         showTextBox={this.state.showTextBox}
         sendForEmotionAnalysis={this.sendForEmotionAnalysis}

         />

          {/* output section */}
          <div className="row output-section">
            <div className="col-3" id="report-section">
              <div>
                <h5>Analysis Report</h5>
                <Report result={this.state.report} />
              </div>
            </div>
           
            <div className="col-9" id="result-section">
              <div className="row result-heading">
                <div className="col-6 heading-content ">
                
                  <Buttons
                    type="primary"
                    text="Doughnut Format"
                    category=""
                    renderOutput={() => this.setState({ showGraph: true,showEntities: false })}
                    size="sm"
                    disabled={this.state.buttonDisabled}
                  />
                    <Buttons
                    type="secondary"
                    text="Entities Data"
                    category=""
                    renderOutput={() => this.setState({ showEntities: true, showGraph: false })}
                    size="sm"
                    disabled={this.state.buttonDisabled}
                  />
                </div>
                <div className="col-6 heading-content ">
                  <h5>Analysis Result</h5>
                  <h6>{this.state.report ? this.state.showGraph ? "( In Doughnut Format )": "( Entities Data Collection )" : null}</h6>
                </div>
              </div>
              <div className="row result-display">
                <div className="col-12">
                {this.state.showGraph ? 
                 <Graph data={renderGraphData(this.state.emotions)} options={this.state.options}/>
                  : this.state.showEntities 
                  ? <EntitiesData entities={this.state.entities} /> 
                  :
                  this.state.sentimentOutput

  }
                <br />
                {this.state.showMessage ? this.state.message : null}
                </div>
                
              </div>
            </div>
            {/* <div className="col-4"></div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
