import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Referensi untuk tombol dan dropdown
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Menambahkan event listener untuk klik di luar dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Jika klik di luar dropdown atau tombol, tutup dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    // Menambahkan event listener klik saat komponen dipasang
    document.addEventListener("click", handleClickOutside);

    // Membersihkan event listener saat komponen dibersihkan
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []); // Kosongkan dependensi untuk hanya dijalankan sekali

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white p-5 shadow-md sticky top-0 z-50">
      <div className="max-w-8xl flex justify-between items-center">
        <div className="icond ml-3 md:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8"
          >
            <path
              fillRule="evenodd"
              d="M5.636 4.575a.75.75 0 0 1 0 1.061 9 9 0 0 0 0 12.728.75.75 0 1 1-1.06 1.06c-4.101-4.1-4.101-10.748 0-14.849a.75.75 0 0 1 1.06 0Zm12.728 0a.75.75 0 0 1 1.06 0c4.101 4.1 4.101 10.75 0 14.85a.75.75 0 1 1-1.06-1.061 9 9 0 0 0 0-12.728.75.75 0 0 1 0-1.06ZM7.757 6.697a.75.75 0 0 1 0 1.06 6 6 0 0 0 0 8.486.75.75 0 0 1-1.06 1.06 7.5 7.5 0 0 1 0-10.606.75.75 0 0 1 1.06 0Zm8.486 0a.75.75 0 0 1 1.06 0 7.5 7.5 0 0 1 0 10.606.75.75 0 0 1-1.06-1.06 6 6 0 0 0 0-8.486.75.75 0 0 1 0-1.06ZM9.879 8.818a.75.75 0 0 1 0 1.06 3 3 0 0 0 0 4.243.75.75 0 1 1-1.061 1.061 4.5 4.5 0 0 1 0-6.364.75.75 0 0 1 1.06 0Zm4.242 0a.75.75 0 0 1 1.061 0 4.5 4.5 0 0 1 0 6.364.75.75 0 0 1-1.06-1.06 3 3 0 0 0 0-4.243.75.75 0 0 1 0-1.061ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <h1 className="text-xl font-semibold hidden ml-3 md:block">
          <Link to="/">ABSENSI IoT RFID</Link>
        </h1>

        {/* Navigasi Profil dan Menu */}
        <nav className="flex items-center space-x-4 ml-auto">
          {/* Profile Icon for Desktop */}
          <div className="relative">
            <button
              ref={buttonRef}
              className="flex items-center space-x-2"
              onClick={toggleDropdown}
            >
              <img
                src="https://via.placeholder.com/40" // Gambar profil (ganti dengan URL gambar yang sesuai)
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 bg-gray-100 border-transparent bg-clip-border"
              />
            </button>

            {/* Dropdown Menu untuk Profil */}
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-50"
              >
                <ul>
                  <li>
                    <Link
                      to="/edit-profile"
                      className="block px-4 py-2 hover:bg-gray-100 rounded-tr-lg rounded-tl-lg"
                    >
                      Edit Profil
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="block px-4 py-2 hover:bg-gray-100">
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
