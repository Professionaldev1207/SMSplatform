import styled from "styled-components";
import React, { useEffect, useState } from "react";
import Line from "../Components/Campaign/Line";
import Campaign from "../Components/Campaign/Campaign";
import axios from "axios";
import Msgtemplate from "../Components/Campaign/Msg_template";

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

const Campaignstatus = () => {
  const [data, setData] = useState([]);
  const [events, setEvents] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Send a GET request to the backend when the site loads
        const response = await axios.get(
          process.env.REACT_APP_API + "/message/template/get"
        );
        setData(response.data); // Update the state with the returned data
      } catch (error) {
        alert("Error fetching data:", error.message);
      } finally {
      }
    };

    const fetchScheduleData = async () => {
      try {
        // Send a GET request to the backend when the site loads
        const response = await axios.post(
          process.env.REACT_APP_API + "/api/schedule/get"
        );
        const newEvents = response.data.map(event => {
          return {
            title: event.title,
            message: event.msg,
            start: new Date(event.time),
            status: event.status
          };
        });
        setEvents(newEvents);
      } catch (error) {
        alert("error");
      } finally {
      }
    };

    fetchData();
    fetchScheduleData();
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <main>
      <RightSide>
        <Line />
        <Campaign data={events} />
        <Msgtemplate data={data} />
      </RightSide>
    </main>
  );
};

export default Campaignstatus;
