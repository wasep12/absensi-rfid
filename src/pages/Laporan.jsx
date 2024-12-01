import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useState } from "react";
import { FaFileCsv, FaFilePdf } from "react-icons/fa";

const Laporan = () => {
  // Simulasi data laporan
  const simulatedData = [
    { id: 1, name: "John Doe", date: "2024-11-30", status: "Masuk" },
    { id: 2, name: "Jane Smith", date: "2024-11-29", status: "Sakit" },
    { id: 3, name: "John Doe", date: "2024-11-28", status: "Cuti" },
    { id: 4, name: "Alice Johnson", date: "2024-11-27", status: "Ijin" },
    { id: 5, name: "John Doe", date: "2024-11-26", status: "Tidak Masuk" },
    { id: 6, name: "Emily Clark", date: "2024-11-25", status: "Masuk" },
    { id: 7, name: "John Doe", date: "2024-11-24", status: "Masuk" },
    { id: 8, name: "Chris Hall", date: "2024-11-23", status: "Masuk" },
    { id: 9, name: "Jane Smith", date: "2024-10-15", status: "Ijin" },
    { id: 10, name: "Alice Johnson", date: "2024-10-10", status: "Cuti" },
  ];

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("2024"); // Tahun default 2024
  const [searchTerm, setSearchTerm] = useState("");

  // Fungsi untuk menghitung rekap per kategori dan nama
  const calculateSummary = () => {
    if (!selectedMonth || !selectedYear) return null;

    const filteredData = simulatedData.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getMonth() + 1 === parseInt(selectedMonth) &&
        itemDate.getFullYear() === parseInt(selectedYear)
      );
    });

    const summary = { Masuk: 0, "Tidak Masuk": 0, Ijin: 0, Sakit: 0, Cuti: 0 };
    const perEmployee = {};

    filteredData.forEach((item) => {
      summary[item.status]++;
      if (!perEmployee[item.name]) {
        perEmployee[item.name] = {
          Masuk: 0,
          "Tidak Masuk": 0,
          Ijin: 0,
          Sakit: 0,
          Cuti: 0,
        };
      }
      perEmployee[item.name][item.status]++;
    });

    return { summary, perEmployee, filteredData };
  };

  const result = calculateSummary();

  // Fungsi untuk mengunduh CSV
  const downloadCSV = () => {
    if (!result) return;

    const { perEmployee } = result;
    let csvContent = "Nama,Masuk,Tidak Masuk,Ijin,Sakit,Cuti\n";

    Object.entries(perEmployee).forEach(([name, data]) => {
      csvContent += `${name},${data.Masuk},${data["Tidak Masuk"]},${data.Ijin},${data.Sakit},${data.Cuti}\n`;
    });
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `Laporan-${selectedMonth}-${selectedYear}.csv`);
  };

  // Fungsi untuk mengunduh PDF
  const downloadPDF = () => {
    if (!result) return;

    const { perEmployee } = result;
    const doc = new jsPDF();
    doc.text("Laporan Kehadiran", 14, 20);

    const data = Object.entries(perEmployee).map(([name, data]) => [
      name,
      data.Masuk,
      data["Tidak Masuk"],
      data.Ijin,
      data.Sakit,
      data.Cuti,
    ]);

    doc.autoTable({
      head: [["Nama", "Masuk", "Tidak Masuk", "Ijin", "Sakit", "Cuti"]],
      body: data,
      columnStyles: {
        0: { cellWidth: 40 }, // Nama
        1: { cellWidth: 20 }, // Masuk
        2: { cellWidth: 30 }, // Tidak Masuk
        3: { cellWidth: 20 }, // Ijin
        4: { cellWidth: 20 }, // Sakit
        5: { cellWidth: 20 }, // Cuti
      },
      margin: { top: 30 },
    });

    doc.save(`Laporan-${selectedMonth}-${selectedYear}.pdf`);
  };

  const cardColors = [
    "bg-green-500",
    "bg-red-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-100">
          <h1 className="md:text-left text-center text-3xl font-semibold text-gray-800 mb-6">
            Laporan Bulanan
          </h1>

          {/* Form untuk memilih bulan dan tahun */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Pilih Bulan dan Tahun
            </label>
            <div className="flex items-center space-x-4">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2"
              >
                <option value="">Bulan</option>
                {[
                  "Januari",
                  "Februari",
                  "Maret",
                  "April",
                  "Mei",
                  "Juni",
                  "Juli",
                  "Agustus",
                  "September",
                  "Oktober",
                  "November",
                  "Desember",
                ].map((month, index) => (
                  <option key={index + 1} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>

              <input
                type="number"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                placeholder="Tahun"
                className="border border-gray-300 rounded px-4 py-2"
              />
            </div>
          </div>

          {/* Rekap Kehadiran dalam Card */}
          {result && (
            <>
              <div className="grid md:grid-cols-5 grid-cols-2 gap-4 mb-8">
                {Object.entries(result.summary).map(([key, value], index) => (
                  <div
                    key={key}
                    className={`rounded-lg p-4 flex flex-col items-center justify-center text-center text-white ${cardColors[index]}`}
                  >
                    <h2 className="text-xl font-bold">{value}</h2>
                    <p className="text-sm">{key}</p>
                  </div>
                ))}
              </div>

              {/* Tabel Rekap Data Per Karyawan */}
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Rekap Kehadiran Per Karyawan
              </h2>
              <div className="mt-6 space-x-4">
                {/* Input untuk pencarian */}
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari berdasarkan nama"
                  className="border border-gray-300 rounded px-4 py-2 mb-4"
                />
                {/* Tombol Unduhan */}
                <button
                  onClick={downloadCSV}
                  className="bg-green-500 text-white px-4 py-2 rounded items-center justify-center"
                >
                  {/* Teks akan disembunyikan pada ukuran mobile, ikon hanya muncul di mobile */}
                  <span className="hidden sm:inline">Unduh CSV</span>
                  <FaFileCsv className="sm:hidden text-xl" />
                </button>

                <button
                  onClick={downloadPDF}
                  className="bg-blue-500 text-white px-4 py-2 rounded items-center justify-center"
                >
                  {/* Teks akan disembunyikan pada ukuran mobile, ikon hanya muncul di mobile */}
                  <span className="hidden sm:inline">Unduh PDF</span>
                  <FaFilePdf className="sm:hidden text-xl" />
                </button>
              </div>
              <div className="overflow-x-auto shadow-md rounded-lg mb-8">
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-sm sm:text-base">Nama</th>
                      <th className="px-4 py-2 text-sm sm:text-base">Masuk</th>
                      <th className="px-4 py-2 text-sm sm:text-base">
                        Tidak Masuk
                      </th>
                      <th className="px-4 py-2 text-sm sm:text-base">Ijin</th>
                      <th className="px-4 py-2 text-sm sm:text-base">Sakit</th>
                      <th className="px-4 py-2 text-sm sm:text-base">Cuti</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(result.perEmployee)
                      .filter(([name]) =>
                        name.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map(([name, data]) => (
                        <tr key={name}>
                          <td className="px-4 py-2">{name}</td>
                          <td className="px-4 py-2">{data.Masuk}</td>
                          <td className="px-4 py-2">{data["Tidak Masuk"]}</td>
                          <td className="px-4 py-2">{data.Ijin}</td>
                          <td className="px-4 py-2">{data.Sakit}</td>
                          <td className="px-4 py-2">{data.Cuti}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Laporan;
