import React, {useState, useEffect} from 'react'
import {FaBars} from 'react-icons/fa'
import { FaMapMarker } from 'react-icons/fa';
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink } from './NavbarElements';
import {IconContext} from 'react-icons/lib';
import {animateScroll as scroll} from 'react-scroll';

const Navbar = ({toggle}) => {
    const [scrollNav, setScrollNav] = useState(false);

    const changeNav = () => {
        if(window.scrollY >= 80){
            setScrollNav(true);
        } else {
            setScrollNav(false);
        }
    }
        useEffect(() => {
            window.addEventListener('scroll', changeNav)
        }, []);
    
    const toggleHome = () => {
        scroll.scrollToTop();
    }

    return (
        <>
        <IconContext.Provider value = {{ color: '#fff'}}>
            <Nav scrollNav={scrollNav}>
                <NavbarContainer>
                    <NavLogo to='/' onClick={toggleHome}> <FaMapMarker /> Track-n-Trace </NavLogo>
                        <MobileIcon onClick={toggle}>
                            <FaBars />
                        </MobileIcon>
                        <NavMenu>
                            <NavItem>
                                <NavLinks to='link1' smooth={true} duration={500} spy={true} exact='true' offset={-80}>Register</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to='link2' smooth={true} duration={500} spy={true} exact='true' offset={-80}>Safety</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to='link3' smooth={true} duration={500} spy={true} exact='true' offset={-80}>Goal</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to='link4'>Link4</NavLinks>
                            </NavItem>
                        </NavMenu>
                        <NavBtn>
                            <NavBtnLink to='/login'> Sign In </NavBtnLink>
                        </NavBtn>
                        
                </NavbarContainer>
            </Nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar;
