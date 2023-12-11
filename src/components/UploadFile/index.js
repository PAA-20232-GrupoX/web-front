import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Button = styled.button`
  background-color: white;
  color: black;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 30px 0px;
  cursor: pointer;

  &:hover {
    background-color: lightgray;
    color: black;
  }

  &:active {
    transform: translateY(2px); /* Example: Slight downward movement on click */
  }
`;

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post("http://127.0.0.1:8000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("File uploaded successfully:", response.data);
      // Handle the response as needed
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleConfirmUpload = () => {
    // Logic to confirm the upload if needed
    // Add your confirmation logic here
  };

  return (
    <div style={{ color: "white", textAlign: "center", padding: "10px"  }}>
      <p style={{ marginBottom: "10px" }}>Insira o arquivo .txt com exemplos para o sistema</p>
      <input type="file" onChange={handleFileChange} />
      <br />
      <Button onClick={handleUpload}>
        Construir grafo
      </Button >
    </div>
  );
};

export default UploadFile;