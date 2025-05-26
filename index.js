require("express-async-errors");
require("winston");
const express = require("express");
const Joi = require("joi");
JoiObjectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const cors = require("./middleware/cors");

const config = require("config");
const auth = require("./routes/auth");
const users = require("./routes/users");
const languages = require("./routes/languages");
const words = require("./routes/words");
const translations = require("./routes/translations");

const error = require("./middleware/error");

const app = express();

if (!config.get("jwtPrivateKey")) {
   console.error("FATAL ERROR: jwtPrivateKey is not defined.");
   process.exit(1);
}

const db = config.get("db");

mongoose
   .connect(db)
   .then(() => console.log("Connected to MongoDB..."))
   .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use(cors);

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/languages", languages);
app.use("/api/words", words);
app.use("/api/translations", translations);

//catch will execute this err function
//because there is an next if there is error
app.use(error);

app.listen(3000, () => console.log("Listening on port 3000"));
