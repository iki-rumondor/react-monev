import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import toast from "react-hot-toast";
import { fetchAPI } from "../../utils/Fetching";
import useLoading from "../../hooks/useLoading";

export const ProdiLinks = () => {
	const { setIsLoading } = useLoading();
	const [step, setStep] = useState(null);
	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI(`/api/settings`);
			res.data.map((item) => {
				if (item.name == "step_monev") {
					setStep(item.value);
				}
			});
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
			<Sidebar.HeaderLink>Prodi</Sidebar.HeaderLink>
			<Sidebar.Link path={"/home"} icon={"fa-user"}>
				Dashboard
			</Sidebar.Link>
			<Sidebar.HeaderLink>Master</Sidebar.HeaderLink>
			<Sidebar.Link path={"/subjects"} icon={"fa-user"}>
				Mata Kuliah
			</Sidebar.Link>
			<Sidebar.Link path={"/lab"} icon={"fa-user"}>
				Laboratorium
			</Sidebar.Link>
			<Sidebar.Link path={"/fasilitas"} icon={"fa-user"}>
				Fasilitas
			</Sidebar.Link>
			<Sidebar.Link path={"/teachers"} icon={"fa-user"}>
				Dosen
			</Sidebar.Link>
			<Sidebar.HeaderLink>Monev</Sidebar.HeaderLink>
			{step == "1" && (
				<Sidebar.Link path={"/first-monev"} icon={"fa-user"}>
					Awal Semester
				</Sidebar.Link>
			)}
			{step == "2" && (
				<Sidebar.Link path={"/middle-monev"} icon={"fa-user"}>
					Tengah Semester
				</Sidebar.Link>
			)}
			{step == "3" && (
				<Sidebar.Link path={"/middle-last-monev"} icon={"fa-user"}>
					Akhir Sebelum UAS
				</Sidebar.Link>
			)}
			{step == "4" && (
				<Sidebar.Link path={"/last-monev"} icon={"fa-user"}>
					Akhir Setelah UAS
				</Sidebar.Link>
			)}
		</>
	);
};
