import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { signup } from "../../utils/https/auth";

import HeaderAuth from "../../components/HeaderAuth";
import FooterAuth from "../../components/FooterAuth";

import googleLogo from "../../assets/icon/google-logo.svg";

function SignUp() {
	const navigate = useNavigate();

	const [form, setForm] = React.useState({ email: "", password: "", phoneNumber: "" });

	const [error, setError] = React.useState({ email: "", password: "", phoneNumber: "" });

	const handleRedirect = () => { navigate("/login") }

	const signupHandler = (e) => {
		e.preventDefault();
		toast.dismiss();

		const invalid = { email: "", password: "", phoneNumber: "" };

		// eslint-disable-next-line no-useless-escape
		const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gm;
		const phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/gm;

		if (!form.email) {
			invalid.email = "Email is required";
		} else if (!emailRegex.test(form.email)) {
			invalid.email = "Invalid email";
		}

		if (!form.password) invalid.password = "Password is required"

		if (!form.phoneNumber) {
			invalid.phoneNumber = "Phone number is required";
		} else if (!phoneRegex.test(form.phoneNumber)) {
			invalid.phoneNumber = "Invalid phone number";
		}

		setError({ email: invalid.email, password: invalid.password, phoneNumber: invalid.phoneNumber });

		if (invalid.email === "" && invalid.password === "" && invalid.phoneNumber === "") {
			toast.promise(
				signup(form.email, form.password, form.phoneNumber).then((res) => { return res.data.message }),
				{
					loading: "loading...",
					success: () => {
						handleRedirect();
						return (
							<>
								Successfully registered
							</>
						);
					},
					error: ({ res }) => res.data.message
				}
			);
		}
	}

	const onChangeForm = (e) => {
		setForm((form) => {
			return { ...form, [e.target.name]: e.target.value }
		})
	}

	document.title = "Sign Up";

	return (
		<div className="body-wrapper grid lg:grid-cols-2 md:grid-cols-1 grid-rows-1">
			<section className="image-holder lg:bg-cover lg:auth-bg md:block"></section>
			<section className="text-holderj flex flex-col font-rubik">
				<HeaderAuth pageTitle={"Sign Up"} />
				<main className="lg:py-16 lg:px-2 md:p-12 lg:my-16 lg:mx-0 md:m-0 lg:bg-none md:auth-bg md:bg-cover md:bg-center">
					<div className="form-wrapper flex flex-col items-center lg:py-6 lg:px-4 md:p-12 gap-[0.38rem] lg:border-none md:border md:border-solid md:border-[rgba(209,213,219,0.3)] lg:rounded-none md:rounded-[12px] lg:bg-white md:bg-[rgba(255,255,255,0.884)]">
						<form className="flex flex-col gap-4 w-[31.56rem]">
							<div className="form-content-wrapper flex flex-col gap-2">
								<label htmlFor="email" className="font-bold text-first-gray text-[1.13rem]">
									Email Address :
								</label>
								<input
									type="email"
									name="email"
									placeholder="Enter your email address"
									id="email-input"
									className="input-h rounded-[20px] lg:border lg:border-solid md:border-none text-base pl-8"
									value={form.email}
									onChange={onChangeForm}
								/>
								{error.email !== "" ? <div className="font-poppins text-red-700">{error.email}</div> : null}
							</div>
							<div className="form-content-wrapper flex flex-col gap-2">
								<label htmlFor="password" className="font-bold text-first-gray text-[1.13rem]">
									Password :
								</label>
								<input
									type="password"
									name="password"
									placeholder="Enter your password"
									id="pwd-input"
									className="input-h rounded-[20px] lg:border lg:border-solid md:border-none text-base pl-8"
									value={form.password}
									onChange={onChangeForm}
								/>
								{error.password !== "" ? <div className="font-poppins text-red-700">{error.password}</div> : null}
							</div>
							<div className="form-content-wrapper flex flex-col gap-2">
								<label htmlFor="phoneNumber" className="font-bold text-first-gray text-[1.13rem]">
									Phone Number :
								</label>
								<input
									type="phone-number"
									name="phoneNumber"
									placeholder="Enter your phone number"
									id="phone-input"
									className="input-h rounded-[20px] lg:border lg:border-solid md:border-none text-base pl-8"
									value={form.phoneNumber}
									onChange={onChangeForm}
								/>
								{error.phoneNumber !== "" ? <div className="font-poppins text-red-700">{error.phoneNumber}</div> : null}
							</div>
							<div className="button-wrapper flex flex-col items-center gap-2">
								<button
									type="button"
									id="signup-btn"
									className="w-full h-[4.7rem] rounded-[20px] border-none text-first-brown font-extrabold text-xl bg-first-yellow shadow-[0px_6px_20px_rgba(255,186,51, 0.4)] cursor-pointer"
									onClick={signupHandler}
								>
									Sign Up
								</button>
								<button
									id="google-signup"
									className="w-full h-[4.7rem] rounded-[20px] border-none flex flex-row items-center justify-center gap-2 text-black bg-white font-bold text-[1.16rem] font-poppins shadow-[0px_6px_20px_rgba(196,196,196,0.67)] cursor-pointer"
								>
									<img src={googleLogo} alt="google logo" className="w-[1.5rem] h-[1.5rem]" />
									Sign Up with Google
								</button>
							</div>
						</form>
						<div className="login-wrapper flex flex-col items-center gap-4 my-2 mx-0 w-[31.56rem]">
							<div className="question-wrapper flex flex-row items-center">
								<p
									id="line"
									className="border-b-2 border-solid border-b-third-gray font-medium py-0 px-[1.4rem]"
								></p>
								<p id="question" className="lg:my-0 lg:mx-1 md:m-0 text-second-gray">
									Already have an account?
								</p>
								<p
									id="line"
									className="border-b-2 border-solid border-b-third-gray font-medium py-0 px-[1.4rem]"
								></p>
							</div>
							<button
								className="w-full h-[4.7rem] rounded-[20px] border-none text-white bg-first-brown shadow-[0px_6px_20px_rgba(106,64,41,0.63)] font-extrabold text-xl cursor-pointer"
								onClick={() => navigate("/login")}
							>
								Login
							</button>
						</div>
					</div>
				</main>
				<FooterAuth />
			</section>
		</div>
	);
}

export default SignUp;
