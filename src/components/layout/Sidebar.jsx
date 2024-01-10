import classNames from "classnames";
import React from "react";

export default function Sidebar({ children, title, subtitle }) {
  return (
    <div className="main-sidebar sidebar-style-2">
      <aside id="sidebar-wrapper">
        <div className="sidebar-brand">
          <a href="index.html">{title}</a>
        </div>
        <div className="sidebar-brand sidebar-brand-sm">
          <a href="index.html">{subtitle}</a>
        </div>
        <ul className="sidebar-menu">{children}</ul>
      </aside>
    </div>
  );
}

const header = ({ children }) => {
  return <li className="menu-header">{children}</li>;
};

const link = ({ children, icon, href, active = false }) => {
  return (
    <li className={active ? "active" : ""}>
      <a className="nav-link" href={href}>
        <i className={classNames("far", icon)}></i> <span>{children}</span>
      </a>
    </li>
  );
};

const dropdown = ({ children, name, icon }) => {
  return (
    <li className="nav-item dropdown">
      <a href="#" className="nav-link has-dropdown">
        <i className={classNames("fas", icon)}></i>
        <span>{name}</span>
      </a>
      <ul className="dropdown-menu">{children}</ul>
    </li>
  );
};

const dropdownItem = ({ href, children }) => {
  return (
    <li>
      <a className="nav-link" href={href}>
        {children}
      </a>
    </li>
  );
};

Sidebar.HeaderLink = header;
Sidebar.Link = link;
Sidebar.LinkDropdown = dropdown;
Sidebar.LinkDropdown.Item = dropdownItem;
