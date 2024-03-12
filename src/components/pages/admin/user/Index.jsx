import React, { useEffect, useState } from "react";
import { Dropdown, Table } from "react-bootstrap";
import DashboardLayout from "../../DashboardLayout";
import toast from "react-hot-toast";
import useLoading from "../../../hooks/useLoading";
import { fetchAPI } from "../../../utils/Fetching";
import Create from "./Create";
import { DeleteModal } from "../../../layout/modals/DeleteModal";

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
				<Create />
				<Table>
					<thead>
						<tr>
							<th>Username</th>
							<th>Role</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						{values &&
							values.map((item, idx) => {
								if (item.role == "ADMIN") {
									return;
								}
								return (
									<tr key={idx}>
										<td>{item.username}</td>
										<td>{item.role}</td>
										<td>
											<DeleteModal
												endpoint={`/api/users/${item.uuid}`}
											/>
										</td>
									</tr>
								);
							})}
					</tbody>
				</Table>
			</DashboardLayout>
		</>
	);
}
