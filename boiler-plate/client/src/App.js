import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import VideoUploadPage from "./components/views/VideoUploadPage/VideoUploadPage";
import VideoDetailPage from "./components/views/VideoDetailPage/VideoDetailPage";
import SubscriptionPage from "./components/views/SubscriptionPage/SubscriptionPage";


function App() {
  return (

    // react-router-dom
    // v5 Switch component
    // v6 Routes element

    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage/>}>
          </Route>
          <Route path="/login" element={<LoginPage/>}>
          </Route>
          <Route path="/register" element={<RegisterPage/>}>
          </Route>
          <Route path="/video/upload" element={<VideoUploadPage/>}>
          </Route>
          <Route path="/video/:videoId" element={<VideoDetailPage/>}>
          </Route>
          <Route path="subscription" element={<SubscriptionPage/>}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;


