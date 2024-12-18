import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import tapCardGif from "../assets/tap-card.gif";
import waiting from "../assets/waiting.gif";
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

    const interval = setInterval(simulateRFIDScan, 5000);
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

  const dummyData = {
    1234567890: {
      photo: "https://via.placeholder.com/150",
      name: "John Doe",
      position: "Software Engineer",
      timeIn: "08:45 AM",
      status: "Late",
      timeDifference: 15, // in minutes
    },
    9876543210: {
      photo: "https://via.placeholder.com/150",
      name: "Jane Smith",
      position: "HR Manager",
      timeIn: "08:30 AM",
      status: "Early",
      timeDifference: 10, // in minutes
    },
    1122334455: {
      photo: "https://via.placeholder.com/150",
      name: "Michael Brown",
      position: "System Analyst",
      timeIn: "09:00 AM",
      status: "Late",
      timeDifference: 30, // in minutes
    },
  };

  const [currentCard, setCurrentCard] = useState(null);

  useEffect(() => {
    const cardKeys = Object.keys(dummyData);

    const interval = setInterval(() => {
      // Simulate RFID scanning by picking a random card
      const randomCardKey =
        cardKeys[Math.floor(Math.random() * cardKeys.length)];
      setCurrentCard(dummyData[randomCardKey]);
    }, 5000); // Change card every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Data karyawan beserta jabatan (untuk testing)
  const karyawan = [
    { id: 1, nama: "Abdul Haris Nasution", jabatan: "Direktur Utama" },
    { id: 2, nama: "Arifin", jabatan: "General Manager" },
    { id: 3, nama: "Finata", jabatan: "General Affair" },
    { id: 4, nama: "Nopi", jabatan: "Administrasi dan Keuangan" },
    { id: 5, nama: "Fahrul Rismawan", jabatan: "Data Analyst" },
  ];

  // State untuk menyimpan data absensi dan pencarian
  const [absensiData, setAbsensiData] = useState(
    karyawan.map((karyawan) => ({
      ...karyawan,
      status: "",
      keterangan: "",
    }))
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Fungsi untuk mengubah status dan keterangan absensi
  const handleAbsensiChange = (id, field, value) => {
    setAbsensiData((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Filter karyawan berdasarkan pencarian nama
  const filteredKaryawan = absensiData.filter((karyawan) =>
    karyawan.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fungsi untuk menyimpan absensi
  const handleSaveAbsensi = () => {
    // Logika untuk menyimpan absensi (misalnya, kirim ke server)
    alert("Absensi telah disimpan!");
  };

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
            Absensi Karyawan
          </h1>
          {/* Gambar RFID Card */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Letakkan RFID Tag di pemindai
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Gambar GIF */}
              <div className="bg-white shadow-md rounded-lg p-4 flex-1 md:max-w-lg w-full h-[400px] flex items-center justify-center">
                <img
                  src={tapCardGif}
                  alt="RFID Tag"
                  className="w-full h-auto object-contain sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-128 lg:h-128"
                />
              </div>

              {/* RFID Card Display */}
              <div className="flex-1 md:max-w-md w-full h-[400px]">
                {currentCard ? (
                  <div className="bg-white rounded-lg shadow-lg p-6 h-full">
                    <img
                      src={currentCard.photo}
                      alt={currentCard.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4"
                    />
                    <h2 className="text-lg font-semibold text-center">
                      {currentCard.name}
                    </h2>
                    <p className="text-gray-600 text-center">
                      {currentCard.position}
                    </p>
                    <div className="mt-4 text-center">
                      <p>
                        <strong>Time In:</strong> {currentCard.timeIn}
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        {currentCard.status === "Late" ? (
                          <span className="text-red-500">
                            {currentCard.status} (+{currentCard.timeDifference}{" "}
                            mins)
                          </span>
                        ) : (
                          <span className="text-green-500">
                            {currentCard.status} (-{currentCard.timeDifference}{" "}
                            mins)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-lg p-6 h-full text-gray-500 text-center  flex flex-col items-center">
                    <img
                      src={waiting}
                      alt="waiting"
                      className="w-48 h-48 mb-4"
                    />
                    <p className="text-base">Waiting for card scan...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Absensi Manual Karyawan
            </h2>

            {/* Input Pencarian dan Tombol Simpan Kehadiran */}
            <div className="mb-4 flex items-center space-x-4">
              <input
                type="text"
                placeholder="Cari nama karyawan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 border border-gray-300 rounded-md flex-1"
              />
              <button
                onClick={handleSaveAbsensi}
                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Simpan Kehadiran
              </button>
            </div>

            {/* Tabel Absensi */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
              <table className="min-w-full table-auto">
                <thead className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white">
                  <tr>
                    <th className="py-2 px-4 text-left">Nama</th>
                    <th className="py-2 px-4 text-left">Jabatan</th>
                    <th className="py-2 px-4 text-left">Absensi</th>
                    <th className="py-2 px-4 text-left">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKaryawan.map((karyawan) => (
                    <tr key={karyawan.id} className="border-b">
                      <td className="py-2 px-4">{karyawan.nama}</td>
                      <td className="py-2 px-4">{karyawan.jabatan}</td>

                      <td className="py-2 px-4">
                        <select
                          value={karyawan.status}
                          onChange={(e) =>
                            handleAbsensiChange(
                              karyawan.id,
                              "status",
                              e.target.value
                            )
                          }
                          className="border border-gray-300 rounded-md p-2 w-full"
                        >
                          <option value="" disabled selected>
                            Pilih Absensi
                          </option>
                          <option value="Masuk">Masuk</option>
                          <option value="Pulang">Pulang</option>
                        </select>
                      </td>

                      <td className="py-2 px-4">
                        <select
                          value={karyawan.keterangan}
                          onChange={(e) =>
                            handleAbsensiChange(
                              karyawan.id,
                              "keterangan",
                              e.target.value
                            )
                          }
                          className="border border-gray-300 rounded-md p-2 w-full"
                        >
                          <option value="" disabled selected>
                            Pilih Keterangan
                          </option>
                          <option value="Masuk">Hadir</option>
                          <option value="Tidak Masuk">Tidak Hadir</option>
                          <option value="Sakit">Sakit</option>
                          <option value="Cuti">Cuti</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-6 min-h-screen">
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
