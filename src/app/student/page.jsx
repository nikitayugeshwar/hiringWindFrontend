import React from "react";
import Cards from "./_components/Cards";
import StudentTable from "./_components/StudentTable";

const page = () => {
  return (
    <div className="w-full flex flex-col gap-5 p-5">
      <div className="w-full flex flex-row gap-5">
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </div>
      <StudentTable />
    </div>
  );
};

export default page;
