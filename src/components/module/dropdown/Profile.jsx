import classNames from "classnames";
import React from "react";

export default function ProfileDropdown({ children, username = "Ilham" }) {
	return (
		<div>
			<li className="dropdown">
				<a
					href="#"
					data-toggle="dropdown"
					className="nav-link dropdown-toggle nav-link-lg nav-link-user"
				>
					<img
						alt="image"
						src="src/assets/img/avatar/avatar-1.png"
						className="rounded-circle mr-1"
					/>
					<div className="d-sm-none d-lg-inline-block">
						{username}
					</div>
				</a>
				<div className="dropdown-menu dropdown-menu-right">
					<div className="dropdown-title">Logged in 5 min ago</div>
					{children}
					<div className="dropdown-divider"></div>
					<a
						href="/logout"
						className="dropdown-item has-icon text-danger"
					>
						<i className="fas fa-sign-out-alt"></i> Logout
					</a>
				</div>
			</li>
		</div>
	);
}

const link = ({ children, href = "#", icon = "fa-user" }) => {
	return (
		<>
			<a href={href} className="dropdown-item has-icon">
				<i className={classNames("far", icon)}></i> {children}
			</a>
		</>
	);
};

ProfileDropdown.Link = link;
