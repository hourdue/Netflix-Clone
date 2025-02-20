import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NewAndPopular from "./pages/NewAndPopular";
import VideoP from "./pages/VideoP";
import Home from "./pages/Home";
import TVShows from "./pages/TVShows";
import Movies from "./pages/Movies";
import MyList from "./pages/MyList";
import BrowseByLanguage from "./pages/BrowseByLanguage";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignUp";
import { ProtectedRoute, PublicRoute } from "./utils/routing";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
        <Route path="/signup" element={<PublicRoute element={<SignupPage />} />} />

        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/tv" element={<ProtectedRoute element={<TVShows />} />} />
        <Route path="/movies" element={<ProtectedRoute element={<Movies />} />} />
        <Route path="/latest" element={<ProtectedRoute element={<NewAndPopular />} />} />
        <Route path="/my-list" element={<ProtectedRoute element={<MyList />} />} />
        <Route path="/original-audio" element={<ProtectedRoute element={<BrowseByLanguage />} />} />
        <Route path="/video/:id" element={<ProtectedRoute element={<VideoP />} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
