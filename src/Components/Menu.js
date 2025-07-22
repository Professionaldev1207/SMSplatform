import React from "react";
import styled, { css } from "styled-components";
import {
  FaIdCard,
  FaCommentAlt,
  FaPhoneAlt,
  FaCalendarAlt,
  FaCog,
  FaWaveSquare
} from "react-icons/fa";

const breakpoints = {
  mobileS: "320px",
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px"
};

const Tab = styled.div`
  float: left;
  height: 400px;
  margin-top: 80px;
  width: 100%;
`;

const Button = styled.button`
  display: flex;
  color: #ffffff;
  padding: 10px 35px;
  width: 100%;
  border: none;
  outline: none;
  text-align: left;
  cursor: pointer;
  transition: 0.3s;
  font-size: 17px;
  font-weight: "Extra-Bold";
  background-color: #6f00a3; /* Default background color */

  ${props =>
    props.active &&
    css`
        background-color: #9C4BFE; /* Highlighted background color */
      `} &:hover {
    background-color: #9c4bfe;
  }

  @media (max-width: ${breakpoints.desktop}) {
    padding: 10px 20px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 10px 30px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px 10px;
  }

  @media (max-width: ${breakpoints.mobileS}) {
    padding: 10px 5px;
  }
`;

const IconContainer = styled.span`
  display: flex;
  align-items: center;
  margin-right: 10px;
  font-size: 20px; /* Adjust icon size */
`;

const ButtonText = styled.span`
  font-family: 'Inter', sans-serif; /* Use Inter font */
  font-weight: 800; /* Extra Bold */
  font-size: 16px;

  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }

  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const Menu = ({ activeIndex, onMenuClick }) => {
  const menuItems = [
    { id: 1, icon: <FaIdCard />, label: "Manage Contacts" },
    { id: 2, icon: <FaCommentAlt />, label: "SMS" },
    { id: 3, icon: <FaPhoneAlt />, label: "Call Logs" },
    { id: 4, icon: <FaCalendarAlt />, label: "Schedule" },
    { id: 5, icon: <FaWaveSquare />, label: "Campaign" },
    { id: 6, icon: <FaCog />, label: "Settings" }
  ];

  return (
    <Tab>
      {menuItems.map((item, index) =>
        <Button
          key={item.id}
          active={index + 1 === activeIndex}
          onClick={() => onMenuClick(item.id)}
        >
          <IconContainer>
            {item.icon}
          </IconContainer>
          <ButtonText>
            {item.label}
          </ButtonText>
        </Button>
      )}
    </Tab>
  );
};

export default Menu;
