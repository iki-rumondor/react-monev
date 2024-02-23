import React from "react";
import { Card, CardBody, Table } from "react-bootstrap";

export const FirstMonevTable = ({data}) => {
	return (
		<>
			<Card>
				<CardBody>
					<Table className="table-bordered">
						<thead>
							<tr>
								<th>No</th>
								<th>Program Studi</th>
								<th>RPS</th>
								<th>Modul Praktikum</th>
								<th>Alat Praktikum</th>
								<th>Kemampuan Dosen</th>
								<th>Fasilitas</th>
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
				</CardBody>
			</Card>
		</>
	);
};
