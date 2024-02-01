import React from "react";
import Sidebar from "../Sidebar";

export const AdminLinks = () => {
	return (
		<>
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
		</>
	);
};


