// sendForSentimentAnalysis = () => {
//     this.setState({ showMessage: true });
//     let text = document.getElementById("textinput").value;
//     // let target = document.getElementById("target").value;
//     if (text == "") {
//       alert("Please enter the sentence");
//       this.setState({ showMessage: false });
//       return;
//     }
//     if (this.state.mode == "url" && !text.includes("http")) {
//       alert("Please type url or change the input type !!");
//       this.setState({ showMessage: false });
//       return;
//     }
//     this.setState({ text: <h2>{text}</h2> });
//     this.setState({ sentiment: true });
//     let url = ".";
//     let mode = this.state.mode;
//     url =
//       url +
//       "/" +
//       mode +
//       "/sentiment?" +
//       mode +
//       "=" +
//       document.getElementById("textinput").value;

//     fetch(
//       url
//       //   {method: "POST",
//       // headers: {
//       //   'Content-Type': 'application/json;charset=utf-8'
//       // },
//       // body: JSON.stringify({target: target})}
//     ).then((response) => {
//       response
//         .json()
//         .then((res) => {
//           console.log("data ", res);
//           this.setState({ report: res });
//           let data = res.sentiment.document.label;
//           // res.send(analysisResults.result.sentiment.document.label);
//           // this.setState({sentimentOutput:data});
//           let output = data;
//           if (data == "positive") {
//             this.setState({ color: "green" });
//           } else if (data == "negative") {
//             this.setState({ color: "red" });
//           } else {
//             this.setState({ color: "yellow" });
//           }

//           output = (
//             <div
//               style={{
//                 color: `${this.state.color}`,
//                 fontSize: 40,
//                 marginTop: "1rem",
//                 backgroundColor: "wheat",
//               }}
//             >
//               {data}
//             </div>
//           );
//           this.setState({ showMessage: false });
//           this.setState({ sentimentOutput: output });
//           // document.getElementById("textinput").value = "";
//         })
//         .catch((err) => {
//           alert(err);
//           return;
//         });
//     });
//   };