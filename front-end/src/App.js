// App.js
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [compatibleAccelerators, setCompatibleAccelerators] = useState([]);

  const handleFileUpload = async (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        "http://localhost:8000/file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Origin": "GET,HEAD,OPTIONS,POST,PUT",
            "Access-Control-Allow-Origin":
              "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        }
      );

      console.log("the response is: ", response.data.compatibleAccelerators);
      console.log("the layers are: ", response.data.layers);
      setCompatibleAccelerators(response.data.compatibleAccelerators);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div className="header">
        {/* <img className="logo" src="/path/to/your/logo.png" alt="Logo" /> Remove this line */}
        <h1>Consult-AI</h1>
      </div>
      <div className="upload-section">
        <h2>Upload your custom ML model</h2>
        <label htmlFor="file-upload" className="upload-button">
          Choose File
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
      </div>
      <div className="accelerator-boxes">
        {compatibleAccelerators.includes(1) && (
          <a href="https://buy.stripe.com/7sI3fg5MC1ka1sAaEE">
            <div className="accelerator">
              <img src="/images/HAILO-8/img_1.png" alt="HAILO AI" />
              <p>HAILO AI Board</p>
            </div>
          </a>
        )}
        {compatibleAccelerators.includes(2) && (
          <a href="https://buy.stripe.com/7sI3fg5MC1ka1sAaEE">
            <div className="accelerator">
              <img src="/images/CORAL-MICRO/img_2.jpg" alt="Coral Board" />
              <p>Coral Board</p>
            </div>
          </a>
        )}
        {compatibleAccelerators.includes(3) && (
          <a href="https://buy.stripe.com/7sI3fg5MC1ka1sAaEE">
            <div className="accelerator">
              <img
                src="/images/CORAL-MICRO/img_3.jpg"
                alt="Hardware Accelerator 3"
              />
              <p>Hardware Accelerator 3</p>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}

export default App;
