import React, { useEffect, useState } from "react";
import { Button, Dropdown, Modal, Row } from "react-bootstrap";
import { fetchData, postData } from "../../../services/api";
import toast from "react-hot-toast";
import { ListKeyValue } from "../../module/List";
import moment from "moment";
import "moment/locale/id";
import useLoading from "../../hooks/useLoading";
import { formatDateRange } from "../../utils/Helpers";

export default function Detail({ uuid }) {
	const { isLoading } = useLoading();
	const [show, setShow] = useState(false);
	const [value, setValues] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const loadHandler = async () => {
		try {
			const res = await fetchData("academic-years/" + uuid);
			setValues(res.data);
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		loadHandler();
	}, [isLoading]);

	return (
		<>
			<Dropdown.Item className="text-info" href="#" onClick={handleShow}>
				Detail
			</Dropdown.Item>

			<Modal
				size="lg"
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header className="bg-info text-white">
					<Modal.Title>Detail Tahun Ajaran</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ListKeyValue
						keys={"Monev Awal Semester"}
						value={formatDateRange(value.first_range)}
					/>
					<ListKeyValue
						keys={"Monev Tengah Semester"}
						value={formatDateRange(value.middle_range)}
					/>
					<ListKeyValue
						keys={"Monev Sebelum UAS"}
						value={formatDateRange(value.middle_last_range)}
					/>
					<ListKeyValue
						keys={"Monev Setelah UAS"}
						value={formatDateRange(value.last_range)}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
