const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const multer = require('multer');
const cookieParser = require('cookie-parser');
const { connectToDatabase } = require("./databaseConnection/db");

const { database_uri } = require("./config");

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"], // Array of allowed origins
  credentials: true, // Correctly spelled 'credentials'
}));

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = 8081;
connectToDatabase();


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const v1_routes = require("./routes/v1/v1_routes");

app.use("/api/v1", v1_routes);

app.listen(PORT, () => {
  console.log(`QuestionTrend Listining on http://localhost:${PORT}`);
});
