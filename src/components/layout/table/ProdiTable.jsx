import React, { useEffect, useState } from "react";
import DefaultTable from "../../module/table/DefaultTable";
import { fetchData } from "../../../services/api";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";
import EditProdi from "../../pages/prodi/EditProdi";
import DeleteProdi from "../../pages/prodi/DeleteProdi";
import { Dropdown } from "react-bootstrap";

export default function ProdiTable() {
	const { isLoading } = useLoading();
	const [prodi, setProdi] = useState(null);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const res = await fetchData("departments");
				setProdi(res.data);
			} catch (error) {
				toast.error(error.message);
			}
		};

		fetchUserData();
	}, [isLoading]);

	return (
		<>
			<DefaultTable>
				<DefaultTable.Thead>
					<DefaultTable.Tr>
						<DefaultTable.Th>No</DefaultTable.Th>
						<DefaultTable.Th>Nama</DefaultTable.Th>
						<DefaultTable.Th>Koordinator Program Studi</DefaultTable.Th>
						<DefaultTable.Th>Jurusan</DefaultTable.Th>
						<DefaultTable.Th>Username</DefaultTable.Th>
						<DefaultTable.Th>Aksi</DefaultTable.Th>
					</DefaultTable.Tr>
				</DefaultTable.Thead>
				<DefaultTable.Tbody>
					{prodi &&
						prodi.map((item, idx) => (
							<DefaultTable.Tr key={idx}>
								<DefaultTable.Td>{idx + 1}</DefaultTable.Td>
								<DefaultTable.Td>{item.name}</DefaultTable.Td>
								<DefaultTable.Td>
									{item.head}
								</DefaultTable.Td>
								<DefaultTable.Td>
									{item.major.name}
								</DefaultTable.Td>
								<DefaultTable.Td>
									{item.user.username}
								</DefaultTable.Td>
								<DefaultTable.Td>
									<Dropdown>
										<Dropdown.Toggle
											className="btn-sm"
											variant="danger"
											id="dropdown-basic"
										>
											Pilih
										</Dropdown.Toggle>

										<Dropdown.Menu>
											<EditProdi uuid={item.uuid} />
											<DeleteProdi uuid={item.uuid} />
										</Dropdown.Menu>
									</Dropdown>
								</DefaultTable.Td>
							</DefaultTable.Tr>
						))}
				</DefaultTable.Tbody>
			</DefaultTable>
		</>
	);
}
