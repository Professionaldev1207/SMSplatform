import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SmsBtn from "../../Assects/sms_1.png";
import BlockIco from "../../Assects/block.png";
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
  margin: 160px 36%;
  width: 48%;
  position: absolute;

  @media (max-width: ${breakpoints.desktop}) {
    width: 48%;
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 98%;
    margin-top: 10px;
    margin-left: 25px;
    margin-bottom: 50px;
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

const Sms1Button = styled.button`
  color: #ffffff;
  background-image: url(${SmsBtn}); /* Path to your image */
  background-repeat: no-repeat;
  background-size: 25px 25px; /* Set the size of the image */
  width: 25px;
  hegith: 25px;
`;

const BlockImage = styled.button`
  color: #ffffff;
  margin-left: 10px;
  background-image: url(${BlockIco}); /* Path to your image */
  background-repeat: no-repeat;
  background-size: 20px; /* Set the size of the image */
  width: 20px;
  hegith: 20px;
`;

const SMSPersonForm = styled.input`
  border: 1px solid rgba(111, 0, 163, 0.5);
  padding-left: 10px; /* Adds 10px of space at the start of the input */
  margin: 120px 36%;
  width: 48%;
  height: 35px;
  position: absolute;

  @media (max-width: ${breakpoints.desktop}) {
    width: 48%;
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 98%;
    margin-top: 25px;
    margin-left: 25px;
    margin-bottom: 0;
    position: relative;
  }

  &:hover {
    background-color: rgb(220, 198, 247);
  }
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

const TableComponentPersonActive = ({ data }) => {
  const [activeRow, setActiveRow] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const itemsPerPage = 12; // Number of items per page
  const [currentPage, setCurrentPage] = useState(0); // Track the current page
  const totalPages = Math.ceil(data.length / itemsPerPage); // Total number of pages

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

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

  const sendSMSToPerson = async phone => {
    if (inputValue === "") {
      alert("Input SMS.");
      return;
    }
    try {
      // Send a GET request to the backend when the site loads
      const response = await axios.post(
        process.env.REACT_APP_API +
          `/api/management/person/send/SMS/${phone}?msg=${inputValue}`
      );
      alert(response.data.msg);
    } catch (error) {
      alert("Failure! ", error);
    } finally {
    }
  };

  const makeBlockPhone = async phone => {
    try {
      // Send a GET request to the backend when the site loads
      const response = await axios.post(
        process.env.REACT_APP_API + `/api/management/person/add/block/${phone}`
      );
      alert(response.data.msg);
    } catch (error) {
    } finally {
    }
  };

  return (
    <main>
      <SMSPersonForm
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Input Person SMS..."
      />
      <Table>
        <thead>
          <tr>
            <TableHeader>Person</TableHeader>
            <TableHeader>Phone</TableHeader>
            <TableHeader>Active</TableHeader>
          </tr>
        </thead>
        <tbody>
          {getCurrentPageData().map(row =>
            <TableRow
              key={row.id}
              isActive={activeRow === row.id}
              onClick={() => handleRowClick(row.id)}
              onBlur={() => handleRowBlur(row.id)}
              tabIndex="0"
            >
              <TableCell>
                {row.username}
              </TableCell>
              <TableCell>
                {row.phone}
              </TableCell>
              <TableCell>
                <Sms1Button onClick={() => sendSMSToPerson(row.phone)}>
                  .
                </Sms1Button>
                <BlockImage onClick={() => makeBlockPhone(row.phone)}>
                  .
                </BlockImage>
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableFooter colSpan={3}>
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
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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

export default TableComponentPersonActive;
