import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import useLoading from "../../hooks/useLoading";
import toast from "react-hot-toast";
import { fetchAPI } from "../../utils/Fetching";
import { Card, CardBody, Dropdown, Table } from "react-bootstrap";
import Create from "./Create";
import Edit from "./Edit";
import Delete from "./Delete";

export default function Skill() {
	const { setIsLoading, isSuccess } = useLoading();
	const [values, setValues] = useState(null);

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI("/api/teacher-skills");
			setValues(res.data);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleLoad();
	}, [isSuccess]);

	return (
		<>
			<DashboardLayout
				header={"Kesesuaian Mata Kuliah Dengan Kemampuan Dosen"}
			>
				<Create />
				<Card>
					<CardBody>
						<Table className="table-bordered">
							<thead>
								<tr>
									<th>No</th>
									<th>Nama Dosen</th>
									<th>Mata Kuliah</th>
									<th>Kemampuan</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody>
								{values &&
									values.map((item, idx) => (
										<tr key={idx}>
											<td>{idx + 1}</td>
											<td>{item.teacher.name}</td>
											<td>{item.subject.name}</td>
											<td>{item.skill}</td>
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
														<Edit
															uuid={item.uuid}
														/>
														<Delete
															uuid={item.uuid}
														/>
													</Dropdown.Menu>
												</Dropdown>
											</td>
										</tr>
									))}
							</tbody>
						</Table>
					</CardBody>
				</Card>
			</DashboardLayout>
		</>
	);
}
