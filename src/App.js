import styled from "styled-components";
import Menu from "./Components/Menu";
import "./App.css";
import React, { useState } from "react";
import Management from "./Pages/Management_contacts";
import SMS from "./Pages/Sms";
import Calls from "./Pages/Calls";
import Schedule from "./Pages/Schedule";
import Setting from "./Pages/Setting";
import Campaignstatus from "./Pages/Campaign";

const breakpoints = {
  mobileS: "320px",
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px"
};

const Container = styled.div`width: 100%;`;

const LeftSide = styled.div`
  background-color: #6f00a3;
  float: left;
  height: 100vh;
  width: 15%;
  position: fixed;

  @media (max-width: ${breakpoints.tablet}) {
    width: 10%;
  }

  @media (max-width: ${breakpoints.mobile}) {
  }
`;

const RightSide = styled.div`
  background-color: #ffffff;
  float: right;
  max-height: 100vh;
  overflow: auto;
  width: 85%;

  @media (max-width: ${breakpoints.tablet}) {
    width: 90%;
  }
`;

function App() {
  // State to track the active menu item (1 for Manage Contacts, 2 for SMS, etc.)
  const [activeIndex, setActiveIndex] = useState(1); // Default is Management

  // Function to handle menu item click
  const handleMenuClick = id => {
    setActiveIndex(id);
  };

  // Render the component based on the activeIndex
  const renderActiveComponent = () => {
    switch (activeIndex) {
      case 1:
        return <Management />;
      case 2:
        return <SMS />;
      case 3:
        return <Calls />;
      case 4:
        return <Schedule />;
      case 5:
        return <Campaignstatus />;
      case 6:
        return <Setting />;
    }
  };

  return (
    <Container>
      <LeftSide>
        <Menu activeIndex={activeIndex} onMenuClick={handleMenuClick} />
      </LeftSide>

      <RightSide>
        {renderActiveComponent()}
      </RightSide>
    </Container>
  );
}

export default App;
