import SignUp from "./Components/Authentication/SignUp";
import Login from "./Components/Authentication/Login";
import { useAuthContext } from "./Components/Hooks/useAuthContext";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/App/Home";
import Profile from "./Components/App/Profile/Profile";
import DataUpload from "./Components/App/Researcher/DataUpload";
import DataAccess from "./Components/App/Researcher/DataAccess";
import Collaboration from "./Components/App/Collaboration/Collaboration";
import Policy from "./Components/App/Government/Policy";
import ViewPolicy from "./Components/App/Government/ViewPolicy";
import Faq from "./Components/App/User/FAQ";
import Recycle from "./Components/App/User/Recycle";
import Metrics from "./Components/App/User/Metrics";
import Notification from "./Components/App/Notification/Notification";
import Feedback from "./Components/App/User/Feedback";
import Users from "./Components/App/Admin/Users";
import FeatureManagement from "./Components/App/Admin/FeatureManagement";
import ManageFeedbacks from "./Components/App/Admin/ManageFeedbacks";
import Analytics from "./Components/App/Admin/Analytics";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <Routes>
        {/* AUTHENTICATION ROUTE */}
        <Route
          path="/"
          element={!user ? <SignUp /> : <Navigate to="/home" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/home" />}
        />
        {/* MAIN APP */}
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        {/* ADMIN ROUTE */}
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate to="/login" />}
        />
        <Route
          path="/featureManagement"
          element={user ? <FeatureManagement /> : <Navigate to="/login" />}
        />
        <Route
          path="/manageFeedbacks"
          element={user ? <ManageFeedbacks /> : <Navigate to="/login" />}
        />
        <Route
          path="/analytics"
          element={user ? <Analytics /> : <Navigate to="/login" />}
        />
        {/* RESEARCHERS ROUTE */}
        <Route
          path="/dataUpload"
          element={user ? <DataUpload /> : <Navigate to="/login" />}
        />
        <Route
          path="/dataAccess"
          element={user ? <DataAccess /> : <Navigate to="/login" />}
        />
        <Route
          path="/collaboration"
          element={user ? <Collaboration /> : <Navigate to="/login" />}
        />
        {/* POLICY MAKER ROUTE */}
        <Route
          path="/createPolicy"
          element={user ? <Policy /> : <Navigate to="/login" />}
        />
        <Route
          path="/viewPolicy"
          element={user ? <ViewPolicy /> : <Navigate to="/login" />}
        />
        {/* USER ROUTE */}
        <Route
          path="/faq-and-support"
          element={user ? <Faq /> : <Navigate to="/login" />}
        />
        <Route
          path="/recycle"
          element={user ? <Recycle /> : <Navigate to="/login" />}
        />
        <Route
          path="/metrics"
          element={user ? <Metrics /> : <Navigate to="/login" />}
        />
        <Route
          path="/feedback"
          element={user ? <Feedback /> : <Navigate to="/login" />}
        />
        <Route
          path="/notifications"
          element={user ? <Notification /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
