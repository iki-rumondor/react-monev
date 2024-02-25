import React from "react";
import { Col } from "react-bootstrap";

export const YearCard = ({ name, link, status }) => {
	let color = "secondary";
	let statusName = "Ditutup";
	if (status) {
		color = "primary";
		statusName = "Dibuka";
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
					<div>
						Status: <strong>{statusName}</strong>
					</div>
				</div>
			</div>
		</Col>
	);
};
