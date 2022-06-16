import express, { application } from "express";
import bodyParser from "body-parser";
import router from "./router/index.js";

const Server = () => {
  const App = express();

  App.use(bodyParser.json());
  App.use(router);

  App.listen(3000, "127.0.0.1", () => {
    console.log("server started");
  });
};

Server();
