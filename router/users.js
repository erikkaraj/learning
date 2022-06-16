import express from "express";
import {
  destroyUser,
  getUser,
  getUsers,
  storeUser,
  updateUser,
} from "../lib/users.js";
import { dbConnection } from "../lib/database.js";

const usersRouter = express.Router();
dbConnection();

usersRouter.get("/", async (request, response) => {
  await getUsers();

  response.json();
});

// index method
usersRouter.get("/users", async (request, response) => {
  const users = await getUsers();

  if (!users.length) {
    response.status(404).json({
      message: "users not found",
    });
  }

  response.json(users);
});

// show method
usersRouter.get("/users/:id", async (request, response) => {
  const { params } = request;
  const user = await getUser({ id: params.id });

  if (!user.length) {
    response.status(404).json({
      message: "user not found",
    });
  }

  response.json(user);
});

// create method
usersRouter.post("/users", async (request, response) => {
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    response.status(400).json({
      message: "user not created",
    });
  }

  const user = await storeUser({
    name: name,
    email: email,
    password: password,
  });

  response.status(201).json({ message: "User created successfully" });
});

// update method
usersRouter.put("/users/:id", async (request, response) => {
  const { params } = request;
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    response.status(400).json({
      message: "user not created",
    });
  }

  const payload = {
    name: name,
    email: email,
    password: password,
    id: params.id,
  };

  const user = await updateUser(payload);

  response.json({
    user: payload,
    message: "user updated successfully",
  });
});

// destroy method
usersRouter.delete("/users/:id", async (request, response) => {
  const { params } = request;
  const user = await destroyUser({ id: params.id });

  response.json({
    message: "user has been deleted",
  });
});

export default usersRouter;
