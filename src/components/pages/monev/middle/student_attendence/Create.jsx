import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import useLoading from "../../../../hooks/useLoading";
import { fetchAPI, postAPI } from "../../../../utils/Fetching";

export default function Create({ yearUuid }) {
	const { setIsLoading, setIsSuccess, isSuccess } = useLoading();
	const [show, setShow] = useState(false);
	const [subjects, setSubjects] = useState(null);
	const defaultValue = {
		class: "",
		student_amount: "",
		middle: "",
		subject_uuid: "",
		academic_year_uuid: yearUuid,
	};
	const [values, setValues] = useState(defaultValue);

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleClose = () => {
		setShow(false);
	};

	const handleShow = () => setShow(true);

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const s_res = await fetchAPI(`/api/subjects`);
			setSubjects(s_res.data);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async () => {
		// handleClose();
		try {
			setIsSuccess(false);
			setIsLoading(true);
			const res = await postAPI(
				"/api/middle-monev/student-attendences",
				"POST",
				values
			);
			toast.success(res.message);
			setIsSuccess(true);
			setValues(defaultValue);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleLoad();
	}, [isSuccess]);

	return (
		<>
			<Button
				className="mb-3"
				variant="primary"
				href="#"
				onClick={handleShow}
			>
				Tambah Data
			</Button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Lengkapi Data</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="subject">
						<Form.Label>Mata Kuliah</Form.Label>
						<Form.Control
							as="select"
							name="subject_uuid"
							value={values?.subject_uuid}
							onChange={handleChange}
						>
							<option value="" disabled>
								Pilih Mata Kuliah
							</option>
							{subjects &&
								subjects.map((item, idx) => (
									<option key={idx} value={item.uuid}>
										{item.name}
									</option>
								))}
						</Form.Control>
					</Form.Group>
					<Form.Group className="mb-3" controlId="class">
						<Form.Label>Kelas</Form.Label>
						<Form.Control
							name="class"
							value={values?.class}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="student_amount">
						<Form.Label>Jumlah Mahasiswa</Form.Label>
						<Form.Control
							name="student_amount"
							value={values?.student_amount}
							type="number"
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="middle">
						<Form.Label>
							Jumlah Mahasiswa Dengan Persentase Kehadiran Lebih
							Dari 75%
						</Form.Label>
						<Form.Control
							type="number"
							name="middle"
							value={values?.middle}
							onChange={handleChange}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSubmit}>
						Tambah
					</Button>
					<Button
						variant="warning"
						onClick={() => {
							handleClose();
							handleSubmit();
						}}
					>
						Tambah & Keluar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
