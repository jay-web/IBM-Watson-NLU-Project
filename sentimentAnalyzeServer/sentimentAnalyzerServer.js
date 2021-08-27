const express = require("express");

const app = new express();

app.use(express.json());   
app.use(express.urlencoded({ extended: true }));
/*This tells the server to use the client 
folder for all static resources*/
app.use(express.static("client"));

/*This tells the server to allow cross origin references*/
const cors_app = require("cors");
app.use(cors_app());

/*Uncomment the following lines to loan the environment 
variables that you set up in the .env file*/

const dotenv = require("dotenv");
dotenv.config();

const api_key = process.env.API_KEY;
const api_url = process.env.API_URL;

function getNLUInstance() {
  /*Type the code to create the NLU instance and return it.
    You can refer to the image in the instructions document
    to do the same.*/
  const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
  const { IamAuthenticator } = require("ibm-watson/auth");

  const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: "2021-08-01",
    authenticator: new IamAuthenticator({
      apikey: `${api_key}`,
    }),
    serviceUrl: `${api_url}`,
  });

  // console.log("nlu ", naturalLanguageUnderstanding);

  return naturalLanguageUnderstanding;
}

let analyze = (req, res) => {
  let urlToAnalyze = req.query.url;
  let textToAnalyze = req.query.text;
  // let target = req.body.target ? req.body.target.split(" ") : []
  // console.log("text to analyze ", target);
  const analyzeParams = {
    url: urlToAnalyze,
    text: textToAnalyze,
    features: {
      sentiment: {
        document: true,
      },
      keywords: {
        emotion: true,
        sentiment: true,
      },
      entities:{
        emotion: true,
        sentiment: true,
      }
      // sentiment:{
      //   targets: target.length ? target : []
      // }
    },
  };

  const naturalLanguageUnderstanding = getNLUInstance();

  naturalLanguageUnderstanding
    .analyze(analyzeParams)
    .then((analysisResults) => {
    
      return res.send(analysisResults.result, null, 2);
    })
    .catch((err) => {
    
      return res.send({ err: err });
    });
};

//The default endpoint for the webserver
app.get("/", (req, res) => {
  res.render("index.html");
});

//The endpoint for the webserver ending with /url/emotion
app.get("/url/emotion", (req, res) => {
  // //Extract the url passed from the client through the request object
  
  analyze(req, res, "emotion", "url");
});


//The endpoint for the webserver ending with /text/emotion
app.get("/text/emotion", (req, res) => {
  // analyze(req, res);
  
  analyze(req, res, "emotion", "text");
});



let server = app.listen(8080, () => {
  console.log("Listening", server.address().port);
});
