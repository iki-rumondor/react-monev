import React from "react";
import Sidebar from "../Sidebar";

export const ProdiLinks = () => {
	return (
		<>
			<Sidebar.HeaderLink>Master</Sidebar.HeaderLink>
			<Sidebar.Link path={"/subjects"} icon={"fa-user"}>
				Mata Kuliah
			</Sidebar.Link>
			<Sidebar.HeaderLink>Monev</Sidebar.HeaderLink>
			<Sidebar.Link path={"/rps"} icon={"fa-user"}>
				Ketersediaan RPS
			</Sidebar.Link>
		</>
	);
};
