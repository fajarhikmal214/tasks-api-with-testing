require("dotenv").config();

const express = require("express");
const logger = require("./logger");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const TasksRoutes = require("./routes/tasks.router");

app.use("/api/v1/tasks", TasksRoutes);
app.use(logger);

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});
