import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark border-bottom box-shadow">
                    <div className="container">
                        <a className="navbar-brand">KriahTracker</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                            <ul className="navbar-nav flex-grow-1">
                                <li className="nav-item"><Link to="/" className='nav-link text-light'>Home</Link></li>
                            </ul>
                            <ul className="navbar-nav flex-grow-1">
                                <li className="nav-item"><Link to="/viewstudenthistory" className='nav-link text-light'>Students History</Link></li>
                            </ul>
                            <ul className="navbar-nav flex-grow-1">
                                <li className="nav-item"><Link to="/studentmarking" className='nav-link text-light'>Add Marks</Link></li>
                            </ul>
                            <ul className="navbar-nav flex-grow-1">
                                <li className="nav-item"><Link to="/upload" className='nav-link text-light'>Upload Students</Link></li>
                            </ul>
                            <ul className="navbar-nav flex-grow-1">
                                <li className="nav-item"><Link to="/addstudent" className='nav-link text-light'>Add Student Manually</Link></li>
                            </ul>
                            <ul className="navbar-nav flex-grow-1">
                                <li className="nav-item"><Link to="/updateyear" className='nav-link text-light'>Update Year</Link></li>
                            </ul>
                            <ul className="navbar-nav flex-grow-1">
                                <li className="nav-item"><Link to="/signout" className='nav-link text-light'>Sign Out</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="container mt-5">
                {children}
            </div>
        </div>
    )
}

export default Layout;