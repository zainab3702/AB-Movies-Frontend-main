import { useEffect, useState } from "react";
import Layout from "../Layout";
import SearchBar from "../components/SearchBar";
import SearchResultsComponent from "../components/SearchResultsComponent";
import Loader from "../components/Loaders/Loader";
import useSearch from "../hooks/useSearch";
import PaginationComponent from "../components/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import axios from "../api/axios";
import { setMovies } from "../redux/slices/moviesSlice";
import MediaComponent from "../components/MediaComponent";

const Movies = () => {
  // defining the state for the search bar input
  const [searchString, setSearchString] = useState("");

  // defining the state for movies loading
  const [movieIsLoading, setMovieIsLoading] = useState(true);

  // defining the state for movies error
  const [movieError, setMovieError] = useState("");

  // defining currentPageNumber for pagination of movies
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  // defining the state for total pages
  const [totalPages, setTotalPages] = useState(null);

  // custom hook to get the search results takes in the path and the search string
  const { searchResults, isLoading, error } = useSearch(
    "/movies/search",
    searchString
  );

  const dispatch = useDispatch();

  // defining the function to populate the home screen with all the Movies
  useEffect(() => {
    // function to get the Movies and populate redux store based on the page number
    const getMoviesAndPopulateRedux = async () => {
      // to show the spinner when the API results are being fetched
      setMovieIsLoading(true);

      // to reset the error message when the API page changes
      setMovieError("");

      try {
        const response = await axios.get(`/movies?page=${currentPageNumber}`);
        const data = response.data;
        // populating the redux store with the fetched Movies
        dispatch(setMovies(data.movies));
        // setting the total pages for pagination
        setTotalPages(data.totalPages);
        setMovieIsLoading(false);
      } catch (err) {
        setMovieError(err.response.data);
        setMovieIsLoading(false);
      }
    };

    // calling the function to populate the home screen with all Movies
    getMoviesAndPopulateRedux();
  }, [currentPageNumber]);

  // getting the Movies from the redux store
  const movies = useSelector((state) => state.movies);

  return (
    <Layout>
      {/* searchbar component */}
      <SearchBar
        setSearchString={setSearchString}
        placeholder={"Search For Movies"}
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
            Movies
          </h2>
          <div className="mb-10 mt-10 w-fit place-self-center md:w-80 lg:w-96 lg:-translate-x-1/4">
            <PaginationComponent
              currentPage={currentPageNumber}
              setCurrentPage={setCurrentPageNumber}
              totalPages={totalPages}
              givenPadding={"p-2"}
            />
          </div>

          {movieIsLoading ? (
            <Loader />
          ) : (
            <MediaComponent data={movies} error={movieError} />
          )}
        </>
      )}
    </Layout>
  );
};

export default Movies;
