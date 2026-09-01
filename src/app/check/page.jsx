"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const limit = 5;

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users?page=${page}$limit=${limit}`,
        );
        setProduct(response.data);
        setTotalPage(response.data.pages);
      } catch (error) {
        console.log("error while fecthing the product", error);
      }
    };
    getProduct();
  }, [page]);
  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5 text-center">User List</h2>

      <div className="grid gap-4">
        {product.map((item, index) => {
          return (
            <>
              <div key={index}>
                <h1>{item.name}</h1>
                <h1>{item.email}</h1>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
