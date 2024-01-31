import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import useLoading from "../../hooks/useLoading";
import { Button, Card, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { fetchData, postData } from "../../../services/api";
import { getUserUuid } from "../../../services/utils";
import { sprintf } from "sprintf-js";

export default function Rps() {
	const { isLoading, setIsLoading } = useLoading();
	const [subjects, setSubjects] = useState(null);
	const uuid = getUserUuid();

	const loadHandler = async () => {
		try {
			const res = await fetchData(sprintf("subjects/prodi/%s", uuid));
			setSubjects(res.data);
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		loadHandler();
	}, [isLoading]);

	const selectHandler = async (uuid, rps) => {
		const data = {
			rps: rps,
		};

		try {
			setIsLoading(true);
			const res = await postData(`subjects/${uuid}/rps`, "PATCH", data);
			toast.success(res.message);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<DashboardLayout header={"Ketersediaan RPS"}>
				<Card>
					<Table>
						<thead>
							<tr>
								<th>No</th>
								<th>Mata Kuliah</th>
								<th>Status</th>
								<th>Aksi</th>
							</tr>
						</thead>
						<tbody>
							{subjects &&
								subjects.map((item, idx) => (
									<tr key={idx}>
										<td>{idx + 1}</td>
										<td>{item.name}</td>
										{item.rps ? (
											<>
												<td>
													<small className="badge badge-success">
														Ada
													</small>
												</td>
												<td>
													<Button
														className="btn-sm btn-icon"
														variant="danger"
														onClick={() =>
															selectHandler(
																item.uuid,
																false
															)
														}
													>
														<i className="fas fa-times"></i>
													</Button>
												</td>
											</>
										) : (
											<>
												<td>
													<small className="badge badge-danger">
														Tidak Ada
													</small>
												</td>
												<td>
													<Button
														className="btn-sm btn-icon"
														variant="success"
														onClick={() =>
															selectHandler(
																item.uuid,
																true
															)
														}
													>
														<i className="fas fa-check"></i>
													</Button>
												</td>
											</>
										)}
									</tr>
								))}
						</tbody>
					</Table>
				</Card>
			</DashboardLayout>
		</>
	);
}
