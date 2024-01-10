import React from "react";
import classNames from "classnames";
import { sprintf } from "sprintf-js";

export default function MessagesDropdown({ children, beep = true }) {
  return (
    <div>
      <li className="dropdown dropdown-list-toggle">
        <a
          href="#"
          data-toggle="dropdown"
          className={classNames(
            "nav-link nav-link-lg message-toggle",
            beep && "beep"
          )}
        >
          <i className="far fa-envelope"></i>
        </a>
        <div className="dropdown-menu dropdown-list dropdown-menu-right">
          <div className="dropdown-header">
            Messages
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

const Header = () => {
  return <></>;
};

const Footer = () => {
  return <></>;
};

const List = ({
  name = "Name",
  message = "Message",
  time = "Time",
  img = "avatar-1.png",
}) => {
  return (
    <div className="dropdown-list-content dropdown-list-message">
      <a href="#" className="dropdown-item dropdown-item-unread">
        <div className="dropdown-item-avatar">
          <img
            alt="image"
            src={sprintf("src/assets/img/avatar/%s", img)}
            className="rounded-circle"
          />
          <div className="is-online"></div>
        </div>
        <div className="dropdown-item-desc">
          <b>{name}</b>
          <p>{message}</p>
          <div className="time">{time}</div>
        </div>
      </a>
    </div>
  );
};

MessagesDropdown.Header = Header;
MessagesDropdown.List = List;
MessagesDropdown.Footer = Footer;
