const Card = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded shadow-md flex items-center">
      <div className="p-4 bg-blue-500 rounded-full text-white">{icon}</div>
      <div className="ml-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default Card;
