import React, { useEffect, useState, useMemo, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { editPwd, logout } from "../../utils/https/auth";
import { updateProfile, removeImage } from "../../utils/https/user";
import { authAction } from "../../redux/slices/auth";
import { userAction } from "../../redux/slices/user";
import { cartAction } from "../../redux/slices/cart";
import { historyAction } from "../../redux/slices/history";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";

import defaultImg from "../../assets/img/profile-placeholder.webp";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const [isEditable, setIsEditable] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");

  const [form, setForm] = useState({
    img: null,
    address: "",
    display_name: "",
    first_name: "",
    last_name: "",
    birth_date: "",
    gender: "",
  });

  const id = useSelector((state) => state.auth.data.data?.id);
  const token = useSelector((state) => state.auth.data.token);

  const controller = useMemo(() => new AbortController(), []);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const { payload } = await dispatch(
        userAction.getUserThunk({ id, token, controller })
      );
      setProfileData(payload);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const birthDate = DateTime.fromISO(profileData["birth_date"]).toFormat(
    "dd/MM/yy"
  );

  const editHandler = (e) => {
    e.preventDefault();
    setIsEditable(!isEditable);
  };

  const openHandler = (e) => {
    e.preventDefault();
    setIsDialogOpen(true);
  };

  const closeHandler = () => {
    setIsDialogOpen(false);
    setOldPwd("");
    setNewPwd("");
  };

  const onFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const onBirthDateChange = (e) => {
    const { name, value } = e.target;
    const newValue = DateTime.fromFormat(value, "dd/MM/yy").toFormat(
      "yyyy/MM/dd"
    );
    setForm((prevForm) => ({ ...prevForm, [name]: newValue }));
  };

  const onImageChange = (e) => {
    const isValidFileUploaded = (file) => {
      const validExtensions = ["png", "jpeg", "jpg", "webp"];
      const fileExtension = file.type.split("/")[1];
      return validExtensions.includes(fileExtension);
    };

    const maxSize = 2 * 1024 * 1024;

    const { name, files } = e.target;

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

    setForm((prevForm) => ({ ...prevForm, [name]: files[0] }));
    setImagePreview(URL.createObjectURL(files[0]));
    e.target.value = null;
  };

  const onGenderChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const updateHandler = (e) => {
    e.preventDefault();

    toast.promise(
      updateProfile(
        id,
        token,
        controller,
        form.address,
        form.display_name,
        form.first_name,
        form.last_name,
        form.birth_date,
        form.gender,
        form.img
      ),
      {
        loading: () => {
          e.target.disabled = true;
          return <>Loading...</>;
        },
        success: () => {
          e.target.disabled = false;
          fetchUserData();
          setIsEditable(false);
          setImagePreview(null);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          return <>Succesfully changed profile data</>;
        },
        error: () => {
          e.target.disabled = false;
          setIsEditable(false);
          setImagePreview(null);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          return <>Something went wrong</>;
        },
      }
    );
  };

  const cancelHandler = () => {
    setForm({
      img: null,
      address: "",
      display_name: "",
      first_name: "",
      last_name: "",
      birth_date: "",
      gender: "",
    });
    setImagePreview(null);
    setIsEditable(false);
  };

  const removeImageHandler = (e) => {
    toast.promise(
      removeImage(id, token, controller),
      {
        loading: () => {
          e.target.disabled = true;
          return <>Loading...</>;
        },
        success: () => {
          fetchUserData();
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          e.target.disabled = false;
          return <>Successfully removed image</>;
        },
        error: () => {
          e.target.disabled = false;
          return <>Something went wrong</>;
        },
      },
      { duration: 5000 }
    );
  };

  const pwdHandler = (e) => {
    e.preventDefault();
    setIsDialogOpen(false);

    toast.promise(
      editPwd(oldPwd, newPwd, token, controller),
      {
        loading: () => {
          e.target.disabled = true;
          return <>Loading...</>;
        },
        success: () => {
          setOldPwd("");
          setNewPwd("");
          return <>Successfully changed password</>;
        },
        error: (err) => {
          setOldPwd("");
          setNewPwd("");
          if (err.response.data.msg === "Wrong Old Password") {
            return <>Wrong old password</>;
          }
          return <>Something went wrong</>;
        },
      },
      {
        duration: Infinity,
      }
    );
  };

  const handleRedirect = () => navigate("/");

  const logoutHandler = (e) => {
    e.preventDefault();

    toast.promise(
      logout(token, controller).then(() => {
        dispatch(authAction.delete());
        dispatch(cartAction.resetCart());
        dispatch(historyAction.reset());
        dispatch(userAction.reset());
      }),
      {
        loading: () => {
          e.target.disabled = true;
          return <>Logging out...</>;
        },
        success: () => {
          handleRedirect();
          return <>See you!</>;
        },
        error: "Something went wrong",
      },
      { success: { duration: Infinity } }
    );
  };

  document.title = "Profile";

  return (
    <div className="grid grid-cols-1 grid-rows-1">
      <Header />
      {isLoading && <Loader />}
      <main className="profile-bg bg-cover bg-center">
        <section className="flex flex-col pb-24 m-10">
          <div className="page-title">
            <h2 className="text-white font-rubik text-[2.1875rem] font-medium">
              User Profile
            </h2>
          </div>
          <div className="page-content flex flex-col lg:grid lg:grid-rows-4 lg:grid-cols-3 bg-first-white rounded-[20px] p-8 gap-y-12 gap-x-8">
            <div className="profile-option lg:row-start-1 lg:col-start-1 lg:row-end-3 lg:col-end-2 flex flex-col gap-4">
              <div className="profile-photo flex flex-col items-center gap-2">
                <div className="h-[130px] w-[130px]">
                  <img
                    src={
                      imagePreview ||
                      (profileData["img"] ? profileData["img"] : defaultImg)
                    }
                    alt="profile photo"
                    className="h-full w-full rounded-full object-cover object-center overflow-hidden"
                  />
                </div>
                <p className="font-rubik font-bold text-xl">
                  {profileData && profileData["display_name"]}
                </p>
                <p className="font-rubik font-normal text-[0.9375rem]">
                  {profileData && profileData["email"]}
                </p>
              </div>
              <div className="photo-option flex flex-col items-center gap-2">
                <button
                  disabled={!isEditable}
                  className="font-poppins font-bold text-[0.9375rem] duration-300 bg-first-yellow hover:bg-first-brown active:bg-first-brown disabled:bg-gray-400 text-first-brown hover:text-white active:text-white disabled:text-fifth-gray disabled:cursor-not-allowed border-none rounded-[10px] w-full h-[60px]"
                  onClick={() => document.querySelector(".input-field").click()}
                >
                  Choose photo
                </button>
                <input
                  type="file"
                  name="img"
                  id="img"
                  className="input-field"
                  hidden
                  accept="image/png, image/jpg, image/jpeg, image/webp"
                  onChange={(e) => onImageChange(e)}
                />
                <button
                  onClick={(e) => removeImageHandler(e)}
                  className="font-poppins font-bold text-[0.9375rem bg-first-brown text-white hover:bg-first-yellow active:bg-first-yellow hover:text-first-brown active:text-first-brown disabled:bg-gray-400 disabled:text-fifth-gray disabled:cursor-not-allowed border-none rounded-[10px] w-full h-[60px] duration-300"
                >
                  Remove photo
                </button>
              </div>
              <div>
                <button
                  className="w-full h-[60px] bg-white hover:bg-first-brown active:bg-first-brown text-first-brown hover:text-white active:text-white border border-solid border-fourth-gray hover:border-transparent active:border-transparent rounded-[20px] font-poppins font-bold text-lg duration-300"
                  onClick={openHandler}
                >
                  Edit Password
                </button>
              </div>
            </div>
            <div className="save-option order-3 lg:order-none lg:row-start-3 lg:col-start-1 lg:row-end-5 lg:col-end-2 flex flex-col gap-2">
              <div className="min-h-[177.6px]">
                <Transition
                  appear
                  show={isEditable}
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="flex flex-col gap-y-2">
                    <p className="text-center whitespace-nowrap font-poppins text-xl font-bold text-first-brown border-[0.5px] border-solid border-white shadow-[0px_6px_9px_rgba(255,255,255,0.21)]">
                      Do you want to save
                      <br />
                      the change?
                    </p>
                    <button
                      disabled={!Object.values(form).some((value) => !!value)}
                      className="w-full h-[60px] bg-first-brown text-white hover:bg-first-yellow active:bg-first-yellow hover:text-first-brown active:text-first-brown disabled:bg-gray-400 disabled:text-fifth-gray disabled:cursor-not-allowed border-none rounded-[20px] font-poppins font-bold text-lg duration-300"
                      id="save-btn"
                      onClick={(e) => updateHandler(e)}
                    >
                      Save change
                    </button>
                    <button
                      disabled={!Object.values(form).some((value) => !!value)}
                      onClick={cancelHandler}
                      className="w-full h-[60px] bg-first-yellow text-first-brown hover:bg-first-brown active:bg-first-brown hover:text-white active:text-white disabled:bg-gray-400 disabled:text-fifth-gray disabled:cursor-not-allowed border-none rounded-[20px] font-poppins font-bold text-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </Transition>
              </div>
              <button
                className="w-full h-[60px] bg-white hover:bg-first-brown active:bg-first-brown text-first-brown hover:text-white active:text-white border border-solid border-fourth-gray hover:border-transparent active:border-transparent rounded-[20px] font-poppins font-bold text-lg duration-300"
                onClick={() => setIsModalOpen(true)}
              >
                Log out
              </button>
            </div>
            <div className="right-side lg:row-start-1 lg:col-start-2 lg:row-end-5 lg:col-end-4 flex flex-col gap-9 bg-white shadow-[0px_6px_20px_rgba(0,0,0,0.22),0px_6px_20px_rgba(106,64,41,0.7)] rounded-[10px] border-b-[12px] border-solid border-first-brown h-[841px] py-4 px-8 relative">
              <div className="contact-form flex flex-col gap-6">
                <div className="form-title font-poppins font-bold text-[1.5625rem] text-first-gray">
                  Contacts
                </div>
                <form className="contacts grid grid-cols-2 grid-rows-2 gap-y-3 gap-x-12">
                  <div className="contacts-content flex flex-col gap-y-2 row-start-1 col-start-1 row-end-2 col-end-2">
                    <label
                      htmlFor="email"
                      className="font-poppins font-medium text-xl text-fourth-gray"
                    >
                      Email address :
                    </label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={profileData && profileData["email"]}
                      disabled={!isEditable}
                      id="email-input"
                      className="outline-0 border-b-2 font-rubik font-normal text-xl"
                    />
                  </div>
                  <div className="contacts-content flex flex-col gap-y-2 row-start-2 col-start-1 row-end-3 col-end-2">
                    <label
                      htmlFor="address"
                      className="font-poppins font-medium text-xl text-fourth-gray"
                    >
                      Delivery address :
                    </label>
                    <textarea
                      type="text"
                      name="address"
                      id="address-input"
                      className="outline-0 border-b-2 font-rubik font-normal text-xl resize-none"
                      defaultValue={profileData && profileData["address"]}
                      disabled={!isEditable}
                      onChange={onFormChange}
                    ></textarea>
                  </div>
                  <div className="contacts-content flex flex-col gap-y-2 row-start-1 col-start-2 row-end-2 col-end-3">
                    <label
                      htmlFor="phone_number"
                      className="font-poppins font-medium text-xl text-fourth-gray"
                    >
                      Mobile number :
                    </label>
                    <input
                      type="text"
                      name="phone_number"
                      defaultValue={profileData && profileData["phone_number"]}
                      disabled={!isEditable}
                      id="phone-input"
                      className="outline-0 border-b-2 font-rubik font-normal text-xl"
                    />
                  </div>
                </form>
              </div>
              <div className="detail-form flex flex-col gap-6">
                <div className="form-title font-poppins font-bold text-[1.5625rem] text-first-gray">
                  Details
                </div>
                <form className="details grid grid-cols-2 grid-rows-3 gap-y-3 gap-x-12">
                  <div className="details-content flex flex-col gap-y-2 row-start-1 col-start-1 row-end-2 col-end-2">
                    <label
                      htmlFor="display_name"
                      className="font-poppins font-medium text-xl text-fourth-gray"
                    >
                      Display name :
                    </label>
                    <input
                      type="text"
                      name="display_name"
                      id="dName-input"
                      defaultValue={profileData && profileData["display_name"]}
                      disabled={!isEditable}
                      className="outline-0 border-b-2 font-rubik font-normal text-xl"
                      onChange={onFormChange}
                    />
                  </div>
                  <div className="details-content flex flex-col gap-y-2 row-start-2 col-start-1 row-end-3 col-end-2">
                    <label
                      htmlFor="first_name"
                      className="font-poppins font-medium text-xl text-fourth-gray"
                    >
                      First Name :
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      id="fName-input"
                      defaultValue={profileData && profileData["first_name"]}
                      disabled={!isEditable}
                      className="outline-0 border-b-2 font-rubik font-normal text-xl"
                      onChange={onFormChange}
                    />
                  </div>
                  <div className="details-content flex flex-col gap-y-2 row-start-3 col-start-1 row-end-4 col-end-2">
                    <label
                      htmlFor="last_name"
                      className="font-poppins font-medium text-xl text-fourth-gray"
                    >
                      Last Name :
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      id="lName-input"
                      defaultValue={profileData && profileData["last_name"]}
                      disabled={!isEditable}
                      className="outline-0 border-b-2 font-rubik font-normal text-xl"
                      onChange={onFormChange}
                    />
                  </div>
                  <div className="details-content flex flex-col gap-y-2 row-start-1 col-start-2 row-end-2 col-end-3">
                    <label
                      htmlFor="birth_date"
                      className="font-poppins font-medium text-xl text-fourth-gray"
                    >
                      DD/MM/YY
                    </label>
                    <input
                      type="text"
                      name="birth_date"
                      id="date-input"
                      key={profileData && birthDate}
                      defaultValue={profileData && birthDate}
                      disabled={!isEditable}
                      className="outline-0 border-b-2 font-rubik font-normal text-xl"
                      onChange={onBirthDateChange}
                    />
                  </div>
                </form>
              </div>
              <div className="gender flex flex-row justify-around">
                {profileData["gender"] === "male" ? (
                  <>
                    <div className="radio-input flex flex-row items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        id="male"
                        className="radio border-4 rounded-full w-[1.3rem] h-[1.3rem] outline-none appearance-none checked:border-4 border-solid border-fourth-gray checked:border-first-brown bg-white checked:bg-first-yellow"
                        defaultChecked
                        disabled={!isEditable}
                        onChange={onGenderChange}
                      />
                      <label
                        htmlFor="male"
                        className="font-poppins font-medium text-xl text-fourth-gray"
                      >
                        Male
                      </label>
                    </div>
                    <div className="radio-input flex flex-row items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        id="female"
                        className="radio border-4 rounded-full w-[1.3rem] h-[1.3rem] outline-none appearance-none checked:border-4 border-solid border-fourth-gray checked:border-first-brown bg-white checked:bg-first-yellow"
                        disabled={!isEditable}
                        onChange={onGenderChange}
                      />
                      <label
                        htmlFor="female"
                        className="font-poppins font-medium text-xl text-fourth-gray"
                      >
                        Female
                      </label>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="radio-input flex flex-row items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        id="male"
                        className="radio border-4 rounded-full w-[1.3rem] h-[1.3rem] outline-none appearance-none checked:border-4 border-solid border-fourth-gray checked:border-first-brown bg-white checked:bg-first-yellow"
                        disabled={!isEditable}
                        onChange={onGenderChange}
                      />
                      <label
                        htmlFor="male"
                        className="font-poppins font-medium text-xl text-fourth-gray"
                      >
                        Male
                      </label>
                    </div>
                    <div className="radio-input flex flex-row items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        id="female"
                        className="radio border-4 rounded-full w-[1.3rem] h-[1.3rem] outline-none appearance-none checked:border-4 border-solid border-fourth-gray checked:border-first-brown bg-white checked:bg-first-yellow"
                        defaultChecked
                        disabled={!isEditable}
                        onChange={onGenderChange}
                      />
                      <label
                        htmlFor="female"
                        className="font-poppins font-medium text-xl text-fourth-gray"
                      >
                        Female
                      </label>
                    </div>
                  </>
                )}
              </div>
              <div
                onClick={editHandler}
                className=" absolute top-[10px] right-[10px]"
              >
                <div className="group relative flex">
                  <div
                    id="pen"
                    className="bg-first-brown hover:bg-first-yellow active:bg-first-yellow duration-300 cursor-pointer rounded-full w-[3.0625rem] h-[3.0625rem]"
                  >
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 20 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-[15px] right-[15px]"
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
                  <span className="absolute top-14 -right-8 scale-0 transition-all rounded bg-black py-2 px-4 text-xs text-white whitespace-nowrap group-hover:scale-100 group-active:scale-0">
                    Edit profile data
                  </span>
                </div>
              </div>
            </div>
            <Transition appear show={isDialogOpen} as={Fragment}>
              <Dialog
                as="div"
                onClose={closeHandler}
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
                      <Dialog.Panel className="bg-white w-1/2 p-16 rounded-lg shadow-[0px_4px_20px_rgba(0,0,0,0.1)] text-center z-[52] relative">
                        <Dialog.Title className="text-2xl font-bold mb-8">
                          Change Password
                        </Dialog.Title>
                        <form className="flex flex-col gap-y-8">
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="oldPwd"
                              className="font-medium text-xl text-grey"
                            >
                              Old Password
                            </label>
                            <div className="w-3/4 relative">
                              <input
                                type={visible1 ? "text" : "password"}
                                id="oldPwd"
                                name="oldPwd"
                                value={oldPwd}
                                className="outline-0 border-b-2 font-rubik font-normal text-xl w-full"
                                onChange={(e) => setOldPwd(e.target.value)}
                              />
                              {!visible1 ? (
                                <i
                                  onClick={() => setVisible1(!visible1)}
                                  className="material-icons-outlined absolute top-[0px] right-[0px] cursor-pointer"
                                >
                                  visibility
                                </i>
                              ) : (
                                <i
                                  onClick={() => setVisible1(!visible1)}
                                  className="material-icons-outlined absolute top-[0px] right-[0px] cursor-pointer"
                                >
                                  visibility_off
                                </i>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="newPwd"
                              className="font-medium text-xl text-grey"
                            >
                              New Password
                            </label>
                            <div className="w-3/4 relative">
                              <input
                                type={visible2 ? "text" : "password"}
                                id="newPwd"
                                name="newPwd"
                                value={newPwd}
                                className="outline-0 border-b-2 font-rubik font-normal text-xl w-full"
                                onChange={(e) => setNewPwd(e.target.value)}
                              />
                              {!visible2 ? (
                                <i
                                  onClick={() => setVisible2(!visible2)}
                                  className="material-icons-outlined absolute top-[0px] right-[0px] cursor-pointer"
                                >
                                  visibility
                                </i>
                              ) : (
                                <i
                                  onClick={() => setVisible2(!visible2)}
                                  className="material-icons-outlined absolute top-[0px] right-[0px] cursor-pointer"
                                >
                                  visibility_off
                                </i>
                              )}
                            </div>
                          </div>
                          <div className="w-full">
                            <button
                              onClick={(e) => pwdHandler(e)}
                              disabled={!oldPwd || !newPwd}
                              className="bg-first-brown text-white font-poppins font-bold text-xl px-4 py-2 rounded-[20px] duration-300 hover:text-first-brown disabled:text-fifth-gray hover:bg-first-yellow disabled:bg-gray-400 disabled:cursor-not-allowed w-3/4 h-16"
                            >
                              Save
                            </button>
                          </div>
                        </form>
                        <div
                          onClick={closeHandler}
                          className="absolute top-0 right-0"
                        >
                          <div className="group relative flex">
                            <div className="flex cursor-pointer bg-first-yellow hover:bg-[rgb(255,169,0)] text-first-brown font-poppins font-bold h-[40px] w-[40px] justify-center items-center rounded-full duration-300">
                              <i className="material-icons font-black">close</i>
                            </div>
                            <span className="absolute top-12 -right-2 scale-0 transition-all rounded bg-black py-2 px-4 text-xs text-white whitespace-nowrap group-hover:scale-100 group-active:scale-0">
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
            <Transition appear show={isModalOpen} as={Fragment}>
              <Dialog
                as="div"
                onClose={() => setIsModalOpen(false)}
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
                      <Dialog.Panel className="bg-white flex flex-col gap-y-10 w-3/4 lg:w-1/2 p-16 rounded-lg shadow-[0px_4px_20px_rgba(0,0,0,0.1)] text-center z-[52] relative">
                        <Dialog.Title className="text-4xl font-rubik font-bold mb-2">
                          Are you sure?
                        </Dialog.Title>
                        <div className="flex justify-center items-center">
                          <div className="flex justify-center items-center gap-x-5 w-full">
                            <button
                              onClick={(e) => logoutHandler(e)}
                              className="bg-first-brown text-white font-poppins font-bold text-2xl w-1/4 h-16 px-4 py-2 rounded-[20px] duration-300 hover:text-first-brown hover:bg-first-yellow disabled:text-fifth-gray disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setIsModalOpen(false)}
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
