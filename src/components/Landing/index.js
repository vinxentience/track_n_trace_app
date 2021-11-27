import React, {useState} from 'react'
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import InfoSection from './InfoSection';
import { homeObjOne, homeObjTwo, homeObjThree} from './InfoSection/Data';
import HomeCard from './HomeCardSection';


const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    }
    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle}/>
            <Navbar toggle={toggle}/>
            <HeroSection />
            <InfoSection {...homeObjOne}/>
            <InfoSection {...homeObjTwo}/>
            <InfoSection {...homeObjThree}/>
            <HomeCard />
        </>
    );
};

export default Home
