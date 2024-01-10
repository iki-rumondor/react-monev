import React from 'react'
import MessagesDropdown from '../module/dropdown/Messages'
import NotificationDropdown from '../module/dropdown/Notification'
import ProfileDropdown from '../module/dropdown/Profile'

export default function Navbar() {
  return (
    <div className='main-wrapper'>
        <div className="navbar-bg"></div>
        <nav className="navbar navbar-expand-lg main-navbar">
        <form className="form-inline mr-auto">
          <ul className="navbar-nav mr-3">
            <li><a href="#" data-toggle="sidebar" className="nav-link nav-link-lg"><i className="fas fa-bars"></i></a></li>
            <li><a href="#" data-toggle="search" className="nav-link nav-link-lg d-sm-none"><i className="fas fa-search"></i></a></li>
          </ul>
        </form>
        <ul className="navbar-nav navbar-right">
          <MessagesDropdown>
            <MessagesDropdown.List name='Ilham'></MessagesDropdown.List>
          </MessagesDropdown>
          <NotificationDropdown>
            <NotificationDropdown.List>Contoh</NotificationDropdown.List>
          </NotificationDropdown>
          <ProfileDropdown>
            <ProfileDropdown.Link>Profile</ProfileDropdown.Link>
          </ProfileDropdown>
        </ul>
      </nav>
    </div>
  )
}
