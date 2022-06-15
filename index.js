import express, { application } from "express";
import bodyParser from "body-parser";

const Server = () => {
  let users = [
    {
      id: 1,
      name: "erik karaj",
      email: "myemail@there.com",
    },
    {
      id: 2,
      name: "karaj erik",
      email: "hisemail@there.com",
    },
  ];

  const App = express();
  App.use(bodyParser.json());
  App.get("/", (request, response) => {
    // response.send("<script> alert('hello'); </script > ");
    // response.send(response);
  });

  // index method
  App.get("/users", (request, response) => {
    response.json(users);
  });

  // show method
  App.get("/users/:id", (request, response) => {
    const { params } = request;

    const user = users.find(({ id }) => id == params.id);

    if (!user) {
      response.status(404).json({
        message: "user not found",
      });
    }

    response.json(user);
  });

  // create method
  App.post("/users", (request, response) => {
    const { name, email } = request.body;

    if (!name || !email) {
      response.status(400).json({
        message: "user not created",
      });
    }

    const user = {
      id: users.length + 1,
      name,
      email,
    };

    users.push(user);
    response.status(201).json(users);
  });

  // update method
  App.put("/users/:id", (request, response) => {
    const { params } = request;
    const { name, email } = request.body;

    const user = users.find(({ id }) => id == params.id);
    if (!user) {
      response.status(404).json({
        message: "user not found",
      });
    }

    if (!name || !email) {
      response.status(400).json({
        message: "user not created",
      });
    }

    const payload = {
      id: params.id,
      name,
      email,
    };
    let newUsers = users.filter(({ id }) => id != params.id);

    newUsers.push(payload);
    users = newUsers;

    response.json({
      user: payload,
      message: "user has been updated",
    });
  });

  // destroy method
  App.delete("/users/:id", (request, response) => {
    const { params } = request;

    const user = users.find(({ id }) => id == params.id);

    if (!user) {
      response.status(404).json({
        message: "user not found",
      });
    }

    let newUsers = users.filter(({ id }) => id != params.id);
    users = newUsers;
    response.json({
      message: "user has been deleted",
    });
  });

  App.listen(3000, "127.0.0.1", () => {
    console.log("server started");
  });
};

Server();
