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

const Select = styled.select`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  width: 300px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const TimeSelect = styled.select`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  width: 45%;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Split = styled.div`
  display: inline;
  margin: 0 5px;
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
const AddCampaignModel = ({
  groupData,
  msgData,
  isOpen,
  close,
  selectOptions
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedTime, setSelectedTime] = useState("10:00");
  const [selectedMsg, setSelectedMsg] = useState("");
  const [selectedHour, setSelectedHour] = useState(9);
  const [selectedMinute, setSelectedMinute] = useState(0);

  if (!isOpen) return null;

  const handleSelectChange = e => {
    setSelectedOption(e.target.value);
  };

  const handleMsgSelectChange = e => {
    setSelectedMsg(e.target.value);
  };

  const handleHourValue = e => {
    setSelectedHour(e.target.value);
  };

  const handleselectedMinute = e => {
    setSelectedMinute(e.target.value);
  };

  const setCampaign = () => {
    if (selectedOption === "" || selectedOption === "default") {
      alert("Select Group Name.");
      return;
    }
    if (selectedMsg === "" || selectedOption === "default") {
      alert("Select SMS");
      return;
    }

    const selectedTime = `${String(selectedHour).padStart(2, "0")}:${String(
      selectedMinute
    ).padStart(2, "0")}`;

    selectOptions({ selectedOption, selectedTime, selectedMsg });
  };

  return (
    <ModalOverlay onClick={close}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Label htmlFor="title">Add Schedule</Label>
        <div>
          <Label htmlFor="comboBox">Choose a Group</Label>
          <Select
            id="comboBox"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="default">-- Select --</option>
            {groupData.map(row =>
              <option value={row.name} key={row.id}>
                {row.name} => ( {row.member} )
              </option>
            )}
          </Select>
        </div>
        <div style={{ width: "98%" }}>
          <Label htmlFor="timeSelect">Set Send SMS Time</Label>
          <TimeSelect value={selectedHour} onChange={handleHourValue}>
            {Array.from({ length: 24 }, (_, index) =>
              <option key={index} value={index}>
                {index}
              </option>
            )}
          </TimeSelect>
          <Split>:</Split>
          <TimeSelect value={selectedMinute} onChange={handleselectedMinute}>
            {Array.from({ length: 60 }, (_, index) =>
              <option key={index} value={index}>
                {index}
              </option>
            )}
          </TimeSelect>
        </div>

        <div style={{ width: "300px" }}>
          <Label htmlFor="SMS">Choose SMS Template.</Label>
          <Select
            id="comboBox"
            value={selectedMsg}
            onChange={handleMsgSelectChange}
          >
            <option value="default">-- Select --</option>
            {msgData.map(row =>
              <option value={row.msg} key={row.id}>
                {row.msg}
              </option>
            )}
          </Select>
        </div>
        <div style={{ display: "inline", width: "85%" }}>
          <StyleButton onClick={setCampaign}>Add Campaign</StyleButton>
          <StyleButton onClick={close}>Cancel</StyleButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddCampaignModel;
