import React from "react";

export const About = () => {
	return (
		<section id="tentang" className="about section-bg">
			<div className="container-biz" data-aos="fade-up">
				<div className="section-title">
					<h2>Tentang</h2>
					<h3>
						Fungsi & Penggunaan <span>Simpel</span>
					</h3>
					<p>
						Berikut adalah fungsi yang ada pada sistem informasi
						monitoring perkuliahan program studi
					</p>
				</div>

				<div className="row">
					<div
						className="col-lg-6"
						data-aos="fade-right"
						data-aos-delay="100"
					>
						{/* <img
							src="/src/assets/img/bizland/about.jpg"
							className="img-fluid"
							alt=""
						/> */}
					</div>
					<div
						className="col-12"
						data-aos="fade-up"
						data-aos-delay="100"
					>
						<ul>
							<li>
								<i className="bx bx-store-alt"></i>
								<div>
									<h5>Untuk Program Studi</h5>
									<p>
										Program Studi melalui koordinator program studi dapat melakukan monitoring perkuliahan mulai dari awal semester, tengah semester, hingga akhir semester secara terstruktur dan sistematis. Melalui fitur-fitur yang disediakan sistem ini, program studi dapat mencatat hasil monitoring secara terpusat.
									</p>
								</div>
							</li>
							<li>
								<i className="bx bx-images"></i>
								<div>
									<h5>
										Untuk Kepala Unit Penjaminan Mutu
									</h5>
									<p>
										Kepala unit penjaminan mutu dapat melihat hasil monitoring perkuliahan melalui grafik dan laporan dalam bentuk pdf. Ini dapat memudahkan kepala unit penjaminan mutu untuk mengetahui data-data hasil monitoring secara online.
									</p>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
};
