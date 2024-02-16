import React, { useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";
import { fetchAPI, postAPI } from "../../utils/Fetching";

export default function Edit({ uuid }) {
	const { setIsLoading, setIsSuccess } = useLoading();
	const [show, setShow] = useState(false);
	const [subjects, setSubjects] = useState(null);
	const [teachers, setTeachers] = useState(null);

	const [values, setValues] = useState({
		skill: "",
		teacher_uuid: "",
		subject_uuid: "",
	});

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true);
		handleLoad();
	};

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const t_res = await fetchAPI("/api/teachers");
			setTeachers(t_res.data);
			const s_res = await fetchAPI("/api/subjects");
			setSubjects(s_res.data);
			const res = await fetchAPI("/api/teacher-skills/" + uuid);
			setValues({
				teacher_uuid: res.data.teacher.uuid,
				subject_uuid: res.data.subject.uuid,
				skill: res.data.skill,
			});
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async () => {
		handleClose();
		try {
			setIsSuccess(false);
			setIsLoading(true);
			const res = await postAPI(
				"/api/teacher-skills/" + uuid,
				"PUT",
				values
			);
			toast.success(res?.message);
			setIsSuccess(true)
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Dropdown.Item
				className="text-warning"
				href="#"
				onClick={handleShow}
			>
				Edit
			</Dropdown.Item>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Edit Kemampuan Dosen</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="teacher">
						<Form.Label>Dosen</Form.Label>
						<Form.Control
							as="select"
							name="teacher_uuid"
							value={values?.teacher_uuid}
							onChange={handleChange}
						>
							<option value="" disabled>
								Pilih Dosen
							</option>
							{teachers &&
								teachers.map((item, idx) => (
									<option key={idx} value={item.uuid}>
										{item.name}
									</option>
								))}
						</Form.Control>
					</Form.Group>
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
					<Form.Group className="mb-3" controlId="skill">
						<Form.Label>Tuliskan Kemampuan</Form.Label>
						<Form.Control
							name="skill"
							value={values?.skill}
							type="text"
							onChange={handleChange}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSubmit}>
						Ubah
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
