import React from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarker } from 'react-icons/fa';
import './App.css'
import Icon1 from '../../images/person.svg';
import Icon2 from '../../images/building.svg';
import { HomeCardContainer, HomeCardH1, HomeCardWrapper, HomeCardElement, HomeCardIcon, HomeCardH2, HomeCardP} from './RegistrationElements'

const index = () => {
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-7 my-auto">
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <h1 className="icon-logo" to='/'> <FaMapMarker /> Track-n-Trace </h1>
                    </Link>
                    
                    <img className="img-fluid w-100" alt=""/>
                </div> 
            </div>

            <HomeCardContainer id="homecard">
                    <HomeCardH1> Are you an Individual or Establishment? </HomeCardH1>
                    <HomeCardWrapper>
                    <Link to='/individual/register' style={{ textDecoration: 'none', color: 'black'}}>
                        <HomeCardElement>
                            <HomeCardIcon src={Icon1}/>
                            <HomeCardH2>Individual </HomeCardH2>
                            <HomeCardP>(resident, local, citizen, etc.)</HomeCardP>
                        </HomeCardElement>
                    </Link>
                    <Link to='/establishment/register' style={{ textDecoration: 'none', color: 'black'}}>
                        <HomeCardElement>
                            <HomeCardIcon src={Icon2}/>
                            <HomeCardH2>Establishment</HomeCardH2>
                            <HomeCardP>(business organization, public institution, store, etc.)</HomeCardP>
                        </HomeCardElement>
                    </Link>
                    </HomeCardWrapper>
                </HomeCardContainer>
        </div>

            
    )
}

export default index
