import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import OfficeMap from "../components/OfficeMap";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Periksa token di localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      // Jika tidak ada token, arahkan ke halaman login
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-100">
          <h1 className="md:text-left text-center text-3xl font-semibold text-gray-800 mb-6">
            Dashboard Absensi
          </h1>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Card Total Pengguna */}
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg flex items-center space-x-4">
              <div className="bg-blue-500 text-white p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                    clipRule="evenodd"
                  />
                  <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-600 mb-2">
                  Total Pengguna
                </h3>
                <p className="text-3xl font-semibold text-gray-800">150</p>
              </div>
            </div>

            {/* Card Absensi Hari Ini */}
            <div className="bg-green-100 p-6 rounded-lg shadow-lg flex items-center space-x-4">
              <div className="bg-green-500 text-white p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-8"
                >
                  <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
                  <path
                    fillRule="evenodd"
                    d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-600 mb-2">
                  Absensi Hari Ini
                </h3>
                <p className="text-3xl font-semibold text-gray-800">120</p>
              </div>
            </div>

            {/* Card Absensi Tidak Hadir */}
            <div className="bg-red-100 p-6 rounded-lg shadow-lg flex items-center space-x-4">
              <div className="bg-red-500 text-white p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-600 mb-2">
                  Absensi Tidak Hadir
                </h3>
                <p className="text-3xl font-semibold text-gray-800">30</p>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h3 className="text-xl font-medium text-gray-600 mb-4">
              Log Absensi Terbaru
            </h3>
            <ul>
              <li className="flex justify-between py-2 border-b border-gray-200">
                <span>John Doe - Absen Masuk</span>
                <span className="text-gray-500 text-sm">1 jam lalu</span>
              </li>
              <li className="flex justify-between py-2 border-b border-gray-200">
                <span>Jane Smith - Absen Keluar</span>
                <span className="text-gray-500 text-sm">2 jam lalu</span>
              </li>
              <li className="flex justify-between py-2 border-b border-gray-200">
                <span>Mark Johnson - Absen Masuk</span>
                <span className="text-gray-500 text-sm">3 jam lalu</span>
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="flex-grow">
            <OfficeMap />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminDashboard;
