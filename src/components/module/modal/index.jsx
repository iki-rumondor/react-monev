import React from "react";
import { sprintf } from "sprintf-js";

export default function DefaultModal({ id, children }) {
	return (
		<>
			<div
				className="modal fade"
				id={id}
				tabIndex="-1"
				aria-hidden="true"
				data-backdrop="static"
			>
				<div className="modal-dialog">
					<div className="modal-content">{children}</div>
				</div>
			</div>
		</>
	);
}

const header = ({ title }) => {
	return (
		<div className="modal-header">
			<h5 className="modal-title">
				{title}
			</h5>
			<button
				type="button"
				className="close"
				data-dismiss="modal"
				aria-label="Close"
			>
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
	);
};

const body = ({ children, type="button" }) => {
	return <div className="modal-body">{children}</div>;
};

const footer = ({ children }) => {
	return (
		<div className="modal-footer bg-whitesmoke">
			<button
				type="button"
				className="btn btn-secondary"
				data-bs-dismiss="modal"
			>
				Keluar
			</button>
			{children}
		</div>
	);
};

DefaultModal.Header = header;
DefaultModal.Body = body;
DefaultModal.Footer = footer;
