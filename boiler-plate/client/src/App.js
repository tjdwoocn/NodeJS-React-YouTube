import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import { auth } from "./_actions/user_action";


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
        </Routes>
      </div>
    </Router>
  );
}

export default App;


