import React, { Component } from "react";
import Navbar from "../components/NavbarNew";
import Hero from "../components/Hero";

class CampaignIndex extends Component {
  render() {
    return (
      <div className="bg-gradient-to-br from-black via-gray-900 to-cyan-500 w-full h-screen">
        <Navbar></Navbar>
        <Hero />
      </div>
    );
  }
}

export default CampaignIndex;
