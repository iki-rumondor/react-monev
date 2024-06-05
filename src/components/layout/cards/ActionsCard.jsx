import classNames from "classnames";
import { useState } from "react";

export const ActionsCard = ({ children, dropdownName, data, chart, handleClick }) => {
	return (
		<div className="card">
			<div className="card-header">
				<div className="card-header-action">
					<div className="dropdown">
						<a
							href="#"
							className="dropdown-toggle btn btn-primary"
							data-toggle="dropdown"
							aria-expanded="false"
						>
							{dropdownName}
						</a>
						<div
							className="dropdown-menu dropdown-menu-right"
							x-placement="bottom-end"
						>
							{data &&
								data.map((item, idx) => (
									<a
										key={idx}
										href="#chart"
										className={classNames(
											"dropdown-item",
											item.uuid == chart && "active"
										)}
										onClick={() => {
											handleClick(item.uuid);
										}}
									>
										{item.name}
									</a>
								))}
						</div>
					</div>
				</div>
			</div>
			<div className="card-body">{children}</div>
		</div>
	);
};
