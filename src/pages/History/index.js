import React from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import veggie from "../../assets/img/veggie.webp";

//TODO: make history card components and use axios to get the data
function History() {

	document.title = "History";

	return (
		<div className="grid grid-cols-1 grid-rows-1">
      <Header title="history" />
			<main>
				<section className="history-bg bg-cover bg-no-repeat bg-center">
					<section className="main-title py-10">
						<div className="title-wrapper flex flex-col gap-3">
							<p className="font-rubik font-bold text-4xl text-center text-white">
								Let&apos;s see what you have bought!
							</p>
							<p className="font-rubik font-normal text-lg text-center text-white">
								Long press to delete item
							</p>
						</div>
					</section>
					<section className="main-content pt-10 pb-32">
						<div
							className="content-wrapper grid xl:grid-cols-3 xl:grid-rows-5 md:grid-cols-2 lg:gap-8 px-12 gap-4"
						>
							<div className="cards">
								<div>
									<img
										src={veggie}
										alt="Picture of veggie tomato mix menu"
										className="card-img"
									/>
								</div>
								<div className="card-txt">
									<p className="font-poppins font-bold text-[1.563rem] text-black">
										Veggie tomato mix
									</p>
									<p className="font-poppins font-normal text-xl text-second-brown">
										IDR 34.000
									</p>
									<p className="font-poppins font-normal text-xl text-first-brown">
										Delivered
									</p>
								</div>
								<div className="garbage-icon">
									<img src="../assets/garbage-icon.svg" alt="garbage icon" />
								</div>
								<div className="close-icon">
									<p>X</p>
								</div>
							</div>
							<div className="cards">
								<div>
									<img
										src={veggie}
										alt="Picture of veggie tomato mix menu"
										className="card-img"
									/>
								</div>
								<div className="card-txt">
									<p className="font-poppins font-bold text-[1.563rem] text-black">
										Veggie tomato mix
									</p>
									<p className="font-poppins font-normal text-xl text-second-brown">
										IDR 34.000
									</p>
									<p className="font-poppins font-normal text-xl text-first-brown">
										Delivered
									</p>
								</div>
								<div className="garbage-icon">
									<img src="../assets/garbage-icon.svg" alt="garbage icon" />
								</div>
								<div className="close-icon">
									<p>X</p>
								</div>
							</div>
							<div className="cards">
								<div>
									<img
										src={veggie}
										alt="Picture of veggie tomato mix menu"
										className="card-img"
									/>
								</div>
								<div className="card-txt">
									<p className="font-poppins font-bold text-[1.563rem] text-black">
										Veggie tomato mix
									</p>
									<p className="font-poppins font-normal text-xl text-second-brown">
										IDR 34.000
									</p>
									<p className="font-poppins font-normal text-xl text-first-brown">
										Delivered
									</p>
								</div>
								<div className="garbage-icon">
									<img src="../assets/garbage-icon.svg" alt="garbage icon" />
								</div>
								<div className="close-icon">
									<p>X</p>
								</div>
							</div>
							<div className="cards">
								<div>
									<img
										src={veggie}
										alt="Picture of veggie tomato mix menu"
										className="card-img"
									/>
								</div>
								<div className="card-txt">
									<p className="font-poppins font-bold text-[1.563rem] text-black">
										Veggie tomato mix
									</p>
									<p className="font-poppins font-normal text-xl text-second-brown">
										IDR 34.000
									</p>
									<p className="font-poppins font-normal text-xl text-first-brown">
										Delivered to Table 4
									</p>
								</div>
								<div className="garbage-icon">
									<img src="../assets/garbage-icon.svg" alt="garbage icon" />
								</div>
								<div className="close-icon">
									<p>X</p>
								</div>
							</div>
							<div className="cards">
								<div>
									<img
										src={veggie}
										alt="Picture of veggie tomato mix menu"
										className="card-img"
									/>
								</div>
								<div className="card-txt">
									<p className="font-poppins font-bold text-[1.563rem] text-black">
										Veggie tomato mix
									</p>
									<p className="font-poppins font-normal text-xl text-second-brown">
										IDR 34.000
									</p>
									<p className="font-poppins font-normal text-xl text-first-brown">
										Delivered to Table 4
									</p>
								</div>
								<div className="garbage-icon">
									<img src="../assets/garbage-icon.svg" alt="garbage icon" />
								</div>
								<div className="close-icon">
									<p>X</p>
								</div>
							</div>
							<div className="cards">
								<div>
									<img
										src={veggie}
										alt="Picture of veggie tomato mix menu"
										className="card-img"
									/>
								</div>
								<div className="card-txt">
									<p className="font-poppins font-bold text-[1.563rem] text-black">
										Veggie tomato mix
									</p>
									<p className="font-poppins font-normal text-xl text-second-brown">
										IDR 34.000
									</p>
									<p className="font-poppins font-normal text-xl text-first-brown">
										Delivered to Table 4
									</p>
								</div>
								<div className="garbage-icon">
									<img src="../assets/garbage-icon.svg" alt="garbage icon" />
								</div>
								<div className="close-icon">
									<p>X</p>
								</div>
							</div>
							<div className="cards">
								<div>
									<img
										src={veggie}
										alt="Picture of veggie tomato mix menu"
										className="card-img"
									/>
								</div>
								<div className="card-txt">
									<p className="font-poppins font-bold text-[1.563rem] text-black">
										Veggie tomato mix
									</p>
									<p className="font-poppins font-normal text-xl text-second-brown">
										IDR 34.000
									</p>
									<p className="font-poppins font-normal text-xl text-first-brown">
										Delivered to Table 4
									</p>
								</div>
								<div className="garbage-icon">
									<img src="../assets/garbage-icon.svg" alt="garbage icon" />
								</div>
								<div className="close-icon">
									<p>X</p>
								</div>
							</div>
							<div className="cards">
								<div>
									<img
										src={veggie}
										alt="Picture of veggie tomato mix menu"
										className="card-img"
									/>
								</div>
								<div className="card-txt">
									<p className="font-poppins font-bold text-[1.563rem] text-black">
										Veggie tomato mix
									</p>
									<p className="font-poppins font-normal text-xl text-second-brown">
										IDR 34.000
									</p>
									<p className="font-poppins font-normal text-xl text-first-brown">
										Delivered to Table 4
									</p>
								</div>
								<div className="garbage-icon">
									<img src="../assets/garbage-icon.svg" alt="garbage icon" />
								</div>
								<div className="close-icon">
									<p>X</p>
								</div>
							</div>
							<div className="cards">
								<div>
									<img
										src={veggie}
										alt="Picture of veggie tomato mix menu"
										className="card-img"
									/>
								</div>
								<div className="card-txt">
									<p className="font-poppins font-bold text-[1.563rem] text-black">
										Veggie tomato mix
									</p>
									<p className="font-poppins font-normal text-xl text-second-brown">
										IDR 34.000
									</p>
									<p className="font-poppins font-normal text-xl text-first-brown">
										Delivered to Table 4
									</p>
								</div>
								<div className="garbage-icon">
									<img src="../assets/garbage-icon.svg" alt="garbage icon" />
								</div>
								<div className="close-icon">
									<p>X</p>
								</div>
							</div>
							<div className="cards">
								<div>
									<img
										src={veggie}
										alt="Picture of veggie tomato mix menu"
										className="card-img"
									/>
								</div>
								<div className="card-txt">
									<p className="font-poppins font-bold text-[1.563rem] text-black">
										Veggie tomato mix
									</p>
									<p className="font-poppins font-normal text-xl text-second-brown">
										IDR 34.000
									</p>
									<p className="font-poppins font-normal text-xl text-first-brown">
										Delivered to Table 4
									</p>
								</div>
								<div className="garbage-icon">
									<img src="../assets/garbage-icon.svg" alt="garbage icon" />
								</div>
								<div className="close-icon">
									<p>X</p>
								</div>
							</div>
							<div className="cards">
								<div>
									<img
										src={veggie}
										alt="Picture of veggie tomato mix menu"
										className="card-img"
									/>
								</div>
								<div className="card-txt">
									<p className="font-poppins font-bold text-[1.563rem] text-black">
										Veggie tomato mix
									</p>
									<p className="font-poppins font-normal text-xl text-second-brown">
										IDR 34.000
									</p>
									<p className="font-poppins font-normal text-xl text-first-brown">
										Delivered to Table 4
									</p>
								</div>
								<div className="garbage-icon">
									<img src="../assets/garbage-icon.svg" alt="garbage icon" />
								</div>
								<div className="close-icon">
									<p>X</p>
								</div>
							</div>
							<div className="cards">
								<div>
									<img
										src={veggie}
										alt="Picture of veggie tomato mix menu"
										className="card-img"
									/>
								</div>
								<div className="card-txt">
									<p className="font-poppins font-bold text-[1.563rem] text-black">
										Veggie tomato mix
									</p>
									<p className="font-poppins font-normal text-xl text-second-brown">
										IDR 34.000
									</p>
									<p className="font-poppins font-normal text-xl text-first-brown">
										Delivered to Table 4
									</p>
								</div>
								<div className="garbage-icon">
									<img src="../assets/garbage-icon.svg" alt="garbage icon" />
								</div>
								<div className="close-icon">
									<p>X</p>
								</div>
							</div>
							<div className="cards">
								<div>
									<img
										src={veggie}
										alt="Picture of veggie tomato mix menu"
										className="card-img"
									/>
								</div>
								<div className="card-txt">
									<p className="font-poppins font-bold text-[1.563rem] text-black">
										Veggie tomato mix
									</p>
									<p className="font-poppins font-normal text-xl text-second-brown">
										IDR 34.000
									</p>
									<p className="font-poppins font-normal text-xl text-first-brown">
										Delivered to Table 4
									</p>
								</div>
								<div className="garbage-icon">
									<img src="../assets/garbage-icon.svg" alt="garbage icon" />
								</div>
								<div className="close-icon">
									<p>X</p>
								</div>
							</div>
							<div className="cards">
								<div>
									<img
										src={veggie}
										alt="Picture of veggie tomato mix menu"
										className="card-img"
									/>
								</div>
								<div className="card-txt">
									<p className="font-poppins font-bold text-[1.563rem] text-black">
										Veggie tomato mix
									</p>
									<p className="font-poppins font-normal text-xl text-second-brown">
										IDR 34.000
									</p>
									<p className="font-poppins font-normal text-xl text-first-brown">
										Delivered to Table 4
									</p>
								</div>
								<div className="garbage-icon">
									<img src="../assets/garbage-icon.svg" alt="garbage icon" />
								</div>
								<div className="close-icon">
									<p>X</p>
								</div>
							</div>
							<div className="cards">
								<div>
									<img
										src={veggie}
										alt="Picture of veggie tomato mix menu"
										className="card-img"
									/>
								</div>
								<div className="card-txt">
									<p className="font-poppins font-bold text-[1.563rem] text-black">
										Veggie tomato mix
									</p>
									<p className="font-poppins font-normal text-xl text-second-brown">
										IDR 34.000
									</p>
									<p className="font-poppins font-normal text-xl text-first-brown">
										Delivered to Table 4
									</p>
								</div>
								<div className="garbage-icon">
									<img src="../assets/garbage-icon.svg" alt="garbage icon" />
								</div>
								<div className="close-icon">
									<p>X</p>
								</div>
							</div>
						</div>
					</section>
				</section>
			</main>
      <Footer />
		</div>
	);
}

export default History;
