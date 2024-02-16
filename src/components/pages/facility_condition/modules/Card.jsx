import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { sprintf } from "sprintf-js";

export const AcademicCard = ({ data }) => {

	return (
		<Col md={6}>
			<div className="card card-primary">
				<div className="card-header">
					<h4>{data.name}</h4>
					<div className="card-header-action">
						<a href={sprintf("/facility-conditions/years/%s", data.uuid)} className="btn btn-primary">Lihat</a>
					</div>
				</div>
				<div className="card-body">
					<div>
						Dilengkapi: <strong></strong>
					</div>
				</div>
			</div>
		</Col>
	);
};
