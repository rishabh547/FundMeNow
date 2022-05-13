import React, { Component } from "react";
import Navbar from "../components/NavbarNew";
import Hero from "../components/Hero";

class CampaignIndex extends Component {
  render() {
    return (
      <div className="bg-gradient-to-bl from-black via-black to-cyan-400 w-full h-screen">
        <Navbar></Navbar>
        <Hero />
      </div>
    );
  }
}

export default CampaignIndex;
