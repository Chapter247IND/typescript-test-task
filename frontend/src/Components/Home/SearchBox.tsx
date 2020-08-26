import React, { useState } from "react";
export interface ISearcBoxProps {
  onSearch: (value: string) => void | Promise<void> | Promise<any>;
}
const SearchBox = ({ onSearch }: ISearcBoxProps) => {
  const [city, setCity] = useState<string>("");
  const searchWhether = async (e: any) => {
    e.preventDefault();
    onSearch(city);
  };
  return (
    <form onSubmit={searchWhether}>
      <div className={"input-box"}>
        <input
          type='text'
          className='input-field'
          placeholder='Enter City'
          onChange={(e: any) => setCity(e.target.value)}
          value={city}
        />
      </div>
      <button type='submit' className='search-button'>
        Search
      </button>
    </form>
  );
};

export default SearchBox;
