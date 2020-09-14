import React, { Component } from "react";
import Header from "./Header";
import MainSection from "./MainSection";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header />
        <MainSection />
      </div>
    );
  }
}

export default Dashboard;
