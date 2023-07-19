/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { toast } from "react-hot-toast";

import {
  getPendingTransactions,
  manageTransactions,
} from "../../utils/https/transaction";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import EmptyCart from "../../components/EmptyCart";
import Loader from "../../components/Loader";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import cardIcon from "../../assets/icon/card-icon.svg";
// import bankIcon from "../../assets/icon/bank-icon.svg";
// import codIcon from "../../assets/icon/fast-delivery.webp";

function Orders() {
  const token = useSelector((state) => state.auth.data?.token);

  const controller = useMemo(() => new AbortController(), []);

  const [orderData, setOrderData] = useState([]);
  const [focusedCard, setFocusedCard] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
    getPendingTransactions(token, controller)
      .then((result) => {
        let orderData = result.data.data;
        if (orderData.length) {
          const groupedData = orderData.reduce((output, item) => {
            const {
              history_id,
              method,
              transaction_status,
              buyer_name,
              address,
              phone_number,
              product_id,
              name,
              img,
              price,
              qty,
              size_id,
              email,
            } = item;

            const existingItem = output.find(
              (entry) => entry.history_id === history_id
            );

            if (existingItem) {
              existingItem.items.push({
                product_id,
                name,
                img,
                price,
                qty,
                size_id,
              });
            } else {
              output.push({
                history_id,
                method,
                transaction_status,
                buyer_name,
                address,
                phone_number,
                email,
                items: [{ product_id, name, img, price, qty, size_id }],
              });
            }

            return output;
          }, []);
          setOrderData(groupedData);
        }

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const shortenEmail = (email) => {
    const atIndex = email.indexOf("@");
    const domain = email.slice(atIndex + 1);
    const shortenedDomain = domain.substr(0, 3) + "...";
    return email.slice(0, atIndex + 1) + shortenedDomain;
  };

  const onButtonClick = (e) => {
    toast.promise(
      manageTransactions(orderData[focusedCard].history_id, token, controller),
      {
        loading: () => {
          e.target.disabled = true;
          return <>Loading...</>;
        },
        success: () => {
          fetchData();
          e.target.disabled = false;
          return <>Marked as done</>;
        },
        error: () => {
          e.target.disabled = false;
          return <>Something went wrong</>;
        },
      }
    );
  };

  function StackedCarousel({ orderData }) {
    const settings = {
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "0",
      className: "h-full",
      infinite: false,
      arrows: true,
      afterChange: (current) => setFocusedCard(current),
    };

    if (!orderData) return <EmptyCart />;

    return (
      <Slider {...settings}>
        {orderData.map((orderDatum, index) => {
          let subtotalOnCart = 0;

          orderDatum.items.forEach((item) => {
            subtotalOnCart += item.price * item.qty;
          });

          const taxAndFee = subtotalOnCart * 0.05;
          const shippingFee = orderDatum.method === "delivery" ? 10000 : 0;
          const grandTotal = subtotalOnCart + taxAndFee + shippingFee;
          return (
            <div
              key={index}
              className="order-container bg-white rounded-[20px] flex flex-col justify-between px-5 py-10 md:px-16 md:pt-20 md:pb-20 gap-y-20 lg:min-h-[663.2px]"
            >
              <div className="order-title mb-10">
                <div
                  className={`group relative flex ${
                    orderDatum.buyer_name && "justify-center"
                  }`}
                >
                  <p className="font-poppins font-bold text-4xl text-third-brown text-center">
                    {`${
                      orderDatum.method.charAt(0).toUpperCase() +
                      orderDatum.method.slice(1)
                    } for ${
                      orderDatum.buyer_name
                        ? orderDatum.buyer_name
                        : shortenEmail(orderDatum.email)
                    }`}
                  </p>
                  {!orderDatum.buyer_name && (
                    <span className="absolute -top-14 right-36 font-poppins scale-0 transition-all rounded bg-black py-2 px-4 text-xs text-white whitespace-nowrap group-hover:scale-100 group-active:scale-0">
                      {`${
                        orderDatum.method.charAt(0).toUpperCase() +
                        orderDatum.method.slice(1)
                      } for ${orderDatum.email}`}
                    </span>
                  )}
                </div>
              </div>
              <div className="order-details flex flex-col gap-y-5">
                <div className="order-items flex flex-col gap-y-4 min-h-[90px] h-[200px] overflow-y-auto scrollbar scrollbar-w-1 scrollbar-track-rounded-md scrollbar-thumb-rounded-md scrollbar-track-third-gray/30 scrollbar-thumb-first-brown/70">
                  {orderDatum.items.map((item, index) => (
                    <div
                      key={index}
                      className="lg:flex lg:flex-row lg:items-center md:grid md:grid-cols-2"
                    >
                      <img
                        src={item.img}
                        className="order-img w-[82px] h-[90px] rounded-[20px] mr-8"
                      />
                      <div className="order-info font-poppins font-normal text-xl lg:mr-auto">
                        <div className="product">{item.name}</div>
                        <div className="qty-price flex flex-row justify-between">
                          <p>x {item.qty}</p>
                          <p className="lg:hidden">
                            IDR{" "}
                            {(item.qty * item.price).toLocaleString("id-ID")}
                          </p>
                        </div>
                        <div className="size">
                          {parseInt(item.size_id) === 3
                            ? "Extra Large"
                            : parseInt(item.size_id) === 2
                            ? "Large"
                            : "Regular"}
                        </div>
                      </div>
                      <p className="hidden lg:block font-poppins font-normal text-xl">
                        IDR {(item.qty * item.price).toLocaleString("id-ID")}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="divider border-b-[0.5px] border-solid border-b-black opacity-30"></div>
                <div className="order-prices mb-4">
                  <div className="grid grid-cols-2">
                    <p>SUBTOTAL</p>
                    <p className="justify-self-end">
                      IDR {subtotalOnCart.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p>TAX & FEES</p>
                    <p className="justify-self-end">
                      IDR {taxAndFee.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p>SHIPPING</p>
                    <p className="justify-self-end">
                      IDR {shippingFee.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
                <div className="total-price flex flex-row justify-between font-poppins font-bold text-3xl">
                  <p>TOTAL</p>
                  <p>IDR {grandTotal.toLocaleString("id-ID")}</p>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    );
  }

  document.title = "Manage Orders";

  return (
    <div className="body-wrapper grid grid-cols-1 grid-rows-1">
      <Header title="orders" />
      <main className="payment-bg bg-cover bg-center">
        {isLoading && <Loader />}
        <section className="flex flex-col pb-24 m-10 gap-y-10">
          <section className="page-title">
            <p className="font-rubik font-bold text-[40px] text-white drop-shadow-[0px_4px_4px_rgba(0,0,0,0.8)]">
              Finish your <br /> customer order now.
            </p>
          </section>
          <section className="page-content flex lg:flex-row flex-col gap-y-5 lg:justify-between lg:gap-x-44">
            <section className="left-side lg:w-1/2 lg:min-h-[631.6px]">
              <StackedCarousel orderData={orderData} />
            </section>
            <section className="right-side lg:w-1/2 lg:min-h-[631.6px] flex flex-col gap-y-5">
              <div className="address-container flex flex-col gap-y-4">
                <div className="container-title flex flex-rows justify-between">
                  <p className="font-poppins font-bold text-2xl text-white drop-shadow-[0px_4px_4px_rgba(0,0,0,0.8)]">
                    Address details
                  </p>
                </div>
                <div className="container-content min-h-[209.6px] font-poppins text-xl bg-white shadow-[0px,10px,40px,rgba(0,0,0,0.2)] rounded-[20px] p-10 flex flex-col gap-y-1">
                  <p className="font-normal">
                    <b>Delivery</b> to{" "}
                    {orderData.length && orderData[focusedCard].address}
                  </p>
                  {/* <div className="divider border-b-[0.5px] border-solid border-b-black opacity-30"></div>
                  <p className="font-normal min-h-[56px]">
                    {form["address-details"]
                      ? form["address-details"]
                      : "Your address details here"}
                  </p> */}
                  <div className="divider border-b-[0.5px] border-solid border-b-black opacity-30"></div>
                  <p className="font-normal">
                    {orderData.length && orderData[focusedCard].phone_number}
                  </p>
                </div>
              </div>
              {/* <div className="method-container flex flex-col gap-y-4">
                <div className="container-title">
                  <p className="font-poppins font-bold text-2xl text-white drop-shadow-[0px_4px_4px_rgba(0,0,0,0.8)]">
                    Payment method
                  </p>
                </div>
                <div className="container-content bg-white shadow-[0px_10px_40px_rgba(0,0,0,0.2)] rounded-[20px] p-10 flex flex-col gap-y-3">
                  <div className="flex flex-row items-center">
                    <input
                      type="radio"
                      name="payment-method"
                      id="card"
                      value={1}
                      // onChange={onChangePayment}
                      className="h-5 w-5 checked:accent-second-brown mr-2 cursor-pointer"
                    />
                    <label
                      htmlFor="card"
                      className="flex flex-row items-center font-poppins text-xl"
                    >
                      <img
                        src={cardIcon}
                        alt="card-icon"
                        className="bg-second-orange p-2 rounded-md mr-2 w-[40px] h-[40px]"
                      />{" "}
                      Card
                    </label>
                  </div>
                  <div className="divider border-b-[0.5px] border-solid border-b-black opacity-30"></div>
                  <div className="flex flex-row items-center">
                    <input
                      type="radio"
                      name="payment-method"
                      id="bank-account"
                      value={2}
                      // onChange={onChangePayment}
                      className="h-5 w-5 checked:accent-second-brown mr-2 cursor-pointer"
                    />
                    <label
                      htmlFor="bank-account"
                      className="flex flex-row items-center font-poppins text-xl"
                    >
                      <img
                        src={bankIcon}
                        alt="bank-icon"
                        className="bg-second-brown p-2 rounded-md mr-2 w-[40px] h-[40px]"
                      />{" "}
                      Bank account
                    </label>
                  </div>
                  <div className="divider border-b-[0.5px] border-solid border-b-black opacity-30"></div>
                  <div className="flex flex-row items-center">
                    <input
                      type="radio"
                      name="payment-method"
                      id="cod"
                      value={3}
                      // onChange={onChangePayment}
                      className="h-5 w-5 checked:accent-second-brown mr-2 cursor-pointer"
                    />
                    <label
                      htmlFor="cod"
                      className="flex flex-row items-center font-poppins text-xl"
                    >
                      <img
                        src={codIcon}
                        alt="cod-icon"
                        className="bg-first-yellow p-2 rounded-md mr-2 w-[40px] h-[40px]"
                      />{" "}
                      Cash on delivery
                    </label>
                  </div>
                </div>
              </div> */}
              <button
                onClick={(e) => onButtonClick(e)}
                className="bg-second-brown hover:bg-first-yellow text-white hover:text-black disabled:bg-gray-400 disabled:text-fifth-gray transition-all duration-300 shadow-[0px_10px_20px_rgba(137,85,55,0.4)] rounded-[20px] disabled:cursor-not-allowed w-full p-5"
              >
                <p className="font-poppins font-bold text-xl text-center">
                  Mark as done
                </p>
              </button>
            </section>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Orders;
