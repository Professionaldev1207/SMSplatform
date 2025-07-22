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
  width: 600px;
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

const Label = styled.label`
  display: block;
  margin-bottom: 0px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  width: 100%;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const UploadButton = styled.button`
  &:hover {
    background-color: rgb(220, 198, 247);
  }
`;

const AddAccountInform = ({ data, isOpen, close, closeAddModel }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputName, setInputName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  if (!isOpen) return null;

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleInputNameChange = event => {
    setInputName(event.target.value);
  };

  const handleSelectChange = e => {
    setSelectedOption(e.target.value);
  };

  const handleUpload = async () => {
    if (inputValue === "") {
      alert("Input SID");
      return;
    }

    if (inputName === "") {
      alert("Input Token");
      return;
    }

    if (selectedOption === "" || selectedOption === "default") {
      alert("Select Group Name.");
      return;
    }

    const formData = new FormData();
    formData.append("token", inputName);
    formData.append("sid", inputValue);
    formData.append("phone", selectedOption);

    try {
      const response = await fetch(
        process.env.REACT_APP_API + "/api/account/inform/add",
        {
          method: "POST",
          body: formData
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert(`Account information modified successfully!`);
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
        <Label>Input Account Information</Label>
        <h2>You must management sensitive information safely</h2>
        <InputForm
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Input Account SID..."
        />
        <InputForm
          value={inputName}
          onChange={handleInputNameChange}
          placeholder="Input Autho Token..."
        />
        <div style={{ width: "80%" }}>
          <Label htmlFor="comboBox">Choose Your Active Phone Number</Label>
          <Select
            id="comboBox"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="default">-- Select --</option>
            {data.map(row =>
              <option value={row.name} key={row.id}>
                {row.phone}
              </option>
            )}
          </Select>
        </div>
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

export default AddAccountInform;
