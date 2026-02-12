import React from "react";

const StudentTable = () => {
  return (
    <div className="w-full ">
      <table className="w-full ">
        <thead className="border border-black">
          <tr className="">
            <th className="py-2">S no</th>
            <th className="py-2">Technology</th>
            <th className="py-2">Total Questions</th>
            <th className="py-2">Correct Answer</th>
            <th className="py-2">wrong Answer</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-black">
            <td className="text-center py-2">1</td>
            <td className="text-center py-2">React</td>
            <td className="text-center py-2">20</td>
            <td className="text-center py-2">12</td>
            <td className="text-center py-2">10</td>
            <td className="text-center py-2">View</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
