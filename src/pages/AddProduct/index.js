import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { createProduct } from "../../utils/https/product";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import defaultProduct from "../../assets/img/product-placeholder.webp";

function AddProduct() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    document.title = "Add new product";
  }, [])

  const token = useSelector((state) => state.auth.data.token);

  const controller = useMemo(() => new AbortController(), []);

  const [imagePreview, setImagePreview] = useState(null);
  const [productImg, setProductImg] = useState(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productCategory, setProductCategory] = useState(0);

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

    setProductImg(files[0]);
    setImagePreview(URL.createObjectURL(files[0]));
    e.target.value = null;
  };

  const onNameChange = (e) => {
    setProductName(e.target.value);
  };

  const onPriceChange = (e) => {
    setProductPrice(e.target.value);
  };

  const onDescChange = (e) => {
    setProductDesc(e.target.value);
  };

  const onCategoryChange = (e) => {
    setProductCategory(e.target.value);
  };

  const createProductHandler = (e) => {
    if (!productImg) {
      return toast.error("Image is required!", { position: "top-center" });
    }

    if (!productName) {
      return toast.error("Name is required!", { position: "top-center" });
    }

    if (productName.length > 50) {
      return toast.error("Name is too long!", { position: "top-center" });
    }

    if (!productPrice) {
      return toast.error("Price is required!", { position: "top-center" });
    }

    if (!productDesc) {
      return toast.error("Description is required!", {
        position: "top-center",
      });
    }

    if (productDesc.length < 150) {
      return toast.error("Description should be more than 150 characters!", {
        position: "top-center",
      });
    }

    if (!productCategory) {
      return toast.error("Category is required!", { position: "top-center" });
    }

    toast.promise(
      createProduct(
        productImg,
        productName,
        productPrice,
        productDesc,
        productCategory,
        token,
        controller
      ),
      {
        loading: () => {
          e.target.disabled = true;
          return <>Loading...</>;
        },
        success: () => {
          e.target.disabled = false;
          navigate("/products");
          return <>Successfully created new product</>;
        },
        error: () => {
          e.target.disabled = false;
          return <>Something went wrong</>;
        },
      }
    );
  };

  return (
    <div className="body-wrapper grid grid-cols-1 grid-rows-1">
      <Header title="product" />
      <main className="bg-white relative pt-10 pb-40 px-12 md:px-0">
        <section className="main-wrapper flex flex-col px-10 gap-y-20">
          <div className="product-breadcrumb font-rubik font-normal text-xl text-first-gray">
            <p>
              Favorite & Promo{" "}
              <span className="breadcrumb-detail text-first-brown font-bold">
                &gt; Add new product
              </span>
            </p>
          </div>
          <section className="flex flex-col lg:flex-row lg:gap-20 gap-y-20">
            <section className="left-content flex flex-col gap-y-20 lg:w-2/5">
              <div className="product-img self-center rounded-full w-[18.75rem] h-[18.75rem] overflow-hidden">
                <img
                  src={imagePreview ? imagePreview : defaultProduct}
                  alt="product image"
                  className="w-full h-full rounded-full object-cover object-center"
                />
              </div>
              <div className="utils-btn flex flex-col font-rubik font-bold text-2xl gap-y-6">
                <button
                  onClick={() => document.querySelector(".input-field").click()}
                  className="text-first-brown hover:text-white bg-first-yellow hover:bg-first-brown rounded-[20px] p-6 transition-colors duration-300"
                >
                  Choose from gallery
                </button>
                <input
                  type="file"
                  className="input-field"
                  multiple
                  hidden
                  accept="image/png, image/jpg, image/jpeg, image/webp"
                  onChange={(e) => onImageChange(e)}
                />
              </div>
            </section>
            <section className="right-content flex flex-col gap-y-20 lg:w-3/5">
              <form className="flex flex-col gap-y-10">
                <div className="flex flex-col items-start gap-y-3 font-rubik">
                  <label
                    className="font-bold text-first-brown text-2xl"
                    htmlFor="name"
                  >
                    Name :
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={productName}
                    onChange={(e) => onNameChange(e)}
                    placeholder="Type product name max. 50 characters"
                    className="outline-0 border-b-2 text-xl w-full pb-2 focus:border-b-first-green duration-300"
                  />
                </div>
                <div className="flex flex-col items-start gap-y-3 font-rubik">
                  <label
                    className="font-bold text-first-brown text-2xl"
                    htmlFor="price"
                  >
                    Price :
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={productPrice}
                    onChange={(e) => onPriceChange(e)}
                    placeholder="Type the price"
                    className="outline-0 border-b-2 text-xl w-full pb-2 focus:border-b-first-green duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="flex flex-col items-start gap-y-3 font-rubik">
                  <label
                    className="font-bold text-first-brown text-2xl"
                    htmlFor="description"
                  >
                    Description :
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    placeholder="Describe your product min. 150 characters"
                    cols="30"
                    rows="1"
                    value={productDesc}
                    onChange={(e) => onDescChange(e)}
                    className="outline-0 border-b-2 pb-2 text-xl w-full focus:border-b-first-green duration-300 resize-none scrollbar scrollbar-w-1 scrollbar-track-rounded-md scrollbar-thumb-rounded-md scrollbar-track-third-gray/30 scrollbar-thumb-first-brown/70"
                  />
                </div>
                <div className="flex flex-col items-start gap-y-3 font-rubik">
                  <p className="font-bold text-first-brown text-2xl">
                    Category :
                  </p>
                  <div className="flex flex-col md:flex-row gap-y-5 md:gap-x-5 justify-center">
                    <div className="category-btn font-poppins flex justify-center items-center">
                      <input
                        type="radio"
                        name="category"
                        id="coffee"
                        value={1}
                        onChange={(e) => onCategoryChange(e)}
                        className="peer hidden"
                      />
                      <label
                        htmlFor="coffee"
                        className="flex justify-center items-center p-4 select-none cursor-pointer rounded-[20px] w-full h-full text-3xl bg-ninth-white text-sixth-gray border border-sixth-gray peer-checked:border-transparent hover:border-transparent peer-checked:bg-first-yellow hover:bg-first-yellow peer-checked:text-black hover:text-black peer-checked:font-bold hover:font-bold transition-all duration-300"
                      >
                        <p className="text-center">Coffee</p>
                      </label>
                    </div>
                    <div className="category-btn font-poppins flex justify-center items-center">
                      <input
                        type="radio"
                        name="category"
                        id="non-coffee"
                        value={2}
                        onChange={(e) => onCategoryChange(e)}
                        className="peer hidden"
                      />
                      <label
                        htmlFor="non-coffee"
                        className="flex justify-center items-center p-4 select-none cursor-pointer rounded-[20px] w-full h-full text-3xl bg-ninth-white text-sixth-gray border border-sixth-gray peer-checked:border-transparent hover:border-transparent peer-checked:bg-first-yellow hover:bg-first-yellow peer-checked:text-black hover:text-black peer-checked:font-bold hover:font-bold transition-all duration-300"
                      >
                        <p className="text-center">Non Coffee</p>
                      </label>
                    </div>
                    <div className="category-btn font-poppins flex justify-center items-center">
                      <input
                        type="radio"
                        name="category"
                        id="foods"
                        value={3}
                        onChange={(e) => onCategoryChange(e)}
                        className="peer hidden"
                      />
                      <label
                        htmlFor="foods"
                        className="flex justify-center items-center p-4 select-none cursor-pointer rounded-[20px] w-full h-full text-3xl bg-ninth-white text-sixth-gray border border-sixth-gray peer-checked:border-transparent hover:border-transparent peer-checked:bg-first-yellow hover:bg-first-yellow peer-checked:text-black hover:text-black peer-checked:font-bold hover:font-bold transition-all duration-300"
                      >
                        <p className="text-center">Foods</p>
                      </label>
                    </div>
                    <div className="category-btn font-poppins flex justify-center items-center">
                      <input
                        type="radio"
                        name="category"
                        id="add-on"
                        value={4}
                        onChange={(e) => onCategoryChange(e)}
                        className="peer hidden"
                      />
                      <label
                        htmlFor="add-on"
                        className="flex justify-center items-center p-4 select-none cursor-pointer rounded-[20px] w-full h-full text-3xl bg-ninth-white text-sixth-gray border border-sixth-gray peer-checked:border-transparent hover:border-transparent peer-checked:bg-first-yellow hover:bg-first-yellow peer-checked:text-black hover:text-black peer-checked:font-bold hover:font-bold transition-all duration-300"
                      >
                        <p className="text-center">Add-on</p>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
              <div className="buttons flex flex-col gap-y-10 w-full font-poppins font-bold text-2xl">
                <button
                  onClick={(e) => createProductHandler(e)}
                  className="text-white hover:text-first-brown disabled:text-fifth-gray bg-first-brown hover:bg-first-yellow disabled:bg-gray-400 disabled:cursor-not-allowed shadow-[0px_6px_20px_0px_rgba(106,64,41,0.4)] rounded-[20px] p-6 transition-colors duration-300 w-full"
                >
                  Save Product
                </button>
                <button
                  onClick={() => navigate("/products")}
                  className="text-[#4F5665] bg-[rgba(186,186,186,0.35)] rounded-[20px] p-6 transition-colors duration-300 w-full"
                >
                  Cancel
                </button>
              </div>
            </section>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default AddProduct;
