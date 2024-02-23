import React from "react";
import { Button, Modal } from "react-bootstrap";

export const ConfirmModal = ({ show, handleClose, handleSubmit }) => {
	return (
		<>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Konfirmasi</Modal.Title>
				</Modal.Header>
				<Modal.Body>Tekan Tombol Yakin Untuk Melanjutkan</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button
						variant="primary"
						onClick={() => {
							handleClose();
							handleSubmit();
						}}
					>
						Yakin
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
