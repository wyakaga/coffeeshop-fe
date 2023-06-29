import React, { useEffect, useState, useMemo, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Transition, Dialog } from "@headlessui/react";

import {
  getProductDetails,
  editProduct,
  deleteProduct,
} from "../../utils/https/product";
import { cartAction } from "../../redux/slices/cart";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Loader from "../../components/Loader";

function ProductDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.data.token);
  const selectedDelivery = useSelector((state) => state.cart.delivery);
  const adminRole = useSelector((state) => state.auth.data?.data?.role_id);

  const controller = useMemo(() => new AbortController(), []);

  let { id } = useParams();

  const [dataProduct, setDataProduct] = useState([]);
  const [selectedSize, setSelectedSize] = useState(1);
  const [qty, setQty] = useState(1);
  const [time, setTime] = useState(null);
  const [isChanged, setIsChanged] = useState({ size: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDescription, setProductDescription] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getProductDetails(id, controller)
      .then((res) => {
        setDataProduct(res["data"]["data"]);
        setIsLoading(false);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      });
  }, [id]);

  useEffect(() => {
    if (dataProduct.length) {
      setProductName(dataProduct[0]["name"]);
      setProductPrice(dataProduct[0]["price"]);
      setProductDescription(dataProduct[0]["description"]);
    }
  }, [dataProduct]);

  const onSizeChange = (e) => {
    setSelectedSize(e.target.value);
    setIsChanged({
      ...isChanged,
      size: e.target.value,
    });
  };

  const onDeliveryChange = (e) => {
    if (!token) {
      navigate("/login");
      return;
    }

    dispatch(cartAction.deliveryMethod(e.target.value));
  };

  const increaseQtyHandler = () => {
    const newQty = qty + 1;
    setQty(newQty);
  };

  const decreaseQtyHandler = () => {
    if (qty === 1) {
      qty - 0;
      return;
    }
    const newQty = qty - 1;
    setQty(newQty);
  };

  const addToCartHandler = () => {
    const subtotal = dataProduct[0].price * qty;
    const shoppingCart = {
      product_id: parseInt(id),
      size_id: parseInt(selectedSize),
      qty,
      subtotal,
      img: dataProduct[0].img,
      productName: dataProduct[0].name,
    };

    if (!token) {
      navigate("/login");
      return;
    }

    dispatch(cartAction.addToCart(shoppingCart));
    toast.custom(
      () => (
        <div className="bg-first-brown/90 w-1/5 px-6 py-4 shadow-md rounded-md flex justify-center items-center gap-x-4 mt-10">
          <i className="material-icons text-white text-4xl">shopping_cart</i>
          <span className="font-poppins text-white text-2xl">
            Added to cart
          </span>
        </div>
      ),
      {
        position: "top-center",
        duration: 3000,
      }
    );
  };

  const closeHandler = () => {
    setIsDialogOpen(false);
  };

  const onImageChange = (e) => {
    const isValidFileUploaded = (file) => {
      const validExtensions = ["png", "jpeg", "jpg", "webp"];
      const fileExtension = file.type.split("/")[1];
      return validExtensions.includes(fileExtension);
    };

    const maxSize = 2 * 1024 * 1024;

    const { files } = e.target;

    if (!isValidFileUploaded(files[0])) {
      e.target.value = null;
      return toast.error("File should be in PNG, JPEG, JPG or WEBP!", {
        duration: 4000,
        position: "top-center",
      });
    }

    if (files[0].size > maxSize) {
      e.target.value = null;
      return toast.error("File exceeds maximum size", {
        duration: 4000,
        position: "top-center",
      });
    }

    setImage(files[0]);
    setImagePreview(URL.createObjectURL(files[0]));
    e.target.value = null;
  };

  const onProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const onProductPriceChange = (e) => {
    setProductPrice(e.target.value);
  };

  const onProductDescChange = (e) => {
    setProductDescription(e.target.value);
  };

  const editProductHandler = (e) => {
    toast.promise(
      editProduct(
        image,
        productName,
        productPrice,
        productDescription,
        dataProduct[0]["id"],
        token,
        controller
      ),
      {
        loading: () => {
          e.target.disabled = true;
          return <>Loading...</>;
        },
        success: (res) => {
          e.target.disabled = false;
          setDataProduct([
            {
              ...dataProduct[0],
              img: res.data.data.img,
              name: res.data.data.name,
              price: res.data.data.price,
              description: res.data.data.description,
            },
          ]);
          closeHandler();
          return <>Succesfully update product data</>;
        },
        error: () => {
          e.target.disabled = false;
          closeHandler();
          return <>Something went wrong</>;
        },
      }
    );
  };

  const deleteProductHandler = (e) => {
    toast.promise(deleteProduct(id, token, controller), {
      loading: () => {
        e.target.disabled = true;
        return <>Deleting product...</>;
      },
      success: () => {
        e.target.disabled = false;
        navigate("/products");
        return <>Successfully delete product</>;
      },
      error: () => {
        e.target.disabled = false;
        return <>Something went wrong</>;
      },
    });
  };

  document.title = dataProduct[0] ? dataProduct[0]["name"] : "Product details";

  return (
    <div className="body-wrapper grid grid-cols-1 grid-rows-1">
      {isLoading && <Loader />}
      <Header title="product" />
      <main className="bg-eighth-white relative pt-10 pb-40 md:px-12">
        <section className="main-wrapper flex flex-col lg:flex-row justify-center gap-20 lg:gap-60 py-12 px-10 lg:px-0">
          <section className="left-content flex flex-col gap-12">
            <div className="product-dir font-rubik font-normal text-xl text-first-gray">
              <p>
                Favorite & Promo{" "}
                <span className="dir-detail text-first-brown font-bold">
                  &gt; {dataProduct[0] && dataProduct[0]["name"]}
                </span>
              </p>
            </div>
            <div className="product-info flex flex-col items-center gap-y-10">
              <div className="product-img rounded-full w-96 h-96 overflow-hidden">
                <img
                  src={dataProduct[0] && dataProduct[0]["img"]}
                  alt="product image"
                  className="w-full h-full rounded-full object-cover object-center"
                />
              </div>
              <div className="product-name-price text-center flex flex-col gap-y-4">
                <p className="font-poppins font-black text-6xl">
                  {dataProduct[0] && dataProduct[0]["name"]}
                </p>
                <p className="font-poppins font-medium text-4xl">
                  IDR{" "}
                  {dataProduct[0] &&
                    dataProduct[0]["price"].toLocaleString("id-ID")}
                </p>
              </div>
            </div>
            <div className="utils-btn flex flex-col font-poppins font-bold text-2xl gap-y-6">
              <button
                onClick={addToCartHandler}
                disabled={
                  isChanged.size === "" ||
                  selectedDelivery === "" ||
                  time === null ||
                  adminRole === 1
                }
                className="text-white hover:text-first-brown disabled:text-fifth-gray bg-first-brown hover:bg-first-yellow disabled:bg-gray-400 rounded-[20px] p-6 disabled:cursor-not-allowed transition-colors duration-300"
              >
                Add to Cart
              </button>
              <button
                onClick={
                  adminRole === 1
                    ? () => setIsDialogOpen(true)
                    : () => console.log("yoinky boinky")
                }
                className="text-first-brown hover:text-white bg-first-yellow hover:bg-first-brown rounded-[20px] p-6 transition-colors duration-300"
              >
                {adminRole === 1 ? "Edit Product" : "Ask a Staff"}
              </button>
              {adminRole === 1 && (
                <button
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="text-white bg-black hover:bg-red-600 rounded-[20px] p-6 transition-colors duration-300"
                >
                  Delete Menu
                </button>
              )}
            </div>
          </section>
          <section className="right-content flex flex-col gap-16">
            <div className="desc-size-wrapper flex flex-col gap-y-12 bg-white rounded-[20px] p-4 md:p-16">
              <div className="delivery-desc font-poppins font-normal text-[1.5625rem] text-first-brown">
                <p>
                  Delivery only on{" "}
                  <b>
                    Monday to <br />
                    Friday
                  </b>{" "}
                  at <b>1-7 pm</b>
                </p>
              </div>
              <div className="product-desc font-poppins text-first-brown">
                <p className="font-normal text-[1.5625rem]">
                  {dataProduct[0] && dataProduct[0]["description"]}
                </p>
              </div>
              <div className="size-btn flex flex-col gap-y-4">
                <p className="text-center font-poppins font-bold text-2xl">
                  Choose a size
                </p>
                <div className="flex flex-row gap-x-14 md:gap-x-20 justify-center">
                  <div className="size-btn font-poppins w-[4.375rem] h-[4.375rem] flex justify-center items-center">
                    <input
                      type="radio"
                      name="size"
                      id="R"
                      value={1}
                      onChange={onSizeChange}
                      className="peer hidden"
                    />
                    <label
                      htmlFor="R"
                      className="flex justify-center items-center select-none cursor-pointer rounded-full w-full h-full text-3xl bg-ninth-white text-sixth-gray border border-sixth-gray peer-checked:border-transparent hover:border-transparent peer-checked:bg-first-yellow hover:bg-first-yellow peer-checked:text-black hover:text-black peer-checked:font-bold hover:font-bold transition-all duration-300"
                    >
                      <p className="text-center">R</p>
                    </label>
                  </div>
                  <div className="size-btn font-poppins w-[4.375rem] h-[4.375rem] flex justify-center items-center">
                    <input
                      type="radio"
                      name="size"
                      id="L"
                      value={2}
                      onChange={onSizeChange}
                      className="peer hidden"
                    />
                    <label
                      htmlFor="L"
                      className="flex justify-center items-center select-none cursor-pointer rounded-full w-full h-full text-3xl bg-ninth-white text-sixth-gray border border-sixth-gray peer-checked:border-transparent hover:border-transparent peer-checked:bg-first-yellow hover:bg-first-yellow peer-checked:text-black hover:text-black peer-checked:font-bold hover:font-bold transition-all duration-300"
                    >
                      <p className="text-center">L</p>
                    </label>
                  </div>
                  <div className="size-btn font-poppins w-[4.375rem] h-[4.375rem] flex justify-center items-center">
                    <input
                      type="radio"
                      name="size"
                      id="XL"
                      value={3}
                      onChange={onSizeChange}
                      className="peer hidden"
                    />
                    <label
                      htmlFor="XL"
                      className="flex justify-center items-center select-none cursor-pointer rounded-full w-full h-full text-3xl bg-ninth-white text-sixth-gray border border-sixth-gray peer-checked:border-transparent hover:border-transparent peer-checked:bg-first-yellow hover:bg-first-yellow peer-checked:text-black hover:text-black peer-checked:font-bold hover:font-bold transition-all duration-300"
                    >
                      <p className="text-center">XL</p>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="delivery-time flex flex-col gap-12">
              <div className="delivery-methods flex flex-col gap-y-10 justify-center items-center">
                <p className="font-poppins font-bold text-xl text-center">
                  Choose Delivery Methods
                </p>
                <div className="delivery-btn font-poppins flex flex-row md:gap-x-8">
                  <div className="deliv-btn font-poppins">
                    <input
                      type="radio"
                      name="delivery-method"
                      id="dine-in"
                      value={1}
                      checked={parseInt(selectedDelivery) === 1}
                      onChange={onDeliveryChange}
                      className="peer hidden"
                    />
                    <label
                      htmlFor="dine-in"
                      className="select-none cursor-pointer rounded-[10px] py-3 px-5 text-center bg-ninth-white text-sixth-gray border border-sixth-gray peer-checked:border-transparent hover:border-transparent peer-checked:bg-first-brown hover:bg-first-brown peer-checked:text-white hover:text-white peer-checked:font-bold hover:font-bold transition-all duration-300"
                    >
                      Dine in
                    </label>
                  </div>
                  <div className="deliv-btn font-poppins">
                    <input
                      type="radio"
                      name="delivery-method"
                      id="pick-up"
                      value={2}
                      checked={parseInt(selectedDelivery) === 2}
                      onChange={onDeliveryChange}
                      className="peer hidden"
                    />
                    <label
                      htmlFor="pick-up"
                      className="select-none cursor-pointer rounded-[10px] py-3 px-5 text-center bg-ninth-white text-sixth-gray border border-sixth-gray peer-checked:border-transparent hover:border-transparent peer-checked:bg-first-brown hover:bg-first-brown peer-checked:text-white hover:text-white peer-checked:font-bold hover:font-bold transition-all duration-300"
                    >
                      Pick up
                    </label>
                  </div>
                  <div className="deliv-btn font-poppins">
                    <input
                      type="radio"
                      name="delivery-method"
                      id="door-delivery"
                      value={3}
                      checked={parseInt(selectedDelivery) === 3}
                      onChange={onDeliveryChange}
                      className="peer hidden"
                    />
                    <label
                      htmlFor="door-delivery"
                      className="select-none cursor-pointer rounded-[10px] py-3 px-5 text-center bg-ninth-white text-sixth-gray border border-sixth-gray peer-checked:border-transparent hover:border-transparent peer-checked:bg-first-brown hover:bg-first-brown peer-checked:text-white hover:text-white peer-checked:font-bold hover:font-bold transition-all duration-300"
                    >
                      Door Delivery
                    </label>
                  </div>
                </div>
              </div>
              <div className="set-time flex flex-row items-center justify-center gap-x-7">
                <label
                  htmlFor="set-time"
                  className="font-poppins font-normal text-xl"
                >
                  Set time:
                </label>
                <input
                  type="text"
                  onFocus={(e) => (e.target.type = "time")}
                  onBlur={(e) => (e.target.type = "text")}
                  onChange={(e) => setTime(e.target.value)}
                  name="set-time"
                  placeholder="Enter the time you'll arrived"
                  className="font-poppins border-b border-fourth-gray w-3/4 outline outline-0 bg-eighth-white"
                />
              </div>
            </div>
          </section>
          <section className="floating flex flex-col lg:flex-row items-center gap-y-8 lg:gap-x-10 lg:absolute bottom-[-70px]">
            <div className="product-qty flex flex-col md:flex-row justify-center md:gap-x-5 lg:gap-x-80 w-full lg:w-3/4 bg-white rounded-[20px] py-8 px-20">
              <div className="product-info flex flex-row items-center justify-center gap-x-8">
                <div className="product-img w-[100px] h-[100px] rounded-full overflow-hidden">
                  <img
                    src={dataProduct[0] && dataProduct[0]["img"]}
                    alt="product image"
                    className="w-full h-full rounded-full object-cover object-center"
                  />
                </div>
                <div className="info whitespace-nowrap">
                  <p className="font-poppins font-bold text-2xl">
                    {dataProduct[0] && dataProduct[0]["name"]}
                  </p>
                  <p className="font-poppins text-xl flex flex-nowrap">
                    x{qty} (
                    {parseInt(selectedSize) === 3
                      ? "Extra Large"
                      : parseInt(selectedSize) === 2
                      ? "Large"
                      : "Regular"}
                    )
                  </p>
                </div>
              </div>
              <div className="counter flex flex-row items-center justify-center gap-x-6">
                <div className="group relative flex">
                  <button
                    onClick={() => decreaseQtyHandler()}
                    className="w-[40px] h-[40px] rounded-full bg-third-yellow hover:bg-first-yellow font-bold text-first-brown hover:text-black text-2xl flex items-center justify-center border-none transition-all duration-300"
                  >
                    <i className="material-icons font-black">remove</i>
                  </button>
                  <span className="absolute top-12 -right-12 font-poppins scale-0 transition-all rounded bg-black py-2 px-4 text-xs text-white whitespace-nowrap group-hover:scale-100 group-active:scale-0">
                    Decrease quantities
                  </span>
                </div>
                <div className="w-[40px] h-[40px] flex justify-center items-center">
                  <p className="font-poppins font-bold text-2xl">{qty}</p>
                </div>
                <div className="group relative flex">
                  <button
                    onClick={() => increaseQtyHandler()}
                    className="w-[40px] h-[40px] rounded-full bg-third-yellow hover:bg-first-yellow font-bold text-first-brown hover:text-black text-2xl flex items-center justify-center border-none transition-all duration-300"
                  >
                    <i className="material-icons font-black">add</i>
                  </button>
                  <span className="absolute top-12 -right-12 font-poppins scale-0 transition-all rounded bg-black py-2 px-4 text-xs text-white whitespace-nowrap group-hover:scale-100 group-active:scale-0">
                    Increase quantities
                  </span>
                </div>
              </div>
            </div>
            <div className="checkout-btn w-full">
              <button
                onClick={() => navigate("/payment")}
                disabled={
                  isChanged.size === "" ||
                  selectedDelivery === "" ||
                  time === null ||
                  adminRole === 1
                }
                className="bg-first-yellow hover:bg-first-brown disabled:bg-gray-400 text-black hover:text-white disabled:text-fifth-gray border-none rounded-[20px] font-poppins font-bold text-2xl py-8 lg:py-16 lg:px-20 w-full disabled:cursor-not-allowed transition-all duration-300"
              >
                CHECKOUT
              </button>
            </div>
          </section>
        </section>
        <Transition appear show={isDialogOpen} as={Fragment}>
          <Dialog as="div" onClose={closeHandler} className="relative z-[51]">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed bg-white/40 backdrop-filter backdrop-blur-md inset-0 overflow-y-auto" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="bg-white w-3/4 lg:w-1/2 p-16 rounded-lg shadow-[0px_4px_20px_rgba(0,0,0,0.1)] text-center z-[52] relative">
                    <div className="flex flex-col items-center gap-y-10">
                      <div className="image-holder relative h-48 w-48">
                        <img
                          src={
                            imagePreview ||
                            (dataProduct[0] && dataProduct[0]["img"])
                          }
                          alt={
                            dataProduct[0]
                              ? `${dataProduct[0]["name"]} image`
                              : "product image"
                          }
                          className="w-full h-full rounded-full object-cover object-center"
                        />
                        <div className="absolute bottom-3 right-3">
                          <div className="group relative flex">
                            <div
                              id="pen"
                              onClick={() =>
                                document.querySelector(".input-field").click()
                              }
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
                            <input
                              type="file"
                              className="input-field"
                              multiple
                              hidden
                              accept="image/png, image/jpg, image/jpeg, image/webp"
                              onChange={(e) => onImageChange(e)}
                            />
                            <span className="absolute top-0 right-10 font-poppins scale-0 transition-all rounded bg-black py-2 px-4 text-xs text-white whitespace-nowrap group-hover:scale-100 group-active:scale-0">
                              Choose image
                            </span>
                          </div>
                        </div>
                      </div>
                      <form className="flex flex-col gap-y-6 w-full">
                        <div className="flex flex-col items-start gap-y-3">
                          <label
                            className="font-poppins font-medium text-lg"
                            htmlFor="name"
                          >
                            Name :
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={productName}
                            onChange={(e) => onProductNameChange(e)}
                            className="outline-0 border-b-2 font-poppins w-full focus:border-b-first-green duration-300"
                          />
                        </div>
                        <div className="flex flex-col items-start gap-y-3">
                          <label
                            htmlFor="price"
                            className="font-poppins font-medium text-lg"
                          >
                            Price :
                          </label>
                          <input
                            type="number"
                            name="price"
                            id="price"
                            value={productPrice}
                            onChange={(e) => onProductPriceChange(e)}
                            className="outline-0 border-b-2 font-poppins w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-b-first-green duration-300"
                          />
                        </div>
                        <div className="flex flex-col items-start gap-y-3">
                          <label
                            htmlFor="description"
                            className="font-poppins font-medium text-lg"
                          >
                            Description :
                          </label>
                          <textarea
                            name="description"
                            id="description"
                            cols="30"
                            rows="3"
                            value={productDescription}
                            onChange={(e) => onProductDescChange(e)}
                            className="outline-0 border-b-2 font-poppins w-full focus:border-b-first-green duration-300 resize-none scrollbar scrollbar-w-1 scrollbar-track-rounded-md scrollbar-thumb-rounded-md scrollbar-track-third-gray/30 scrollbar-thumb-first-brown/70"
                          />
                        </div>
                      </form>
                      <button
                        onClick={(e) => editProductHandler(e)}
                        className="w-3/4 rounded-md p-4 font-bold font-poppins text-xl bg-first-yellow hover:bg-first-brown disabled:bg-gray-400 text-first-brown hover:text-first-yellow disabled:text-fifth-gray disabled:cursor-not-allowed duration-300"
                      >
                        Save Changes
                      </button>
                    </div>
                    <div
                      onClick={closeHandler}
                      className="absolute top-0 right-0"
                    >
                      <div className="group relative flex">
                        <div className="flex cursor-pointer bg-first-yellow hover:bg-[rgb(255,169,0)] text-first-brown font-poppins font-bold h-[40px] w-[40px] justify-center items-center rounded-full duration-300">
                          <i className="material-icons font-black">close</i>
                        </div>
                        <span className="absolute top-12 -right-2 font-poppins scale-0 transition-all rounded bg-black py-2 px-4 text-xs text-white whitespace-nowrap group-hover:scale-100 group-active:scale-0">
                          Close
                        </span>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
        <Transition appear show={isDeleteDialogOpen} as={Fragment}>
          <Dialog
            as="div"
            onClose={() => setIsDeleteDialogOpen(false)}
            className="relative z-[51]"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed bg-white/40 backdrop-filter backdrop-blur-md inset-0 overflow-y-auto" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="bg-white gap-y-10 flex flex-col w-3/4 lg:w-1/2 p-16 rounded-lg shadow-[0px_4px_20px_rgba(0,0,0,0.1)] text-center z-[52] relative">
                    <Dialog.Title className="text-4xl font-rubik font-bold mb-2">
                      Are you sure?
                    </Dialog.Title>
                    <div className="flex justify-center items-center">
                      <div className="flex justify-center items-center gap-x-5 w-full">
                        <button
                          onClick={(e) => deleteProductHandler(e)}
                          className="bg-first-brown text-white font-poppins font-bold text-2xl w-1/4 h-16 px-4 py-2 rounded-[20px] duration-300 hover:text-first-brown hover:bg-first-yellow disabled:text-fifth-gray disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setIsDeleteDialogOpen(false)}
                          className="bg-first-yellow text-first-brown font-poppins font-bold text-2xl w-1/4 h-16 px-4 py-2 rounded-[20px] duration-300 hover:text-white hover:bg-first-brown"
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </main>
      <Footer />
    </div>
  );
}

export default ProductDetail;
