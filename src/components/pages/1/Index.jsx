import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import useLoading from "../../hooks/useLoading";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { fetchData } from "../../../services/api";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Jurusan() {
	const { isLoading } = useLoading();
	const [values, setValues] = useState(null);
	const navigate = useNavigate();

	const loadHandler = async () => {
		try {
			const res = await fetchData("assessments/type");
			setValues(res.data);
		} catch (error) {
			toast.error(error.message);
		}
	};

	// useEffect(() => {
	// 	loadHandler();
	// }, [isLoading]);

	return (
		<>
			<DashboardLayout header={"Jurusan"}>
				{/* <CreateAssessmentQuestion/> */}
				<Row>
					<Col sm={6}>
						<Card className="card card-success">
							<Card.Header className="card-header">
								<h4 className="text-success">Tipe Penilaian</h4>
								<div className="card-header-action">
									<Button variant="success" disabled>
										Selesai
									</Button>
								</div>
							</Card.Header>
							<Card.Body>
								<Card.Text>19 Januari - 10 Januari</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col sm={6}>
						<Card className="card card-info">
							<Card.Header className="card-header">
								<h4 className="text-info">Tipe Penilaian</h4>
								<div className="card-header-action">
									<Link className="btn btn-info" to={"/response/detail/id"}>
										Isi
									</Link>
								</div>
							</Card.Header>
							<Card.Body>
								<Card.Text>19 Januari - 10 Januari</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</DashboardLayout>
		</>
	);
}
