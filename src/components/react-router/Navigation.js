import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import logo from './logo.svg';

const Navigation = () => {
    return (
        <>
            <Navbar expand="lg">
                <Navbar.Brand>
                    <img 
                    src={logo} 
                    alt="React Bootstrap logo" 
                    className='mx-5'
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" className='mx-5'/>
                <Navbar.Collapse id="navbarScroll" className='justify-content-end'>
                    <Nav navbarScroll className='mx-5'>
                        <Nav.Item>
                            {/* Conditional class setting - sets active element */}
                            <NavLink to="/" className = {(navData) => (
                                navData.isActive 
                                ? "nav-link active-link" 
                                : 'nav-link'
                            )}>Home</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            {/* Conditional class setting - sets active element */}
                            <NavLink to="/TextAnalysis" className = {(navData) => (
                                navData.isActive 
                                ? "nav-link active-link" 
                                : 'nav-link'
                            )}>Text Analysis</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            {/* Conditional class setting - sets active element */}
                            <NavLink to="/NewsAnalysisTheme" className = {(navData) => (
                                navData.isActive 
                                ? "nav-link active-link" 
                                : 'nav-link'
                            )}>News Analysis by Theme</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            {/* Conditional class setting - sets active element */}
                            <NavLink to="/NewsAnalysisDate" className = {(navData) => (
                                navData.isActive 
                                ? "nav-link active-link" 
                                : 'nav-link'
                            )}>News Analysis by Date</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            {/* Conditional class setting - sets active element */}
                            <NavLink to="/Map" className = {(navData) => (
                                navData.isActive 
                                ? "nav-link active-link" 
                                : 'nav-link'
                            )}>Map</NavLink>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Outlet/>
        </>
    );
};

export default Navigation;