import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReButton from "../../Assects/remove.png";
import axios from "axios";

const breakpoints = {
  mobileS: "320px",
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px"
};

// Styled components for table
const Table = styled.table`
  border-collapse: collapse; /* Ensures borders are collapsed into one */
  margin: 160px 1%;
  width: 48%;
  position: absolute;

  @media (max-width: ${breakpoints.tablet}) {
    width: 92%;
    margin-top: 10px;
    margin-left: 5px;
    margin-bottom: 0;
    position: relative;
  }

  @media (max-width: ${breakpoints.mobile}) {
  }

  @media (max-width: ${breakpoints.mobileS}) {
  }
`;

const TableHeader = styled.th`
  background-color: rgba(
    111,
    0,
    163,
    0.5
  ); /* Green background for the header */
  color: white;
  padding: 12px;
  text-align: center;
  font-weight: bold;
`;

const TableRow = styled.tr`
  background-color: ${props =>
    props.isActive ? "rgba(111, 0, 163, 0.2)" : "transparent"};
  &:nth-child(even) {
    background-color: ${props =>
      props.isActive ? "rgba(111, 0, 163, 0.2)" : "rgba(111, 0, 163, 0.03)"};
  }

  &:hover {
    background-color: rgba(111, 0, 163, 0.2); /* Hover effect for rows */
  }
`;

const TableCell = styled.td`
  padding: 12px;
  text-align: center;
  border: 1px solid #ddd; /* Light grey border for cells */

  @media (max-width: ${breakpoints.tablet}) {
    padding: 10px;
  }
`;

const TableFooter = styled.td`
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Shadow on the last row */
  font-size: 17px;
  font-weight: 500;
  padding-right: 50px;
  height: 50px;
  text-align: right;
`;

const RemoveBtn = styled.button`
  color: #ffffff;
  background-image: url(${ReButton}); /* Path to your image */
  background-repeat: no-repeat;
  background-size: 15px; /* Set the size of the image */
  margin-top: 10px;
  width: 15px;
  hegith: 15px;
`;

const PreviousNext = styled.button`
  background-color: rgba(111, 0, 163, 0.5);
  border-radius: 50%;
  color: white;
  font-size: 15px;
  display: inline-block;
  text-align: center;
  width: 40px;
  height: 40px;

  &:hover {
    background-color: rgb(255, 255, 255);
    color: rgba(111, 0, 163, 0.5);
  }
`;

const CurrentArea = styled.div`
  border-radius: 50%;
  color: rgba(111, 0, 163, 0.5);
  font-size: 20px;
  font-weight: 800;
  display: inline-block;
  text-align: center;
  width: 30px;
  height: 30px;
`;

const Title = styled.label`
  padding-left: 8%; /* Adds 10px of space at the start of the input */
  border-radius: 10px;
  margin: 120px 1%;
  width: 33%;
  height: 35px;
  position: absolute;
  font-weight: bold;
  color: rgb(111, 0, 163);
  font-size: 25px;

  @media (max-width: ${breakpoints.tablet}) {
    width: 98%;
    margin-top: 10px;
    margin-left: 25px;
    margin-bottom: 0;
    padding-left: 30%;
    position: relative;
  }

  &:hover {
    background-color: rgb(220, 198, 247);
  }
`;

const Campaign = ({ data }) => {
  const [activeRow, setActiveRow] = useState(null);
  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(0); // Track the current page
  const totalPages = Math.ceil(data.length / itemsPerPage); // Total number of pages

  const handleRowClick = id => {
    setActiveRow(id);
  };

  const handleRowBlur = id => {
    if (activeRow === id) {
      setActiveRow(null);
    }
  };

  // Helper function to get the current page's data
  const getCurrentPageData = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length); // Avoid overflow
    return data.slice(startIndex, endIndex);
  };

  // Pagination button handlers
  const goToFirstPage = () => setCurrentPage(0);
  const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 0));
  const goToNextPage = () =>
    setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  const goToLastPage = () => setCurrentPage(totalPages - 1);

  useEffect(
    () => {
      setCurrentPage(0);
    },
    [data]
  ); // Empty dependency array ensures it runs only once on mount

  const removeGroup = async id => {
    try {
      // Send a GET request to the backend when the site loads
      const response = await axios.post(
        process.env.REACT_APP_API + `/api/management/group/remove/${id}`
      );
      window.location.reload();
    } catch (error) {
      alert("Failure! ", error);
    } finally {
    }
  };

  const convertDate = dateString => {
    const date = new Date(dateString);

    // Extract year, month, day, hours, and minutes
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    // Combine into the desired format
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const onRemoveClick = async ({ group, msg, time }) => {
    try {
      // Send a GET request to the backend when the site loads
      const response = await axios.post(
        process.env.REACT_APP_API + "/api/schedule/remove",
        {
          group: group,
          message: msg,
          time: convertDate(time)
        }
      );
      window.location.reload();
    } catch (error) {
      alert(error.message);
    } finally {
    }
  };

  return (
    <main>
      <Title>Campaign</Title>
      <Table>
        <thead>
          <tr>
            <TableHeader>Data Time</TableHeader>
            <TableHeader>Group</TableHeader>
            <TableHeader>Msg</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Act</TableHeader>
          </tr>
        </thead>
        <tbody>
          {getCurrentPageData().map((row, index) =>
            <TableRow
              key={index}
              isActive={activeRow === index}
              onClick={() => handleRowClick(index)}
              onBlur={() => handleRowBlur(index)}
              tabIndex="0"
            >
              <TableCell>
                {String(row.start)}
              </TableCell>
              <TableCell>
                {row.title}
              </TableCell>
              <TableCell>
                {row.message}
              </TableCell>
              <TableCell>
                {String(row.status)}
              </TableCell>
              <TableCell>
                <RemoveBtn
                  onClick={() =>
                    onRemoveClick({
                      group: row.title,
                      msg: row.message,
                      time: row.start
                    })}
                >
                  '
                </RemoveBtn>
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableFooter colSpan={5}>
              <PreviousNext
                onClick={goToFirstPage}
                disabled={currentPage === 0}
              >
                &laquo;
              </PreviousNext>
              &nbsp;
              <PreviousNext
                onClick={goToPreviousPage}
                disabled={currentPage === 0}
              >
                &lt;
              </PreviousNext>
              &nbsp;&nbsp;
              <CurrentArea>
                {currentPage + 1}/{totalPages}
              </CurrentArea>
              &nbsp;&nbsp;
              <PreviousNext
                onClick={goToNextPage}
                disabled={currentPage === totalPages - 1}
              >
                &gt;
              </PreviousNext>
              &nbsp;
              <PreviousNext
                onClick={goToLastPage}
                disabled={currentPage === totalPages - 1}
              >
                &raquo;
              </PreviousNext>
            </TableFooter>
          </TableRow>
        </tbody>
      </Table>
    </main>
  );
};

export default Campaign;
