import styled from "styled-components";
import React, { useEffect, useState } from "react";
import CallLog from "../Components/Calls/Calls_head";
import TableComponentCallLog from "../Components/Calls/Call_log";
import axios from "axios";
import Refresh from "../Assects/refresh.png";

const breakpoints = {
  mobileS: "320px",
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px",
  laptop: "1440px"
};

const RightSide = styled.div`
  display: flex;
  background-color: #ffffff;
  height: 931px;
  width: 100%;

  @media (max-width: ${breakpoints.tablet}) {
    display: block;
  }
`;

const RefreshIcon = styled.button`
  background-image: url(${Refresh}); /* Path to your image */
  background-repeat: no-repeat;
  background-size: 40px; /* Set the size of the image */
  width: 40px;
  height: 40px;
  margin-left: 3%;
  margin-top: 5%;
  position: absolute;

  @media (max-width: ${breakpoints.laptop}) {
    margin-left: 3%;
    margin-top: 7%;
  }

  @media (max-width: ${breakpoints.desktop}) {
    margin-left: 3%;
    margin-top: 10%;
    position: absolute;
  }

  @media (max-width: ${breakpoints.tablet}) {
    margin: 10px 0;
    margin-left: 5%;
    width: 100%;
    position: relative;
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin-left: 10%;
  }

  @media (max-width: ${breakpoints.mobileS}) {
  }
`;

const Calls = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Send a GET request to the backend when the site loads
        const response = await axios.get(
          process.env.REACT_APP_API + "/api/call/logs/refresh"
        );
        setData(response.data); // Update the state with the returned data
        alert("success");
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures it runs only once on mount

  const refreshData = async str => {
    try {
      // Send a GET request to the backend when the site loads
      const response = await axios.get(
        process.env.REACT_APP_API + "/api/call/logs/refresh"
      );
      setData(response.data); // Update the state with the returned data
      alert("success");
    } catch (error) {
    } finally {
    }
  };

  return (
    <main>
      <RightSide>
        <CallLog />
        <RefreshIcon onClick={() => refreshData("refresh")} />
        <TableComponentCallLog data={data} />
      </RightSide>
    </main>
  );
};

export default Calls;
