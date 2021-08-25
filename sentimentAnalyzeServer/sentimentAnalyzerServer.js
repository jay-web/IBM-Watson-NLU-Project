const express = require("express");

const app = new express();

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

  console.log("nlu ", naturalLanguageUnderstanding);

  return naturalLanguageUnderstanding;
}

let analyze = (req, res, category, type) => {
  let urlToAnalyze = req.query.url;
  let textToAnalyze = req.query.text;
  console.log("request ", req.query.text);
  console.log("url", req.query.url);
  const analyzeParams = {
    url: urlToAnalyze,
    text: textToAnalyze,
    features: {
      sentiment: {
        targets: ["positive", "negative"],
      },
      keywords: {
        emotion: true,
        // limit: 1,
      },
    },
  };

  const naturalLanguageUnderstanding = getNLUInstance();

  naturalLanguageUnderstanding
    .analyze(analyzeParams)
    .then((analysisResults) => {
      //Print the JSON returned by NLU instance as a formatted string
      //   console.log(
      //     JSON.stringify(analysisResults.result.keywords[0].emotion, null, 2)
      //   );
      //   console.log("REsponse ", analysisResults.result.sentiment.targets[0].label);
      //Please refer to the image to see the order of retrieval
      if (category == "emotion" && type == "text") {
        console.log(analysisResults.result.keywords[0]);
        if (analysisResults.result.keywords) {
          return res.send(analysisResults.result.keywords[0].emotion, null, 2);
        }
      }
      if (category == "sentiment" && type == "text") {
        console.log(analysisResults.result.sentiment);
        if (analysisResults.result.sentiment) {
          return res.send(analysisResults.result.sentiment.targets[0].label);
        }
        return res.send("neutral");
      }

      if (category == "emotion" && type == "url") {
        if (analysisResults.result.keywords) {
          return res.send(analysisResults.result.keywords[0].emotion, null, 2);
        }
      }

      if (category == "sentiment" && type == "url") {
        if (analysisResults.result.sentiment) {
          return res.send(analysisResults.result.sentiment.targets[0].label);
        }
        return res.send("neutral");
      }
    })
    .catch((err) => {
      
      return res.status(304).send({err: err});
    });
};

//The default endpoint for the webserver
app.get("/", (req, res) => {
  res.render("index.html");
});

//The endpoint for the webserver ending with /url/emotion
app.get("/url/emotion", (req, res) => {
  // //Extract the url passed from the client through the request object
  console.log("req ", req);
  analyze(req, res, "emotion", "url");
});

//The endpoint for the webserver ending with /url/sentiment
app.get("/url/sentiment", (req, res) => {
  analyze(req, res, "sentiment", "url");
});

//The endpoint for the webserver ending with /text/emotion
app.get("/text/emotion", (req, res) => {
  // analyze(req, res);
  console.log("req ", req);
  analyze(req, res, "emotion", "text");
});

app.get("/text/sentiment", (req, res) => {
  analyze(req, res, "sentiment", "text");
});

let server = app.listen(8080, () => {
  console.log("Listening", server.address().port);
});
