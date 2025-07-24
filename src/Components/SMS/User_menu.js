import React, { useState } from "react";
import styled from "styled-components";

const breakpoints = {
  mobileS: "320px",
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px",
  laptop: "1440px"
};

const Tab = styled.div`
  float: left;
  height: 88vh;
  margin-top: 73px;
  width: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Button = styled.button`
  display: block;
  color: #000;
  padding: 10px 35px;
  width: 100%;
  border: none;
  outline: none;
  text-align: left;
  cursor: pointer;
  transition: 0.3s;
  font-size: 17px;
  font-weight: "Extra-Bold";
  background-color: rgba(111, 0, 163, 0.05); /* Default background color */
  border-radius: 10px;
  margin-top: 2px;

  background-color: ${props =>
    props.isActive ? "rgba(111, 0, 163, 0.2)" : "rgba(111, 0, 163, 0.1)"};
  &:hover {
    background-color: rgba(111, 0, 163, 0.2);
  }
`;

const ButtonText = styled.span`
  display: block;
  font-family: 'Inter', sans-serif; /* Use Inter font */
  font-weight: 800; /* Extra Bold */
  font-size: 16px;
  text-align: center;
`;

const UserMenu = ({ menuItems, rowClick }) => {
  const [activeRow, setActiveRow] = useState(null);

  const handleRowClick = (id, phone) => {
    setActiveRow(id);
    rowClick({ id, phone });
  };

  return (
    <Tab>
      {menuItems.map((item, index) =>
        <Button
          key={item.id}
          isActive={activeRow === item.id}
          onClick={() => handleRowClick(item.id, item.phone)}
        >
          <ButtonText>
            {item.name}
          </ButtonText>
          <ButtonText>
            {item.phone}
          </ButtonText>
        </Button>
      )}
    </Tab>
  );
};

export default UserMenu;
