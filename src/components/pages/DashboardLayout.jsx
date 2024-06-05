import React, { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import { getUserRole } from "../../services/utils";
import { ProdiLinks } from "../layout/links/ProdiLinks";
import { AdminLinks } from "../layout/links/AdminLinks";
import { HeadLinks } from "../layout/links/HeadLinks";

export default function DashboardLayout({
	header,
	breadcumb = null,
	title,
	children,
}) {
	const [links, setLinks] = useState();
	const role = getUserRole();

	useEffect(() => {
		switch (role) {
			case "DEPARTMENT":
				setLinks(<ProdiLinks />)
				break;
			case "HEAD":
				setLinks(<HeadLinks />)
				break;
			default:
				setLinks(<AdminLinks />)
		}
	}, []);

	return (
		<>
			<Navbar />
			<Sidebar title={"Simpel"} subtitle={"SP"}>
				{links}
			</Sidebar>
			<div className="main-content">
				<section className="section">
					<div className="section-header">
						<h1>{header}</h1>
						{breadcumb && (
							<div className="section-header-breadcrumb">
								{breadcumb.map((item, idx) => (
									<div key={idx} className="breadcrumb-item">
										<a href={item.link}>{item.name}</a>
									</div>
								))}
								<div className="breadcrumb-item">{title}</div>
							</div>
						)}
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
