//start up code from https://medium.com/better-programming/connect-your-express-and-react-applications-using-axios-c35723b6d667 

const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  cors = require("cors");

app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));

app.get("/", (req, res) => {
  res.send({ message: "We did it!" });
});