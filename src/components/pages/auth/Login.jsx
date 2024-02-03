import React, { useEffect } from "react";
import LoginForm from "./LoginForm";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
	const location = useLocation();
	setTimeout(() => {
		if (location.state?.error) {
			toast.error(location.state?.error);
		}
	}, 500);

	return (
		<div>
			<section className="section">
				<div className="d-flex flex-wrap align-items-stretch">
					<div className="d-flex align-items-center col-lg-4 col-12 order-lg-1 min-vh-100 order-2 bg-white">
						<div className="p-4 m-auto">
							<h2 className="text-dark">Login i-Monev</h2>
							<p className="text-muted">
								Silahkan masukkan username dan password untuk
								masuk!
							</p>
							<LoginForm />
						</div>
					</div>
					<div
						className="col-lg-8 col-12 order-lg-2 order-1 min-vh-100 background-walk-y position-relative overlay-gradient-bottom"
						style={{
							backgroundImage:
								'url("/src/assets/img/teknik-ung.jpg")',
						}}
					></div>
				</div>
			</section>
		</div>
	);
}
