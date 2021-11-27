import React, {useState} from 'react';
import Video from '../../../videos/video.mp4';
import {Button} from '../ButtonElements';
import { HeroContainer, HeroBg, VideoBg, HeroContent, HeroH1, HeroP, HeroBtnWrapper, ArrowForward, ArrowRight} from './HeroElements';

const HeroSection = () => {
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover);
    }

    return (
        <HeroContainer>
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
            </HeroBg>
            <HeroContent>
                <HeroH1> Track and Trace </HeroH1>
                <HeroP>
                Stay Alert. Control The Virus. Save Lives.
                </HeroP>
                <HeroBtnWrapper>
                    <Button to='link1' smooth={true} duration={500} spy={true} exact='true' offset={-80} onMouseEnter={onHover} onMouseLeave={onHover} primary="true" dark="true">
                        Get Started {hover ? <ArrowForward /> : <ArrowRight />}
                    </Button>
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer>
    )
}

export default HeroSection
