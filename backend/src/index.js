const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const routes = require("./routes");

const app = express();

mongoose.connect(
  //  "mongodb+srv://marcelojs:marcelo123@cluster0-q9gyp.mongodb.net/test?retryWrites=true&w=majority",
  "mongodb://127.0.0.1:27017/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
);

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
