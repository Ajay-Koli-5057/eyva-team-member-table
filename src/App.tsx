import React from "react";
import Table from "./component/Table"; 

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-5 flex justify-center">
      <div className="max-w-7xl w-full">
        <Table />
      </div>
    </div>
  );
};

export default App;
