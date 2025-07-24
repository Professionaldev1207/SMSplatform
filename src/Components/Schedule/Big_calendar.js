import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../CSS/custom-calendar-styles.css";
import AddCampaignModel from "./Add_campaign_model";
import RemoveModelOpen from "./Remove_campaign";
import axios from "axios";

const breakpoints = {
  mobileS: "320px",
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px",
  laptop: "1440px"
};

const localizer = momentLocalizer(moment);

const ScheduleCalendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRemvoeModelOpen, setIsRemoveModelOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selectedDate, setSelectToday] = useState(new Date());
  const [events, setEvents] = useState([{}]);
  const [savedEvent, setGetedEvent] = useState([{}]);
  const [msgTemplateData, setMsgTemplateData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Send a GET request to the backend when the site loads
        const response = await axios.get(
          process.env.REACT_APP_API + "/api/management/tableGroup"
        );
        setData(response.data); // Update the state with the returned data
      } catch (error) {
        console.error("Error fetching data:", error);
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
          const startTime = new Date(event.time);
          const endTime = new Date(startTime.getTime() + 60 * 1000);
          return {
            title: event.title,
            message: event.msg,
            start: startTime,
            end: endTime
          };
        });
        setEvents(newEvents);
      } catch (error) {
        alert("error");
      } finally {
      }
    };

    const fetchMsgData = async () => {
      try {
        // Send a GET request to the backend when the site loads
        const response = await axios.get(
          process.env.REACT_APP_API + "/message/template/get"
        );
        setMsgTemplateData(response.data); // Update the state with the returned data
      } catch (error) {
        alert("Error fetching data:", error.message);
      } finally {
      }
    };

    fetchData();
    fetchScheduleData();
    fetchMsgData();
  }, []); // Empty dependency array ensures it runs only once on mount

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeRemoveModel = () => {
    setIsRemoveModelOpen(false);
  };

  const hideRemoveModel = () => {
    setIsRemoveModelOpen(false);
    window.location.reload();
  };

  const handleSelectSlot = ({ start, end }) => {
    setSelectToday(start);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date to midnight
    if (start >= today) {
      setIsModalOpen(true);
      // Optionally, you can add logic to handle the event creation
    } else {
      alert("You can only schedule events for dates after today.");
    }
  };

  const handleSelectEvent = event => {
    setGetedEvent([
      { group: event.title, message: event.message, time: event.start }
    ]);
    setIsRemoveModelOpen(true);
  };

  const setScheduleCampaign = ({
    selectedOption,
    selectedTime,
    selectedMsg
  }) => {
    setIsModalOpen(false);
    // Create a new event
    // Assuming selectedTime is in "HH:mm" format and using today's date
    const [hours, minutes] = selectedTime.split(":").map(Number); // Extract hours and minutes
    const startDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      hours,
      minutes
    );

    // Set the end time (e.g., 1 hour later)
    const endDate = new Date(startDate.getTime() + 60 * 1000); // Add 1 minute

    const newEvent = {
      title: selectedOption, // Assuming selectedOptions is an array
      message: selectedMsg,
      start: startDate, // Assuming selectedTime is a valid date/time string
      end: endDate
    };

    // Add the new event to the events array
    setEvents([...events, newEvent]);

    //store database
    const fetchData = async () => {
      try {
        // Sending data as an object in the request body
        const response = await axios.post(
          process.env.REACT_APP_API + "/api/schedule/save",
          {
            group: selectedOption,
            msg: selectedMsg,
            time: startDate
          }
        );

        // Handle response from backend
      } catch (error) {}
    };

    fetchData();
  };

  return (
    <div>
      <div style={{ height: "800px" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          defaultView="month"
          style={{ height: 800, width: 1400, margin: 100 }}
        />
      </div>
      <AddCampaignModel
        groupData={data}
        msgData={msgTemplateData}
        isOpen={isModalOpen}
        close={closeModal}
        selectOptions={setScheduleCampaign}
      />
      <RemoveModelOpen
        data={savedEvent}
        isOpen={isRemvoeModelOpen}
        close={closeRemoveModel}
        returnRemove={hideRemoveModel}
      />
    </div>
  );
};

export default ScheduleCalendar;
