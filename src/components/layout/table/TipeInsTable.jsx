import React, { useEffect, useState } from "react";
import DefaultTable from "../../module/table/DefaultTable";
import { getAllProdi } from "../../../services/api/prodi/prodiApi";

export default function TipeInsTable() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const res = await getAllProdi();
				setData(res.data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchUserData();
	}, []);

	return (
		<>
			<DefaultTable>
				<DefaultTable.Thead>
					<DefaultTable.Tr>
						<DefaultTable.Th>No</DefaultTable.Th>
						<DefaultTable.Th>Nama</DefaultTable.Th>
					</DefaultTable.Tr>
				</DefaultTable.Thead>
				<DefaultTable.Tbody>

					{data.length > 0 && data.map((item, idx) => (
						<DefaultTable.Tr key={idx}>
							<DefaultTable.Td>{idx + 1}</DefaultTable.Td>
							<DefaultTable.Td>{item.name}</DefaultTable.Td>
						</DefaultTable.Tr>
					))}
				</DefaultTable.Tbody>
			</DefaultTable>
		</>
	);
}
