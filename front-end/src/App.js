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
      <h2>Upload a .pb file</h2>
      <input type="file" onChange={handleFileUpload} />
      <div className="accelerator-boxes">
        {compatibleAccelerators.includes(1) && (
          <div className="accelerator">
            <img
              src="/images/CORAL-MICRO/img_1.jpg"
              alt="Hardware Accelerator 1"
            />
            <p>Hardware Accelerator 1</p>
          </div>
        )}
        {compatibleAccelerators.includes(2) && (
          <div className="accelerator">
            <img
              src="/images/CORAL-MICRO/img_2.jpg"
              alt="Hardware Accelerator 2"
            />
            <p>Hardware Accelerator 2</p>
          </div>
        )}
        {compatibleAccelerators.includes(3) && (
          <div className="accelerator">
            <img
              src="/images/CORAL-MICRO/img_3.jpg"
              alt="Hardware Accelerator 3"
            />
            <p>Hardware Accelerator 3</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
