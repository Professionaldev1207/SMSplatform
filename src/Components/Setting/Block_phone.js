import React, { useState } from "react";
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
  margin: 160px 42%;
  width: 40%;
  position: absolute;

  @media (max-width: ${breakpoints.desktop}) {
    width: 40%;
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

const RemoveBtn = styled.button`
  color: #ffffff;
  background-image: url(${ReButton}); /* Path to your image */
  background-repeat: no-repeat;
  background-size: 15px; /* Set the size of the image */
  margin: 0 10px;
  width: 15px;
  hegith: 15px;
`;

const Title = styled.label`
  padding-left: 8%; /* Adds 10px of space at the start of the input */
  border-radius: 10px;
  margin: 120px 42%;
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
    margin-right: 0%;
    margin-bottom: 0;
    padding-left: 30%;
    position: relative;
  }

  &:hover {
    background-color: rgb(220, 198, 247);
  }
`;

const BlockPhoneNumber = ({ data }) => {
  const [activeRow, setActiveRow] = useState(null);

  const handleRowClick = id => {
    setActiveRow(id);
  };

  const handleRowBlur = id => {
    if (activeRow === id) {
      //setActiveRow(null);
    }
  };

  const removeBlockPhone = async phone => {
    try {
      // Send a GET request to the backend when the site loads
      const response = await axios.post(
        process.env.REACT_APP_API +
          `/api/management/person/remove/block/${phone}`
      );
      window.location.reload();
    } catch (error) {
    } finally {
    }
  };

  return (
    <main>
      <Title>BlockNum</Title>
      <Table>
        <thead>
          <tr>
            <TableHeader>UserName</TableHeader>
            <TableHeader>PhoneNumber</TableHeader>
            <TableHeader>Active</TableHeader>
          </tr>
        </thead>
        <tbody>
          {data.map(row =>
            <TableRow
              key={row.id}
              isActive={activeRow === row.id}
              onClick={() => handleRowClick(row.id)}
              onBlur={() => handleRowBlur(row.id)}
              tabIndex="0"
            >
              <TableCell>
                {row.name}
              </TableCell>
              <TableCell>
                {row.phone}
              </TableCell>
              <TableCell>
                <RemoveBtn onClick={() => removeBlockPhone(row.phone)}>
                  .
                </RemoveBtn>
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableFooter colSpan={3}>
              {/* Pagination controls */}
            </TableFooter>
          </TableRow>
        </tbody>
      </Table>
    </main>
  );
};

export default BlockPhoneNumber;
