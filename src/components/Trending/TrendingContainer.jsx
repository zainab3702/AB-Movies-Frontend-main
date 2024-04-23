import { useSelector } from "react-redux";
import TrendingCard from "./TrendingCard";
import { useEffect, useRef, useState } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const TrendingContainer = () => {
  const trendingData = useSelector((state) => state.trending);

  // ref for scrolling using buttons
  const scrollRef = useRef(null);

  // defining state for wether to show scroll buttons or not
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      /* 
        function to check total width of trending component and comparing it with client's scroll position
        and updating the state to show or hide scroll buttons
      */
      const container = scrollRef.current;
      if (container) {
        setShowLeftButton(container.scrollLeft > 0);
        setShowRightButton(
          container.scrollLeft <
            container.scrollWidth - container.clientWidth - 8 * 16,
        );
      }
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleLeftScroll = () => {
    // function to scroll left in trending containter
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 200;
    }
  };

  const handleRightScroll = () => {
    // function to scroll right in trending container
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 200;
    }
  };

  return (
    <div className="relative w-full md:pr-4 lg:pr-44">
      <h1 className="my-4 place-self-start text-2xl font-extralight sm:text-4xl">
        Trending
      </h1>
      <div
        className="flex h-48 snap-x snap-mandatory space-x-4 overflow-x-auto scroll-smooth md:h-64"
        ref={scrollRef}
      >
        {trendingData.map((item, index) => {
          return <TrendingCard key={index} item={item} />;
        })}

        {showLeftButton && (
          <div
            className="absolute -left-4 top-1/2 z-20 -translate-y-3/4 cursor-pointer rounded-lg bg-app-icons bg-opacity-40  p-2 backdrop-blur-md lg:-translate-y-1/2"
            onClick={handleLeftScroll}
          >
            <MdOutlineArrowBackIosNew className="size-4 md:size-6" />
          </div>
        )}

        {showRightButton && (
          <div
            className="absolute right-0 top-1/2 z-20 -translate-y-3/4 cursor-pointer rounded-lg bg-app-icons bg-opacity-40 p-2 backdrop-blur-md md:right-4  lg:right-44 lg:-translate-y-1/2 "
            onClick={handleRightScroll}
          >
            <MdOutlineArrowForwardIos className="size-4 md:size-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingContainer;
