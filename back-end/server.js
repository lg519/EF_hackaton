// server.js
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/file", upload.single("file"), (req, res) => {
  try {
    const fileSize = fs.statSync(req.file.path).size / 1024;
    fs.unlinkSync(req.file.path); // delete the uploaded file
    res.json({ size: fileSize });
  } catch (err) {
    res.sendStatus(500);
  }
});

app.listen(8000, () => console.log("Server started on port 8000"));
