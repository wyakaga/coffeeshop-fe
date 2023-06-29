/* eslint-disable react/prop-types */
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ProductCard({ id, src, name, price }) {
  const adminRole = useSelector((state) => state.auth.data?.data?.role_id);

  return (
    <div className="products-wrapper flex flex-col items-center bg-white pt-0 pb-6 px-3 rounded-[30px] shadow-[0px_30px_60px_rgba(57,57,57,0.1)] relative cursor-pointer transition-transform duration-300 hover:transform hover:translate-y-[-1rem]">
      <Link to={`detail/${id}`} className="flex flex-col items-center">
        <div className="w-[8.938rem] h-[8.938rem] rounded-full transform translate-y-[-35%]">
          <img
            src={src}
            alt="product image"
            className="w-full h-full rounded-full object-cover object-center"
          />
        </div>
        <p className="m-0 text-center font-poppins font-black text-[1.375rem]">
          {name}
        </p>
        <p className="m-0 text-center font-poppins font-bold text-[1.063rem] text-first-brown">
          IDR {price.toLocaleString("id-ID")}
        </p>
      </Link>
      {adminRole && <Link to={`detail/${id}`} className="absolute bottom-0 right-0">
        <div className="group relative flex">
          <div
            id="pen"
            className="bg-first-brown hover:bg-first-yellow active:bg-first-yellow duration-300 cursor-pointer rounded-full h-8 w-8 flex justify-center items-center"
          >
            <svg
              width="18"
              height="20"
              viewBox="0 0 20 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.6168 1.8356C14.8552 1.57068 15.1383 1.36054 15.4498 1.21716C15.7613 1.07379 16.0952 1 16.4324 1C16.7696 1 17.1035 1.07379 17.415 1.21716C17.7265 1.36054 18.0095 1.57068 18.248 1.8356C18.4864 2.10051 18.6755 2.41501 18.8046 2.76114C18.9336 3.10727 19 3.47825 19 3.8529C19 4.22755 18.9336 4.59853 18.8046 4.94466C18.6755 5.29079 18.4864 5.60529 18.248 5.87021L5.99283 19.487L1 21L2.36168 15.4524L14.6168 1.8356Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="absolute top-0 right-10 font-poppins scale-0 transition-all rounded bg-black py-2 px-4 text-xs text-white whitespace-nowrap group-hover:scale-100 group-active:scale-0">
            Edit product
          </span>
        </div>
      </Link>}
    </div>
  );
}

export default ProductCard;
