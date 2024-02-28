import React, { useEffect, useState } from "react";
import { Dropdown, Table } from "react-bootstrap";
import DashboardLayout from "../../DashboardLayout";
import toast from "react-hot-toast";
import useLoading from "../../../hooks/useLoading";

export default function User() {
	const { isSuccess, setIsLoading } = useLoading();
	const [values, setValues] = useState();

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI(`/api/users`);
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
			<DashboardLayout header={"Manajemen User"}>
				<Table>
					<thead>
						<tr>
							<th>No</th>
							<th>Username</th>
							<th>Role</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						{values &&
							values.map((item, idx) => (
								<tr key={idx}>
									<td>{idx + 1}</td>
									<td>{item.username}</td>
									<td>{item.role.name}</td>
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
												<Open
													uuid={item.uuid}
													value={item.open}
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
