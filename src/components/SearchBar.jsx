/* eslint-disable react/prop-types */

import { IoSearch } from "react-icons/io5";

const SearchBar = ({ setSearchString, placeholder }) => {
  return (
    <div className="mb-10 flex items-center justify-center gap-2 place-self-start sm:gap-4">
      <IoSearch className="size-5 sm:size-6" />
      <div className="w-52 border-b-2 border-b-app-icons focus-within:border-app-red sm:w-60">
        <input
          type="text"
          placeholder={placeholder}
          className=" rounded-lg  bg-transparent p-1  text-white outline-none placeholder:text-sm placeholder:text-app-icons sm:p-2 sm:placeholder:text-base"
          onChange={(e) => {
            const { value } = e.target;
            setSearchString(value);
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
