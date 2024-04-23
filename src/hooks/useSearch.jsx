import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import axios from "../api/axios";

// custom hook to get the search results takes in the path and the search string
const useSearch = (path, searchString) => {
  // to get mediaType from the path if it is media or movies or tvshows
  const mediaType =
    path.split("/")[1] === "media" ? "Movie or Tv Shows" : path.split("/")[1];

  // defining the state for the search results
  const [searchResults, setSearchResults] = useState([]);

  // defining loading state for showing spinner
  const [isLoading, setIsLoading] = useState(true);

  // defining the state for the error message
  const [error, setError] = useState("");

  // custom debounce hook made for the search bar
  const debouncedValue = useDebounce(searchString.trim(), 0.7);

  // on change of the debounced value, the search results will be fetched
  useEffect(() => {
    // to show the spinner when the search results are being fetched
    setIsLoading(true);

    // to reset the error message when the search string changes
    setError("");

    // defining the function to getSearchResults
    const getSearchResults = async () => {
      if (debouncedValue && debouncedValue.length >= 3) {
        try {
          const response = await axios.get(`${path}?title=${debouncedValue}`);
          setSearchResults(response.data);
          setIsLoading(false);
        } catch (err) {
          setError(err.response.data.error);
          setSearchResults([]);
          setIsLoading(false);
        }
      } else if (debouncedValue && debouncedValue.length < 3) {
        // to show the error message when the search string is less than 3 characters but not immediately
        setSearchResults([]);
        setError(
          `Please Enter at least 3 characters to search for ${mediaType}`
        );

        setIsLoading(false);
      }
    };
    getSearchResults();
  }, [debouncedValue]);

  return { searchResults, isLoading, error };
};

export default useSearch;
