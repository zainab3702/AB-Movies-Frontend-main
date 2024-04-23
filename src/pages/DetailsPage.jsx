import { useLocation } from "react-router-dom";
import useDetails from "../hooks/useDetails";
import Layout from "../Layout";
import DetailsComponent from "../components/DetailsComponent";
import DetailsLoader from "../components/Loaders/DetailsLoader";
const DetailsPage = () => {
  const { pathname } = useLocation();

  // custom hook to get the details of the current page
  const { details, isLoading, error } = useDetails(pathname);

  return (
    <Layout>
      {/* if loading show spinner if error show error message else show details*/}
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <DetailsLoader />
        </div>
      ) : error ? (
        <div className="flex h-full w-full items-center justify-center">
          <p>{error}</p>
        </div>
      ) : (
        <DetailsComponent details={details} />
      )}
    </Layout>
  );
};

export default DetailsPage;
