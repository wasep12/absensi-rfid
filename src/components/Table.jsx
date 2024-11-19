const Table = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white shadow-md rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-4">Nama</th>
            <th className="p-4">Tanggal</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="text-center border-b">
              <td className="p-4">{row.name}</td>
              <td className="p-4">{row.date}</td>
              <td
                className={`p-4 ${
                  row.status === "Hadir" ? "text-green-600" : "text-red-600"
                }`}
              >
                {row.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
