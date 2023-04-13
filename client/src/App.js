
import "./App.scss";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

import React, { Component } from "react";
import {Carousel} from '3d-react-carousal';
import 'reactjs-popup/dist/index.css';

import p1 from './images/p1.png';
import p2 from './images/p2.png';
import p3 from './images/p3.png';
import p4 from './images/p4.png';
import p5 from './images/p5.png';
import p6 from './images/p6.png';
import p7 from './images/p7.png';
import p8 from './images/p8.png';
import { notesRef } from "./firebase";
import ReactGA from 'react-ga4';
import logo from './images/logo.png';
import { TxtType } from "./utils/utils";

const slides = [<img alt="match1" src={p1} />, <img alt="match2" src={p2} />, <img alt="match3" src={p3} />, <img alt="match3" src={p4} />, <img alt="match3" src={p5} />, <img alt="match3" src={p6} />, <img alt="match3" src={p7} />, <img alt="match3" src={p8} />];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      alert: false
    };
  }

  

  componentDidMount() {   
    console.log("Rendered") 
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


  callback = (index) => {
    console.log("callback",index);
  }

  createNote = () => {
    const item = {
      url: this.state.url
    }

    notesRef.push(item);
    this.setState({url: ''});
    this.setState({alert: true});
  }


  render() {
    ReactGA.initialize('G-9Y4013X62Q');
    ReactGA.send({ hitType: "pageview", page: document.location.pathname });
    return (
      <div>
          <div className="App">
          {this.state.alert ? <div className="alert">Your profile has been submitted ✔</div> : null}      
          <div className="navbar">
            <img className="logo" alt="logo" src={logo} />
          </div>
          <div className="banner-section">
            <div className="banner">
              <Carousel arrows={false} slides={slides} autoplay={true} interval={2000} onSlideChange={this.callback}/>
            </div>
            <div className="banner-content">
              <div className="header">Exclusive match-making for the top 1%</div>
              <div className="cta">
                <div className="question">Are you one of them?</div>
                <div className="action">
                  <input className="in_field" placeholder="Paste your LinkedIn URL" onChange={(e) => this.setState({url: e.target.value})} value={this.state.url} />
                  <div onClick={this.createNote} className="go">Join &#62;</div>
                </div>                
              </div>
            </div>
          </div>
        </div> 
      </div>
    );
  }
}

export default App;
