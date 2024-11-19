import React from "react";

const OfficeMap = () => {
  // Ganti dengan link embed dari Google Maps
  const officeLocation =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3849412756936!2d106.52486867337818!3d-6.212856460851455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa853dc4e2c1e3cfb%3A0x4b42fb430bb3631f!2sPT.%20SKT%20GLOBAL%20INDONESIA!5e0!3m2!1sid!2sid!4v1732024647653!5m2!1sid!2sid";

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Lokasi Kantor
      </h2>
      <iframe
        title="Office Map"
        className="w-full h-96 rounded-lg"
        src={officeLocation} // Embed link Google Maps
        frameBorder="0"
        style={{ border: "0" }}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default OfficeMap;
