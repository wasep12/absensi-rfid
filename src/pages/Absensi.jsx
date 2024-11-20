import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import tapCardGif from "../assets/tap-card.gif";
import React, { useState, useEffect } from "react";

const Absensi = () => {
  const [logData, setLogData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Jumlah data per halaman

  // Simulasi data real-time
  useEffect(() => {
    const simulateRFIDScan = () => {
      const newEntry = {
        id: `RFID-${Math.floor(1000 + Math.random() * 9000)}`,
        name: `User ${Math.floor(1 + Math.random() * 100)}`,
        timestamp: new Date().toLocaleTimeString(),
      };
      setLogData((prevData) => [newEntry, ...prevData]);
    };

    const interval = setInterval(simulateRFIDScan, 3000);
    return () => clearInterval(interval);
  }, []);

  // Hitung data untuk halaman saat ini
  const totalPages = Math.ceil(logData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = logData.slice(startIndex, endIndex);

  // Fungsi untuk mengubah halaman
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <div className="flex-1 p-6 bg-white">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Absensi Karyawan
          </h1>
          {/* Gambar RFID Card */}
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Letakkan RFID Tag di pemindai
            </h2>
            <div className="bg-white shadow-md flex items-center justify-center rounded-lg p-4">
              <img
                src={tapCardGif}
                alt="RFID Tag"
                className="w-60 h-auto mb-4"
              />
            </div>
          </div>

          <div className="p-6 min-h-screen">
            <div className="max-w-5xl mx-auto">
              {/* Header */}
              <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                RFID Attendance Log
              </h1>

              {/* Log Kehadiran */}
              <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-3">
                  Log Kehadiran
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-left text-gray-600">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 font-medium text-gray-700">
                          #
                        </th>
                        <th className="px-4 py-2 font-medium text-gray-700">
                          Waktu
                        </th>
                        <th className="px-4 py-2 font-medium text-gray-700">
                          ID RFID
                        </th>
                        <th className="px-4 py-2 font-medium text-gray-700">
                          Nama
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedData.map((entry, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }
                        >
                          <td className="px-4 py-2">
                            {startIndex + index + 1}
                          </td>
                          <td className="px-4 py-2">{entry.timestamp}</td>
                          <td className="px-4 py-2">{entry.id}</td>
                          <td className="px-4 py-2">{entry.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Kontrol Pagination */}
                {logData.length > itemsPerPage && (
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={goToPreviousPage}
                      className={`px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none ${
                        currentPage === 1 && "opacity-50 cursor-not-allowed"
                      }`}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    <span className="text-gray-600">
                      Halaman {currentPage} dari {totalPages}
                    </span>
                    <button
                      onClick={goToNextPage}
                      className={`px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none ${
                        currentPage === totalPages &&
                        "opacity-50 cursor-not-allowed"
                      }`}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Absensi;
