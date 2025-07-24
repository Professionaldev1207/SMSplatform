import React from "react";
import styled from "styled-components";
import axios from "axios";

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
  z-index: 5;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

const StyleButton = styled.button`
  margin-top: 10px;
  width: 48%;
  height: 40px;
  margin: 1%;
  margin-top: 5%;
  border: 1px solid rgb(111, 0, 163);
  border-radius: 10px;

  &:hover {
    background-color: rgb(220, 198, 247);
  }
`;

// React Component
const RemoveModelOpen = ({ data, isOpen, close, returnRemove }) => {
  if (!isOpen) return null;

  const group = String(data[0].group);
  const msg = String(data[0].message);
  const time = String(data[0].time);
  const settedTime = new Date(time);
  const timeStr = String(
    settedTime.getFullYear() +
      "/" +
      (settedTime.getMonth() + 1) +
      "/" +
      settedTime.getDate() +
      " T " +
      settedTime.getHours() +
      ":" +
      settedTime.getMinutes()
  );

  const convertDate = dateString => {
    const date = new Date(dateString);

    // Extract year, month, day, hours, and minutes
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    // Combine into the desired format
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const onRemoveClick = async () => {
    try {
      // Send a GET request to the backend when the site loads
      const response = await axios.post(
        process.env.REACT_APP_API + "/api/schedule/remove",
        {
          group: group,
          message: msg,
          time: convertDate(time)
        }
      );
    } catch (error) {
    } finally {
    }
    returnRemove();
  };

  return (
    <ModalOverlay onClick={close}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Label htmlFor="title">Schedule Information</Label>
        <div style={{ width: "300px" }}>
          <Label htmlFor="Group">
            Group => {group}
          </Label>
          <Label htmlFor="Msg">
            Message => {msg}
          </Label>
          <Label htmlFor="Time">
            Time => {timeStr}
          </Label>
        </div>
        <div style={{ display: "inline", width: "85%" }}>
          <StyleButton onClick={onRemoveClick}>Del Campaign</StyleButton>
          <StyleButton onClick={close}>OK</StyleButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default RemoveModelOpen;
