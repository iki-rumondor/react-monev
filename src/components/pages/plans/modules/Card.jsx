import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { sprintf } from "sprintf-js";

export const ToolsCard = ({ data, totalSubjects }) => {

	return (
		<Col md={6}>
			<div className="card card-primary">
				<div className="card-header">
					<h4>{data.name}</h4>
					<div className="card-header-action">
						<Link to={sprintf("/rps/year/%s", data.uuid)} className="btn btn-primary">Lihat RPS</Link>
					</div>
				</div>
				<div className="card-body">
					<div>
						Dilengkapi: <strong className="fw-bold">{data.academic_plans.length}/{totalSubjects}</strong>
					</div>
				</div>
			</div>
		</Col>
	);
};
