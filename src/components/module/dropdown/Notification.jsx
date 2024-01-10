import classNames from "classnames";
import React from "react";
import { sprintf } from "sprintf-js";

export default function NotificationDropdown({children}) {
  return (
    <div>
      <li className="dropdown dropdown-list-toggle">
        <a
          href="#"
          data-toggle="dropdown"
          className="nav-link notification-toggle nav-link-lg beep"
        >
          <i className="far fa-bell"></i>
        </a>
        <div className="dropdown-menu dropdown-list dropdown-menu-right">
          <div className="dropdown-header">
            Notifications
            <div className="float-right">
              <a href="#">Mark All As Read</a>
            </div>
          </div>
          {children}
          <div className="dropdown-footer text-center">
            <a href="#">
              View All <i className="fas fa-chevron-right"></i>
            </a>
          </div>
        </div>
      </li>
    </div>
  );
}

const list = ({children, time="Now", icon="fa-code", color="primary", href="#"}) => {
  return (
    <div className="dropdown-list-content dropdown-list-icons">
      <a href={href} className="dropdown-item dropdown-item-unread">
        <div className={sprintf("dropdown-item-icon bg-%s text-white", color)}>
          <i className={classNames("fas", icon)}></i>
        </div>
        <div className="dropdown-item-desc">
          {children}
          <div className="time">{time}</div>
        </div>
      </a>
    </div>
  );
};

NotificationDropdown.List = list
