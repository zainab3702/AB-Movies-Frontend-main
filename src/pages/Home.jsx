import Layout from "../Layout";
import { useDispatch } from "react-redux";
import { setRecommended } from "../redux/slices/recommendedSlice";
import { useEffect, useState } from "react";
import { setTrending } from "../redux/slices/trendingSlice";
import axios from "../api/axios";
import TrendingContainer from "../components/Trending/TrendingContainer";
import RecommendedContainer from "../components/Recommended/RecommendedContainer";
import SearchBar from "../components/SearchBar";
import SearchResultsComponent from "../components/SearchResultsComponent";
import Loader from "../components/Loaders/Loader";
import useSearch from "../hooks/useSearch";
const Home = () => {
  // defining the state for the search bar input
  const [searchString, setSearchString] = useState("");

  // custom hook to get the search results takes in the path and the search string
  const { searchResults, isLoading, error } = useSearch("/media", searchString);

  const dispatch = useDispatch();
  // defining the function to populate the home screen with recomended for you movies
  useEffect(() => {
    // to ge a  ranadom pick between movies or tvs for recommended for you section
    const movieOrTvArray = ["movies", "tvShows"];
    const selectMovieOrTv = Math.floor(Math.random() * 2);

    // to get a random page number between 1 and 946 for movies and 1 and 1451 for tv shows
    const randomPage =
      Math.floor(Math.random() * (selectMovieOrTv === 1 ? 1451 : 946)) + 1;

    const getRecommendedMovieOrTvShowAndPopulateRedux = async () => {
      const movieOrTv = movieOrTvArray[selectMovieOrTv];
      const response = await axios.get(`/${movieOrTv}?page=${randomPage}`);
      const data = response.data;
      // populating the redux store with the fetched movies or tv shows
      dispatch(setRecommended({ type: movieOrTv, data: data[`${movieOrTv}`] }));
    };

    // function to handle populate redux store with trending movies and tvshows
    const getTrendingAndPopulateRedux = async () => {
      const response = await axios.get("/trending");
      const data = response.data;
      // populating the redux store with the fetched movies or tv shows
      dispatch(setTrending(data.trendingItems));
    };

    // calling the function to populate the home screen with recommended movies or tv shows
    getRecommendedMovieOrTvShowAndPopulateRedux();
    // calling the function to populate the home screen with trending movies or tv shows
    getTrendingAndPopulateRedux();
  }, []);
  return (
    <Layout>
      {/*  searchbar component */}
      <SearchBar
        setSearchString={setSearchString}
        placeholder={"Search for Movies and Tvshows"}
      />

      {/* if there is a search string present then show data of search results else show trending and recommended container */}
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
          {/* the trending movies or tv shows will be displayed here */}
          <TrendingContainer />

          {/* the recommended movies or tv shows will be displayed here */}
          <RecommendedContainer />
        </>
      )}
    </Layout>
  );
};

export default Home;
