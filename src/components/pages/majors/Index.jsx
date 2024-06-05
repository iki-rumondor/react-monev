import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import useLoading from "../../hooks/useLoading";
import { Dropdown, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { fetchData } from "../../../services/api";
import { CreateMajor } from "./Create";
import { EditMajor } from "./Edit";
import { DeleteMajor } from "./Delete";

export default function Major() {
	const { isLoading } = useLoading();
	const [values, setValues] = useState(null);

	const loadHandler = async () => {
		try {
			const res = await fetchData("majors");
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
			<DashboardLayout header={"Jurusan"}>
				<CreateMajor />
				<Table>
					<thead>
						<tr>
							<th>No</th>
							<th>Nama Jurusan</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						{values &&
							values.map((item, idx) => (
								<tr key={idx}>
									<td>{idx + 1}</td>
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
												<EditMajor
													uuid={item.uuid}
												/>
												<DeleteMajor
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
