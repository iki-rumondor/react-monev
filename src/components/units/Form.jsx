import React from "react";

export function TextInput({ id, label, placeholder, value, onChange }) {
	return (
		<>
			<div className="form-group">
				<label htmlFor={id}>{label}</label>
				<input
					type="text"
					className="form-control"
					id={id}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					required
				/>
			</div>
		</>
	);
}

export function SelectInput({ id, label, children, value, onChange }) {
	return (
		<>
			<div className="form-group">
				<label htmlFor={id}>{label}</label>
				<select value={value} onChange={onChange} className="form-control" id={id}>
					{children}
				</select>
			</div>
		</>
	);
}

const option = ({value, children}) => {
	return(
		<option value={value}>{children}</option>
	)
}

SelectInput.Option = option
