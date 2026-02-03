import React from "react";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import LandingPage from "./pages/LandingPage";
import RoleSelectionScreen from "./pages/RoleSelectionScreen";
import StudentDashboard from "./pages/StudentDashboard";
import CounsellorDashboard from "./pages/CounsellorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Toaster } from "@/components/ui/toaster";

// Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (!user) return <Navigate to="/" replace />;
  if (allowedRole && user.role !== allowedRole)
    return <Navigate to="/" replace />;

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelectionScreen />} />
      <Route path="/landing" element={<LandingPage />} />

      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/counsellor"
        element={
          <ProtectedRoute allowedRole="counsellor">
            <CounsellorDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AppRoutes />
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
