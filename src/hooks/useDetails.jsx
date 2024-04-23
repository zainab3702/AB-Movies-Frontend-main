import { useEffect, useState } from "react";
import axios from "../api/axios";

// custom hook to get the details of the current page

const useDetails = (pathname) => {
  // extracting the media type from the pathname for url api request
  const media = pathname.split("/")[1];

  // extracting the id from the pathname for url api request
  const id = pathname.split("/")[2];

  // defining the state for the details of the current page
  const [details, setDetails] = useState(null);

  // defining the state for the loading status
  const [isLoading, setIsLoading] = useState(true);

  // defining the state for the error status
  const [error, setError] = useState(false);

  useEffect(() => {
    // setting the loading status to true when the pathname changes
    setIsLoading(true);

    //   setting the error status to false when the pathname changes
    setError(false);

    // function to get the details of the current page based on current path
    const fetchData = async () => {
      try {
        // requesting for media object
        const response = await axios.get(pathname);
        const data = await response.data;
        // requesting for the urls of the media object
        const urls = (await axios.get(`/${media}/urls/${id}`)).data;
        setIsLoading(false);
        setDetails({ ...data, urls });
      } catch (err) {
        setError(err.response.data);
        setIsLoading(false);
      }
    };

    // calling the function to get the details of the current page
    fetchData();
  }, [pathname]);
  return { details, isLoading, error };
};

export default useDetails;
