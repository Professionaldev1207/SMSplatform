import React, { useState } from "react";
import styled from "styled-components";
import First from "../../Assects/1.png";
import Second from "../../Assects/2.png";
import Third from "../../Assects/3.png";
import Four from "../../Assects/4.png";

const breakpoints = {
  mobileS: "320px",
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px"
};

// Styled components for table
const Table = styled.table`
  border-collapse: collapse; /* Ensures borders are collapsed into one */
  margin: 142px 2%;
  width: 80%;
  position: absolute;

  @media (max-width: ${breakpoints.tablet}) {
    width: 92%;
    margin-top: 10px;
    margin-left: 25px;
    margin-bottom: 0;
    position: relative;
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin-left: 5px;
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

const FirstIcon = styled.button`
  background-image: url(${First}); /* Path to your image */
  background-repeat: no-repeat;
  background-size: 20px; /* Set the size of the image */
  width: 20px;
`;

const SecondIcon = styled.button`
  background-image: url(${Second}); /* Path to your image */
  background-repeat: no-repeat;
  background-size: 20px; /* Set the size of the image */
  width: 20px;
`;

const ThirdIcon = styled.button`
  background-image: url(${Third}); /* Path to your image */
  background-repeat: no-repeat;
  background-size: 20px; /* Set the size of the image */
  width: 20px;
`;

const FourIcon = styled.button`
  background-image: url(${Four}); /* Path to your image */
  background-repeat: no-repeat;
  background-size: 20px; /* Set the size of the image */
  width: 20px;
`;

const TableComponentCallLog = ({ data }) => {
  const [activeRow, setActiveRow] = useState(null);

  const handleRowClick = id => {
    setActiveRow(id);
  };

  const handleRowBlur = id => {
    if (activeRow === id) {
      setActiveRow(null);
    }
  };

  const ActiveIcon = ({ index }) => {
    switch (index) {
      case 1:
        return <FirstIcon>'</FirstIcon>;
      case 2:
        return <SecondIcon>'</SecondIcon>;
      case 3:
        return <ThirdIcon>'</ThirdIcon>;
      case 4:
        return <FourIcon>'</FourIcon>;
      default:
        return <FirstIcon>'</FirstIcon>;
    }
  };

  return (
    <Table>
      <thead>
        <tr>
          <TableHeader>Person</TableHeader>
          <TableHeader>Number</TableHeader>
          <TableHeader>Start Time</TableHeader>
          <TableHeader>State</TableHeader>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) =>
          <TableRow
            key={index}
            isActive={activeRow === index}
            onClick={() => handleRowClick(index)}
            onBlur={() => handleRowBlur(index)}
            tabIndex="0"
          >
            <TableCell>
              {row.name}
            </TableCell>
            <TableCell>
              {row.phone}
            </TableCell>
            <TableCell>
              {row.start}
            </TableCell>
            <TableCell>
              {ActiveIcon({ index: row.state })}
            </TableCell>
          </TableRow>
        )}
        <TableRow>
          <TableFooter colSpan={4} />
        </TableRow>
      </tbody>
    </Table>
  );
};

export default TableComponentCallLog;
