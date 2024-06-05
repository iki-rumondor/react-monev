import React from "react";

export const StislaInput = ({
	type = "text",
	placeholder,
	end,
	name,
	value,
	onChange,
}) => {
	return (
		<>
			<div className="input-group">
				<input
					type={type}
					className="form-control"
					placeholder={placeholder}
					name={name}
					value={value}
					onChange={onChange}
				/>
				<div className="input-group-append">
					<div className="input-group-text">{end}</div>
				</div>
			</div>
		</>
	);
};
