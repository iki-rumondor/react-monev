import React from "react";

export const RadioInput = ({ id, name, label, onChange, checked = false }) => {
	return (
		<>
			<div className="form-check form-check-inline">
				{checked ? (
					<input
						className="form-check-input"
						type="radio"
						name={name}
						id={id}
						onChange={onChange}
						checked
					/>
				) : (
					<input
						className="form-check-input"
						type="radio"
						name={name}
						id={id}
						onChange={onChange}
					/>
				)}

				<label className="form-check-label" htmlFor={id}>
					{label}
				</label>
			</div>
		</>
	);
};
