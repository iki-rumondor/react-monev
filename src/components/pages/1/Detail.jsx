import React from "react";
import DashboardLayout from "../DashboardLayout";
import { Form, useParams } from "react-router-dom";
import { Card, Table } from "react-bootstrap";

export const DetailResponse = () => {
	const { assessmentId } = useParams();
	console.log(assessmentId);

	return (
		<>
			<DashboardLayout header={assessmentId}>
				<Card>
					<Table>
						<thead>
							<tr>
								<th>No</th>
								<th>Pertanyaan</th>
								<th>Response</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>Pertanyaan</td>
								<td>
									<div key={"inline-radio"}>
										<Form.Check
											inline
											label="1"
											type="radio"
										/>
										<Form.Check
											inline
											label="2"
											type="radio"
										/>
									</div>
								</td>
							</tr>
							{/* {values &&
							values.map((item, idx) => (
								<tr key={idx}>
									<td>{idx + 1}</td>
									<td>{item.type}</td>
								</tr>
							))} */}
						</tbody>
					</Table>
				</Card>
			</DashboardLayout>
		</>
	);
};
