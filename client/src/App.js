
import "./App.scss";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

import React, { Component } from "react";

import security from './security.png';
import banner from './banner.png';
import axios from 'axios';
import real from './real.png';
import match1 from './match1.png';
import match2 from './match2.png';
import match3 from './match3.png';
import cta from './cta.png';
import cta_old from './cta_old.png';
import message from './message.png';
import logo from './logo.png';
import mValue from './mValue.png';
import wValue from './wValue.png';
import { TxtType } from "./utils/utils";
import Alert from "react-s-alert";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import ProfileCard from "./components/ProfileCard";
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
        lastName: _.get(profile,'localizedLastName',''),
        profileURL: `https://www.linkedin.com/in/${_.get(profile,'vanityName','')}`,
        pictureURL: _.get(_.last(_.get(profile,'profilePicture.displayImage~.elements','')),'identifiers[0].identifier','')
      })

      const data = {
        firstName: _.get(profile,'localizedFirstName',''),
        lastName: _.get(profile,'localizedLastName',''),
        profileURL: `https://www.linkedin.com/in/${_.get(profile,'vanityName','')}`
      };

      axios.post('https://sheet.best/api/sheets/c9e1c8ee-f7e0-4420-9a26-98771f754328', data).then((response) => {
        console.log(response);
      })
  }

  requestProfile = () => {
    var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=r_liteprofile&state=123456&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`
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


  render() {
    return (
      <div>
          { true ? <div className="App">
          <div className="navbar">
            <img className="logo" alt="logo" src={logo} />
            <img className="top-cta" alt="old-cta" src={cta_old} />
          </div>
          <div className="banner-section">
            <div className="banner">
              <img alt="banner" src={banner} />            
            </div>
            <div className="banner-content">
              <div className="header">Use LinkedIn for  <strike>networking </strike>match-making</div>
              <div className="content-box">
                <div className="sub-header">Find your partner with similar</div>
                <div
                  className="typewrite"
                  data-period="2000"
                  data-type='[ "interests", "aspirations", "professions" ]'
                ></div>
              </div>
              <div className="cta">
                <img onClick={this.requestProfile} alt="cta" src={cta} />                              
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
            <img onClick={this.requestProfile} alt="cta" src={cta} />
          </div>
          <div className="security">
            <img src={security} alt="security" />
          </div>
          <div className="messaging">
            <img src={message} alt="message" />
          </div>
        </div> :
        <div className="fallback">
           <div className="header">Thanks for joining the most eligible bachelors and bachelorettes waitlist.</div>
           <div className="sub-header">We'll soon reach out to you with the most fit potential partner profiles. Stay tuned!</div>
        </div>
        }
      </div>
    );
  }
}

export default App;
