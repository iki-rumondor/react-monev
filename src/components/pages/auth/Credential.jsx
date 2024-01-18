import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";
import { Button, Form } from "react-bootstrap";
import { postData } from "../../../services/api";

export default function Credential() {
	const location = useLocation();
	const { setIsLoading } = useLoading();
	const navigate = useNavigate();
	setTimeout(() => {
		if (location.state?.error) {
			toast.error(location.state?.error);
		}
	}, 500);

	const [values, setValues] = useState({
		credential: "",
	});

	const redirectPath = location.state?.path || "/";

	const postHandler = async () => {
		try {
			setIsLoading(true);
			const res = await postData("credential", "POST", values);
			localStorage.setItem("token", res.token);
			navigate(redirectPath, { replace: true });
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<section className="section">
				<div className="d-flex flex-wrap align-items-stretch">
					<div className="d-flex align-items-center col-lg-4 col-md-6 col-12 order-lg-1 min-vh-100 order-2 bg-white">
						<div className="p-4 m-3">
							<h2 className="text-dark">Login i-Monev</h2>
							<p className="text-muted">
								Silahkan masukkan credetial untuk masuk!
							</p>
							<Form.Group className="mb-3" controlId="credential">
								<Form.Label className="font-weight-bold">
									Credential
								</Form.Label>
								<Form.Control
									value={values.credential}
									type="text"
									onChange={(e) =>
										setValues({
											...values,
											credential: e.target.value,
										})
									}
								/>
							</Form.Group>
							<div className="d-flex mt-4">
								<Button onClick={postHandler} className="w-100">
									Login
								</Button>
							</div>
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
