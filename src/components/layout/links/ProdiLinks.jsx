import React from "react";
import Sidebar from "../Sidebar";

export const ProdiLinks = () => {
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
			<Sidebar.Link path={"/first-monev"} icon={"fa-user"}>
				Awal Semester
			</Sidebar.Link>
		</>
	);
};
