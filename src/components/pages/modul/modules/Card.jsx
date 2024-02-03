import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { sprintf } from "sprintf-js";

export const ModulCard = ({ data, totalSubjects }) => {
	return (
		<Col md={6}>
			<div className="card card-primary">
				<div className="card-header">
					<h4>{data.name}</h4>
					<div className="card-header-action">
						<Link to={sprintf("/modules/year/%s", data.uuid)} className="btn btn-primary">Lihat</Link>
					</div>
				</div>
				<div className="card-body">
					<div>
						Dilengkapi: <strong className="fw-bold">{data.practical_modules?.length ?? 0}/{totalSubjects}</strong>
					</div>
				</div>
			</div>
		</Col>
	);
};
