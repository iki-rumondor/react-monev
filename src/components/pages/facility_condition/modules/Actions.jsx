import React from "react";
import { Dropdown } from "react-bootstrap";
import Create from "../Create";
import Edit from "../Edit";
import Detail from "../Detail";

export const Actions = ({ item, status, academic_year_uuid }) => {
	return (
		<Dropdown>
			<Dropdown.Toggle
				className="btn-sm"
				variant="danger"
				id="dropdown-basic"
			>
				Pilih
			</Dropdown.Toggle>

			<Dropdown.Menu>
				{status ? (
					<>
						<Edit
							uuid={item.academic_plan.uuid}
						/>
						<Detail uuid={item.academic_plan.uuid} />
					</>
				) : (
					<Create
						subject_uuid={item.uuid}
						academic_year_uuid={academic_year_uuid}
					/>
				)}
			</Dropdown.Menu>
		</Dropdown>
	);
};
