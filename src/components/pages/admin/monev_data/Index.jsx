import React, { useEffect, useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import { Button, Card, CardBody, Col, Form, Row } from "react-bootstrap";
import useLoading from "../../../hooks/useLoading";
import toast from "react-hot-toast";
import { fetchAPI } from "../../../utils/Fetching";
import { Content } from "./Content";

export default function MonevData() {
	const { setIsLoading } = useLoading();
	const [departments, setDepartments] = useState(null);
	const [years, setYears] = useState(null);
	const [step, setStep] = useState({
		department: "",
		year: "",
		instrument: "",
	});

	const instruments = [
		{
			value: "1",
			name: "Ketersediaan RPS",
		},
		{
			value: "2",
			name: "Ketersediaan Modul Praktikum",
		},
		{
			value: "3",
			name: "Ketersediaan Alat Praktikum",
		},
		{
			value: "4",
			name: "Kesesuaian Kemampuan Dosen Dengan Mata Kuliah",
		},
		{
			value: "5",
			name: "Fasilitas, Sarana, dan Prasarana",
		},
		{
			value: "6",
			name: "Persentase Kehadiran Dosen Dalam Mengajar",
		},
		{
			value: "7",
			name: "Persentase Kehadiran Mahasiswa",
		},
		{
			value: "8",
			name: "Kesesuaian Mengajar Dosen dengan RPS",
		},
		{
			value: "9",
			name: "Persentase Kelulusan Mahasiswa Per Mata Kuliah",
		},
		{
			value: "10",
			name: "Persentase Keikutsertaan Mahasiswa Mengikuti Ujian Akhir Semester",
		},
		{
			value: "11",
			name: "Pemasukan Nilai Akhir Mata Kuliah",
		},
	];

	const handleChange = (e) => {
		setStep({ ...step, [e.target.name]: e.target.value });
	};

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const year = await fetchAPI(`/api/academic-years`);
			setYears(year.data);
			const d_res = await fetchAPI(`/api/departments`);
			setDepartments(d_res.data);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleLoad();
	}, []);

	return (
		<>
			<DashboardLayout header={"Data Hasil Monev"}>
				<Card>
					<CardBody>
						<Row>
							<Col sm={6}>
								<Form.Group
									className="mb-3"
									controlId="department"
								>
									<Form.Label>Program Studi</Form.Label>
									<Form.Control
										as="select"
										value={step?.department}
										onChange={(e) => {
											setStep({
												...step,
												department: e.target.value,
												instrument: "",
											});
										}}
									>
										<option value="" disabled>
											Pilih Program Studi
										</option>
										{departments &&
											departments.map((item, idx) => (
												<option
													key={idx}
													value={item.uuid}
												>
													{item.name}
												</option>
											))}
									</Form.Control>
								</Form.Group>
							</Col>
							<Col sm={6}>
								<Form.Group className="mb-3" controlId="year">
									<Form.Label>Tahun Ajaran</Form.Label>
									<Form.Control
										as="select"
										value={step?.year}
										onChange={(e) => {
											setStep({
												...step,
												year: e.target.value,
												instrument: "",
											});
										}}
									>
										<option value="" disabled>
											Pilih Tahun Ajaran
										</option>
										{years &&
											years.map((item, idx) => (
												<option
													key={idx}
													value={item.uuid}
												>
													{item.name}
												</option>
											))}
									</Form.Control>
								</Form.Group>
							</Col>
						</Row>
						<Form.Group className="mb-3" controlId="instrument">
							<Form.Label>Instrumen Monev</Form.Label>
							<Form.Control
								as="select"
								name="instrument"
								value={step?.instrument}
								onChange={handleChange}
							>
								<option value="" disabled>
									Pilih Instrumen Monev
								</option>
								{instruments &&
									instruments.map((item, idx) => (
										<option key={idx} value={item.value}>
											{item.name}
										</option>
									))}
							</Form.Control>
						</Form.Group>
					</CardBody>
				</Card>
				{step.department !== "" &&
					step.year !== "" &&
					step.instrument && (
						<Card>
							<CardBody>
								<Content
									instrument={step.instrument}
									yearID={step.year}
									departmentID={step.department}
								/>
							</CardBody>
						</Card>
					)}
			</DashboardLayout>
		</>
	);
}
