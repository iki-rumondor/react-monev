import React from "react";
import { Dropdown } from "react-bootstrap";
import Create from "../Create";
import Edit from "../Edit";
import Detail from "../Detail";

export const Actions = ({ item, status, academic_year_uuid, open }) => {
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
						{open && <Edit uuid={item.practical_tool.uuid} />}
						<Detail uuid={item.practical_tool.uuid} />
					</>
				) : (
					open && (
						<Create
							subject_uuid={item.uuid}
							academic_year_uuid={academic_year_uuid}
						/>
					)
				)}
			</Dropdown.Menu>
		</Dropdown>
	);
};
