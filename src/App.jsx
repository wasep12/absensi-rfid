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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/absensi" element={<Absensi />} />
        <Route path="/data-karyawan" element={<DataKaryawan />} />
        <Route path="/laporan" element={<Laporan />} />
        <Route path="/registrasi" element={<Registrasi />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/about" element={<About />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
