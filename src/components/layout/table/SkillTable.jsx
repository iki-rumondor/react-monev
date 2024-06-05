import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import useLoading from "../../hooks/useLoading";
import toast from "react-hot-toast";
import { fetchAPI, fetchPdf } from "../../utils/Fetching";

export const SkillTable = ({ departmentID, yearID }) => {
	const { setIsLoading } = useLoading();
	const [values, setValues] = useState(null);
	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI(
				`/api/teacher-skills/departments/${departmentID}/years/${yearID}`
			);
			setValues(res.data);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handlePrint = async () => {
		try {
			setIsLoading(true);
			const res = await fetchPdf(
				`/api/report/skills/departments/${departmentID}/years/${yearID}`
			);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleLoad();
	}, []);

	return (
		<>
			{values && (
				<Button className="mb-3" onClick={handlePrint}>
					<i className="fas fa-print"></i>{" "}
					<span className="ml-2">Cetak</span>
				</Button>
			)}
			<Table className="table-bordered">
				<thead>
					<tr>
						<th>No</th>
						<th>Nama Dosen</th>
						<th>Mata Kuliah</th>
						<th>Kemampuan</th>
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
							</tr>
						))}
				</tbody>
			</Table>
		</>
	);
};
