import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const Setting = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />
        <div className="flex-1 p-6  bg-gray-100">
          <h1 className="md:text-left text-center text-3xl font-semibold text-gray-800 mb-6">
            Setting
          </h1>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Setting;
