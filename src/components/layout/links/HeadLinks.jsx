import React from "react";
import Sidebar from "../Sidebar";

export const HeadLinks = () => {
	return (
		<>
			<Sidebar.Link path={"/home/head"} icon={"fa-sticky-note"}>
				Dashboard
			</Sidebar.Link>
			<Sidebar.HeaderLink>Hasil Monitoring</Sidebar.HeaderLink>
			<Sidebar.Link path={"/monitoring"} icon={"fa-chart-bar"}>
				Grafik
			</Sidebar.Link>
			<Sidebar.Link path={"/monev/data"} icon={"fa-file"}>
				Laporan
			</Sidebar.Link>
		</>
	);
};
