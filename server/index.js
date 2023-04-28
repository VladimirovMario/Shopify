const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");

const config = require("./middlewares/cors");

const authController = require("./controllers/authController");
const dataController = require("./controllers/dataController");
const trimBody = require("./middlewares/trimBody");
const session = require("./middlewares/session");
const gameController = require("./controllers/gameController");
const homeController = require("./controllers/homeController");
const commentController = require("./controllers/commentController");

const connectionString = "mongodb://0.0.0.0:27017/shopify";
start();

async function start() {
  try {
    await mongoose.connect(connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.error("Error initializing database");
    console.error(error.message);
    process.exit(1);
  }

  const app = express();

  app.use(bodyParser.json({ limit: "10mb", extended: true }));
  app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

  app.use(express.json());
  
  app.use(cors({origin: config.origin, credentials: true}));
  
  app.use(trimBody());
  app.use(session());

  app.get("/", (req, res) => {
    res.json({ message: "REST service operational" });
  });

  app.use("/api/", homeController);
  app.use("/api/user", authController);
  app.use("/api/game", gameController);
  app.use("/api/catalog", dataController);
  app.use("/api/comments" , commentController);

  const port = 3030;
  app.listen(port, () => 
  console.log(`You can make requests to http://localhost:${port}/api`));
}
