/* eslint-disable react/prop-types */
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { FiLink } from "react-icons/fi";
import { FaYoutube, FaImdb } from "react-icons/fa";
import { Link } from "react-router-dom";

const DetailsComponent = ({ details }) => {
  // Function to get the release year based on the type of the item
  const getReleaseYear = (item) => {
    return item.type === "Movie"
      ? (item.releaseDate && item.releaseDate.split("-")[0]) || "N/A"
      : [
          item.firstAirDate && item.firstAirDate.split("-")[0],
          (item.lastAirDate && item.lastAirDate.split("-")[0]) || "Present"
        ] || "N/A";
  };

  // Extracting the cast and urls from the details object
  const { cast, urls } = details;

  const releaseYear = getReleaseYear(details);

  // Function to render stars based on the rating
  const renderStars = (rating) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    let stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={`full-${i}`} />);
    }

    if (hasHalfStar) {
      stars.push(<BsStarHalf key="half" />);
    }

    const remainingStars = totalStars - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<BsStar key={`empty-${i}`} />);
    }

    return stars;
  };
  return (
    <div className=" flex h-full w-full items-center justify-center  lg:mt-20">
      <div className="flex flex-col gap-10 rounded-lg p-8 text-white lg:flex-row">
        <img
          src={details.posterUrl}
          alt={details.title}
          className="mb-10  w-72 place-self-center rounded-lg object-cover lg:place-self-start"
        />
        <div className="flex flex-col items-center lg:items-start">
          <h1 className="mb-4 text-2xl sm:text-4xl">{details.title}</h1>
          <div className="mb-4 flex items-center">
            {details.rating !== undefined && details.rating !== null && (
              <>
                <span className="mr-2 text-xl font-bold">
                  {(details.rating / 2).toFixed(1)}
                </span>
                <span className="mr-2 flex">
                  {renderStars(details.rating / 2)}
                </span>
              </>
            )}
          </div>

          <div className="mb-4 grid grid-cols-1 gap-2 text-base md:grid-cols-4 lg:gap-6">
            {details.type === "Movie" && (
              <>
                <div>
                  <div className="text-lg font-bold text-gray-400">Length</div>
                  <div className="text-lg font-bold">
                    {details.runtime} min.
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-400">
                    Release Year
                  </div>
                  <div className="text-lg font-bold">{releaseYear}</div>
                </div>
              </>
            )}
            {details.type !== "Movie" && (
              <>
                <div>
                  <div className="text-lg font-bold text-gray-400">
                    First Air Date
                  </div>
                  <div className="text-lg font-bold">{releaseYear[0]}</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-400">
                    Last Air Date
                  </div>
                  <div className="text-lg font-bold">{releaseYear[1]}</div>
                </div>
              </>
            )}
            <div>
              <div className="text-lg font-bold text-gray-400">Language</div>
              <div className="text-lg font-bold first-letter:uppercase">
                {details.language}
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-400">Status</div>
              <div className="text-lg font-bold first-letter:uppercase">
                {details.status}
              </div>
            </div>
          </div>

          <div className="mb-2 text-lg font-bold">Genres</div>
          <div className="flex flex-wrap">
            {details.genres?.map((genre, index) => (
              <div
                key={index}
                className="mb-4 mr-2 rounded-md border border-white px-1 py-0 text-sm font-medium first-letter:uppercase"
                style={{ color: "black", backgroundColor: "white" }}
              >
                {genre}
              </div>
            ))}
          </div>

          <div className="mb-2 text-lg font-bold">Synopsis</div>
          <div className="w-3/4 md:w-1/2">
            <p className="mb-4 text-sm">{details.summary}</p>
          </div>

          <div className="mb-2 text-lg font-bold">Cast</div>
          <div className="flex w-3/4 flex-wrap justify-center gap-2 lg:justify-start">
            {cast?.slice(0, 25).map((actor, index) => (
              <div
                key={index}
                className="rounded-md border border-white px-1 py-1 text-base"
              >
                {actor}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row">
            {urls.homepage && (
              <Link
                to={urls.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="redirectLink"
              >
                <FiLink className="mr-1 text-lg" /> Website
              </Link>
            )}
            {urls.trailerUrl && (
              <Link
                to={urls.trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="redirectLink"
              >
                <FaYoutube className="mr-1 text-lg" /> Trailer
              </Link>
            )}
            {urls.imdbUrl && (
              <Link
                to={urls.imdbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="redirectLink"
              >
                <FaImdb className="mr-1 text-lg" /> IMDb
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsComponent;
