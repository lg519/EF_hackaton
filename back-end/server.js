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

    let imageToShow;
    if (fileSize < 100) {
      imageToShow = 1;
    } else if (fileSize < 200) {
      imageToShow = 2;
    } else if (fileSize < 300) {
      imageToShow = 3;
    } else {
      imageToShow = null;
    }

    res.json({ size: fileSize, imageToShow });
  } catch (err) {
    res.sendStatus(500);
  }
});

app.listen(8000, () => console.log("Server started on port 8000"));
