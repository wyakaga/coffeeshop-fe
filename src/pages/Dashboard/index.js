import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import { getReports } from "../../utils/https/transaction";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import Chart from "../../components/Chart";

import zulaikha from "../../assets/img/zulaikha.webp";

function Dashboard() {
  const token = useSelector((state) => state.auth.data.token);

  const controller = useMemo(() => new AbortController(), []);

  const pdfRef = useRef();

  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy");

  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    getReports(sortBy, token, controller)
      .then((res) => {
        const { data } = res.data;
        setReportData(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [sortBy]);

  const setTitle = (sortBy) => {
    if (sortBy === "day") {
      return "Daily Report";
    }
    if (sortBy === "week") {
      return "Weekly Report";
    }
    if (
      sortBy === "month" ||
      (sortBy !== "day" && sortBy !== "week" && sortBy !== "month") ||
      !sortBy
    ) {
      return "Monthly Report";
    }
  };

  const setSubtitle = (sortBy) => {
    if (sortBy === "day") {
      return "Last 7 days include today";
    }
    if (sortBy === "week") {
      return "Last 6 weeks include current week";
    }
    if (
      sortBy === "month" ||
      (sortBy !== "day" && sortBy !== "week" && sortBy !== "month") ||
      !sortBy
    ) {
      return "Last 6 months";
    }
  };

  const pdfDownloadHandler = () => {
    const input = pdfRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save(`${setTitle(sortBy)} Chart.pdf`);
    });
  };

  const shareReportHandler = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Copied to clipboard");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  document.title = "Dashboard";

  return (
    <div className="body-wrapper grid grid-cols-1 grid-rows-1">
      {isLoading && <Loader />}
      <Header title="dashboard" />
      <main className="bg-first-white relative py-20 md:px-12 flex flex-col gap-y-12 border-b border-solid border-fourth-gray">
        <section className="title-and-options flex flex-col gap-y-20">
          <div className="title">
            <p className="font-rubik font-bold text-first-brown text-3xl text-center">
              See how your store progress so far
            </p>
          </div>
          <div className="options flex flex-row items-center w-6/12 self-center">
            <div className="daily-option w-1/3 flex flex-col justify-center items-center">
              <input
                type="radio"
                name="options"
                id="day"
                checked={sortBy === "day"}
                onChange={() =>
                  setSearchParams({ sortBy: "day" }, { replace: true })
                }
                className="peer h-10 w-10 appearance-none rounded-full border-8 border-solid border-fourth-gray checked:border-first-brown bg-[#FFFFFF] checked:bg-first-yellow transition-all active:transform active:scale-110 duration-300 cursor-pointer"
              />
              <label
                htmlFor="options"
                className="font-poppins font-normal text-black text-xl peer-checked:font-black duration-300"
              >
                Daily
              </label>
            </div>
            <div className="weekly-option w-1/3 flex flex-col justify-center items-center">
              <input
                type="radio"
                name="options"
                id="week"
                checked={sortBy === "week"}
                onChange={() =>
                  setSearchParams({ sortBy: "week" }, { replace: true })
                }
                className="peer h-10 w-10 appearance-none rounded-full border-8 border-solid border-fourth-gray checked:border-first-brown bg-[#FFFFFF] checked:bg-first-yellow transition-all active:transform active:scale-110 duration-300 cursor-pointer"
              />
              <label
                htmlFor="options"
                className="font-poppins font-normal text-black text-xl peer-checked:font-black duration-300"
              >
                Weekly
              </label>
            </div>
            <div className="monthly-option w-1/3 flex flex-col justify-center items-center">
              <input
                type="radio"
                name="options"
                id="month"
                checked={
                  sortBy === "month" ||
                  (sortBy !== "day" &&
                    sortBy !== "week" &&
                    sortBy !== "month") ||
                  !sortBy
                }
                onChange={() =>
                  setSearchParams({ sortBy: "month" }, { replace: true })
                }
                className="peer h-10 w-10 appearance-none rounded-full border-8 border-solid border-fourth-gray checked:border-first-brown bg-[#FFFFFF] checked:bg-first-yellow transition-all active:transform active:scale-110 duration-300 cursor-pointer"
              />
              <label
                htmlFor="options"
                className="font-poppins font-normal text-black text-xl peer-checked:font-black duration-300"
              >
                Monthly
              </label>
            </div>
          </div>
        </section>
        <section className="main-chart flex flex-col-reverse lg:flex-row gap-y-10 lg:gap-x-10">
          <div
            ref={pdfRef}
            className="left-content w-full lg:w-3/4 flex flex-col p-8 bg-white rounded-[20px] shadow-[0px_6px_20px_0px_rgba(0,0,0,0.40)]"
          >
            <div className="title-and-subtitle flex flex-col font-poppins">
              <p className="font-bold text-black text-3xl">
                {setTitle(sortBy)}
              </p>
              <p className="text-[#7C828A] text-xl">{setSubtitle(sortBy)}</p>
            </div>
            <div>
              <Chart reportData={reportData} sortBy={sortBy} />
            </div>
          </div>
          <div className="right-content w-full lg:w-1/4 flex flex-row lg:flex-col gap-x-10 lg:gap-y-10">
            <div className="top-side p-8 flex flex-col gap-y-5 bg-white rounded-[20px] shadow-[0px_6px_20px_0px_rgba(0,0,0,0.40)]">
              <div className="name-and-img flex flex-row justify-evenly items-center">
                <div className="h-16 w-16 rounded-full overflow-hidden">
                  <img
                    src={zulaikha}
                    alt="best staff profile pic"
                    className="rounded-full object-cover object-center"
                  />
                </div>
                <div className="flex flex-col font-poppins">
                  <p className="font-bold text-xl">Zulaikha Nirmala</p>
                  <p className="font-normal text-base">
                    Keep up the good work <br /> and spread love!
                  </p>
                </div>
              </div>
              <div className="divider h-0.5 bg-[#D6D9DC]"></div>
              <div className="achievement flex flex-col gap-y-5 justify-center items-center">
                <p className="font-poppins font-bold text-lg">
                  Best Staff of the Month
                </p>
                <svg
                  width="74"
                  height="74"
                  viewBox="0 0 74 74"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M38.6215 0.00260117C53.4356 0.649409 66.457 10.1004 71.6582 24.0277C77.0615 38.4963 72.9173 54.8006 61.2617 64.9292C57.7857 67.9498 53.8108 70.273 49.5279 71.8139C39.6388 75.3718 28.6527 74.5769 19.3244 69.5017C5.76154 62.1227 -1.79569 47.0939 0.365828 31.8005C0.597697 30.16 2.11559 29.018 3.75613 29.2499C5.39668 29.4817 6.53863 30.9996 6.30676 32.6402C4.49549 45.4555 10.828 58.0486 22.1918 64.2313C30.0075 68.4835 39.2106 69.1494 47.4967 66.1682C51.0839 64.8776 54.4126 62.932 57.3261 60.4003C67.0924 51.9135 70.5651 38.2509 66.0374 26.1268C61.6794 14.4573 50.7693 6.53868 38.3598 5.99686C36.7045 5.92459 35.4213 4.52414 35.4935 2.86887C35.5632 1.27272 36.8679 0.0224662 38.4452 0L38.6215 0.00260117Z"
                    fill="#4A8E07"
                  />
                  <path
                    d="M17.7501 38.376C16.3715 37.6427 15.6821 36.4913 15.6821 34.922C15.6821 34.13 15.8875 33.4113 16.2981 32.766C16.7088 32.106 17.3321 31.5853 18.1681 31.204C19.0041 30.808 20.0308 30.61 21.2481 30.61C22.4655 30.61 23.4848 30.808 24.3061 31.204C25.1421 31.5853 25.7655 32.106 26.1761 32.766C26.5868 33.4113 26.7921 34.13 26.7921 34.922C26.7921 35.714 26.6015 36.4033 26.2201 36.99C25.8535 37.5767 25.3548 38.0387 24.7241 38.376C25.5161 38.7573 26.1248 39.2853 26.5501 39.96C26.9755 40.62 27.1881 41.3973 27.1881 42.292C27.1881 43.3333 26.9241 44.2353 26.3961 44.998C25.8681 45.746 25.1495 46.318 24.2401 46.714C23.3455 47.11 22.3481 47.308 21.2481 47.308C20.1481 47.308 19.1435 47.11 18.2341 46.714C17.3395 46.318 16.6281 45.746 16.1001 44.998C15.5721 44.2353 15.3081 43.3333 15.3081 42.292C15.3081 41.3827 15.5208 40.598 15.9461 39.938C16.3715 39.2633 16.9728 38.7427 17.7501 38.376ZM23.1401 35.494C23.1401 34.8927 22.9641 34.4307 22.6121 34.108C22.2748 33.7707 21.8201 33.602 21.2481 33.602C20.6761 33.602 20.2141 33.7707 19.8621 34.108C19.5248 34.4453 19.3561 34.9147 19.3561 35.516C19.3561 36.088 19.5321 36.5427 19.8841 36.88C20.2361 37.2027 20.6908 37.364 21.2481 37.364C21.8055 37.364 22.2601 37.1953 22.6121 36.858C22.9641 36.5207 23.1401 36.066 23.1401 35.494ZM21.2481 40.004C20.5588 40.004 20.0015 40.1947 19.5761 40.576C19.1508 40.9427 18.9381 41.456 18.9381 42.116C18.9381 42.732 19.1435 43.238 19.5541 43.634C19.9795 44.03 20.5441 44.228 21.2481 44.228C21.9521 44.228 22.5021 44.03 22.8981 43.634C23.3088 43.238 23.5141 42.732 23.5141 42.116C23.5141 41.4707 23.3015 40.9573 22.8761 40.576C22.4655 40.1947 21.9228 40.004 21.2481 40.004ZM29.3757 38.75C29.3757 36.2273 29.8597 34.24 30.8277 32.788C31.8104 31.336 33.3871 30.61 35.5577 30.61C37.7284 30.61 39.2977 31.336 40.2657 32.788C41.2484 34.24 41.7397 36.2273 41.7397 38.75C41.7397 41.302 41.2484 43.304 40.2657 44.756C39.2977 46.208 37.7284 46.934 35.5577 46.934C33.3871 46.934 31.8104 46.208 30.8277 44.756C29.8597 43.304 29.3757 41.302 29.3757 38.75ZM38.0437 38.75C38.0437 37.2687 37.8824 36.132 37.5597 35.34C37.2371 34.5333 36.5697 34.13 35.5577 34.13C34.5457 34.13 33.8784 34.5333 33.5557 35.34C33.2331 36.132 33.0717 37.2687 33.0717 38.75C33.0717 39.7473 33.1304 40.576 33.2477 41.236C33.3651 41.8813 33.5997 42.4093 33.9517 42.82C34.3184 43.216 34.8537 43.414 35.5577 43.414C36.2617 43.414 36.7897 43.216 37.1417 42.82C37.5084 42.4093 37.7504 41.8813 37.8677 41.236C37.9851 40.576 38.0437 39.7473 38.0437 38.75ZM43.4193 34.988C43.4193 33.8 43.7566 32.8833 44.4313 32.238C45.1206 31.5927 46.008 31.27 47.0933 31.27C48.1786 31.27 49.0586 31.5927 49.7333 32.238C50.408 32.8833 50.7453 33.8 50.7453 34.988C50.7453 36.176 50.408 37.0927 49.7333 37.738C49.0586 38.3833 48.1786 38.706 47.0933 38.706C46.008 38.706 45.1206 38.3833 44.4313 37.738C43.7566 37.0927 43.4193 36.176 43.4193 34.988ZM58.3573 31.512L49.8873 47H46.2573L54.7273 31.512H58.3573ZM47.0713 33.47C46.3673 33.47 46.0153 33.976 46.0153 34.988C46.0153 35.9853 46.3673 36.484 47.0713 36.484C47.4086 36.484 47.6726 36.3593 47.8633 36.11C48.054 35.8607 48.1493 35.4867 48.1493 34.988C48.1493 33.976 47.79 33.47 47.0713 33.47ZM53.8913 43.524C53.8913 42.336 54.2286 41.4193 54.9033 40.774C55.578 40.1287 56.458 39.806 57.5433 39.806C58.6286 39.806 59.5086 40.1287 60.1833 40.774C60.858 41.4193 61.1953 42.336 61.1953 43.524C61.1953 44.712 60.858 45.6287 60.1833 46.274C59.5086 46.9193 58.6286 47.242 57.5433 47.242C56.458 47.242 55.578 46.9193 54.9033 46.274C54.2286 45.6287 53.8913 44.712 53.8913 43.524ZM57.5213 42.006C57.184 42.006 56.92 42.1307 56.7293 42.38C56.5533 42.6293 56.4653 43.0107 56.4653 43.524C56.4653 44.5213 56.8173 45.02 57.5213 45.02C57.8586 45.02 58.1226 44.8953 58.3133 44.646C58.504 44.3967 58.5993 44.0227 58.5993 43.524C58.5993 43.0253 58.504 42.6513 58.3133 42.402C58.1226 42.138 57.8586 42.006 57.5213 42.006Z"
                    fill="black"
                  />
                </svg>
                <div className="flex flex-col text-center font-poppins text-[#7C828A]">
                  <p>
                    Achieved 3.5M of total 5M <br /> 478 Customer
                  </p>
                </div>
              </div>
            </div>
            <div className="bottom-side p-8 flex flex-col items-center gap-y-5 bg-white rounded-[20px] shadow-[0px_6px_20px_0px_rgba(0,0,0,0.40)]">
              <p className="font-poppins font-bold text-xl text-center">
                Goals
              </p>
              <p className="font-poppins text-[#7C828A] text-center">
                Your goals is still on 76%. Keep up <br /> the good work!
              </p>
              <svg
                width="164"
                height="163"
                viewBox="0 0 164 163"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M82.5027 0C88.5971 0 93.5376 4.92487 93.5376 11C93.5376 17.0751 88.5971 22 82.5027 22C52.975 22 27.8941 43.5306 23.3391 72.6504L23.2074 73.5352C22.3568 79.5508 16.7752 83.7402 10.7404 82.8923C4.70562 82.0445 0.50297 76.4805 1.35351 70.4648C7.06714 30.0538 41.6646 0 82.5027 0Z"
                  fill="#6A4029"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M74.0776 10.5909C74.3415 4.52145 79.4912 -0.185596 85.5799 0.0773999C118.299 1.49065 147.073 22.1517 158.577 52.6253C170.537 84.3097 161.363 120.015 135.582 142.179C127.902 148.781 119.119 153.859 109.659 157.227C87.8258 164.998 63.5728 163.262 42.9735 152.174C12.9897 136.036 -3.73233 103.138 1.05223 69.6478C1.91149 63.6334 7.49921 59.452 13.5328 60.3086C19.5663 61.1651 23.7609 66.7352 22.9016 72.7496C19.4223 97.1032 31.5925 121.047 53.4592 132.816C68.5215 140.923 86.2643 142.193 102.238 136.508C109.148 134.048 115.558 130.342 121.169 125.519C139.948 109.375 146.618 83.4127 137.921 60.3734C129.624 38.3945 108.953 23.3919 85.3409 22.092L84.6245 22.0568C78.5358 21.7938 73.8138 16.6603 74.0776 10.5909Z"
                  fill="#FFBA33"
                />
                <path
                  d="M59.2996 88L66.2956 74.844H58.6176V72.49H69.4196V74.602L62.4016 88H59.2996ZM77.771 88.22C75.8497 88.22 74.361 87.5453 73.305 86.196C72.2637 84.8467 71.743 82.9547 71.743 80.52C71.743 77.8947 72.3297 75.8633 73.503 74.426C74.691 72.9887 76.3264 72.27 78.409 72.27C79.2304 72.27 80.0444 72.424 80.851 72.732C81.6577 73.0253 82.347 73.4507 82.919 74.008L81.995 76.12C81.4524 75.6213 80.873 75.2547 80.257 75.02C79.641 74.7707 79.0104 74.646 78.365 74.646C77.089 74.646 76.1137 75.0933 75.439 75.988C74.7644 76.8827 74.427 78.2173 74.427 79.992V80.63C74.735 79.8233 75.2337 79.1927 75.923 78.738C76.6124 78.2833 77.4044 78.056 78.299 78.056C79.1937 78.056 79.9857 78.2687 80.675 78.694C81.3644 79.1193 81.907 79.706 82.303 80.454C82.699 81.202 82.897 82.06 82.897 83.028C82.897 84.0253 82.677 84.92 82.237 85.712C81.8117 86.4893 81.2104 87.1053 80.433 87.56C79.6704 88 78.783 88.22 77.771 88.22ZM77.617 85.976C78.409 85.976 79.047 85.7193 79.531 85.206C80.0297 84.678 80.279 83.9887 80.279 83.138C80.279 82.2873 80.0297 81.598 79.531 81.07C79.047 80.542 78.409 80.278 77.617 80.278C76.825 80.278 76.1797 80.542 75.681 81.07C75.197 81.598 74.955 82.2873 74.955 83.138C74.955 83.9887 75.197 84.678 75.681 85.206C76.1797 85.7193 76.825 85.976 77.617 85.976ZM90.5665 88.616L88.7625 87.56L97.8265 71.874L99.6085 72.93L90.5665 88.616ZM88.6745 81.752C87.4425 81.752 86.4818 81.3267 85.7925 80.476C85.1031 79.6253 84.7585 78.4667 84.7585 77C84.7585 75.5333 85.1031 74.382 85.7925 73.546C86.4818 72.6953 87.4425 72.27 88.6745 72.27C89.9065 72.27 90.8671 72.6953 91.5565 73.546C92.2458 74.382 92.5905 75.5333 92.5905 77C92.5905 78.4667 92.2458 79.6253 91.5565 80.476C90.8671 81.3267 89.9065 81.752 88.6745 81.752ZM88.6745 79.904C89.2025 79.904 89.6131 79.6693 89.9065 79.2C90.1998 78.716 90.3465 77.9827 90.3465 77C90.3465 76.0173 90.1998 75.2913 89.9065 74.822C89.6131 74.3527 89.2025 74.118 88.6745 74.118C88.1465 74.118 87.7358 74.3527 87.4425 74.822C87.1491 75.2767 87.0025 76.0027 87.0025 77C87.0025 77.9973 87.1491 78.7307 87.4425 79.2C87.7358 79.6693 88.1465 79.904 88.6745 79.904ZM99.7185 88.22C98.4865 88.22 97.5258 87.7947 96.8365 86.944C96.1471 86.0933 95.8025 84.9347 95.8025 83.468C95.8025 82.0013 96.1471 80.85 96.8365 80.014C97.5258 79.1633 98.4865 78.738 99.7185 78.738C100.95 78.738 101.911 79.1633 102.6 80.014C103.29 80.85 103.634 82.0013 103.634 83.468C103.634 84.9347 103.29 86.0933 102.6 86.944C101.911 87.7947 100.95 88.22 99.7185 88.22ZM99.7185 86.372C100.246 86.372 100.657 86.1373 100.95 85.668C101.244 85.184 101.39 84.4507 101.39 83.468C101.39 82.4853 101.244 81.7593 100.95 81.29C100.657 80.8207 100.246 80.586 99.7185 80.586C99.1905 80.586 98.7798 80.8207 98.4865 81.29C98.1931 81.7447 98.0465 82.4707 98.0465 83.468C98.0465 84.4653 98.1931 85.1987 98.4865 85.668C98.7798 86.1373 99.1905 86.372 99.7185 86.372Z"
                  fill="black"
                />
              </svg>
              <svg
                width="45"
                height="9"
                viewBox="0 0 45 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M40.5596 8.5C42.7757 8.5 44.5723 6.70914 44.5723 4.5C44.5723 2.29086 42.7757 0.5 40.5596 0.5C38.3434 0.5 36.5469 2.29086 36.5469 4.5C36.5469 6.70914 38.3434 8.5 40.5596 8.5Z"
                  fill="#7388A9"
                  fillOpacity="0.353283"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22.5029 8.5C24.7191 8.5 26.5156 6.70914 26.5156 4.5C26.5156 2.29086 24.7191 0.5 22.5029 0.5C20.2868 0.5 18.4902 2.29086 18.4902 4.5C18.4902 6.70914 20.2868 8.5 22.5029 8.5Z"
                  fill="#7388A9"
                  fillOpacity="0.353283"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.44532 8.5C6.66147 8.5 8.45801 6.70914 8.45801 4.5C8.45801 2.29086 6.66147 0.5 4.44532 0.5C2.22916 0.5 0.432617 2.29086 0.432617 4.5C0.432617 6.70914 2.22916 8.5 4.44532 8.5Z"
                  fill="#147AD6"
                />
              </svg>
            </div>
          </div>
        </section>
        <section className="buttons flex flex-col lg:flex-row gap-y-10 lg:gap-x-10">
          <div className="w-full lg:w-3/4">
            <button
              onClick={() => pdfDownloadHandler()}
              className="p-6 w-full font-poppins font-bold bg-first-brown hover:bg-first-yellow text-white hover:text-first-brown active:transform active:scale-105 text-3xl text-center rounded-[20px] transition-all duration-300 shadow-[0px_6px_20px_0px_rgba(106,64,41,0.60)]"
            >
              Download Report
            </button>
          </div>
          <div className="w-full lg:w-1/4">
            <button onClick={() => shareReportHandler()} className="p-6 w-full font-poppins font-bold bg-first-brown hover:bg-first-yellow text-white hover:text-first-brown active:transform active:scale-105 text-3xl text-center rounded-[20px] transition-all duration-300 shadow-[0px_6px_20px_0px_rgba(106,64,41,0.60)]">
              Share Report
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;
