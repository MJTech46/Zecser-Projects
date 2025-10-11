import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/login";
import ForgotPass from "./pages/ForgotPass";
import ResetPass from "./pages/ResetPass";
import UserProfile from "./pages/UserProfile";
import CompanyProfile from "./pages/CompanyProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ForgotPass" element={<ForgotPass />} />
        <Route path="/ResetPass" element={<ResetPass />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/CompanyProfile" element={<CompanyProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
