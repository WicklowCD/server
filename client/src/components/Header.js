import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
} from 'reactstrap';

import {authContext} from '../contexts/AuthContext';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
    const auth = useContext(authContext);
    const user = auth.auth;

    const logoutUser = () => {
        closeNavBar();
        auth.setUnauthStatus();
    };

    const closeNavBar = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <Navbar color='dark' dark expand='md'>
                <NavbarBrand tag={Link} to='/'>Wicklow Civil Defence</NavbarBrand>
                <NavbarToggler onClick={() => setIsOpen(!isOpen)}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className='ml-auto' navbar>
                        <Dropdown nav isOpen={searchDropdownOpen}
                                  toggle={() => setSearchDropdownOpen(!searchDropdownOpen)}>
                            <DropdownToggle nav caret>
                                Search
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem tag={Link} to='/searches' onClick={closeNavBar}>View
                                    Searches</DropdownItem>
                                {user.role === 'Admin' && (
                                    <DropdownItem tag={Link} to='/searches/new' onClick={closeNavBar}>Start New
                                        Search</DropdownItem>
                                )}
                            </DropdownMenu>
                        </Dropdown>
                        {user.role === 'Admin' && (
                            <>
                                <NavItem>
                                    <NavLink tag={Link} to='/users' onClick={closeNavBar}>
                                        Users
                                    </NavLink>
                                </NavItem>
                            </>
                        )}
                        <NavItem>
                            <NavLink tag={Link} to='/logout' onClick={logoutUser}>Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default Header;
