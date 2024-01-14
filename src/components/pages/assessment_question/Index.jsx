import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import useLoading from "../../hooks/useLoading";
import { Dropdown, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { fetchData } from "../../../services/api";
import { CreateAssessmentQuestion } from "./Create";
import { EditAssessmentQuestion } from "./Edit";
import { DeleteAssessmentQuestion } from "./Delete";

export default function AssessmentQuestion() {
	const { isLoading } = useLoading();
	const [values, setValues] = useState(null);

	const loadHandler = async () => {
		try {
			const res = await fetchData("assessments/question");
			setValues(res.data.rows);
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		loadHandler();
	}, [isLoading]);



	return (
		<>
			<DashboardLayout header={"Pertanyaan"}>
				<CreateAssessmentQuestion/>
				<Table>
					<thead>
						<tr>
							<th>No</th>
							<th>Tipe</th>
							<th>Pertanyaan</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						{values &&
							values.map((item, idx) => (
								<tr key={idx}>
									<td>{idx + 1}</td>
									<td>{item.type.type}</td>
									<td>{item.question}</td>
									<td>
										<Dropdown>
											<Dropdown.Toggle
												className="btn-sm"
												variant="danger"
												id="dropdown-basic"
											>
												Pilih
											</Dropdown.Toggle>

											<Dropdown.Menu>
												<EditAssessmentQuestion
													uuid={item.uuid}
												/>
												<DeleteAssessmentQuestion
													uuid={item.uuid}
												/>
											</Dropdown.Menu>
										</Dropdown>
									</td>
								</tr>
							))}
					</tbody>
				</Table>
			</DashboardLayout>
		</>
	);
}
