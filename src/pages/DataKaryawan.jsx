import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const DataKaryawan = () => {
  const [karyawanData, setKaryawanData] = useState([]);
  const [search, setSearch] = useState("");
  const [editData, setEditData] = useState(null);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch data from localStorage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("karyawanData"));
    if (storedData) {
      setKaryawanData(storedData); // Load data from localStorage
    }
  }, []);

  // Save the karyawan data back to localStorage whenever it changes
  useEffect(() => {
    if (karyawanData.length > 0) {
      localStorage.setItem("karyawanData", JSON.stringify(karyawanData));
    }
  }, [karyawanData]);

  // Filter based on search query
  const filteredData = karyawanData.filter(
    (karyawan) =>
      karyawan.name.toLowerCase().includes(search.toLowerCase()) ||
      karyawan.rfidId.includes(search.toLowerCase()) ||
      karyawan.position.toLowerCase().includes(search.toLowerCase()) ||
      karyawan.address.toLowerCase().includes(search.toLowerCase()) ||
      karyawan.gender.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination: Get data for the current page
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);

  // Handle delete Karyawan
  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteConfirm(true);
  };

  const confirmDelete = () => {
    const updatedData = karyawanData.filter(
      (karyawan) => karyawan.id !== deleteId
    );
    setKaryawanData(updatedData); // Update state and localStorage
    setIsDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setIsDeleteConfirm(false);
  };

  // Handle edit Karyawan
  const handleEdit = (id) => {
    const karyawan = karyawanData.find((item) => item.id === id);
    setEditData({ ...karyawan });
  };

  const cancelEdit = () => {
    setEditData(null);
  };

  const saveEdit = () => {
    const updatedData = karyawanData.map((karyawan) =>
      karyawan.id === editData.id ? editData : karyawan
    );
    setKaryawanData(updatedData); // Update state and localStorage
    setEditData(null);
  };

  // Handle pagination
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
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
        <div className="flex-1 p-6 bg-gray-100">
          <h1 className="md:text-left text-center text-3xl font-semibold text-gray-800 mb-6">
            Dashboard Absensi
          </h1>
          <div className="container mx-auto">
            <div className="mb-4">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari karyawan..."
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
              <table className="min-w-full table-auto">
                <thead className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white">
                  <tr>
                    <th className="py-2 px-2 border-b">No</th>
                    <th className="py-2 px-2 border-b">Foto</th>
                    <th className="py-2 px-2 border-b">Nama</th>
                    <th className="py-2 px-2 border-b">RFID ID</th>
                    <th className="py-2 px-2 hidden sm:table-cell border-b">
                      Posisi
                    </th>
                    <th className="py-2 px-2 hidden sm:table-cell border-b">
                      Alamat
                    </th>
                    <th className="py-2 px-2 hidden sm:table-cell border-b">
                      Jenis Kelamin
                    </th>
                    <th className="py-2 px-2 border-b">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((karyawan, index) => (
                    <tr key={karyawan.id}>
                      <td className="py-2 px-2 border-b text-center">
                        {index + 1 + (currentPage - 1) * itemsPerPage}
                      </td>
                      <td className="py-2 px-2 border-b text-center">
                        <img
                          src={karyawan.photo}
                          alt={karyawan.name}
                          className="w-10 h-10 rounded-full"
                        />
                      </td>
                      <td className="py-2 px-2 border-b">{karyawan.name}</td>
                      <td className="py-2 px-2 border-b">{karyawan.rfidId}</td>
                      <td className="py-2 px-2 border-b hidden sm:table-cell">
                        {karyawan.position}
                      </td>
                      <td className="py-2 px-2 border-b hidden sm:table-cell">
                        {karyawan.address}
                      </td>
                      <td className="py-2 px-2 border-b hidden sm:table-cell">
                        {karyawan.gender}
                      </td>
                      <td className="py-4 px-2  flex items-center text-center ">
                        <button
                          onClick={() => handleEdit(karyawan.id)}
                          className="bg-blue-500 text-white p-2 rounded mr-2"
                        >
                          <FaEdit className="h-3 w-3" /> {/* Ikon edit */}
                        </button>
                        <button
                          onClick={() => handleDelete(karyawan.id)}
                          className="bg-red-500 text-white p-2 rounded"
                        >
                          <FaTrashAlt className="h-3 w-3" /> {/* Ikon hapus */}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-between">
              <button
                onClick={prevPage}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Previous
              </button>
              <button
                onClick={nextPage}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            </div>

            {/* Delete Confirmation Modal */}
            {isDeleteConfirm && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-md shadow-lg">
                  <p>Apakah Anda yakin ingin menghapus data ini?</p>
                  <div className="mt-4">
                    <button
                      onClick={confirmDelete}
                      className="bg-red-500 text-white px-4 py-1 rounded mr-2"
                    >
                      Ok
                    </button>
                    <button
                      onClick={cancelDelete}
                      className="bg-gray-500 text-white px-4 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Modal */}
            {editData && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 mt-15 z-50">
                <div className="bg-white p-6 rounded-md shadow-lg w-96">
                  <h2 className="text-lg mb-4">Edit Karyawan</h2>
                  <div>
                    <label className="block">Nama</label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    />
                    <label className="block">Posisi</label>
                    <input
                      type="text"
                      value={editData.position}
                      onChange={(e) =>
                        setEditData({ ...editData, position: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    />
                    <label className="block">Alamat</label>
                    <input
                      type="text"
                      value={editData.address}
                      onChange={(e) =>
                        setEditData({ ...editData, address: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    />
                    <label className="block">Jenis Kelamin</label>
                    <select
                      value={editData.gender || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, gender: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-md mb-4"
                    >
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>

                    <div className="mt-4">
                      <button
                        onClick={saveEdit}
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                      >
                        Simpan
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DataKaryawan;
