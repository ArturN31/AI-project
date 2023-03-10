import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Navigation = () => {
    return (
        <>
            <Navbar bg='dark' variant='dark'>
                <Container>
                    <Nav className='mx-auto' >
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
                </Container>
            </Navbar>

            <Outlet/>
        </>
    );
};

export default Navigation;