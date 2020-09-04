import React, { Component } from "react";
import Header from "./Header.jsx";
import MainSection from "./MainSection";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <>
        <Header />
        <MainSection />
      </>
    );
  }
}

export default Dashboard;
