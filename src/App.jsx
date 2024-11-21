import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import Absensi from "./pages/Absensi";
import DataKaryawan from "./pages/DataKaryawan";
import Laporan from "./pages/Laporan";
import Registrasi from "./pages/Registrasi";
import Setting from "./pages/Setting";
import About from "./pages/About";
import EditProfile from "./pages/EditProfile";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Halaman Login */}
        <Route path="/" element={<LoginPage />} />

        {/* Halaman yang dilindungi */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/absensi"
          element={
            <ProtectedRoute>
              <Absensi />
            </ProtectedRoute>
          }
        />
        <Route
          path="/data-karyawan"
          element={
            <ProtectedRoute>
              <DataKaryawan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/laporan"
          element={
            <ProtectedRoute>
              <Laporan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/registrasi"
          element={
            <ProtectedRoute>
              <Registrasi />
            </ProtectedRoute>
          }
        />
        <Route
          path="/setting"
          element={
            <ProtectedRoute>
              <Setting />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
