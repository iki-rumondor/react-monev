import React from "react";
import Sidebar from "../Sidebar";

export const ProdiLinks = () => {
	return (
		<>
			<Sidebar.HeaderLink>Master</Sidebar.HeaderLink>
			<Sidebar.Link path={"/subjects"} icon={"fa-user"}>
				Mata Kuliah
			</Sidebar.Link>
		</>
	);
};
