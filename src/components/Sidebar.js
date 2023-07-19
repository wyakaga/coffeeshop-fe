/* eslint-disable react/prop-types */
import React, { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar({
  toggleState,
  token,
  handleToggle,
  img,
  name,
  defaultProfile,
  greeting,
  onInputChange,
  searchLogo,
  searchHandler,
  adminRole,
  setIsDialogOpen,
}) {
  const navigate = useNavigate();

  return (
    <>
      <Transition show={toggleState} as={Fragment}>
        <Dialog
          unmount={false}
          onClose={() => handleToggle()}
          className="fixed z-[51] inset-0 overflow-y-auto lg:hidden"
        >
          <div className="fixed top-0 right-0">
            <div className="flex w-3/4 h-screen">
              <Transition.Child
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed bg-white/40 backdrop-filter backdrop-blur-md inset-0 overflow-y-auto" />
              </Transition.Child>
              <Transition.Child
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.1)] flex flex-col h-full md:w-[40vw] w-[80vw] z-[52] gap-y-4">
                  {token ? (
                    <div className="flex flex-row gap-x-5 bg-first-brown justify-center pt-4 pb-7 rounded-bl-3xl">
                      <div className="rounded-full w-20 h-20 overflow-hidden">
                        <img
                          src={img ? img : defaultProfile}
                          alt={`${name} profile picture`}
                          className="w-full h-full rounded-full object-cover object-center"
                        />
                      </div>
                      <p className="text-lg text-white font-poppins select-none">
                        {greeting}, <br />{" "}
                        <span className="text-first-yellow font-bold text-xl">
                          {name}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center gap-y-4 mt-4 px-4">
                      <div className="auth-login-wrapper flex items-center justify-center rounded-md bg-first-brown w-full">
                        <div className="auth-login p-4">
                          <Link to={"/login"}>
                            <p className="text-first-yellow text-xl no-underline font-rubik font-medium">
                              Login
                            </p>
                          </Link>
                        </div>
                      </div>
                      <div className="auth-signup-wrapper flex items-center justify-center rounded-md bg-first-yellow w-full">
                        <div className="auth-signup whitespace-nowrap p-4">
                          <Link to={"/signup"}>
                            <p className="text-first-brown text-xl no-underline font-rubik font-medium">
                              Sign Up
                            </p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                  {token && (
                    <div className="relative w-full flex justify-center items-start ">
                      <input
                        type="text"
                        placeholder="Search here..."
                        onChange={onInputChange}
                        className="border text-first-brown font-medium font-poppins border-gray-300 hover:border-gray-400 focus:outline-none placeholder:text-first-brown placeholder:font-poppins placeholder:font-medium appearance-none bg-transparent rounded-md h-10 w-11/12 pl-5 pr-14"
                      />
                      <div className="absolute top-[10px] right-[20px] h-1/2">
                        <div className="group relative flex">
                          <img
                            src={searchLogo}
                            alt="search icon"
                            onClick={searchHandler}
                            className="h-5 cursor-pointer"
                          />
                          <span className="absolute top-8 -right-2 scale-0 transition-all rounded bg-black py-2 px-4 text-xs text-white whitespace-nowrap group-hover:scale-100 group-active:scale-0">
                            Search
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col gap-y-36">
                    <div className="flex flex-col pl-4 gap-y-3">
                      <div
                        onClick={() => navigate("/")}
                        className="flex flex-row items-center gap-x-3 text-xl"
                      >
                        <i className="material-icons-round text-first-brown text-2xl">
                          home
                        </i>
                        <p className="font-poppins font-semibold text-first-brown">
                          Home
                        </p>
                      </div>
                      {token && (
                        <div
                          onClick={() => navigate("/profile")}
                          className="flex flex-row items-center gap-x-3 text-xl"
                        >
                          <i className="material-icons-round text-first-brown text-2xl">
                            person
                          </i>
                          <p className="font-poppins font-semibold text-first-brown">
                            Profile
                          </p>
                        </div>
                      )}
                      {token && (
                        <div className="flex flex-row items-center justify-between pr-4">
                          <div className="flex flex-row items-center gap-x-3 text-xl">
                            <i className="material-icons-round text-first-brown text-2xl">
                              chat
                            </i>
                            <p className="font-poppins font-semibold text-first-brown">
                              Message
                            </p>
                          </div>
                          <p className="font-rubik w-6 h-6 rounded-full text-center text-white bg-first-brown">
                            1
                          </p>
                        </div>
                      )}
                      <div
                        onClick={() => navigate("/products")}
                        className="flex flex-row items-center gap-x-3 text-xl"
                      >
                        <i className="material-icons-round text-first-brown text-2xl">
                          restaurant
                        </i>
                        <p className="font-poppins font-semibold text-first-brown">
                          Products
                        </p>
                      </div>
                      {token && adminRole === 1 ? (
                        <div className="flex flex-row items-center gap-x-3 text-xl">
                          <i className="material-icons-round text-first-brown text-2xl">
                            shopping_basket
                          </i>
                          <p className="font-poppins font-semibold text-first-brown">
                            Orders
                          </p>
                        </div>
                      ) : (
                        <div
                          onClick={() => navigate("/payment")}
                          className="flex flex-row items-center gap-x-3 text-xl"
                        >
                          <i className="material-icons-round text-first-brown text-2xl">
                            shopping_cart
                          </i>
                          <p className="font-poppins font-semibold text-first-brown">
                            Your Cart
                          </p>
                        </div>
                      )}
                      {token && adminRole === 1 ? (
                        <div
                          onClick={() => navigate("/dashboard")}
                          className="flex flex-row items-center gap-x-3 text-xl"
                        >
                          <i className="material-icons-round text-first-brown text-2xl">
                            dashboard
                          </i>
                          <p className="font-poppins font-semibold text-first-brown">
                            Dashboard
                          </p>
                        </div>
                      ) : (
                        <div
                          onClick={() => navigate("/history")}
                          className="flex flex-row items-center gap-x-3 text-xl"
                        >
                          <i className="material-icons-round text-first-brown text-2xl">
                            receipt
                          </i>
                          <p className="font-poppins font-semibold text-first-brown">
                            History
                          </p>
                        </div>
                      )}
                    </div>
                    {token && (
                      <div
                        onClick={() => setIsDialogOpen(true)}
                        className="flex flex-row items-center gap-x-3 text-xl pl-4"
                      >
                        <i className="material-icons-round text-first-brown text-2xl">
                          logout
                        </i>
                        <p className="font-poppins font-semibold text-first-brown">
                          Log Out
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default Sidebar;
