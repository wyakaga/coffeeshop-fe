import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";
import { Dialog } from "@headlessui/react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { updateProfile, editPwd, logout } from "../../utils/https/auth";
import { authAction } from "../../redux/slices/auth";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import defaultImg from "../../assets/img/profile-placeholder.webp";

function Profile() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [profileData, setProfileData] = useState({});

	const [isEditable, setIsEditable] = useState(false);
	const [isUpload, setIsUpload] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

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
		newPwd: "",
		oldPwd: "",
	});

	const id = useSelector((state) => state.auth.data.data?.id);
	const token = useSelector((state) => state.auth.data.token);

	useEffect(() => {
		// eslint-disable-next-line no-undef
		const url = `${process.env.REACT_APP_SERVER_HOST}/users/${id}`;
		axios
			.get(url, { headers: { Authorization: `Bearer ${token}` } })
			.then((res) => setProfileData(res.data.data[0]))
			.catch((err) => console.log(err));
	}, [id]);

	const birthDate = DateTime.fromISO(profileData["birth_date"]).toFormat("dd/MM/yy");

	const editHandler = (e) => {
		e.preventDefault();
		setIsEditable(!isEditable);
	};

	const uploadHandler = (e) => {
		e.preventDefault();
		setIsUpload(!isUpload);
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
		const newValue = DateTime.fromFormat(value, "dd/MM/yy").toFormat("yyyy/MM/dd");
		setForm((prevForm) => ({ ...prevForm, [name]: newValue }));
	};

	const onImageChange = (e) => {
		const { name, files } = e.target;
		setForm((prevForm) => ({ ...prevForm, [name]: files[0] }));
	};

	const onGenderChange = (e) => {
		const { name, value } = e.target;
		setForm((prevForm) => ({ ...prevForm, [name]: value }));
	};

	const updateHandler = (e) => {
		e.preventDefault();

		updateProfile(
			id,
			token,
			form.address,
			form.display_name,
			form.first_name,
			form.last_name,
			form.birth_date,
			form.gender,
			form.img
		)
			.then((res) => {
				console.log(res.data[0]);
			})
			.catch((err) => {
				console.log(err);
			});

		setIsEditable(false);
		setIsUpload(false);
	};

	const pwdHandler = (e) => {
		e.preventDefault();

		editPwd(form.oldPwd, form.newPwd, token)
			.then((res) => {
				console.log(res.data[0]);
			})
			.catch((err) => {
				console.log(err);
			});

		window.location.reload();
	};

	const handleRedirect = () => navigate("/");

	const logoutHandler = (e) => {
		e.preventDefault();

		toast.promise(
			logout(token).then(() => {
				dispatch(authAction.delete());
			}),
			{
				loading: "loading...",
				success: () => {
					handleRedirect();

					return <>Successfully logged out</>;
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
			<main className="profile-bg bg-cover bg-center">
				<section className="flex flex-col pb-24 m-10">
					<div className="page-title">
						<h2 className="text-white font-rubik text-[2.1875rem] font-medium">User Profile</h2>
					</div>
					<div className="page-content flex flex-col lg:grid lg:grid-rows-4 lg:grid-cols-3 bg-first-white rounded-[20px] p-8 gap-y-12 gap-x-8">
						<div className="profile-option lg:row-start-1 lg:col-start-1 lg:row-end-3 lg:col-end-2 flex flex-col gap-4">
							<div className="profile-photo flex flex-col items-center gap-2">
								<img
									src={profileData["img"] ? profileData["img"] : defaultImg}
									alt="profile photo"
									className="h-[130px] w-[130px] rounded-full"
								/>
								<p className="font-rubik font-bold text-xl">
									{profileData && profileData["display_name"]}
								</p>
								<p className="font-rubik font-normal text-[0.9375rem]">
									{profileData && profileData["email"]}
								</p>
							</div>
							<div className="photo-option flex flex-col items-center gap-2">
								<button
									className="font-poppins font-bold text-[0.9375rem] duration-300 bg-first-yellow active:bg-first-brown text-first-brown active:text-white border-none rounded-[10px] w-full h-[60px]"
									onClick={uploadHandler}
								>
									Choose photo
								</button>
								{isUpload === true ? (
									<input
										type="file"
										name="img"
										id="img"
										defaultValue={form.img}
										onChange={onImageChange}
									/>
								) : null}
								<button className="font-poppins font-bold text-[0.9375rem bg-first-brown text-white border-none rounded-[10px] w-full h-[60px]">
									Remove photo
								</button>
							</div>
							<div>
								<button
									className="w-full h-[60px] bg-white text-first-brown border border-solid border-fourth-gray rounded-[20px] font-poppins font-bold text-lg"
									onClick={openHandler}
								>
									Edit Password
								</button>
							</div>
						</div>
						<div className="save-option order-3 lg:order-none lg:row-start-3 lg:col-start-1 lg:row-end-5 lg:col-end-2 flex flex-col gap-2">
							<p className="text-center whitespace-nowrap font-poppins text-xl font-bold text-first-brown border-[0.5px] border-solid border-white shadow-[0px_6px_9px_rgba(255,255,255,0.21)]">
								Do you want to save
								<br />
								the change?
							</p>
							<button
								className="w-full h-[60px] bg-first-brown text-white border-none rounded-[20px] font-poppins font-bold text-lg"
								id="save-btn"
								onClick={updateHandler}
							>
								Save change
							</button>
							<button className="w-full h-[60px] bg-first-yellow text-first-brown border-none rounded-[20px] font-poppins font-bold text-lg">
								Cancel
							</button>
							<button
								className="w-full h-[60px] bg-white text-first-brown border border-solid border-fourth-gray rounded-[20px] font-poppins font-bold text-lg"
								onClick={logoutHandler}
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
								id="pen"
								className="bg-first-brown active:bg-first-yellow duration-300 cursor-pointer rounded-full w-[3.0625rem] h-[3.0625rem] absolute top-[10px] right-[10px]"
								onClick={editHandler}
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
						</div>
						<Dialog
							open={isDialogOpen}
							onClose={closeHandler}
							className="fixed z-10 bg-white/70 inset-0 overflow-y-auto"
						>
							<div className="flex items-center justify-center min-h-screen">
								<div className="bg-white w-1/2 p-16 rounded-lg shadow-lg text-center z-20">
									<h2 className="text-2xl font-bold mb-2">Change Password</h2>
									<form onSubmit={pwdHandler} className="flex flex-col gap-2">
										<div className="flex justify-between">
											<label htmlFor="oldPwd" className="font-medium text-xl text-grey">
												Old Password :
											</label>
											<input
												type="password"
												id="oldPwd"
												name="oldPwd"
												defaultValue={oldPwd}
												className="outline-0 border-b-2 font-rubik font-normal text-xl w-2/3"
												onChange={onFormChange}
											/>
										</div>
										<div className="flex justify-between">
											<label htmlFor="newPwd" className="font-medium text-xl text-grey">
												New Password :
											</label>
											<input
												type="password"
												id="newPwd"
												name="newPwd"
												defaultValue={newPwd}
												className="outline-0 border-b-2 font-rubik font-normal text-xl w-2/3"
												onChange={onFormChange}
											/>
										</div>
										<button
											type="submit"
											className="bg-first-brown text-white font-poppins font-bold text-lg  px-4 py-2 rounded-[20px] duration-300 hover:text-first-brown hover:bg-first-yellow"
										>
											Save
										</button>
										<button
											onClick={() => setIsDialogOpen(false)}
											className="bg-white text-first-brown font-poppins font-bold text-lg border border-solid border-fourth-gray duration-300 hover:border-none px-4 py-2 rounded-[20px] hover:text-first-brown hover:bg-first-yellow"
										>
											Close
										</button>
									</form>
								</div>
							</div>
						</Dialog>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}

export default Profile;
