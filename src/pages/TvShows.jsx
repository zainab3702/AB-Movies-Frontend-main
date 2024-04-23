import { useEffect, useState } from "react";
import Layout from "../Layout";
import useSearch from "../hooks/useSearch";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loaders/Loader";
import SearchResultsComponent from "../components/SearchResultsComponent";
import { useDispatch, useSelector } from "react-redux";
import axios from "../api/axios";
import { setTvShows } from "../redux/slices/tvShowsSlice";
import PaginationComponent from "../components/PaginationComponent";
import MediaComponent from "../components/MediaComponent";

const TvShows = () => {
  // defining the state for the search bar input
  const [searchString, setSearchString] = useState("");

  // defining the state for TvShows loading
  const [tvShowIsLoading, setTvShowIsLoading] = useState(true);

  // defining the state for TvShows error
  const [tvShowError, setTvShowError] = useState("");

  // defining currentPageNumber for pagination of movies
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  // defining the state for total pages
  const [totalPages, setTotalPages] = useState(null);

  // custom hook to get the search results takes in the path and the search string
  const { searchResults, isLoading, error } = useSearch(
    "/tvshows/search",
    searchString
  );

  const dispatch = useDispatch();

  // defining the function to populate the home screen with all the TvShows
  useEffect(() => {
    // function to get the TvShows and populate redux store based on the page number
    const getMoviesAndPopulateRedux = async () => {
      // to show the spinner when the API results are being fetched
      setTvShowIsLoading(true);

      // to reset the error message when the API page changes
      setTvShowError("");

      try {
        const response = await axios.get(`/tvshows?page=${currentPageNumber}`);
        const data = response.data;
        // populating the redux store with the fetched tvShows
        dispatch(setTvShows(data.tvShows));
        // setting the total pages for pagination
        setTotalPages(data.totalPages);
        setTvShowIsLoading(false);
      } catch (err) {
        setTvShowError(err.response.data);
        setTvShowIsLoading(false);
      }
    };

    // calling the function to populate the home screen with all TvShows
    getMoviesAndPopulateRedux();
  }, [currentPageNumber]);

  // getting the movies from the redux store
  const tvShows = useSelector((state) => state.tvShows);

  return (
    <Layout>
      <SearchBar
        setSearchString={setSearchString}
        placeholder={"Search For TV Shows"}
      />
      {searchString ? (
        isLoading ? (
          <Loader />
        ) : (
          <SearchResultsComponent
            data={searchResults}
            error={error}
            searchString={searchString}
          />
        )
      ) : (
        <>
          <h2 className="my-4 ml-8 place-self-start text-2xl font-light sm:ml-10 sm:text-4xl">
            TV Shows
          </h2>
          <div className="mb-10 mt-10 w-fit place-self-center md:w-80 md:-translate-x-[15%] lg:w-96 lg:-translate-x-1/4">
            <PaginationComponent
              currentPage={currentPageNumber}
              setCurrentPage={setCurrentPageNumber}
              totalPages={totalPages}
              givenPadding={"p-2 px-1"}
            />
          </div>

          {tvShowIsLoading ? (
            <Loader />
          ) : (
            <MediaComponent data={tvShows} error={tvShowError} />
          )}
        </>
      )}
    </Layout>
  );
};

export default TvShows;
