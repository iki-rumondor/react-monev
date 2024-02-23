import React from "react";
import { Card, CardBody, Table } from "react-bootstrap";

export const FirstMonevTable = ({ data }) => {
	return (
		<>
			<Table className="table-bordered">
				<thead>
					<tr>
						<th>No</th>
						<th>Program Studi</th>
						<th>Kehadiran Dosen</th>
						<th>Kehadiran Mahasiswa</th>
						<th>Kesesuaian RPS</th>
					</tr>
				</thead>
				<tbody>
					{data &&
						data.map((item, idx) => (
							<tr key={idx}>
								<td>{idx + 1}</td>
								<td>{item.department}</td>
								<td>{item.teacher_attendences}</td>
								<td>{item.student_attendences}</td>
								<td>{item.plans}</td>
							</tr>
						))}
				</tbody>
			</Table>
		</>
	);
};
