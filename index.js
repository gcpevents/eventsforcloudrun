const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.get("/", (req, res) => {
  res.send("Congratulations! Your application on Cloud Run is now LIVE and ready to receive events.");
});

app.post("/", (req, res) => {
  console.log("Event received!");

  console.log("ce-id:", req.headers["ce-id"]);
  console.log("ce-source:", req.headers["ce-source"]);
  console.log("ce-specversion:", req.headers["ce-specversion"]);
  console.log("ce-type:", req.headers["ce-type"]);

  if (req.headers["ce-dataschema"]) {
    console.log("ce-dataschema:", req.headers["ce-dataschema"]);
  }
  if (req.headers["ce-subject"]) {
    console.log("ce-subject:", req.headers["ce-subject"]);
  }
  if (req.headers["ce-time"]) {
    console.log("ce-time:", req.headers["ce-time"]);
  }

  console.log("content-type:", req.headers["content-type"]);
  console.log("BODY:");
  console.log(JSON.stringify(req.body));

  res.send("OK");
});

app.listen(port, () => {
  console.log("App listening on port", port);
});
