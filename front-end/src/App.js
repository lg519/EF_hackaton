// App.js
import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Importing the new CSS file

function App() {
  const [size, setSize] = useState(null);
  const [imageToShow, setImageToShow] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post("http://localhost:8000/file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setSize(response.data.size);
    console.log(response.data.imageToShow);
    setImageToShow(response.data.imageToShow);
  };

  return (
    <div className="App">
      <h2>Upload a .tflite file</h2>
      <input type="file" onChange={handleFileUpload} />
      {size && <p>The size of the uploaded .tflite file is: {size} KB</p>}
      <div className="accelerator-boxes">
        {imageToShow === 1 && (
          <div className="accelerator">
            <img
              src="/images/CORAL-MICRO/img_1.jpg"
              alt="Hardware Accelerator 1"
            />
            <p>Hardware Accelerator 1</p>
          </div>
        )}
        {imageToShow === 2 && (
          <div className="accelerator">
            <img
              src="/images/CORAL-MICRO/img_2.jpg"
              alt="Hardware Accelerator 2"
            />
            <p>Hardware Accelerator 2</p>
          </div>
        )}
        {imageToShow === 3 && (
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
