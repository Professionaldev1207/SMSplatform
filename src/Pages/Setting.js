import styled from "styled-components";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Horizontal from "../Components/Setting/Horizontal";
import MyPhoneNum from "../Components/Setting/My_phone";
import BlockPhoneNumber from "../Components/Setting/Block_phone";

const breakpoints = {
  mobileS: "320px",
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px"
};

const RightSide = styled.div`
  background-color: #ffffff;
  height: 945px;
  width: 85%;

  @media (max-width: ${breakpoints.tablet}) {
    width: 90%;
  }
`;

const Setting = () => {
  const [data, setData] = useState([]);
  const [blockData, setBlockData] = useState([]);
  const [accountData, setAccountData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Send a GET request to the backend when the site loads
        const response = await axios.get(
          process.env.REACT_APP_API + "/api/myphone/get"
        );
        setData(response.data); // Update the state with the returned data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };

    fetchData();

    const fetchBlockData = async () => {
      try {
        // Send a GET request to the backend when the site loads
        const response = await axios.post(
          process.env.REACT_APP_API + "/api/blockPhone/get"
        );
        setBlockData(response.data); // Update the state with the returned data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };

    fetchBlockData();

    const fetchAccountInform = async () => {
      //alert(process.env.REACT_APP_API + "/api/account/information/get");
      try {
        // Send a GET request to the backend when the site loads
        const response = await axios.post(
          process.env.REACT_APP_API + "/api/account/information/get"
        );
        setAccountData(response.data[0]); // Update the state with the returned data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };

    fetchAccountInform();
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <main>
      <RightSide>
        <Horizontal />
        <MyPhoneNum data={data} account={accountData} />
        <BlockPhoneNumber data={blockData} />
      </RightSide>
    </main>
  );
};

export default Setting;
