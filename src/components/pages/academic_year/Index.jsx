import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import useLoading from "../../hooks/useLoading";
import { Dropdown, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { fetchData } from "../../../services/api";
import Create from "./Create";
import Delete from "./Delete";
import Edit from "./Edit";
import Open from "./Open";

export default function AcademicYear() {
	const { isLoading } = useLoading();
	const [values, setValues] = useState(null);

	const loadHandler = async () => {
		try {
			const res = await fetchData("academic-years");
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
			<DashboardLayout header={"Tahun Ajaran"}>
				<Create />
				<Table>
					<thead>
						<tr>
							<th>No</th>
							<th>Semester</th>
							<th>Tahun</th>
							<th>Status</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						{values &&
							values.map((item, idx) => (
								<tr key={idx}>
									<td>{idx + 1}</td>
									<td>{item.semester}</td>
									<td>{item.year}</td>
									<td>
										{item.open ? (
											<span className="badge badge-success">Terbuka</span>
										) : (
											<span className="badge badge-danger">Tertutup</span>
										)}
									</td>
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
												<Edit uuid={item.uuid} />
												<Delete uuid={item.uuid} />
												<Open uuid={item.uuid} value={item.open} />
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
