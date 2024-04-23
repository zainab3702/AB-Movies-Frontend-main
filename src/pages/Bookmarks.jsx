import { useSelector } from "react-redux";
import Layout from "../Layout";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import SearchResultsComponent from "../components/SearchResultsComponent";
import { Link, useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { GrDevice } from "react-icons/gr";
import { FaFilm } from "react-icons/fa";
import BookmarkComponent from "../components/BookmarkComponent";
const Bookmarks = () => {
  // getting the bookmarks from the redux store
  const bookmarks = useSelector((state) => state.bookmarks.bookmarkArray);
  const bookmarkedMovies = bookmarks.filter((item) => item.type === "Movie");
  const bookmarkedTvShows = bookmarks.filter((item) => item.type === "TV Show");
  // defining the state for the search bar input
  const [searchString, setSearchString] = useState("");

  // defining the state for the error state
  const [error, setError] = useState("");

  // defining the state for the search results
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // set error to empty string
    setError("");
    if (searchString) {
      // fetch the search results based on the search string
      const searchBookmarks = (searchString) => {
        const titleRegex = new RegExp(searchString, "i");
        const bookmarkSearchResults = bookmarks.filter((item) =>
          titleRegex.test(item.title)
        );
        if (bookmarkSearchResults.length === 0) {
          setError("No boomkarks found");
        } else {
          setSearchResults(bookmarkSearchResults);
        }
      };
      searchBookmarks(searchString);
    }
  }, [searchString]);

  return (
    <Layout>
      {/*  searchbar component */}

      <SearchBar
        setSearchString={setSearchString}
        placeholder={"Search for Bookmarked Shows"}
      />

      {/* showing searched bookmarks if search bar has any query */}
      {searchString ? (
        <SearchResultsComponent
          data={searchResults}
          searchString={searchString}
          error={error}
        />
      ) : bookmarks.length !== 0 ? (
        // else showing the bookmarked movies and tv shows if any
        <div className="flex flex-col items-center gap-20 lg:items-start">
          <div className="flex flex-col items-center lg:items-start">
            <h1 className="my-6 place-self-start text-2xl font-extralight sm:text-4xl">
              Bookmarked Movies
            </h1>
            <div className="grid grid-cols-1 gap-8 place-self-center sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 xl:gap-6 2xl:grid-cols-5">
              <BookmarkCard data={bookmarkedMovies} />
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-start">
            <h1 className="my-6 place-self-start text-2xl font-extralight sm:text-4xl">
              Bookmarked Tv Shows
            </h1>
            <div className="grid grid-cols-1 gap-8  sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 xl:gap-6 2xl:grid-cols-5">
              <BookmarkCard data={bookmarkedTvShows} />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-20 flex size-full items-center justify-center">
          <h1 className=" lg:-translate-x-1/2">
            <span className="  text-2xl font-medium">
              No Bookmarks Yet! <br />
            </span>
            <Link to={"/"} className="addBookmarks">
              Spice Up Your Watchlist?
            </Link>
          </h1>
        </div>
      )}
    </Layout>
  );
};

export default Bookmarks;

const BookmarkCard = ({ data }) => {
  // Function to get the release year of the movie or tv show
  const getReleaseYear = (item) => {
    return item.type === "Movie"
      ? (item.releaseDate && item.releaseDate.split("-")[0]) || "N/A"
      : (item.firstAirDate && item.firstAirDate.split("-")[0]) || "N/A";
  };

  const navigate = useNavigate();
  return data.map((item) => (
    <div
      className="w-64 md:w-72 lg:w-64 xl:w-[15.8rem] 2xl:w-64"
      key={item._id}
    >
      <div className="relative w-full rounded-lg">
        <img
          src={item.bannerUrl || item.posterUrl}
          onError={(e) => {
            e.target.src = "/placeHolder.png";
          }}
          alt={item.title}
          loading="eager"
          className="aspect-video w-full cursor-pointer rounded-lg object-fill transition-opacity duration-300 hover:opacity-50"
          onClick={() => {
            navigate(
              `/${item.type === "Movie" ? "movies" : "tvshows"}/${item._id}`
            );
          }}
        />
        <BookmarkComponent id={item._id} />
      </div>
      <div>
        <div className="flex w-full items-center gap-4 text-app-icons">
          <span>{getReleaseYear(item)}</span>
          <GoDotFill className="h-3 w-3" />
          {item.type === "Movie" ? (
            <FaFilm className="inline-block h-4 w-4" />
          ) : (
            <GrDevice className="inline-block h-4 w-4" />
          )}
        </div>
      </div>
      <h2>{item.title}</h2>
    </div>
  ));
};
