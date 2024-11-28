import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import tapCardGif from "../assets/tap-card.gif";
import waiting from "../assets/waiting.gif";
import React, { useState, useEffect } from "react";

const Absensi = () => {
  const [logData, setLogData] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [dataKaryawan, setKaryawanData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPageAbsen = 10;

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

  // Simulasi data karyawan
  useEffect(() => {
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

    const cardKeys = Object.keys(dummyData);
    const interval = setInterval(() => {
      const randomCardKey =
        cardKeys[Math.floor(Math.random() * cardKeys.length)];
      setCurrentCard(dummyData[randomCardKey]);
    }, 5000); // Change card every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Ambil data karyawan dari localStorage
  useEffect(() => {
    // Ambil data dari localStorage saat komponen dimuat
    const storedData = localStorage.getItem("karyawanData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setKaryawanData(parsedData); // Simpan data ke state
    } else {
      console.log("Data tidak ditemukan di localStorage");
    }
  }, []);

  // Filter data berdasarkan pencarian
  const filteredData = dataKaryawan.filter(
    (karyawan) =>
      karyawan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      karyawan.rfidId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      karyawan.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPageAbsen;
  const indexOfFirstItem = indexOfLastItem - itemsPerPageAbsen;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi untuk mengubah aksi kehadiran
  const handleKehadiranChange = (id, value) => {
    setDataKaryawan((prevData) =>
      prevData.map((karyawan) =>
        karyawan.rfidId === id ? { ...karyawan, kehadiran: value } : karyawan
      )
    );
  };

  // Fungsi untuk menyimpan data
  const handleSave = () => {
    localStorage.setItem("dataKaryawan", JSON.stringify(dataKaryawan));
    alert("Data absensi berhasil disimpan!");
  };

  // Hitung total halaman untuk pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPageAbsen);

  // Fungsi untuk mengonversi logData ke format CSV
  const downloadCSV = () => {
    const csvRows = [];
    const headers = ["ID", "Nama Karyawan", "Waktu"];
    csvRows.push(headers.join(",")); // Menambahkan header CSV

    // Menambahkan data log ke dalam CSV
    logData.forEach((entry) => {
      csvRows.push([entry.id, entry.name, entry.timestamp].join(","));
    });

    // Membuat file CSV dan memulai unduhan
    const csvFile = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(csvFile);
    link.download = "log_absensi.csv";
    link.click();
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

          {/* Absensi Manual Karyawan */}
          <div className="mt-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              Absensi Manual Karyawan
            </h2>
            {/* Input Pencarian dan Tombol Simpan */}
            <div className="mb-4 flex items-center space-x-4">
              <input
                type="text"
                placeholder="Cari nama, RFID, atau posisi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 border border-gray-300 rounded-md flex-1"
              />
              <button
                onClick={handleSave}
                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Simpan Kehadiran
              </button>
            </div>
            {/* Tabel Absensi */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
              <table className="min-w-full table-auto">
                <thead className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white text-center">
                  <tr>
                    <th className="py-2 px-2 text-center hidden sm:table-cell">
                      Profile
                    </th>
                    <th className="py-2 px-2 text-center">ID</th>
                    <th className="py-2 px-2 text-center">Nama</th>
                    <th className="py-2 px-2 text-center hidden sm:table-cell">
                      Jenis Kelamin
                    </th>
                    <th className="py-2 px-2 text-center hidden sm:table-cell">
                      Posisi
                    </th>
                    <th className="py-2 px-2 text-center">Kehadiran</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((karyawan) => (
                    <tr key={karyawan.rfidId}>
                      <td className="py-2 px-2 hidden sm:table-cell">
                        <img
                          src={karyawan.photo}
                          alt={karyawan.name}
                          className="w-10 h-10 rounded-full"
                        />
                      </td>
                      <td className="py-2 px-2">{karyawan.rfidId}</td>
                      <td className="py-2 px-2">{karyawan.name}</td>
                      <td className="py-2 px-2 hidden sm:table-cell">
                        {karyawan.gender}
                      </td>
                      <td className="py-2 px-2 hidden sm:table-cell">
                        {karyawan.position}
                      </td>
                      <td className="py-2 px-2 text-center">
                        <select
                          value={karyawan.kehadiran || ""}
                          onChange={(e) =>
                            handleKehadiranChange(
                              karyawan.rfidId,
                              e.target.value
                            )
                          }
                          className="border border-gray-300 rounded-md px-2 py-1"
                        >
                          <option value="">Pilih Kehadiran</option>
                          <option value="Hadir">Hadir</option>
                          <option value="Tidak Hadir">Tidak Hadir</option>
                          <option value="Izin">Izin</option>
                          <option value="Sakit">Sakit</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="py-2 px-4 bg-blue-700 text-gray-200 rounded-md hover:bg-blue-800 disabled:opacity-50"
              >
                Prev
              </button>
              <span className="py-2 px-4 text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="py-2 px-4 bg-blue-700 text-gray-200 rounded-md hover:bg-blue-800 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="container mx-auto">
              {/* Log Absensi */}
              <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                  Log Absensi
                </h2>

                {/* Tabel dengan batasan 10 entri */}
                <div
                  className="overflow-y-scroll"
                  style={{ maxHeight: "300px" }}
                >
                  <table className="table-auto w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border p-2 text-left">ID</th>
                        <th className="border p-2 text-left">Nama Karyawan</th>
                        <th className="border p-2 text-left">Waktu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logData.slice(0, 10).map((entry, index) => (
                        <tr key={index}>
                          <td className="border p-2">{entry.id}</td>
                          <td className="border p-2">{entry.name}</td>
                          <td className="border p-2">{entry.timestamp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Tombol untuk mengunduh CSV */}
                <div className="mt-4 text-center">
                  <button
                    onClick={downloadCSV}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                  >
                    Unduh CSV
                  </button>
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Absensi;
