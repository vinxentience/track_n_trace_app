import React from 'react'
import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute } from './SidebarElements'

const Sidebar = ({isOpen, toggle}) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}> 
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="link1" smooth={true} duration={500} spy={true} exact='true' offset={-80} onClick={toggle}>
                        Register
                    </SidebarLink>
                    <SidebarLink to="link2" smooth={true} duration={500} spy={true} exact='true' offset={-80} onClick={toggle}>
                        Safety
                    </SidebarLink>
                    <SidebarLink to="link3" smooth={true} duration={500} spy={true} exact='true' offset={-80} onClick={toggle}>
                        Our Goal
                    </SidebarLink>
                    <SidebarLink to="link4" smooth={true} duration={500} spy={true} exact='true' offset={-80} onClick={toggle}>
                        Sign Up
                    </SidebarLink>
                </SidebarMenu>
                <SideBtnWrap>
                    <SidebarRoute to='/login'>
                        Sign In
                    </SidebarRoute>
                </SideBtnWrap>
            </SidebarWrapper>
        </SidebarContainer>
            
    )
}

export default Sidebar
