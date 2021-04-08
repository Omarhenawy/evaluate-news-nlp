const dotenv = require("dotenv"); //for the env file for the api key
dotenv.config();

var path = require("path");
const express = require("express");
const app = express();
const mockAPIResponse = require("./mockAPI.js");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("dist"));

console.log(__dirname);
//API CONFIGURATION
const baseURL = "https://api.meaningcloud.com/sentiment-2.1?";
const apiKey = process.env.API_KEY;
let input = [];
app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  //res.sendFile(path.resolve("src/client/views/index.html"));
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

app.post("/article", async function (req, res) {
  input = req.body.url;
  console.log(`You entered: ${userInput}`);
  const apiURL = `${baseURL}key=${apiKey}&url=${userInput}&lang=en`;

  const response = await fetch(apiURL);
  const data = await response.json();
  console.log(data);
  res.send(data);
});
// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});
