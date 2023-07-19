import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

import { getOtp, forgot } from "../../utils/https/auth";

import FooterAuth from "../../components/FooterAuth";

import coffeeLogo from "../../assets/icon/coffee-shop-logo.webp";
import { useNavigate } from "react-router-dom";

function Forgot() {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [timeLeft, setTimeLeft] = React.useState({ minutes: 0, seconds: 0 });
  const [form, setForm] = React.useState({ otp: "", password: "" });
  const [error, setError] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [otpReceived, setOtpReceived] = React.useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const emailSubmitHandler = (e) => {
    e.preventDefault();

    let invalid = "";

    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gm;

    if (!email) {
      invalid = "Email is required";
    } else if (!emailRegex.test(email)) {
      invalid = "Invalid email";
    }

    setError(invalid);

    if (invalid === "") {
      toast.promise(getOtp(email), {
        loading: "Please wait...",
        success: () => {
          setTimeLeft({ minutes: 2, seconds: 0 });
          setOtpReceived(true);
          return <>Check your email inbox</>;
        },
        error: "Something went wrong",
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const { seconds, minutes } = timeLeft;

      if (seconds > 0) {
        setTimeLeft({ ...timeLeft, seconds: seconds - 1 });
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
          setEmail("");
          setOtpReceived(false);
        } else {
          setTimeLeft(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const minutes = timeLeft.minutes;
  const seconds = timeLeft.seconds;

  const onChangeForm = (e) => {
    setForm((form) => {
      return { ...form, [e.target.name]: e.target.value };
    });
  };

  const otpSubmitHandler = (e) => {
    e.preventDefault();
    toast.promise(forgot(email, form.otp, form.password), {
      loading: () => {
        e.target.disabled = true;
        return <>Please wait</>;
      },
      success: () => {
        e.target.disabled = false;
        setTimeLeft({ minutes: 0, seconds: 0 });
        navigate("/login");
        return <>Successfully changed password</>;
      },
      error: () => {
        e.target.disabled = false;
        return <>Something went wrong</>;
      },
    });
  };

  document.title = "Forgot your password?";

  return (
    <div className="body-wrapper grid lg:grid-cols-2 grid-cols-1 grid-rows-1">
      <section className="image-holder lg:forgot-bg lg:bg-cover lg:bg-center lg:block hidden"></section>
      <section className="text-holder flex flex-col font-rubik">
        <header className="lg:pt-8 pt-4 lg:pb-2 pb-4 lg:px-12 px-[3.75rem]">
          <div className="header-wrapper flex flex-row justify-center items-center">
            <a
              href="#"
              className="brand flex items-center text-first-black no-underline font-bold text-[1.19rem] font-rubik"
            >
              <img
                src={coffeeLogo}
                alt="coffee shop logo"
                className="brand-img"
              />
              Coffee Shop
            </a>
          </div>
        </header>
        <main className="lg:py-16 lg:px-2 px-3 py-12 md:p-12 lg:my-16 lg:mx-0 m-0 font-poppins lg:bg-none forgot-bg bg-cover bg-center">
          <section className="main-wrapper flex flex-col items-center lg:p-0 p-5 lg:border-none border border-solid border-[rgba(209,213,219,0.3)] lg:rounded-none rounded-[12px] lg:bg-white bg-[rgba(255,255,255,0.884)]">
            <div className="forgot-desc text-center">
              <h1 className="text-[3.25rem] font-bold">
                Forgot your password?
              </h1>
              <p className="text-[1.875rem] font-normal">
                Don&apos;t worry, we got your back!
              </p>
            </div>
            <div className="form-wrapper md:w-[38.188rem] flex flex-col items-center lg:py-6 lg:px-0 md:p-12 gap-12">
              {otpReceived && timeLeft.minutes >= 0 && timeLeft.minutes >= 0 ? (
                <form
                  onSubmit={(e) => otpSubmitHandler(e)}
                  className="flex flex-col gap-4 md:w-full"
                >
                  <div
                    className="form-content-wrapper flex flex-col gap-2"
                    id="otp-wrapper"
                  >
                    <input
                      type="text"
                      name="otp"
                      placeholder="Enter your OTP code"
                      id="otp"
                      className="input-h rounded-[20px] focus:border-first-green outline-none lg:border lg:border-solid border-none text-lg pt-0 pr-0 pb-0 transition-all duration-300 pl-3"
                      value={form.otp}
                      onChange={onChangeForm}
                    />
                  </div>
                  <div
                    className="form-content-wrapper flex flex-col gap-2"
                    id="password-wrapper"
                  >
                    <div className="w-full relative">
                      <input
                        type={visible ? "text" : "password"}
                        name="password"
                        placeholder="Enter your new password"
                        id="password"
                        className="input-h w-full rounded-[20px] focus:border-first-green outline-none lg:border lg:border-solid border-none text-lg pt-0 pr-0 pb-0 transition-all duration-300 pl-3"
                        value={form.password}
                        onChange={onChangeForm}
                      />
                      {!visible ? (
                        <i
                          onClick={() => setVisible(!visible)}
                          className="material-icons-outlined absolute top-[25px] right-[15px] cursor-pointer"
                        >
                          visibility
                        </i>
                      ) : (
                        <i
                          onClick={() => setVisible(!visible)}
                          className="material-icons-outlined absolute top-[25px] right-[15px] cursor-pointer"
                        >
                          visibility_off
                        </i>
                      )}
                    </div>
                  </div>
                  <div className="button-wrapper flex flex-col items-center gap-2">
                    <button
                      type="button"
                      id="send-btn"
                      disabled={!form.otp || !form.password}
                      className="w-full h-[4.5rem] rounded-[20px] p-0 border-none text-first-brown hover:text-white disabled:text-fifth-gray font-extrabold text-xl font-poppins bg-first-yellow hover:bg-first-brown disabled:bg-gray-400 shadow-[0px_6px_20px_rgba(255,186,51,0.4)] hover:shadow-[0px_6px_20px_rgba(106,64,41,0.63)] disabled:shadow-none transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
                      onClick={(e) => otpSubmitHandler(e)}
                    >
                      Send
                    </button>
                  </div>
                </form>
              ) : (
                <form
                  onSubmit={(e) => emailSubmitHandler(e)}
                  className="flex flex-col gap-4 w-full"
                >
                  <div
                    className="form-content-wrapper flex flex-col gap-2"
                    id="email-wrapper"
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email address to get link"
                      id="email-input"
                      className="input-h rounded-[20px] focus:border-first-green outline-none lg:border lg:border-solid border-none text-lg pt-0 pr-0 pb-0 transition-all duration-300 pl-3"
                      onChange={onChangeEmail}
                    />
                    {error !== "" ? (
                      <div className="font-poppins text-red-700">{error}</div>
                    ) : null}
                  </div>
                  <div className="button-wrapper flex flex-col items-center gap-2">
                    <button
                      type="button"
                      id="send-btn"
                      disabled={!email}
                      className="w-full h-[4.5rem] rounded-[20px] p-0 border-none text-first-brown hover:text-white disabled:text-fifth-gray font-extrabold text-xl font-poppins bg-first-yellow hover:bg-first-brown disabled:bg-gray-400 shadow-[0px_6px_20px_rgba(255,186,51,0.4)] hover:shadow-[0px_6px_20px_rgba(106,64,41,0.63)] disabled:shadow-none transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
                      onClick={(e) => emailSubmitHandler(e)}
                    >
                      Send
                    </button>
                  </div>
                </form>
              )}
              <div className="timer-wrapper flex flex-col items-center">
                <div
                  id="timer-desc"
                  className="p-2 text-xl font-normal w-full md:w-[125%] text-center"
                >
                  Click here if you didn&apos;t receive any link in 2 minutes
                </div>
                <div id="timer" className="p-2 text-xl font-bold">
                  {`0${minutes}`}:{seconds < 10 ? `0${seconds}` : seconds}
                </div>
              </div>
              <div className="resend-wrapper w-full md:w-auto flex flex-col items-center gap-4 p-0">
                <button className="w-full md:w-[38.188rem] h-[4.5rem] rounded-[20px] p-0 border-none text-white hover:text-first-brown bg-first-brown hover:bg-first-yellow shadow-[0px_6px_20px_rgba(106,64,41,0.63)] hover:shadow-[0px_6px_20px_rgba(255,186,51,0.4)] transition-all duration-300 font-extrabold text-xl font-poppins cursor-pointer">
                  Resend Link
                </button>
              </div>
            </div>
          </section>
        </main>
        <FooterAuth />
      </section>
    </div>
  );
}

export default Forgot;
