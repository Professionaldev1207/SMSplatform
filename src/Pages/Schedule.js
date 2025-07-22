import styled from "styled-components";
import React from "react";
import ScheduleCalendar from "../Components/Schedule/Big_calendar";

const RightSide = styled.div`
  display: flex;
  background-color: #ffffff;
  height: 931px;
  width: 100%;
`;

const Schedule = () => {
  return (
    <main>
      <RightSide>
        <ScheduleCalendar />
      </RightSide>
    </main>
  );
};

export default Schedule;
