import React from 'react';

const SearchBar = (props) => {
  return (
    <div className="control">
      <input
        type="text"
        className="input search-bar"
        name="search"
        placeholder="Search"
        value={props.value}
        onChange={(event) => props.handleChange(event.target.value)}
      /></div>
  );
};

export default SearchBar;