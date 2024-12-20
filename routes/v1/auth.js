const express = require("express");
const router = express();
const multer = require("multer");
const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Destination folder for uploaded files
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename
//   },
// });

// // Initialize multer with the storage configuration
// const upload = multer({ storage });



const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });

const {
  login,
  register,
  verify,
  registerWithImage,
  logout,
} = require("../../controller/authController");

router.get("/verify", verify);
router.post("/login", login);
router.get("/logout", logout);
router.post("/register", register);
// router.post("/register", upload.single("image"), registerWithImage);

module.exports = router;
