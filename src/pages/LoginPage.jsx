import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Ref untuk input fields
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  // Username dan password statis
  const validUsername = "admin";
  const validPassword = "admin123";

  const handleLogin = (e) => {
    e.preventDefault();

    // Pengecekan form tidak boleh kosong
    if (!username) {
      setErrorMessage("Username tidak boleh kosong.");
      usernameRef.current.focus(); // Fokuskan input username
      return;
    }
    if (!password) {
      setErrorMessage("Password tidak boleh kosong.");
      passwordRef.current.focus(); // Fokuskan input password
      return;
    }

    // Cek apakah username dan password yang dimasukkan valid
    if (username === validUsername && password === validPassword) {
      // Simpan token di localStorage setelah login berhasil
      localStorage.setItem("token", "yourGeneratedTokenHere");

      // Jika Remember Me dicentang, simpan pilihan di localStorage
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      navigate("/admin-dashboard"); // Redirect ke halaman dashboard
    } else {
      setErrorMessage("Username atau password salah.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              ref={usernameRef} // Menambahkan ref untuk fokus
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              ref={passwordRef} // Menambahkan ref untuk fokus
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-700">
              Remember me
            </label>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded mt-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
