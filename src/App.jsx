import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import Bookmarks from "./pages/Bookmarks";
import RequireAuthRoutes from "./Auth/RequireAuthRoutes";
import DetailsPage from "./pages/DetailsPage";

function App() {
  return (
    <article className="flex flex-col overflow-x-hidden md:mt-6 lg:flex-row lg:items-baseline lg:gap-6">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* the routes below are protected and need login in order to be viewed */}
        <Route element={<RequireAuthRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tvshows" element={<TvShows />} />
          <Route path="/movies/:id" element={<DetailsPage />} />
          <Route path="/tvshows/:id" element={<DetailsPage />} />
        </Route>
      </Routes>
    </article>
  );
}

export default App;
