import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import { authAction } from "../../redux/slices/auth";
import { login } from "../../utils/https/auth";

import HeaderAuth from "../../components/HeaderAuth";
import FooterAuth from "../../components/FooterAuth";

import googleLogo from "../../assets/icon/google-logo.svg";

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [form, setForm] = React.useState({ email: "", password: "" });

	const [error, setError] = React.useState({ email: "", password: "" });

	const handleRedirect = () => { navigate("/") }

	const loginHandler = (e) => {
		e.preventDefault();
		toast.dismiss();

		const invalid = { email: "", password: "" };

		// eslint-disable-next-line no-useless-escape
		const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gm;

		if (!form.email) {
			invalid.email = "Email is required";
		} else if (!emailRegex.test(form.email)) {
			invalid.email = "Invalid email";
		}

		if (!form.password) invalid.password = "Password is required"

		setError({ email: invalid.email, password: invalid.password });

		if (invalid.email === "" && invalid.password === "") {
			toast.promise(
				login(form.email, form.password).then((res) => { dispatch(authAction.save(res.data)) }),
				{
					loading: "loading...",
					success: () => {
						handleRedirect();
						return (
							<>
								Welcome
							</>
						);
					},
					error: "Invalid email or password"
				}
			);
		}
	};

	const onChangeForm = (e) => {
		setForm((form) => {
			return { ...form, [e.target.name]: e.target.value }
		});
	}

	document.title = "Login";

	return (
		<div className="body-wrapper grid md:grid-cols-1 lg:grid-cols-2 grid-rows-1">
			<section className="image-holder lg:bg-cover lg:auth-bg md:hidden lg:block"></section>
			<section className="text-holder flex flex-col font-rubik">
				<HeaderAuth pageTitle={"Login"} />
				<main className="lg:py-16 lg:px-2 md:p-12 lg:my-16 lg:mx-0 md:m-0 lg:bg-none md:auth-bg md:bg-cover md:bg-center">
					<div className="form-wrapper flex flex-col items-center lg:py-6 lg:px-4 md:p-12 lg:bg-white md:bg-[rgba(255,255,255,0.884)] lg:rounded-none md:rounded-[12px] lg:border-none md:border md:border-solid md:border-[rgba(209,213,219,0.3)]">
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
								{ error.email !== "" ? <div className="font-poppins text-red-700">{error.email}</div> : null }
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
								{ error.password !== "" ? <div className="font-poppins text-red-700">{error.password}</div> : null }
							</div>
							<div className="forgot-pwd">
								<a href="/forgot" className="text-first-brown text-lg font-bold">
									Forgot password?
								</a>
							</div>
							<div className="button-wrapper flex flex-col items-center gap-8">
								<button
									type="button"
									id="login-btn"
									className="w-full h-[4.7rem] rounded-[20px] no-underline text-first-brown font-extrabold text-xl bg-first-yellow shadow-[0px_6px_20px_rgba(255,186,51,0.4)] cursor-pointer"
									onClick={loginHandler}
								>
									Login
								</button>
								<button
									id="google-login"
									className="w-full h-[4.7rem] rounded-[20px] no-underline flex flex-row items-center justify-center gap-2 text-black bg-white font-bold text-[1.16rem] font-poppins shadow-[0px_6px_20px_rgba(196,196,196,0.67)] cursor-pointer"
								>
									<img src={googleLogo} alt="google logo" className="w-[1.5rem] h-[1.5rem]" />
									Login with Google
								</button>
							</div>
						</form>
						<div className="signup-wrapper flex flex-col items-center gap-16 my-8 mx-0">
							<div className="question-wrapper flex flex-row items-center">
								<p id="line" className="border-b-2 border-solid border-b-third-gray w-[120px]"></p>
								<p
									id="question"
									className="lg:my-0 lg:mx-1 md:m-0 text-fourth-gray font-medium py-0 px-[1.4rem]"
								>
									Don&apos;t have an account?
								</p>
								<p id="line" className="border-b-2 border-solid border-b-third-gray w-[120px]"></p>
							</div>
							<button
								className="w-[106.5%] h-[4.7rem] rounded-[20px] no-underline text-white bg-first-brown shadow-[0px_6px_20px_rgba(106,64,41,0.63)] font-extrabold text-xl cursor-pointer"
								onClick={() => navigate("/signup")}
							>
								Sign up here
							</button>
						</div>
					</div>
				</main>
				<FooterAuth />
			</section>
		</div>
	);
}

export default Login;
