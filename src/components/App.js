import React from "react";
import Signup from "./Signup/SelectRole";
import ForgotPassword from "./Login/ForgotPassword";
import EstablishmentSignUp from "./Signup/SignupEstablishment";
import Landing from "./Landing";
import Redirector from "./Login/Redirector";
import Login from "./Login/Login"

import IndividualSignUp from "./Signup/SignupIndividual";
import IndividualProfile from "./Individual/Profile/Profile"
import IndividualScanQr from "./Individual/ScanQr/Scan"
import DashboardIndividual from "./Individual/Dashboard/Dashboard"
import CovidTrackerIndividual from "./Individual/Dashboard/CovidStats/covidstats"
import EstablishmentProfile from "./Establishment/Profile/Profile"
import EstablishmentScanQr from "./Establishment/ScanQr/Scan"
import DashboardEstablishment from "./Establishment/Dashboard/Dashboard"
import CovidTrackerEstablishment from "./Establishment/Dashboard/CovidStats/covidstats";


import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import PrivateRoute from "./PrivateRoute";


function App() {
  return (
    <>
            <Router>
              <AuthProvider>
                <Switch>
                  {/* Individual */}
                  <Route path="/individual/signup-form" component={IndividualSignUp} /> 
                  <PrivateRoute path="/individual/dashboard" component={DashboardIndividual} />
                  <PrivateRoute path="/individual/profile" component={IndividualProfile} />
                  <PrivateRoute path="/individual/covidtracker" component={CovidTrackerIndividual} />
                  <PrivateRoute path="/individual/scan-qr" component={IndividualScanQr} /> 
                  {/* Establishments */}
                  <Route path="/establishment/signup-form" component={EstablishmentSignUp} /> 
                  <PrivateRoute path="/establishment/dashboard" component={DashboardEstablishment} />
                  <PrivateRoute path="/establishment/profile" component={EstablishmentProfile} />
                  <PrivateRoute path="/establishment/covidtracker" component={CovidTrackerEstablishment} />
                  <PrivateRoute path="/establishment/signup-form" component={EstablishmentSignUp} /> 
                  <PrivateRoute path="/establishment/scan-qr" component={EstablishmentScanQr} /> 

                  {/* Roles Redirector */}
                  <PrivateRoute path="/redirector" component={Redirector} />
                  {/* Globals */}
                  <Route exact path="/" component={Landing} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/login" component={Login} />
                  <Route path="/forgot-password" component={ForgotPassword} />
                  
                </Switch>
              </AuthProvider>
            </Router>
          
       
        
      
    </>
  );
}

export default App;
