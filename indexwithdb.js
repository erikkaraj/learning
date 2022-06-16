import express, { application } from "express";
import bodyParser from "body-parser";
import router from "./router/index.js";

const Server = () => {
  const App = express();

  App.use(bodyParser.json());

  App.get("/", (req, res) => {
    res.json({
      message: "Erik Roks",
    });
  });
  App.use(router);

  App.listen(3000, () => {
    console.log("server started");
  });
};

Server();
