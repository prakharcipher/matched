
import "./App.scss";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

import React, { Component } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import security from './images/security.png';
import banner from './images/banner.png';
import axios from 'axios';
import match1 from './images/match1.png';
import match2 from './images/match2.png';
import match3 from './images/match3.png';
import cta from './images/cta.png';
import cta_old from './images/cta_old.png';
import message from './images/message.png';
import ReactGA from 'react-ga4';
import logo from './images/logo.png';
import mValue from './images/mValue.png';
import wValue from './images/wValue.png';
import { TxtType } from "./utils/utils";
import Alert from "react-s-alert";
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: false,
      firstName: null,
      lastName: null,
      profileURL: null,
      pictureURL: null,
      gender: '',
      genderModalOpen: false
    };
  }

  

  componentDidMount() {    
    window.addEventListener('message', this.handlePostMessage);
    var elements = document.getElementsByClassName("typewrite");
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute("data-type");
      var period = elements[i].getAttribute("data-period");
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }
  }

  handlePostMessage = (event) => {
    if (event.data.type === "profile") {
      this.updateProfile(event.data.profile);
      Alert.success(`Login successful: ${event.data.profile.localizedFirstName}`,{position:'top'});
    }
  };

  updateProfile = (profile) => {
    console.log(profile)
      this.setState({
        isAuthorized: true,
        firstName: _.get(profile,'localizedFirstName',''),
        lastName: _.get(profile,'localizedLastName','')
      })

      const data = {
        firstName: _.get(profile,'localizedFirstName',''),
        lastName: _.get(profile,'localizedLastName',''),
        gender: this.state.gender
      };

      axios.post('https://sheet.best/api/sheets/8a24509f-a600-421f-8af7-93de6a6e5530', data).then((response) => {
        console.log(response);
      })

      this.setState({gender: ''});
  }

  requestProfile = () => {
    var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77gspit1p6df5f&scope=r_liteprofile&state=123456&redirect_uri=https://matched.social/callback`
    var width = 450,
      height = 730,
      left = window.screen.width / 2 - width / 2,
      top = window.screen.height / 2 - height / 2;

    window.open(
      oauthUrl,
      "Linkedin",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
        width +
        ", height=" +
        height +
        ", top=" +
        top +
        ", left=" +
        left
    );
  };

  handleMan = () => {
    const data = {
      gender: 'Male'
    };
    axios.post('https://sheet.best/api/sheets/264314e1-7942-4e91-aed6-8ce5d64240af', data).then((response) => {
        console.log(response);
    })

    this.setState({gender: 'Male'});
    this.setState({genderModalOpen: false});
    this.requestProfile();
  }

  handleWoman = () => {
    const data = {
      gender: 'Female'
    };
    axios.post('https://sheet.best/api/sheets/264314e1-7942-4e91-aed6-8ce5d64240af', data).then((response) => {
        console.log(response);
    })

    this.setState({gender: 'Female'});
    this.setState({genderModalOpen: false});
    this.requestProfile();
  }

  handleCtaClick = () => {
    this.setState({genderModalOpen: true});

    ReactGA.event({
      category: "Signup",
      action: "clicked",
    });
  }


  render() {
    ReactGA.initialize('G-9Y4013X62Q');
    ReactGA.send({ hitType: "pageview", page: document.location.pathname });
    return (
      <div>
          { !this.state.isAuthorized ? <div className="App">
          <Popup position="right center" open={this.state.genderModalOpen} closeOnDocumentClick={false} contentStyle={{width: '300px', borderRadius: '10px', background: '#666262', border: 'none'}}>
              <div onClick={this.handleWoman} style={{textAlign: 'center', padding: '24px 0', borderBottom: '1px solid #555555', color: '#fefefe', opacity: '0.8', fontWeight: 'bold', fontSize: '20px', cursor: 'pointer'}}>I'm a Woman</div>
              <div onClick={this.handleMan} style={{textAlign: 'center', padding: '24px 0', color: '#fefefe', opacity: '0.8', fontWeight: 'bold', fontSize: '20px', cursor: 'pointer'}}>I'm a Man</div>
          </Popup>
          <div className="navbar">
            <img className="logo" alt="logo" src={logo} />
            <img className="top-cta" onClick={this.handleCtaClick} alt="old-cta" src={cta_old} />
          </div>
          <div className="banner-section">
            <div className="banner">
              <img alt="banner" src={banner} />            
            </div>
            <div className="banner-content">
              {/* <div className="header">Use LinkedIn for match-making</div> */}
              <div className="header">Ditch random swiping and old-school matrimony with Linkedin</div>
              <div className="content-box">
                <div className="sub-header">Find your soulmate with similar</div>
                <div
                  className="typewrite"
                  data-period="2000"
                  data-type='[ "interests", "aspirations", "professions" ]'
                ></div>
              </div>
              <div className="cta">
                <img onClick={this.handleCtaClick} alt="cta" src={cta} />                              
              </div>
            </div>
          </div>
          <div className="value-props">
            <div className="woman">
              <img alt="woman" src={wValue} width="450" style={{borderRadius: '10px'}} />
            </div>
            <div className="man">
              <img alt="man" src={mValue} width="450" style={{borderRadius: '10px'}} />
            </div>
          </div>
          <div className="matches">
            <img alt="match1" src={match1} />
            <img alt="match2" src={match2} />
            <img alt="match3" src={match3} />
          </div>
          <div className="users">
            <div className="head"><span className="bold">Match</span> with <span className="bold">top 1%</span> professionals</div>
            <div className="sub-head"><span className="bold">1000+</span> members already on-board</div>
            <img onClick={this.handleCtaClick} alt="cta" src={cta} />
          </div>
          <div className="security">
            <img src={security} alt="security" />
          </div>
          <div className="messaging">
            <img src={message} alt="message" />
          </div>
        </div> :
        <div className="fallback">
           <div className="header">Congratulations on joining the most eligible bachelors and bachelorettes waitlist.</div>
           <div className="sub-header">We'll soon reach out to you with the most fit potential partner profiles. Stay tuned!</div>
        </div>
        }
      </div>
    );
  }
}

export default App;
