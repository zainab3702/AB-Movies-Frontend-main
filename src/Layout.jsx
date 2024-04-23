import { Bounce, ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import useGetBookmarks from "./hooks/useGetBookmarks";
import useGetBookmarkID from "./hooks/useGetBookmarksID";
// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  // custom hook to get the bookmarks and refresh the bookmarks array in the redux store
  useGetBookmarks();
  useGetBookmarkID();
  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        pauseOnHover={false}
        closeOnClick
        theme="dark"
        transition={Bounce}
      />
      <main className="mb-16 mt-24 flex w-screen flex-col items-center p-6 md:ml-6 lg:ml-32 lg:mt-0 lg:items-start">
        {children}
      </main>
    </>
  );
};

export default Layout;
