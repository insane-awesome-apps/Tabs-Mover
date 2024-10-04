const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const https = require("https");
const fs = require("fs");
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.crt"),
};



let links = [];

app.get("/links", (req, res) => {
  res.status(200).json(links);
});

app.post("/links", (req, res) => {
  const {url} = req.body;
  console.log(url);
  links.push(url);
  res.json({ message: "Link received", data: req.body });
});

app.get("/clear", (req, res) => {
    links = [];
    console.log(links);
})

https.createServer(options, app).listen(port, () => {
  console.log("Server running on https://192.168.1.71:3000");
});