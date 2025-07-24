import React, { useState } from "react";
import styled from "styled-components";

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

const UploadButton = styled.button`
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

const AddPhoneNodel = ({ isOpen, close, closeAddModel }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputName, setInputName] = useState("");

  if (!isOpen) return null;

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleInputNameChange = event => {
    setInputName(event.target.value);
  };

  const handleUpload = async () => {
    if (inputValue === "") {
      alert("Input 10DLC");
      return;
    }

    if (inputName === "") {
      alert("Input Name");
      return;
    }

    const formData = new FormData();
    formData.append("name", inputName);
    formData.append("phone", inputValue);

    try {
      const response = await fetch(
        process.env.REACT_APP_API + "/api/myphone/add",
        {
          method: "POST",
          body: formData
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert(`10DLC add successfully!`);
        closeAddModel();
      } else {
        alert(`Error: ${data.message}`);
        console.error("Full error response:", data);
      }
    } catch (error) {
      alert(`Add failed: ${error.message}`);
    }
  };

  return (
    <ModalOverlay onClick={close}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Label>Input 10DLC</Label>
        <InputForm
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Input 10DLC..."
        />
        <InputForm
          value={inputName}
          onChange={handleInputNameChange}
          placeholder="Input Name..."
        />
        <UploadButton
          onClick={handleUpload}
          style={{
            marginTop: "10px",
            width: "80%",
            height: "35px",
            border: "1px solid rgb(111, 0, 163)",
            borderRadius: "10px"
          }}
        >
          Add
        </UploadButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddPhoneNodel;
