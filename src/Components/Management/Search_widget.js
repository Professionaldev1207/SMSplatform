import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchImg from "../../Assects/search.png";
import AddBtn from "../../Assects/add.png";
import AddModal from "./Add_DB_model";

const breakpoints = {
  mobileS: "375px",
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px"
};

const SearchForm = styled.input`
  border: 1px solid rgba(111, 0, 163, 0.5);
  border-radius: 5px;
  background-color: #f9f9f9;
  background-image: url(${SearchImg}); /* Path to your image */
  background-repeat: no-repeat;
  background-position: 95% center; /* Position the image inside the input */
  background-size: 30px 30px; /* Set the size of the image */
  margin: 70px ${props => props.startEntry};
  width: ${props => props.Length};
  height: 35px;
  position: absolute;
  padding-left: 10px; /* Adds 10px of space at the start of the input */

  &:hover {
    background-color: rgb(220, 198, 247);
  }

  @media (max-width: ${breakpoints.tablet}) {
    height: 35px;
    width: 250px;
    background-size: 20px 20px; /* Set the size of the image */
    font-size: 12px;
    margin-top: 82px;
    margin-left: 20px;
    margin-bottom: 10px;
    position: relative;
  }

  @media (max-width: ${breakpoints.mobile}) {
    height: 35px;
    width: 340px;
    background-size: 20px 20px; /* Set the size of the image */
    font-size: 12px;
    margin-top: 82px;
    margin-left: 20px;
    margin-bottom: 10px;
    position: relative;
  }

  @media (max-width: ${breakpoints.mobileS}) {
    width: 98%;
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

  @media (max-width: ${breakpoints.mobileS}) {
  }
`;

const SearchWidget = ({ start, formLength, space1, searchHint }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  // Timer to handle debouncing
  useEffect(
    () => {
      const timer = setTimeout(() => {
        setDebouncedValue(inputValue); // Call the function with the debounced value
      }, 200); // 0.5s delay

      // Cleanup the timer if input changes before the 0.5s
      return () => {
        clearTimeout(timer);
      };
    },
    [inputValue]
  ); // The effect runs every time `inputValue` changes

  // Function to be called after 0.5s of inactivity
  const handleDebouncedFunction = () => {
    searchHint(debouncedValue);
  };

  // Trigger the function when the debounced value changes
  useEffect(
    () => {
      handleDebouncedFunction();
    },
    [debouncedValue]
  );

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeUpdateModal = () => {
    window.location.reload();
  };

  return (
    <div style={{ display: "inline" }}>
      <SearchForm
        placeholder=" Search here..." // Set the placeholder text here
        startEntry={start}
        Length={formLength}
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <AddButton sp={space1} onClick={openModal} />
      <AddModal
        isOpen={isModalOpen}
        close={closeModal}
        closeAddModel={closeUpdateModal}
      />
    </div>
  );
};

export default SearchWidget;
