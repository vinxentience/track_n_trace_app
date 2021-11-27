import React from 'react'
import Icon1 from '../../../images/analytics.svg';
import Icon2 from '../../../images/pathing.svg';
import Icon3 from '../../../images/analytics.svg';
import { HomeCardContainer, HomeCardH1, HomeCardWrapper, HomeCardElement, HomeCardIcon, HomeCardH2, HomeCardP} from './HomeCardElements'

const HomeCard = () => {
    return (
        <HomeCardContainer id="homecard">
            <HomeCardH1> What you can do. </HomeCardH1>
            <HomeCardWrapper>
                <HomeCardElement>
                    <HomeCardIcon src={Icon1}/>
                    <HomeCardH2>Scan QR code</HomeCardH2>
                    <HomeCardP>so that you can enter establishments.</HomeCardP>
                </HomeCardElement>
                <HomeCardElement>
                    <HomeCardIcon src={Icon2}/>
                    <HomeCardH2>Track your path</HomeCardH2>
                    <HomeCardP>so that you will know which establishments you entered.</HomeCardP>
                </HomeCardElement>
                <HomeCardElement>
                    <HomeCardIcon src={Icon3}/>
                    <HomeCardH2>Be informed</HomeCardH2>
                    <HomeCardP>so that you will know up-to-date analytics.</HomeCardP>
                </HomeCardElement>
            </HomeCardWrapper>
        </HomeCardContainer>

    )
}

export default HomeCard
