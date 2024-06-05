import React from "react";
import { Col } from "react-bootstrap";

export const YearCard = ({ name, link, open, status, head }) => {
	let color = "secondary";

	const statusName = [
		"Ditutup",
		"Monev Awal Semester",
		"Monev Tengah Semester",
		"Monev Sebelum UAS",
		"Monev Setelah UAS",
	];

	if (open) {
		color = "primary";
	}

	return (
		<Col md={6}>
			<div className={`card card-${color}`}>
				<div className="card-header">
					<h4 className={`text-${color}`}>{name}</h4>
					<div className="card-header-action">
						<a href={link} className={`btn btn-${color}`}>
							Lihat
						</a>
					</div>
				</div>
				<div className="card-body">
					{head ? (
						<div>
							<span>Status : </span>
							<strong>{statusName[status]}</strong>
						</div>
					) : (
						<div>
							<span>Waktu Pelaksanaan : </span>
							<strong>{status}</strong>
						</div>
					)}
				</div>
			</div>
		</Col>
	);
};
