
import "./App.scss";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

import React, { Component } from "react";
import Popup from 'reactjs-popup';
import {Carousel} from '3d-react-carousal';
import 'reactjs-popup/dist/index.css';

import security from './images/security.png';
import p1 from './images/p1.png';
import p2 from './images/p2.png';
import p3 from './images/p3.png';
import p4 from './images/p4.png';
import p5 from './images/p5.png';
import p6 from './images/p6.png';
import p7 from './images/p7.png';
import p8 from './images/p8.png';
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

    ReactGA.event({
      category: "Male",
      action: "clicked"
    });

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

    ReactGA.event({
      category: "Female",
      action: "clicked"
    });

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

  callback = (index) => {
    console.log("callback",index);
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
              <Carousel arrows={false} slides={[<img alt="match1" src={p1} />, <img alt="match2" src={p2} />, <img alt="match3" src={p3} />, <img alt="match3" src={p4} />, <img alt="match3" src={p5} />, <img alt="match3" src={p6} />, <img alt="match3" src={p7} />, <img alt="match3" src={p8} />]} autoplay={true} interval={2000} onSlideChange={this.callback}/>
            </div>
            <div className="banner-content">
              {/* <div className="header">Use LinkedIn for match-making</div> */}
              <div className="header">Ditch random swiping and make matches with vetted Linkedin profiles</div>
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
            <div className="elite">India's 1st <b>elite match-making</b> platform</div>
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
