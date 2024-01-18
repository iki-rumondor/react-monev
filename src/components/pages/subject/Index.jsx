import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import useLoading from "../../hooks/useLoading";
import { Dropdown, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { fetchData } from "../../../services/api";
import { getUserUuid } from "../../../services/utils";
import CreateSubject from "./Create";
import EditSubject from "./Edit";
import DeleteSubject from "./Delete";

export default function Subject() {
	const { isLoading } = useLoading();
	const [values, setValues] = useState(null);
	const uuid = getUserUuid()

	const loadHandler = async () => {
		try {
			const res = await fetchData("subjects/prodi/" + uuid);
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
			<DashboardLayout header={"Mata Kuliah"}>
				<CreateSubject />
				<Table>
					<thead>
						<tr>
							<th>No</th>
							<th>Kode</th>
							<th>Mata Kuliah</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						{values &&
							values.map((item, idx) => (
								<tr key={idx}>
									<td>{idx + 1}</td>
									<td>{item.code}</td>
									<td>{item.name}</td>
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
												<EditSubject
													uuid={item.uuid}
												/>
												<DeleteSubject
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