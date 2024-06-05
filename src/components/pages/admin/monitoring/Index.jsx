import React, { useEffect, useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import { Button, Card, CardBody, Form } from "react-bootstrap";
import useLoading from "../../../hooks/useLoading";
import { ConfirmModal } from "../../../layout/modals/ConfirmModal";
import { Content } from "./Content";
import toast from "react-hot-toast";
import { fetchAPI, postAPI } from "../../../utils/Fetching";
import { useParams } from "react-router-dom";
import { WordCloud } from "../../../layout/chart/WordCloud";

export default function Monitoring() {
	const { isSuccess, setIsLoading, setIsSuccess } = useLoading();
	const [show, setShow] = useState(false);
	const [departments, setDepartments] = useState(false);
	const [depSelected, setDepSelected] = useState("");
	const [year, setYear] = useState(null);
	const { yearID } = useParams();

	const [values, setValues] = useState({
		id: 0,
		step: "",
	});

	const breadcumb = [
		{
			name: "Tahun Ajaran",
			link: `/monitoring`,
		},
	];

	const steps = [
		{
			name: "Persentase Ketersediaan RPS",
			value: "rps",
		},
		{
			name: "Persentase Ketersediaan Modul Praktikum",
			value: "modul",
		},
		{
			name: "Word Cloud Keterampilan Dosen",
			value: "skills",
		},
		{
			name: "Persentase Kehadiran Dosen Per Kelas",
			value: "teacher_attendance",
		},
		{
			name: "Persentase Kehadiran Mahasiswa Yang Lebih Dari 75% Per Kelas",
			value: "student_attendance",
		},
	];

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			// const res = await fetchAPI(`/api/settings`);
			// res.data.map((item) => {
			// 	if (item.name == "step_monev") {
			// 		setValues({
			// 			id: item.id,
			// 			step: item.value,
			// 		});
			// 	}
			// });
			const d_res = await fetchAPI(`/api/departments`);
			setDepartments(d_res.data);
			const y_res = await fetchAPI(`/api/academic-years/${yearID}`);
			setYear(y_res.data);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async () => {
		try {
			setIsSuccess(false);
			setIsLoading(true);
			const res = await postAPI("/api/settings/step", "PATCH", values);
			toast.success(res.message);
			setIsSuccess(true);
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
			<DashboardLayout
				title={year?.name}
				breadcumb={breadcumb}
				header={"Grafik Hasil Monitoring"}
			>
				<Card>
					<CardBody>
						<Form.Group className="mb-3" controlId="step">
							<Form.Label>
								Grafik Monitoring Pembelajaran
							</Form.Label>
							<Form.Control
								as="select"
								name="step"
								value={values.step}
								onChange={handleChange}
							>
								<option value="" disabled>Pilih Grafik</option>
								{steps.map((item, idx) => (
									<option key={idx} value={item.value}>
										{item.name}
									</option>
								))}
							</Form.Control>
						</Form.Group>
					</CardBody>
				</Card>
				<Card>
					<CardBody>
						<Form.Group className="mb-3" controlId="department">
							<Form.Control
								as="select"
								name="department"
								value={depSelected}
								onChange={(e) => {
									setDepSelected(e.target.value);
								}}
							>
								<option value="" disabled>
									Pilih Program Studi
								</option>
								{departments &&
									departments.map((item, idx) => (
										<option key={idx} value={item.uuid}>
											{item.name}
										</option>
									))}
							</Form.Control>
						</Form.Group>
						{depSelected !== "" && (
							<div className="p-lg-4 m-auto">
								<Content
									step={values.step}
									departmentID={depSelected}
									yearID={yearID}
								/>
							</div>
						)}
					</CardBody>
				</Card>
				<ConfirmModal
					show={show}
					handleClose={handleClose}
					handleSubmit={handleSubmit}
				/>
			</DashboardLayout>
		</>
	);
}
