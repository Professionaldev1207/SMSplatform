import React, { useState } from "react";
import styled from "styled-components";
import UploadBtn from "../../Assects/upload.png";

// Styled components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UploadButton = styled.button`
  background-image: url(${UploadBtn}); /* Path to your image */
  background-repeat: no-repeat;
  background-size: 25px 25px; /* Set the size of the image */
  background-repeat: no-repeat;
  width: 25px;
  height: 25px;
`;

const InputForm = styled.input`
  border: 1px solid rgba(111, 0, 163, 0.5);
  border-radius: 10px;
  height: 35px;
  padding-left: 10px; /* Adds 10px of space at the start of the input */
  margin: 15px 0;
  width: 80%;

  &:hover {
    background-color: rgb(220, 198, 247);
  }
`;

const CloseButton = styled.button`
  &:hover {
    background-color: rgb(220, 198, 247);
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

const Modal = ({ isOpen, close, closeAddModel }) => {
  const [file, setFile] = useState(null);
  const [inputValue, setInputValue] = useState("");

  if (!isOpen) return null;

  const handleFileChange = event => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.name.endsWith(".csv")) {
      setFile(selectedFile);
    } else {
      alert("Please select a valid .csv file.");
    }
  };

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("No valid file selected.");
      return;
    }

    if (inputValue === "") {
      alert("Input Group Name!.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("stringData", inputValue);

    try {
      const response = await fetch(process.env.REACT_APP_API + "/csv/upload", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        alert(`File uploaded successfully!`);
        closeAddModel();
      } else {
        alert(`Error: ${data.message}`);
        console.error("Full error response:", data);
      }
    } catch (error) {
      alert(`Upload failed: ${error.message}`);
    }
  };

  return (
    <ModalOverlay onClick={close}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Label>Upload CSV</Label>
        <Label>Input Group Name</Label>
        <InputForm
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Input Group Name..."
        />
        <input
          style={{ width: "80%" }}
          type="file"
          onChange={handleFileChange}
        />
        <UploadButton onClick={handleUpload} style={{ marginTop: "10px" }} />
        <CloseButton
          onClick={close}
          style={{
            marginTop: "10px",
            width: "80%",
            height: "35px",
            border: "1px solid rgb(111, 0, 163)",
            borderRadius: "10px"
          }}
        >
          Close
        </CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
