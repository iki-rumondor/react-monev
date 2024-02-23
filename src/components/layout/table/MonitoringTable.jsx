import React from "react";
import { Card, CardBody, Table } from "react-bootstrap";

export const MonitoringTable = ({ data }) => {
	return (
		<>
			<Table className="table-bordered">
				<thead>
					<tr>
						<th>No</th>
						<th>Program Studi</th>
						<th>Kegiatan Yang Dilakukan</th>
						<th>Waktu</th>
					</tr>
				</thead>
				<tbody>
					{data &&
						data.map((item, idx) => (
							<tr key={idx}>
								<td>{idx + 1}</td>
								<td>{item.department}</td>
								<td>{item.plans}</td>
								<td>{item.modules}</td>
								<td>{item.tools}</td>
								<td>{item.skills}</td>
								<td>{item.facilities}</td>
							</tr>
						))}
				</tbody>
			</Table>
		</>
	);
};
