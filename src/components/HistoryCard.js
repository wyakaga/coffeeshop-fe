/* eslint-disable react/prop-types */
import React, { useState, useRef } from "react";

import garbageIcon from "../assets/icon/garbage-icon.svg";

function HistoryCard({ item, index, deleteHandler }) {

  const parentRef = useRef();

  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

  const optionShownHandler = (index) => {
    setSelectedItemIndex(index);
  };

  const optionHiddenHandler = (e) => {
    e.stopPropagation();
    setSelectedItemIndex(-1);
  };

  return (
    <div
      key={index}
      ref={parentRef}
      onClick={() => optionShownHandler(index)}
      className={`cards relative cursor-pointer flex flex-row ${
        selectedItemIndex === index ? "bg-white/50" : "bg-white"
      } rounded-3xl justify-center items-center gap-5 lg:gap-3 py-2 lg:py-4 pl-6 lg:pl-0 lg:px-2`}
    >
      <div>
        <div className="card-img rounded-full h-14 lg:h-20 w-14 lg:w-20 overflow-hidden">
          <img
            src={item.img}
            alt="Picture of menu which has been bought"
            className="w-full h-full rounded-full object-cover object-center"
          />
        </div>
      </div>
      <div className="card-txt min-w-[157.59px] lg:min-w-[246.23px]">
        <p className="font-poppins font-bold lg:text-[1.563rem] text-black">
          {item.name}
        </p>
        <p className="font-poppins font-normal lg:text-xl text-second-brown">
          {item.price.toLocaleString("id-ID")}
        </p>
        <p className="font-poppins font-normal lg:text-xl text-first-brown">
          {`${item.transaction_status
            .charAt(0)
            .toUpperCase()}${item.transaction_status.slice(1)}`}
        </p>
      </div>
      <div
        onClick={() => deleteHandler(item)}
        className={`garbage-icon ${
          selectedItemIndex === index ? "block" : "hidden"
        } absolute top-[-20px] right-[35px]`}
      >
        <div className="group relative flex">
          <div className="flex cursor-pointer bg-first-brown w-[40px] h-[40px] justify-center items-center rounded-full opacity-100">
            <img src={garbageIcon} alt="garbage icon" />
          </div>
          <span className="absolute top-12 -right-2 scale-0 transition-all rounded bg-black py-2 px-4 text-xs text-white whitespace-nowrap group-hover:scale-100 group-active:scale-0">
            Delete
          </span>
        </div>
      </div>
      <div
        onClick={optionHiddenHandler}
        className={`close-icon ${
          selectedItemIndex === index ? "block" : "hidden"
        } absolute top-[-20px] right-[-15px]`}
      >
        <div className="group relative flex">
          <div className="flex cursor-pointer bg-first-yellow text-first-brown font-poppins font-bold h-[40px] w-[40px] justify-center items-center rounded-full opacity-100">
            <i className="material-icons font-black">close</i>
          </div>
          <span className="absolute top-12 -right-2 scale-0 transition-all rounded bg-black py-2 px-4 text-xs text-white whitespace-nowrap group-hover:scale-100 group-active:scale-0">
            Close
          </span>
        </div>
      </div>
    </div>
  );
}

export default HistoryCard;
