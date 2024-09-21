require("dotenv").config(); //always in first line
const express = require("express");
const cors = require("cors");
const { db } = require("./Db/db");
const blogRoute = require("./Routes/blog-route")
db()

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/", blogRoute);

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
})
