import { useAuthContext } from "./Components/Hooks/useAuthContext";
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import PageLoader from "./Components/Animations/PageLoader";

// use lazy loading to make app load faster
const SignUp = lazy(() => import("./Components/Authentication/SignUp"));
const Login = lazy(() => import("./Components/Authentication/Login"));
const Home = lazy(() => import("./Components/App/Home"));
const Profile = lazy(() => import("./Components/App/Profile/Profile"));
const DataUpload = lazy(() => import("./Components/App/Researcher/DataUpload"));
const DataAccess = lazy(() => import("./Components/App/Researcher/DataAccess"));
const Collaboration = lazy(() =>
  import("./Components/App/Collaboration/Collaboration")
);
const Policy = lazy(() => import("./Components/App/Government/Policy"));
const ViewPolicy = lazy(() => import("./Components/App/Government/ViewPolicy"));
const Faq = lazy(() => import("./Components/App/User/FAQ"));
const Recycle = lazy(() => import("./Components/App/User/Recycle"));
const BusinessRecycle = lazy(() =>
  import("./Components/App/Business/BusinessRecycle")
);
const Metrics = lazy(() => import("./Components/App/User/Metrics"));
const BusinessMetrics = lazy(() =>
  import("./Components/App/Business/BusinessMetrics")
);
const Notification = lazy(() =>
  import("./Components/App/Notification/Notification")
);
const Feedback = lazy(() => import("./Components/App/User/Feedback"));
const Users = lazy(() => import("./Components/App/Admin/Users"));
const FeatureManagement = lazy(() =>
  import("./Components/App/Admin/FeatureManagement")
);
const ManageFeedbacks = lazy(() =>
  import("./Components/App/Admin/ManageFeedbacks")
);
const Analytics = lazy(() => import("./Components/App/Admin/Analytics"));

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <Suspense fallback={<PageLoader />}>
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
          {/* BUSINESS ROUTE */}
          <Route
            path="/businessRecycle"
            element={user ? <BusinessRecycle /> : <Navigate to="/login" />}
          />
          <Route
            path="/businessMetrics"
            element={user ? <BusinessMetrics /> : <Navigate to="/login" />}
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
      </Suspense>
    </>
  );
}

export default App;
