import React, { useEffect, useState } from "react";
import DefaultModal from "../../module/modal";
import { DefaultButton } from "../../units/Button";
import { SelectInput, TextInput } from "../../units/Form";
import { fetchData, postData } from "../../../services/api/api";

export function AddProdiModal({ idModal }) {
	const [jurusan, setJurusan] = useState([]);

	const handleEffect = async () => {
		try {
			const res = await fetchData("jurusan");
			setJurusan(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		handleEffect();
	}, []);

	const [formData, setFormData] = useState({
		nama: "",
		kaprodi: "",
		jurusan: "",
	});

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[id]: value,
		}));
	};

	const handlePost = async (e) => {
		e.preventDefault();
		// validation
		try {
			const res = await postData("prodi", formData)
			console.log(res);
		} catch (error) {
			console.log(error);
		}finally{

		}
	};

	return (
		<>
			<DefaultModal id={idModal}>
				<DefaultModal.Header title="Tambah Data Program Studi" />
				<form action="#">
					<DefaultModal.Body>
						<TextInput
							id={"nama"}
							label={"Nama Program Studi"}
							placeholder={"Masukkan Nama Prodi"}
							value={formData.nama}
							onChange={handleInputChange}
						/>
						<TextInput
							id={"kaprodi"}
							label={"Nama Ketua Program Studi"}
							placeholder={"Masukkan Nama Kaprodi"}
							value={formData.kaprodi}
							onChange={handleInputChange}
						/>
						<SelectInput
							id={"jurusan"}
							label={"Pilih Jurusan"}
							value={formData.jurusan}
							onChange={handleInputChange}
						>
							<option value="" disabled>Pilih Jurusan</option>
							{jurusan.length > 0 &&
								jurusan.map((item, idx) => (
									<option key={idx} value={item.id}>
										{item.nama}
									</option>
								))}
						</SelectInput>
					</DefaultModal.Body>
					<DefaultModal.Footer>
						<DefaultButton type="submit" onClick={handlePost}>
							Tambah Prodi
						</DefaultButton>
					</DefaultModal.Footer>
				</form>
			</DefaultModal>
		</>
	);
}
