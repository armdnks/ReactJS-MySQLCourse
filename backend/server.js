require("colors");
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const UserRoutes = require("./routes/user-routes");
app.use("/users", UserRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is listening on port: ${PORT}`.yellow.underline));
