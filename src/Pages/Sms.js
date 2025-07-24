import styled from "styled-components";
import React, { useEffect, useState } from "react";
import SearchSMS from "../Components/SMS/Search";
import UserMenu from "../Components/SMS/User_menu";
import MessageForm from "../Components/SMS/Message_form";
import ChatLog from "../Components/SMS/Chat_log";
import axios from "axios";
import Previus from "../Assects/previus.svg";

const RightSide = styled.div`
  display: flex;
  background-color: #ffffff;
  height: 100vh;
  width: 100%;
`;

const PreviusButton = styled.div`
  background-image: url(${Previus}); /* Path to your image */
  background-repeat: no-repeat;
  background-size: 30px 30px; /* Set the size of the image */
  width: 30%;
  height: 30px;
  position: absolute;
`;

const UserPan = styled.div`
  background-color: rgba(111, 0, 163, 0.1);
  border-radius: 10px;
  width: 25%;
  height: 98%;
  margin-left: 1%;
  margin-right: 0;
  margin-top: 1%;
  margin-bottom: 1%;
`;

const ChatPan = styled.div`
  background-color: rgba(0, 163, 154, 0.1);
  border-radius: 10px;
  float: right;
  width: 75%;
  height: 98%;
  margin: 1%;
`;

const SMS = () => {
  const [data, setData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [chatData, setChatData] = useState([]);
  const [userPhone, setUserPhone] = useState(-1);
  const [isMobile, setIsMobile] = useState(false); // Check if mobile environment
  const [showRightSidebar, setShowRightSidebar] = useState(false); // Toggle between sidebars

  // Handle window resize to detect mobile environment
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Send a GET request to the backend when the site loads
        const response = await axios.get(
          process.env.REACT_APP_API + "/sms/users"
        );
        setGroupData(response.data);
        setData(response.data); // Update the state with the returned data
      } catch (error) {
        alert("Error fetching data:", error);
      } finally {
      }
    };
    fetchData();

    const handleResize = () => setIsMobile(window.innerWidth <= 425);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array ensures it runs only once on mount

  const onClickButton = async ({ id, phone }) => {
    setUserPhone(phone);
    try {
      // Send a GET request to the backend when the site loads
      const response = await axios.post(
        process.env.REACT_APP_API + `/sms/chatlog/${id}`
      );
      setChatData(response.data); // Update the state with the returned data
    } catch (error) {
      alert("Error fetching data:", error);
    } finally {
    }

    setShowRightSidebar(true);
  };

  const setChatString = ({ inputValue }) => {
    if (userPhone === -1) {
      alert("Select Guy.");
      return;
    }
    const sendSMSToPerson = async () => {
      try {
        // Send a GET request to the backend when the site loads
        const response = await axios.post(
          process.env.REACT_APP_API +
            `/api/management/person/send/SMS/${userPhone}?msg=${inputValue}`
        );
      } catch (error) {
      } finally {
      }
    };

    sendSMSToPerson();
    const newChat = {
      index: 2, // Use chatData length to calculate the new index
      message: inputValue
    };

    // Update chatData state
    setChatData(prevChatData => [...prevChatData, newChat]);
  };

  const searchData = async searchWord => {
    const searchValue = searchWord.trim().toLowerCase();
    if (searchValue === "") {
      setData(groupData);
    } else {
      const results = groupData.filter(
        item => item.name.toLowerCase().includes(searchValue) // Check if the name includes the search word
      );
      setData(results);
    }
  };

  return (
    <main>
      <RightSide>
        {(!isMobile || !showRightSidebar) &&
          <UserPan
            style={{
              width: isMobile ? "100%" : "30%",
              display: isMobile && showRightSidebar ? "none" : "block"
            }}
          >
            <SearchSMS searchHint={searchData} />
            <UserMenu menuItems={data} rowClick={onClickButton} />
          </UserPan>}

        {(!isMobile || showRightSidebar) &&
          <ChatPan
            style={{
              flex: 1,
              padding: "10px",
              display: isMobile && !showRightSidebar ? "none" : "block"
            }}
          >
            <button
              onClick={() => setShowRightSidebar(false)}
              style={{
                flex: 1,
                padding: "10px",
                color: isMobile ? "black" : "rgba(0, 255, 85, 0.1)"
              }}
            >
              Back To Menu
            </button>
            <ChatLog chatData={chatData} />
            <MessageForm changeValue={setChatString} />
          </ChatPan>}
      </RightSide>
    </main>
  );
};

export default SMS;
