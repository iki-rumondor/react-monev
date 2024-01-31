import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import useLoading from "../../hooks/useLoading";
import toast from "react-hot-toast";
import { postData } from "../../../services/api";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginForm() {
	const { setIsLoading } = useLoading();
	const location = useLocation();
	const navigate = useNavigate();
	const [values, setValues] = useState({
		username: "",
		password: "",
	});

	const redirectPath = location.state?.path || "/";

	const postHandler = async () => {
		try {
			setIsLoading(true);
			const res = await postData("signin", "POST", values);
			sessionStorage.setItem("token", res.token);
			navigate(redirectPath, { replace: true });
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="my-4">
			<Form.Group className="mb-3" controlId="name">
				<Form.Label className="font-weight-bold">Username</Form.Label>
				<Form.Control
					value={values.username}
					type="text"
					onChange={(e) =>
						setValues({
							...values,
							username: e.target.value,
						})
					}
				/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="password">
				<Form.Label className="font-weight-bold">Password</Form.Label>
				<Form.Control
					value={values.password}
					type="password"
					onChange={(e) =>
						setValues({
							...values,
							password: e.target.value,
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
	);
}
