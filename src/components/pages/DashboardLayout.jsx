import React, { useState } from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import { getUserRole } from "../../services/utils";
import { ProdiLinks } from "../layout/links/ProdiLinks";
import { AdminLinks } from "../layout/links/AdminLinks";

export default function DashboardLayout({ header, children }) {
	const role = getUserRole();

	return (
		<>
			<Navbar />
			<Sidebar title={"i-Monev"} subtitle={"iM"}>
				{role == "DEPARTMENT" ? <ProdiLinks /> : <AdminLinks />}
			</Sidebar>
			<div className="main-content">
				<section className="section">
					<div className="section-header">
						<h1>{header}</h1>
					</div>
					<div className="section-body">{children}</div>
				</section>
			</div>
			<footer className="main-footer">
				<div className="footer-left">
					Copyright &copy; 2024 <div className="bullet"></div> Ilham
					Dwiki Putra Rumondor
				</div>
				<div className="footer-right">V1.0</div>
			</footer>
		</>
	);
}
