import React, { useEffect, useState } from "react";
import DefaultTable from "../../module/table/DefaultTable";
import { getAllProdi } from "../../../services/api/prodi/prodiApi";

export default function ProdiTable() {
	const [prodi, setProdi] = useState([]);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const res = await getAllProdi();
				setProdi(res.data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchUserData();
	}, [prodi]);

	return (
		<>
			<DefaultTable>
				<DefaultTable.Thead>
					<DefaultTable.Tr>
						<DefaultTable.Th>No</DefaultTable.Th>
						<DefaultTable.Th>Nama</DefaultTable.Th>
						<DefaultTable.Th>Kepala Program Studi</DefaultTable.Th>
						<DefaultTable.Th>Jurusan</DefaultTable.Th>
					</DefaultTable.Tr>
				</DefaultTable.Thead>
				<DefaultTable.Tbody>

					{prodi.length > 0 && prodi.map((item, idx) => (
						<DefaultTable.Tr key={idx}>
							<DefaultTable.Td>{idx + 1}</DefaultTable.Td>
							<DefaultTable.Td>{item.nama}</DefaultTable.Td>
							<DefaultTable.Td>{item.kaprodi}</DefaultTable.Td>
							<DefaultTable.Td>{item.jurusan}</DefaultTable.Td>
						</DefaultTable.Tr>
					))}
				</DefaultTable.Tbody>
			</DefaultTable>
		</>
	);
}
