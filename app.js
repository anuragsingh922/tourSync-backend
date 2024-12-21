const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const multer = require('multer');
const cookieParser = require('cookie-parser');
const { connectToDatabase } = require("./databaseConnection/db");
const path = require("path");

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000" , "https://tour-sync-frontend.vercel.app"],
  credentials: true,
  exposedHeaders: ["Set-Cookie"]
}));

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = 8081;
connectToDatabase();


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// app.use('/uploads' , express.static(path.join(__dirname, 'uploads')));

const v1_routes = require("./routes/v1/v1_routes");

app.use("/api/v1", v1_routes);

app.listen(PORT, () => {
  console.log(`QuestionTrend Listining on http://localhost:${PORT}`);
});
