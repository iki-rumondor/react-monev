import React from "react";
import '../../assets/css/spinner.css'


export default function Loading() {
	return (
		<div className="container-spinner">

		<div className="spinner-container">
			<div className="spinner-border" role="status">
				<span className="sr-only">Loading...</span>
			</div>
		</div>
		</div>
	);
}
