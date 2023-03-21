import React, { useState } from "react";
import classes from "./../../styles/AutocompleteMuiHabitEntered.module.scss";
import CloseIcon from "@mui/icons-material/Close";

const HabitAutocomplete = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const suggestions = props.suggestions;

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const filteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
    setInputValue(inputValue);
    setFilteredSuggestions(filteredSuggestions);
    props.onGetInputValue(inputValue);
  };

  const displayHandler = (event) => {
    const inputValue = event.target.value;
    const filteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
    setInputValue(inputValue);
    setFilteredSuggestions(filteredSuggestions);
  };

  const hideHandler = (event) => {
    setFilteredSuggestions([]);
  };

  const handleOptionClick = (event) => {
    setInputValue(event.target.innerText);
    setFilteredSuggestions([]);
    props.onGetInputValue(event.target.innerText);
  };

  return (
    <div className={classes["autocomplete-wrapper"]}>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={displayHandler}
          className={classes["autocomplete-input"]}
        />
        {filteredSuggestions.length > 1 && (
          <div
            className={classes["close-btn-autocomplete"]}
            onClick={hideHandler}
          >
            <CloseIcon />
          </div>
        )}
      </div>
      {filteredSuggestions.length > 0 && (
        <ul className={classes["autocomplete-options"]}>
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className={classes["autocomplete-option"]}
              onClick={handleOptionClick}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HabitAutocomplete;
