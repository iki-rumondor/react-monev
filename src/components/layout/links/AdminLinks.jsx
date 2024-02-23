import React from "react";
import Sidebar from "../Sidebar";

export const AdminLinks = () => {
	return (
		<>
		<Sidebar.HeaderLink>Admin</Sidebar.HeaderLink>
			<Sidebar.Link path={"/home"} icon={"fa-user"}>
				Dashboard
			</Sidebar.Link>
			<Sidebar.HeaderLink>Master</Sidebar.HeaderLink>
			<Sidebar.Link path={"/majors"} icon={"fa-user"}>
				Jurusan
			</Sidebar.Link>
			<Sidebar.Link path={"/prodi"} icon={"fa-user"}>
				Program Studi
			</Sidebar.Link>
			<Sidebar.Link path={"/academic-years"} icon={"fa-user"}>
				Tahun Ajaran
			</Sidebar.Link>
			<Sidebar.HeaderLink>Proses</Sidebar.HeaderLink>
			<Sidebar.Link path={"/monitoring"} icon={"fa-user"}>
				Monitoring
			</Sidebar.Link>
		</>
	);
};


