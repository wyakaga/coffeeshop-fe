import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import greenCheckSign from "../../assets/icon/green-checksign.svg";
import whyusImg from "../../assets/img/whyus-img.webp";
import hazelnut from "../../assets/img/hazelnut-latte.webp";
import pinky from "../../assets/img/pinky.webp";
import chicken from "../../assets/img/chicken-wings.webp";
import storeMap from "../../assets/img/store-map.webp";
import review1 from "../../assets/img/review1.webp";
import review2 from "../../assets/img/review2.webp";
import review3 from "../../assets/img/review3.webp";

function Home() {
  const token = useSelector((state) => state.auth.data.token);

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  document.title = "Coffee Shop";

  return (
    <div className="body-wrapper grid grid-cols-1 grid-rows-1 relative">
      <Header title="home" />
      <main>
        <div className="main-wrapper flex flex-col">
          <section className="hero flex flex-col home-hero-bg bg-no-repeat bg-cover bg-center py-40 px-12 gap-12 relative">
            <div className="hero-desc flex flex-col gap-10">
              <p className="m-0 font-rubik font-bold text-white text-[3.125rem]">
                Start Your Day with
                <br />
                Coffee and Good Meals
              </p>
              <p className="m-0 font-rubik font-bold text-white text-xl">
                We provide high quality beans, good taste, and healthy
                <br />
                meals made by love just for you. Start your day with us
                <br />
                for a bigger smile!
              </p>
            </div>
            {token ? null : (
              <div className="get-started bg-first-yellow w-[18.5%] text-center py-5 px-0 rounded-[0.625rem] cursor-pointer">
                <Link to={"/signup"}>
                  <p className="no-underline font-rubik font-bold text-first-brown">
                    Get Started
                  </p>
                </Link>
              </div>
            )}
            <div
              className={`brand-figure flex flex-row justify-center bg-white shadow-[0px_5px_5px_5px_rgba(13,16,37,0.073)] rounded-[0.625rem] py-6 px-6 lg:px-0 lg:w-[71.25rem] absolute ${
                token ? "top-[520px]" : "top-[630px]"
              } right-[100px] lg:right-[190px]`}
            >
              <div className="figure-wrapper flex flex-row p-6 gap-4">
                <div className="figure-icon bg-first-yellow rounded-full w-[3.4375rem] h-[3.4375rem] flex justify-center items-center">
                  <svg
                    width="16"
                    height="19"
                    viewBox="0 0 16 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.0001 7.8001C8.95488 7.8001 9.87055 7.42081 10.5457 6.74568C11.2208 6.07055 11.6001 5.15488 11.6001 4.2001C11.6001 3.24532 11.2208 2.32964 10.5457 1.65451C9.87055 0.979382 8.95488 0.600098 8.0001 0.600098C7.04532 0.600098 6.12964 0.979382 5.45451 1.65451C4.77938 2.32964 4.4001 3.24532 4.4001 4.2001C4.4001 5.15488 4.77938 6.07055 5.45451 6.74568C6.12964 7.42081 7.04532 7.8001 8.0001 7.8001ZM2.89875 18.6001C1.07696 18.6001 -0.457661 17.0687 0.23951 15.3856C0.661649 14.3664 1.28039 13.4404 2.0604 12.6604C2.84041 11.8804 3.76642 11.2616 4.78556 10.8395C5.80469 10.4174 6.89699 10.2001 8.0001 10.2001C9.1032 10.2001 10.1955 10.4174 11.2146 10.8395C12.2338 11.2616 13.1598 11.8804 13.9398 12.6604C14.7198 13.4404 15.3385 14.3664 15.7607 15.3856C16.4579 17.0687 14.9232 18.6001 13.1014 18.6001H2.89875Z"
                      fill="#6A4029"
                    />
                  </svg>
                </div>
                <div className="figure-desc">
                  <p className="m-0 font-rubik font-medium text-[1.5625rem]">
                    90+
                  </p>
                  <p className="m-0 font-rubik font-normal text-xl">Staff</p>
                </div>
              </div>
              <div className="figure-wrapper flex flex-row p-6 gap-4 border-x-2 border-solid border-x-third-white py-6 px:10 lg:px-40">
                <div className="figure-icon bg-first-yellow rounded-full w-[3.4375rem] h-[3.4375rem] flex justify-center items-center">
                  <svg
                    width="14"
                    height="21"
                    viewBox="0 0 14 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 7.54932C14 6.63006 13.8189 5.71981 13.4672 4.87053C13.1154 4.02125 12.5998 3.24958 11.9497 2.59957C11.2997 1.94956 10.5281 1.43394 9.67878 1.08216C8.8295 0.730377 7.91925 0.549316 7 0.549316C6.08075 0.549316 5.17049 0.730377 4.32122 1.08216C3.47194 1.43394 2.70026 1.94956 2.05025 2.59957C1.40024 3.24958 0.884626 4.02125 0.532843 4.87053C0.18106 5.71981 -1.36979e-08 6.63006 0 7.54932C0 8.93632 0.41 10.2263 1.105 11.3143H1.097C3.457 15.0093 7 20.5493 7 20.5493L12.903 11.3143H12.896C13.6164 10.1907 13.9995 8.88406 14 7.54932ZM7 10.5493C6.20435 10.5493 5.44129 10.2332 4.87868 9.67064C4.31607 9.10803 4 8.34497 4 7.54932C4 6.75367 4.31607 5.99061 4.87868 5.428C5.44129 4.86539 6.20435 4.54932 7 4.54932C7.79565 4.54932 8.55871 4.86539 9.12132 5.428C9.68393 5.99061 10 6.75367 10 7.54932C10 8.34497 9.68393 9.10803 9.12132 9.67064C8.55871 10.2332 7.79565 10.5493 7 10.5493Z"
                      fill="#6A4029"
                    />
                  </svg>
                </div>
                <div className="figure-desc">
                  <p className="m-0 font-rubik font-medium text-[1.5625rem]">
                    30+
                  </p>
                  <p className="m-0 font-rubik font-normal text-xl">Stores</p>
                </div>
              </div>
              <div className="figure-wrapper flex flex-row p-6 gap-4">
                <div className="figure-icon bg-first-yellow rounded-full w-[3.4375rem] h-[3.4375rem] flex justify-center items-center">
                  <svg
                    width="31"
                    height="27"
                    viewBox="0 0 31 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M26.918 4.03337C26.2583 3.38873 25.475 2.87736 24.6129 2.52847C23.7507 2.17958 22.8267 2 21.8934 2C20.9602 2 20.0361 2.17958 19.174 2.52847C18.3119 2.87736 17.5286 3.38873 16.8688 4.03337L15.4997 5.37059L14.1305 4.03337C12.7979 2.73186 10.9905 2.00067 9.10587 2.00067C7.22128 2.00067 5.41387 2.73186 4.08126 4.03337C2.74865 5.33488 2 7.1001 2 8.94072C2 10.7813 2.74865 12.5466 4.08126 13.8481L5.45043 15.1853L15.4997 25L25.5489 15.1853L26.918 13.8481C27.5781 13.2037 28.1017 12.4387 28.4589 11.5967C28.8161 10.7547 29 9.85216 29 8.94072C29 8.02928 28.8161 7.12677 28.4589 6.28475C28.1017 5.44273 27.5781 4.6777 26.918 4.03337V4.03337Z"
                      stroke="#6A4029"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="figure-desc">
                  <p className="m-0 font-rubik font-medium text-[1.5625rem]">
                    800+
                  </p>
                  <p className="m-0 font-rubik font-normal text-xl">
                    Customers
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="whyus flex flex-row justify-center lg:gap-[28rem] py-12 px-0">
            <div className="whyus-img flex flex-row justify-center gap-40 py-24 px-0">
              <img
                src={whyusImg}
                alt="hard work illustration"
                className="w-[35.8125rem] h-[28.5625rem]"
              />
            </div>
            <div className="whyus-desc flex flex-col justify-center gap-4">
              <p className="font-rubik m-0 font-medium text-[2rem]">
                We Provide Good Coffee
                <br />
                and Healthy Meals
              </p>
              <p className="font-rubik m-0 font-normal text-base">
                You can explore the menu that we provide with fun and
                <br />
                have their own taste and make your day better.
              </p>
              <ul className="m-0 list-none p-0">
                <li className="font-rubik text-[0.875rem] flex items-center pt-2 pr-2 pb-2 pl-0">
                  <span className="bg-no-repeat bg-center w-5 h-5 mr-2 whyus-li-bg"></span>
                  High quality beans
                </li>
                <li className="font-rubik text-[0.875rem] flex items-center pt-2 pr-2 pb-2 pl-0">
                  <span className="bg-no-repeat bg-center w-5 h-5 mr-2 whyus-li-bg"></span>
                  Healthy meals, you can request the ingredients
                </li>
                <li className="font-rubik text-[0.875rem] flex items-center pt-2 pr-2 pb-2 pl-0">
                  <span className="bg-no-repeat bg-center w-5 h-5 mr-2 whyus-li-bg"></span>
                  Chat with our staff to get better experience for ordering
                </li>
                <li className="font-rubik text-[0.875rem] flex items-center pt-2 pr-2 pb-2 pl-0">
                  <span className="bg-no-repeat bg-center w-5 h-5 mr-2 whyus-li-bg"></span>
                  Free member card with a minimum purchase of IDR 200.000
                </li>
              </ul>
            </div>
          </section>
          <section className="main-identity bg-gradient-to-t from-first-white via-transparent to-transparent pt-8 pr-0 pb-40 pl-0 flex flex-col gap-40 relative">
            <section className="fav-menu flex flex-col gap-80">
              <div className="fav-menu-desc flex flex-col items-center gap-6">
                <p className="font-rubik font-medium text-[2.1875rem] m-0">
                  Here is People&apos;s Favorite
                </p>
                <p className="font-rubik font-normal text-base m-0">
                  Let&apos;s choose and have a bit taste of people&apos;s
                  favorite. It might be yours too!
                </p>
              </div>
              <div className="fav-menu-cards flex flex-row justify-evenly lg:gap-x-40 py-0 px-0">
                <div className="card relative">
                  <div
                    id="img1"
                    className="rounded-full h-40 w-40 overflow-hidden absolute top-[-100px] right-[15px] lg:right-[80px]"
                  >
                    <img
                      src={hazelnut}
                      alt="Hazelnut Latte"
                      id="card-img1"
                      className="object-cover transform translate-x-[-1px] translate-y-[-20px] scale-[100%]"
                    />
                  </div>
                  <div
                    className="card-desc font-rubik flex flex-col border-2 border-solid border-fourth-white rounded-[0.625rem] pt-16 pb-4 px-0 lg:w-[20.625rem]"
                    id="card-desc1"
                  >
                    <div className="card-desc-title font-medium text-lg text-center">
                      <p>Hazelnut Latte</p>
                    </div>
                    <ul className="m-0 list-none p-0 h-[13.5rem] flex flex-col justify-center lg:pl-12 gap-5">
                      <li className="flex items-center gap-2">
                        <img
                          src={greenCheckSign}
                          alt="Green checkmark icon"
                          className="w-5 h-5 mr-0 ml-6"
                        />
                        <span className="font-rubik text-sm">
                          Hazelnut Syrup
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <img
                          src={greenCheckSign}
                          alt="Green checkmark icon"
                          className="w-5 h-5 mr-0 ml-6"
                        />
                        <span className="font-rubik text-sm">
                          Vanilla Whipped Cream
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <img
                          src={greenCheckSign}
                          alt="Green checkmark icon"
                          className="w-5 h-5 mr-0 ml-6"
                        />
                        <span className="font-rubik text-sm">Ice/Hot</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <img
                          src={greenCheckSign}
                          alt="Green checkmark icon"
                          className="w-5 h-5 mr-0 ml-6"
                        />
                        <span className="font-rubik text-sm">
                          Sliced Banana on Top
                        </span>
                      </li>
                    </ul>
                    <div className="card-desc-price text-center font-medium text-[1.5625rem]">
                      <p>IDR 25.000</p>
                    </div>
                    <div className="card-order-button text-center" id="button1">
                      <button className="text-first-brown font-bold bg-transparent border-2 border-solid border-first-yellow rounded-[3.125rem] lg:w-[45%] p-2">
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card relative">
                  <div
                    id="img2"
                    className="rounded-full h-40 w-40 overflow-hidden absolute top-[-100px] right-[15px] lg:right-[80px]"
                  >
                    <img
                      src={pinky}
                      alt="Pinky Promise"
                      id="card-img2"
                      className="object-cover transform translate-x-[10px] translate-y-[-5px] scale-[150%]"
                    />
                  </div>
                  <div
                    className="card-desc font-rubik flex flex-col border-2 border-solid border-fourth-white rounded-[0.625rem] pt-16 pb-4 px-0 lg:w-[20.625rem]"
                    id="card-desc2"
                  >
                    <div className="card-desc-title font-medium text-lg text-center">
                      <p>Pinky Promise</p>
                    </div>
                    <ul className="m-0 list-none p-0 h-[13.5rem] flex flex-col justify-center lg:pl-12 gap-5">
                      <li className="flex items-center gap-2">
                        <img
                          src={greenCheckSign}
                          alt="Green checkmark icon"
                          className="w-5 h-5 mr-0 ml-6"
                        />
                        <span className="font-rubik text-sm">
                          1 Shot of Coffee
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <img
                          src={greenCheckSign}
                          alt="Green checkmark icon"
                          className="w-5 h-5 mr-0 ml-6"
                        />
                        <span className="font-rubik text-sm">
                          Vanilla Whipped Cream
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <img
                          src={greenCheckSign}
                          alt="Green checkmark icon"
                          className="w-5 h-5 mr-0 ml-6"
                        />
                        <span className="font-rubik text-sm">
                          Chocolate Biscuits
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <img
                          src={greenCheckSign}
                          alt="Green checkmark icon"
                          className="w-5 h-5 mr-0 ml-6"
                        />
                        <span className="font-rubik text-sm">
                          Strawberry Syrup
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <img
                          src={greenCheckSign}
                          alt="Green checkmark icon"
                          className="w-5 h-5 mr-0 ml-6"
                        />
                        <span className="font-rubik text-sm">
                          Sliced Strawberry on Top
                        </span>
                      </li>
                    </ul>
                    <div className="card-desc-price text-center font-medium text-[1.5625rem]">
                      <p>IDR 30.000</p>
                    </div>
                    <div className="card-order-button text-center" id="button2">
                      <button className="text-first-brown font-bold bg-transparent border-2 border-solid border-first-yellow rounded-[3.125rem] w-[45%] p-2">
                        Select
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card relative">
                  <div
                    id="img3"
                    className="rounded-full h-40 w-40 overflow-hidden absolute top-[-100px] right-[15px] lg:right-[80px]"
                  >
                    <img
                      src={chicken}
                      alt="Chicken Wings"
                      id="card-img3"
                      className="object-cover transform translate-x-[0px] translate-y-[-50px] scale-[100%]"
                    />
                  </div>
                  <div
                    className="card-desc font-rubik flex flex-col border-2 border-solid border-first-brown rounded-[0.625rem] pt-16 pb-4 px-0 lg:w-[20.265rem]"
                    id="card-desc3"
                  >
                    <div className="card-desc-title font-medium text-lg text-center">
                      <p>Chicken Wings</p>
                    </div>
                    <ul className="m-0 list-none p-0 h-[13.5rem] flex flex-col justify-center lg:pl-12 gap-3">
                      <li className="flex items-center gap-2">
                        <img
                          src={greenCheckSign}
                          alt="Green checkmark icon"
                          className="w-5 h-5 mr-0 ml-6"
                        />
                        <span className="font-rubik text-sm">Wings</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <img
                          src={greenCheckSign}
                          alt="Green checkmark icon"
                          className="w-5 h-5 mr-0 ml-6"
                        />
                        <span className="font-rubik text-sm">Drum Sticks</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <img
                          src={greenCheckSign}
                          alt="Green checkmark icon"
                          className="w-5 h-5 mr-0 ml-6"
                        />
                        <span className="font-rubik text-sm">
                          Mayonaise and Lemon
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <img
                          src={greenCheckSign}
                          alt="Green checkmark icon"
                          className="w-5 h-5 mr-0 ml-6"
                        />
                        <span className="font-rubik text-sm">Hot Fried</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <img
                          src={greenCheckSign}
                          alt="Green checkmark icon"
                          className="w-5 h-5 mr-0 ml-6"
                        />
                        <span className="font-rubik text-sm">
                          Secret Recipe
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <img
                          src={greenCheckSign}
                          alt="Green checkmark icon"
                          className="w-5 h-5 mr-0 ml-6"
                        />
                        <span className="font-rubik text-sm">
                          Buy 1 Get 1 only for Dine in
                        </span>
                      </li>
                    </ul>
                    <div className="card-desc-price text-center font-medium text-[1.5625rem]">
                      <p>IDR 40.000</p>
                    </div>
                    <div className="card-order-button text-center" id="button3">
                      <button className="text-first-brown font-bold bg-first-yellow border-2 border-solid border-first-yellow rounded-[3.125rem] w-[45%] p-2">
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="store-loc flex flex-col items-center gap-32">
              <div className="store-loc-desc">
                <p className="font-rubik text-center font-medium text-[2.1875rem]">
                  Visit Our Store in the
                  <br />
                  Spot on the Map Below
                </p>
                <p className="font-rubik text-center font-normal text-base">
                  See our store in every city on the spot and spend your good
                  day there. See
                  <br />
                  you soon!
                </p>
              </div>
              <div className="store-loc-map">
                <img src={storeMap} alt="store location map" />
              </div>
            </section>
            <section className="partner">
              <div className="partner-desc font-rubik font-medium text-[2.1875rem] text-center">
                <p>Our Partner</p>
              </div>
              <div className="partner-logo flex flex-row flex-wrap lg:flex-nowrap justify-center lg:gap-x-28">
                <div id="netflix-logo">
                  <svg
                    className="w-[12.5rem] h-28"
                    width="300px"
                    height="300px"
                    viewBox="0 -109.31 300 300"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="#DDE0E4">
                      <path d="M256.09 76.212c4.178.405 8.354.84 12.52 1.29l9.198-22.712 8.743 24.807c4.486.562 8.97 1.152 13.44 1.768l-15.328-43.501L299.996 0H287.01l-.135.186-8.283 20.455L271.32.003h-12.822l13.237 37.565-15.644 38.644zM246.393 75.322V0h-12.817v74.265c4.275.33 8.552.684 12.817 1.056M150.113 71.11c3.46 0 6.916.026 10.366.054V43.492h15.397V31.708H160.48v-19.91h17.733V0h-30.6v71.12c.831 0 1.666-.013 2.5-.01M110.319 71.83c4.27-.152 8.544-.28 12.824-.384V11.8h11.98V.003H98.339V11.8h11.982v60.03h-.002zM12.295 79.772V34.897L27.471 77.96c4.667-.524 9.341-1.017 14.028-1.483V.001H29.201v46.483L12.825.001H0v81.384h.077c4.063-.562 8.14-1.096 12.218-1.613M85.98 11.797V.001H55.377V75.202a1100.584 1100.584 0 0 1 30.578-2.211V61.184c-5.916.344-11.82.74-17.71 1.181V43.497h15.397V31.706H68.245V11.797H85.98zM203.614 60.62V-.003h-12.873v71.876c10.24.376 20.44.9 30.606 1.56V61.619c-5.9-.381-11.81-.712-17.733-1" />
                    </g>
                  </svg>
                </div>
                <div id="reddit-logo">
                  <svg
                    className="w-[12.5rem] h-28"
                    width="511px"
                    height="511px"
                    viewBox="0 -167.5 511 511"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    preserveAspectRatio="xMidYMid"
                  >
                    <g>
                      <g transform="translate(210.936183, 42.355298)">
                        <circle
                          fill="#DDE0E4"
                          cx="249.727023"
                          cy="18.136916"
                          r="11.1135267"
                        ></circle>
                        <path
                          d="M156.208855,0 C159.5504,0 162.303519,2.63789375 162.489416,5.93488402 L162.49942,6.29056489 L162.49942,87.1201221 C162.49942,90.5810076 159.66974,93.410687 156.208855,93.410687 C153.170076,93.410687 150.547542,91.2102595 150.023817,88.2730992 C145.726534,92.5723359 140.274321,94.7747176 133.878229,94.7747176 C117.314443,94.7747176 103.894962,79.7821069 103.894962,61.3305649 C103.894962,42.8790229 117.314443,27.8864122 133.878229,27.8864122 C140.028317,27.8864122 145.208172,29.8250725 149.41953,33.7962059 L149.920244,34.2825038 L149.920244,6.29056489 C149.920244,2.82967939 152.749924,0 156.208855,0 Z M221.838656,0 C225.180201,0 227.933321,2.63789375 228.119218,5.93488402 L228.129221,6.29056489 L228.129221,87.1201221 C228.129221,90.5810076 225.299542,93.410687 221.838656,93.410687 C218.797924,93.410687 216.177344,91.2102595 215.653618,88.2730992 C211.354382,92.5723359 205.904122,94.7747176 199.508031,94.7747176 C182.944244,94.7747176 169.524763,79.7821069 169.524763,61.3305649 C169.524763,42.8790229 182.944244,27.8864122 199.508031,27.8864122 C205.658119,27.8864122 210.837973,29.8250725 215.047594,33.7962059 L215.548092,34.2825038 L215.548092,6.29056489 C215.548092,2.82967939 218.379725,0 221.838656,0 Z M69.8215573,27.7808855 C83.7667176,27.7808855 95.507542,38.4762137 98.8629008,52.943145 L98.9764909,53.5483798 C99.1451936,54.5108321 99.3018848,55.7358723 99.386626,57.4514809 C99.5895752,61.3188972 96.6334781,65.283883 91.4742678,65.513772 L90.9992061,65.5242748 L90.9992061,65.3132214 L52.7340458,65.3132214 C54.3071756,74.8536183 61.4360916,82.0880611 69.8215573,82.0880611 C76.9524275,82.0880611 81.3552366,78.1054046 83.6611908,76.1121221 C86.0726718,74.1207939 89.3225038,73.491542 91.943084,75.273771 C95.0893435,77.4761527 95.6130687,81.9844885 92.9924885,84.9196947 C87.6458015,90.8956336 80.2022595,94.6691908 69.8215573,94.6691908 C53.257771,94.6691908 39.8382901,79.6765802 39.8382901,61.2250382 C39.8382901,42.7734962 53.257771,27.7808855 69.8215573,27.7808855 Z M281.651439,13.9323237 L282.016244,13.9432061 C285.251769,14.1448375 287.705938,16.881331 287.877109,20.0850803 L287.886656,20.4428702 L287.886656,29.2504427 L293.653496,29.2504427 C296.799756,29.2504427 299.420336,31.9745954 299.209282,35.2244275 C299.008225,38.148209 296.577619,40.2968878 293.781559,40.4578457 L293.444397,40.467542 L287.886656,40.467542 L287.886656,87.2256489 C287.886656,90.6845802 285.162504,93.410687 281.492519,93.6197863 C278.152861,93.6197863 275.397985,90.9818925 275.211965,87.6866612 L275.201954,87.3311756 L275.201954,40.5730687 L269.855267,40.5730687 C266.710962,40.5730687 264.088427,37.8469618 264.299481,34.5971298 C264.500538,31.6733482 266.931144,29.5246694 269.727204,29.3637115 L270.064366,29.3540153 L275.307481,29.3540153 L275.307481,20.233771 C275.307481,16.6861191 278.147051,13.9236858 281.651439,13.9323237 L281.651439,13.9323237 Z M35.2263817,28.2010382 C38.1615878,28.7247634 40.467542,31.241771 40.467542,34.3860763 C40.467542,37.519843 38.1271101,40.1666253 35.1406324,40.5409226 L34.806229,40.5730687 L33.5477252,40.5730687 C21.57384,39.2300233 12.852866,48.5607701 12.5873624,60.055422 L12.5811298,60.5957863 L12.5811298,87.1201221 C12.5811298,90.7901069 9.54039695,93.6197863 5.87041221,93.410687 C2.63488768,93.2090556 0.180718492,90.4725621 0.00954763759,87.2688129 L1.42108547e-14,86.9110229 L1.42108547e-14,35.5390534 C1.42108547e-14,32.0801221 2.82967939,29.2504427 6.29056489,29.2504427 C9.32644591,29.2504427 12.3641487,31.4966603 12.5700356,35.1430496 L12.5811298,35.5390534 L12.5811298,36.3793588 C17.5076641,30.1923664 26.1041832,26.8389618 35.2263817,28.2010382 Z M249.727023,34.806229 C253.066681,34.806229 255.819735,37.4441228 256.00563,40.741113 L256.015634,41.0967939 L256.015634,87.1201221 C256.015634,90.5810076 253.185954,93.410687 249.727023,93.410687 C246.385478,93.410687 243.632359,90.7727933 243.446462,87.475803 L243.436458,87.1201221 L243.436458,41.0967939 C243.436458,37.6359084 246.266137,34.806229 249.727023,34.806229 Z M133.983756,40.3620153 C124.337832,40.3620153 116.579664,49.7988397 116.579664,61.3305649 C116.579664,72.9678168 124.337832,82.2971603 133.983756,82.2971603 C143.524153,82.2971603 151.387847,72.9678168 151.387847,61.3305649 C151.387847,49.693313 143.629679,40.3620153 133.983756,40.3620153 Z M199.508031,40.3620153 C189.862107,40.3620153 182.105893,49.7988397 182.105893,61.3305649 C182.105893,72.9678168 189.862107,82.2971603 199.508031,82.2971603 C209.153954,82.2971603 216.912122,72.9678168 216.912122,61.3305649 C216.912122,49.693313 209.153954,40.3620153 199.508031,40.3620153 Z M69.7179847,40.467542 C62.3404858,40.467542 55.9652332,45.9752313 53.4284895,53.8570417 L53.257771,54.4107481 L86.1781985,54.4107481 C83.7667176,46.3379542 77.2650992,40.467542 69.7179847,40.467542 Z"
                          fill="#DDE0E4"
                          fillRule="nonzero"
                        ></path>
                      </g>
                      <g transform="translate(-0.000000, 0.000000)">
                        <circle
                          fill="#DDE0E4"
                          cx="87.8549008"
                          cy="87.8549008"
                          r="87.8549008"
                        ></circle>
                        <path
                          d="M146.459359,87.8549008 C146.459359,80.7259847 140.694473,75.0646718 133.66913,75.0646718 C130.210198,75.0646718 127.063939,76.4267481 124.757985,78.6291298 C115.952366,72.3385649 103.894962,68.2503817 90.4754809,67.7266565 L96.3458931,40.2584427 L115.426687,44.346626 C115.63774,49.1695878 119.620397,53.0486718 124.548885,53.0486718 C129.580947,53.0486718 133.66913,48.9604885 133.66913,43.9264733 C133.66913,38.8944122 129.580947,34.806229 124.548885,34.806229 C120.984427,34.806229 117.838168,36.903084 116.370565,39.9438168 L95.0893435,35.4354809 C94.4600916,35.3299542 93.8308397,35.4354809 93.410687,35.7501069 C92.8869618,36.0647328 92.5723359,36.588458 92.4687634,37.2177099 L85.967145,67.830229 C72.3385649,68.2503817 60.0720611,72.3385649 51.160916,78.7346565 C48.8549618,76.5322748 45.7087023,75.1701985 42.249771,75.1701985 C35.120855,75.1701985 29.459542,80.935084 29.459542,87.9604275 C29.459542,93.2015878 32.6038473,97.6043969 37.0086107,99.5976794 C36.7975573,100.854229 36.6939847,102.112733 36.6939847,103.476763 C36.6939847,123.184855 59.6538626,139.22687 87.9604275,139.22687 C116.266992,139.22687 139.22687,123.290382 139.22687,103.476763 C139.22687,102.21826 139.121344,100.854229 138.912244,99.5976794 C143.315053,97.6043969 146.459359,93.0960611 146.459359,87.8549008 Z M58.604458,96.975145 C58.604458,91.943084 62.6926412,87.8549008 67.7266565,87.8549008 C72.7587176,87.8549008 76.8469008,91.943084 76.8469008,96.975145 C76.8469008,102.007206 72.7587176,106.097344 67.7266565,106.097344 C62.6926412,106.200916 58.604458,102.007206 58.604458,96.975145 Z M109.661802,121.193527 C103.371237,127.484092 91.4193588,127.904244 87.9604275,127.904244 C84.3959695,127.904244 72.4440916,127.378565 66.2570992,121.193527 C65.3151756,120.249649 65.3151756,118.782046 66.2570992,117.838168 C67.2009771,116.896244 68.6685802,116.896244 69.612458,117.838168 C73.5970687,121.822779 81.9844885,123.184855 87.9604275,123.184855 C93.9363664,123.184855 102.427359,121.822779 106.306443,117.838168 C107.250321,116.896244 108.717924,116.896244 109.661802,117.838168 C110.500153,118.782046 110.500153,120.249649 109.661802,121.193527 Z M107.983145,106.200916 C102.951084,106.200916 98.8629008,102.112733 98.8629008,97.0806718 C98.8629008,92.0486107 102.951084,87.9604275 107.983145,87.9604275 C113.01716,87.9604275 117.105344,92.0486107 117.105344,97.0806718 C117.105344,102.007206 113.01716,106.200916 107.983145,106.200916 Z"
                          fill="#FFFFFF"
                          fillRule="nonzero"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </div>
                <div id="amazon-logo">
                  <svg
                    className="w-[12.5rem] h-28"
                    width="285px"
                    height="285px"
                    viewBox="163.5 163.50000000000003 285 285"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipRule="evenodd" fillRule="evenodd">
                      <path
                        d="m340.3 330.2c-16.5 12.2-40.5 18.7-61.2 18.7-29 0-55-10.7-74.8-28.5-1.5-1.4-.2-3.3 1.7-2.2 21.3 12.4 47.6 19.8 74.8 19.8 18.3 0 38.5-3.8 57.1-11.7 2.8-1.1 5.1 1.9 2.4 3.9z"
                        fill="#DDE0E4"
                      />
                      <path
                        d="m347.2 322.3c-2.1-2.7-14-1.3-19.3-.6-1.6.2-1.9-1.2-.4-2.2 9.5-6.7 25-4.7 26.8-2.5s-.5 17.8-9.4 25.2c-1.4 1.1-2.7.5-2.1-1 2-5 6.5-16.1 4.4-18.9z"
                        fill="#DDE0E4"
                      />
                      <path
                        d="m328.2 272.5v-6.5c0-1 .7-1.6 1.6-1.6h29c.9 0 1.7.7 1.7 1.6v5.5c0 .9-.8 2.1-2.2 4.1l-15 21.4c5.6-.1 11.5.7 16.5 3.5 1.1.6 1.4 1.6 1.5 2.5v6.9c0 1-1 2.1-2.1 1.5-8.9-4.7-20.8-5.2-30.6.1-1 .5-2.1-.5-2.1-1.5v-6.6c0-1 0-2.8 1.1-4.4l17.4-24.9h-15.1c-.9 0-1.7-.7-1.7-1.6zm-105.7 40.3h-8.8c-.8-.1-1.5-.7-1.6-1.5v-45.2c0-.9.8-1.6 1.7-1.6h8.2c.9 0 1.5.7 1.6 1.5v5.9h.2c2.1-5.7 6.2-8.4 11.6-8.4 5.5 0 9 2.7 11.4 8.4 2.1-5.7 7-8.4 12.2-8.4 3.7 0 7.7 1.5 10.2 5 2.8 3.8 2.2 9.3 2.2 14.2v28.6c0 .9-.8 1.6-1.7 1.6h-8.7c-.9-.1-1.6-.8-1.6-1.6v-24c0-1.9.2-6.7-.2-8.5-.7-3-2.6-3.9-5.2-3.9-2.1 0-4.4 1.4-5.3 3.7s-.8 6.1-.8 8.7v24c0 .9-.8 1.6-1.7 1.6h-8.8c-.9-.1-1.6-.8-1.6-1.6v-24c0-5 .8-12.5-5.4-12.5-6.3 0-6.1 7.2-6.1 12.5v24c-.1.8-.8 1.5-1.8 1.5zm163-49.3c13.1 0 20.2 11.2 20.2 25.5 0 13.8-7.8 24.8-20.2 24.8-12.8 0-19.8-11.2-19.8-25.2-.1-14.1 7-25.1 19.8-25.1zm0 9.3c-6.5 0-6.9 8.9-6.9 14.4s-.1 17.3 6.8 17.3c6.8 0 7.2-9.5 7.2-15.3 0-3.8-.2-8.4-1.3-12-1-3.2-3-4.4-5.8-4.4zm37.1 40h-8.8c-.9-.1-1.6-.8-1.6-1.6v-45.3c.1-.8.8-1.5 1.7-1.5h8.2c.8 0 1.4.6 1.6 1.3v6.9h.2c2.5-6.2 5.9-9.1 12-9.1 3.9 0 7.8 1.4 10.3 5.3 2.3 3.6 2.3 9.7 2.3 14.1v28.5c-.1.8-.8 1.4-1.7 1.4h-8.8c-.8-.1-1.5-.7-1.6-1.4v-24.6c0-5 .6-12.2-5.5-12.2-2.1 0-4.1 1.4-5.1 3.6-1.2 2.8-1.4 5.5-1.4 8.6v24.4c-.1.9-.9 1.6-1.8 1.6zm-117.5-21.6c0 3.4.1 6.3-1.6 9.4-1.4 2.5-3.6 4-6.1 4-3.4 0-5.4-2.6-5.4-6.4 0-7.5 6.7-8.9 13.1-8.9zm8.9 21.5c-.6.5-1.4.6-2.1.2-2.9-2.4-3.5-3.6-5.1-5.9-4.8 4.9-8.3 6.4-14.5 6.4-7.4 0-13.2-4.6-13.2-13.7 0-7.2 3.9-12 9.4-14.4 4.8-2.1 11.5-2.5 16.6-3.1v-1.1c0-2.1.2-4.6-1.1-6.4-1.1-1.6-3.1-2.3-4.9-2.3-3.4 0-6.4 1.7-7.1 5.3-.2.8-.7 1.6-1.5 1.6l-8.5-.9c-.7-.2-1.5-.7-1.3-1.8 2-10.4 11.3-13.5 19.7-13.5 4.3 0 9.9 1.1 13.3 4.4 4.3 4 3.9 9.4 3.9 15.2v13.7c0 4.1 1.7 5.9 3.3 8.2.6.8.7 1.8 0 2.3-1.9 1.5-5.1 4.3-6.9 5.8zm-124.4-21.5c0 3.4.1 6.3-1.6 9.4-1.4 2.5-3.6 4-6.1 4-3.4 0-5.4-2.6-5.4-6.4 0-7.5 6.7-8.9 13.1-8.9zm8.8 21.5c-.6.5-1.4.6-2.1.2-2.9-2.4-3.5-3.6-5.1-5.9-4.8 4.9-8.3 6.4-14.5 6.4-7.4 0-13.2-4.6-13.2-13.7 0-7.2 3.9-12 9.4-14.4 4.8-2.1 11.5-2.5 16.6-3.1v-1.1c0-2.1.2-4.6-1.1-6.4-1.1-1.6-3.1-2.3-4.9-2.3-3.4 0-6.4 1.7-7.1 5.3-.2.8-.7 1.6-1.5 1.6l-8.5-.9c-.7-.2-1.5-.7-1.3-1.8 2-10.4 11.3-13.5 19.7-13.5 4.3 0 9.9 1.1 13.3 4.4 4.3 4 3.9 9.4 3.9 15.2v13.7c0 4.1 1.7 5.9 3.3 8.2.6.8.7 1.8 0 2.3-1.9 1.5-5.1 4.3-6.9 5.8z"
                        fill="#DDE0E4"
                      />
                    </g>
                  </svg>
                </div>
                <div id="discord-logo">
                  <svg
                    className="w-[12.5rem] h-28"
                    width="512px"
                    height="512px"
                    viewBox="0 -206 512 512"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    preserveAspectRatio="xMidYMid"
                  >
                    <g>
                      <path
                        d="M82.003081,0 C91.2633721,1.60390319 100.120889,4.42068908 108.404769,8.2965107 C122.889017,29.9266617 130.085793,54.3223748 127.428468,82.4600608 C116.346397,90.7462215 105.596579,95.7733519 95.0277993,99.0630814 C92.4108216,95.4753062 90.0957488,91.6508839 88.0927556,87.6415645 C91.9075296,86.1918592 95.5712634,84.4030589 99.0337857,82.316213 C98.1278953,81.6376723 97.2321795,80.9282569 96.356462,80.198317 C75.5511554,90.0471561 52.6723352,90.0471561 31.6154704,80.198317 C30.7499275,80.9282569 29.8540363,81.6376723 28.9381467,82.316213 C32.3904943,84.3928843 36.044229,86.1816846 39.859003,87.6312145 C37.8560098,91.6508839 35.5309378,95.4649562 32.9239592,99.0529068 C22.3653539,95.7631773 11.6255003,90.7358714 0.54343793,82.4600608 C-1.72128811,58.1878464 2.80815519,33.5660115 19.5168162,8.31703533 C27.8006964,4.43103911 36.6683882,1.60390319 45.9386784,0 C47.0861279,2.0561467 48.4449635,4.82170874 49.3608531,7.02170325 C59.0237427,5.54129868 68.7771511,5.54129868 78.6210784,7.02170325 C79.5371434,4.82170874 80.8658061,2.0561467 82.003081,0 Z M335.935532,31.686517 C342.980566,31.686517 348.829208,33.1977962 353.479703,36.2201792 L353.479703,49.3896225 C351.839487,48.2381383 349.925609,47.3026012 347.741578,46.5830112 C345.557547,45.8634213 343.222652,45.5034509 340.726366,45.5034509 C336.358304,45.5034509 332.946304,46.3156648 330.47984,47.9502672 C328.013376,49.5848696 326.776636,51.7129402 326.776636,54.3550037 C326.776636,56.9456678 327.973028,59.0635638 330.369323,60.7290409 C332.765617,62.3841679 336.237261,63.2169065 340.796535,63.2169065 C343.141956,63.2169065 345.457555,62.8672861 347.741578,62.1785708 C350.01683,61.4795055 351.979826,60.6262423 353.620042,59.6186059 L353.620042,72.3561549 C348.457309,75.5225611 342.468328,77.1057643 335.653099,77.1057643 C329.916728,77.0852396 325.024148,76.0777786 320.987638,74.0628566 C316.952882,72.0477592 313.902256,69.3132472 311.86909,65.8589699 C309.835924,62.4046925 308.809692,58.5186963 308.809692,54.2008058 C308.809692,49.8830907 309.865746,46.0176191 311.979607,42.6147411 C314.093468,39.211863 317.193213,36.538925 321.280596,34.5959268 C325.366225,32.6529287 330.24828,31.686517 335.935532,31.686517 Z M283.018831,31.6766932 C286.96412,31.6766932 290.577858,32.1084121 293.87057,32.9720253 C297.161527,33.8356385 299.878848,34.935548 302.043582,36.2822794 L302.043582,47.5806485 C299.827975,46.2339171 297.291341,45.1750568 294.393334,44.3730175 C291.504098,43.5815037 288.535921,43.1908341 285.474769,43.1908341 C281.055834,43.1908341 278.852507,43.9618233 278.852507,45.4936271 C278.852507,46.2133925 279.194584,46.74791 279.878738,47.1077049 C280.562892,47.4674999 281.820684,47.8376449 283.643341,48.2283145 L290.688375,49.5236466 C295.289751,50.3358605 298.721048,51.7648658 300.975249,53.8003124 C303.231204,55.8359345 304.357427,58.8481429 304.357427,62.8369377 C304.357427,67.2060521 302.496176,70.6706794 298.761396,73.240819 C295.026615,75.8109585 289.732314,77.0959405 282.867966,77.0959405 C278.831456,77.0857659 274.907217,76.5819477 271.102267,75.5744867 C267.297317,74.5670257 263.864266,73.1071457 260.815393,71.1846723 L260.815393,59.2388126 C263.120467,61.058312 266.209687,62.5594167 270.084807,63.7416001 C273.959927,64.913609 277.705233,65.4995258 281.327742,65.4995258 C283.018831,65.4995258 284.297673,65.273404 285.162514,64.8209851 C286.029109,64.3687416 286.462407,63.8238741 286.462407,63.1967327 C286.462407,62.4771427 286.230847,61.880876 285.757202,61.3975824 C285.283557,60.9144642 284.367843,60.5134446 283.010059,60.1741742 L274.554614,58.2311761 C269.712907,57.0798673 266.279856,55.4863141 264.237919,53.4405175 C262.194227,51.4048954 261.176767,48.7319573 261.176767,45.4217032 C261.176767,42.6356166 262.062659,40.2198503 263.855494,38.1533536 C265.63605,36.0870323 268.172683,34.4934791 271.463641,33.3728695 C274.756352,32.2420853 278.599896,31.6766932 283.018831,31.6766932 Z M512,23.8326015 L512,75.6464106 L494.736507,75.6464106 L494.736507,66.2192911 C493.276978,69.766017 491.063125,72.4698297 488.084423,74.3202039 C485.103966,76.1605788 481.420058,77.0857659 477.051997,77.0857659 C473.147055,77.0857659 469.74558,76.1193542 466.835293,74.1763561 C463.92676,72.2333579 461.683085,69.5707699 460.102513,66.1884165 C458.532467,62.8060631 457.736041,58.9818161 457.736041,54.7051503 C457.686922,50.2948112 458.521942,46.3367157 460.242853,42.8310391 C461.954993,39.3253625 464.379355,36.5908505 467.500151,34.6271523 C470.620947,32.6636296 474.183811,31.6766932 478.179974,31.6766932 C486.262068,31.6766932 491.728206,35.2014569 494.588378,42.2413268 L494.736,42.614 L494.736507,23.8326015 L512,23.8326015 Z M385.466546,31.6663432 C391.053806,31.6663432 395.874462,32.6224049 399.910972,34.5448784 C403.947482,36.4673519 407.027931,39.0992407 409.141792,42.4608941 C411.255653,45.8227229 412.311707,49.6778444 412.311707,54.0471342 C412.311707,58.3648493 411.255653,62.2715456 409.141792,65.7770468 C407.027931,69.2827234 403.936957,72.0379354 399.870625,74.0528574 C395.804292,76.0679549 391.002933,77.0754159 385.457775,77.0754159 C379.910862,77.0754159 375.109503,76.0781295 371.053696,74.0632075 C366.987364,72.0482854 363.887619,69.2930734 361.752707,65.7873968 C359.619549,62.2817202 358.542444,58.3751994 358.542444,54.0573088 C358.542444,49.7395937 359.609023,45.8842968 361.752707,42.5021188 C363.89639,39.1197653 366.976838,36.4673519 371.023874,34.5448784 C375.05863,32.6224049 379.88104,31.6663432 385.466546,31.6663432 Z M253.107255,43.4681797 L253.107255,75.8723569 L235.89639,75.8723569 L235.89639,43.4681797 C241.169641,45.7914974 247.712962,45.8942959 253.107255,43.4681797 Z M448.235068,32.6120549 C450.720829,32.6120549 452.855741,33.187797 454.646822,34.3391059 L454.646822,49.8832661 C452.855741,48.6803826 450.540142,48.0841159 447.671957,48.0841159 C443.916125,48.0841159 441.018118,49.2459501 439.004248,51.5692678 C436.981608,53.892761 435.974673,57.5114108 435.974673,62.404868 L435.974673,75.6462352 L418.712935,75.6462352 L418.712935,33.547592 L435.623825,33.547592 L435.623825,46.932807 C436.558835,42.0391744 438.079763,38.4308746 440.172573,36.0970315 C442.256613,33.7737138 444.952882,32.6120549 448.235068,32.6120549 Z M199.445002,25.2717814 C206.069018,25.2717814 211.665049,26.3306416 216.2559,28.4381876 C220.834471,30.5455582 224.267522,33.4858427 226.542773,37.2485157 C228.816271,41.0111887 229.963545,45.3187292 229.963545,50.1711372 C229.963545,54.9207466 228.775923,59.2282871 226.40068,63.0834087 C224.025437,66.9488803 220.411699,70.0023134 215.550695,72.2537072 C210.689691,74.505101 204.669134,75.6358852 197.473234,75.6358852 L171.967086,75.6358852 L171.967086,25.2717814 L199.445002,25.2717814 Z M42.7277144,41.348354 C36.2959626,41.348354 31.2228711,47.2596223 31.2228711,54.445698 C31.2228711,61.6317737 36.4066553,67.5328673 42.7277144,67.5328673 C49.1596416,67.5328673 54.2425569,61.6317737 54.2325578,54.445698 C54.3432504,47.2492722 49.1596416,41.348354 42.7277144,41.348354 Z M85.244218,41.348354 C78.8122908,41.348354 73.7393746,47.2596223 73.7393746,54.445698 C73.7393746,61.6317737 78.9231588,67.5328673 85.244218,67.5328673 C91.6759697,67.5328673 96.7490613,61.6317737 96.7490613,54.445698 C96.859754,47.2492722 91.6759697,41.348354 85.244218,41.348354 Z M385.457775,44.928235 C382.447496,44.928235 380.091549,45.7814982 378.370638,47.4880245 C376.660253,49.1947263 375.804183,51.4769947 375.804183,54.3555299 C375.804183,57.2340651 376.660253,59.5472082 378.370638,61.2947838 C380.082778,63.0425348 382.447496,63.9266726 385.457775,63.9266726 C388.415426,63.9163226 390.752076,63.0425348 392.462462,61.2947838 C394.174602,59.5472082 395.039443,57.2340651 395.039443,54.3555299 C395.039443,51.4769947 394.183373,49.1843762 392.462462,47.4880245 C390.752076,45.7814982 388.415426,44.928235 385.457775,44.928235 Z M485.225009,45.1441822 C482.316476,45.1441822 479.992106,45.9974454 478.250144,47.7039717 C476.508182,49.4106734 475.643341,51.6208425 475.643341,54.3555299 C475.643341,57.0902173 476.508182,59.3210865 478.250144,61.0481374 C479.992106,62.7751884 482.286654,63.6388016 485.154839,63.6388016 C488.063372,63.628627 490.398267,62.7546638 492.16128,61.0070882 C493.922539,59.2593372 494.797906,56.9874188 494.797906,54.2116821 C494.797906,51.528394 493.941836,49.3385741 492.23145,47.6629224 C490.51931,45.9872707 488.173889,45.1441822 485.225009,45.1441822 Z M198.18721,38.0812543 L189.591426,38.0812543 L189.591426,62.8367623 L197.190801,62.8367623 C201.650084,62.8367623 205.083135,61.6956281 207.477675,59.4235342 C209.873969,57.1412658 211.072116,54.0366088 211.072116,50.0992133 C211.072116,46.4495134 210.003783,43.5401036 207.870625,41.3606337 C205.737467,39.1811638 202.506154,38.0812543 198.18721,38.0812543 Z M244.509717,22.2386975 C249.261958,22.2386975 253.116027,25.7734945 253.116027,30.1340131 C253.116027,34.4945317 249.261958,38.0295041 244.509717,38.0295041 C239.755722,38.0295041 235.903407,34.4945317 235.903407,30.1340131 C235.903407,25.7734945 239.755722,22.2386975 244.509717,22.2386975 Z"
                        fill="#DDE0E4"
                        fillRule="nonzero"
                      ></path>
                    </g>
                  </svg>
                </div>
                <div id="spotify-logo">
                  <svg
                    className="w-[12.5rem] h-28"
                    width="9772.44px"
                    height="9772.44px"
                    viewBox="74.428 -2051.565 9772.44 9772.44"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#DDE0E4"
                      d="M1539.928 1369.145c-809.356 0-1465.5 656.126-1465.5 1465.482 0 809.443 656.144 1465.535 1465.5 1465.535 809.392 0 1465.5-656.091 1465.5-1465.535 0-809.304-656.074-1465.412-1465.518-1465.412l.018-.07zm672.069 2113.646c-26.32 43.173-82.565 56.7-125.598 30.397-344.137-210.332-777.297-257.845-1287.421-141.312-49.157 11.271-98.157-19.547-109.356-68.688-11.253-49.157 19.424-98.157 68.704-109.356 558.249-127.628 1037.101-72.695 1423.378 163.344 43.05 26.426 56.699 82.601 30.275 125.65l.018-.035zm179.374-398.981c-33.145 53.777-103.46 70.647-157.167 37.624-393.837-242.094-994.384-312.217-1460.32-170.781-60.428 18.252-124.25-15.803-142.59-76.125-18.2-60.428 15.873-124.128 76.195-142.503 532.227-161.489 1193.865-83.265 1646.239 194.723 53.726 33.075 70.7 103.425 37.625 157.079l.018-.017zm15.4-415.52c-472.395-280.542-1251.599-306.337-1702.556-169.47-72.414 21.962-148.994-18.918-170.939-91.333-21.945-72.449 18.9-148.977 91.367-170.992 517.667-157.149 1378.229-126.787 1922.022 196.035 65.135 38.657 86.503 122.779 47.897 187.827-38.5 65.135-122.85 86.607-187.774 47.933h-.017zM4061.569 2722.05c-253.033-60.34-298.078-102.689-298.078-191.678 0-84.069 79.152-140.646 196.857-140.646 114.1 0 227.237 42.962 345.852 131.407 3.588 2.678 8.086 3.744 12.513 3.045 4.428-.665 8.348-3.098 10.938-6.755l123.55-174.16c5.075-7.175 3.692-17.062-3.15-22.54-141.172-113.277-300.142-168.35-485.956-168.35-273.21 0-464.047 163.957-464.047 398.545 0 251.562 164.622 340.637 449.102 409.394 242.13 55.772 282.993 102.498 282.993 186.025 0 92.557-82.636 150.097-215.618 150.097-147.699 0-268.169-49.752-402.937-166.46-3.342-2.888-7.928-4.199-12.162-3.954-4.463.367-8.541 2.432-11.375 5.845l-138.53 164.867c-5.81 6.842-5.075 17.062 1.646 22.978 156.799 139.982 349.648 213.92 557.759 213.92 294.401 0 484.644-160.86 484.644-409.832.525-210.175-125.299-326.55-433.474-401.52l-.527-.228zM5161.617 2472.5c-127.609 0-232.277 50.26-318.587 153.247v-115.92c0-9.152-7.42-16.607-16.555-16.607h-226.572c-9.152 0-16.555 7.455-16.555 16.607V3797.86c0 9.152 7.402 16.607 16.555 16.607h226.572c9.135 0 16.555-7.454 16.555-16.607v-406.577c86.328 96.88 191.013 144.218 318.587 144.218 237.107 0 477.138-182.524 477.138-531.439.35-349.002-239.75-531.579-476.875-531.579l-.263.017zm213.675 531.562c0 177.678-109.445 301.665-266.158 301.665-154.926 0-271.791-129.623-271.791-301.665 0-172.024 116.865-301.664 271.791-301.664 154.176-.018 266.176 126.822 266.176 301.646l-.018.018zM6253.966 2472.5c-305.357 0-544.582 235.13-544.582 535.359 0 296.957 237.58 529.619 540.837 529.619 306.442 0 546.401-234.342 546.401-533.417 0-298.042-238.35-531.526-542.674-531.526l.018-.035zm0 834.994c-162.418 0-284.865-130.498-284.865-303.52 0-173.758 118.213-299.845 281.119-299.845 163.468 0 286.737 130.497 286.737 303.642 0 173.723-118.999 299.723-282.975 299.723h-.016zM7448.688 2493.221h-249.322v-254.905c0-9.135-7.385-16.59-16.537-16.59h-226.537c-9.17 0-16.607 7.455-16.607 16.59v254.905h-108.938c-9.117 0-16.503 7.454-16.503 16.607v194.722c0 9.135 7.386 16.607 16.503 16.607h108.938v503.842c0 203.612 101.342 306.845 301.209 306.845 81.271 0 148.697-16.783 212.24-52.815 5.162-2.888 8.364-8.452 8.364-14.367v-185.43c0-5.723-2.976-11.13-7.875-14.122-4.935-3.098-11.077-3.255-16.135-.753-43.646 21.963-85.837 32.095-133 32.095-72.694 0-105.122-33.005-105.122-106.977v-468.229h249.322c9.152 0 16.52-7.455 16.52-16.607v-194.705c.35-9.152-7-16.607-16.274-16.607l-.246-.106zM8317.388 2494.218v-31.308c0-92.103 35.314-133.175 114.52-133.175 47.232 0 85.173 9.38 127.662 23.555 5.233 1.646 10.692.823 14.945-2.31 4.375-3.133 6.843-8.155 6.843-13.475V2146.58c0-7.298-4.69-13.755-11.726-15.908-44.888-13.353-102.322-27.055-188.316-27.055-209.266 0-319.883 117.845-319.883 340.672v47.95h-108.85c-9.135 0-16.625 7.455-16.625 16.59v195.72c0 9.135 7.49 16.607 16.625 16.607h108.85v777.156c0 9.152 7.385 16.607 16.521 16.607h226.572c9.152 0 16.607-7.455 16.607-16.607V2721.21h211.54l324.047 776.964c-36.785 81.637-72.959 97.877-122.342 97.877-39.918 0-81.953-11.918-124.934-35.438-4.042-2.223-8.837-2.59-13.194-1.242-4.323 1.522-7.962 4.742-9.8 8.942l-76.79 168.472c-3.658 7.963-.525 17.309 7.14 21.438 80.167 43.417 152.531 61.949 241.973 61.949 167.299 0 259.77-77.927 341.285-287.577l393.066-1015.698c1.977-5.11 1.383-10.885-1.75-15.417-3.113-4.498-8.137-7.21-13.633-7.21h-235.865c-7.068 0-13.389 4.497-15.697 11.13l-241.621 690.164-264.652-690.619c-2.414-6.423-8.609-10.676-15.469-10.676h-387.101l.052-.051zM7813.738 2493.221h-226.572c-9.153 0-16.607 7.454-16.607 16.607v988.485c0 9.152 7.454 16.607 16.607 16.607h226.572c9.135 0 16.607-7.455 16.607-16.607v-988.416a16.57 16.57 0 0 0-16.626-16.607l.019-.069zM7701.738 2043.139c-89.757 0-162.592 72.659-162.592 162.417 0 89.81 72.853 162.558 162.593 162.558 89.723 0 162.486-72.748 162.486-162.558 0-89.74-72.799-162.417-162.398-162.417h-.089zM9686.585 2811.037c-89.67 0-159.441-72.013-159.441-159.46s70.682-160.282 160.281-160.282c89.672 0 159.443 71.995 159.443 159.372 0 87.448-70.701 160.37-160.299 160.37h.016zm.875-303.887c-81.672 0-143.465 64.925-143.465 144.427 0 79.468 61.355 143.518 142.643 143.518 81.654 0 143.518-64.872 143.518-144.428 0-79.467-61.426-143.517-142.625-143.517h-.071zm35.352 159.914l45.098 63.141h-38.027l-40.602-57.925h-34.91v57.925h-31.832v-167.37h74.637c38.885 0 64.453 19.897 64.453 53.393.174 27.44-15.75 44.205-38.676 50.837h-.141zm-26.95-75.511h-41.512v52.938h41.512c20.719 0 33.09-10.133 33.09-26.495 0-17.22-12.424-26.442-33.074-26.442h-.016z"
                    />
                  </svg>
                </div>
              </div>
            </section>
            <section className="reviews flex flex-col gap-8">
              <div className="reviews-desc flex flex-col gap-10">
                <p className="text-center m-0 font-rubik font-medium text-[2.1875rem] text-second-black">
                  Loved by Thousands of
                  <br />
                  Happy Customer
                </p>
                <p className="text-center m-0 font-rubik font-normal text-base text-first-gray">
                  These are the stories of our customers who have visited us
                  with great
                  <br />
                  pleasure.
                </p>
              </div>
              <div className="reviews-slider">
                <div className="slider-content-wrapper">
                  <div className="slider-content flex flex-row flex-wrap lg:flex-nowrap gap-4 lg:gap-44 justify-center">
                    <div
                      className="review-card flex flex-col pt-6 pb-2 px-6 review-w border-2 border-solid border-first-brown rounded-[0.625rem]"
                      id="review-card1"
                    >
                      <div className="review-card-title flex flex-row justify-between">
                        <div className="img-name-wrapper flex flex-row gap-4">
                          <img
                            src={review1}
                            alt="Photo of Viezh Robert"
                            className="w-[3.125rem] h-[3.125rem] rounded-full"
                          />
                          <div className="name-location-reviewer flex flex-col gap-4">
                            <p className="m-0 font-rubik font-medium text-xl text-second-black">
                              Viezh Robert
                            </p>
                            <p className="m-0 font-rubik font-normal text-sm text-first-gray">
                              Warsaw, Poland
                            </p>
                          </div>
                        </div>
                        <div className="reviewer-rating flex flex-row gap-6">
                          <p className="m-0 font-rubik font-normal text-base">
                            4.5
                          </p>
                          <svg
                            className="w-5 h-5"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.1892 5.16512L9.22203 4.58856L7.44859 0.993249C7.40015 0.894812 7.32046 0.815124 7.22203 0.766687C6.97515 0.644812 6.67515 0.746374 6.55171 0.993249L4.77828 4.58856L0.811089 5.16512C0.701714 5.18075 0.601714 5.23231 0.525151 5.31044C0.432592 5.40557 0.381587 5.53356 0.383345 5.66628C0.385103 5.79901 0.439479 5.9256 0.534526 6.01825L3.40484 8.81669L2.72671 12.7682C2.71081 12.8602 2.72098 12.9547 2.75608 13.0411C2.79117 13.1276 2.84978 13.2025 2.92526 13.2573C3.00074 13.3121 3.09007 13.3447 3.18312 13.3513C3.27617 13.3579 3.36922 13.3384 3.45171 13.2948L7.00015 11.4292L10.5486 13.2948C10.6455 13.3464 10.758 13.3636 10.8658 13.3448C11.1377 13.2979 11.3205 13.0401 11.2736 12.7682L10.5955 8.81669L13.4658 6.01825C13.5439 5.94169 13.5955 5.84169 13.6111 5.73231C13.6533 5.45887 13.4627 5.20575 13.1892 5.16512Z"
                              fill="#FEA250"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="review-card-desc font-rubik font-normal text-base text-second-black">
                        <p>
                          &quot;Wow... I am very happy to spend my whole
                          <br />
                          day here. The Wi-fi is good, and the coffee and
                          <br />
                          meals tho. I like it here!! Very recommended!&quot;
                        </p>
                      </div>
                    </div>
                    <div
                      className="review-card flex flex-col pt-6 pb-2 px-6 review-w border-2 border-solid border-fourth-white rounded-[0.625rem]"
                      id="review-card2"
                    >
                      <div className="review-card-title flex flex-row justify-between">
                        <div className="img-name-wrapper flex flex-row gap-4">
                          <img
                            src={review2}
                            alt="Photo of Yessica Christy"
                            className="w-[3.125rem] h-[3.125rem] rounded-full"
                          />
                          <div className="name-location-reviewer flex flex-col gap-4">
                            <p className="m-0 font-rubik font-medium text-xl text-second-black">
                              Yessica Christy
                            </p>
                            <p className="m-0 font-rubik font-normal text-sm text-first-gray">
                              Shanxi, China
                            </p>
                          </div>
                        </div>
                        <div className="reviewer-rating flex flex-row gap-6">
                          <p className="m-0 font-rubik font-normal text-base">
                            4.5
                          </p>
                          <svg
                            className="w-5 h-5"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.1892 5.16512L9.22203 4.58856L7.44859 0.993249C7.40015 0.894812 7.32046 0.815124 7.22203 0.766687C6.97515 0.644812 6.67515 0.746374 6.55171 0.993249L4.77828 4.58856L0.811089 5.16512C0.701714 5.18075 0.601714 5.23231 0.525151 5.31044C0.432592 5.40557 0.381587 5.53356 0.383345 5.66628C0.385103 5.79901 0.439479 5.9256 0.534526 6.01825L3.40484 8.81669L2.72671 12.7682C2.71081 12.8602 2.72098 12.9547 2.75608 13.0411C2.79117 13.1276 2.84978 13.2025 2.92526 13.2573C3.00074 13.3121 3.09007 13.3447 3.18312 13.3513C3.27617 13.3579 3.36922 13.3384 3.45171 13.2948L7.00015 11.4292L10.5486 13.2948C10.6455 13.3464 10.758 13.3636 10.8658 13.3448C11.1377 13.2979 11.3205 13.0401 11.2736 12.7682L10.5955 8.81669L13.4658 6.01825C13.5439 5.94169 13.5955 5.84169 13.6111 5.73231C13.6533 5.45887 13.4627 5.20575 13.1892 5.16512Z"
                              fill="#FEA250"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="review-card-desc font-rubik font-normal text-base text-second-black">
                        <p>
                          &quot;I like it because I like to travel far and still
                          can
                          <br />
                          make my day better just by drinking their
                          <br />
                          Hazelnut Latte&quot;
                        </p>
                      </div>
                    </div>
                    <div
                      className="review-card flex flex-col pt-6 pb-2 px-6 review-w border-2 border-solid border-fourth-white rounded-[0.625rem]"
                      id="review-card3"
                    >
                      <div className="review-card-title flex flex-row justify-between">
                        <div className="img-name-wrapper flex flex-row gap-4">
                          <img
                            src={review3}
                            alt="Photo of Kim Young Jou"
                            className="w-[3.125rem] h-[3.125rem] rounded-full"
                          />
                          <div className="name-location-reviewer flex flex-col gap-4">
                            <p className="m-0 font-rubik font-medium text-xl text-second-black">
                              Kim Young Jou
                            </p>
                            <p className="m-0 font-rubik font-normal text-sm text-first-gray">
                              Seoul, South Korea
                            </p>
                          </div>
                        </div>
                        <div className="reviewer-rating flex flex-row gap-6">
                          <p className="m-0 font-rubik font-normal text-base">
                            4.5
                          </p>
                          <svg
                            className="w-5 h-5"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.1892 5.16512L9.22203 4.58856L7.44859 0.993249C7.40015 0.894812 7.32046 0.815124 7.22203 0.766687C6.97515 0.644812 6.67515 0.746374 6.55171 0.993249L4.77828 4.58856L0.811089 5.16512C0.701714 5.18075 0.601714 5.23231 0.525151 5.31044C0.432592 5.40557 0.381587 5.53356 0.383345 5.66628C0.385103 5.79901 0.439479 5.9256 0.534526 6.01825L3.40484 8.81669L2.72671 12.7682C2.71081 12.8602 2.72098 12.9547 2.75608 13.0411C2.79117 13.1276 2.84978 13.2025 2.92526 13.2573C3.00074 13.3121 3.09007 13.3447 3.18312 13.3513C3.27617 13.3579 3.36922 13.3384 3.45171 13.2948L7.00015 11.4292L10.5486 13.2948C10.6455 13.3464 10.758 13.3636 10.8658 13.3448C11.1377 13.2979 11.3205 13.0401 11.2736 12.7682L10.5955 8.81669L13.4658 6.01825C13.5439 5.94169 13.5955 5.84169 13.6111 5.73231C13.6533 5.45887 13.4627 5.20575 13.1892 5.16512Z"
                              fill="#FEA250"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="review-card-desc font-rubik font-normal text-base text-second-black">
                        <p>
                          &quot;This is very unusual for my taste. I
                          haven&apos;t
                          <br />
                          liked coffee before but their coffee is the
                          <br />
                          best! and yup, you have to order the chicken
                          <br />
                          wings, the best in town!&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="slider-control flex flex-row justify-between items-center py-0 px-[10.5rem]">
                <div className="slider-bullets flex flex-row gap-4">
                  <div id="bullet1" className='w-[2.8125em] h-4 bg-first-brown rounded-[1.25rem]'></div>
                  <div id="bullet2" className='w-[0.9375rem] h-[0.9375rem] bg-fifth-white rounded-full'></div>
                  <div id="bullet3" className='w-[0.9375rem] h-[0.9375rem] bg-fifth-white rounded-full'></div>
                  <div id="bullet4" className='w-[0.9375rem] h-[0.9375rem] bg-fifth-white rounded-full'></div>
                </div>
                <div className="slider-arrows flex flex-row gap-6">
                  <div className="left-arrow rounded-full w-[3.75rem] h-[3.75rem] flex justify-center items-center border-2 border-solid border-first-brown bg-white">
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.75 7.74998H3.925L8.4625 2.29998C8.67467 2.04471 8.77675 1.71561 8.74628 1.38507C8.7158 1.05454 8.55527 0.749652 8.3 0.537478C8.04473 0.325305 7.71563 0.223228 7.3851 0.253702C7.05456 0.284177 6.74967 0.444708 6.5375 0.699979L0.2875 8.19998C0.245451 8.25963 0.207849 8.3223 0.175 8.38748C0.175 8.44998 0.175 8.48748 0.0875002 8.54998C0.0308421 8.6933 0.0011764 8.84587 0 8.99998C0.0011764 9.15409 0.0308421 9.30665 0.0875002 9.44998C0.0875002 9.51248 0.0874998 9.54998 0.175 9.61248C0.207849 9.67765 0.245451 9.74032 0.2875 9.79998L6.5375 17.3C6.65503 17.4411 6.8022 17.5546 6.96856 17.6323C7.13491 17.7101 7.31636 17.7503 7.5 17.75C7.79207 17.7505 8.07511 17.6488 8.3 17.4625C8.42657 17.3575 8.5312 17.2287 8.60789 17.0832C8.68458 16.9378 8.73183 16.7787 8.74692 16.6149C8.76202 16.4512 8.74466 16.2861 8.69586 16.1291C8.64705 15.9721 8.56775 15.8263 8.4625 15.7L3.925 10.25H18.75C19.0815 10.25 19.3995 10.1183 19.6339 9.88386C19.8683 9.64944 20 9.3315 20 8.99998C20 8.66846 19.8683 8.35052 19.6339 8.1161C19.3995 7.88167 19.0815 7.74998 18.75 7.74998Z" fill="#6A4029"/>
                    </svg>
                  </div>
                  <div className="right-arrow rounded-full w-[3.75rem] h-[3.75rem] flex justify-center items-center border-2 border-solid border-first-brown bg-first-brown">
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.25 7.74998H16.075L11.5375 2.29998C11.3253 2.04471 11.2232 1.71561 11.2537 1.38507C11.2842 1.05454 11.4447 0.749652 11.7 0.537478C11.9553 0.325305 12.2844 0.223228 12.6149 0.253702C12.9454 0.284177 13.2503 0.444708 13.4625 0.699979L19.7125 8.19998C19.7545 8.25963 19.7922 8.3223 19.825 8.38748C19.825 8.44998 19.825 8.48748 19.9125 8.54998C19.9692 8.6933 19.9988 8.84587 20 8.99998C19.9988 9.15409 19.9692 9.30665 19.9125 9.44998C19.9125 9.51248 19.9125 9.54998 19.825 9.61248C19.7922 9.67765 19.7545 9.74032 19.7125 9.79998L13.4625 17.3C13.345 17.4411 13.1978 17.5546 13.0314 17.6323C12.8651 17.7101 12.6836 17.7503 12.5 17.75C12.2079 17.7505 11.9249 17.6488 11.7 17.4625C11.5734 17.3575 11.4688 17.2287 11.3921 17.0832C11.3154 16.9378 11.2682 16.7787 11.2531 16.6149C11.238 16.4512 11.2553 16.2861 11.3041 16.1291C11.3529 15.9721 11.4322 15.8263 11.5375 15.7L16.075 10.25H1.25C0.91848 10.25 0.600536 10.1183 0.366116 9.88386C0.131695 9.64944 0 9.3315 0 8.99998C0 8.66846 0.131695 8.35052 0.366116 8.1161C0.600536 7.88167 0.91848 7.74998 1.25 7.74998Z" fill="white"/>
                    </svg>
                  </div>
                </div>
              </div> */}
              </div>
            </section>
            <div className="promo-float flex flex-row justify-around lg:w-[71.25rem] py-4 lg:py-8 px-16 lg:px-0 bg-white shadow-[0px_1px_5px_0px_rgba(13,16,37,0.155)] rounded-[0.6525rem] absolute bottom-[-80px] right-[65px] lg:right-[180px] z-10">
              <div className="promo-float-desc flex flex-col justify-center gap-4">
                <p className="m-0 font-rubik text-second-black font-medium text-[2.1875rem]">
                  Check our promo
                  <br />
                  today!
                </p>
                <p className="m-0 font-rubik text-first-gray font-normal text-base">
                  Let&apos;s see the deals and pick yours!
                </p>
              </div>
              <div className="promo-float-button flex items-center">
                <button className="font-rubik text-first-brown bg-first-yellow font-bold text-base border-none rounded-[0.625rem] w-[15.625rem] h-[3.75rem]">
                  See Promo
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;

{
  /* <div className="slider-content-wrapper grid grid-cols-1 grid-rows-1 ml-44">
                <div className="slider-content grid grid-cols-3 grid-rows-1 justify-end gap-20">
                  <div className="review-card flex flex-col pt-6 pb-2 px-6 review-w border-2 border-solid border-first-brown rounded-[0.625rem]" id="review-card1">
                    <div className="review-card-title flex flex-row justify-between">
                      <div className="img-name-wrapper flex flex-row gap-4">
                        <img src={review1} alt="Photo of Viezh Robert" className='w-[3.125rem] h-[3.125rem] rounded-full' />
                        <div className="name-location-reviewer flex flex-col gap-4">
                          <p className='m-0 font-rubik font-medium text-xl text-second-black'>Viezh Robert</p>
                          <p className='m-0 font-rubik font-normal text-sm text-first-gray'>Warsaw, Poland</p>
                        </div>
                      </div>
                      <div className="reviewer-rating flex flex-row gap-6">
                        <p className='m-0 font-rubik font-normal text-base'>4.5</p>
                        <svg className='w-5 h-5' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.1892 5.16512L9.22203 4.58856L7.44859 0.993249C7.40015 0.894812 7.32046 0.815124 7.22203 0.766687C6.97515 0.644812 6.67515 0.746374 6.55171 0.993249L4.77828 4.58856L0.811089 5.16512C0.701714 5.18075 0.601714 5.23231 0.525151 5.31044C0.432592 5.40557 0.381587 5.53356 0.383345 5.66628C0.385103 5.79901 0.439479 5.9256 0.534526 6.01825L3.40484 8.81669L2.72671 12.7682C2.71081 12.8602 2.72098 12.9547 2.75608 13.0411C2.79117 13.1276 2.84978 13.2025 2.92526 13.2573C3.00074 13.3121 3.09007 13.3447 3.18312 13.3513C3.27617 13.3579 3.36922 13.3384 3.45171 13.2948L7.00015 11.4292L10.5486 13.2948C10.6455 13.3464 10.758 13.3636 10.8658 13.3448C11.1377 13.2979 11.3205 13.0401 11.2736 12.7682L10.5955 8.81669L13.4658 6.01825C13.5439 5.94169 13.5955 5.84169 13.6111 5.73231C13.6533 5.45887 13.4627 5.20575 13.1892 5.16512Z" fill="#FEA250"/>
                        </svg>
                      </div>
                    </div>
                    <div className="review-card-desc font-rubik font-normal text-base text-second-black">
                      <p>&quot;Wow... I am very happy to spend my whole<br />day here. The Wi-fi is good, and the coffee and<br />meals tho. I like it here!! Very recommended!&quot;</p>
                    </div>
                  </div>
                  <div className="review-card flex flex-col pt-6 pb-2 px-6 review-w border-2 border-solid border-fourth-white rounded-[0.625rem]" id="review-card2">
                    <div className="review-card-title flex flex-row justify-between">
                      <div className="img-name-wrapper flex flex-row gap-4">
                        <img src={review2} alt="Photo of Yessica Christy" className='w-[3.125rem] h-[3.125rem] rounded-full' />
                        <div className="name-location-reviewer flex flex-col gap-4">
                          <p className='m-0 font-rubik font-medium text-xl text-second-black'>Yessica Christy</p>
                          <p className='m-0 font-rubik font-normal text-sm text-first-gray'>Shanxi, China</p>
                        </div>
                      </div>
                      <div className="reviewer-rating flex flex-row gap-6">
                        <p className='m-0 font-rubik font-normal text-base'>4.5</p>
                        <svg className='w-5 h-5' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.1892 5.16512L9.22203 4.58856L7.44859 0.993249C7.40015 0.894812 7.32046 0.815124 7.22203 0.766687C6.97515 0.644812 6.67515 0.746374 6.55171 0.993249L4.77828 4.58856L0.811089 5.16512C0.701714 5.18075 0.601714 5.23231 0.525151 5.31044C0.432592 5.40557 0.381587 5.53356 0.383345 5.66628C0.385103 5.79901 0.439479 5.9256 0.534526 6.01825L3.40484 8.81669L2.72671 12.7682C2.71081 12.8602 2.72098 12.9547 2.75608 13.0411C2.79117 13.1276 2.84978 13.2025 2.92526 13.2573C3.00074 13.3121 3.09007 13.3447 3.18312 13.3513C3.27617 13.3579 3.36922 13.3384 3.45171 13.2948L7.00015 11.4292L10.5486 13.2948C10.6455 13.3464 10.758 13.3636 10.8658 13.3448C11.1377 13.2979 11.3205 13.0401 11.2736 12.7682L10.5955 8.81669L13.4658 6.01825C13.5439 5.94169 13.5955 5.84169 13.6111 5.73231C13.6533 5.45887 13.4627 5.20575 13.1892 5.16512Z" fill="#FEA250"/>
                        </svg>
                      </div>
                    </div>
                    <div className="review-card-desc font-rubik font-normal text-base text-second-black">
                      <p>&quot;I like it because I like to travel far and still can<br />make my day better just by drinking their<br />Hazelnut Latte&quot;</p>
                    </div>
                  </div>
                  <div className="review-card flex flex-col pt-6 pb-2 px-6 review-w border-2 border-solid border-fourth-white rounded-[0.625rem]" id="review-card3">
                    <div className="review-card-title flex flex-row justify-between">
                      <div className="img-name-wrapper flex flex-row gap-4">
                        <img src={review3} alt="Photo of Kim Young Jou" className='w-[3.125rem] h-[3.125rem] rounded-full' />
                        <div className="name-location-reviewer flex flex-col gap-4">
                          <p className='m-0 font-rubik font-medium text-xl text-second-black'>Kim Young Jou</p>
                          <p className='m-0 font-rubik font-normal text-sm text-first-gray'>Seoul, South Korea</p>
                        </div>
                      </div>
                      <div className="reviewer-rating flex flex-row gap-6">
                        <p className='m-0 font-rubik font-normal text-base'>4.5</p>
                        <svg className='w-5 h-5' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.1892 5.16512L9.22203 4.58856L7.44859 0.993249C7.40015 0.894812 7.32046 0.815124 7.22203 0.766687C6.97515 0.644812 6.67515 0.746374 6.55171 0.993249L4.77828 4.58856L0.811089 5.16512C0.701714 5.18075 0.601714 5.23231 0.525151 5.31044C0.432592 5.40557 0.381587 5.53356 0.383345 5.66628C0.385103 5.79901 0.439479 5.9256 0.534526 6.01825L3.40484 8.81669L2.72671 12.7682C2.71081 12.8602 2.72098 12.9547 2.75608 13.0411C2.79117 13.1276 2.84978 13.2025 2.92526 13.2573C3.00074 13.3121 3.09007 13.3447 3.18312 13.3513C3.27617 13.3579 3.36922 13.3384 3.45171 13.2948L7.00015 11.4292L10.5486 13.2948C10.6455 13.3464 10.758 13.3636 10.8658 13.3448C11.1377 13.2979 11.3205 13.0401 11.2736 12.7682L10.5955 8.81669L13.4658 6.01825C13.5439 5.94169 13.5955 5.84169 13.6111 5.73231C13.6533 5.45887 13.4627 5.20575 13.1892 5.16512Z" fill="#FEA250"/>
                        </svg>
                      </div>
                    </div>
                    <div className="review-card-desc font-rubik font-normal text-base text-second-black">
                      <p>&quot;This is very unusual for my taste. I haven&apos;t<br />liked coffee before but their coffee is the<br />best! and yup, you have to order the chicken<br />wings, the best in town!&quot;</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="slider-control flex flex-row justify-between items-center py-0 px-[10.5rem]">
                <div className="slider-bullets flex flex-row gap-4">
                  <div id="bullet1" className='w-[2.8125em] h-4 bg-first-brown rounded-[1.25rem]'></div>
                  <div id="bullet2" className='w-[0.9375rem] h-[0.9375rem] bg-fifth-white rounded-full'></div>
                  <div id="bullet3" className='w-[0.9375rem] h-[0.9375rem] bg-fifth-white rounded-full'></div>
                  <div id="bullet4" className='w-[0.9375rem] h-[0.9375rem] bg-fifth-white rounded-full'></div>
                </div>
                <div className="slider-arrows flex flex-row gap-6">
                  <div className="left-arrow rounded-full w-[3.75rem] h-[3.75rem] flex justify-center items-center border-2 border-solid border-first-brown bg-white">
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.75 7.74998H3.925L8.4625 2.29998C8.67467 2.04471 8.77675 1.71561 8.74628 1.38507C8.7158 1.05454 8.55527 0.749652 8.3 0.537478C8.04473 0.325305 7.71563 0.223228 7.3851 0.253702C7.05456 0.284177 6.74967 0.444708 6.5375 0.699979L0.2875 8.19998C0.245451 8.25963 0.207849 8.3223 0.175 8.38748C0.175 8.44998 0.175 8.48748 0.0875002 8.54998C0.0308421 8.6933 0.0011764 8.84587 0 8.99998C0.0011764 9.15409 0.0308421 9.30665 0.0875002 9.44998C0.0875002 9.51248 0.0874998 9.54998 0.175 9.61248C0.207849 9.67765 0.245451 9.74032 0.2875 9.79998L6.5375 17.3C6.65503 17.4411 6.8022 17.5546 6.96856 17.6323C7.13491 17.7101 7.31636 17.7503 7.5 17.75C7.79207 17.7505 8.07511 17.6488 8.3 17.4625C8.42657 17.3575 8.5312 17.2287 8.60789 17.0832C8.68458 16.9378 8.73183 16.7787 8.74692 16.6149C8.76202 16.4512 8.74466 16.2861 8.69586 16.1291C8.64705 15.9721 8.56775 15.8263 8.4625 15.7L3.925 10.25H18.75C19.0815 10.25 19.3995 10.1183 19.6339 9.88386C19.8683 9.64944 20 9.3315 20 8.99998C20 8.66846 19.8683 8.35052 19.6339 8.1161C19.3995 7.88167 19.0815 7.74998 18.75 7.74998Z" fill="#6A4029"/>
                    </svg>
                  </div>
                  <div className="right-arrow rounded-full w-[3.75rem] h-[3.75rem] flex justify-center items-center border-2 border-solid border-first-brown bg-first-brown">
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.25 7.74998H16.075L11.5375 2.29998C11.3253 2.04471 11.2232 1.71561 11.2537 1.38507C11.2842 1.05454 11.4447 0.749652 11.7 0.537478C11.9553 0.325305 12.2844 0.223228 12.6149 0.253702C12.9454 0.284177 13.2503 0.444708 13.4625 0.699979L19.7125 8.19998C19.7545 8.25963 19.7922 8.3223 19.825 8.38748C19.825 8.44998 19.825 8.48748 19.9125 8.54998C19.9692 8.6933 19.9988 8.84587 20 8.99998C19.9988 9.15409 19.9692 9.30665 19.9125 9.44998C19.9125 9.51248 19.9125 9.54998 19.825 9.61248C19.7922 9.67765 19.7545 9.74032 19.7125 9.79998L13.4625 17.3C13.345 17.4411 13.1978 17.5546 13.0314 17.6323C12.8651 17.7101 12.6836 17.7503 12.5 17.75C12.2079 17.7505 11.9249 17.6488 11.7 17.4625C11.5734 17.3575 11.4688 17.2287 11.3921 17.0832C11.3154 16.9378 11.2682 16.7787 11.2531 16.6149C11.238 16.4512 11.2553 16.2861 11.3041 16.1291C11.3529 15.9721 11.4322 15.8263 11.5375 15.7L16.075 10.25H1.25C0.91848 10.25 0.600536 10.1183 0.366116 9.88386C0.131695 9.64944 0 9.3315 0 8.99998C0 8.66846 0.131695 8.35052 0.366116 8.1161C0.600536 7.88167 0.91848 7.74998 1.25 7.74998Z" fill="white"/>
                    </svg>
                  </div>
                </div>
              </div> */
}
