import React from "react";
import { useLottie } from "lottie-react";
import { useNavigate } from "react-router-dom";

import pageNotFound from "../../assets/lottie/404.json";

function Error() {
  const navigate = useNavigate();

  const options = {
    animationData: pageNotFound,
    loop: true,
    autoplay: true,
  };

  const style = {
    width: 320,
    height: 320,
  };

  const { View } = useLottie(options, style);

  document.title = "Page Not Found";

  return (
    <main className="h-screen flex flex-col items-center justify-center gap-y-10">
      <div>{View}</div>
      <button
        onClick={() => navigate("/")}
        className="group flex flex-row justify-center items-center gap-x-2 rounded-md p-4 bg-first-brown hover:bg-first-yellow text-first-yellow hover:text-first-brown duration-300"
      >
        <i className="material-icons-round transform group-hover:-translate-x-2 duration-300">
          arrow_back_ios
        </i>
        <p className="font-poppins text-lg">Back to Home</p>
      </button>
    </main>
  );
}

export default Error;
