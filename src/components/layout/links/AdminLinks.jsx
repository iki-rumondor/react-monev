import React from "react";
import Sidebar from "../Sidebar";

export const AdminLinks = () => {
	return (
		<>
			<Sidebar.Link path={"/home/admin"} icon={"fa-sticky-note"}>
				Dashboard
			</Sidebar.Link>
			{/* <Sidebar.Link path={"/users"} icon={"fa-user"}>
				Pengguna
			</Sidebar.Link> */}
			<Sidebar.HeaderLink>Master</Sidebar.HeaderLink>
			<Sidebar.Link path={"/majors"} icon={"fa-building"}>
				Jurusan
			</Sidebar.Link>
			<Sidebar.Link path={"/prodi"} icon={"fa-user"}>
				Program Studi
			</Sidebar.Link>
			<Sidebar.Link path={"/academic-years"} icon={"fa-calendar-alt"}>
				Tahun Ajaran
			</Sidebar.Link>
		</>
	);
};


