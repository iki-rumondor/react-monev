import classNames from "classnames";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { getUserRole } from "../../../../services/utils";

export const TopBar = () => {
	const loc = useLocation();
	const role = sessionStorage.getItem("token");
	const [show, setShow] = useState(false);
	const links = [
		{ name: "Home", href: "/" },
		{ name: "Tentang", href: "/#tentang" },
		{ name: "Grafik Ketersediaan RPS", href: "/#chart" },
	];
	return (
		<>
			<header id="header" className="d-flex align-items-center">
				<div className="d-flex justify-content-between w-100 container">
					<h1 className="logo">
						<a href="index.html">
							Simpel<span>.</span>
						</a>
					</h1>
					<div id="navbar" className="d-lg-block d-none">
						{links.map((item, idx) => (
							<a
								key={idx}
								href={item.href}
								className={classNames(
									`/${loc.hash}` == item.href &&
										"active-link",
									"mr-3 text-dark"
								)}
							>
								{item.name}
							</a>
						))}
						{role && (
							<a href="/logout" className={"mr-3 text-danger"}>
								Logout
							</a>
						)}
					</div>
					{/* {role && (
						<div className="dropdown d-none d-lg-block">
							<a
								href="#"
								data-toggle="dropdown"
								className="nav-link dropdown-toggle nav-link-lg nav-link-user"
							>
								<div className="d-sm-none d-lg-inline-block">
									{role}
								</div>
							</a>
							<div className="dropdown-menu dropdown-menu-right">
								<div className="dropdown-title">
									Logged in 5 min ago
								</div>
								<a href="/home" className="dropdown-item">
									Dashboard
								</a>
								<div className="dropdown-divider"></div>
								<a
									href="/logout"
									className="dropdown-item text-danger"
								>
									Logout
								</a>
							</div>
						</div>
					)} */}
					<i
						className="bi bi-list mobile-nav-toggle"
						onClick={() => setShow(true)}
					></i>
				</div>
			</header>
			<div className={classNames("sidenav", show && "side-active")}>
				<a class="closebtn" onClick={() => setShow(false)}>
					&times;
				</a>
				{/* {role && <a href="/home">Dashboard</a>} */}
				{links.map((item, idx) => (
					<a
						key={idx}
						href={item.href}
						className={`/${loc.hash}` == item.href && "active-link"}
					>
						{item.name}
					</a>
				))}
				{role && (
					<>
						<hr />
						<a href="/logout" className="text-danger">
							Logout
						</a>
					</>
				)}
			</div>
		</>
	);
};
