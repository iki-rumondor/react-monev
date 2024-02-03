import classNames from "classnames";
import React from "react";
import { sprintf } from "sprintf-js";

export const CardDashboard = ({
	title,
	value,
	icon = "fa-user",
	color = "primary",
}) => {
	return (
		<>
			<div className="col-xl-3 col-sm-6 col-12">
				<div className="card card-statistic-1">
					<div
						className={classNames(
							"card-icon",
							sprintf("bg-%s", color)
						)}
					>
						<i className={classNames("fas", icon)}></i>
					</div>
					<div className="card-wrap">
						<div className="card-header">
							<h4>{title}</h4>
						</div>
						<div className="card-body">{value}</div>
					</div>
				</div>
			</div>
		</>
	);
};
