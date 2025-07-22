import React from "react";
import styled from "styled-components";

const Tab = styled.div`
  height: auto;
  width: 55%;
  position: absolute;
  display: flex;
  flex-direction: column; /* Ensures items stack vertically */
  gap: 10px; /* Optional: Adds spacing between rows */
`;

const ButtonParent = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${props => (props.index === 1 ? "flex-start" : "flex-end")};
`;

const Button = styled.button`
  display: block;
  color: #000;
  padding: 10px 15px;
  max-width: 45%;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.3s;
  background-color: rgba(0, 255, 85, 0.1); /* Default background color */
  border-radius: 10px;
  margin-top: 2px;
  margin-left: 5%;
  margin-right: 0%;

  background-color: ${props =>
    props.index === 1 ? "rgba(0, 255, 85, 0.1)" : "rgba(0, 187, 255, 0.1)"};
`;

const ButtonText = styled.span`
  display: block;
  font-size: 14px;
  text-align: left;
`;

const ChatLog = ({ chatData }) => {
  return (
    <Tab>
      {chatData.map((item, index) =>
        <ButtonParent index={item.index}>
          <Button key={index} length={item.message.length} index={item.index}>
            <ButtonText>
              {item.message}
            </ButtonText>
          </Button>
        </ButtonParent>
      )}
    </Tab>
  );
};

export default ChatLog;
