import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import CreateProdi from "./Create";
import useLoading from "../../hooks/useLoading";
import { Dropdown, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { fetchData } from "../../../services/api";
import EditAssessmentType from "./Edit";
import DeleteAssessmentType from "./Delete";

export default function AssessmentType() {
	const { isLoading } = useLoading();
	const [values, setValues] = useState(null);

	const loadHandler = async () => {
		try {
			const res = await fetchData("assessments/type");
			setValues(res.data);
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		loadHandler();
	}, [isLoading]);

	return (
		<>
			<DashboardLayout header={"Tipe Penilaian"}>
				<CreateProdi />
				<Table>
					<thead>
						<tr>
							<th>No</th>
							<th>Tipe</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						{values &&
							values.map((item, idx) => (
								<tr key={idx}>
									<td>{idx + 1}</td>
									<td>{item.type}</td>
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
												<EditAssessmentType
													uuid={item.uuid}
												/>
												<DeleteAssessmentType
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
