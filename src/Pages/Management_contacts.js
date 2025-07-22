import styled from "styled-components";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CrossLine from "../Components/Management/Ver_hor_lines";
import SearchWidget from "../Components/Management/Search_widget";
import TableComponent from "../Components/Management/Group_Member_table";
import TableComponentPersonActive from "../Components/Management/Person_active";

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

const Management = () => {
  const [data, setData] = useState([]);
  const [dataUser, setUserData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [userData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Send a GET request to the backend when the site loads
        const response = await axios.get(
          process.env.REACT_APP_API + "/api/management/tableGroup"
        );
        setGroupData(response.data);
        setData(response.data); // Update the state with the returned data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures it runs only once on mount

  const onRowClick = async id => {
    try {
      // Send a GET request to the backend when the site loads
      const response = await axios.get(
        process.env.REACT_APP_API + `/api/management/tableUsers/${id}`
      );
      setUsersData(response.data);
      setUserData(response.data); // Update the state with the returned data
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  const searchData = async searchWord => {
    const searchValue = searchWord.toLowerCase();
    if (searchValue === "") {
      setData(groupData);
      setUserData(userData);
    } else {
      const results = groupData.filter(
        item => item.name.toLowerCase().includes(searchValue) // Check if the name includes the search word
      );
      const resultUserData = userData.filter(
        item => item.username.toLowerCase().includes(searchValue) // Check if the name includes the search word
      );

      setData(results);
      setUserData(resultUserData);
    }
  };

  return (
    <main>
      <RightSide>
        <SearchWidget
          start="1%"
          formLength="15%"
          space1="18%"
          searchHint={searchData}
        />
        <CrossLine />
        <TableComponent data={data} onRowClick={onRowClick} />
        <TableComponentPersonActive data={dataUser} />
      </RightSide>
    </main>
  );
};

export default Management;
