require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ConnectDb = require("./src/DB/CennectoDbInsatnce.js");
const ConvRoute = require("./src/Routes/Router.js");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
// "https://ai-app-flow.netlify.app",

app.use(express.json());
app.use("/", ConvRoute);

ConnectDb()
  .then(() => {
    app.get('/',(req,res)=>{
      res.send("hello bro")
    })
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
