import React, { useState } from "react";
import { Button, Dropdown, Modal, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";
import { deleteAPI } from "../../utils/Fetching";

export default function Delete({ uuid }) {
	const { setIsLoading, setIsSuccess } = useLoading();
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSubmit = async () => {
		setShow(false);
		try {
			setIsSuccess(false);
			setIsLoading(true);
			const res = await deleteAPI("/api/teacher-skills/" + uuid);
			toast.success(res.message);
			setIsSuccess(true);
		} catch (error) {
			toast.error(error)
		} finally {
			setIsLoading(false)
		}
	};

	return (
		<>
			<Dropdown.Item
				className="text-danger"
				href="#"
				onClick={handleShow}
			>
				Hapus
			</Dropdown.Item>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Hapus Data</Modal.Title>
				</Modal.Header>
				<Modal.Body>Tekan Hapus Untuk Melanjutkan</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="danger" onClick={handleSubmit}>
						Hapus
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
