import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const DataKaryawan = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />
        <div></div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DataKaryawan;
