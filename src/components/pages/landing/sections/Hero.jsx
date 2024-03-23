import React from "react";
import { getUserRole } from "../../../../services/utils";

export const Hero = () => {
	const token = sessionStorage.getItem("token");
	return (
		<section id="hero" className="d-flex align-items-center">
			<div
				className="container-biz"
				data-aos="zoom-out"
				data-aos-delay="100"
			>
				<h1>
					Selamat Datang Di <span>Simpel</span>
				</h1>
				<p>Sistem Informasi Monitoring Perkuliahan Program Studi</p>
				<div className="d-flex">
					{token ? (
						<a href="/home" className="btn-get-started scrollto">
							Dashboard
						</a>
					) : (
						<a href="/login" className="btn-get-started scrollto">
							Login
						</a>
					)}
				</div>
			</div>
		</section>
	);
};
