// App.js
// App.js
import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Importing the new CSS file

function App() {
  const [size, setSize] = useState(null);

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
  };

  return (
    <div className="App">
      <h2>Upload a .tflite file</h2>
      <input type="file" onChange={handleFileUpload} />
      {size && <p>The size of the uploaded .tflite file is: {size} KB</p>}
      <div className="accelerator-boxes">
        <div className="accelerator">
          <img
            src="/images/CORAL-MICRO/img_1.jpg"
            alt="Hardware Accelerator 1"
          />
          <p>Hardware Accelerator 1</p>
        </div>
        <div className="accelerator">
          <img
            src="/images/CORAL-MICRO/img_2.jpg"
            alt="Hardware Accelerator 2"
          />
          <p>Hardware Accelerator 2</p>
        </div>
        <div className="accelerator">
          <img
            src="/images/CORAL-MICRO/img_2.jpg"
            alt="Hardware Accelerator 3"
          />
          <p>Hardware Accelerator 3</p>
        </div>
      </div>
    </div>
  );
}

export default App;
