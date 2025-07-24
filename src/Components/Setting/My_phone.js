import React, { useState } from "react";
import styled from "styled-components";
import AddBtn from "../../Assects/add.png";
import AddPhoneNodel from "./Add_myphone";
import AddAccountInform from "./Add_account_inform";

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
  width: 40%;
  position: absolute;

  @media (max-width: ${breakpoints.tablet}) {
    width: 98%;
    margin-top: 10px;
    margin-left: 25px;
    margin-bottom: 0;
    position: relative;
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin-left: 1px;
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

const AddButton = styled.button`
  background-color: #ffffff;
  background-image: url(${AddBtn}); /* Path to your image */
  background-repeat: no-repeat;
  background-size: 30px 30px; /* Set the size of the image */
  background-repeat: no-repeat;
  width: 30px;
  margin: 70px ${props => props.sp};
  height: 30px;
  position: absolute;

  @media (max-width: ${breakpoints.tablet}) {
    width: 20px;
    height: 20px;
    background-size: 20px 20px; /* Set the size of the image */
    margin-top: 15px;
    margin-right: 0;
    margin-left: 120px;
    margin-bottom: 10px;
    position: relative;
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin-left: 20px;
  }
`;

const MyPhoneNum = ({ data, account }) => {
  const [activeRow, setActiveRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAccountModelOpen, setIsAccountMOdelOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openAccountMode = () => {
    setIsAccountMOdelOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeAccountModel = () => {
    setIsAccountMOdelOpen(false);
  };

  const closeUpdateModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  const closeUpdateAccountModal = () => {
    setIsAccountMOdelOpen(false);
    window.location.reload();
  };

  const handleRowClick = id => {
    setActiveRow(id);
  };

  const handleRowBlur = id => {
    if (activeRow === id) {
      //setActiveRow(null);
    }
  };

  return (
    <main>
      <Title>My 10DLC</Title>
      <AddButton onClick={openModal} />
      <Table>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>PhoneNumber</TableHeader>
          </tr>
        </thead>
        <tbody>
          <TableRow
            key={0}
            isActive={activeRow === 0}
            onClick={openAccountMode}
            tabIndex="0"
            style={{
              backgroundColor: "rgba(55, 0, 255, 0.5)",
              color: "blue"
            }}
          >
            <TableCell>Account SID</TableCell>
            <TableCell>
              {account.sid}
            </TableCell>
          </TableRow>
          <TableRow
            key={1}
            isActive={activeRow === 1}
            onClick={openAccountMode}
            tabIndex="0"
            style={{
              backgroundColor: "rgba(55, 0, 255, 0.5)",
              color: "blue"
            }}
          >
            <TableCell>Autho Token</TableCell>
            <TableCell>
              {account.token}
            </TableCell>
          </TableRow>
          <TableRow
            key={2}
            isActive={activeRow === 2}
            onClick={openAccountMode}
            tabIndex="0"
            style={{
              backgroundColor: "rgba(55, 0, 255, 0.5)",
              color: "blue"
            }}
          >
            <TableCell>Active PhoneNumber</TableCell>
            <TableCell>
              {account.active}
            </TableCell>
          </TableRow>
          {data.map(row =>
            <TableRow
              key={row.id + 3}
              isActive={activeRow === row.id + 3}
              onClick={() => handleRowClick(row.id + 3)}
              onBlur={() => handleRowBlur(row.id + 3)}
              tabIndex="0"
            >
              <TableCell>
                {row.name}
              </TableCell>
              <TableCell>
                {row.phone}
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
      <AddPhoneNodel
        isOpen={isModalOpen}
        close={closeModal}
        closeAddModel={closeUpdateModal}
      />
      <AddAccountInform
        data={data}
        isOpen={isAccountModelOpen}
        close={closeAccountModel}
        closeAddModel={closeUpdateAccountModal}
      />
    </main>
  );
};

export default MyPhoneNum;
